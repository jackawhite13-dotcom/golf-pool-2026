import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export interface LeaderboardPlayer {
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  scoreToPar: number | null;
  scoreToParDisplay: string;
  today: string;
  thru: string;
  status: "active" | "cut" | "wd" | "not_started";
}

const ESPN_URL =
  "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard";

function parseScoreToPar(val: unknown): { numeric: number | null; display: string } {
  if (val === undefined || val === null || val === "" || val === "--") {
    return { numeric: null, display: "--" };
  }
  const num = Number(val);
  if (isNaN(num)) return { numeric: null, display: String(val) };
  if (num === 0) return { numeric: 0, display: "E" };
  if (num > 0) return { numeric: num, display: `+${num}` };
  return { numeric: num, display: String(num) };
}

/**
 * Parse status from competitor object.
 * ESPN sometimes has status.type.state, sometimes status is null.
 * Fall back to checking score and linescores.
 */
function parseStatus(c: Record<string, unknown>): "active" | "cut" | "wd" | "not_started" {
  // Try status.type first
  const statusObj = c.status as Record<string, unknown> | undefined | null;
  if (statusObj) {
    const type = statusObj.type as Record<string, unknown> | undefined;
    if (type) {
      const name = (type.name as string || "").toLowerCase();
      const state = (type.state as string || "").toLowerCase();
      if (name === "cut" || name === "mc") return "cut";
      if (name === "wd" || name === "withdrawn") return "wd";
      if (state === "pre") return "not_started";
      if (state === "in") return "active";
      if (state === "post") return "active"; // finished round
    }
  }

  // No status object — infer from data
  const linescores = c.linescores as Array<Record<string, unknown>> | undefined;
  if (!linescores || linescores.length === 0) return "not_started";

  // If they have hole-level data in any round, they're active
  const latestRound = linescores[linescores.length - 1];
  const holeScores = latestRound?.linescores as Array<unknown> | undefined;
  if (holeScores && holeScores.length > 0) return "active";

  // If first round has hole data but second doesn't, still active (between rounds)
  const firstRound = linescores[0];
  const firstHoles = firstRound?.linescores as Array<unknown> | undefined;
  if (firstHoles && firstHoles.length > 0) return "active";

  // Has round-level scores but no hole data — could be pre-tournament
  const score = c.score;
  if (score !== undefined && score !== null && score !== "--" && score !== "") return "active";

  return "not_started";
}

/**
 * Parse how many holes through in current round.
 * Uses hole-level linescores within the latest round.
 */
function parseThru(c: Record<string, unknown>): string {
  // Try status.displayValue first
  const statusObj = c.status as Record<string, unknown> | undefined | null;
  if (statusObj) {
    const displayValue = statusObj.displayValue as string | undefined;
    if (displayValue) return displayValue;
    const period = statusObj.period as number | undefined;
    if (period === 18) return "F";
    if (period && period > 0) return String(period);
  }

  // Parse from linescores
  const linescores = c.linescores as Array<Record<string, unknown>> | undefined;
  if (!linescores || linescores.length === 0) return "--";

  // Find the latest round with hole-level data
  for (let i = linescores.length - 1; i >= 0; i--) {
    const round = linescores[i];
    const holeScores = round?.linescores as Array<unknown> | undefined;
    if (holeScores && holeScores.length > 0) {
      if (holeScores.length >= 18) return "F";
      return String(holeScores.length);
    }
  }

  // Has round-level scores but no hole data — likely finished or between rounds
  const score = c.score;
  if (score !== undefined && score !== null && score !== "--" && score !== "") {
    // Check if we have completed round scores
    const firstRound = linescores[0];
    const firstRoundDisplay = firstRound?.displayValue as string | undefined;
    if (firstRoundDisplay && firstRoundDisplay !== "--") return "F";
  }

  return "--";
}

/**
 * Parse current round score.
 * Looks at the latest round's displayValue.
 */
function parseToday(c: Record<string, unknown>): string {
  const linescores = c.linescores as Array<Record<string, unknown>> | undefined;
  if (!linescores || linescores.length === 0) return "--";

  // Find the latest round with actual data
  for (let i = linescores.length - 1; i >= 0; i--) {
    const round = linescores[i];
    const displayValue = round?.displayValue as string | undefined;
    if (displayValue && displayValue !== "--") return displayValue;
    const val = round?.value as number | undefined;
    if (val !== undefined && val !== null) return String(val);
  }

  return "--";
}

/**
 * Calculate positions from sorted order.
 * ESPN sorts competitors by score but doesn't always provide rankDisplayValue.
 * We calculate ties (T1, T2, etc.) from the sorted scores.
 */
function calculatePositions(players: Omit<LeaderboardPlayer, "position">[]): LeaderboardPlayer[] {
  // Group by score to detect ties
  let pos = 1;
  const result: LeaderboardPlayer[] = [];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    // Count how many players share this score
    let tieCount = 0;
    if (player.scoreToPar !== null) {
      for (let j = 0; j < players.length; j++) {
        if (players[j].scoreToPar === player.scoreToPar) tieCount++;
      }
    }

    let position: string;
    if (player.scoreToPar === null) {
      position = "--";
    } else if (player.status === "cut") {
      position = "MC";
    } else if (player.status === "wd") {
      position = "WD";
    } else {
      position = tieCount > 1 ? `T${pos}` : String(pos);
    }

    result.push({ ...player, position });

    // Advance position counter
    if (i < players.length - 1 && players[i + 1].scoreToPar !== player.scoreToPar) {
      pos = i + 2; // Jump past ties
    }
  }

  return result;
}

export async function GET() {
  try {
    const res = await fetch(ESPN_URL, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "ESPN API unavailable", players: [] },
        { status: 502 }
      );
    }

    const data = await res.json();

    const events = data.events as Array<Record<string, unknown>> | undefined;
    if (!events || events.length === 0) {
      return NextResponse.json(
        { error: "No active tournament", players: [], tournamentName: null, status: "no_tournament" },
        { status: 200 }
      );
    }

    const event = events[0] as Record<string, unknown>;
    const tournamentName = event.name as string || "PGA Tour Event";
    const competitions = event.competitions as Array<Record<string, unknown>> | undefined;

    if (!competitions || competitions.length === 0) {
      return NextResponse.json(
        { error: "No competition data", players: [], tournamentName, status: "no_data" },
        { status: 200 }
      );
    }

    const competition = competitions[0];
    const competitors = competition.competitors as Array<Record<string, unknown>> | undefined;

    if (!competitors || competitors.length === 0) {
      return NextResponse.json(
        { error: "No competitor data", players: [], tournamentName, status: "no_data" },
        { status: 200 }
      );
    }

    // Check tournament status
    const compStatus = competition.status as Record<string, unknown> | undefined;
    const compStatusType = compStatus?.type as Record<string, unknown> | undefined;
    const tournamentState = (compStatusType?.state as string || "in").toLowerCase();

    // Parse players without positions first (ESPN already sorts by score)
    const playersWithoutPos: Omit<LeaderboardPlayer, "position">[] = competitors.map((c) => {
      const athlete = c.athlete as Record<string, unknown> | undefined;
      const displayName = (athlete?.displayName as string) || "";
      const firstName = (athlete?.firstName as string) || "";
      const lastName = (athlete?.lastName as string) || "";

      // Use ESPN's rankDisplayValue if available, otherwise we'll calculate
      const espnPosition = c.rankDisplayValue as string | undefined;
      const scoreParsed = parseScoreToPar(c.score);

      return {
        name: displayName,
        firstName,
        lastName,
        _espnPosition: espnPosition, // temporary, used below
        scoreToPar: scoreParsed.numeric,
        scoreToParDisplay: scoreParsed.display,
        today: parseToday(c),
        thru: parseThru(c),
        status: parseStatus(c),
      };
    });

    // Calculate positions — use ESPN's if available, otherwise compute from scores
    const hasEspnPositions = playersWithoutPos.some(
      (p) => {
        const ep = (p as Record<string, unknown>)._espnPosition as string | undefined;
        return ep && ep !== "--" && ep !== "";
      }
    );

    let players: LeaderboardPlayer[];
    if (hasEspnPositions) {
      players = playersWithoutPos.map((p) => {
        const ep = (p as Record<string, unknown>)._espnPosition as string | undefined;
        let position = "--";
        if (ep && ep !== "--") {
          if (ep === "CUT" || ep === "MC") position = "MC";
          else if (ep === "WD") position = "WD";
          else if (ep === "DQ") position = "DQ";
          else position = ep;
        }
        const { ...rest } = p;
        delete (rest as Record<string, unknown>)._espnPosition;
        return { ...rest, position };
      });
    } else {
      // Remove temp field and calculate
      const cleaned = playersWithoutPos.map((p) => {
        const { ...rest } = p;
        delete (rest as Record<string, unknown>)._espnPosition;
        return rest;
      });
      players = calculatePositions(cleaned);
    }

    return NextResponse.json({
      players,
      tournamentName,
      status: tournamentState,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Leaderboard API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard", players: [], status: "error" },
      { status: 500 }
    );
  }
}

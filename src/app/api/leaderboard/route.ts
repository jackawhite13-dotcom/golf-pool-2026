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
  teeTime: string | null;
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
 * Parse today's round score from linescores array.
 * currentRound is 1-indexed. If the player hasn't started, return "--".
 */
function parseToday(
  c: Record<string, unknown>,
  currentRound: number,
  playerState: string | null
): string {
  if (playerState === "pre") return "--";

  const linescores = c.linescores as Array<Record<string, unknown>> | undefined;
  if (!linescores || linescores.length === 0) return "--";

  // currentRound is 1-indexed; array is 0-indexed
  const roundIndex = currentRound - 1;
  const round = linescores[roundIndex];
  if (!round) {
    // Fall back to latest round with data
    for (let i = linescores.length - 1; i >= 0; i--) {
      const r = linescores[i];
      const dv = r?.displayValue as string | undefined;
      if (dv && dv !== "--") return dv;
    }
    return "--";
  }

  const displayValue = round.displayValue as string | undefined;
  if (displayValue && displayValue !== "--") return displayValue;

  return "--";
}

/**
 * Fetch per-competitor status from ESPN core API.
 * Returns null on failure so caller can fall back.
 */
async function fetchCompetitorStatus(
  eventId: string,
  playerId: string
): Promise<Record<string, unknown> | null> {
  try {
    const url = `http://sports.core.api.espn.com/v2/sports/golf/leagues/pga/events/${eventId}/competitions/${eventId}/competitors/${playerId}/status`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Derive position, thru, teeTime, and status from core API status object.
 */
function parseCoreStatus(status: Record<string, unknown>): {
  position: string;
  thru: string;
  teeTime: string | null;
  status: "active" | "cut" | "wd" | "not_started";
  state: string;
} {
  // Position
  const posObj = status.position as Record<string, unknown> | undefined;
  const position = (posObj?.displayName as string) || "--";

  // Thru
  const thruVal = status.thru as number | undefined | null;
  let thru = "--";
  if (thruVal !== undefined && thruVal !== null) {
    if (thruVal === 0) thru = "--";
    else if (thruVal === 18) thru = "F";
    else thru = String(thruVal);
  }

  // Tee time
  const teeTime = (status.teeTime as string) || null;

  // Status from type.state
  const typeObj = status.type as Record<string, unknown> | undefined;
  const state = ((typeObj?.state as string) || "").toLowerCase();
  const typeName = ((typeObj?.name as string) || "").toLowerCase();

  let playerStatus: "active" | "cut" | "wd" | "not_started" = "not_started";
  if (typeName === "cut" || typeName === "mc") {
    playerStatus = "cut";
  } else if (typeName === "wd" || typeName === "withdrawn") {
    playerStatus = "wd";
  } else if (state === "pre") {
    playerStatus = "not_started";
  } else if (state === "in" || state === "post") {
    playerStatus = "active";
  }

  return { position, thru, teeTime, status: playerStatus, state };
}

/**
 * Fallback: derive position/thru/status from scoreboard competitor data.
 */
function fallbackFromScoreboard(c: Record<string, unknown>): {
  position: string;
  thru: string;
  teeTime: string | null;
  status: "active" | "cut" | "wd" | "not_started";
  state: string;
} {
  // Position from rankDisplayValue
  const ep = c.rankDisplayValue as string | undefined;
  let position = "--";
  if (ep && ep !== "--" && ep !== "") {
    if (ep === "CUT" || ep === "MC") position = "MC";
    else if (ep === "WD") position = "WD";
    else if (ep === "DQ") position = "DQ";
    else position = ep;
  }

  // Thru from status
  const statusObj = c.status as Record<string, unknown> | undefined | null;
  let thru = "--";
  if (statusObj) {
    const displayValue = statusObj.displayValue as string | undefined;
    if (displayValue) thru = displayValue;
    else {
      const period = statusObj.period as number | undefined;
      if (period === 18) thru = "F";
      else if (period && period > 0) thru = String(period);
    }
  }

  // Status from scoreboard
  let playerStatus: "active" | "cut" | "wd" | "not_started" = "not_started";
  let state = "pre";
  if (statusObj) {
    const type = statusObj.type as Record<string, unknown> | undefined;
    if (type) {
      const name = ((type.name as string) || "").toLowerCase();
      state = ((type.state as string) || "").toLowerCase();
      if (name === "cut" || name === "mc") playerStatus = "cut";
      else if (name === "wd" || name === "withdrawn") playerStatus = "wd";
      else if (state === "pre") playerStatus = "not_started";
      else if (state === "in" || state === "post") playerStatus = "active";
    }
  }

  return { position, thru, teeTime: null, status: playerStatus, state };
}

export async function GET() {
  try {
    const res = await fetch(ESPN_URL, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "ESPN API unavailable", players: [], currentRound: 0 },
        { status: 502 }
      );
    }

    const data = await res.json();

    const events = data.events as Array<Record<string, unknown>> | undefined;
    if (!events || events.length === 0) {
      return NextResponse.json(
        { error: "No active tournament", players: [], tournamentName: null, status: "no_tournament", currentRound: 0 },
        { status: 200 }
      );
    }

    const event = events[0] as Record<string, unknown>;
    const tournamentName = event.name as string || "PGA Tour Event";
    const eventId = String(event.id || "");
    const competitions = event.competitions as Array<Record<string, unknown>> | undefined;

    if (!competitions || competitions.length === 0) {
      return NextResponse.json(
        { error: "No competition data", players: [], tournamentName, status: "no_data", currentRound: 0 },
        { status: 200 }
      );
    }

    const competition = competitions[0];
    const competitors = competition.competitors as Array<Record<string, unknown>> | undefined;

    if (!competitors || competitors.length === 0) {
      return NextResponse.json(
        { error: "No competitor data", players: [], tournamentName, status: "no_data", currentRound: 0 },
        { status: 200 }
      );
    }

    // Tournament status
    const compStatus = competition.status as Record<string, unknown> | undefined;
    const compStatusType = compStatus?.type as Record<string, unknown> | undefined;
    const tournamentState = (compStatusType?.state as string || "in").toLowerCase();

    // Current round from competition status period
    let currentRound = (compStatus?.period as number) || 1;

    // Extract competitor IDs and fetch core API status in parallel
    const competitorIds = competitors.map((c) => {
      const athlete = c.athlete as Record<string, unknown> | undefined;
      return String(athlete?.id || c.id || "");
    });

    const coreStatuses = await Promise.all(
      competitorIds.map((id) =>
        id ? fetchCompetitorStatus(eventId, id) : Promise.resolve(null)
      )
    );

    // Build player list
    const players: LeaderboardPlayer[] = competitors.map((c, index) => {
      const athlete = c.athlete as Record<string, unknown> | undefined;
      const displayName = (athlete?.displayName as string) || "";
      const firstName = (athlete?.firstName as string) || "";
      const lastName = (athlete?.lastName as string) || "";

      const scoreParsed = parseScoreToPar(c.score);

      // Use core API data if available, otherwise fall back to scoreboard
      const coreStatus = coreStatuses[index];
      let derived;
      if (coreStatus) {
        derived = parseCoreStatus(coreStatus);
        // Update currentRound from core status if available
        const corePeriod = coreStatus.period as number | undefined;
        if (corePeriod && corePeriod > currentRound) {
          currentRound = corePeriod;
        }
      } else {
        derived = fallbackFromScoreboard(c);
      }

      const today = parseToday(c, currentRound, derived.state);

      return {
        name: displayName,
        firstName,
        lastName,
        position: derived.position,
        scoreToPar: scoreParsed.numeric,
        scoreToParDisplay: scoreParsed.display,
        today,
        thru: derived.thru,
        teeTime: derived.teeTime,
        status: derived.status,
      };
    });

    return NextResponse.json({
      players,
      tournamentName,
      currentRound,
      status: tournamentState,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Leaderboard API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard", players: [], status: "error", currentRound: 0 },
      { status: 500 }
    );
  }
}

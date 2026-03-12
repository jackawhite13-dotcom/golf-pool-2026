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

function parsePosition(pos: string | undefined): string {
  if (!pos) return "--";
  if (pos === "CUT" || pos === "MC") return "MC";
  if (pos === "WD") return "WD";
  if (pos === "DQ") return "DQ";
  return pos;
}

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

function parseStatus(competitor: Record<string, unknown>): "active" | "cut" | "wd" | "not_started" {
  const statusObj = competitor.status as Record<string, unknown> | undefined;
  if (!statusObj) return "not_started";

  const type = statusObj.type as Record<string, unknown> | undefined;
  if (!type) return "not_started";

  const name = (type.name as string || "").toLowerCase();
  const state = (type.state as string || "").toLowerCase();

  if (name === "cut" || name === "mc") return "cut";
  if (name === "wd" || name === "withdrawn") return "wd";
  if (state === "pre") return "not_started";
  return "active";
}

function parseThru(competitor: Record<string, unknown>): string {
  const statusObj = competitor.status as Record<string, unknown> | undefined;
  if (!statusObj) return "--";

  const type = statusObj.type as Record<string, unknown> | undefined;
  const state = (type?.state as string || "").toLowerCase();

  if (state === "pre") return "--";

  const period = statusObj.period as number | undefined;
  const displayValue = statusObj.displayValue as string | undefined;

  if (displayValue) return displayValue;
  if (period === 18) return "F";
  if (period) return String(period);
  return "--";
}

function parseToday(competitor: Record<string, unknown>): string {
  const linescores = competitor.linescores as Array<Record<string, unknown>> | undefined;
  if (!linescores || linescores.length === 0) return "--";

  const currentRound = linescores[linescores.length - 1];
  const val = currentRound?.value as number | undefined;
  if (val === undefined || val === null) return "--";
  return String(val);
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
    const tournamentState = (compStatusType?.state as string || "pre").toLowerCase();

    const players: LeaderboardPlayer[] = competitors.map((c) => {
      const athlete = c.athlete as Record<string, unknown> | undefined;
      const displayName = (athlete?.displayName as string) || "";
      const firstName = (athlete?.firstName as string) || "";
      const lastName = (athlete?.lastName as string) || "";

      const scoreParsed = parseScoreToPar(c.score);

      return {
        name: displayName,
        firstName,
        lastName,
        position: parsePosition(c.rankDisplayValue as string | undefined),
        scoreToPar: scoreParsed.numeric,
        scoreToParDisplay: scoreParsed.display,
        today: parseToday(c),
        thru: parseThru(c),
        status: parseStatus(c),
      };
    });

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

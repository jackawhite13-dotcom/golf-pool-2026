"use client";

import { useEffect, useState, useCallback } from "react";
import type { LeaderboardPlayer } from "@/app/api/leaderboard/route";

// ── Pick data ──────────────────────────────────────────────────────────
interface Pick {
  lastName: string;
  firstName: string;
  tier: string;
}

const JACK_PICKS: Pick[] = [
  { lastName: "Scheffler", firstName: "Scottie", tier: "A" },
  { lastName: "Matsuyama", firstName: "Hideki", tier: "B" },
  { lastName: "Bridgeman", firstName: "Jacob", tier: "C" },
  { lastName: "Theegala", firstName: "Sahith", tier: "D" },
  { lastName: "Coody", firstName: "Pierceson", tier: "E" },
  { lastName: "Hisatsune", firstName: "Ryo", tier: "F" },
  { lastName: "Rodgers", firstName: "Patrick", tier: "G" },
];

const ABE_PICKS: Pick[] = [
  { lastName: "Kim", firstName: "Si Woo", tier: "A" },
  { lastName: "Bhatia", firstName: "Akshay", tier: "B" },
  { lastName: "Straka", firstName: "Sepp", tier: "C" },
  { lastName: "Rose", firstName: "Justin", tier: "D" },
  { lastName: "Thomas", firstName: "Justin", tier: "E" },
  { lastName: "Castillo", firstName: "Ricky", tier: "F" },
  { lastName: "Putnam", firstName: "Andrew", tier: "G" },
];

const JACK_LAST_NAMES = new Set(JACK_PICKS.map((p) => p.lastName.toLowerCase()));
const ABE_LAST_NAMES = new Set(ABE_PICKS.map((p) => p.lastName.toLowerCase()));
const ALL_PICK_LAST_NAMES = new Set([...JACK_LAST_NAMES, ...ABE_LAST_NAMES]);

function getTeam(p: LeaderboardPlayer): "jack" | "abe" | null {
  const ln = p.lastName.toLowerCase();
  if (JACK_LAST_NAMES.has(ln)) return "jack";
  if (ABE_LAST_NAMES.has(ln)) return "abe";
  return null;
}

function ExpIndicator({ player }: { player: LeaderboardPlayer | null }) {
  if (!player || player.thru === "--" || player.thru === "" || player.thru === "0") {
    return <span className="w-8 text-center font-mono text-[var(--text-muted)]">--</span>;
  }
  if (player.scoreToPar === null || player.scoreToPar === 0) {
    return <span className="w-8 text-center font-mono text-[var(--text-muted)]">--</span>;
  }
  if (player.scoreToPar < 0) {
    return <span className="w-8 text-center font-mono font-semibold text-[var(--green-accent)]">&#8593;</span>;
  }
  return <span className="w-8 text-center font-mono font-semibold text-red-400">&#8595;</span>;
}

// ── Name matching ──────────────────────────────────────────────────────
function matchPlayer(
  pick: Pick,
  players: LeaderboardPlayer[]
): LeaderboardPlayer | null {
  // Primary: match last name
  const lastNameMatches = players.filter(
    (p) => p.lastName.toLowerCase() === pick.lastName.toLowerCase()
  );
  if (lastNameMatches.length === 1) return lastNameMatches[0];
  if (lastNameMatches.length > 1) {
    // Tiebreak on first name
    const exact = lastNameMatches.find(
      (p) => p.firstName.toLowerCase() === pick.firstName.toLowerCase()
    );
    if (exact) return exact;
    // Partial first name match (e.g., "Si Woo" vs "Si Woo")
    const partial = lastNameMatches.find(
      (p) =>
        p.firstName.toLowerCase().includes(pick.firstName.toLowerCase()) ||
        pick.firstName.toLowerCase().includes(p.firstName.toLowerCase())
    );
    if (partial) return partial;
    return lastNameMatches[0];
  }
  // Fallback: check full display name
  const fullMatch = players.find((p) =>
    p.name.toLowerCase().includes(pick.lastName.toLowerCase())
  );
  return fullMatch || null;
}

// ── Score helpers ──────────────────────────────────────────────────────
function teamTotal(
  picks: Pick[],
  players: LeaderboardPlayer[]
): { total: number; allFound: boolean } {
  let total = 0;
  let allFound = true;
  for (const pick of picks) {
    const player = matchPlayer(pick, players);
    if (!player || player.scoreToPar === null) {
      allFound = false;
      continue;
    }
    // Missed cut players still count their score
    total += player.scoreToPar;
  }
  return { total, allFound };
}

function formatTotal(total: number): string {
  if (total === 0) return "E";
  if (total > 0) return `+${total}`;
  return String(total);
}

// ── Status dot ─────────────────────────────────────────────────────────
function StatusDot({ status }: { status: string }) {
  let color = "bg-gray-500"; // not_started
  if (status === "active") color = "bg-[var(--green-accent)]";
  if (status === "cut") color = "bg-red-500";
  if (status === "wd") color = "bg-red-500";
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${color}`}
      title={status}
    />
  );
}

// ── Player row ─────────────────────────────────────────────────────────
function PlayerRow({
  pick,
  player,
}: {
  pick: Pick;
  player: LeaderboardPlayer | null;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--card-border)] py-2.5 last:border-0">
      {/* Tier badge */}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--green-dark)] text-[10px] font-bold text-[var(--green-accent)]">
        {pick.tier}
      </span>

      {/* Player info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {player && <StatusDot status={player.status} />}
          <span className="truncate text-sm font-medium">
            {pick.firstName} {pick.lastName}
          </span>
        </div>
      </div>

      {/* Score data */}
      {player ? (
        <div className="flex items-center gap-3 text-right text-xs">
          <span className="w-8 font-mono text-[var(--text-muted)]">
            {player.position}
          </span>
          <span
            className={`w-8 font-mono font-semibold ${
              player.scoreToPar !== null && player.scoreToPar < 0
                ? "text-[var(--green-accent)]"
                : player.scoreToPar !== null && player.scoreToPar > 0
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {player.scoreToParDisplay}
          </span>
          <span className="w-8 font-mono text-[var(--text-muted)]">
            {player.today}
          </span>
          <span className="w-8 font-mono text-[var(--text-muted)]">
            {player.thru}
          </span>
          <ExpIndicator player={player} />
        </div>
      ) : (
        <span className="text-xs text-[var(--text-muted)]">--</span>
      )}
    </div>
  );
}

// ── Team card ──────────────────────────────────────────────────────────
function TeamCard({
  title,
  subtitle,
  picks,
  players,
  total,
  isLeading,
}: {
  title: string;
  subtitle: string;
  picks: Pick[];
  players: LeaderboardPlayer[];
  total: { total: number; allFound: boolean };
  isLeading: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 ${
        isLeading
          ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/20"
          : "border-[var(--card-border)] bg-[var(--card-bg)]"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold sm:text-lg">{title}</h2>
          <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
        </div>
        <div className="text-right">
          <div
            className={`text-xl font-bold font-mono ${
              total.total < 0
                ? "text-[var(--green-accent)]"
                : total.total > 0
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {players.length > 0 ? formatTotal(total.total) : "--"}
          </div>
          {isLeading && players.length > 0 && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--green-accent)]">
              Leading
            </span>
          )}
        </div>
      </div>

      {/* Column headers */}
      <div className="mb-1 flex items-center gap-3 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        <span className="w-6 shrink-0" />
        <span className="min-w-0 flex-1">Player</span>
        <div className="flex items-center gap-3 text-right">
          <span className="w-8">Pos</span>
          <span className="w-8">Par</span>
          <span className="w-8">Rnd</span>
          <span className="w-8">Thru</span>
          <span className="w-8">Exp</span>
        </div>
      </div>

      {picks.map((pick) => (
        <PlayerRow
          key={`${pick.lastName}-${pick.tier}`}
          pick={pick}
          player={matchPlayer(pick, players)}
        />
      ))}
    </div>
  );
}

// ── Mini leaderboard ───────────────────────────────────────────────────
function MiniLeaderboard({ players }: { players: LeaderboardPlayer[] }) {
  if (players.length === 0) return null;

  // Top 20 + any of our players outside top 20
  const top20 = players.slice(0, 20);
  const outsideTop20 = players.slice(20).filter((p) =>
    ALL_PICK_LAST_NAMES.has(p.lastName.toLowerCase())
  );

  function leaderboardRow(p: LeaderboardPlayer, i: number, keyPrefix = "") {
    const team = getTeam(p);
    const rowBg =
      team === "jack"
        ? "bg-green-900/30 -mx-2 px-2 rounded border-l-2 border-l-[var(--green-accent)]"
        : team === "abe"
        ? "bg-amber-900/20 -mx-2 px-2 rounded border-l-2 border-l-amber-400"
        : "";
    const nameColor =
      team === "jack"
        ? "text-[var(--green-accent)]"
        : team === "abe"
        ? "text-amber-400"
        : "";

    return (
      <div
        key={`${keyPrefix}${p.lastName}-${i}`}
        className={`grid grid-cols-[2.5rem_1fr_2.5rem_2.5rem_2.5rem] gap-2 border-b border-[var(--card-border)] py-1.5 text-xs last:border-0 sm:grid-cols-[3rem_1fr_3rem_3rem_3rem_3rem] ${rowBg}`}
      >
        <span className="font-mono text-[var(--text-muted)]">
          {p.position}
        </span>
        <span className={`flex items-center gap-1.5 truncate font-medium ${nameColor}`}>
          {team === "jack" && (
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--green-accent)]" />
          )}
          {team === "abe" && (
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-amber-400" />
          )}
          {p.name}
        </span>
        <span
          className={`text-right font-mono ${
            p.scoreToPar !== null && p.scoreToPar < 0
              ? "text-[var(--green-accent)]"
              : p.scoreToPar !== null && p.scoreToPar > 0
              ? "text-red-400"
              : ""
          }`}
        >
          {p.scoreToParDisplay}
        </span>
        <span className="hidden text-right font-mono text-[var(--text-muted)] sm:block">
          {p.today}
        </span>
        <span className="text-right font-mono text-[var(--text-muted)]">
          {p.thru}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold sm:text-lg">Full Field Leaderboard</h2>
        <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--green-accent)]" /> Jack
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Abe
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-1 grid grid-cols-[2.5rem_1fr_2.5rem_2.5rem_2.5rem] gap-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)] sm:grid-cols-[3rem_1fr_3rem_3rem_3rem_3rem]">
        <span>Pos</span>
        <span>Player</span>
        <span className="text-right">Par</span>
        <span className="hidden text-right sm:block">Rnd</span>
        <span className="text-right">Thru</span>
      </div>

      {top20.map((p, i) => leaderboardRow(p, i))}

      {outsideTop20.length > 0 && (
        <>
          <div className="my-2 border-t border-dashed border-[var(--card-border)]" />
          <p className="mb-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Our picks outside top 20
          </p>
          {outsideTop20.map((p, i) => leaderboardRow(p, i, "outside-"))}
        </>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────
interface ApiResponse {
  players: LeaderboardPlayer[];
  tournamentName?: string;
  status?: string;
  timestamp?: string;
  error?: string;
}

export default function LiveScoringPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error("Failed to fetch");
      const json: ApiResponse = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      setError("Live data unavailable -- check back when the tournament is underway");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const players = data?.players || [];
  const jackTotal = teamTotal(JACK_PICKS, players);
  const abeTotal = teamTotal(ABE_PICKS, players);
  const jackLeading = jackTotal.total < abeTotal.total;
  const abeLeading = abeTotal.total < jackTotal.total;
  const tied = jackTotal.total === abeTotal.total;

  // Tournament not started state
  const tournamentNotStarted =
    data?.status === "pre" || data?.status === "no_tournament";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Live Scoring
            </h1>
            {!tournamentNotStarted && !error && players.length > 0 && (
              <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black animate-pulse">
                LIVE
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            {data?.tournamentName || "The Players Championship"} — TPC Sawgrass
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-[var(--text-muted)]">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => {
              setLoading(true);
              fetchData();
            }}
            disabled={loading}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--green-accent)]/40 hover:text-white disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center">
          <p className="mb-2 text-lg font-semibold">Data Unavailable</p>
          <p className="text-sm text-[var(--text-muted)]">{error}</p>
        </div>
      )}

      {/* Tournament not started */}
      {tournamentNotStarted && !error && (
        <div className="mb-8 rounded-xl border border-[var(--green-accent)]/20 bg-[var(--green-dark)]/20 p-8 text-center">
          <p className="mb-2 text-lg font-semibold">
            The Players Championship
          </p>
          <p className="mb-1 text-sm text-[var(--text-muted)]">
            Tournament begins March 12
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Tee times begin Thursday morning
          </p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
            />
          ))}
        </div>
      )}

      {/* Team cards */}
      {data && !error && (
        <>
          {/* Team totals summary bar */}
          {players.length > 0 && !tournamentNotStarted && (
            <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6">
              <div
                className={`rounded-lg border p-3 text-center ${
                  jackLeading || tied
                    ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/30"
                    : "border-[var(--card-border)] bg-[var(--card-bg)]"
                }`}
              >
                <p className="text-xs text-[var(--text-muted)]">
                  Jack &middot; The Floor
                </p>
                <p
                  className={`text-2xl font-bold font-mono ${
                    jackTotal.total < 0
                      ? "text-[var(--green-accent)]"
                      : jackTotal.total > 0
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {formatTotal(jackTotal.total)}
                </p>
              </div>
              <div
                className={`rounded-lg border p-3 text-center ${
                  abeLeading || tied
                    ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/30"
                    : "border-[var(--card-border)] bg-[var(--card-bg)]"
                }`}
              >
                <p className="text-xs text-[var(--text-muted)]">
                  Abe &middot; The Ceiling
                </p>
                <p
                  className={`text-2xl font-bold font-mono ${
                    abeTotal.total < 0
                      ? "text-[var(--green-accent)]"
                      : abeTotal.total > 0
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {formatTotal(abeTotal.total)}
                </p>
              </div>
            </div>
          )}

          {/* Team detail cards */}
          <div className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6">
            <TeamCard
              title="Jack's Team"
              subtitle="Chalk / The Floor"
              picks={JACK_PICKS}
              players={players}
              total={jackTotal}
              isLeading={jackLeading && !tied && players.length > 0 && !tournamentNotStarted}
            />
            <TeamCard
              title="Abe's Team"
              subtitle="Contrarian / The Ceiling"
              picks={ABE_PICKS}
              players={players}
              total={abeTotal}
              isLeading={abeLeading && !tied && players.length > 0 && !tournamentNotStarted}
            />
          </div>

          {/* Full field leaderboard */}
          {players.length > 0 && !tournamentNotStarted && (
            <MiniLeaderboard players={players} />
          )}
        </>
      )}
    </div>
  );
}

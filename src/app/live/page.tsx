"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { tiers as tierData } from "@/data/tiers";
import type { LeaderboardPlayer } from "@/app/api/leaderboard/route";

// ── Types ─────────────────────────────────────────────────────────────
interface Pick {
  lastName: string;
  firstName: string;
  tier: string;
  golferName: string; // "LastName, FirstName" format from tiers.ts
}

interface SavedPicks {
  jack: Record<string, string>; // tier label -> golfer name
  abe: Record<string, string>;
}

const TIER_LABELS = tierData.map((t) => t.label.replace("Tier ", ""));
const STORAGE_KEY = "majorspool-picks";

// ── Default picks (Players Championship) ──────────────────────────────
const DEFAULT_PICKS: SavedPicks = {
  jack: {
    A: "Scheffler, Scottie",
    B: "Matsuyama, Hideki",
    C: "Bridgeman, Jacob",
    D: "Rose, Justin",
    E: "Coody, Pierceson",
    F: "Hisatsune, Ryo",
    G: "Rodgers, Patrick",
  },
  abe: {
    A: "Kim, Si Woo",
    B: "Bhatia, Akshay",
    C: "Straka, Sepp",
    D: "Hojgaard, Nicolai",
    E: "Conners, Corey",
    F: "Castillo, Ricky",
    G: "Hoge, Tom",
  },
};

// ── Tier-scaled EXP targets ───────────────────────────────────────────
const TIER_TARGETS: Record<string, { green: number; gray: number }> = {
  A: { green: 5, gray: 10 },
  B: { green: 5, gray: 15 },
  C: { green: 10, gray: 20 },
  D: { green: 15, gray: 30 },
  E: { green: 20, gray: 40 },
  F: { green: 30, gray: 50 },
  G: { green: 40, gray: 60 },
};

// ── Parse golfer name from tiers.ts format ────────────────────────────
function parseGolferName(name: string): { lastName: string; firstName: string } {
  const parts = name.split(", ");
  return { lastName: parts[0] || name, firstName: parts[1] || "" };
}

function golferToPick(golferName: string, tierLabel: string): Pick {
  const { lastName, firstName } = parseGolferName(golferName);
  return { lastName, firstName, tier: tierLabel, golferName };
}

// ── Load/save picks from localStorage (falls back to defaults) ────────
function loadPicks(): SavedPicks {
  if (typeof window === "undefined") return DEFAULT_PICKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PICKS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PICKS;
  }
}

function savePicks(picks: SavedPicks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
}

function savedToPickArray(saved: Record<string, string>): Pick[] {
  return TIER_LABELS.map((label) => {
    const golferName = saved[label];
    if (!golferName) return null;
    return golferToPick(golferName, label);
  }).filter(Boolean) as Pick[];
}

// ── Name matching ──────────────────────────────────────────────────────
function matchPlayer(
  pick: Pick,
  players: LeaderboardPlayer[]
): LeaderboardPlayer | null {
  const lastNameMatches = players.filter(
    (p) => p.lastName.toLowerCase() === pick.lastName.toLowerCase()
  );
  if (lastNameMatches.length === 1) return lastNameMatches[0];
  if (lastNameMatches.length > 1) {
    const exact = lastNameMatches.find(
      (p) => p.firstName.toLowerCase() === pick.firstName.toLowerCase()
    );
    if (exact) return exact;
    const partial = lastNameMatches.find(
      (p) =>
        p.firstName.toLowerCase().includes(pick.firstName.toLowerCase()) ||
        pick.firstName.toLowerCase().includes(p.firstName.toLowerCase())
    );
    if (partial) return partial;
    return lastNameMatches[0];
  }
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
    total += player.scoreToPar;
  }
  return { total, allFound };
}

function formatTotal(total: number): string {
  if (total === 0) return "E";
  if (total > 0) return `+${total}`;
  return String(total);
}

// ── Parse position number from position string ────────────────────────
function positionNumber(pos: string): number | null {
  if (!pos || pos === "--" || pos === "MC" || pos === "WD" || pos === "DQ") return null;
  const num = parseInt(pos.replace("T", ""), 10);
  return isNaN(num) ? null : num;
}

// ── Format tee time for display ───────────────────────────────────────
function formatTeeTime(teeTime: string): string {
  try {
    return new Date(teeTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } catch {
    return teeTime;
  }
}

// ── Display value for Thru column (with tee time fallback) ────────────
function thruDisplay(player: LeaderboardPlayer): { text: string; isTeeTime: boolean } {
  if ((player.thru === "--" || player.thru === "0") && player.teeTime) {
    return { text: formatTeeTime(player.teeTime), isTeeTime: true };
  }
  return { text: player.thru, isTeeTime: false };
}

// ── EXP indicator — scaled by tier ───────────────────────────────────
function ExpIndicator({ player, tier }: { player: LeaderboardPlayer | null; tier: string }) {
  if (!player || player.position === "--" || player.position === "") {
    return <span className="w-8 text-center font-mono text-[var(--text-muted)]">--</span>;
  }

  const pos = positionNumber(player.position);
  const isCut = player.status === "cut";
  const isWd = player.status === "wd";

  if (isCut || isWd) {
    return <span className="w-8 text-center font-mono font-semibold text-red-400" title="MC / WD">&#8595;</span>;
  }

  if (pos === null) {
    return <span className="w-8 text-center font-mono text-[var(--text-muted)]">--</span>;
  }

  const targets = TIER_TARGETS[tier];
  if (!targets) {
    return <span className="w-8 text-center font-mono text-[var(--text-muted)]" title="No tier target">--</span>;
  }

  if (pos <= targets.green) {
    return <span className="w-8 text-center font-mono font-semibold text-[var(--green-accent)]" title={`Beating expectations (top ${targets.green})`}>&#8593;</span>;
  }
  if (pos <= targets.gray) {
    return <span className="w-8 text-center font-mono text-[var(--text-muted)]" title={`On pace (top ${targets.gray})`}>--</span>;
  }
  return <span className="w-8 text-center font-mono font-semibold text-red-400" title={`Below expectations (outside top ${targets.gray})`}>&#8595;</span>;
}

// ── Status dot ─────────────────────────────────────────────────────────
function StatusDot({ status }: { status: string }) {
  let color = "bg-gray-500";
  if (status === "active") color = "bg-[var(--green-accent)]";
  if (status === "cut") color = "bg-red-500";
  if (status === "wd") color = "bg-red-500";
  return (
    <span className={`inline-block h-2 w-2 rounded-full ${color}`} title={status} />
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
  const thru = player ? thruDisplay(player) : null;

  return (
    <div className="border-b border-[var(--card-border)] py-2.5 last:border-0">
      {/* Mobile: stacked layout */}
      <div className="flex items-center gap-3 sm:hidden">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--green-dark)] text-[10px] font-bold text-[var(--green-accent)]">
          {pick.tier}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {player && <StatusDot status={player.status} />}
            <span className="truncate text-sm font-medium">
              {pick.firstName} {pick.lastName}
            </span>
          </div>
          {player ? (
            <div className="mt-1 flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
              <span>Pos <span className="font-mono text-[var(--foreground)]">{player.position}</span></span>
              <span>Par <span className={`font-mono font-semibold ${
                player.scoreToPar !== null && player.scoreToPar < 0 ? "text-[var(--green-accent)]"
                : player.scoreToPar !== null && player.scoreToPar > 0 ? "text-red-400" : "text-[var(--foreground)]"
              }`}>{player.scoreToParDisplay}</span></span>
              <span>Rnd <span className="font-mono text-[var(--foreground)]">{player.today}</span></span>
              <span>Thru <span className={`font-mono ${thru?.isTeeTime ? "text-[var(--text-muted)]" : "text-[var(--foreground)]"}`}>{thru?.text}</span></span>
              <ExpIndicator player={player} tier={pick.tier} />
            </div>
          ) : (
            <span className="mt-1 block text-[10px] text-[var(--text-muted)]">--</span>
          )}
        </div>
      </div>

      {/* Desktop: inline layout */}
      <div className="hidden sm:flex sm:items-center sm:gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--green-dark)] text-[10px] font-bold text-[var(--green-accent)]">
          {pick.tier}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {player && <StatusDot status={player.status} />}
            <span className="truncate text-sm font-medium">
              {pick.firstName} {pick.lastName}
            </span>
          </div>
        </div>
        {player ? (
          <div className="flex items-center gap-3 text-right text-xs">
            <span className="w-8 font-mono text-[var(--text-muted)]">{player.position}</span>
            <span className={`w-8 font-mono font-semibold ${
              player.scoreToPar !== null && player.scoreToPar < 0 ? "text-[var(--green-accent)]"
              : player.scoreToPar !== null && player.scoreToPar > 0 ? "text-red-400" : "text-white"
            }`}>{player.scoreToParDisplay}</span>
            <span className="w-8 font-mono text-[var(--text-muted)]">{player.today}</span>
            <span className={`w-8 font-mono ${thru?.isTeeTime ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>{thru?.text}</span>
            <ExpIndicator player={player} tier={pick.tier} />
          </div>
        ) : (
          <span className="text-xs text-[var(--text-muted)]">--</span>
        )}
      </div>
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
  if (picks.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-5">
        <h2 className="mb-1 text-base font-bold sm:text-lg">{title}</h2>
        <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">No picks set yet.</p>
          <p className="text-xs text-[var(--text-muted)]">Tap &quot;Edit Picks&quot; to select players.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${
      isLeading ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/20" : "border-[var(--card-border)] bg-[var(--card-bg)]"
    }`}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold sm:text-lg">{title}</h2>
          <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold font-mono ${
            total.total < 0 ? "text-[var(--green-accent)]" : total.total > 0 ? "text-red-400" : "text-white"
          }`}>
            {players.length > 0 ? formatTotal(total.total) : "--"}
          </div>
          {isLeading && players.length > 0 && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--green-accent)]">Leading</span>
          )}
        </div>
      </div>

      {/* Header labels — hidden on mobile */}
      <div className="mb-1 hidden items-center gap-3 text-[10px] uppercase tracking-wider text-[var(--text-muted)] sm:flex">
        <span className="w-6 shrink-0" />
        <span className="min-w-0 flex-1">Player</span>
        <div className="flex items-center gap-3 text-right">
          <span className="w-8">Pos</span>
          <span className="w-8">Par</span>
          <span className="w-8">Rnd</span>
          <span className="w-8">Thru</span>
          <span className="w-8" title="vs. Tier Target">Exp</span>
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

// ── Pick editor ────────────────────────────────────────────────────────
function PickEditor({
  saved,
  onSave,
  onCancel,
}: {
  saved: SavedPicks;
  onSave: (picks: SavedPicks) => void;
  onCancel: () => void;
}) {
  const [jack, setJack] = useState<Record<string, string>>(saved?.jack || {});
  const [abe, setAbe] = useState<Record<string, string>>(saved?.abe || {});

  return (
    <div className="rounded-xl border border-[var(--green-accent)]/30 bg-[var(--card-bg)] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Set Picks</h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[var(--card-border)] px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ jack, abe })}
            className="rounded-lg bg-[var(--green-accent)] px-4 py-1.5 text-xs font-bold text-black hover:opacity-90"
          >
            Save Picks
          </button>
        </div>
      </div>

      <p className="mb-4 text-xs text-[var(--text-muted)]">
        Select one player per tier for Jack (chalk) and Abe (contrarian). Picks are saved to your browser.
      </p>

      <div className="space-y-3">
        {tierData.map((tier) => {
          const label = tier.label.replace("Tier ", "");
          const golferOptions = tier.golfers.map((g) => g.name).sort();

          return (
            <div
              key={tier.tier}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--green-dark)] text-[10px] font-bold text-[var(--green-accent)]">
                  {label}
                </span>
                <span className="text-xs font-semibold">{tier.label}</span>
                <span className="text-xs text-[var(--text-muted)]">({tier.golfers.length} players)</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Jack (Chalk)
                  </label>
                  <select
                    value={jack[label] || ""}
                    onChange={(e) => setJack({ ...jack, [label]: e.target.value })}
                    className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-1.5 text-xs text-[var(--foreground)] focus:border-[var(--green-accent)] focus:outline-none"
                  >
                    <option value="">-- Select --</option>
                    {golferOptions.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Abe (Contrarian)
                  </label>
                  <select
                    value={abe[label] || ""}
                    onChange={(e) => setAbe({ ...abe, [label]: e.target.value })}
                    className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-1.5 text-xs text-[var(--foreground)] focus:border-[var(--green-accent)] focus:outline-none"
                  >
                    <option value="">-- Select --</option>
                    {golferOptions.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-[var(--card-border)] px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave({ jack, abe })}
          className="rounded-lg bg-[var(--green-accent)] px-4 py-1.5 text-xs font-bold text-black hover:opacity-90"
        >
          Save Picks
        </button>
      </div>
    </div>
  );
}

// ── Full field leaderboard ─────────────────────────────────────────────
function FullLeaderboard({
  players,
  jackPicks,
  abePicks,
}: {
  players: LeaderboardPlayer[];
  jackPicks: Pick[];
  abePicks: Pick[];
}) {
  const [expanded, setExpanded] = useState(false);
  if (players.length === 0) return null;

  function getTeam(p: LeaderboardPlayer): "jack" | "abe" | null {
    const ln = p.lastName.toLowerCase();
    const fn = p.firstName.toLowerCase();
    const full = p.name.toLowerCase();

    for (const pick of jackPicks) {
      if (ln === pick.lastName.toLowerCase()) {
        if (fn === pick.firstName.toLowerCase() || fn.includes(pick.firstName.toLowerCase()) || pick.firstName.toLowerCase().includes(fn)) return "jack";
        const otherMatch = abePicks.some((a) => a.lastName.toLowerCase() === ln);
        if (!otherMatch) return "jack";
      }
      if (full.includes(pick.lastName.toLowerCase()) && full.includes(pick.firstName.toLowerCase())) return "jack";
    }

    for (const pick of abePicks) {
      if (ln === pick.lastName.toLowerCase()) {
        if (fn === pick.firstName.toLowerCase() || fn.includes(pick.firstName.toLowerCase()) || pick.firstName.toLowerCase().includes(fn)) return "abe";
        const otherMatch = jackPicks.some((j) => j.lastName.toLowerCase() === ln);
        if (!otherMatch) return "abe";
      }
      if (full.includes(pick.lastName.toLowerCase()) && full.includes(pick.firstName.toLowerCase())) return "abe";
    }

    return null;
  }

  const visiblePlayers = expanded ? players : players.slice(0, 40);

  function leaderboardRow(p: LeaderboardPlayer, i: number) {
    const team = getTeam(p);
    const thru = thruDisplay(p);
    const rowBg =
      team === "jack"
        ? "bg-purple-900/30 -mx-2 px-2 rounded border-l-2 border-l-purple-400"
        : team === "abe"
        ? "bg-amber-900/20 -mx-2 px-2 rounded border-l-2 border-l-amber-400"
        : "";
    const nameColor =
      team === "jack" ? "text-purple-400" : team === "abe" ? "text-amber-400" : "";

    return (
      <div key={`${p.lastName}-${p.firstName}-${i}`}>
        {/* Mobile: two-line flex layout */}
        <div className={`flex flex-col gap-0.5 border-b border-[var(--card-border)] py-1.5 text-xs last:border-0 sm:hidden ${rowBg}`}>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0 font-mono text-[var(--text-muted)]">{p.position}</span>
            {team === "jack" && <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-purple-400" />}
            {team === "abe" && <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-amber-400" />}
            <span className={`truncate font-medium ${nameColor}`}>{p.name}</span>
          </div>
          <div className="flex items-center gap-3 pl-10 text-[10px] text-[var(--text-muted)]">
            <span>Score <span className={`font-mono ${
              p.scoreToPar !== null && p.scoreToPar < 0 ? "text-[var(--green-accent)]"
              : p.scoreToPar !== null && p.scoreToPar > 0 ? "text-red-400" : "text-[var(--foreground)]"
            }`}>{p.scoreToParDisplay}</span></span>
            <span>Rnd <span className="font-mono text-[var(--foreground)]">{p.today}</span></span>
            <span>Thru <span className={`font-mono ${thru.isTeeTime ? "text-[var(--text-muted)]" : "text-[var(--foreground)]"}`}>{thru.text}</span></span>
          </div>
        </div>

        {/* Desktop: 5-column grid */}
        <div className={`hidden sm:grid sm:grid-cols-[3rem_1fr_3rem_3rem_3rem] gap-2 border-b border-[var(--card-border)] py-1.5 text-xs last:border-0 ${rowBg}`}>
          <span className="font-mono text-[var(--text-muted)]">{p.position}</span>
          <span className={`flex items-center gap-1.5 truncate font-medium ${nameColor}`}>
            {team === "jack" && <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-purple-400" />}
            {team === "abe" && <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-amber-400" />}
            {p.name}
          </span>
          <span className={`text-right font-mono ${
            p.scoreToPar !== null && p.scoreToPar < 0 ? "text-[var(--green-accent)]"
            : p.scoreToPar !== null && p.scoreToPar > 0 ? "text-red-400" : ""
          }`}>{p.scoreToParDisplay}</span>
          <span className="text-right font-mono text-[var(--text-muted)]">{p.today}</span>
          <span className={`text-right font-mono ${thru.isTeeTime ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>{thru.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold sm:text-lg">Full Field Leaderboard</h2>
          <p className="text-[10px] text-[var(--text-muted)]">{players.length} players</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-purple-400" /> Jack
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Abe
          </span>
        </div>
      </div>

      {/* Header labels — hidden on mobile */}
      <div className="mb-1 hidden sm:grid sm:grid-cols-[3rem_1fr_3rem_3rem_3rem] gap-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        <span>Pos</span>
        <span>Player</span>
        <span className="text-right">Par</span>
        <span className="text-right">Rnd</span>
        <span className="text-right">Thru</span>
      </div>

      {visiblePlayers.map((p, i) => leaderboardRow(p, i))}

      {!expanded && players.length > 40 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 w-full rounded-lg border border-[var(--card-border)] py-2 text-xs font-medium text-[var(--text-muted)] hover:border-[var(--green-accent)]/40 hover:text-white"
        >
          Show all {players.length} players
        </button>
      )}
      {expanded && players.length > 40 && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-3 w-full rounded-lg border border-[var(--card-border)] py-2 text-xs font-medium text-[var(--text-muted)] hover:border-[var(--green-accent)]/40 hover:text-white"
        >
          Show top 40
        </button>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────
interface ApiResponse {
  players: LeaderboardPlayer[];
  tournamentName?: string;
  currentRound?: number;
  status?: string;
  timestamp?: string;
  error?: string;
}

export default function LiveScoringPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [editing, setEditing] = useState(false);
  const [savedPicks, setSavedPicks] = useState<SavedPicks>(DEFAULT_PICKS);
  const [picksLoaded, setPicksLoaded] = useState(false);

  // Load picks from localStorage on mount
  useEffect(() => {
    const loaded = loadPicks();
    setSavedPicks(loaded);
    setPicksLoaded(true);
  }, []);

  const jackPicks = useMemo(
    () => (savedPicks ? savedToPickArray(savedPicks.jack) : []),
    [savedPicks]
  );
  const abePicks = useMemo(
    () => (savedPicks ? savedToPickArray(savedPicks.abe) : []),
    [savedPicks]
  );

  const hasPicks = jackPicks.length > 0 || abePicks.length > 0;

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
  const jackTotal = teamTotal(jackPicks, players);
  const abeTotal = teamTotal(abePicks, players);
  const jackLeading = jackTotal.total < abeTotal.total;
  const abeLeading = abeTotal.total < jackTotal.total;
  const tied = jackTotal.total === abeTotal.total;

  const tournamentNotStarted =
    data?.status === "pre" || data?.status === "no_tournament";

  // Build subtitle with round info
  const tournamentName = data?.tournamentName || "The Players Championship";
  const currentRound = data?.currentRound || 0;
  let subtitleText = `${tournamentName} — TPC Sawgrass`;
  if (currentRound > 0) {
    if (data?.status === "in") {
      subtitleText = `${tournamentName} — Round ${currentRound} — In Progress — TPC Sawgrass`;
    } else if (data?.status === "pre") {
      subtitleText = `${tournamentName} — Round ${currentRound} starts soon — TPC Sawgrass`;
    } else {
      subtitleText = `${tournamentName} — Round ${currentRound} — TPC Sawgrass`;
    }
  }

  function handleSavePicks(picks: SavedPicks) {
    savePicks(picks);
    setSavedPicks(picks);
    setEditing(false);
  }

  if (!picksLoaded) return null;

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
            {subtitleText}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-[var(--text-muted)]">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => { setLoading(true); fetchData(); }}
            disabled={loading}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--green-accent)]/40 hover:text-white disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={() => setEditing(!editing)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              editing
                ? "border-[var(--green-accent)] bg-[var(--green-accent)] text-black"
                : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:border-[var(--green-accent)]/40 hover:text-white"
            }`}
          >
            {editing ? "Cancel" : "Edit Picks"}
          </button>
        </div>
      </div>

      {/* Edit mode */}
      {editing && (
        <div className="mb-6">
          <PickEditor
            saved={savedPicks}
            onSave={handleSavePicks}
            onCancel={() => setEditing(false)}
          />
        </div>
      )}

      {/* No picks empty state */}
      {!editing && !hasPicks && (
        <div className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center">
          <p className="mb-2 text-lg font-semibold">No Picks Set</p>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Set your picks for Jack and Abe to start tracking scores.
          </p>
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg bg-[var(--green-accent)] px-4 py-2 text-sm font-bold text-black hover:opacity-90"
          >
            Set Picks
          </button>
        </div>
      )}

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
          <p className="mb-2 text-lg font-semibold">The Players Championship</p>
          <p className="mb-1 text-sm text-[var(--text-muted)]">Tournament begins March 12</p>
          <p className="text-sm text-[var(--text-muted)]">Tee times begin Thursday morning</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]" />
          ))}
        </div>
      )}

      {/* Team cards — only when picks are set */}
      {!editing && hasPicks && data && !error && (
        <>
          {/* Team totals summary bar */}
          {players.length > 0 && !tournamentNotStarted && jackPicks.length > 0 && abePicks.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6">
              <div className={`rounded-lg border p-3 text-center ${
                jackLeading || tied ? "border-purple-400/40 bg-purple-950/30" : "border-[var(--card-border)] bg-[var(--card-bg)]"
              }`}>
                <p className="text-xs text-[var(--text-muted)]">Jack &middot; Chalk</p>
                <p className={`text-2xl font-bold font-mono ${
                  jackTotal.total < 0 ? "text-[var(--green-accent)]" : jackTotal.total > 0 ? "text-red-400" : "text-white"
                }`}>{formatTotal(jackTotal.total)}</p>
              </div>
              <div className={`rounded-lg border p-3 text-center ${
                abeLeading || tied ? "border-amber-400/40 bg-amber-950/30" : "border-[var(--card-border)] bg-[var(--card-bg)]"
              }`}>
                <p className="text-xs text-[var(--text-muted)]">Abe &middot; Contrarian</p>
                <p className={`text-2xl font-bold font-mono ${
                  abeTotal.total < 0 ? "text-[var(--green-accent)]" : abeTotal.total > 0 ? "text-red-400" : "text-white"
                }`}>{formatTotal(abeTotal.total)}</p>
              </div>
            </div>
          )}

          {/* Team detail cards */}
          <div className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6">
            <TeamCard
              title="Jack's Team"
              subtitle="Chalk"
              picks={jackPicks}
              players={players}
              total={jackTotal}
              isLeading={jackLeading && !tied && players.length > 0 && !tournamentNotStarted}
            />
            <TeamCard
              title="Abe's Team"
              subtitle="Contrarian"
              picks={abePicks}
              players={players}
              total={abeTotal}
              isLeading={abeLeading && !tied && players.length > 0 && !tournamentNotStarted}
            />
          </div>

          {/* EXP legend */}
          <div className="mb-6 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              EXP Column — vs. Expected Target
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Scaled by tier — Tier A expects top 10, Tier G expects top 60. Green = beating expectations, Gray = on pace, Red = underperforming.
            </p>
          </div>
        </>
      )}

      {/* Full field leaderboard — always shows when data available */}
      {!editing && data && !error && players.length > 0 && !tournamentNotStarted && (
        <FullLeaderboard players={players} jackPicks={jackPicks} abePicks={abePicks} />
      )}
    </div>
  );
}

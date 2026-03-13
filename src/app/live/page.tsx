"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { tiers as tierData } from "@/data/tiers";
import entriesData from "@/data/entries.json";
import type { LeaderboardPlayer } from "@/app/api/leaderboard/route";
import {
  calculatePoolPoints,
  scoreEntries,
  findOverlap,
  type Entry,
  type ScoredEntry,
  buildScenario,
  type ScenarioComparison,
} from "@/lib/poolPoints";

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

// ── Normalize accented characters for matching ────────────────────────
function normalize(s: string): string {
  return s
    .replace(/ø/g, "o").replace(/Ø/g, "O")
    .replace(/æ/g, "ae").replace(/Æ/g, "AE")
    .replace(/ð/g, "d").replace(/Ð/g, "D")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// ── Name matching ──────────────────────────────────────────────────────
function matchPlayer(
  pick: Pick,
  players: LeaderboardPlayer[]
): LeaderboardPlayer | null {
  const pickLast = normalize(pick.lastName);
  const pickFirst = normalize(pick.firstName);

  const lastNameMatches = players.filter(
    (p) => normalize(p.lastName) === pickLast
  );
  if (lastNameMatches.length === 1) return lastNameMatches[0];
  if (lastNameMatches.length > 1) {
    const exact = lastNameMatches.find(
      (p) => normalize(p.firstName) === pickFirst
    );
    if (exact) return exact;
    const partial = lastNameMatches.find(
      (p) =>
        normalize(p.firstName).includes(pickFirst) ||
        pickFirst.includes(normalize(p.firstName))
    );
    if (partial) return partial;
    return lastNameMatches[0];
  }
  const fullMatch = players.find((p) =>
    normalize(p.name).includes(pickLast)
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
  poolPts,
}: {
  pick: Pick;
  player: LeaderboardPlayer | null;
  poolPts?: number;
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
              <span>Thru <span className={`font-mono ${thru?.isTeeTime ? "text-[var(--text-muted)]" : "text-[var(--foreground)]"}`}>{thru?.text}</span></span>
              {poolPts !== undefined && (
                <span>Pts <span className="font-mono font-semibold text-[var(--green-accent)]">{poolPts}</span></span>
              )}
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
            {poolPts !== undefined && (
              <span className="w-8 font-mono font-semibold text-[var(--green-accent)]">{poolPts}</span>
            )}
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
  poolPointsMap,
  teamPoolTotal,
  poolRank,
  poolEntries,
}: {
  title: string;
  subtitle: string;
  picks: Pick[];
  players: LeaderboardPlayer[];
  total: { total: number; allFound: boolean };
  isLeading: boolean;
  poolPointsMap?: Map<string, number>;
  teamPoolTotal?: number;
  poolRank?: number;
  poolEntries?: number;
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

  // Look up pool points for each pick
  function getPoolPts(pick: Pick): number | undefined {
    if (!poolPointsMap) return undefined;
    const fullName = `${pick.firstName} ${pick.lastName}`;
    const key = fullName
      .replace(/ø/g, "o").replace(/Ø/g, "O")
      .replace(/æ/g, "ae").replace(/Æ/g, "AE")
      .replace(/ð/g, "d").replace(/Ð/g, "D")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[.\-']/g, "")
      .trim();
    if (poolPointsMap.has(key)) return poolPointsMap.get(key)!;
    // Try last name only
    const lastName = pick.lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[.\-']/g, "");
    for (const [k, v] of poolPointsMap) {
      if (k.includes(lastName)) return v;
    }
    return undefined;
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
          {teamPoolTotal !== undefined && players.length > 0 && (
            <div className="mt-0.5">
              <span className="text-xs font-bold text-[var(--green-accent)]">{teamPoolTotal} pts</span>
              {poolRank !== undefined && poolEntries !== undefined && (
                <span className="ml-1 text-[10px] text-[var(--text-muted)]">
                  ({poolRank}{poolRank === 1 ? "st" : poolRank === 2 ? "nd" : poolRank === 3 ? "rd" : "th"} of {poolEntries})
                </span>
              )}
            </div>
          )}
          {isLeading && players.length > 0 && !teamPoolTotal && (
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
          {poolPointsMap && <span className="w-8">Pts</span>}
          <span className="w-8" title="vs. Tier Target">Exp</span>
        </div>
      </div>

      {picks.map((pick) => (
        <PlayerRow
          key={`${pick.lastName}-${pick.tier}`}
          pick={pick}
          player={matchPlayer(pick, players)}
          poolPts={getPoolPts(pick)}
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
    const ln = normalize(p.lastName);
    const fn = normalize(p.firstName);
    const full = normalize(p.name);

    for (const pick of jackPicks) {
      const pln = normalize(pick.lastName);
      const pfn = normalize(pick.firstName);
      if (ln === pln) {
        if (fn === pfn || fn.includes(pfn) || pfn.includes(fn)) return "jack";
        const otherMatch = abePicks.some((a) => normalize(a.lastName) === ln);
        if (!otherMatch) return "jack";
      }
      if (full.includes(pln) && full.includes(pfn)) return "jack";
    }

    for (const pick of abePicks) {
      const pln = normalize(pick.lastName);
      const pfn = normalize(pick.firstName);
      if (ln === pln) {
        if (fn === pfn || fn.includes(pfn) || pfn.includes(fn)) return "abe";
        const otherMatch = jackPicks.some((j) => normalize(j.lastName) === ln);
        if (!otherMatch) return "abe";
      }
      if (full.includes(pln) && full.includes(pfn)) return "abe";
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

// ── Scenario Section (wraps tool with Jack/Abe toggle) ────────────────
function ScenarioSection({
  scored,
  jackEntry,
  abeEntry,
  madeCutCount,
}: {
  scored: ScoredEntry[];
  jackEntry: ScoredEntry | null;
  abeEntry: ScoredEntry | null;
  madeCutCount: number;
}) {
  const [perspective, setPerspective] = useState<"jack" | "abe">("jack");
  const activeEntry = perspective === "jack" ? jackEntry : abeEntry;

  if (!activeEntry) return null;

  return (
    <div className="mb-6">
      {/* Toggle between Jack and Abe */}
      {jackEntry && abeEntry && (
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setPerspective("jack")}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              perspective === "jack"
                ? "border-purple-400 bg-purple-950/40 text-purple-400"
                : "border-[var(--card-border)] text-[var(--text-muted)] hover:text-white"
            }`}
          >
            Jack&apos;s View
          </button>
          <button
            onClick={() => setPerspective("abe")}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              perspective === "abe"
                ? "border-amber-400 bg-amber-950/40 text-amber-400"
                : "border-[var(--card-border)] text-[var(--text-muted)] hover:text-white"
            }`}
          >
            Abe&apos;s View
          </button>
        </div>
      )}
      <ScenarioTool
        scored={scored}
        yourEntry={activeEntry}
        madeCutCount={madeCutCount}
      />
    </div>
  );
}

// ── Scenario Tool (All Entries Ahead) ─────────────────────────────────
function ScenarioTool({
  scored,
  yourEntry,
  madeCutCount,
}: {
  scored: ScoredEntry[];
  yourEntry: ScoredEntry;
  madeCutCount: number;
}) {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  // All entries ahead of (or tied with) yours
  const entriesAhead = scored.filter(
    (e) => e.team !== yourEntry.team && e.calculatedPoints >= yourEntry.calculatedPoints
  );

  // Build scenarios for all entries ahead
  const scenarios = useMemo(() => {
    return entriesAhead.map((entry) => ({
      entry,
      scenario: buildScenario(yourEntry, entry),
    }));
  }, [entriesAhead, yourEntry]);

  // Sort by unique gap (hardest to pass first)
  const sorted = [...scenarios].sort((a, b) => b.scenario.uniqueGap - a.scenario.uniqueGap);

  // Summary stats
  const alreadyAhead = sorted.filter((s) => s.scenario.uniqueGap <= 0).length;
  const hardestToPass = sorted[0];
  const maxUniqueGap = hardestToPass?.scenario.uniqueGap ?? 0;

  if (entriesAhead.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--green-accent)]/30 bg-[var(--green-dark)]/30 p-4 sm:p-5">
        <h2 className="text-base font-bold sm:text-lg">What Do We Need?</h2>
        <p className="mt-2 text-sm font-semibold text-[var(--green-accent)]">
          You&apos;re in first place! No entries to pass.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-bold sm:text-lg">What Do We Need?</h2>
        <p className="text-[10px] text-[var(--text-muted)]">
          Every entry ahead of you — sorted by hardest to pass. Shared golfers cancel out; only unique gaps matter.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3 text-center">
          <p className="text-[10px] text-[var(--text-muted)]">Entries Ahead</p>
          <p className="text-lg font-bold font-mono text-red-400">{entriesAhead.length}</p>
        </div>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3 text-center">
          <p className="text-[10px] text-[var(--text-muted)]">Already Winning</p>
          <p className="text-lg font-bold font-mono text-[var(--green-accent)]">{alreadyAhead}</p>
          <p className="text-[9px] text-[var(--text-muted)]">on unique golfers</p>
        </div>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3 text-center">
          <p className="text-[10px] text-[var(--text-muted)]">Hardest Gap</p>
          <p className={`text-lg font-bold font-mono ${maxUniqueGap <= 0 ? "text-[var(--green-accent)]" : "text-red-400"}`}>
            {maxUniqueGap <= 0 ? `+${Math.abs(maxUniqueGap)}` : `-${maxUniqueGap}`}
          </p>
          <p className="text-[9px] text-[var(--text-muted)]">unique pts</p>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-4 rounded-lg border border-amber-900/30 bg-amber-950/20 px-3 py-2">
        <p className="text-xs text-amber-400/90">
          To finish #{yourEntry.calculatedRank > 1 ? "1" : yourEntry.calculatedRank}, your unique golfers need to outperform <strong>every</strong> entry&apos;s unique golfers — not just one.
          {maxUniqueGap > 0 && hardestToPass && (
            <> The toughest gap is <strong>{maxUniqueGap} pts</strong> vs. {hardestToPass.entry.team}.</>
          )}
          {alreadyAhead > 0 && (
            <> You&apos;re already winning the unique golfer battle against <strong>{alreadyAhead}</strong> of {entriesAhead.length} entries ahead.</>
          )}
        </p>
      </div>

      {/* All entries ahead — scrollable list */}
      <div className="space-y-1 max-h-[600px] overflow-y-auto">
        <div className="mb-1 grid grid-cols-[2rem_1fr_3.5rem_3rem_3.5rem_3.5rem] gap-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)] px-3">
          <span>Rk</span>
          <span>Team</span>
          <span className="text-right">Gap</span>
          <span className="text-right">Shared</span>
          <span className="text-right">U-Gap</span>
          <span></span>
        </div>

        {sorted.map(({ entry, scenario }) => {
          const isExpanded = expandedTeam === entry.team;
          const uniqueGapColor = scenario.uniqueGap <= 0 ? "text-[var(--green-accent)]" : "text-red-400";
          const uniqueGapDisplay = scenario.uniqueGap <= 0 ? `+${Math.abs(scenario.uniqueGap)}` : `-${scenario.uniqueGap}`;

          return (
            <div key={entry.team}>
              <button
                onClick={() => setExpandedTeam(isExpanded ? null : entry.team)}
                className={`w-full grid grid-cols-[2rem_1fr_3.5rem_3rem_3.5rem_3.5rem] gap-2 items-center rounded-lg px-3 py-2 text-xs transition-colors hover:bg-[var(--background)] ${
                  isExpanded ? "bg-[var(--background)] border border-[var(--card-border)]" : ""
                }`}
              >
                <span className="font-mono text-[var(--text-muted)]">{entry.calculatedRank}</span>
                <span className="truncate text-left font-medium">{entry.team}</span>
                <span className="text-right font-mono text-[var(--text-muted)]">-{scenario.pointGap}</span>
                <span className="text-right font-mono text-[var(--text-muted)]">{scenario.sharedGolfers.length}</span>
                <span className={`text-right font-mono font-semibold ${uniqueGapColor}`}>{uniqueGapDisplay}</span>
                <span className="text-right text-[var(--text-muted)]">{isExpanded ? "▾" : "▸"}</span>
              </button>

              {isExpanded && (
                <div className="mx-3 mb-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3">
                  {/* Shared golfers */}
                  {scenario.sharedGolfers.length > 0 && (
                    <div className="mb-3">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Shared ({scenario.sharedGolfers.length}) — cancel out
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.sharedGolfers.map((g) => (
                          <span key={g.name} className="rounded bg-[var(--card-bg)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                            {g.name} ({g.position}, {g.points}pts)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Head to head */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                        Your Unique — {scenario.yourUniquePoints} pts
                      </p>
                      <div className="space-y-0.5">
                        {scenario.yourUniqueGolfers.map((g) => (
                          <div key={g.name} className="flex items-center justify-between rounded border border-purple-400/20 bg-purple-950/20 px-2 py-1 text-[11px]">
                            <span className="text-purple-300">{g.name}</span>
                            <span className="font-mono text-purple-400">{g.currentPosition} · {g.currentPoints}pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                        Their Unique — {scenario.theirUniquePoints} pts
                      </p>
                      <div className="space-y-0.5">
                        {scenario.theirUniqueGolfers.map((g) => (
                          <div key={g.name} className="flex items-center justify-between rounded border border-red-400/20 bg-red-950/20 px-2 py-1 text-[11px]">
                            <span className="text-red-300">{g.name}</span>
                            <span className="font-mono text-red-400">{g.currentPosition} · {g.currentPoints}pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div className={`mt-3 rounded px-3 py-2 text-xs ${
                    scenario.uniqueGap <= 0
                      ? "border border-[var(--green-accent)]/30 bg-[var(--green-dark)]/30 text-[var(--green-accent)]"
                      : "border border-red-400/20 bg-red-950/20 text-[var(--text-muted)]"
                  }`}>
                    {scenario.uniqueGap <= 0 ? (
                      <span className="font-semibold">Already winning by {Math.abs(scenario.uniqueGap)} pts on unique golfers!</span>
                    ) : (
                      <span>
                        Need <strong className="text-white">{scenario.uniqueGap} pts</strong> combined gain on unique golfers
                        (~{Math.ceil(scenario.uniqueGap / Math.max(scenario.yourUniqueGolfers.length, 1))} per golfer avg).
                        {scenario.theirUniqueGolfers.length > 0 && scenario.theirUniqueGolfers[scenario.theirUniqueGolfers.length - 1].currentPoints > 0 && (
                          <> If {scenario.theirUniqueGolfers[scenario.theirUniqueGolfers.length - 1].name} misses cut, that saves {scenario.theirUniqueGolfers[scenario.theirUniqueGolfers.length - 1].currentPoints} pts.</>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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

  // ── Pool points calculation ──────────────────────────────────────────
  const poolData = useMemo(() => {
    if (players.length === 0) return null;
    const { pointsMap, positionMap, madeCutCount, cutHasHappened, projectedCutScore } = calculatePoolPoints(players);
    const entries = entriesData as Entry[];
    const scored = scoreEntries(entries, pointsMap, positionMap);

    // Find Jack and Abe entries
    const jackEntry = scored.find((e) => e.team === "team jaw") || null;
    const abeEntry = scored.find((e) => e.team === "Watman") || null;

    // Overlap analysis
    const jackOverlap = jackEntry ? findOverlap(jackEntry, scored, 20) : [];
    const abeOverlap = abeEntry ? findOverlap(abeEntry, scored, 20) : [];

    return {
      pointsMap,
      scored,
      jackEntry,
      abeEntry,
      jackOverlap,
      abeOverlap,
      madeCutCount,
      cutHasHappened,
      projectedCutScore,
      totalEntries: entries.length,
    };
  }, [players]);

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
              poolPointsMap={poolData?.pointsMap}
              teamPoolTotal={poolData?.jackEntry?.calculatedPoints}
              poolRank={poolData?.jackEntry?.calculatedRank}
              poolEntries={poolData?.totalEntries}
            />
            <TeamCard
              title="Abe's Team"
              subtitle="Contrarian"
              picks={abePicks}
              players={players}
              total={abeTotal}
              isLeading={abeLeading && !tied && players.length > 0 && !tournamentNotStarted}
              poolPointsMap={poolData?.pointsMap}
              teamPoolTotal={poolData?.abeEntry?.calculatedPoints}
              poolRank={poolData?.abeEntry?.calculatedRank}
              poolEntries={poolData?.totalEntries}
            />
          </div>

          {/* EXP legend */}
          <p className="mb-4 -mt-4 text-[10px] text-[var(--text-muted)]">
            <span className="font-semibold">EXP Column:</span> vs. tier-scaled target — Tier A expects top 10, Tier G expects top 60. <span className="text-[var(--green-accent)]">Green</span> = beating expectations, <span className="text-red-400">Red</span> = underperforming.
          </p>

          {/* Pool Standings */}
          {poolData && poolData.scored.length > 0 && !tournamentNotStarted && (
            <div className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold sm:text-lg">Pool Standings</h2>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    {poolData.totalEntries} entries &middot; {poolData.madeCutCount} golfers {poolData.cutHasHappened ? "made cut" : "in field"}
                    {!poolData.cutHasHappened && (
                      <>
                        <span className="ml-1 rounded bg-amber-900/40 px-1.5 py-0.5 text-amber-400" title="Points are estimated until the cut is made after Round 2">
                          Estimated — pre-cut
                        </span>
                        {poolData.projectedCutScore !== null && (
                          <span className="ml-1 rounded bg-amber-900/40 px-1.5 py-0.5 text-amber-400" title="Projected cut line based on top 65 and ties">
                            Proj. cut: {poolData.projectedCutScore === 0 ? "E" : poolData.projectedCutScore > 0 ? `+${poolData.projectedCutScore}` : poolData.projectedCutScore}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Top 10 + Jack & Abe highlights */}
              <div className="mb-1 hidden sm:grid sm:grid-cols-[2.5rem_1fr_4rem_4rem] gap-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                <span>Rank</span>
                <span>Team</span>
                <span className="text-right">Pts</span>
                <span className="text-right">Gap</span>
              </div>

              {(() => {
                const leader = poolData.scored[0];
                const top10 = poolData.scored.slice(0, 10);
                const jackInTop = top10.some((e) => e.team === "team jaw");
                const abeInTop = top10.some((e) => e.team === "Watman");

                const rows: ScoredEntry[] = [...top10];
                if (!jackInTop && poolData.jackEntry) rows.push(poolData.jackEntry);
                if (!abeInTop && poolData.abeEntry) rows.push(poolData.abeEntry);

                // Deduplicate and sort
                const seen = new Set<string>();
                const uniqueRows = rows.filter((r) => {
                  if (seen.has(r.team)) return false;
                  seen.add(r.team);
                  return true;
                });

                return uniqueRows.map((entry, i) => {
                  const isJack = entry.team === "team jaw";
                  const isAbe = entry.team === "Watman";
                  const isHighlighted = isJack || isAbe;
                  const gap = leader.calculatedPoints - entry.calculatedPoints;
                  const isSeparator = i === top10.length && ((!jackInTop && isJack) || (!abeInTop && isAbe));

                  return (
                    <div key={entry.team}>
                      {isSeparator && i === top10.length && (
                        <div className="my-1.5 border-t border-dashed border-[var(--card-border)]" />
                      )}
                      <div className={`grid grid-cols-[2.5rem_1fr_4rem_4rem] gap-2 border-b border-[var(--card-border)] py-1.5 text-xs last:border-0 ${
                        isJack ? "bg-purple-900/30 -mx-2 px-2 rounded border-l-2 border-l-purple-400"
                        : isAbe ? "bg-amber-900/20 -mx-2 px-2 rounded border-l-2 border-l-amber-400"
                        : ""
                      }`}>
                        <span className="font-mono text-[var(--text-muted)]">
                          {entry.calculatedRank}
                        </span>
                        <span className={`truncate font-medium ${
                          isJack ? "text-purple-400" : isAbe ? "text-amber-400" : ""
                        }`}>
                          {entry.team}
                          {isJack && <span className="ml-1 text-[10px] text-purple-400/60">← You</span>}
                          {isAbe && <span className="ml-1 text-[10px] text-amber-400/60">← Abe</span>}
                        </span>
                        <span className="text-right font-mono font-semibold text-[var(--green-accent)]">
                          {entry.calculatedPoints}
                        </span>
                        <span className={`text-right font-mono text-xs ${gap === 0 ? "text-[var(--green-accent)]" : "text-[var(--text-muted)]"}`}>
                          {gap === 0 ? "—" : `-${gap}`}
                        </span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* Scenario Tool */}
          {poolData && poolData.scored.length > 0 && !tournamentNotStarted && (poolData.jackEntry || poolData.abeEntry) && (
            <ScenarioSection
              scored={poolData.scored}
              jackEntry={poolData.jackEntry}
              abeEntry={poolData.abeEntry}
              madeCutCount={poolData.madeCutCount}
            />
          )}

        </>
      )}

      {/* Full field leaderboard — always shows when data available */}
      {!editing && data && !error && players.length > 0 && !tournamentNotStarted && (
        <FullLeaderboard players={players} jackPicks={jackPicks} abePicks={abePicks} />
      )}
    </div>
  );
}

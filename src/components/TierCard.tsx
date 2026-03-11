"use client";

import { useState } from "react";
import type { Tier, Golfer } from "@/data/tiers";

interface TierCardProps {
  tier: Tier;
  topPick: string;
  topReasoning: string;
  topConfidence: "High" | "Medium" | "Low";
  contrarianPick: string;
  contrarianReasoning: string;
  contrarianConfidence: "High" | "Medium" | "Low";
  sources: { href: string; label: string }[];
}

function ConfidenceBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const colors = {
    High: "bg-green-900/50 text-green-400 border-green-800/50",
    Medium: "bg-amber-900/50 text-amber-400 border-amber-800/50",
    Low: "bg-red-900/50 text-red-400 border-red-800/50",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colors[level]}`}>
      {level} Confidence
    </span>
  );
}

function GolferRow({ golfer, isTopPick, isContrarian }: { golfer: Golfer; isTopPick: boolean; isContrarian: boolean }) {
  return (
    <tr
      className={`border-b border-[var(--card-border)]/30 text-xs ${
        isTopPick
          ? "bg-[var(--green-dark)]/20"
          : isContrarian
          ? "bg-amber-950/10"
          : ""
      }`}
    >
      <td className="py-1.5 pr-2">
        <div className="flex items-center gap-1.5">
          <span className={`font-medium ${isTopPick ? "text-[var(--green-accent)]" : isContrarian ? "text-amber-400" : "text-white"}`}>
            {golfer.name}
          </span>
          {isTopPick && <span className="rounded bg-[var(--green-accent)] px-1 py-0.5 text-[8px] font-bold text-black">TOP</span>}
          {isContrarian && <span className="rounded bg-amber-500 px-1 py-0.5 text-[8px] font-bold text-black">CTR</span>}
        </div>
      </td>
      <td className="py-1.5 pr-2 text-[var(--text-muted)]">{golfer.owgr ?? "—"}</td>
      <td className="py-1.5 pr-2 text-[var(--text-muted)]">{golfer.cutsMade}/{golfer.events}</td>
      <td className="py-1.5 pr-2 text-[var(--text-muted)]">
        {golfer.wins > 0 && <span className="font-semibold text-[var(--green-accent)]">{golfer.wins}W </span>}
        {golfer.seconds > 0 && <span>{golfer.seconds}-2nd </span>}
        {golfer.thirds > 0 && <span>{golfer.thirds}-3rd </span>}
        {golfer.wins === 0 && golfer.seconds === 0 && golfer.thirds === 0 && "—"}
      </td>
      <td className="py-1.5 pr-2 text-[var(--text-muted)]">{golfer.top10}</td>
      <td className="py-1.5 pr-2 text-[var(--text-muted)]">{golfer.top25}</td>
      <td className="py-1.5 text-[var(--text-muted)]">{golfer.earnings}</td>
    </tr>
  );
}

export default function TierCard({
  tier,
  topPick,
  topReasoning,
  topConfidence,
  contrarianPick,
  contrarianReasoning,
  contrarianConfidence,
  sources,
}: TierCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--card-border)] px-4 py-3 sm:px-6">
        <div>
          <h3 className="text-base font-bold">
            <span className="text-[var(--green-accent)]">{tier.label}</span>
            <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">{tier.oddsRange}</span>
          </h3>
          <p className="text-xs text-[var(--text-muted)]">{tier.golfers.length} players</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg border border-[var(--card-border)] px-3 py-1.5 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--background)] hover:text-white"
        >
          {expanded ? "Hide Full Tier" : "Show Full Tier"}
        </button>
      </div>

      {/* Pick Recommendations */}
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
        {/* Top Pick */}
        <div className="rounded-lg border border-[var(--green-accent)]/20 bg-[var(--green-dark)]/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--green-accent)]">Top Pick</span>
            <ConfidenceBadge level={topConfidence} />
          </div>
          <p className="mb-2 text-base font-bold text-white">{topPick}</p>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">{topReasoning}</p>
        </div>

        {/* Contrarian Pick */}
        <div className="rounded-lg border border-amber-900/20 bg-amber-950/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Contrarian Pick</span>
            <ConfidenceBadge level={contrarianConfidence} />
          </div>
          <p className="mb-2 text-base font-bold text-white">{contrarianPick}</p>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">{contrarianReasoning}</p>
        </div>
      </div>

      {/* Sources */}
      <div className="border-t border-[var(--card-border)]/50 px-4 py-2 sm:px-6">
        <div className="flex flex-wrap gap-3">
          {sources.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[var(--green-accent)] underline underline-offset-2 hover:text-white"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Expanded Full Tier Table */}
      {expanded && (
        <div className="border-t border-[var(--card-border)] px-4 py-4 sm:px-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="py-2 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Player</th>
                  <th className="py-2 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">OWGR</th>
                  <th className="py-2 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Cuts</th>
                  <th className="py-2 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Results</th>
                  <th className="py-2 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">T10</th>
                  <th className="py-2 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">T25</th>
                  <th className="py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {tier.golfers.map((g) => (
                  <GolferRow
                    key={g.name}
                    golfer={g}
                    isTopPick={g.name === topPick}
                    isContrarian={g.name === contrarianPick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

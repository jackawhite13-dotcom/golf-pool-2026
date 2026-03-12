"use client";

import type { Tier, Golfer } from "@/data/tiers";

export interface PlayerAnalysis {
  name: string;
  jackConfidence: number;
  abeConfidence: number;
  rationale?: string;
  chalk?: string;
  contrarian?: string;
}

interface TierCardProps {
  tier: Tier;
  analysis: PlayerAnalysis[];
  sources: { href: string; label: string }[];
}

function ConfidenceBar({ value, color }: { value: number; color: "green" | "amber" }) {
  const barColor = color === "green" ? "bg-[var(--green-accent)]" : "bg-amber-400";
  const textColor = color === "green" ? "text-[var(--green-accent)]" : "text-amber-400";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-16 shrink-0 rounded-full bg-[var(--card-border)]">
        <div
          className={`h-2 rounded-full ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`text-xs font-bold tabular-nums ${textColor}`}>{value}%</span>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] text-[var(--text-muted)]">
      <span className="font-medium text-white/60">{label}</span> {value}
    </span>
  );
}

export default function TierCard({ tier, analysis, sources }: TierCardProps) {
  // Build a lookup for analysis by player name
  const analysisMap = new Map(analysis.map((a) => [a.name, a]));

  // Sort golfers: highest max(jack, abe) confidence first
  const sortedGolfers = [...tier.golfers].sort((a, b) => {
    const aAnalysis = analysisMap.get(a.name);
    const bAnalysis = analysisMap.get(b.name);
    const aMax = aAnalysis ? Math.max(aAnalysis.jackConfidence, aAnalysis.abeConfidence) : 0;
    const bMax = bAnalysis ? Math.max(bAnalysis.jackConfidence, bAnalysis.abeConfidence) : 0;
    return bMax - aMax;
  });

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
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--green-accent)]" />
            <span className="text-[var(--text-muted)]">Jack (Chalk)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-[var(--text-muted)]">Abe (Contrarian)</span>
          </span>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-[var(--card-border)]/30">
        {sortedGolfers.map((golfer) => {
          const a = analysisMap.get(golfer.name);
          if (!a) return null;

          const isJackTop = a.jackConfidence >= 80;
          const isAbeTop = a.abeConfidence >= 80;

          return (
            <div
              key={golfer.name}
              className={`px-4 py-3 ${
                isJackTop && isAbeTop
                  ? "bg-[var(--green-dark)]/10"
                  : isJackTop
                  ? "bg-[var(--green-dark)]/15"
                  : isAbeTop
                  ? "bg-amber-950/10"
                  : ""
              }`}
            >
              {/* Player name + badges */}
              <div className="mb-2 flex items-center gap-1.5">
                <span
                  className={`text-sm font-medium ${
                    isJackTop
                      ? "text-[var(--green-accent)]"
                      : isAbeTop
                      ? "text-amber-400"
                      : "text-white"
                  }`}
                >
                  {golfer.name}
                </span>
                {isJackTop && (
                  <span className="rounded bg-[var(--green-accent)] px-1 py-0.5 text-[8px] font-bold text-black">
                    JACK
                  </span>
                )}
                {isAbeTop && (
                  <span className="rounded bg-amber-500 px-1 py-0.5 text-[8px] font-bold text-black">
                    ABE
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="mb-2 flex flex-wrap gap-x-2 gap-y-0">
                <StatPill label="OWGR" value={golfer.owgr ?? "N/A"} />
                <StatPill label="Cuts" value={`${golfer.cutsMade}/${golfer.events}`} />
                <StatPill label="$" value={golfer.earnings} />
              </div>

              {/* Confidence bars */}
              <div className="mb-2 grid grid-cols-2 gap-2">
                <div>
                  <p className="mb-0.5 text-[10px] font-medium text-[var(--green-accent)]">Jack %</p>
                  <ConfidenceBar value={a.jackConfidence} color="green" />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-medium text-amber-400">Abe %</p>
                  <ConfidenceBar value={a.abeConfidence} color="amber" />
                </div>
              </div>

              {/* Rationale */}
              {a.rationale && (
                <p className="mb-1 text-[11px] leading-snug text-[var(--text-muted)]">
                  {a.rationale}
                </p>
              )}

              {/* Chalk vs Contrarian */}
              {(a.chalk || a.contrarian) && (
                <div className="space-y-0.5">
                  {a.chalk && (
                    <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--green-accent)]">CHALK:</span>{" "}
                      {a.chalk}
                    </p>
                  )}
                  {a.contrarian && (
                    <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                      <span className="font-semibold text-amber-400">CTR:</span>{" "}
                      {a.contrarian}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="py-2.5 pl-4 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:pl-6">
                Player
              </th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--green-accent)]">
                Jack %
              </th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-amber-400">
                Abe %
              </th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Rationale
              </th>
              <th className="py-2.5 pl-2 pr-4 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:pr-6">
                Chalk vs Contrarian
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedGolfers.map((golfer) => {
              const a = analysisMap.get(golfer.name);
              if (!a) return null;

              const isJackTop = a.jackConfidence >= 80;
              const isAbeTop = a.abeConfidence >= 80;
              const hasDetail = !!(a.rationale || a.chalk || a.contrarian);

              return (
                <tr
                  key={golfer.name}
                  className={`border-b border-[var(--card-border)]/30 ${
                    isJackTop && isAbeTop
                      ? "bg-[var(--green-dark)]/10"
                      : isJackTop
                      ? "bg-[var(--green-dark)]/15"
                      : isAbeTop
                      ? "bg-amber-950/10"
                      : ""
                  }`}
                >
                  {/* Player */}
                  <td className="py-2.5 pl-4 pr-2 sm:pl-6">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-medium ${
                          isJackTop
                            ? "text-[var(--green-accent)]"
                            : isAbeTop
                            ? "text-amber-400"
                            : "text-white"
                        }`}
                      >
                        {golfer.name}
                      </span>
                      {isJackTop && (
                        <span className="rounded bg-[var(--green-accent)] px-1 py-0.5 text-[8px] font-bold text-black">
                          JACK
                        </span>
                      )}
                      {isAbeTop && (
                        <span className="rounded bg-amber-500 px-1 py-0.5 text-[8px] font-bold text-black">
                          ABE
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0">
                      <StatPill label="OWGR" value={golfer.owgr ?? "N/A"} />
                      <StatPill label="Cuts" value={`${golfer.cutsMade}/${golfer.events}`} />
                      <StatPill label="$" value={golfer.earnings} />
                    </div>
                  </td>

                  {/* Jack Confidence */}
                  <td className="py-2.5 px-2">
                    <ConfidenceBar value={a.jackConfidence} color="green" />
                  </td>

                  {/* Abe Confidence */}
                  <td className="py-2.5 px-2">
                    <ConfidenceBar value={a.abeConfidence} color="amber" />
                  </td>

                  {/* Rationale */}
                  <td className="py-2.5 px-2">
                    {a.rationale ? (
                      <p className="max-w-[200px] text-[11px] leading-snug text-[var(--text-muted)]">
                        {a.rationale}
                      </p>
                    ) : (
                      <span className="text-[10px] text-[var(--card-border)]">--</span>
                    )}
                  </td>

                  {/* Chalk vs Contrarian */}
                  <td className="py-2.5 pl-2 pr-4 sm:pr-6">
                    {hasDetail && (a.chalk || a.contrarian) ? (
                      <div className="space-y-1 max-w-[240px]">
                        {a.chalk && (
                          <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                            <span className="font-semibold text-[var(--green-accent)]">CHALK:</span>{" "}
                            {a.chalk}
                          </p>
                        )}
                        {a.contrarian && (
                          <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                            <span className="font-semibold text-amber-400">CTR:</span>{" "}
                            {a.contrarian}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-[10px] text-[var(--card-border)]">--</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </div>
  );
}

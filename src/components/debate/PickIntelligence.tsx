"use client";

import { useState } from "react";
import { tiers } from "@/data/tiers";
import { callDebateAPI } from "@/lib/debate-api";

// ── Pool context injected into every agent ─────────────────────────────────
const POOL_CONTEXT = `
POOL: Pollack's Golf Majors+Players Pool 2026
- ~300 entries, ~$150,000 prize pool
- 5 tournaments: The Players Championship, The Masters, PGA Championship, U.S. Open, The Open Championship
- FORMAT: Each entry picks 7 golfers — one per tier (Tier 1 = odds rank 1-10, Tier 2 = 11-20, ... Tier 7 = 61+)
- SCORING: Finish position → points (1st ≈ 75pts, decreasing by finish). Missed cut = 0 pts.
- PAYOUTS: ~80% paid per-tournament (top 4-5 finishers). ~20% cumulative season-long standings.
- CURRENT TOURNAMENT: The Players Championship at TPC Sawgrass (Pete Dye Stadium Course)
- TWO ENTRIES, TWO STRATEGIES:
  * JACK = CHALK/FLOOR strategy: maximize cut-making probability, consistency, avoid zeroes, target steady points accumulation
  * ABE = CONTRARIAN/CEILING strategy: prioritize upside, differentiation from the field, tournament-winning potential even at cost of cut-making risk
- ALT FLAG: Players marked ALT are alternates and may not play — weight accordingly
- STATS AVAILABLE: OWGR, Events played, Cuts made, Wins, 2nds, 3rds, Top-10s, Top-25s, Earnings (2026 season to date)
`;

// ── Map tiers.ts data ──────────────────────────────────────────────────────
interface Player {
  name: string;
  owgr: number | null;
  events: number;
  cuts: number;
  wins: number;
  t10: number;
  t25: number;
  earnings: string;
  alt: boolean;
}

function getTierPlayers(tierIndex: number): Player[] {
  return tiers[tierIndex].golfers.map((g) => ({
    name: g.name,
    owgr: g.owgr,
    events: g.events,
    cuts: g.cutsMade,
    wins: g.wins,
    t10: g.top10,
    t25: g.top25,
    earnings: g.earnings,
    alt: g.isAlt || false,
  }));
}

function formatTierForPrompt(tierIndex: number): string {
  const tier = tiers[tierIndex];
  const players = getTierPlayers(tierIndex);
  const rows = players
    .map(
      (p) =>
        `${p.name}${p.alt ? " (ALT)" : ""} | OWGR:${p.owgr ?? "NR"} | ${p.events}ev/${p.cuts}cuts | W:${p.wins} T10:${p.t10} T25:${p.t25} | ${p.earnings}`
    )
    .join("\n");
  return `${tier.label} — ${tier.oddsRange}\n${rows}`;
}

// ── Agent definitions ──────────────────────────────────────────────────────
const AGENTS = [
  {
    id: "floor",
    name: "Floor Scout",
    sub: "Jack's Chalk Pick",
    emoji: "\u{1F3DB}\uFE0F",
    color: "#4ade80",
    border: "rgba(74,222,128,0.2)",
    bg: "rgba(74,222,128,0.06)",
    getSystem: () => `${POOL_CONTEXT}
You are the Floor Scout. Your job is to find the BEST PICK FOR JACK — the chalk/floor entry.
Jack's strategy: maximize cut-making probability, consistency, and guaranteed points accumulation. Avoid zeroes at all cost.
Score players on: cut rate (cuts/events), T25 rate, OWGR reliability, earnings consistency.
Ignore upside — Jack needs a floor, not a ceiling.
Flag ALT players as risky.
Be decisive. Name your top pick and explain why in 150 words max.`,
  },
  {
    id: "ceiling",
    name: "Ceiling Hunter",
    sub: "Abe's Contrarian Pick",
    emoji: "\u{1F680}",
    color: "#f97316",
    border: "rgba(249,115,22,0.2)",
    bg: "rgba(249,115,22,0.06)",
    getSystem: () => `${POOL_CONTEXT}
You are the Ceiling Hunter. Your job is to find the BEST PICK FOR ABE — the contrarian/ceiling entry.
Abe's strategy: maximize tournament-winning upside and field differentiation. In a ~300-entry pool, picking the same player as everyone else is worthless even if they win. Abe needs to zig when the field zags.
Score players on: win potential, recent hot form, potential low ownership in this tier, upside vs. the chalky picks.
Note if a player is likely to be heavily owned (bad for Abe) vs. under-the-radar (good for Abe).
Flag but don't necessarily avoid ALT players — the risk/reward might be worth it for Abe.
Be decisive. Name your top pick and explain why in 150 words max.`,
  },
  {
    id: "researcher",
    name: "Course Intel",
    sub: "TPC Sawgrass + Current Form",
    emoji: "\u{1F52C}",
    color: "#60a5fa",
    border: "rgba(96,165,250,0.2)",
    bg: "rgba(96,165,250,0.06)",
    getSystem: () => `${POOL_CONTEXT}
You are the Course Intel Agent. Use web search to find real, current information about:
1. Which players in this tier have strong TPC Sawgrass / Players Championship history
2. Current form — any players who are red hot or ice cold right NOW heading into The Players
3. Any injury news, withdrawal risk, or notable recent results that affect picks in this tier
Be specific with data — mention actual past finishes at TPC Sawgrass where you can find them.
150 words max. Name names from the tier, not generic advice.`,
  },
];

const JUDGE = {
  id: "judge",
  name: "The Commissioner",
  sub: "Final Verdict",
  emoji: "\u2696\uFE0F",
  color: "#e2b96e",
  border: "rgba(226,185,110,0.3)",
  bg: "rgba(226,185,110,0.06)",
};

// ── Stat bar ───────────────────────────────────────────────────────────────
function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${Math.min((value / max) * 100, 100)}%`,
          background: color,
          borderRadius: 2,
          transition: "width 0.5s",
        }}
      />
    </div>
  );
}

// ── Pulse dots ─────────────────────────────────────────────────────────────
function PulseDots({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: 5, padding: "8px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            animation: `pickpulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PickIntelligence() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [results, setResults] = useState<Record<string, string>>({});
  const [verdict, setVerdict] = useState("");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [error, setError] = useState("");

  const tierPlayers = selectedTier !== null ? getTierPlayers(selectedTier) : [];
  const maxCuts = tierPlayers.length ? Math.max(...tierPlayers.map((p) => p.cuts)) : 1;
  const maxT10 = tierPlayers.length ? Math.max(...tierPlayers.map((p) => p.t10), 1) : 1;

  async function runDebate() {
    if (selectedTier === null) return;
    setPhase("running");
    setResults({});
    setVerdict("");
    setError("");
    const tierData = formatTierForPrompt(selectedTier);

    try {
      // Run 3 agents, accumulate results locally
      const localResults: Record<string, string> = {};
      for (const agent of AGENTS) {
        setActiveAgent(agent.id);
        const useSearch = agent.id === "researcher";
        const text = await callDebateAPI({
          system: agent.getSystem(),
          prompt: `Analyze this tier and give your recommendation:\n\n${tierData}`,
          useSearch,
          maxTokens: 600,
        });
        localResults[agent.id] = text;
        setResults((prev) => ({ ...prev, [agent.id]: text }));
      }

      // Judge — use local results to avoid stale state
      setActiveAgent("judge");
      const agentOutputs = AGENTS.map(
        (a) => `${a.name} (${a.sub}):\n${localResults[a.id] || ""}`
      ).join("\n\n---\n\n");

      const judgeText = await callDebateAPI({
        system: `${POOL_CONTEXT}
You are The Commissioner — the final decision-maker for this golf pool.
You've heard from three analysts. Now deliver the final verdict.
Format your response EXACTLY like this:
JACK PICKS: [Name] — [1 sentence why]
ABE PICKS: [Name] — [1 sentence why]
REASONING: [2-3 sentences synthesizing the key factors that drove these recommendations]
WATCH OUT: [1 sentence on the biggest risk or caveat]`,
        prompt: `Tier being analyzed: ${tiers[selectedTier].label} — ${tiers[selectedTier].oddsRange}\n\nAnalyst reports:\n\n${agentOutputs}\n\nTier data for reference:\n${tierData}\n\nDeliver your final verdict.`,
        maxTokens: 400,
      });
      setVerdict(judgeText);
      setPhase("done");
      setActiveAgent(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setPhase("idle");
      setActiveAgent(null);
    }
  }

  const isRunning = phase === "running";

  return (
    <div>
      <style>{`
        @keyframes pickpulse { 0%,80%,100%{transform:scale(0.5);opacity:0.2} 40%{transform:scale(1);opacity:1} }
      `}</style>

      {/* Header */}
      <div className="mb-6 rounded-xl border border-[var(--green-accent)]/20 bg-[var(--green-accent)]/5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-[var(--green-accent)] sm:text-2xl">
              POLLACK POOL &mdash; PICK INTELLIGENCE
            </h2>
            <p className="mt-1 font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
              THE PLAYERS CHAMPIONSHIP &middot; TPC SAWGRASS &middot; 4-AGENT ANALYSIS
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] text-[var(--text-muted)]">ENTRIES</p>
            <p className="text-2xl font-extrabold tracking-wider text-amber-400">~300</p>
          </div>
        </div>
      </div>

      {/* Strategy Legend */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--green-accent)]/15 bg-[var(--green-accent)]/5 p-4">
          <p className="mb-1 font-mono text-[10px] tracking-widest text-[var(--green-accent)]">
            JACK &mdash; CHALK / FLOOR
          </p>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">
            Maximize cut-making. Avoid zeroes. Steady accumulation. Best OWGR + cut rate in tier.
          </p>
        </div>
        <div className="rounded-lg border border-orange-500/15 bg-orange-500/5 p-4">
          <p className="mb-1 font-mono text-[10px] tracking-widest text-orange-400">
            ABE &mdash; CONTRARIAN / CEILING
          </p>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">
            Tournament upside. Differentiate from ~300 entries. Low ownership + high ceiling beats safe picks.
          </p>
        </div>
      </div>

      {/* Tier Selector */}
      <div className="mb-6">
        <p className="mb-3 font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
          SELECT TIER TO ANALYZE
        </p>
        <div className="flex flex-wrap gap-2">
          {tiers.map((t, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedTier(i);
                setPhase("idle");
                setResults({});
                setVerdict("");
                setError("");
              }}
              className={`rounded-lg border px-4 py-2.5 font-mono text-xs transition-all ${
                selectedTier === i
                  ? "border-[var(--green-accent)]/40 bg-[var(--green-accent)]/15 text-[var(--green-accent)]"
                  : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-white"
              }`}
            >
              TIER {i + 1}
              <span className="mt-0.5 block text-[9px] opacity-70">{t.oddsRange.replace("Odds Rank ", "")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Player Table */}
      {selectedTier !== null && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
              {tiers[selectedTier].label.toUpperCase()} &middot; {tierPlayers.length} PLAYERS
            </p>
            <button
              onClick={runDebate}
              disabled={isRunning}
              className={`rounded-lg border px-5 py-2 font-mono text-xs tracking-wider transition-all ${
                isRunning
                  ? "cursor-not-allowed border-[var(--green-accent)]/10 bg-[var(--green-accent)]/5 text-[var(--green-accent)]/30"
                  : "border-[var(--green-accent)]/35 bg-[var(--green-accent)]/15 text-[var(--green-accent)] hover:bg-[var(--green-accent)]/25"
              }`}
            >
              {isRunning ? "ANALYZING..." : "RUN ANALYSIS"}
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
            <div style={{ minWidth: 700 }}>
              {/* Table Header */}
              <div
                className="border-b border-[var(--card-border)] bg-white/[0.02] px-4 py-2.5"
                style={{ display: "grid", gridTemplateColumns: "1fr 60px 80px 60px 60px 60px 100px" }}
              >
                {["PLAYER", "OWGR", "CUTS", "WINS", "T10", "T25", "EARNINGS"].map((h) => (
                  <div key={h} className="font-mono text-[9px] tracking-widest text-[var(--text-muted)]">
                    {h}
                  </div>
                ))}
              </div>

              {/* Player Rows */}
              {tierPlayers.map((p, i) => {
                const cutRate = p.events > 0 ? p.cuts / p.events : 0;
                return (
                  <div
                    key={i}
                    className="border-b border-white/[0.03] px-4 py-2 last:border-b-0"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 60px 80px 60px 60px 60px 100px",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#c8c4bb]">{p.name}</span>
                      {p.alt && (
                        <span className="rounded border border-orange-500/20 bg-orange-500/10 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-orange-400">
                          ALT
                        </span>
                      )}
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: p.owgr && p.owgr <= 30 ? "#4ade80" : "#666" }}
                    >
                      {p.owgr ?? "NR"}
                    </div>
                    <div>
                      <div
                        className="mb-0.5 font-mono text-xs"
                        style={{
                          color: cutRate >= 0.8 ? "#4ade80" : cutRate >= 0.6 ? "#e2b96e" : "#f87171",
                        }}
                      >
                        {p.cuts}/{p.events}
                      </div>
                      <StatBar
                        value={p.cuts}
                        max={maxCuts}
                        color={cutRate >= 0.8 ? "#4ade80" : cutRate >= 0.6 ? "#e2b96e" : "#f87171"}
                      />
                    </div>
                    <div className="font-mono text-xs" style={{ color: p.wins > 0 ? "#e2b96e" : "#444" }}>
                      {p.wins || "\u2014"}
                    </div>
                    <div>
                      <div
                        className="mb-0.5 font-mono text-xs"
                        style={{ color: p.t10 > 0 ? "#60a5fa" : "#444" }}
                      >
                        {p.t10 || "\u2014"}
                      </div>
                      {p.t10 > 0 && <StatBar value={p.t10} max={maxT10} color="#60a5fa" />}
                    </div>
                    <div className="font-mono text-xs" style={{ color: p.t25 > 0 ? "#888" : "#333" }}>
                      {p.t25 || "\u2014"}
                    </div>
                    <div className="font-mono text-[11px] text-[#555]">{p.earnings}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="mb-6 font-mono text-sm text-red-400">{error}</p>}

      {/* Agent Results */}
      {(Object.keys(results).length > 0 || isRunning) && (
        <div className="mb-8">
          <p className="mb-4 font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
            ANALYST REPORTS
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="rounded-lg transition-all"
                style={{
                  background: agent.bg,
                  border: `1px solid ${activeAgent === agent.id ? agent.color : agent.border}`,
                  padding: "18px",
                  boxShadow: activeAgent === agent.id ? `0 0 20px ${agent.color}22` : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${agent.border}`,
                  }}
                >
                  <span className="text-lg">{agent.emoji}</span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: agent.color }}>
                      {agent.name}
                    </div>
                    <div className="font-mono text-[9px] tracking-wider text-[#444]">{agent.sub}</div>
                  </div>
                </div>
                {activeAgent === agent.id && !results[agent.id] ? (
                  <PulseDots color={agent.color} />
                ) : results[agent.id] ? (
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#bbb]">
                    {results[agent.id]}
                  </p>
                ) : (
                  <p className="text-xs italic text-[#333]">Waiting...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verdict */}
      {(verdict || activeAgent === "judge") && (
        <div
          className="rounded-xl transition-all"
          style={{
            background: JUDGE.bg,
            border: `1px solid ${activeAgent === "judge" ? JUDGE.color : JUDGE.border}`,
            padding: "16px 16px",
            boxShadow: activeAgent === "judge" ? `0 0 30px rgba(226,185,110,0.15)` : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              paddingBottom: 14,
              borderBottom: "1px solid rgba(226,185,110,0.15)",
            }}
          >
            <span className="text-2xl">{JUDGE.emoji}</span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest" style={{ color: JUDGE.color }}>
                {JUDGE.name}
              </div>
              <div className="font-mono text-[9px] tracking-wider text-[#555]">{JUDGE.sub}</div>
            </div>
          </div>
          {activeAgent === "judge" && !verdict ? (
            <PulseDots color={JUDGE.color} />
          ) : (
            <div className="whitespace-pre-wrap text-[14.5px] leading-[1.85] text-[#d4cfc5]">
              {verdict.split("\n").map((line, i) => {
                const isJack = line.startsWith("JACK PICKS:");
                const isAbe = line.startsWith("ABE PICKS:");
                const isLabel =
                  isJack || isAbe || line.startsWith("REASONING:") || line.startsWith("WATCH OUT:");
                return (
                  <div key={i} className={isLabel ? "mb-1.5" : "mb-0.5"}>
                    {isJack ? (
                      <span>
                        <span className="mr-2 rounded bg-[var(--green-accent)]/10 px-2 py-0.5 font-mono text-[11px] tracking-wider text-[var(--green-accent)]">
                          JACK
                        </span>
                        <span className="text-[#e0ddd6]">{line.replace("JACK PICKS:", "").trim()}</span>
                      </span>
                    ) : isAbe ? (
                      <span>
                        <span className="mr-2 rounded bg-orange-500/10 px-2 py-0.5 font-mono text-[11px] tracking-wider text-orange-400">
                          ABE
                        </span>
                        <span className="text-[#e0ddd6]">{line.replace("ABE PICKS:", "").trim()}</span>
                      </span>
                    ) : isLabel ? (
                      <span className="font-mono text-[10px] tracking-wider text-amber-400">{line}</span>
                    ) : (
                      <span className="text-[#bbb]">{line}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

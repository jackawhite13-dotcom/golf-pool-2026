"use client";

import { useState } from "react";
import { callDebateAPI } from "@/lib/debate-api";

const AGENTS = [
  {
    id: "advocate",
    name: "The Advocate",
    emoji: "\u26A1",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.25)",
    role: "You are The Advocate. Your job is to make the STRONGEST possible case FOR the given position or in favor of the best solution. Be bold, specific, and persuasive. Lead with your thesis, support with 2-3 sharp arguments. Be concise (150 words max).",
  },
  {
    id: "skeptic",
    name: "The Skeptic",
    emoji: "\u{1F525}",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.25)",
    role: "You are The Skeptic. Your job is to challenge assumptions, find weaknesses, and argue the OPPOSING or most critical view. Don't just be negative — point to what's actually missing or wrong. Be sharp and direct. 150 words max.",
  },
  {
    id: "analyst",
    name: "The Analyst",
    emoji: "\u{1F52C}",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.25)",
    role: "You are The Analyst. Your job is to evaluate this question empirically — what does evidence, data, or first principles actually suggest? Avoid opinion. Focus on what is most likely TRUE based on logic and evidence. 150 words max.",
  },
];

const JUDGE = {
  id: "judge",
  name: "The Judge",
  emoji: "\u2696\uFE0F",
  color: "#e2b96e",
  bg: "rgba(226,185,110,0.08)",
  border: "rgba(226,185,110,0.3)",
};

const PHASES = ["idle", "round1", "round2", "judging", "done"] as const;

function PulseDots({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            opacity: 0.6,
            animation: `debatepulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function AgentCard({
  agent,
  content,
  loading,
}: {
  agent: (typeof AGENTS)[number];
  content?: string;
  loading: boolean;
}) {
  return (
    <div
      className="rounded-xl transition-all"
      style={{
        background: agent.bg,
        border: `1px solid ${agent.border}`,
        padding: "20px",
        minHeight: 160,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
          paddingBottom: 12,
          borderBottom: `1px solid ${agent.border}`,
        }}
      >
        <span className="text-lg">{agent.emoji}</span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: agent.color }}>
          {agent.name}
        </span>
      </div>
      {loading ? (
        <PulseDots color={agent.color} />
      ) : content ? (
        <p className="text-[13.5px] leading-relaxed text-[#ccc]">{content}</p>
      ) : (
        <p className="text-[13px] italic text-[#333]">Waiting...</p>
      )}
    </div>
  );
}

function SectionHeader({ label, subtitle }: { label: string; subtitle: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">{label}</span>
      <span className="font-mono text-xs text-[#444]">&middot; {subtitle}</span>
      <div className="ml-2 h-px flex-1 bg-white/[0.06]" />
    </div>
  );
}

export default function DebateArena() {
  const [topic, setTopic] = useState("");
  const [phase, setPhase] = useState<(typeof PHASES)[number]>("idle");
  const [round1, setRound1] = useState<Record<string, string>>({});
  const [round2, setRound2] = useState<Record<string, string>>({});
  const [verdict, setVerdict] = useState("");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function runDebate() {
    if (!topic.trim()) return;
    setError("");
    setRound1({});
    setRound2({});
    setVerdict("");
    setPhase("round1");

    try {
      // Round 1: Independent positions
      const r1: Record<string, string> = {};
      for (const agent of AGENTS) {
        setActiveAgent(agent.id);
        const res = await callDebateAPI({
          system: agent.role,
          prompt: `The topic/question is: "${topic}"\n\nState your position.`,
          maxTokens: 1000,
        });
        r1[agent.id] = res;
        setRound1((prev) => ({ ...prev, [agent.id]: res }));
      }

      // Round 2: Cross-critique
      setPhase("round2");
      const r2: Record<string, string> = {};
      for (const agent of AGENTS) {
        setActiveAgent(agent.id);
        const others = AGENTS.filter((a) => a.id !== agent.id)
          .map((a) => `${a.name}: ${r1[a.id]}`)
          .join("\n\n");
        const res = await callDebateAPI({
          system:
            agent.role +
            " Now respond to what the other agents said. Push back, refine, or double down based on their arguments. 120 words max.",
          prompt: `Topic: "${topic}"\n\nYour original position: ${r1[agent.id]}\n\nOther agents said:\n${others}\n\nRespond to their arguments.`,
          maxTokens: 1000,
        });
        r2[agent.id] = res;
        setRound2((prev) => ({ ...prev, [agent.id]: res }));
      }

      // Judge synthesizes
      setPhase("judging");
      setActiveAgent("judge");
      const allArguments = AGENTS.map(
        (a) => `${a.name}:\nRound 1: ${r1[a.id]}\nRound 2: ${r2[a.id]}`
      ).join("\n\n---\n\n");

      const judgeVerdict = await callDebateAPI({
        system: `You are The Judge — a wise, impartial synthesizer. You've watched three agents debate a topic. Your job is to:
1. Identify which arguments were strongest and why
2. Note where agents agreed (this is usually important)
3. Give a FINAL VERDICT: the most defensible answer or course of action
4. Be direct. 200 words max.`,
        prompt: `Topic: "${topic}"\n\nThe debate:\n\n${allArguments}\n\nDeliver your verdict.`,
        maxTokens: 1000,
      });
      setVerdict(judgeVerdict);
      setPhase("done");
      setActiveAgent(null);
    } catch (e) {
      setError("Something went wrong: " + (e instanceof Error ? e.message : "unknown error"));
      setPhase("idle");
      setActiveAgent(null);
    }
  }

  const isRunning = phase !== "idle" && phase !== "done";

  return (
    <div>
      <style>{`
        @keyframes debatepulse { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:0.9} }
      `}</style>

      {/* Input */}
      <div className="mb-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
          Enter a question or decision to debate
        </p>
        <div className="flex gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isRunning && runDebate()}
            placeholder="e.g. Should we go chalk in Tier 1 or take a contrarian swing?"
            disabled={isRunning}
            className="flex-1 rounded-lg border border-[var(--card-border)] bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder-[#555] outline-none focus:border-[var(--green-accent)]/30"
          />
          <button
            onClick={runDebate}
            disabled={isRunning || !topic.trim()}
            className={`whitespace-nowrap rounded-lg px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all ${
              isRunning
                ? "cursor-not-allowed bg-white/[0.05] text-[#555]"
                : "bg-amber-400 text-[#0a0a0f] hover:bg-amber-300"
            }`}
          >
            {isRunning ? "Debating..." : "Start Debate"}
          </button>
        </div>
        {error && <p className="mt-3 font-mono text-[13px] text-red-400">{error}</p>}
      </div>

      {/* Phase indicator */}
      {phase !== "idle" && (
        <div className="mb-8 flex flex-wrap gap-2">
          {(
            [
              { key: "round1", label: "Round 1 \u00B7 Positions" },
              { key: "round2", label: "Round 2 \u00B7 Rebuttals" },
              { key: "judging", label: "Verdict" },
            ] as const
          ).map(({ key, label }) => {
            const idx = PHASES.indexOf(phase);
            const myIdx = PHASES.indexOf(key);
            const active = phase === key;
            const done = idx > myIdx;
            return (
              <div
                key={key}
                className="rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wider"
                style={{
                  background: active
                    ? "rgba(226,185,110,0.15)"
                    : done
                    ? "rgba(255,255,255,0.04)"
                    : "transparent",
                  borderColor: active
                    ? "rgba(226,185,110,0.4)"
                    : "rgba(255,255,255,0.06)",
                  color: active ? "#e2b96e" : done ? "#555" : "#333",
                }}
              >
                {active && "\u25CF "}
                {done && "\u2713 "}
                {label}
              </div>
            );
          })}
        </div>
      )}

      {/* Round 1 */}
      {(Object.keys(round1).length > 0 || phase === "round1") && (
        <section className="mb-10">
          <SectionHeader label="Round 1" subtitle="Independent Positions" />
          <div className="grid gap-4 sm:grid-cols-3">
            {AGENTS.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                content={round1[agent.id]}
                loading={activeAgent === agent.id && phase === "round1"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Round 2 */}
      {(Object.keys(round2).length > 0 || phase === "round2") && (
        <section className="mb-10">
          <SectionHeader label="Round 2" subtitle="Rebuttals & Cross-Critique" />
          <div className="grid gap-4 sm:grid-cols-3">
            {AGENTS.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                content={round2[agent.id]}
                loading={activeAgent === agent.id && phase === "round2"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Verdict */}
      {(verdict || phase === "judging") && (
        <section>
          <SectionHeader label="Verdict" subtitle="Judge's Synthesis" />
          <div
            className="rounded-xl"
            style={{
              background: JUDGE.bg,
              border: `1px solid ${JUDGE.border}`,
              padding: "28px 32px",
            }}
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-2xl">{JUDGE.emoji}</span>
              <span className="font-mono text-[13px] font-bold uppercase tracking-widest" style={{ color: JUDGE.color }}>
                {JUDGE.name}
              </span>
            </div>
            {phase === "judging" && !verdict ? (
              <PulseDots color={JUDGE.color} />
            ) : (
              <p className="text-[15px] leading-[1.75] text-[#ddd]">{verdict}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

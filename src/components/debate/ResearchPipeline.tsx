"use client";

import { useState, type ReactNode } from "react";
import { callDebateAPI } from "@/lib/debate-api";

// ── Pipeline stages ──────────────────────────────────────────────────────────

async function stagePlan(topic: string) {
  return callDebateAPI({
    system: `You are a Research Planner. Given a topic, produce exactly 4 focused research questions that together would give comprehensive coverage of the topic.
Return ONLY a JSON array of 4 strings. No preamble, no markdown fences. Example: ["question 1","question 2","question 3","question 4"]`,
    prompt: `Topic: "${topic}"`,
    maxTokens: 400,
  });
}

async function stageResearch(question: string, topicContext: string) {
  return callDebateAPI({
    system: `You are a Research Agent. Use web search to find current, accurate information answering the research question below.
Synthesize what you find into a clear, factual summary of 200-300 words. Cite sources inline where possible.`,
    prompt: `Overall topic: "${topicContext}"\nYour specific research question: "${question}"\n\nResearch and answer this question thoroughly.`,
    useSearch: true,
    maxTokens: 1000,
  });
}

async function stageWrite(topic: string, questionsAndFindings: { question: string; finding: string }[]) {
  const context = questionsAndFindings
    .map((q, i) => `### Research ${i + 1}: ${q.question}\n${q.finding}`)
    .join("\n\n");
  return callDebateAPI({
    system: `You are a Senior Writer. You have been given research findings from multiple research agents.
Synthesize them into a polished, well-structured analytical report on the topic.
Use clear headers (##), include an executive summary at the top, and end with key takeaways.
Write in a clear, professional tone. Aim for 500-700 words.`,
    prompt: `Topic: "${topic}"\n\nResearch Findings:\n\n${context}\n\nWrite the full report now.`,
    maxTokens: 2000,
  });
}

async function stageEdit(draft: string, topic: string) {
  return callDebateAPI({
    system: `You are a Senior Editor. Your job is to take a draft report and improve it:
- Sharpen the executive summary to be punchy and specific
- Fix any logical gaps, redundancies, or weak transitions
- Strengthen the key takeaways to be actionable
- Improve clarity and flow throughout
Return the fully revised report. Keep the same structure but make every sentence earn its place.`,
    prompt: `Topic: "${topic}"\n\nDraft report:\n\n${draft}\n\nReturn the polished final version.`,
    maxTokens: 2000,
  });
}

// ── UI definitions ───────────────────────────────────────────────────────────

const STAGE_DEFS = [
  { id: "plan", label: "Planner", emoji: "\u{1F5FA}\uFE0F", desc: "Breaking topic into research questions", color: "#a78bfa", border: "rgba(167,139,250,0.25)", bg: "rgba(167,139,250,0.06)" },
  { id: "research", label: "Researchers", emoji: "\u{1F50D}", desc: "Searching the web for each question", color: "#34d399", border: "rgba(52,211,153,0.25)", bg: "rgba(52,211,153,0.06)" },
  { id: "write", label: "Writer", emoji: "\u270D\uFE0F", desc: "Synthesizing findings into a draft", color: "#60a5fa", border: "rgba(96,165,250,0.25)", bg: "rgba(96,165,250,0.06)" },
  { id: "edit", label: "Editor", emoji: "\u{1FA84}", desc: "Polishing and finalizing the report", color: "#fbbf24", border: "rgba(251,191,36,0.25)", bg: "rgba(251,191,36,0.06)" },
];

function PulseDots({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "12px 4px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            animation: `researchpulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Section({
  color,
  emoji,
  title,
  subtitle,
  children,
}: {
  color: string;
  emoji: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="text-lg">{emoji}</span>
        <span className="font-mono text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          {title}
        </span>
        <span className="font-mono text-[11px] text-[#444]">&middot; {subtitle}</span>
        <div className="ml-2 h-px flex-1 bg-white/[0.05]" />
      </div>
      {children}
    </div>
  );
}

export default function ResearchPipeline() {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [findings, setFindings] = useState<{ question: string; finding: string }[]>([]);
  const [activeResearch, setActiveResearch] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  async function run() {
    if (!topic.trim() || status === "running") return;
    setStatus("running");
    setError("");
    setQuestions([]);
    setFindings([]);
    setDraft("");
    setReport("");
    setActiveResearch(null);

    try {
      // Stage 1: Plan
      setActiveStage("plan");
      const planRaw = await stagePlan(topic);
      let qs: string[];
      try {
        qs = JSON.parse(planRaw);
        if (!Array.isArray(qs)) throw new Error();
      } catch {
        qs = planRaw.split("\n").filter(Boolean).slice(0, 4);
      }
      setQuestions(qs);

      // Stage 2: Research
      setActiveStage("research");
      const allFindings: { question: string; finding: string }[] = [];
      for (let i = 0; i < qs.length; i++) {
        setActiveResearch(i);
        const finding = await stageResearch(qs[i], topic);
        allFindings.push({ question: qs[i], finding });
        setFindings([...allFindings]);
      }
      setActiveResearch(null);

      // Stage 3: Write
      setActiveStage("write");
      const draftText = await stageWrite(topic, allFindings);
      setDraft(draftText);

      // Stage 4: Edit
      setActiveStage("edit");
      const finalReport = await stageEdit(draftText, topic);
      setReport(finalReport);

      setActiveStage(null);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
      setActiveStage(null);
    }
  }

  const isRunning = status === "running";
  const stageOrder = ["plan", "research", "write", "edit"];

  return (
    <div>
      <style>{`
        @keyframes researchpulse { 0%,80%,100%{transform:scale(0.5);opacity:0.2} 40%{transform:scale(1);opacity:1} }
      `}</style>

      {/* Input */}
      <div className="mb-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
          Research topic
        </p>
        <div className="flex gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isRunning && run()}
            placeholder='e.g. "TPC Sawgrass course history and which player profiles excel there"'
            disabled={isRunning}
            className="flex-1 rounded-lg border border-[var(--card-border)] bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder-[#555] outline-none focus:border-purple-400/30"
          />
          <button
            onClick={run}
            disabled={isRunning || !topic.trim()}
            className={`whitespace-nowrap rounded-lg px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all ${
              isRunning
                ? "cursor-not-allowed bg-white/[0.04] text-[#444]"
                : "bg-purple-400 text-[#0a0a0f] hover:bg-purple-300"
            }`}
          >
            {isRunning ? "Running..." : "Run Pipeline"}
          </button>
        </div>
        {error && <p className="mt-3 font-mono text-[13px] text-red-400">{error}</p>}
      </div>

      {/* Pipeline status track */}
      {status !== "idle" && (
        <div className="mb-10 flex gap-0">
          {STAGE_DEFS.map((s, i) => {
            const activeIdx = stageOrder.indexOf(activeStage || "");
            const isDone = status === "done" || activeIdx > i;
            const isActive = activeStage === s.id;
            return (
              <div key={s.id} className="relative flex flex-1 flex-col items-center">
                {i < 3 && (
                  <div
                    className="absolute left-1/2 top-[18px] w-full transition-colors"
                    style={{ height: 1, background: isDone ? s.color : "rgba(255,255,255,0.08)", zIndex: 0 }}
                  />
                )}
                <div
                  className="z-[1] flex h-9 w-9 items-center justify-center rounded-full text-base transition-all"
                  style={{
                    background: isActive ? s.color : isDone ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                    border: `2px solid ${isActive ? s.color : isDone ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isActive ? `0 0 16px ${s.color}66` : "none",
                  }}
                >
                  {isDone && !isActive ? "\u2713" : s.emoji}
                </div>
                <span
                  className="mt-2 font-mono text-[11px] uppercase tracking-widest"
                  style={{ color: isActive ? s.color : isDone ? "#888" : "#444" }}
                >
                  {s.label}
                </span>
                {isActive && (
                  <span
                    className="mt-1 max-w-[90px] text-center font-mono text-[10px]"
                    style={{ color: s.color, opacity: 0.7 }}
                  >
                    {s.desc}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Research questions */}
      {questions.length > 0 && (
        <Section color="#a78bfa" emoji="\u{1F5FA}\uFE0F" title="Research Plan" subtitle={`${questions.length} questions generated`}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {questions.map((q, i) => (
              <div
                key={i}
                className="rounded-lg p-3.5 transition-colors"
                style={{
                  background: "rgba(167,139,250,0.05)",
                  border: `1px solid ${activeResearch === i ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.15)"}`,
                }}
              >
                <span className="font-mono text-[10px] tracking-wider text-purple-400">Q{i + 1}</span>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#ccc]">{q}</p>
                {findings[i] && (
                  <span className="mt-2 inline-block font-mono text-[10px] tracking-wider text-emerald-400">
                    \u2713 researched
                  </span>
                )}
                {activeResearch === i && <PulseDots color="#34d399" />}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Research findings */}
      {findings.length > 0 && (
        <Section
          color="#34d399"
          emoji="\u{1F50D}"
          title="Research Findings"
          subtitle={`${findings.length} of ${questions.length} complete`}
        >
          {findings.map((f, i) => (
            <div
              key={i}
              className="mb-4 rounded-lg p-4"
              style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.15)" }}
            >
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                Q{i + 1}: {f.question}
              </p>
              <p className="text-[13.5px] leading-[1.75] text-[#bbb]">{f.finding}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Final report */}
      {(report || (draft && activeStage === "edit")) && (
        <Section color="#fbbf24" emoji="\u{1F4C4}" title="Final Report" subtitle="Researched \u00B7 Written \u00B7 Edited">
          <div className="whitespace-pre-wrap rounded-xl border border-white/[0.08] bg-white/[0.025] p-7 text-[15px] leading-[1.85] text-[#e0ddd6]">
            {report || draft}
          </div>
          {status === "done" && (
            <button
              onClick={() => {
                const blob = new Blob([report], { type: "text/plain" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `${topic.slice(0, 40).replace(/\s+/g, "-")}-report.txt`;
                a.click();
              }}
              className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-400 hover:bg-amber-400/20"
            >
              Download Report
            </button>
          )}
        </Section>
      )}

      {/* Writer loading */}
      {activeStage === "write" && !draft && (
        <Section color="#60a5fa" emoji="\u270D\uFE0F" title="Writer" subtitle="Synthesizing all findings...">
          <PulseDots color="#60a5fa" />
        </Section>
      )}
    </div>
  );
}

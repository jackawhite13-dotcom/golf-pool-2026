"use client";

import { useState } from "react";
import PickIntelligence from "@/components/debate/PickIntelligence";
import DebateArena from "@/components/debate/DebateArena";
import ResearchPipeline from "@/components/debate/ResearchPipeline";

const TABS = [
  { id: "picks" as const, label: "Pick Intelligence", icon: "\u26A1" },
  { id: "debate" as const, label: "Debate Arena", icon: "\u2694\uFE0F" },
  { id: "research" as const, label: "Research Pipeline", icon: "\u{1F4E1}" },
];

type Tab = (typeof TABS)[number]["id"];

export default function DebatePage() {
  const [tab, setTab] = useState<Tab>("picks");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Tab navigation */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[var(--card-border)] pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
              tab === t.id
                ? "border-[var(--green-accent)]/30 bg-[var(--green-accent)]/10 text-[var(--green-accent)]"
                : "border-transparent text-[var(--text-muted)] hover:text-white"
            }`}
          >
            <span className="mr-1.5">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "picks" && <PickIntelligence />}
      {tab === "debate" && <DebateArena />}
      {tab === "research" && <ResearchPipeline />}
    </div>
  );
}

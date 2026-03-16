"use client";

import { useState } from "react";
import { tournaments } from "@/data/tiers";
import { PLAYERS_RESULTS } from "@/data/playersResults";
import type { GolferResult } from "@/data/playersResults";

/* ── Helpers ────────────────────────────────────────────────────────── */

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

function VerdictBadge({ verdict }: { verdict: GolferResult["verdict"] }) {
  const styles = {
    great: "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
    good: "bg-blue-900/40 text-blue-400 border-blue-800/50",
    ok: "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
    bad: "bg-red-900/40 text-red-400 border-red-800/50",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${styles[verdict]}`}>
      {verdict}
    </span>
  );
}

function ConfidenceBar({ value, color }: { value: number; color: "blue" | "amber" }) {
  const bg = color === "blue" ? "bg-blue-500" : "bg-amber-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-white/10">
        <div className={`h-full rounded-full ${bg}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[10px] tabular-nums text-[var(--text-muted)]">{value}%</span>
    </div>
  );
}

/* ── Pick Results Table ─────────────────────────────────────────────── */

function PickResultsTable({ picks, teamColor }: { picks: GolferResult[]; teamColor: "blue" | "amber" }) {
  const borderColor = teamColor === "blue" ? "border-blue-900/40" : "border-amber-900/40";
  const total = picks.reduce((sum, p) => sum + p.points, 0);

  return (
    <div className="space-y-2">
      {picks.map((pick) => (
        <div
          key={pick.name}
          className={`rounded-lg border ${borderColor} bg-[var(--background)] p-3`}
        >
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--card-bg)] text-[10px] font-bold text-[var(--green-accent)]">
                {pick.tier}
              </span>
              <span className="text-sm font-semibold">{pick.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <VerdictBadge verdict={pick.verdict} />
              <span className={`text-sm font-bold ${pick.madeCut ? "text-white" : "text-red-400"}`}>
                {pick.madeCut ? `${pick.points} pts` : "MC — 0 pts"}
              </span>
            </div>
          </div>
          <div className="mb-2 flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>Finished: <strong className="text-white">{pick.position}</strong></span>
            <span>&middot;</span>
            <span>Pre-confidence: {teamColor === "blue" ? pick.preConfidenceJack : pick.preConfidenceAbe}%</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">{pick.note}</p>
        </div>
      ))}
      <div className={`rounded-lg border ${borderColor} bg-[var(--background)] p-3 text-center`}>
        <span className="text-sm text-[var(--text-muted)]">Total: </span>
        <span className="text-lg font-bold">{total} pts</span>
      </div>
    </div>
  );
}

/* ── Players Championship Retrospective Tab ─────────────────────────── */

function PlayersTab() {
  const r = PLAYERS_RESULTS;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <SectionCard className="border-[var(--green-accent)]/20 bg-[var(--green-dark)]/10">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-lg font-bold">The Players Championship</h2>
          <span className="rounded-full bg-[var(--text-muted)] px-2 py-0.5 text-[10px] font-bold text-black">
            COMPLETED
          </span>
        </div>
        <p className="mb-4 text-xs text-[var(--text-muted)]">
          {r.location} &middot; {r.dates} &middot; Winner: {r.winner} ({r.winnerScore}) &middot; {r.madeCut} made the cut
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-900/40 bg-blue-950/20 p-4 text-center">
            <p className="text-xs font-bold text-blue-400">JACK — {r.jack.team}</p>
            <p className="text-2xl font-extrabold">{r.jack.rank}th</p>
            <p className="text-sm font-semibold">{r.jack.totalPoints} pts</p>
          </div>
          <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-4 text-center">
            <p className="text-xs font-bold text-amber-400">ABE — {r.abe.team}</p>
            <p className="text-2xl font-extrabold">{r.abe.rank}th</p>
            <p className="text-sm font-semibold">{r.abe.totalPoints} pts</p>
          </div>
        </div>
      </SectionCard>

      {/* Pick-by-Pick Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Jack&apos;s Picks — {r.jack.totalPoints} pts (#{r.jack.rank})
          </h3>
          <PickResultsTable picks={r.jack.picks} teamColor="blue" />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400">
            Abe&apos;s Picks — {r.abe.totalPoints} pts (#{r.abe.rank})
          </h3>
          <PickResultsTable picks={r.abe.picks} teamColor="amber" />
        </div>
      </div>

      {/* What Worked / What Didn't */}
      <div className="grid gap-4 sm:grid-cols-2">
        <SectionCard>
          <h3 className="mb-3 text-sm font-semibold text-emerald-400">What Worked</h3>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            {r.insights.whatWorked.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-0.5 text-emerald-400">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard>
          <h3 className="mb-3 text-sm font-semibold text-red-400">What Didn&apos;t</h3>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            {r.insights.whatDidnt.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-0.5 text-red-400">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Key Takeaways */}
      <SectionCard>
        <h3 className="mb-3 text-sm font-semibold text-[var(--green-accent)]">Key Takeaways for The Masters</h3>
        <ul className="space-y-2 text-xs text-[var(--text-muted)]">
          {r.insights.takeaways.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 font-bold text-[var(--green-accent)]">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

/* ── Masters Tab (Pre-Tournament Analysis) ──────────────────────────── */

function MastersTab() {
  const { mastersCourseIntel: course, mastersTierAnalysis: tierAnalysis, mastersRecommendedPicks: picks } = require("@/data/mastersAnalysis");

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionCard className="border-[var(--green-accent)]/20 bg-[var(--green-dark)]/10">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-lg font-bold">The Masters</h2>
          <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black">
            NEXT UP
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Augusta National Golf Club &middot; Apr 9–12, 2026 &middot; Top 50 + ties make the cut
        </p>
      </SectionCard>

      {/* Course Intel */}
      <SectionCard>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Course Intel — Augusta National
        </h3>
        <div className="space-y-3 text-sm text-[var(--text-muted)]">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-lg font-bold text-white">{course.par}</p>
              <p className="text-[10px]">Par</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-lg font-bold text-white">{course.yardage.toLocaleString()}</p>
              <p className="text-[10px]">Yards</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-lg font-bold text-white">Top 50+T</p>
              <p className="text-[10px]">Cut</p>
            </div>
          </div>
          <div>
            <p className="mb-1 font-semibold text-white">Key Stats That Win:</p>
            <ul className="space-y-1">
              {course.keyStats.map((stat: string, i: number) => (
                <li key={i}>- {stat}</li>
              ))}
            </ul>
          </div>
          {course.strategyNotes && (
            <div>
              <p className="mb-1 font-semibold text-white">Strategy Notes:</p>
              <ul className="space-y-1">
                {course.strategyNotes.map((note: string, i: number) => (
                  <li key={i}>- {note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Tier-by-Tier Analysis */}
      {tierAnalysis ? (
        Object.entries(tierAnalysis).map(([tierNum, players]) => {
          const tierLetter = String.fromCharCode(64 + Number(tierNum));
          const playerList = players as { name: string; jackConfidence: number; abeConfidence: number; rationale: string; chalk: string; contrarian: string }[];
          return (
            <SectionCard key={tierNum}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
                Tier {tierLetter} — Rank {Number(tierNum) < 7 ? `${(Number(tierNum) - 1) * 10 + 1}–${Number(tierNum) * 10}` : "61+"}
              </h3>
              <div className="space-y-3">
                {playerList.map((player) => (
                  <div key={player.name} className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold">{player.name}</span>
                    </div>
                    <div className="mb-2 grid grid-cols-2 gap-2">
                      <div>
                        <p className="mb-0.5 text-[10px] text-blue-400">Jack (Chalk)</p>
                        <ConfidenceBar value={player.jackConfidence} color="blue" />
                      </div>
                      <div>
                        <p className="mb-0.5 text-[10px] text-amber-400">Abe (Contrarian)</p>
                        <ConfidenceBar value={player.abeConfidence} color="amber" />
                      </div>
                    </div>
                    <p className="mb-1 text-xs text-[var(--text-muted)]">{player.rationale}</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="font-semibold text-blue-400">Chalk: </span>
                        <span className="text-[var(--text-muted)]">{player.chalk}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-400">Contrarian: </span>
                        <span className="text-[var(--text-muted)]">{player.contrarian}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          );
        })
      ) : (
        <SectionCard>
          <p className="text-center text-sm text-[var(--text-muted)]">
            Full tier-by-tier analysis will be available closer to tournament week.
          </p>
        </SectionCard>
      )}

      {/* Recommended Picks */}
      {picks && (
        <div className="grid gap-4 sm:grid-cols-2">
          <SectionCard className="border-blue-900/40">
            <h3 className="mb-3 text-sm font-semibold text-blue-400">Jack&apos;s Picks (Chalk)</h3>
            <div className="space-y-2">
              {picks.jack.picks.map((pick: { tier: number; name: string; reasoning: string }) => (
                <div key={pick.tier} className="flex gap-2 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--background)] text-[10px] font-bold text-[var(--green-accent)]">
                    {String.fromCharCode(64 + pick.tier)}
                  </span>
                  <div>
                    <span className="font-semibold">{pick.name}</span>
                    <p className="text-[10px] text-[var(--text-muted)]">{pick.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard className="border-amber-900/40">
            <h3 className="mb-3 text-sm font-semibold text-amber-400">Abe&apos;s Picks (Contrarian)</h3>
            <div className="space-y-2">
              {picks.abe.picks.map((pick: { tier: number; name: string; reasoning: string }) => (
                <div key={pick.tier} className="flex gap-2 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--background)] text-[10px] font-bold text-[var(--green-accent)]">
                    {String.fromCharCode(64 + pick.tier)}
                  </span>
                  <div>
                    <span className="font-semibold">{pick.name}</span>
                    <p className="text-[10px] text-[var(--text-muted)]">{pick.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

/* ── Placeholder Tab ────────────────────────────────────────────────── */

function PlaceholderTab({ tournament }: { tournament: typeof tournaments[number] }) {
  return (
    <SectionCard className="text-center">
      <h2 className="mb-2 text-lg font-bold">{tournament.name}</h2>
      <p className="mb-1 text-sm text-[var(--text-muted)]">
        {tournament.location} &middot; {tournament.dates}
      </p>
      <p className="mt-4 text-sm text-[var(--text-muted)]">
        Analysis will be available closer to the tournament.
      </p>
    </SectionCard>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────── */

const TAB_NAMES = ["The Players", "The Masters", "PGA Champ.", "US Open", "The Open"];

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState(1); // Default to Masters

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">The 5 Tournaments</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Analysis, picks, and results for each tournament in the 2026 season.
        </p>
      </div>

      {/* Tab Bar */}
      <div className="mb-8 flex gap-1 overflow-x-auto rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-1">
        {TAB_NAMES.map((name, i) => {
          const isActive = activeTab === i;
          const isCompleted = tournaments[i].status === "completed";
          return (
            <button
              key={name}
              onClick={() => setActiveTab(i)}
              className={`flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                isActive
                  ? "bg-[var(--green-accent)] text-black"
                  : "text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-white"
              }`}
            >
              {name}
              {isCompleted && !isActive && (
                <span className="ml-1 text-[10px] opacity-60">&#10003;</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && <PlayersTab />}
      {activeTab === 1 && <MastersTab />}
      {activeTab === 2 && <PlaceholderTab tournament={tournaments[2]} />}
      {activeTab === 3 && <PlaceholderTab tournament={tournaments[3]} />}
      {activeTab === 4 && <PlaceholderTab tournament={tournaments[4]} />}
    </div>
  );
}

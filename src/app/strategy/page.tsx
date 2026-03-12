import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy Center | Majors Pool 2026",
  description: "Jack & Abe coordination hub — game theory, financial arrangements, and season-long planning.",
};

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-[var(--green-accent)] underline underline-offset-2 hover:text-white"
    >
      {label} ↗
    </a>
  );
}

export default function StrategyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[var(--green-accent)]">
          Jack &amp; Abe
        </p>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Strategy Center</h1>
        <p className="max-w-2xl text-sm text-[var(--text-muted)]">
          Two entries in a ~559-person, ~$175K golf pool. Maximize the combined
          probability of cashing across 5 tournaments and the cumulative standings.
        </p>
      </div>

      {/* Locked-In Strategy */}
      <SectionCard className="mb-8 border-[var(--green-accent)]/30 bg-[var(--green-dark)]/20">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-lg font-bold text-[var(--green-accent)]">Our Strategy (Locked In)</h2>
          <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black">
            CONFIRMED
          </span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong className="text-white">1. Different golfers across both entries.</strong>{" "}
            Two differentiated entries nearly double our probability of cashing vs. identical lineups.
          </p>
          <p>
            <strong className="text-white">2. Chalk + Contrarian method.</strong>{" "}
            Jack runs the high-floor chalk lineup. Abe runs the high-ceiling contrarian lineup.
          </p>
          <p>
            <strong className="text-white">3. 50/50 split on all winnings. No exceptions.</strong>{" "}
            Everything pooled equally. $575 total cost, $287.50 each.
          </p>
          <p>
            <strong className="text-white">4. Optimize per-tournament first.</strong>{" "}
            80% of the pot is in individual events. Cumulative takes care of itself
            if we pick well week-to-week.
          </p>
        </div>
      </SectionCard>

      {/* Section A: Game Theory — Why Different Picks */}
      <SectionCard className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Why Different Picks Win</h2>

        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
            <h3 className="mb-2 text-sm font-bold text-red-400">Same Picks</h3>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• Effectively 1 entry in a 559-person pool</li>
              <li>• ~0.8% chance of cashing per tournament</li>
              <li>• ~6.4% chance of cashing all season</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--green-accent)]/30 bg-[var(--green-dark)]/20 p-4">
            <h3 className="mb-2 text-sm font-bold text-[var(--green-accent)]">Different Picks</h3>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• 2 independent shots per tournament</li>
              <li>• ~1.67% chance of cashing per tournament</li>
              <li>• ~12.5% chance of cashing all season</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          Over 5 tournaments with 2 entries each, we get 10 shots at the top 4. Any single
          cash more than pays for the entire $575 investment.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <SourceLink href="https://www.stokastic.com/news/pga-dfs-leverage-game-theory-large-field-gpp-strategy-ac11/" label="Stokastic: GPP Game Theory" />
          <SourceLink href="https://www.fantasylabs.com/articles/the-power-and-myth-of-dfs-diversification-and-the-marauders-map/" label="FantasyLabs: Diversification" />
        </div>
      </SectionCard>

      {/* Section B: Ownership Leverage */}
      <SectionCard className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Ownership Leverage</h2>

        <p className="mb-4 text-sm text-[var(--text-muted)]">
          If 60% of entries roster Scheffler in Tier A, then Scheffler winning doesn&apos;t
          differentiate you — ~335 other entries also have him. Your edge comes from the other
          6 tiers. A 5%-owned golfer who finishes top 5 separates you from the field instantly.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-900/40 bg-blue-950/20 p-3">
            <p className="mb-1 text-xs font-bold text-blue-400">JACK: The Floor (Chalk)</p>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• Tier A-B: Favorites, proven cut-makers</li>
              <li>• Tier C-G: Consistent players with top-25 upside</li>
              <li>• Goal: accumulate points, compete for cumulative</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-3">
            <p className="mb-1 text-xs font-bold text-amber-400">ABE: The Ceiling (Contrarian)</p>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• Tier A-B: Fade chalk, target low-owned with win equity</li>
              <li>• Tier C-G: Hot form, recent winners, sleepers</li>
              <li>• Goal: hunt tournament wins, accept more variance</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <SourceLink href="https://dfsbuild.com/dfs-gpp-strategy/" label="DFSBuild: GPP Strategy" />
          <SourceLink href="http://www.columbia.edu/~mh2078/DFS_Revision_1_May2019.pdf" label="Columbia: DFS Research" />
        </div>
      </SectionCard>

      {/* Section C: Tournament vs. Cumulative — condensed to a card */}
      <SectionCard className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Tournament vs. Cumulative</h2>

        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[var(--background)] p-4 text-center">
            <p className="text-2xl font-bold text-[var(--green-accent)]">80%</p>
            <p className="text-xs font-semibold text-white">Individual Tournaments</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              ~$140K across 5 events. Top 4-5 paid per event.
              Differentiate and hunt for wins.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--background)] p-4 text-center">
            <p className="text-2xl font-bold">20%</p>
            <p className="text-xs font-semibold text-white">Cumulative Season</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              ~$35K for top 10 season-long. Missed cut = 0 pts.
              Consistency matters here.
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          <strong className="text-white">Key insight:</strong> Jack&apos;s chalk entry naturally
          covers cumulative (safe cut-makers). Abe&apos;s contrarian entry hunts tournament wins
          where 80% of the money is. Don&apos;t chase cumulative early — let it accumulate naturally
          and adjust mid-season if we&apos;re leading.
        </p>
      </SectionCard>

      {/* Key Takeaways */}
      <SectionCard>
        <h2 className="mb-4 text-xl font-bold">Key Takeaways</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">1</span>
            <div>
              <p className="text-sm font-semibold text-white">Differentiate entries</p>
              <p className="text-xs text-[var(--text-muted)]">
                Two different lineups doubles our hit rate vs. identical entries.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">2</span>
            <div>
              <p className="text-sm font-semibold text-white">50/50 split, always</p>
              <p className="text-xs text-[var(--text-muted)]">
                Aligns incentives. Both share risk and reward.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">3</span>
            <div>
              <p className="text-sm font-semibold text-white">Jack = chalk, Abe = contrarian</p>
              <p className="text-xs text-[var(--text-muted)]">
                Jack covers cumulative. Abe hunts tournament cashes.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">4</span>
            <div>
              <p className="text-sm font-semibold text-white">Any single cash = profit</p>
              <p className="text-xs text-[var(--text-muted)]">
                Even 4th in one tournament returns 3.4x our $575 investment.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Sources */}
      <div className="mt-8 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <h3 className="mb-2 text-sm font-bold">Sources</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <SourceLink href="https://www.stokastic.com/news/pga-dfs-leverage-game-theory-large-field-gpp-strategy-ac11/" label="Stokastic: GPP Strategy" />
          <SourceLink href="https://dfsbuild.com/dfs-gpp-strategy/" label="DFSBuild: GPP Guide" />
          <SourceLink href="https://www.fantasylabs.com/articles/using-game-theory-in-daily-fantasy-tournaments/" label="FantasyLabs: Game Theory" />
          <SourceLink href="http://www.columbia.edu/~mh2078/DFS_Revision_1_May2019.pdf" label="Columbia: DFS Research" />
          <SourceLink href="https://poolgenius.teamrankings.com/pga-golf-one-and-done-picks/articles/one-and-done-pools-golf-strategy-advice/" label="PoolGenius: Golf Strategy" />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { tiers } from "@/data/tiers";
import TierCard from "@/components/TierCard";
import LineupSummary from "@/components/LineupSummary";

export const metadata: Metadata = {
  title: "The Players Championship | Majors Pool 2026",
  description: "Course intel, tier-by-tier analysis, and recommended picks for TPC Sawgrass 2026.",
};

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

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

// Pick recommendations by tier
const picks = {
  1: {
    top: "Scheffler, Scottie",
    topReasoning: "World #1, already has a win and a 3rd in 2026, leads the Tour in SG: Tee-to-Green. Scheffler has historically dominated at TPC Sawgrass — his ball-striking is perfectly suited to a course that demands precision approaches into elevated, island-style greens. 5/5 cuts made this season with $3.5M in earnings. The chalk play, but in a pool this size it's about what you pair him with.",
    topConfidence: "High" as const,
    contrarian: "Bhatia, Akshay",
    contrarianReasoning: "Already has a win AND a 2nd-place finish in 2026, with $5.4M in earnings (highest in Tier 1). His aggressive style and exceptional iron play could pop at Sawgrass. Only 4/6 cuts made adds variance, but when he's on, he contends. Lower ownership than Scheffler/McIlroy/Morikawa makes him a strong GPP pivot.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://datagolf.com/player-profiles", label: "DataGolf Player Profiles" },
      { href: "https://www.pgatour.com/stats/detail/02675", label: "PGA Tour SG: Total" },
    ],
  },
  2: {
    top: "Bridgeman, Jacob",
    topReasoning: "The breakout star of 2026 — 1 win, 3 top-10s, 6/6 cuts made, $5.5M in earnings, OWGR 19 and climbing fast. His iron play has been elite this season. Despite being the statistical leader in this tier, he may fly under the radar for pool entrants who don't follow young Tour players closely. 100% cuts-made rate is crucial for cumulative scoring.",
    topConfidence: "High" as const,
    contrarian: "Hojgaard, Nicolai",
    contrarianReasoning: "4/4 cuts made, a 3rd-place finish, 2 top-10s, and strong ball-striking numbers. The Hojgaard twins have big-game DNA and Nicolai has been steadily improving. At OWGR 50, he's likely to be under-rostered compared to bigger names like Hovland or Burns in this tier.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://fantasynational.com/pga/player-profiles", label: "FantasyNational Profiles" },
      { href: "https://datagolf.com/rankings", label: "DataGolf Rankings" },
    ],
  },
  3: {
    top: "Hisatsune, Ryo",
    topReasoning: "The volume horse of Tier 3 — 6/7 cuts made, a 3rd-place finish, 3 top-10s, and $1.7M earned. Outstanding consistency for a tier where most players have been spotty. His approach play has been excellent, which is the key skill at TPC Sawgrass. At OWGR 64, he's a value play that delivers reliable points.",
    topConfidence: "High" as const,
    contrarian: "Castillo, Ricky",
    contrarianReasoning: "Has a WIN in 2026 plus another top-10. 5/5 cuts made. OWGR 139 means he'll be almost completely unowned, but his results speak for themselves — $1.2M earned this season. If he wins or contends, you'll have near-exclusive leverage in a 300-person pool.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://www.pgatour.com/players", label: "PGA Tour Player Pages" },
      { href: "https://datagolf.com/player-profiles", label: "DataGolf Profiles" },
    ],
  },
  4: {
    top: "Rodgers, Patrick",
    topReasoning: "Elite consistency: 7/7 cuts made (only player in Tier 4 with 100% rate), plus a 3rd-place finish and a top-10. Has $1.05M in earnings, the most in Tier 4 alongside Fox. At Sawgrass, making the cut is half the battle — Rodgers' iron play gives him a floor that most Tier 4 options can't match.",
    topConfidence: "High" as const,
    contrarian: "Moore, Taylor",
    contrarianReasoning: "4/4 cuts made with a 2ND-place finish and a top-10. $837K earned on only 4 events is outstanding efficiency. If he can replicate that runner-up form at Sawgrass, he's a massive differentiator at OWGR 138. The risk is small sample size (4 events), but the upside profile is elite for Tier 4.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://fantasynational.com/pga/course-fit", label: "FantasyNational Course Fit" },
      { href: "https://www.pgatour.com/stats", label: "PGA Tour Stats" },
    ],
  },
  5: {
    top: "Schmid, Matti",
    topReasoning: "Two 3rd-place finishes and 2 top-10s across 8 events — he's been knocking on the door all season. 5/8 cuts made isn't elite, but the upside is clear: when he makes the cut, he tends to contend. His approach play has been a strength, which plays at Sawgrass.",
    topConfidence: "Medium" as const,
    contrarian: "Dahmen, Joel",
    contrarianReasoning: "Two 3rd-place finishes on only 3 cuts made in 5 events. He's the definition of high-variance in this tier — when he's on, he's top-3 good. At OWGR 160, he'll be almost completely unowned. The risk is the missed cuts, but in a GPP you're paying for the ceiling, not the floor.",
    contrarianConfidence: "Low" as const,
    sources: [
      { href: "https://datagolf.com/predictive-model", label: "DataGolf Predictions" },
    ],
  },
  6: {
    top: "Hoge, Tom",
    topReasoning: "A 3rd-place finish and 2 top-10s this season. Hoge has strong TPC Sawgrass history and his ball-striking profiles well for the course. 4/7 cuts isn't great, but his ceiling is the highest in Tier 6 — the top-10 and 3rd-place finishes show he can contend when his game is on.",
    topConfidence: "Medium" as const,
    contrarian: "Potgieter, Aldrich",
    contrarianReasoning: "Only 2/6 cuts made, but one of those included a 3rd-place finish worth $878K — the highest earnings in Tier 6. He's 20 years old with massive length off the tee. Extreme boom-or-bust profile. In Abe's contrarian entry, this is exactly the kind of swing you want: near-zero ownership with a legitimate top-5 ceiling if his putting cooperates.",
    contrarianConfidence: "Low" as const,
    sources: [
      { href: "https://www.pgatour.com/players/player.52372.tom-hoge.html", label: "PGA Tour: Tom Hoge" },
    ],
  },
  7: {
    top: "Putnam, Andrew",
    topReasoning: "A 2nd-place finish and a top-10 on only 4 events — that's an outstanding hit rate. $682K in earnings is BY FAR the highest in Tier 7. When he makes the cut (2/4), he contends hard. His iron play has been sharp this season and he has PGA Tour experience that most Tier 7 options lack.",
    topConfidence: "Medium" as const,
    contrarian: "Riley, Davis",
    contrarianReasoning: "A 3rd-place finish and a top-10 in 2026. $322K earned. At OWGR 102, he's the highest-ranked player in Tier 7 alongside Vegas. His approach play has been strong and he has the game to contend at Sawgrass. 3/6 cuts made is acceptable for a GPP contrarian play.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://fantasynational.com/pga", label: "FantasyNational PGA" },
    ],
  },
};

export default function PlayersChampionshipPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[var(--green-accent)]">
          Tournament 1 of 5
        </p>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          The Players Championship
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          TPC Sawgrass (Stadium Course) · Ponte Vedra Beach, FL · March 12–15, 2026
        </p>
      </div>

      {/* Section A: Course Intel */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">Course Intel: TPC Sawgrass</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          What wins at the Stadium Course — and why it matters for your picks
        </p>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Course Profile</h3>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong className="text-white">Par:</strong> 72 · <strong className="text-white">Yards:</strong> ~7,245</li>
              <li><strong className="text-white">Grass:</strong> Bermuda overseeded with rye (March conditions)</li>
              <li><strong className="text-white">Key features:</strong> Island green (17th), narrow fairways, elevated greens, extensive water hazards</li>
              <li><strong className="text-white">Signature challenge:</strong> Demanding approach shots into small, well-guarded greens</li>
              <li><strong className="text-white">Wind:</strong> Typically breezy with variable direction, affects club selection significantly</li>
            </ul>
          </div>
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Key Stats That Win Here</h3>
            <div className="space-y-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Approach</span>
                  <span className="text-xs font-bold text-[var(--green-accent)]">Most Important</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "95%" }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Around-the-Green</span>
                  <span className="text-xs text-[var(--text-muted)]">Very Important</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "80%" }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Putting</span>
                  <span className="text-xs text-[var(--text-muted)]">Important</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "70%" }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Off-the-Tee</span>
                  <span className="text-xs text-[var(--text-muted)]">Moderate</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "55%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-[var(--background)] p-4">
          <h3 className="mb-2 text-sm font-semibold text-white">Historical Winners &amp; Patterns</h3>
          <div className="mb-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Year</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Winner</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Key Strength</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-muted)]">
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2025</td><td className="py-1.5 pr-3">Scheffler, Scottie</td><td className="py-1.5 pr-3">Elite ball-striking, SG: Approach</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2024</td><td className="py-1.5 pr-3">Scheffler, Scottie</td><td className="py-1.5 pr-3">Dominant SG: Tee-to-Green</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2023</td><td className="py-1.5 pr-3">Scheffler, Scottie</td><td className="py-1.5 pr-3">Iron play, consistency</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2022</td><td className="py-1.5 pr-3">Smith, Cameron</td><td className="py-1.5 pr-3">Putting, short game</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2021</td><td className="py-1.5 pr-3">Thomas, Justin</td><td className="py-1.5 pr-3">Iron play, clutch putting</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2020</td><td className="py-1.5 pr-3">Cancelled (COVID)</td><td className="py-1.5 pr-3">—</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2019</td><td className="py-1.5 pr-3">McIlroy, Rory</td><td className="py-1.5 pr-3">All-around game, SG: Approach</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-3 text-white">2018</td><td className="py-1.5 pr-3">Simpson, Webb</td><td className="py-1.5 pr-3">Accuracy, approach play</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            <strong className="text-white">Pattern:</strong> Sawgrass winners are overwhelmingly
            elite iron players. Scheffler&apos;s 3-peat (2023-2025) shows how dominant SG: Approach
            translates at this venue. Length off the tee is less important than accuracy — this is
            an iron player&apos;s course, not a bomber&apos;s course.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <SourceLink href="https://datagolf.com/course-fit" label="DataGolf: Course Fit Tool" />
            <SourceLink href="https://www.pgatour.com/tournaments/the-players-championship/past-results" label="PGA Tour: Past Results" />
            <SourceLink href="https://fantasynational.com/pga/course-history" label="FantasyNational: Course History" />
          </div>
        </div>

        <div className="rounded-lg border border-amber-900/30 bg-amber-950/10 p-4">
          <h3 className="mb-2 text-sm font-semibold text-amber-400">Why The Players Matters Most</h3>
          <ul className="space-y-1 text-xs text-[var(--text-muted)]">
            <li>• <strong className="text-white">Tournament 1 of 5:</strong> Sets the tone for the season. A strong start builds confidence and cumulative points.</li>
            <li>• <strong className="text-white">Largest field:</strong> ~144 players means more variance, more upside from contrarian picks, and more importance on differentiation.</li>
            <li>• <strong className="text-white">Most data available:</strong> Full PGA Tour stats available for nearly every player. Later tournaments (Masters, Open Championship) have smaller, less predictable fields.</li>
            <li>• <strong className="text-white">Cumulative scoring:</strong> Making the cut here starts accumulating cumulative points immediately. Missed cut = 0, which is hard to recover from over only 5 events.</li>
          </ul>
        </div>
      </SectionCard>

      {/* Section B: Pool Strategy */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">Pool-Specific Strategy for The Players</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          ~300 entries, top 4 paid per tournament. How to approach each tier.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Ownership Projections</h3>
            <p className="mb-3 text-xs text-[var(--text-muted)]">
              Based on historical DFS ownership data and pool dynamics (estimated):
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded border border-[var(--card-border)] p-2">
                <p className="text-xs text-[var(--text-muted)]">Scheffler (T1)</p>
                <p className="text-lg font-bold text-white">~45-55%</p>
                <p className="text-[10px] text-[var(--text-muted)]">Most-rostered in pool</p>
              </div>
              <div className="rounded border border-[var(--card-border)] p-2">
                <p className="text-xs text-[var(--text-muted)]">McIlroy (T1)</p>
                <p className="text-lg font-bold text-white">~20-30%</p>
                <p className="text-[10px] text-[var(--text-muted)]">2nd most-rostered</p>
              </div>
              <div className="rounded border border-[var(--card-border)] p-2">
                <p className="text-xs text-[var(--text-muted)]">Morikawa (T1)</p>
                <p className="text-lg font-bold text-white">~10-15%</p>
                <p className="text-[10px] text-[var(--text-muted)]">Strong but lower profile</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              <strong className="text-white">Key insight:</strong> If ~150 entries have Scheffler,
              your differentiation has to come from Tiers 2-7. Even if Scheffler wins, you&apos;re
              competing against ~150 other Scheffler entries for the top 4 spots — meaning your
              other 6 picks determine your ranking.
            </p>
            <div className="mt-2">
              <SourceLink href="https://fantasynational.com/pga/ownership" label="FantasyNational: Ownership Projections" />
            </div>
          </div>

          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Tier-by-Tier Approach</h3>
            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <p>
                <strong className="text-white">Tiers 1-2:</strong> This is where ownership is most
                concentrated. The top 3-4 players will be on 60%+ of entries combined. Taking chalk
                here is fine for Jack&apos;s safe entry — but Abe should pivot to a 2nd-tier option
                to create separation.
              </p>
              <p>
                <strong className="text-white">Tiers 3-4:</strong> The &ldquo;messy middle&rdquo; where
                ownership spreads out. This is where you can gain the most leverage. A player with
                3-5% ownership who finishes top-10 is worth more than a 30%-owned player who finishes
                top-10, because fewer entries benefit.
              </p>
              <p>
                <strong className="text-white">Tiers 5-7:</strong> Low ownership across the board.
                Most pool entrants will just pick a name they recognize. Use data (cuts made rate,
                recent top-10s, SG stats) to find edges the field is missing.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section C: Tier-by-Tier Picks */}
      <div className="mb-8">
        <h2 className="mb-1 text-xl font-bold">Tier-by-Tier Pick Recommendations</h2>
        <p className="mb-6 text-xs text-[var(--text-muted)]">
          Top pick + contrarian alternative for each tier, with reasoning and stats
        </p>

        <div className="space-y-4">
          {tiers.map((tier) => {
            const tierPick = picks[tier.tier as keyof typeof picks];
            return (
              <TierCard
                key={tier.tier}
                tier={tier}
                topPick={tierPick.top}
                topReasoning={tierPick.topReasoning}
                topConfidence={tierPick.topConfidence}
                contrarianPick={tierPick.contrarian}
                contrarianReasoning={tierPick.contrarianReasoning}
                contrarianConfidence={tierPick.contrarianConfidence}
                sources={tierPick.sources}
              />
            );
          })}
        </div>
      </div>

      {/* Lineup Summaries */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <LineupSummary
          name="Jack"
          role="The Floor (Chalk)"
          color="blue"
          picks={[
            { tier: 1, golfer: "Scheffler, Scottie", rationale: "World #1, 3-peat at Sawgrass" },
            { tier: 2, golfer: "Bridgeman, Jacob", rationale: "6/6 cuts, best stats in tier" },
            { tier: 3, golfer: "Hisatsune, Ryo", rationale: "6/7 cuts, 3 top-10s" },
            { tier: 4, golfer: "Rodgers, Patrick", rationale: "7/7 cuts, ultimate safety" },
            { tier: 5, golfer: "Schmid, Matti", rationale: "Two 3rds, high ceiling" },
            { tier: 6, golfer: "Hoge, Tom", rationale: "3rd + 2 top-10s, Sawgrass history" },
            { tier: 7, golfer: "Putnam, Andrew", rationale: "2nd-place finish, best earner" },
          ]}
        />
        <LineupSummary
          name="Abe"
          role="The Ceiling (Contrarian)"
          color="amber"
          picks={[
            { tier: 1, golfer: "Bhatia, Akshay", rationale: "Win + 2nd, $5.4M, low ownership" },
            { tier: 2, golfer: "Hojgaard, Nicolai", rationale: "4/4 cuts, 3rd, rising form" },
            { tier: 3, golfer: "Castillo, Ricky", rationale: "Has a WIN, near-zero ownership" },
            { tier: 4, golfer: "Moore, Taylor", rationale: "2nd-place finish, low ownership" },
            { tier: 5, golfer: "Dahmen, Joel", rationale: "Two 3rds, boom-or-bust" },
            { tier: 6, golfer: "Potgieter, Aldrich", rationale: "Massive upside, 20 yrs old" },
            { tier: 7, golfer: "Riley, Davis", rationale: "3rd + top-10, OWGR 102" },
          ]}
        />
      </div>

      {/* Final Notes */}
      <SectionCard>
        <h2 className="mb-3 text-lg font-bold">Pre-Tournament Notes</h2>
        <div className="space-y-3 text-xs text-[var(--text-muted)]">
          <p>
            <strong className="text-white">Monitor the weather.</strong> TPC Sawgrass plays dramatically
            differently in wind. If heavy wind is forecast, accuracy and short-game players gain even more
            value. Consider adjusting lower-tier picks toward players with strong wind performance.
          </p>
          <p>
            <strong className="text-white">Check for withdrawals.</strong> Tier compositions can shift
            if a top player withdraws and an alternate gets in. ALT players (Horschel, Ford, Ventura,
            Kim Tom, Parry, Zalatoris) are flagged in the tier data — they may or may not end up in
            the field.
          </p>
          <p>
            <strong className="text-white">Lock in picks early.</strong> Tournament 1 sets the foundation
            for the cumulative standings. Both entries should aim to make all 7 golfers make the cut to
            start building cumulative points from Day 1.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <SourceLink href="https://datagolf.com" label="DataGolf" />
          <SourceLink href="https://fantasynational.com/pga" label="FantasyNational" />
          <SourceLink href="https://www.pgatour.com/stats" label="PGA Tour Stats" />
          <SourceLink href="https://rotogrinders.com/golf" label="RotoGrinders Golf" />
          <SourceLink href="https://www.actionnetwork.com/golf" label="Action Network" />
          <SourceLink href="https://weather.com/weather/tenday/l/Ponte+Vedra+Beach+FL" label="Weather Forecast" />
        </div>
        <p className="mt-3 text-[10px] text-[var(--text-muted)]">
          Note: Ownership projections are estimates based on historical DFS data and pool dynamics.
          SG stats referenced are from the 2025-2026 PGA Tour season. All stats should be verified
          against official sources before finalizing picks. Course history for Scheffler includes
          his 2023, 2024, and 2025 Players Championship wins.
        </p>
      </SectionCard>
    </div>
  );
}

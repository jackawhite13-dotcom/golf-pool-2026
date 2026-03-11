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
          A coordination hub for two entries in a ~477-person, ~$150K golf pool.
          The goal: maximize the combined probability of cashing across 5 tournaments
          and the season-long cumulative standings.
        </p>
      </div>

      {/* TL;DR Recommendation */}
      <SectionCard className="mb-8 border-[var(--green-accent)]/30 bg-[var(--green-dark)]/20">
        <h2 className="mb-3 text-lg font-bold text-[var(--green-accent)]">Recommended Approach (TL;DR)</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong className="text-white">1. Pick DIFFERENT golfers across both entries.</strong>{" "}
            In a 477-person GPP-style pool where only the top 4 cash (~1.3% per entry), differentiation
            is the single most important lever. Two identical entries give you 2 lottery tickets
            with the same numbers. Two differentiated entries nearly double your probability of
            having at least one entry in the money.
          </p>
          <p>
            <strong className="text-white">2. One chalk entry, one contrarian entry.</strong>{" "}
            Jack runs a &ldquo;high floor&rdquo; lineup built around favorites and safe cut-makers.
            Abe runs a &ldquo;high ceiling&rdquo; lineup targeting lower-owned, higher-upside players.
            This is the optimal GPP portfolio strategy per DFS research.
          </p>
          <p>
            <strong className="text-white">3. Pool all winnings 50/50.</strong>{" "}
            Since you&apos;re coordinating picks as a team, splitting everything equally keeps
            incentives aligned and eliminates the scenario where one person takes the contrarian
            role (higher variance) and gets nothing while the chalk entry cashes.
          </p>
          <p>
            <strong className="text-white">4. Prioritize individual tournament wins over cumulative.</strong>{" "}
            ~80% of the pot goes to per-tournament payouts. The cumulative scoring (20% of pot)
            is a nice bonus, but the math says to optimize tournament-by-tournament first.
            Jack&apos;s chalk entry will naturally do well in cumulative standings (consistency),
            while Abe&apos;s contrarian entry hunts for tournament wins.
          </p>
        </div>
      </SectionCard>

      {/* Section A: Same vs Different Picks */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">A. Same Golfers or Different Golfers?</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">Game theory analysis for a 477-entry pool</p>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
            <h3 className="mb-2 text-sm font-bold text-red-400">Same Picks (Correlated)</h3>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <li>• Outcomes are perfectly correlated — both win or both lose</li>
              <li>• Effectively 1 unique entry in a 477-person pool</li>
              <li>• Probability of cashing: ~1.3% (same as a single entry)</li>
              <li>• Wastes the strategic advantage of having 2 entries</li>
              <li>• Only logical if you&apos;re extremely confident in a specific lineup</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--green-accent)]/30 bg-[var(--green-dark)]/20 p-4">
            <h3 className="mb-2 text-sm font-bold text-[var(--green-accent)]">Different Picks (Diversified)</h3>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <li>• Near-independent outcomes — doubles your coverage</li>
              <li>• Probability of at least one entry cashing: ~2.6%</li>
              <li>• Allows chalk/contrarian portfolio construction</li>
              <li>• Standard GPP approach in DFS: differentiate to maximize upside</li>
              <li>• The math overwhelmingly favors this in large-field pools</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-[var(--background)] p-4 text-sm">
          <h4 className="mb-2 font-semibold">The Math</h4>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            With 477 entries and top-4 payouts per tournament, each entry has roughly a 0.84%
            chance of cashing in any given tournament. With two <em>identical</em> entries,
            your probability of cashing is still 0.84%. With two <em>independent</em> entries,
            the probability of at least one cashing is approximately 1 - (1 - 0.0084)² ≈ 1.67%.
            That&apos;s nearly double the hit rate for zero additional cost.
          </p>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            Over 5 tournaments, two independent entries give you roughly a 12.5% chance of
            cashing at least once all season, versus ~6.4% with identical entries. This is the
            foundational argument for diversification.
          </p>
          <div className="flex flex-wrap gap-3">
            <SourceLink
              href="https://www.stokastic.com/news/pga-dfs-leverage-game-theory-large-field-gpp-strategy-ac11/"
              label="Stokastic: GPP Game Theory"
            />
            <SourceLink
              href="https://www.fantasylabs.com/articles/the-power-and-myth-of-dfs-diversification-and-the-marauders-map/"
              label="FantasyLabs: DFS Diversification"
            />
            <SourceLink
              href="https://www.dfsarmy.com/2022/07/dfs-diversification-strategy-how-to-win-with-more-lineups-in-an-unpredictable-daily-fantasy-sports-world-mlb-nfl-nba-pga-nascar-nhl.html"
              label="DFS Army: Portfolio Strategy"
            />
          </div>
        </div>
      </SectionCard>

      {/* Section B: Financial Coordination */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">B. Financial Coordination</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">How to split winnings — 4 options analyzed</p>

        <div className="space-y-4">
          {/* Option 1 */}
          <div className="rounded-lg border border-[var(--green-accent)]/30 bg-[var(--green-dark)]/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-[var(--green-accent)] px-2 py-0.5 text-xs font-bold text-black">
                RECOMMENDED
              </span>
              <h3 className="text-sm font-bold">Option 1: 50/50 Split on All Winnings</h3>
            </div>
            <div className="grid gap-3 text-xs text-[var(--text-muted)] sm:grid-cols-2">
              <div>
                <p className="mb-1 font-semibold text-[var(--green-accent)]">Pros</p>
                <ul className="space-y-1">
                  <li>• Perfect incentive alignment — both benefit from either entry cashing</li>
                  <li>• Enables true portfolio construction (one person can take on more risk)</li>
                  <li>• Eliminates resentment if the contrarian entry gets lucky</li>
                  <li>• Simplest structure to manage across 5 tournaments</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 font-semibold text-red-400">Cons</p>
                <ul className="space-y-1">
                  <li>• Neither person gets the full solo win payday</li>
                  <li>• Requires trust — both must commit to the agreed strategy</li>
                </ul>
              </div>
            </div>
            <p className="mt-2 text-xs text-white">
              <strong>Net effect:</strong> Reduces variance, keeps incentives clean,
              and is the standard approach for coordinated DFS stables and sports betting syndicates.
            </p>
          </div>

          {/* Option 2 */}
          <div className="rounded-lg border border-[var(--card-border)] p-4">
            <h3 className="mb-2 text-sm font-bold">Option 2: Fully Independent (Each Keeps Own)</h3>
            <div className="grid gap-3 text-xs text-[var(--text-muted)] sm:grid-cols-2">
              <div>
                <p className="mb-1 font-semibold text-[var(--green-accent)]">Pros</p>
                <ul className="space-y-1">
                  <li>• Full upside if your entry wins</li>
                  <li>• No coordination required — pick whoever you want</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 font-semibold text-red-400">Cons</p>
                <ul className="space-y-1">
                  <li>• No incentive to coordinate — might as well not strategize together</li>
                  <li>• One person may feel pressure to go chalk (safe) instead of optimal GPP plays</li>
                  <li>• Creates misaligned incentives if one person is supposed to take the contrarian role</li>
                </ul>
              </div>
            </div>
            <p className="mt-2 text-xs text-white">
              <strong>Net effect:</strong> Higher variance per individual. Works if you don&apos;t want to
              coordinate at all, but defeats the purpose of strategizing together.
            </p>
          </div>

          {/* Option 3 */}
          <div className="rounded-lg border border-[var(--card-border)] p-4">
            <h3 className="mb-2 text-sm font-bold">Option 3: Pooled Entries, Proportional Split</h3>
            <div className="grid gap-3 text-xs text-[var(--text-muted)] sm:grid-cols-2">
              <div>
                <p className="mb-1 font-semibold text-[var(--green-accent)]">Pros</p>
                <ul className="space-y-1">
                  <li>• Fair if one person is paying more of the entry fee</li>
                  <li>• Scales if you add a 3rd entry or a 3rd person</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 font-semibold text-red-400">Cons</p>
                <ul className="space-y-1">
                  <li>• Adds complexity — what&apos;s &ldquo;proportional&rdquo; to each person&apos;s contribution?</li>
                  <li>• With equal entries ($350 each), this just reduces to 50/50 anyway</li>
                </ul>
              </div>
            </div>
            <p className="mt-2 text-xs text-white">
              <strong>Net effect:</strong> Identical to Option 1 when both are paying $350. Only relevant if
              entry costs differ.
            </p>
          </div>

          {/* Option 4 */}
          <div className="rounded-lg border border-[var(--card-border)] p-4">
            <h3 className="mb-2 text-sm font-bold">Option 4: Stake Swap (e.g., 20% Cross-Ownership)</h3>
            <div className="grid gap-3 text-xs text-[var(--text-muted)] sm:grid-cols-2">
              <div>
                <p className="mb-1 font-semibold text-[var(--green-accent)]">Pros</p>
                <ul className="space-y-1">
                  <li>• Common in poker — allows partial hedging while keeping skin in the game</li>
                  <li>• Each person still has 80% of their own upside</li>
                  <li>• Good middle ground between full split and fully independent</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 font-semibold text-red-400">Cons</p>
                <ul className="space-y-1">
                  <li>• Less incentive alignment than 50/50 — the contrarian player still bears more variance</li>
                  <li>• Slightly more complex to track across 5 tournaments + cumulative</li>
                </ul>
              </div>
            </div>
            <p className="mt-2 text-xs text-white">
              <strong>Net effect:</strong> A compromise. Works well if you want some coordination but still
              want to feel &ldquo;ownership&rdquo; of your entry. Common in DFS stables at 10-30% swap rates.
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Section C: Chalk vs Contrarian */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">C. Chalk vs. Contrarian in a 477-Person Pool</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          Top 4 paid out of 477 entries = ~0.8% cash rate. How does this affect strategy?
        </p>

        <div className="mb-6 space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">The Core Insight: Ownership Leverage</h3>
            <p className="mb-3">
              In a 477-person pool, if 60% of entries roster Scottie Scheffler in Tier 1, then Scheffler
              winning <em>doesn&apos;t help you much</em> — roughly 180 other entries also have him. Your &ldquo;edge&rdquo;
              comes from the other 6 tiers. But if you have a 5%-owned golfer who finishes top 5, you&apos;re
              immediately differentiated from ~285 other entries.
            </p>
            <p className="mb-3">
              This is the fundamental GPP principle from DFS (DraftKings, FanDuel): in large-field tournaments,
              the winners almost always have at least 1-2 low-ownership players who pop. The research from
              RotoGrinders, FantasyNational, and CSURAM88&apos;s DFS models consistently shows that{" "}
              <strong className="text-white">low-ownership leverage is the #1 predictor of GPP success</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <SourceLink
                href="https://www.stokastic.com/news/pga-dfs-leverage-game-theory-large-field-gpp-strategy-ac11/"
                label="Stokastic: Leverage &amp; Game Theory"
              />
              <SourceLink
                href="https://dfsbuild.com/dfs-gpp-strategy/"
                label="DFSBuild: GPP Strategy Guide"
              />
              <SourceLink
                href="https://www.fantasylabs.com/articles/using-game-theory-in-daily-fantasy-tournaments/"
                label="FantasyLabs: Game Theory in DFS"
              />
            </div>
          </div>

          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">What the Research Says</h3>
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Large fields favor contrarian players.</strong>{" "}
                A study of DraftKings golf GPPs with 10,000+ entries found that winning lineups
                had an average ownership of 8-12% per player, compared to the field average of 15-20%.
                In a 477-person pool, the same principle applies at a smaller scale.
              </li>
              <li>
                <strong className="text-white">Chalk can still work — if you differentiate elsewhere.</strong>{" "}
                Taking Scheffler in Tier 1 is fine if your Tiers 4-7 picks are low-ownership. The key
                is overall lineup uniqueness, not avoiding chalk entirely. You just need 2-3 contrarian
                plays per lineup to differentiate.
              </li>
              <li>
                <strong className="text-white">The &ldquo;barbell&rdquo; strategy works best.</strong>{" "}
                Pick 2-3 safe plays (chalk in Tiers 1-2) combined with 3-4 contrarian plays
                (low-owned picks in Tiers 3-7). This gives you a floor of production while
                maintaining upside from differentiation.
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-3">
              <SourceLink
                href="https://poolgenius.teamrankings.com/pga-golf-one-and-done-picks/articles/one-and-done-pools-golf-strategy-advice/"
                label="PoolGenius: Golf Strategy Advice"
              />
              <SourceLink
                href="https://athlonsports.com/fantasy/dfs-golf-primer-cash-games-vs-gpp"
                label="Athlon: Cash vs. GPP Primer"
              />
              <SourceLink
                href="http://www.columbia.edu/~mh2078/DFS_Revision_1_May2019.pdf"
                label="Columbia: DFS Academic Research (PDF)"
              />
            </div>
          </div>

          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">Applied to Jack &amp; Abe&apos;s Two Entries</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-blue-900/40 bg-blue-950/20 p-3">
                <p className="mb-1 text-xs font-bold text-blue-400">JACK: The Floor Entry (Chalk)</p>
                <ul className="space-y-1 text-xs">
                  <li>• Tier 1-2: Pick favorites (Scheffler, Morikawa, Bridgeman)</li>
                  <li>• Tier 3-5: Target consistent cut-makers with top-25 upside</li>
                  <li>• Tier 6-7: Safest options with cuts-made track record</li>
                  <li>• Goal: accumulate points every tournament, compete for cumulative</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-3">
                <p className="mb-1 text-xs font-bold text-amber-400">ABE: The Ceiling Entry (Contrarian)</p>
                <ul className="space-y-1 text-xs">
                  <li>• Tier 1-2: Fade the top picks — target 2nd/3rd options with win equity</li>
                  <li>• Tier 3-5: Go after players with recent hot form, even if inconsistent</li>
                  <li>• Tier 6-7: Swing for sleepers with a recent top-10 or win</li>
                  <li>• Goal: hunt for tournament wins, accept more missed cuts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section D: Season-Long vs Tournament */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">D. Season-Long vs. Tournament-by-Tournament</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          ~80% of pot goes to individual tournaments, ~20% to cumulative standings
        </p>

        <div className="space-y-4 text-sm text-[var(--text-muted)]">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">Payout Math</h3>
            <p className="mb-3">
              With 477 entries and a ~$165K pot: ~$132K goes to individual tournament payouts (~$26.4K per event),
              and ~$33K goes to cumulative season standings. The per-tournament payouts are where
              the big money is, but the cumulative payout is still significant.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--card-border)]">
                    <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Payout Pool</th>
                    <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Est. Amount</th>
                    <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">% of Pot</th>
                    <th className="py-2 text-left font-medium text-[var(--text-muted)]">Optimal Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--card-border)]/50">
                    <td className="py-2 pr-4 text-white">Per-Tournament (×5)</td>
                    <td className="py-2 pr-4">~$26.4K each</td>
                    <td className="py-2 pr-4">~80%</td>
                    <td className="py-2">Differentiate. Hunt for tournament wins.</td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)]/50">
                    <td className="py-2 pr-4 text-white">Cumulative Season</td>
                    <td className="py-2 pr-4">~$33K</td>
                    <td className="py-2 pr-4">~20%</td>
                    <td className="py-2">Consistency. Make cuts. Accumulate points.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white">Special Bonuses</td>
                    <td className="py-2 pr-4">TBD</td>
                    <td className="py-2 pr-4">Small</td>
                    <td className="py-2">Target winners and high earners.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">The Scoring System</h3>
            <p className="mb-2">
              Individual tournaments use place-finish scoring (not to-par). Points are awarded
              based on where each golfer finishes, with bonus points for 1st, 2nd, and 3rd place.
              This means:
            </p>
            <ul className="mb-3 space-y-1.5">
              <li>
                <strong className="text-white">Missed cut = 0 points.</strong> There&apos;s a significant
                gap between the last player who makes the cut and those who miss. This heavily penalizes
                volatility — a player who misses 2 cuts and wins 1 tournament may score <em>fewer</em>{" "}
                cumulative points than a player who makes 5 cuts with all top-25 finishes.
              </li>
              <li>
                <strong className="text-white">Bonus points for top 3</strong> reward golfers who
                contend and finish on the leaderboard. Picking a tournament winner is worth significantly
                more than picking a T20 finisher.
              </li>
              <li>
                <strong className="text-white">Cut-making is essential.</strong> In cumulative scoring,
                the floor matters more than the ceiling. A golfer who makes every cut at T30 is more
                valuable than one who alternates between T5 and MC.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-[var(--green-accent)]/20 bg-[var(--green-dark)]/10 p-4">
            <h3 className="mb-2 font-semibold text-[var(--green-accent)]">Recommended Split Between Entries</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold text-blue-400">JACK (Cumulative Focus)</p>
                <ul className="space-y-1 text-xs">
                  <li>• Prioritize cut-makers in every tier</li>
                  <li>• Look for golfers with 80%+ cuts-made rate in 2026</li>
                  <li>• Floor over ceiling — T20 finishes are great for cumulative</li>
                  <li>• This entry doubles as his individual tournament safety net</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold text-amber-400">ABE (Tournament Wins Focus)</p>
                <ul className="space-y-1 text-xs">
                  <li>• Optimize for upside — target golfers with win equity</li>
                  <li>• Accept more missed cuts in exchange for higher ceiling</li>
                  <li>• Look for golfers who have been &ldquo;knocking on the door&rdquo; (multiple 2nds/3rds)</li>
                  <li>• This entry is the GPP needle-threader</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">Season-Long Considerations</h3>
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Don&apos;t chase cumulative early.</strong>{" "}
                The Players is tournament 1 of 5. The cumulative standings won&apos;t be decided until
                July. Focus on making good individual picks each tournament and let the cumulative
                scores accumulate naturally.
              </li>
              <li>
                <strong className="text-white">Adjust strategy mid-season.</strong>{" "}
                If Jack&apos;s entry is leading the cumulative after 3 tournaments, shift his later picks
                to protect the lead (even more chalk). If Abe&apos;s entry cashes early, he can afford
                to get even more contrarian in later events.
              </li>
              <li>
                <strong className="text-white">The &ldquo;most winners&rdquo; bonus favors Abe&apos;s entry.</strong>{" "}
                Since Abe will be targeting higher-upside players with win equity, he&apos;s more likely
                to accidentally hit on a tournament winner. The &ldquo;most prize money&rdquo; bonus could
                go either way.
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Section E: Payout Scenarios */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">E. Payout Scenarios</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          All scenarios assume 477 entries, ~$165K total pot, 50/50 split between Jack &amp; Abe.
          Investment: $575 for 2 entries ($287.50 each).
        </p>

        {/* Per-Tournament Payout Breakdown */}
        <div className="mb-6 rounded-lg bg-[var(--background)] p-4">
          <h3 className="mb-3 font-semibold text-white">Per-Tournament Payouts (Estimated)</h3>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            ~80% of pot = ~$132K across 5 events = ~$26,400 per tournament
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Place</th>
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">% of Pool</th>
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Payout</th>
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Your Half (50/50)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-4 font-semibold text-[var(--green-accent)]">1st</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">47.5%</td>
                  <td className="py-2 pr-4 text-white">~$12,540</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$6,270</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-4 font-semibold text-white">2nd</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">27.5%</td>
                  <td className="py-2 pr-4 text-white">~$7,260</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$3,630</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-4 font-semibold text-white">3rd</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">17.5%</td>
                  <td className="py-2 pr-4 text-white">~$4,620</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$2,310</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-white">4th</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">7.5%</td>
                  <td className="py-2 pr-4 text-white">~$1,980</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$990</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cumulative Payout Breakdown */}
        <div className="mb-6 rounded-lg bg-[var(--background)] p-4">
          <h3 className="mb-3 font-semibold text-white">Cumulative Season Payouts (Estimated)</h3>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            ~20% of pot = ~$33,000 for season-long standings
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Place</th>
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">% of Pool</th>
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Payout</th>
                  <th className="py-2 pr-4 text-left font-medium text-[var(--text-muted)]">Your Half (50/50)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-4 font-semibold text-[var(--green-accent)]">1st</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">47.5%</td>
                  <td className="py-2 pr-4 text-white">~$15,675</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$7,838</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-4 font-semibold text-white">2nd</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">27.5%</td>
                  <td className="py-2 pr-4 text-white">~$9,075</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$4,538</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-4 font-semibold text-white">3rd</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">17.5%</td>
                  <td className="py-2 pr-4 text-white">~$5,775</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$2,888</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-white">4th</td>
                  <td className="py-2 pr-4 text-[var(--text-muted)]">7.5%</td>
                  <td className="py-2 pr-4 text-white">~$2,475</td>
                  <td className="py-2 pr-4 text-[var(--green-accent)]">~$1,238</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Season Scenarios */}
        <div className="rounded-lg bg-[var(--background)] p-4">
          <h3 className="mb-3 font-semibold text-white">Season Outcome Scenarios</h3>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            Combined winnings across both entries, then split 50/50.
            Investment per person: $287.50.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Scenario</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Tournament Results</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Cumulative</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Total Won</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Per Person</th>
                  <th className="py-2 text-left font-medium text-[var(--text-muted)]">ROI</th>
                </tr>
              </thead>
              <tbody>
                {/* Dream */}
                <tr className="border-b border-[var(--green-accent)]/20 bg-[var(--green-dark)]/10">
                  <td className="py-2 pr-3 font-semibold text-[var(--green-accent)]">Dream Season</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">1st in 3 events + 2nd in 2</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">1st place</td>
                  <td className="py-2 pr-3 text-white">~$67,815</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$33,908</td>
                  <td className="py-2 text-[var(--green-accent)]">+11,694%</td>
                </tr>
                {/* Great */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-[var(--green-accent)]">Great Season</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">1st in 2 events + 3rd in 1</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">2nd place</td>
                  <td className="py-2 pr-3 text-white">~$38,775</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$19,388</td>
                  <td className="py-2 text-[var(--green-accent)]">+6,644%</td>
                </tr>
                {/* Strong */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-white">Strong Season</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">1st in 1 event + 2nd in 1</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">3rd place</td>
                  <td className="py-2 pr-3 text-white">~$25,575</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$12,788</td>
                  <td className="py-2 text-[var(--green-accent)]">+4,348%</td>
                </tr>
                {/* Good */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-white">Good Season</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">1st in 1 event</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">None</td>
                  <td className="py-2 pr-3 text-white">~$12,540</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$6,270</td>
                  <td className="py-2 text-[var(--green-accent)]">+2,081%</td>
                </tr>
                {/* Decent */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-white">Decent Season</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">2nd in 1 event + 4th in 1</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">None</td>
                  <td className="py-2 pr-3 text-white">~$9,240</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$4,620</td>
                  <td className="py-2 text-[var(--green-accent)]">+1,507%</td>
                </tr>
                {/* Okay */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-white">Okay Season</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">2nd in 1 event</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">None</td>
                  <td className="py-2 pr-3 text-white">~$7,260</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$3,630</td>
                  <td className="py-2 text-[var(--green-accent)]">+1,163%</td>
                </tr>
                {/* Min cash */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-white">Min Cash</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">4th in 1 event</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">None</td>
                  <td className="py-2 pr-3 text-white">~$1,980</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$990</td>
                  <td className="py-2 text-[var(--green-accent)]">+244%</td>
                </tr>
                {/* Cumulative only */}
                <tr className="border-b border-[var(--card-border)]/50">
                  <td className="py-2 pr-3 font-semibold text-white">Cumulative Only</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">No tournament placements</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">4th place</td>
                  <td className="py-2 pr-3 text-white">~$2,475</td>
                  <td className="py-2 pr-3 text-[var(--green-accent)]">~$1,238</td>
                  <td className="py-2 text-[var(--green-accent)]">+330%</td>
                </tr>
                {/* Bust */}
                <tr className="bg-red-950/10">
                  <td className="py-2 pr-3 font-semibold text-red-400">Bust</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">No placements at all</td>
                  <td className="py-2 pr-3 text-[var(--text-muted)]">None</td>
                  <td className="py-2 pr-3 text-white">$0</td>
                  <td className="py-2 pr-3 text-red-400">-$287.50</td>
                  <td className="py-2 text-red-400">-100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-[var(--text-muted)]">
            Note: All amounts are estimates based on a ~$165K pot (477 entries at mixed pricing).
            Actual payouts depend on final entry count and pool admin&apos;s payout structure.
            ROI calculated per person assuming $287.50 investment each (50% of $575 for 2 entries).
          </p>
        </div>

        {/* Breakeven analysis */}
        <div className="mt-4 rounded-lg border border-[var(--green-accent)]/20 bg-[var(--green-dark)]/10 p-4">
          <h3 className="mb-2 font-semibold text-[var(--green-accent)]">Breakeven &amp; Expected Value</h3>
          <div className="space-y-2 text-xs text-[var(--text-muted)]">
            <p>
              <strong className="text-white">Any single placement pays for the entire season.</strong>{" "}
              Even the minimum cash (4th in one tournament = ~$1,980) returns 3.4x your $575
              total investment. A single 2nd-place finish returns 12.6x.
            </p>
            <p>
              <strong className="text-white">With 2 differentiated entries across 5 tournaments,
              you get 10 shots at the top 4.</strong>{" "}
              Each shot has roughly a 0.84% chance (4/477). The probability of cashing at least once
              all season is approximately 1 - (1 - 0.0084)^10 ≈ 8.1%. Not high — but any single
              cash more than pays for the entire investment, and the upside scenarios are massive.
            </p>
            <p>
              <strong className="text-white">The 50/50 split reduces individual variance.</strong>{" "}
              Instead of one person getting $0 and the other getting $12,540 when one entry cashes,
              both get $6,270. Over a 5-tournament season, this smoothing effect is significant.
            </p>
          </div>
        </div>
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
                Two different lineups &gt; two identical lineups. This is the highest-leverage
                decision you&apos;ll make all season.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">2</span>
            <div>
              <p className="text-sm font-semibold text-white">Split winnings 50/50</p>
              <p className="text-xs text-[var(--text-muted)]">
                Aligns incentives for one chalk + one contrarian entry. Both share the risk
                and the reward.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">3</span>
            <div>
              <p className="text-sm font-semibold text-white">Jack = chalk, Abe = contrarian</p>
              <p className="text-xs text-[var(--text-muted)]">
                Jack&apos;s safe entry covers the cumulative standings. Abe&apos;s upside entry hunts
                for per-tournament cashes.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[var(--background)] p-4">
            <span className="mt-0.5 text-lg text-[var(--green-accent)]">4</span>
            <div>
              <p className="text-sm font-semibold text-white">Optimize per-tournament first</p>
              <p className="text-xs text-[var(--text-muted)]">
                80% of the pot is in individual events. The cumulative will take care of itself
                if you pick well week-to-week.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Sources */}
      <div className="mt-8 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <h3 className="mb-2 text-sm font-bold">Sources &amp; Further Reading</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <SourceLink href="https://www.stokastic.com/news/pga-dfs-leverage-game-theory-large-field-gpp-strategy-ac11/" label="Stokastic: PGA GPP Strategy" />
          <SourceLink href="https://dfsbuild.com/dfs-gpp-strategy/" label="DFSBuild: GPP Guide" />
          <SourceLink href="https://www.fantasylabs.com/articles/using-game-theory-in-daily-fantasy-tournaments/" label="FantasyLabs: Game Theory" />
          <SourceLink href="https://www.fantasylabs.com/articles/the-power-and-myth-of-dfs-diversification-and-the-marauders-map/" label="FantasyLabs: Diversification" />
          <SourceLink href="https://poolgenius.teamrankings.com/pga-golf-one-and-done-picks/articles/one-and-done-pools-golf-strategy-advice/" label="PoolGenius: Golf Strategy" />
          <SourceLink href="https://athlonsports.com/fantasy/dfs-golf-primer-cash-games-vs-gpp" label="Athlon: Cash vs. GPP" />
          <SourceLink href="https://www.dfsarmy.com/2022/07/dfs-diversification-strategy-how-to-win-with-more-lineups-in-an-unpredictable-daily-fantasy-sports-world-mlb-nfl-nba-pga-nascar-nhl.html" label="DFS Army: Diversification" />
          <SourceLink href="http://www.columbia.edu/~mh2078/DFS_Revision_1_May2019.pdf" label="Columbia/Haugh &amp; Singal: DFS Research" />
          <SourceLink href="https://www.pokernews.com/news/2022/09/what-is-swapping-why-do-poker-players-swap-with-each-other-42081.htm" label="PokerNews: Stake Swapping" />
          <SourceLink href="https://blog.gtowizard.com/poker-staking-essentials/" label="GTO Wizard: Staking Essentials" />
          <SourceLink href="https://ftnfantasy.com/pga/proven-strategies-to-win-your-golf-one-and-done-pool-in-2026" label="FTN Fantasy: 2026 Strategy" />
          <SourceLink href="https://rotogrinders.com/fantasy/golf-one-and-done-strategy" label="RotoGrinders: Golf Strategy" />
        </div>
        <p className="mt-2 text-[10px] text-[var(--text-muted)]">
          Note: Strategy principles derived from DFS research (DraftKings/FanDuel GPP analysis),
          portfolio theory (Haugh &amp; Singal, Columbia University, published in <em>Management Science</em>),
          poker staking/swapping literature, and fantasy golf community consensus. The academic research
          confirms that top-heavy payout structures favor concentrated, high-ceiling portfolio construction
          over mean-variance optimization.
        </p>
      </div>
    </div>
  );
}

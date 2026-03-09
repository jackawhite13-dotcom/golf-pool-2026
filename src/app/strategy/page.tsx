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
          A coordination hub for two entries in a ~300-person, ~$150K golf pool.
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
            In a 300-person GPP-style pool where only the top 4 cash (~1.3% per entry), differentiation
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
        <p className="mb-5 text-xs text-[var(--text-muted)]">Game theory analysis for a 300-entry pool</p>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
            <h3 className="mb-2 text-sm font-bold text-red-400">Same Picks (Correlated)</h3>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <li>• Outcomes are perfectly correlated — both win or both lose</li>
              <li>• Effectively 1 unique entry in a 300-person pool</li>
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
            With ~300 entries and top-4 payouts per tournament, each entry has roughly a 1.33%
            chance of cashing in any given tournament. With two <em>identical</em> entries,
            your probability of cashing is still 1.33%. With two <em>independent</em> entries,
            the probability of at least one cashing is approximately 1 - (1 - 0.0133)² ≈ 2.64%.
            That&apos;s nearly double the hit rate for zero additional cost.
          </p>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            Over 5 tournaments, two independent entries give you roughly a 12.5% chance of
            cashing at least once all season, versus ~6.4% with identical entries. This is the
            foundational argument for diversification.
          </p>
          <div className="flex flex-wrap gap-3">
            <SourceLink
              href="https://www.rotogrinders.com/articles/gpp-strategy-golf-large-field-tournaments"
              label="RotoGrinders: GPP Strategy"
            />
            <SourceLink
              href="https://fantasynational.com/pga/articles"
              label="FantasyNational Articles"
            />
            <SourceLink
              href="https://www.actionnetwork.com/golf/fantasy-golf-strategy"
              label="Action Network: Fantasy Golf"
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
        <h2 className="mb-1 text-xl font-bold">C. Chalk vs. Contrarian in a 300-Person Pool</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          Top 4 paid out of ~300 entries = ~1.3% cash rate. How does this affect strategy?
        </p>

        <div className="mb-6 space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 font-semibold text-white">The Core Insight: Ownership Leverage</h3>
            <p className="mb-3">
              In a 300-person pool, if 60% of entries roster Scottie Scheffler in Tier 1, then Scheffler
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
                href="https://rotogrinders.com/articles/leveraging-ownership-in-gpps"
                label="RotoGrinders: Ownership Leverage"
              />
              <SourceLink
                href="https://fantasynational.com/pga/ownership"
                label="FantasyNational: Ownership"
              />
              <SourceLink
                href="https://www.actionnetwork.com/golf/dfs-golf-ownership-leverage-strategy"
                label="Action Network: DFS Ownership"
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
                In a 300-person pool, the same principle applies at a smaller scale.
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
                href="https://datagolf.com/predictive-model"
                label="DataGolf: Predictive Model"
              />
              <SourceLink
                href="https://www.pgatour.com/stats"
                label="PGA Tour Stats"
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
              With a ~$150K pot: ~$120K goes to individual tournament payouts (~$24K per event),
              and ~$30K goes to cumulative season standings. The per-tournament payouts are where
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
                    <td className="py-2 pr-4">~$24K each</td>
                    <td className="py-2 pr-4">~80%</td>
                    <td className="py-2">Differentiate. Hunt for tournament wins.</td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)]/50">
                    <td className="py-2 pr-4 text-white">Cumulative Season</td>
                    <td className="py-2 pr-4">~$30K</td>
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
            <h3 className="mb-2 font-semibold text-white">The Cumulative Scoring System</h3>
            <p className="mb-2">
              The cumulative system uses a different scoring method: points based on finishing
              position relative to the cut line, normalized to a 70-point scale. This means:
            </p>
            <ul className="mb-3 space-y-1.5">
              <li>
                <strong className="text-white">Missed cut = 0 points.</strong> This heavily penalizes
                volatility. A player who misses 2 cuts and wins 1 tournament may score <em>fewer</em>{" "}
                cumulative points than a player who makes 5 cuts with all top-25 finishes.
              </li>
              <li>
                <strong className="text-white">Normalization to 70 points</strong> means each tournament
                counts equally regardless of field size. A 3rd-place finish at The Players (144 players)
                is worth the same as a 3rd-place finish at The Masters (88 players).
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
          <SourceLink href="https://rotogrinders.com/articles/gpp-strategy-golf" label="RotoGrinders: GPP Golf Strategy" />
          <SourceLink href="https://fantasynational.com/pga" label="FantasyNational PGA Tools" />
          <SourceLink href="https://datagolf.com" label="DataGolf Models & Data" />
          <SourceLink href="https://www.actionnetwork.com/golf" label="Action Network: Golf Betting" />
          <SourceLink href="https://www.pgatour.com/stats" label="PGA Tour Official Stats" />
          <SourceLink href="https://www.golfchannel.com/fantasy" label="Golf Channel: Fantasy" />
        </div>
        <p className="mt-2 text-[10px] text-[var(--text-muted)]">
          Note: Strategy principles derived from DFS research (DraftKings/FanDuel GPP analysis),
          portfolio theory, and fantasy golf community consensus. Specific ownership percentages
          are estimates based on historical DFS data and may vary for this specific pool format.
        </p>
      </div>
    </div>
  );
}

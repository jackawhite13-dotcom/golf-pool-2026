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

// Pick recommendations by tier — informed by research
// Tiers restructured: A-F (10 each), G (60 remaining)
const picks = {
  1: {
    top: "Scheffler, Scottie",
    topReasoning: "World #1, won the American Express in January, T3 at Phoenix, T4 at Pebble Beach. Won The Players in 2023 (-17) and 2024 (-20, from 5 back on Sunday). First player ever to defend the title. Leads the Tour in SG: Tee-to-Green. His form has cooled slightly (T12 Genesis, T20 Bay Hill) and he's adjusting to a new driver, but Sawgrass is his course — the approach-shot demands perfectly match his elite iron play. He'll be the most-rostered Tier A pick, but in a tiered pool his value compounds across your other 6 picks.",
    topConfidence: "High" as const,
    contrarian: "Kim, Si Woo",
    contrarianReasoning: "Won The Players in 2017 (youngest champion ever) and has been in elite form — 7/7 cuts made (only 100% rate in Tier A), a 2nd, a 3rd, 3 top-10s, and $2.2M earned. His Sawgrass pedigree and current consistency make him the safest contrarian pivot off Scheffler. At OWGR 28, he'll be significantly under-rostered compared to Morikawa, McIlroy, and Schauffele — but his 2026 stats are better than all of them. In a 477-person pool, that ownership gap is a massive lever.",
    contrarianConfidence: "High" as const,
    sources: [
      { href: "https://www.pgatour.com/article/news/the-first-look/2026/03/09/the-players-championship-tpc-sawgrass-stadium-course-scottie-scheffler-rory-mcilroy", label: "PGA Tour: The First Look" },
      { href: "https://www.espn.com/golf/story/_/id/48142426/2026-players-championship-ranking-top-25-players-field", label: "ESPN: Top 25 Power Rankings" },
    ],
  },
  2: {
    top: "Bhatia, Akshay",
    topReasoning: "The hottest player in the field — just won the Arnold Palmer Invitational, erasing a 5-shot deficit and beating Berger in a playoff. Third career PGA Tour win, all in playoffs. Three top-10s in his last 4 starts with $5.4M earned in 2026 (most in Tier B). Finished T3 at 10-under in the 2025 Players. His aggressive style and exceptional iron play fit Sawgrass perfectly. Now in Tier B, he's the clear top pick — peak confidence, peak form, and Sawgrass course history.",
    topConfidence: "High" as const,
    contrarian: "Matsuyama, Hideki",
    contrarianReasoning: "6/6 cuts made — the best cut rate in Tier B. A 2nd-place finish and 2 top-10s show consistent contention. At OWGR 12 with $2.1M earned, Matsuyama is a former Masters champion with massive big-game experience. He'll be under-owned relative to Bhatia's hot streak, but his floor is among the highest in this tier. For Jack's safe entry, Matsuyama offers the reliability that cumulative scoring demands.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://www.golfchannel.com/pga-tour/news/who-won-arnold-palmer-invitational-2026-daniel-berger-akshay-bhatia-pga-tour-playoff", label: "Golf Channel: Bhatia Wins APC" },
      { href: "https://datagolf.com/rankings", label: "DataGolf Rankings" },
    ],
  },
  3: {
    top: "Bridgeman, Jacob",
    topReasoning: "The breakout player of 2026 — won the Genesis Invitational (his first PGA Tour win, holding off McIlroy by 1 shot). 6/6 cuts made, 3 top-10s, 100% top-25 rate, $5.5M in earnings. OWGR 22 and climbing fast. Leads the PGA Tour in SG: Putting (+1.276). At 26 years old, this former Clemson star is playing with supreme confidence. His first Players appearance means pool opponents may not roster him — an information edge.",
    topConfidence: "High" as const,
    contrarian: "Straka, Sepp",
    contrarianReasoning: "OWGR 9 and $2.3M earned with a 2nd-place finish and a top-10. Straka has been one of the most consistent players on Tour but flies under the radar in pool formats. At OWGR 9, he's the highest-ranked player in Tier C — meaning the pool platform may have him undervalued relative to his actual ability. His ball-striking profiles well for Sawgrass. Lower ownership than Knapp or Lowry makes him a strong GPP pivot.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://www.pgatour.com/article/news/daily-wrapup/2026/02/22/jacob-bridgeman-wins-the-genesis-invitational-for-first-career-win-holds-off-rory-mcilroy-kurt-kitayama-riviera", label: "PGA Tour: Bridgeman Wins Genesis" },
      { href: "https://datagolf.com/rankings", label: "DataGolf Rankings" },
    ],
  },
  4: {
    top: "Theegala, Sahith",
    topReasoning: "7/7 cuts made — the ONLY player in Tier D with a 100% rate. Three top-10s and 5 top-25s with $1.7M earned. His consistency is elite: when he tees it up, he makes the weekend and contends. For cumulative scoring where missed cuts = 0 points, Theegala's floor is the highest in this tier by a wide margin. His iron play and Sawgrass-friendly game make him the clear safe pick.",
    topConfidence: "High" as const,
    contrarian: "Rose, Justin",
    contrarianReasoning: "OWGR 5 — the highest-ranked player in the entire tier by far. Just won his most recent tournament, earning $1.8M on only 2 cuts in 5 events. Extreme boom-or-bust: when he makes the cut, he wins; when he misses, he's gone early. In a 477-person GPP, that upside profile is exactly what you want for a contrarian entry. A former U.S. Open champion with massive Sawgrass experience, and he'll be under-owned because of the missed cuts.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://www.pgatour.com/stats", label: "PGA Tour Stats" },
      { href: "https://fantasynational.com/pga/course-fit", label: "FantasyNational Course Fit" },
    ],
  },
  5: {
    top: "Coody, Pierceson",
    topReasoning: "6/7 cuts made with a 2nd-place finish and 2 top-10s — the best results in Tier E. $1.6M in earnings and 5 top-25s show he's consistently in contention. At OWGR 48, his ranking suggests he should be in a higher tier. His approach play has been strong, which is THE key skill at Sawgrass. For Jack's safe entry, Coody offers the best balance of floor and ceiling in this tier.",
    topConfidence: "Medium" as const,
    contrarian: "Thomas, Justin",
    contrarianReasoning: "OWGR 14 but only 1 event played and 0 cuts made — the ultimate high-risk/high-reward play. He won The Players in 2021 and knows TPC Sawgrass intimately. If JT is healthy and sharp, he has top-5 talent in this entire field, not just Tier E. In a 477-person pool, most will avoid him because of the 0/1 cuts stat. But if he contends, you'll be nearly alone — classic GPP leverage.",
    contrarianConfidence: "Low" as const,
    sources: [
      { href: "https://datagolf.com/predictive-model", label: "DataGolf Predictions" },
    ],
  },
  6: {
    top: "Hisatsune, Ryo",
    topReasoning: "The consistency king of Tier F — 6/7 cuts made, a 2nd-place finish at Farmers Insurance Open, 3 top-10s, and $1.7M earned. At 23 years old with improving putting confidence and strong approach play, he profiles perfectly for Sawgrass. His SG: Approach numbers fit the #1 skill that wins at this course. In a tier with several risky options (Im and Olesen with minimal 2026 data), Hisatsune's form makes him the clear top choice.",
    topConfidence: "High" as const,
    contrarian: "Castillo, Ricky",
    contrarianReasoning: "Won the Puerto Rico Open last week (first PGA Tour title, bogey-free 67 to close). 5/5 cuts made with 2 top-10s in only 34 career starts. Victory earned him a PGA Championship spot. At OWGR 95, he'll be essentially zero-owned in this pool. First-time Players competitor riding peak confidence off a maiden win. In a 477-person GPP, this is exactly the type of leverage play that wins tournaments — if he contends, you'll be nearly alone.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://www.pgatour.com/article/news/daily-wrapup/2026/03/08/ricky-castillo-wins-puerto-rico-open-for-first-career-pga-tour-title", label: "PGA Tour: Castillo Wins PR Open" },
      { href: "https://datagolf.com/player-profiles", label: "DataGolf Player Profiles" },
    ],
  },
  7: {
    top: "Rodgers, Patrick",
    topReasoning: "7/7 cuts made — the ONLY player in Tier G with a 100% cut rate. Plus a 3rd-place finish, a top-10, and $1.05M in earnings. In a 60-player tier where most options are inconsistent, Rodgers' reliability is gold. At Sawgrass, making the cut is half the battle in a tiered pool format — his iron play and consistency give him a floor that most Tier G options can't match. The ideal pick for cumulative-focused scoring.",
    topConfidence: "High" as const,
    contrarian: "Putnam, Andrew",
    contrarianReasoning: "A 2nd-place finish and a top-10 on only 4 events — that's an elite hit rate. $682K in earnings is among the highest in Tier G. When he makes the cut (2/4), he contends hard. Less name recognition means lower ownership — and in a 60-player tier, any differentiation matters. For Abe's contrarian entry, Putnam's upside ceiling (runner-up finish) is exactly the type of leverage play that wins in a 477-person pool.",
    contrarianConfidence: "Medium" as const,
    sources: [
      { href: "https://fantasynational.com/pga", label: "FantasyNational PGA" },
      { href: "https://www.pgatour.com/article/news/betting-dfs/2026/03/09/odds-outlook-the-players-championship-tpc-sawgrass-bets-odds-linups-fantasy-golf-stadium-course-rory-mcilroy-scottie-scheffler", label: "PGA Tour: Odds Outlook" },
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
          TPC Sawgrass (Stadium Course) · Ponte Vedra Beach, FL · March 12–15, 2026 · $25M Purse
        </p>
      </div>

      {/* McIlroy Injury Alert */}
      <div className="mb-6 rounded-xl border border-red-900/40 bg-red-950/20 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg">⚠️</span>
          <div>
            <h3 className="mb-1 text-sm font-bold text-red-400">Injury Watch: Rory McIlroy (Tier A)</h3>
            <p className="text-xs text-[var(--text-muted)]">
              McIlroy withdrew from the Arnold Palmer Invitational before R3 with back spasms.
              As of March 9, he has NOT traveled to TPC Sawgrass, calling the back &ldquo;more stubborn
              than we thought.&rdquo; He won&apos;t arrive until Wednesday at the earliest. Even if he plays,
              he&apos;ll have minimal on-course preparation. <strong className="text-white">This significantly
              increases the risk of rostering McIlroy</strong> — and may suppress his ownership, creating a
              leverage opportunity if he does play well. Monitor his status closely before locking picks.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <SourceLink href="https://www.pgatour.com/article/news/latest/2026/03/09/rory-mcilroy-back-still-bothering-him-not-traveling-to-tpc-sawgrass-until-wednesday-treatment-the-players-championship" label="PGA Tour: McIlroy Update" />
              <SourceLink href="https://www.pgatour.com/article/news/latest/2026/03/07/rory-mcilroy-withdraws-from-arnold-palmer-invitational-presented-by-mastercard-before-round-3-due-to-back-injury" label="PGA Tour: McIlroy WD" />
            </div>
          </div>
        </div>
      </div>

      {/* Section A: Course Intel */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">Course Intel: TPC Sawgrass</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          Pete Dye design (1980) · 7,245 yards · Par 72 · Cut at top 65 &amp; ties · 123 players in field
        </p>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Course Profile</h3>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong className="text-white">Design:</strong> Pete Dye&apos;s &ldquo;grenade attack architecture&rdquo; — greens ringed by random lumps, bumps, and hollows demanding target golf</li>
              <li><strong className="text-white">Grass:</strong> Bermuda overseeded with rye · Rough grown to 3.5 inches</li>
              <li><strong className="text-white">Key holes:</strong> #17 island green (137 yds, ~100K balls/year), #16 eagle-or-double par 5, #18 water-left closing par 4</li>
              <li><strong className="text-white">Hazards:</strong> Water on nearly every hole, punishing lateral misses rather than length misses</li>
              <li><strong className="text-white">Greens:</strong> Small with severe undulations — premium on approach precision</li>
              <li><strong className="text-white">Approach distribution:</strong> 27.9% of approaches from 200+ yards (vs. 22.9% Tour avg) — long iron play matters</li>
            </ul>
            <div className="mt-2">
              <SourceLink href="https://rickrungood.com/course-breakdown-tpc-sawgrass/" label="RickRunGood: Course Breakdown" />
            </div>
          </div>
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Key Stats That Win Here</h3>
            <p className="mb-3 text-[10px] text-[var(--text-muted)]">
              Based on 5-year top-10 finisher analysis (Mayo Media, RickRunGood)
            </p>
            <div className="space-y-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Approach</span>
                  <span className="text-xs font-bold text-[var(--green-accent)]">#1 — Nearly 3x more predictive</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "95%" }} />
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Sawgrass ranked 6th of 38 courses in approach difficulty · 2nd-toughest wedge shots on Tour</p>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Off-the-Tee</span>
                  <span className="text-xs text-[var(--text-muted)]">Above avg (accuracy &gt; distance)</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "70%" }} />
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">17.1% of SG via OTT (vs 15.2% avg) · Hardest OTT course on Tour last year</p>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Around-the-Green</span>
                  <span className="text-xs text-[var(--text-muted)]">Tour average, but high difficulty</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "55%" }} />
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">6th hardest from fairway, 9th from rough, 6th from bunkers</p>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white">SG: Putting</span>
                  <span className="text-xs text-[var(--text-muted)]">Least predictive</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--card-border)]">
                  <div className="h-2 rounded-full bg-[var(--green-accent)]" style={{ width: "35%" }} />
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Variance washes out on small, undulating greens</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <SourceLink href="https://mayomedia.substack.com/p/2026-players-championship-picks-rankings" label="Mayo Media: Course Preview" />
              <SourceLink href="https://rickrungood.com/andy-lacks-course-breakdown-everything-you-need-to-know-about-tpc-sawgrass/" label="RickRunGood: Stats Deep Dive" />
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
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Score</th>
                  <th className="py-2 pr-3 text-left font-medium text-[var(--text-muted)]">Key Strength</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-muted)]">
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2025</td><td className="py-1.5 pr-3">McIlroy, Rory</td><td className="py-1.5 pr-3">Playoff</td><td className="py-1.5 pr-3">All-around; beat Spaun in 3-hole aggregate playoff</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2024</td><td className="py-1.5 pr-3">Scheffler, Scottie</td><td className="py-1.5 pr-3">-20</td><td className="py-1.5 pr-3">Overcame 5-shot deficit; first back-to-back winner ever</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2023</td><td className="py-1.5 pr-3">Scheffler, Scottie</td><td className="py-1.5 pr-3">-17</td><td className="py-1.5 pr-3">Elite iron play, won by 5</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2022</td><td className="py-1.5 pr-3">Smith, Cameron</td><td className="py-1.5 pr-3">-13</td><td className="py-1.5 pr-3">Putting, short game; won Open later that year</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2021</td><td className="py-1.5 pr-3">Thomas, Justin</td><td className="py-1.5 pr-3">-14</td><td className="py-1.5 pr-3">Iron play, clutch putting</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2020</td><td className="py-1.5 pr-3">Cancelled</td><td className="py-1.5 pr-3">—</td><td className="py-1.5 pr-3">COVID — stopped mid-round</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2019</td><td className="py-1.5 pr-3">McIlroy, Rory</td><td className="py-1.5 pr-3">-16</td><td className="py-1.5 pr-3">All-around game, SG: Approach</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2018</td><td className="py-1.5 pr-3">Simpson, Webb</td><td className="py-1.5 pr-3">-18</td><td className="py-1.5 pr-3">Precision, accuracy archetype</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]/30">
                  <td className="py-1.5 pr-3 text-white">2017</td><td className="py-1.5 pr-3">Kim, Si Woo</td><td className="py-1.5 pr-3">-10</td><td className="py-1.5 pr-3">Youngest winner; accuracy in tough conditions</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-3 text-white">2016</td><td className="py-1.5 pr-3">Day, Jason</td><td className="py-1.5 pr-3">-15</td><td className="py-1.5 pr-3">World #1 at the time; complete game</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            <strong className="text-white">Key insight from The Fried Egg:</strong> TPC Sawgrass has the{" "}
            <em>lowest year-over-year correlation of strokes gained</em> of any course regularly played on Tour.
            This means <strong className="text-white">course history is less reliable here than anywhere else</strong> — results
            are partly driven by variance. This is a GPP course, not a cash game course. Upsets happen.
            Weight current form and skill profiles over Sawgrass-specific history.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <SourceLink href="https://thefriedegg.com/statistical-look-tpc-sawgrass/" label="Fried Egg: Sawgrass Stats Analysis" />
            <SourceLink href="https://www.theplayers.com/past-champions" label="Players Championship: Past Champions" />
            <SourceLink href="https://www.pgatour.com/tournaments/the-players-championship/past-results" label="PGA Tour: Past Results" />
            <SourceLink href="https://www.sportskeeda.com/golf/the-players-championship-past-winners-last-10-years-champions-explored" label="Sportskeeda: Last 10 Winners" />
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-[var(--background)] p-4">
          <h3 className="mb-2 text-sm font-semibold text-white">Player Archetypes That Win at Sawgrass</h3>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            All-around players dominate, not one-dimensional specialists. The course&apos;s constant lateral
            hazards neutralize pure bombers, but shorter hitters don&apos;t have a systematic edge either.
          </p>
          <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>• <strong className="text-white">Bombers who win here</strong> (McIlroy, Day) also have elite iron games — they don&apos;t win on length alone</li>
            <li>• <strong className="text-white">Precision players who win</strong> (Webb Simpson, Si Woo Kim) excel at approach shots and around-the-green play</li>
            <li>• <strong className="text-white">Pete Dye course crossover:</strong> Players who win on other Dye designs (Harbour Town, TPC Louisiana, Sedgefield) tend to show up at Sawgrass — look for Wyndham/RBC Heritage form as a comp</li>
            <li>• <strong className="text-white">Nearly every recent winner has been (or became) a Major champion</strong> — Cameron Smith won the Open Championship the same year he won here</li>
          </ul>
          <div className="mt-2">
            <SourceLink href="https://www.pgatour.com/article/news/stats-report/2022/03/07/the-players-championship-features-diverse-winners-list-tpc-sawgrass" label="PGA Tour: Diverse Winners List" />
          </div>
        </div>

        <div className="rounded-lg border border-amber-900/30 bg-amber-950/10 p-4">
          <h3 className="mb-2 text-sm font-semibold text-amber-400">Why The Players Matters Most</h3>
          <ul className="space-y-1 text-xs text-[var(--text-muted)]">
            <li>• <strong className="text-white">Tournament 1 of 5:</strong> Sets the tone for the season. A strong start builds confidence and cumulative points.</li>
            <li>• <strong className="text-white">Largest field:</strong> 123 players (vs 88 at the Masters) means more variance, more upside from contrarian picks, and more importance on differentiation.</li>
            <li>• <strong className="text-white">$25M purse, $4.5M to winner:</strong> The largest non-major purse on Tour. Carries 750 FedExCup points (same as a major).</li>
            <li>• <strong className="text-white">Most data available:</strong> Full PGA Tour stats for nearly every player. Later tournaments have smaller, harder-to-model fields.</li>
            <li>• <strong className="text-white">High-variance course:</strong> The Fried Egg&apos;s analysis shows Sawgrass is the most volatile regular course on Tour — contrarian picks have a higher hit rate here than at any other event.</li>
          </ul>
        </div>
      </SectionCard>

      {/* Section B: Pool Strategy */}
      <SectionCard className="mb-6">
        <h2 className="mb-1 text-xl font-bold">Pool-Specific Strategy for The Players</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">
          477 entries, top 4 paid per tournament (~0.8% cash rate). How to approach each tier.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Estimated Ownership Concentrations</h3>
            <p className="mb-3 text-xs text-[var(--text-muted)]">
              Based on DFS data from DraftKings/FantasyNational and pool dynamics. With 477 entries,
              Scheffler at +340 will be the most popular pick by far — typical signature event ownership
              runs 25-35%+ in GPPs. In a casual pool format, it could be even higher (45-55%).
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded border border-[var(--card-border)] p-2">
                <p className="text-xs text-[var(--text-muted)]">Scheffler (Tier A)</p>
                <p className="text-lg font-bold text-white">~45-55%</p>
                <p className="text-[10px] text-[var(--text-muted)]">Most-rostered · +340 favorite</p>
              </div>
              <div className="rounded border border-[var(--card-border)] p-2">
                <p className="text-xs text-[var(--text-muted)]">McIlroy (Tier A)</p>
                <p className="text-lg font-bold text-white">~15-25%</p>
                <p className="text-[10px] text-[var(--text-muted)]">May dip due to back injury</p>
              </div>
              <div className="rounded border border-[var(--card-border)] p-2">
                <p className="text-xs text-[var(--text-muted)]">Morikawa (Tier A)</p>
                <p className="text-lg font-bold text-white">~10-15%</p>
                <p className="text-[10px] text-[var(--text-muted)]">Won Pebble Beach · +2000</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              <strong className="text-white">Key insight:</strong> If ~150 entries have Scheffler,
              your differentiation has to come from Tiers 2-7. Even if Scheffler wins, you&apos;re
              competing against ~150 other Scheffler entries for the top 4 spots — meaning your
              other 6 picks determine your ranking. <strong className="text-white">McIlroy&apos;s
              injury could suppress his ownership</strong> — if he plays well, anyone who rostered him
              gets automatic leverage. This is a classic &ldquo;buy low&rdquo; GPP opportunity.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <SourceLink href="https://fantasynational.com/pga/ownership" label="FantasyNational: Ownership" />
              <SourceLink href="https://rotogrinders.com/articles/pga-dfs-first-look-the-players-championship-2026-4192320" label="RotoGrinders: DFS First Look" />
              <SourceLink href="https://dknetwork.draftkings.com/2026/03/09/fantasy-golf-value-picks-top-draftkings-pga-tour-dfs-bargain-plays-for-the-2026-players-championship/" label="DK Network: Value Picks" />
            </div>
          </div>

          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Tier-by-Tier Approach</h3>
            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <p>
                <strong className="text-white">Tiers A-B:</strong> This is where ownership is most
                concentrated. The top 3-4 players will be on 60%+ of entries combined. Taking chalk
                here is fine for Jack&apos;s safe entry — but Abe should pivot to a lower-owned option
                to create separation. <strong className="text-white">Bhatia&apos;s Arnold Palmer win
                (now in Tier B) and McIlroy&apos;s injury create major GPP pivots.</strong>
              </p>
              <p>
                <strong className="text-white">Tiers C-D:</strong> The &ldquo;messy middle&rdquo; where
                ownership spreads out. This is where you can gain the most leverage. Players like
                Bridgeman (won Genesis) and Theegala (7/7 cuts, 3 top-10s) have elite recent results
                but will draw lower ownership than the big names. A top-10 from a 3%-owned Tier C pick
                is worth more than a top-10 from a 20%-owned pick.
              </p>
              <p>
                <strong className="text-white">Tiers E-G:</strong> Low ownership across the board.
                Tier G especially (60 players) is where most entrants pick a name they recognize
                (Finau, Spieth) rather than using data. Use cuts-made rate, recent top-10s, and
                SG: Approach stats to find edges the field is missing. This is where data-driven pools win.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section C: Tier-by-Tier Picks */}
      <div className="mb-8">
        <h2 className="mb-1 text-xl font-bold">Tier-by-Tier Pick Recommendations</h2>
        <p className="mb-6 text-xs text-[var(--text-muted)]">
          Top pick + contrarian alternative for each tier, with reasoning and verified sources
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
            { tier: 1, golfer: "Scheffler, Scottie", rationale: "World #1, back-to-back Players wins" },
            { tier: 2, golfer: "Matsuyama, Hideki", rationale: "6/6 cuts, 2nd + 2 top-10s, elite floor" },
            { tier: 3, golfer: "Bridgeman, Jacob", rationale: "6/6 cuts, won Genesis, #1 SG: Putt" },
            { tier: 4, golfer: "Theegala, Sahith", rationale: "7/7 cuts, 3 top-10s, best floor in D" },
            { tier: 5, golfer: "Coody, Pierceson", rationale: "6/7 cuts, 2nd + 2 top-10s, $1.6M" },
            { tier: 6, golfer: "Hisatsune, Ryo", rationale: "6/7 cuts, 3 top-10s, T2 at Farmers" },
            { tier: 7, golfer: "Rodgers, Patrick", rationale: "7/7 cuts, only 100% rate in G" },
          ]}
        />
        <LineupSummary
          name="Abe"
          role="The Ceiling (Contrarian)"
          color="amber"
          picks={[
            { tier: 1, golfer: "Kim, Si Woo", rationale: "Won Players 2017, 7/7 cuts, 3 top-10s" },
            { tier: 2, golfer: "Bhatia, Akshay", rationale: "Just won APC, T3 at '25 Players" },
            { tier: 3, golfer: "Straka, Sepp", rationale: "OWGR 9, 2nd-place, under the radar" },
            { tier: 4, golfer: "Rose, Justin", rationale: "OWGR 5, just won, boom-or-bust upside" },
            { tier: 5, golfer: "Thomas, Justin", rationale: "Won Players 2021, OWGR 14, high ceiling" },
            { tier: 6, golfer: "Castillo, Ricky", rationale: "Won PR Open last week, 0% owned" },
            { tier: 7, golfer: "Putnam, Andrew", rationale: "T2 at AmEx, $682K, near-zero owned" },
          ]}
        />
      </div>

      {/* Final Notes */}
      <SectionCard>
        <h2 className="mb-3 text-lg font-bold">Pre-Tournament Checklist</h2>
        <div className="space-y-3 text-xs text-[var(--text-muted)]">
          <p>
            <strong className="text-white">1. Monitor McIlroy&apos;s status.</strong> If he withdraws,
            his Tier 1 ownership redistributes to Scheffler, Morikawa, and Schauffele — making Bhatia
            and other fades even more valuable. If he plays but is compromised, rostering him is a
            high-risk/high-reward GPP pivot (suppressed ownership + 2x Sawgrass champion).
          </p>
          <p>
            <strong className="text-white">2. Check Jake Knapp&apos;s health.</strong> Knapp withdrew
            from Bay Hill with illness 15 minutes before his tee time. He&apos;s been top-11 in ALL 5
            starts this season (3rd in SG: Total) and ranks 4th in SG: Putting. If he&apos;s healthy, he&apos;s
            a Tier 1 sleeper. If he&apos;s out, monitor which ALT gets into the field.
          </p>
          <p>
            <strong className="text-white">3. Weather check.</strong> Sawgrass plays dramatically
            differently in wind. If heavy wind is forecast, accuracy and short-game players gain even
            more value. Bombers like Potgieter become riskier. Consider adjusting Tiers 5-7 accordingly.
          </p>
          <p>
            <strong className="text-white">4. Check tier assignments.</strong> With the new A-G tier structure
            (10 per tier in A-F, 60 in G), some strong players landed in lower tiers than expected.
            Look for OWGR mismatches — players ranked much higher than their tier suggests are potential value plays.
          </p>
          <p>
            <strong className="text-white">5. Lock picks early.</strong> Tournament 1 sets the foundation
            for cumulative standings. Both entries should aim for all 7 golfers to make the cut —
            starting with 0 cumulative points is hard to recover from over only 5 events.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <SourceLink href="https://datagolf.com" label="DataGolf" />
          <SourceLink href="https://fantasynational.com/pga" label="FantasyNational" />
          <SourceLink href="https://www.pgatour.com/stats" label="PGA Tour Stats" />
          <SourceLink href="https://rotogrinders.com/golf" label="RotoGrinders Golf" />
          <SourceLink href="https://mayomedia.substack.com/p/2026-players-championship-picks-rankings" label="Mayo Media: Players Preview" />
          <SourceLink href="https://www.golfdigest.com/story/players-2026-power-rankings-field-tpc-sawgrass" label="Golf Digest: Power Rankings" />
          <SourceLink href="https://www.cbssports.com/golf/news/2026-players-championship-odds-picks-predictions-field-best-bets/" label="CBS Sports: Predictions" />
          <SourceLink href="https://www.si.com/golf/2025-players-championship-betting-models-picks-tpc-sawgrass" label="SI: Betting Models" />
          <SourceLink href="https://betfair.com/golf/golf-form-guide/players-championship-sawgrass-2026-players-form-guide-070326-779.html" label="Betfair: Form Guide" />
        </div>
        <p className="mt-3 text-[10px] text-[var(--text-muted)]">
          Note: Ownership projections are estimates based on historical DFS data and pool dynamics.
          All stats from the 2025-2026 PGA Tour season via PGA Tour, DataGolf, and FantasyNational.
          Verify all golfer statuses (injuries, WDs) on the morning of March 12 before finalizing picks.
        </p>
      </SectionCard>
    </div>
  );
}

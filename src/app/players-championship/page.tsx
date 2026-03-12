import type { Metadata } from "next";
import { tiers } from "@/data/tiers";
import TierCard from "@/components/TierCard";
import type { PlayerAnalysis } from "@/components/TierCard";
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

// Tier-by-tier analysis: confidence % for Jack (chalk) and Abe (contrarian)
// Jack = floor/consistency/safety. Abe = upside/low ownership/leverage.
const tierAnalysis: Record<number, { players: PlayerAnalysis[]; sources: { href: string; label: string }[] }> = {
  1: {
    players: [
      {
        name: "Scheffler, Scottie",
        jackConfidence: 95,
        abeConfidence: 25,
        rationale: "World #1, back-to-back Players wins, 5/5 cuts. Highest floor in the field but will be 45-55% owned.",
        chalk: "Safest pick in the pool. Won here in 2023 and 2024. Elite SG: T2G. Even with a cooled stretch, his floor is top-15.",
        contrarian: "Way too chalky at 45-55% owned. If he finishes T10 but doesn't win, you're sharing that score with half the field.",
      },
      {
        name: "Kim, Si Woo",
        jackConfidence: 30,
        abeConfidence: 90,
        rationale: "Won Players in 2017, 7/7 cuts (only 100% rate in tier), 3 top-10s. Will be massively under-owned vs Scheffler.",
        chalk: "Risky as a safe play. High variance despite the cut streak. Not the floor you want for a chalk entry.",
        contrarian: "Perfect GPP pivot. 7/7 cuts, $2.2M earned, won here before. Under-owned vs Scheffler/Morikawa = massive leverage.",
      },
      {
        name: "McIlroy, Rory",
        jackConfidence: 40,
        abeConfidence: 55,
        rationale: "Back injury WD from APC. Won Players in 2019 and 2025. If he plays, ownership will be suppressed = leverage.",
        chalk: "Too risky for the safe entry. Back spasms, no practice rounds, may not even tee it up. Floor is a WD/MC.",
        contrarian: "If he plays and contends, suppressed ownership (maybe 8-12% instead of 20%+) gives huge leverage. Classic buy-low.",
      },
      {
        name: "Morikawa, Collin",
        jackConfidence: 65,
        abeConfidence: 35,
        rationale: "Won Pebble Beach, OWGR 5, 3 top-10s. Strong floor but will be 10-15% owned. Solid but not differentiated.",
        chalk: "Strong safe alternative if avoiding Scheffler. Won this year, elite iron player, Sawgrass fits his game.",
        contrarian: "Too much ownership for a contrarian play. Everyone knows he's good. No leverage edge.",
      },
      {
        name: "Young, Cameron",
        jackConfidence: 55,
        abeConfidence: 45,
        rationale: "5/5 cuts, a 3rd, 2 top-10s, $1.97M. Under the radar but extremely consistent this season.",
      },
      {
        name: "Fleetwood, Tommy",
        jackConfidence: 50,
        abeConfidence: 40,
        rationale: "OWGR 3, 3/3 cuts, 2 top-10s. Small sample but elite ranking and form. Quietly strong option.",
      },
      {
        name: "Schauffele, Xander",
        jackConfidence: 45,
        abeConfidence: 30,
        rationale: "OWGR 10, 4/5 cuts. Underperforming his talent this season. 1 top-10 and $1M doesn't match the name.",
      },
      {
        name: "Henley, Russell",
        jackConfidence: 40,
        abeConfidence: 35,
        rationale: "OWGR 6, 4/5 cuts, 2 top-10s. Steady but unspectacular. Profiles well for Sawgrass accuracy demands.",
      },
      {
        name: "Hovland, Viktor",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "4/4 cuts but only 1 top-10. $733K in 4 starts isn't inspiring. Short game concerns at Sawgrass.",
      },
      {
        name: "Aberg, Ludvig",
        jackConfidence: 20,
        abeConfidence: 30,
        rationale: "Only 3/5 cuts. Missed cuts are a killer in cumulative scoring. Talent is there but 2026 form is inconsistent.",
      },
    ],
    sources: [
      { href: "https://www.pgatour.com/article/news/the-first-look/2026/03/09/the-players-championship-tpc-sawgrass-stadium-course-scottie-scheffler-rory-mcilroy", label: "PGA Tour: The First Look" },
      { href: "https://www.espn.com/golf/story/_/id/48142426/2026-players-championship-ranking-top-25-players-field", label: "ESPN: Top 25 Power Rankings" },
    ],
  },
  2: {
    players: [
      {
        name: "Bhatia, Akshay",
        jackConfidence: 75,
        abeConfidence: 85,
        rationale: "Just won APC, T3 at 2025 Players, 3 top-10s. Hottest player in the field. $5.4M earned leads Tier B.",
        chalk: "Elite current form and Sawgrass history. 4/6 cuts is the one concern, but his ceiling when making the cut is top-5.",
        contrarian: "Peak confidence after APC win, aggressive style fits Sawgrass. Will draw ownership but his upside ceiling is the highest in this tier.",
      },
      {
        name: "Matsuyama, Hideki",
        jackConfidence: 85,
        abeConfidence: 40,
        rationale: "6/6 cuts — best rate in Tier B. A 2nd and 2 top-10s. Former Masters champ with elite big-game experience.",
        chalk: "The safest pick in Tier B. 100% cuts, consistent contention, $2.1M earned. In cumulative scoring, this floor is gold.",
        contrarian: "Reliable but not differentiated enough. Most savvy pool players will consider him. Doesn't offer enough leverage.",
      },
      {
        name: "Lee, Min Woo",
        jackConfidence: 60,
        abeConfidence: 55,
        rationale: "5/5 cuts, a 2nd, 2 top-10s, $2.98M. Strong season flying under the radar. OWGR 30.",
      },
      {
        name: "Gotterup, Chris",
        jackConfidence: 55,
        abeConfidence: 60,
        rationale: "OWGR 7, 5/6 cuts, 2 top-10s, $3.84M. High ranking + high earnings but no wins. Sneaky GPP upside.",
      },
      {
        name: "MacIntyre, Robert",
        jackConfidence: 50,
        abeConfidence: 45,
        rationale: "OWGR 8, 5/5 cuts. Only 1 top-10 but 3 top-25s. Consistent but low ceiling.",
      },
      {
        name: "Fitzpatrick, Matt",
        jackConfidence: 50,
        abeConfidence: 30,
        rationale: "5/5 cuts, 1 top-10, 3 top-25s. Precision player who fits Sawgrass. Reliable floor.",
      },
      {
        name: "Fowler, Rickie",
        jackConfidence: 40,
        abeConfidence: 50,
        rationale: "5/5 cuts, 4 top-25s, but OWGR 60 is low for this tier. Name recognition means higher ownership than warranted.",
      },
      {
        name: "McNealy, Maverick",
        jackConfidence: 35,
        abeConfidence: 35,
        rationale: "5/6 cuts, 1 top-10, 4 top-25s. Solid but unspectacular. Low ceiling.",
      },
      {
        name: "Cantlay, Patrick",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "Only 3/5 cuts, 0 top-10s, $604K. Significantly underperforming his talent. High MC risk.",
      },
      {
        name: "Koepka, Brooks",
        jackConfidence: 10,
        abeConfidence: 45,
        rationale: "OWGR 221, only 2/3 cuts. But 1 top-10 in limited action. Big-game pedigree. Near-zero owned = max leverage if he shows up.",
      },
    ],
    sources: [
      { href: "https://www.golfchannel.com/pga-tour/news/who-won-arnold-palmer-invitational-2026-daniel-berger-akshay-bhatia-pga-tour-playoff", label: "Golf Channel: Bhatia Wins APC" },
      { href: "https://datagolf.com/rankings", label: "DataGolf Rankings" },
    ],
  },
  3: {
    players: [
      {
        name: "Bridgeman, Jacob",
        jackConfidence: 90,
        abeConfidence: 50,
        rationale: "Won Genesis, 6/6 cuts, 3 top-10s, 100% top-25 rate, $5.5M. #1 SG: Putting. Breakout star of 2026.",
        chalk: "Best floor in Tier C by a mile. 100% cuts, 100% top-25s, and a win. First Players entry = lower ownership than his stats deserve.",
        contrarian: "Strong player but after Genesis win he'll draw attention. Not quite low-owned enough for a pure contrarian play.",
      },
      {
        name: "Straka, Sepp",
        jackConfidence: 45,
        abeConfidence: 80,
        rationale: "OWGR 9 — highest ranked in Tier C. A 2nd and a top-10 with $2.3M. Massively undervalued by tier placement.",
        chalk: "4/5 cuts is good but not elite. One missed cut adds risk for a chalk entry.",
        contrarian: "OWGR 9 in Tier C is a tier-assignment gift. He should be in A or B. Pool opponents won't roster him here = pure leverage.",
      },
      {
        name: "Knapp, Jake",
        jackConfidence: 70,
        abeConfidence: 65,
        rationale: "5/5 cuts, 4 top-10s, $2.17M. If healthy (WD from Bay Hill with illness), he's the most in-form player in this tier.",
        chalk: "Elite consistency if healthy. 4 top-10s in 5 starts is insane. Health is the only question mark.",
        contrarian: "If healthy, will draw some ownership. But illness WD may scare off casual pool players = hidden leverage.",
      },
      {
        name: "Berger, Daniel",
        jackConfidence: 55,
        abeConfidence: 50,
        rationale: "6/6 cuts, a 2nd, 2 top-10s, $2.76M. Lost to Bhatia in APC playoff. In great form.",
      },
      {
        name: "Kitayama, Kurt",
        jackConfidence: 45,
        abeConfidence: 40,
        rationale: "5/6 cuts, a 2nd, 1 top-10. $2.22M earned. Solid but inconsistent week-to-week.",
      },
      {
        name: "Scott, Adam",
        jackConfidence: 40,
        abeConfidence: 35,
        rationale: "5/5 cuts, 1 top-10, 3 top-25s. Veteran consistency at OWGR 50. Quiet reliable option.",
      },
      {
        name: "Lowry, Shane",
        jackConfidence: 35,
        abeConfidence: 45,
        rationale: "Only 3/4 cuts but a 2nd and 2 top-10s when he makes it. Boom-or-bust profile.",
      },
      {
        name: "English, Harris",
        jackConfidence: 35,
        abeConfidence: 25,
        rationale: "6/6 cuts but 0 top-10s. High floor, zero ceiling. Makes the weekend but doesn't contend.",
      },
      {
        name: "Spieth, Jordan",
        jackConfidence: 20,
        abeConfidence: 40,
        rationale: "4/5 cuts, 0 top-10s but 3 top-25s. Name recognition = higher ownership. Not efficient for either entry.",
      },
      {
        name: "Griffin, Ben",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "OWGR 13 but 0 top-10s and only $412K. Rankings don't match the results. Risky.",
      },
    ],
    sources: [
      { href: "https://www.pgatour.com/article/news/daily-wrapup/2026/02/22/jacob-bridgeman-wins-the-genesis-invitational-for-first-career-win-holds-off-rory-mcilroy-kurt-kitayama-riviera", label: "PGA Tour: Bridgeman Wins Genesis" },
      { href: "https://datagolf.com/rankings", label: "DataGolf Rankings" },
    ],
  },
  4: {
    players: [
      {
        name: "Theegala, Sahith",
        jackConfidence: 92,
        abeConfidence: 35,
        rationale: "7/7 cuts — ONLY player in Tier D with 100% rate. 3 top-10s, 5 top-25s, $1.69M. Highest floor in tier by far.",
        chalk: "The perfect chalk pick. 100% cuts in 7 starts with 3 top-10s. In cumulative scoring, this consistency is unmatched.",
        contrarian: "Too safe for a contrarian play. Consistent but lacks the upside ceiling to differentiate in a 559-entry pool.",
      },
      {
        name: "Rose, Justin",
        jackConfidence: 20,
        abeConfidence: 82,
        rationale: "OWGR 5 but only 2/5 cuts. When he makes the cut, he wins ($1.8M on 2 cuts). Extreme boom-or-bust.",
        chalk: "Way too risky. 3 missed cuts in 5 starts is disqualifying for a floor-focused entry.",
        contrarian: "OWGR 5 in Tier D is absurd value. If he makes the cut, he contends for the win. Near-zero owned + elite talent = GPP gold.",
      },
      {
        name: "Gerard, Ryan",
        jackConfidence: 70,
        abeConfidence: 45,
        rationale: "6/7 cuts, 2 runner-ups, 2 top-10s, $2.07M. Knocking on the door consistently. OWGR 27.",
        chalk: "Strong floor with 2 runner-ups showing he can contend. Reliable cut-maker at 86% rate.",
        contrarian: "Good player but not differentiated enough. His ownership won't be low enough for true leverage.",
      },
      {
        name: "Hojgaard, Nicolai",
        jackConfidence: 55,
        abeConfidence: 50,
        rationale: "4/4 cuts, a 2nd, 2 top-10s, 4 top-25s. Perfect cut rate and strong results in limited action.",
      },
      {
        name: "Mitchell, Keith",
        jackConfidence: 50,
        abeConfidence: 30,
        rationale: "7/7 cuts but only 1 top-10. Reliable cut-maker with a low ceiling. OWGR 114 is concerning.",
      },
      {
        name: "Hall, Harry",
        jackConfidence: 35,
        abeConfidence: 40,
        rationale: "4/6 cuts, 2 top-10s, 4 top-25s. Inconsistent cut-making but solid when he plays the weekend.",
      },
      {
        name: "Burns, Sam",
        jackConfidence: 20,
        abeConfidence: 55,
        rationale: "Only 2/5 cuts but OWGR 32 and 1 top-10. Talented but unreliable in 2026. Contrarian ceiling play.",
      },
      {
        name: "Thorbjornsen, Michael",
        jackConfidence: 30,
        abeConfidence: 35,
        rationale: "4/6 cuts, a 3rd, 1 top-10. Young talent with upside but inconsistent cut rate.",
      },
      {
        name: "Noren, Alex",
        jackConfidence: 25,
        abeConfidence: 25,
        rationale: "OWGR 17 but only 3/5 cuts, 0 top-10s. Ranking doesn't match 2026 results.",
      },
      {
        name: "Spaun, J.J.",
        jackConfidence: 10,
        abeConfidence: 15,
        rationale: "OWGR 11 but 2/5 cuts and $88K earned. Lost in Players playoff last year but 2026 form is terrible.",
      },
    ],
    sources: [
      { href: "https://www.pgatour.com/stats", label: "PGA Tour Stats" },
      { href: "https://fantasynational.com/pga/course-fit", label: "FantasyNational Course Fit" },
    ],
  },
  5: {
    players: [
      {
        name: "Coody, Pierceson",
        jackConfidence: 82,
        abeConfidence: 40,
        rationale: "6/7 cuts, a 2nd, 2 top-10s, 5 top-25s, $1.62M. Best balance of floor and ceiling in Tier E.",
        chalk: "Highest floor in the tier. 86% cuts, consistent top-25 finishes, and a runner-up showing he can contend.",
        contrarian: "Solid but not differentiated. Savvy pool players will see the same stats. Not low-owned enough for leverage.",
      },
      {
        name: "Thomas, Justin",
        jackConfidence: 10,
        abeConfidence: 85,
        rationale: "OWGR 14 but only 1 event played and 0 cuts. Won Players in 2021. Top-5 talent if healthy.",
        chalk: "0/1 cuts is disqualifying for a safe entry. Way too much MC risk.",
        contrarian: "OWGR 14 in Tier E with Players pedigree (2021 champion). If he contends, you'll be nearly alone. Classic GPP leverage.",
      },
      {
        name: "McCarty, Matt",
        jackConfidence: 60,
        abeConfidence: 45,
        rationale: "6/7 cuts, a 2nd, 1 top-10, 3 top-25s, $1.06M. Consistent cut-maker with a strong runner-up finish.",
        chalk: "Good floor at 86% cuts and steady results. Under the radar name means lower ownership.",
        contrarian: "Decent leverage play but ceiling is limited. Runner-up shows he can contend but not a game-changer.",
      },
      {
        name: "Taylor, Nick",
        jackConfidence: 50,
        abeConfidence: 30,
        rationale: "6/6 cuts but 0 top-10s. Reliable weekend player without contention upside.",
      },
      {
        name: "Hojgaard, Rasmus",
        jackConfidence: 35,
        abeConfidence: 40,
        rationale: "4/5 cuts, 1 top-10. Solid young talent but limited 2026 sample. Twin of Nicolai in Tier D.",
      },
      {
        name: "Rai, Aaron",
        jackConfidence: 35,
        abeConfidence: 30,
        rationale: "4/4 cuts but 0 top-10s and only $270K. Makes weekends but doesn't contend.",
      },
      {
        name: "Conners, Corey",
        jackConfidence: 30,
        abeConfidence: 25,
        rationale: "4/5 cuts, 0 top-10s, 1 top-25. Approach-shot specialist but results haven't followed in 2026.",
      },
      {
        name: "Bezuidenhout, Christiaan",
        jackConfidence: 25,
        abeConfidence: 35,
        rationale: "4/5 cuts but only 1 top-10 and $253K. Limited upside.",
      },
      {
        name: "Thompson, Davis",
        jackConfidence: 20,
        abeConfidence: 30,
        rationale: "4/5 cuts, 1 top-10. OWGR 111 is low. Inconsistent results.",
      },
      {
        name: "Bradley, Keegan",
        jackConfidence: 10,
        abeConfidence: 20,
        rationale: "Only 2/5 cuts, 0 top-10s, $156K. Ryder Cup captain but 2026 form is poor.",
      },
    ],
    sources: [
      { href: "https://datagolf.com/predictive-model", label: "DataGolf Predictions" },
    ],
  },
  6: {
    players: [
      {
        name: "Hisatsune, Ryo",
        jackConfidence: 88,
        abeConfidence: 35,
        rationale: "6/7 cuts, a 2nd at Farmers, 3 top-10s, $1.68M. Best consistency + results combo in Tier F.",
        chalk: "Highest floor in the tier. 86% cuts with 3 top-10s including a runner-up. Approach play fits Sawgrass perfectly.",
        contrarian: "Too consistent and well-known for a contrarian play. Will draw moderate ownership from data-driven players.",
      },
      {
        name: "Castillo, Ricky",
        jackConfidence: 35,
        abeConfidence: 88,
        rationale: "Won PR Open last week, 5/5 cuts, 2 top-10s. First PGA Tour title. Will be essentially zero-owned.",
        chalk: "Only 34 career starts and first Players entry. Too unknown for a safe play despite the win.",
        contrarian: "Peak confidence off maiden win + zero ownership = maximum GPP leverage. If he contends, you're alone.",
      },
      {
        name: "Stevens, Sam",
        jackConfidence: 55,
        abeConfidence: 40,
        rationale: "6/7 cuts, 1 top-10, 2 top-25s, $836K. Steady performer. OWGR 49.",
      },
      {
        name: "Clark, Wyndham",
        jackConfidence: 45,
        abeConfidence: 35,
        rationale: "5/5 cuts but 0 top-10s and only 1 top-25. Name is bigger than his 2026 results.",
      },
      {
        name: "Echavarria, Nico",
        jackConfidence: 30,
        abeConfidence: 55,
        rationale: "Only 3/7 cuts but has a win and $2.3M. Extreme boom-or-bust. When he's on, he wins.",
      },
      {
        name: "Day, Jason",
        jackConfidence: 25,
        abeConfidence: 50,
        rationale: "3/5 cuts, a 2nd, 1 top-10. Won Players in 2016. Name recognition means higher ownership than warranted.",
      },
      {
        name: "Pendrith, Taylor",
        jackConfidence: 35,
        abeConfidence: 25,
        rationale: "4/6 cuts, 1 top-10. Decent floor but limited ceiling at OWGR 66.",
      },
      {
        name: "Reitan, Kristoffer",
        jackConfidence: 20,
        abeConfidence: 30,
        rationale: "3/4 cuts, 0 top-10s. OWGR 46 suggests ability but results haven't materialized.",
      },
      {
        name: "Im, Sungjae",
        jackConfidence: 10,
        abeConfidence: 35,
        rationale: "Only 1 event, 0 cuts. OWGR 79. No 2026 form data. High risk but talent is undeniable if healthy.",
      },
      {
        name: "Olesen, Thorbjorn",
        jackConfidence: 5,
        abeConfidence: 15,
        rationale: "1/3 cuts, $31K earned. OWGR 102. Not enough data to trust in either format.",
      },
    ],
    sources: [
      { href: "https://www.pgatour.com/article/news/daily-wrapup/2026/03/08/ricky-castillo-wins-puerto-rico-open-for-first-career-pga-tour-title", label: "PGA Tour: Castillo Wins PR Open" },
      { href: "https://datagolf.com/player-profiles", label: "DataGolf Player Profiles" },
    ],
  },
  7: {
    players: [
      {
        name: "Rodgers, Patrick",
        jackConfidence: 90,
        abeConfidence: 30,
        rationale: "7/7 cuts — ONLY player in Tier G with 100% rate. A 3rd, a top-10, $1.05M. In a 60-player tier, this reliability is gold.",
        chalk: "The safest pick in a 60-player tier by a wide margin. 100% cuts + contention finishes. Cumulative scoring dream.",
        contrarian: "Too reliable and well-known in data circles. Ownership will be moderate for Tier G. Not enough leverage.",
      },
      {
        name: "Putnam, Andrew",
        jackConfidence: 25,
        abeConfidence: 82,
        rationale: "A 2nd and a top-10 on only 4 events — elite hit rate. $682K is among highest in Tier G.",
        chalk: "Only 2/4 cuts. Too risky for a floor play. One missed cut and you're at zero points.",
        contrarian: "Runner-up finish + low name recognition = near-zero owned. When he makes the cut, he contends hard. Perfect GPP lever.",
      },
      {
        name: "Fox, Ryan",
        jackConfidence: 65,
        abeConfidence: 55,
        rationale: "4/4 cuts, 1 top-10, 4 top-25s, $1M. OWGR 44 is way too low for Tier G. Massive tier-assignment value.",
        chalk: "100% cuts with strong results. OWGR 44 in the 60-player tier is a gift. Excellent safe play.",
        contrarian: "Great player but may draw ownership from savvy entrants who spot the tier mismatch.",
      },
      {
        name: "Moore, Taylor",
        jackConfidence: 45,
        abeConfidence: 60,
        rationale: "4/4 cuts, a 2nd, $837K. 100% cut rate in limited starts. Runner-up shows upside. OWGR 140 = zero owned.",
      },
      {
        name: "Smotherman, Austin",
        jackConfidence: 20,
        abeConfidence: 55,
        rationale: "3/6 cuts but a 2nd and 2 top-10s, $977K. When he makes the cut, he goes deep. Classic boom-or-bust GPP play.",
      },
      {
        name: "Schmid, Matti",
        jackConfidence: 40,
        abeConfidence: 45,
        rationale: "5/8 cuts, 2 top-10s, $510K. Decent volume and results. Under the radar European.",
      },
      {
        name: "Dahmen, Joel",
        jackConfidence: 30,
        abeConfidence: 50,
        rationale: "3/5 cuts but 2 top-10s, $593K. Boom potential when he makes the weekend. Low ownership guaranteed.",
      },
      {
        name: "Hoge, Tom",
        jackConfidence: 35,
        abeConfidence: 35,
        rationale: "4/7 cuts, 1 top-10, 2 top-25s, $644K. Decent but unreliable cut rate.",
      },
      {
        name: "Li, HaoTong",
        jackConfidence: 30,
        abeConfidence: 40,
        rationale: "4/6 cuts, 1 top-10, 2 top-25s. OWGR 75. Occasional top-10 pop. Low owned.",
      },
      {
        name: "Bauchou, Zach",
        jackConfidence: 40,
        abeConfidence: 25,
        rationale: "6/6 cuts, 3 top-25s. 100% cut rate is valuable. No top-10s limits ceiling but floor is solid.",
      },
      {
        name: "Novak, Andrew",
        jackConfidence: 30,
        abeConfidence: 35,
        rationale: "4/6 cuts, 1 top-10, $498K. OWGR 47 is high for Tier G. Decent value.",
      },
      {
        name: "Jaeger, Stephan",
        jackConfidence: 25,
        abeConfidence: 40,
        rationale: "3/5 cuts, a 3rd, 1 top-10. When he makes the cut, he can contend. OWGR 109.",
      },
      {
        name: "Riley, Davis",
        jackConfidence: 20,
        abeConfidence: 40,
        rationale: "3/6 cuts but a 3rd and a top-10. Boom-or-bust. Classic GPP dart throw.",
      },
      {
        name: "Finau, Tony",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "3/6 cuts, 0 top-10s. Name recognition will inflate ownership. Avoid — bad value.",
      },
      {
        name: "Roy, Kevin",
        jackConfidence: 25,
        abeConfidence: 25,
        rationale: "3/5 cuts, 3 top-25s, $429K. Makes weekends and finishes decently. Low ceiling.",
      },
      {
        name: "Harman, Brian",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "4/6 cuts, 0 top-10s. Name bigger than 2026 results. Avoid for both entries.",
      },
      {
        name: "Cauley, Bud",
        jackConfidence: 30,
        abeConfidence: 20,
        rationale: "4/6 cuts, 2 top-25s, $432K. Decent floor but no top-10 upside.",
      },
      {
        name: "Kim, Michael",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "4/6 cuts, 1 top-25. Limited results.",
      },
      {
        name: "Power, Seamus",
        jackConfidence: 25,
        abeConfidence: 20,
        rationale: "4/5 cuts, 1 top-25. Makes weekends but doesn't contend.",
      },
      {
        name: "Greyserman, Max",
        jackConfidence: 25,
        abeConfidence: 25,
        rationale: "4/6 cuts, 2 top-25s. OWGR 54. Mid-range option.",
      },
      {
        name: "Mouw, William",
        jackConfidence: 10,
        abeConfidence: 35,
        rationale: "2/5 cuts but 1 top-10, $342K. High-risk GPP dart throw.",
      },
      {
        name: "Hodges, Lee",
        jackConfidence: 15,
        abeConfidence: 35,
        rationale: "2/4 cuts but 1 top-10. When he makes the cut, he can contend.",
      },
      {
        name: "Potgieter, Aldrich",
        jackConfidence: 10,
        abeConfidence: 40,
        rationale: "2/6 cuts but 1 top-10, $878K. Massive ceiling when on. Pure GPP lottery ticket.",
      },
      {
        name: "Penge, Marco",
        jackConfidence: 15,
        abeConfidence: 30,
        rationale: "2/4 cuts, OWGR 38. High ranking but limited PGA Tour results.",
      },
      {
        name: "Yellamaraju, Sudarshan",
        jackConfidence: 30,
        abeConfidence: 20,
        rationale: "5/6 cuts, 2 top-25s. Good cut rate. Zero ownership guaranteed.",
      },
      {
        name: "Ramey, Chad",
        jackConfidence: 30,
        abeConfidence: 15,
        rationale: "5/6 cuts, 2 top-25s. Solid floor but no ceiling.",
      },
      {
        name: "Kim, S.H.",
        jackConfidence: 30,
        abeConfidence: 15,
        rationale: "5/6 cuts, 2 top-25s. Reliable cut-maker.",
      },
      {
        name: "McCarthy, Denny",
        jackConfidence: 25,
        abeConfidence: 15,
        rationale: "5/6 cuts but 0 top-10s, 0 top-25s. Makes cuts but doesn't do anything.",
      },
      {
        name: "McGreevy, Max",
        jackConfidence: 25,
        abeConfidence: 15,
        rationale: "5/7 cuts but 0 top-10s, 0 top-25s. Volume player with no results.",
      },
      {
        name: "Smith, Jordan",
        jackConfidence: 20,
        abeConfidence: 20,
        rationale: "4/5 cuts, 2 top-25s. Mid-range option.",
      },
      {
        name: "Homa, Max",
        jackConfidence: 20,
        abeConfidence: 20,
        rationale: "4/5 cuts but 0 top-10s, 1 top-25. Name recognition will inflate ownership. Avoid.",
      },
      {
        name: "Smalley, Alex",
        jackConfidence: 25,
        abeConfidence: 15,
        rationale: "5/6 cuts, 1 top-25. Reliable but no upside.",
      },
      {
        name: "Pavon, Matthieu",
        jackConfidence: 25,
        abeConfidence: 15,
        rationale: "5/6 cuts, 1 top-25. OWGR 263 is a red flag despite cut rate.",
      },
      {
        name: "Phillips, Chandler",
        jackConfidence: 20,
        abeConfidence: 15,
        rationale: "4/5 cuts, 1 top-25. Limited upside.",
      },
      {
        name: "Meissner, Mac",
        jackConfidence: 20,
        abeConfidence: 15,
        rationale: "4/5 cuts, 1 top-25. Mid-range.",
      },
      {
        name: "Keefer, John",
        jackConfidence: 20,
        abeConfidence: 15,
        rationale: "4/5 cuts, OWGR 67. 0 top-10s, 0 top-25s despite decent cut rate.",
      },
      {
        name: "Hughes, Mackenzie",
        jackConfidence: 20,
        abeConfidence: 15,
        rationale: "4/5 cuts, 1 top-25. Ryder Cup talk but 2026 results are thin.",
      },
      {
        name: "Hoey, Rico",
        jackConfidence: 15,
        abeConfidence: 15,
        rationale: "4/7 cuts, 1 top-25. Low cut rate and limited upside.",
      },
      {
        name: "Hubbard, Mark",
        jackConfidence: 15,
        abeConfidence: 10,
        rationale: "4/6 cuts, 1 top-25. Minimal results.",
      },
      {
        name: "Vegas, Jhonattan",
        jackConfidence: 15,
        abeConfidence: 15,
        rationale: "3/5 cuts, 1 top-25. Limited data.",
      },
      {
        name: "Glover, Lucas",
        jackConfidence: 15,
        abeConfidence: 15,
        rationale: "2/3 cuts, 1 top-25. Small sample.",
      },
      {
        name: "Kizzire, Patton",
        jackConfidence: 20,
        abeConfidence: 10,
        rationale: "3/4 cuts, 2 top-25s. Quiet consistency.",
      },
      {
        name: "Valimaki, Sami",
        jackConfidence: 15,
        abeConfidence: 15,
        rationale: "3/6 cuts, 0 top-10s. OWGR 53 but no results to back it up.",
      },
      {
        name: "Kanaya, Takumi",
        jackConfidence: 15,
        abeConfidence: 15,
        rationale: "3/6 cuts, 1 top-25. Limited upside.",
      },
      {
        name: "Schenk, Adam",
        jackConfidence: 15,
        abeConfidence: 10,
        rationale: "3/6 cuts, 1 top-25. Low cut rate.",
      },
      {
        name: "Poston, J.T.",
        jackConfidence: 15,
        abeConfidence: 10,
        rationale: "3/5 cuts, 0 top-10s, 0 top-25s. Not viable.",
      },
      {
        name: "Highsmith, Joe",
        jackConfidence: 15,
        abeConfidence: 10,
        rationale: "4/6 cuts but 0 top-10s, 0 top-25s. Makes cuts without contending.",
      },
      {
        name: "Vilips, Karl",
        jackConfidence: 10,
        abeConfidence: 15,
        rationale: "2/4 cuts, 1 top-25. Too small a sample.",
      },
      {
        name: "Cole, Eric",
        jackConfidence: 10,
        abeConfidence: 10,
        rationale: "3/6 cuts, 0 top-10s. OWGR 121. Not viable.",
      },
      {
        name: "Grillo, Emiliano",
        jackConfidence: 10,
        abeConfidence: 10,
        rationale: "3/6 cuts, 0 top-10s, $100K. Poor form.",
      },
      {
        name: "Brennan, Michael",
        jackConfidence: 10,
        abeConfidence: 10,
        rationale: "4/6 cuts but 0 top-10s, 0 top-25s, $96K. Not viable.",
      },
      {
        name: "Higgo, Garrick",
        jackConfidence: 5,
        abeConfidence: 10,
        rationale: "2/5 cuts, $70K. Not in form.",
      },
      {
        name: "Walker, Danny",
        jackConfidence: 5,
        abeConfidence: 5,
        rationale: "3/6 cuts, $82K. OWGR 227. Not viable.",
      },
      {
        name: "Campbell, Brian",
        jackConfidence: 5,
        abeConfidence: 5,
        rationale: "2/6 cuts, $54K. Not viable.",
      },
      {
        name: "Fisk, Steven",
        jackConfidence: 5,
        abeConfidence: 5,
        rationale: "2/5 cuts, $83K. Not viable.",
      },
      {
        name: "Whaley, Vince",
        jackConfidence: 5,
        abeConfidence: 5,
        rationale: "2/6 cuts, $59K. Not viable.",
      },
      {
        name: "Kirk, Chris",
        jackConfidence: 5,
        abeConfidence: 10,
        rationale: "2/6 cuts, $103K. Former winner but 2026 form is gone.",
      },
      {
        name: "van Rooyen, Erik",
        jackConfidence: 2,
        abeConfidence: 5,
        rationale: "0/6 cuts. Zero cuts in 6 starts. Do not roster.",
      },
      {
        name: "Woodland, Gary",
        jackConfidence: 5,
        abeConfidence: 5,
        rationale: "2/5 cuts, $39K. Not viable.",
      },
      {
        name: "Yu, Kevin",
        jackConfidence: 5,
        abeConfidence: 5,
        rationale: "1/5 cuts, $34K. Not viable.",
      },
    ],
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
          559 entries, top 4 paid per tournament (~0.7% cash rate). How to approach each tier.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--background)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Estimated Ownership Concentrations</h3>
            <p className="mb-3 text-xs text-[var(--text-muted)]">
              Based on DFS data from DraftKings/FantasyNational and pool dynamics. With 559 entries,
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
              <strong className="text-white">Key insight:</strong> If ~250 entries have Scheffler,
              your differentiation has to come from Tiers 2-7. Even if Scheffler wins, you&apos;re
              competing against ~250 other Scheffler entries for the top 4 spots — meaning your
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
        <h2 className="mb-1 text-xl font-bold">Tier-by-Tier Confidence Ratings</h2>
        <p className="mb-6 text-xs text-[var(--text-muted)]">
          Every player rated for Jack (chalk/floor) and Abe (contrarian/ceiling). Higher % = more confident pick for that entry.
        </p>

        <div className="space-y-4">
          {tiers.map((tier) => {
            const analysis = tierAnalysis[tier.tier as keyof typeof tierAnalysis];
            return (
              <TierCard
                key={tier.tier}
                tier={tier}
                analysis={analysis.players}
                sources={analysis.sources}
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

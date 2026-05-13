/* ================================================================== */
/*  PGA CHAMPIONSHIP 2026 — Aronimink Trends Board                    */
/*                                                                    */
/*  CBS Sports' six historical winning trends for the PGA Champ.      */
/*  Players who pass ALL SIX trends = the model's final contenders.   */
/*  Last 10 PGA winners all averaged +1.74 SG/round prior 3 months.   */
/* ================================================================== */

export interface AronimkTheme {
  title: string;
  detail: string;
}

export const aronimkThemes: AronimkTheme[] = [
  {
    title: "1. OWGR Top 50",
    detail:
      "Every PGA Championship winner in the last decade has been inside the OWGR top 50 (the lone exception was Phil Mickelson in 2021). Five of those winners were top-10. Top-50 is the bare minimum.",
  },
  {
    title: "2. Prior PGA top-20 finish",
    detail:
      "9 of the last 10 PGA winners had a prior top-20 finish at the event. Only Collin Morikawa (2020) won on debut. PGA Championship form is sticky — pedigree at this major matters.",
  },
  {
    title: "3. Top-5 finish in calendar year",
    detail:
      "9 of the last 10 winners had at least one top-5 finish during the calendar year. 'Major champions rarely pop up unannounced' — recent form is the catalyst.",
  },
  {
    title: "4. Strokes Gained Total +1.74 (prior 3 months)",
    detail:
      "All 10 recent champions averaged at least +1.74 SG/round over the prior 3 months. Recent champion benchmarks: Schauffele 2024 (+2.75), Scheffler 2025 (+3.15), Thomas 2022 (+2.36).",
  },
  {
    title: "5. Strokes Gained: Off the Tee +0.52 (prior 3 months)",
    detail:
      "Elite drivers like Koepka and Scheffler dominate recent PGAs. Aronimink at 7,237 yds with 12 par 4s rewards driving distance + accuracy as a baseline.",
  },
  {
    title: "6. Strokes Gained: Approach (scoring clubs) +0.79 (prior 3 months)",
    detail:
      "3 of the last 6 PGA winners gained more than +1.0 strokes/round with scoring clubs. Aronimink is a SECOND-SHOT golf course — Donald Ross greens reward iron-play precision over everything else.",
  },
];

/* ------------------------------------------------------------------ */
/*  Contender ranking — fit against the 6-trend framework              */
/* ------------------------------------------------------------------ */

export interface PgaTrendContender {
  name: string;
  trendsHit: number;
  poolTier: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  hook: string;
}

export const pgaTrendContenders: PgaTrendContender[] = [
  // 6 of 6 — passes every winning trend
  {
    name: "Rory McIlroy",
    trendsHit: 6,
    poolTier: "A",
    hook: "OWGR #2. Two-time PGA champion (2012, 2014). 6/6 cuts and a 2026 win. Toe injury is the only knock — odds drifted to +900 making him a price discount.",
  },
  {
    name: "Jon Rahm",
    trendsHit: 6,
    poolTier: "A",
    hook: "Two-time major champion. T8 at last year's PGA challenging Scheffler late. Trend-perfect despite LIV — best Tier A contrarian.",
  },
  {
    name: "Cameron Young",
    trendsHit: 6,
    poolTier: "A",
    hook: "Won The Players in 2026. T3 at 2022 PGA. Driver + improved putter + iron play all clicking — full trend pass at +1475.",
  },
  {
    name: "Xander Schauffele",
    trendsHit: 6,
    poolTier: "A",
    hook: "Defending champion of the 2024 PGA. T9 at 2026 Masters. 4 top-10s, $4.2M. Trend-perfect across the board.",
  },
  {
    name: "Matt Fitzpatrick",
    trendsHit: 6,
    poolTier: "A",
    hook: "OWGR #4. 11/11 cuts, 3 wins, $10.6M, T8 at 2025 PGA. Trend-perfect with the best floor in the field outside Scheffler.",
  },

  // 5 of 6 — close-but-eliminated by a single trend
  {
    name: "Scottie Scheffler",
    trendsHit: 5,
    poolTier: "A",
    hook: "+385. Defending champion. Eliminated only on the +0.79 scoring-club benchmark — a model technicality. Talent says he wins anyway.",
  },
  {
    name: "Tommy Fleetwood",
    trendsHit: 5,
    poolTier: "A",
    hook: "OWGR #6. 9/9 cuts, 5 top-10s. Eliminated by SG-total threshold but T5 at 2022 PGA + iron play fits Aronimink.",
  },
  {
    name: "Russell Henley",
    trendsHit: 5,
    poolTier: "B",
    hook: "OWGR #9. 3rd straight major top-10 (Masters T3). Eliminated only by SG-total threshold — major form is real.",
  },
  {
    name: "Justin Rose",
    trendsHit: 5,
    poolTier: "B",
    hook: "OWGR #7. Five straight top-15 PGA finishes 2020–24. T3 at 2012 PGA. Eliminated by SG-total only.",
  },

  // Boom-or-bust contrarian darts
  {
    name: "Bryson DeChambeau",
    trendsHit: 4,
    poolTier: "A",
    hook: "2-time PGA RUNNER-UP ('24, '25). Eliminated by recent form (Masters MC + LIV WD with wrist concern). Pure boom-or-bust.",
  },
  {
    name: "Justin Thomas",
    trendsHit: 4,
    poolTier: "B",
    hook: "TWO-TIME PGA CHAMPION ('17, '22). Eliminated by recent top-5 trend. Coming off best tournament of the year — pure boom-or-bust.",
  },
  {
    name: "Brooks Koepka",
    trendsHit: 3,
    poolTier: "B",
    hook: "THREE-TIME PGA CHAMPION + a runner-up. Eliminated by OWGR (#125) and form. But when Brooks shows up at a PGA, he wins. Best contrarian dart in B.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quick takeaways for the dashboard                                  */
/* ------------------------------------------------------------------ */

export const pgaTrendTakeaways = [
  "5 players pass ALL 6 winning trends: Rory McIlroy, Jon Rahm, Cameron Young, Xander Schauffele, Matt Fitzpatrick",
  "Scottie Scheffler passes 5 of 6 (iron-play +0.79 benchmark is the lone miss — basically a tiebreaker)",
  "9 of the last 10 PGA winners had a prior top-20 PGA — fade Tier-D-and-below names with ZERO PGA pedigree",
  "Aronimink is a second-shot course (Donald Ross, par 70, only 2 par 5s) — trust iron-play archetypes over bombers",
];

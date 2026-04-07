/* ================================================================== */
/*  MASTERS 2026 — Augusta National Trends Board                      */
/*                                                                    */
/*  Source: industry-standard "19 trends" framework that grades       */
/*  contenders against the historical winning profile at Augusta.     */
/*  Last year, Rory McIlroy fit all 19 trends — and won.              */
/* ================================================================== */

export interface AugustaTheme {
  title: string;
  detail: string;
}

export const augustaThemes: AugustaTheme[] = [
  {
    title: "Course knowledge & experience matter",
    detail:
      "Augusta knowledge — green contours, miss zones, wind reads — is directly correlated to success. First-timers rarely contend.",
  },
  {
    title: "Longshot winners are improbable",
    detail:
      "Augusta is the chalkiest major. The winner almost always comes from the very top of the board.",
  },
  {
    title: "Recent winning experience is significant",
    detail:
      "Players who have won in the last 12 months — especially against strong fields — are dramatically over-represented on Sundays.",
  },
  {
    title: "Current form, especially tee-to-green, is paramount",
    detail:
      "SG: Tee-to-Green and SG: Approach over the last 24 rounds is the single most predictive stat heading into Masters week.",
  },
  {
    title: "An elite putter is NOT required",
    detail:
      "Augusta's greens reward great touch, not great mechanics. Streaky putters can win here. Don't over-weight putting.",
  },
  {
    title: "It's a bombers' paradise",
    detail:
      "Bobby Jones designed Augusta to reward aggressive driving. Length unlocks shorter approaches into the most demanding greens in golf.",
  },
  {
    title: "Attacking the par 5s is mandatory",
    detail:
      "The four par 5s separate contenders from the field. Par-5 scoring (last 24 rounds) is a tier-1 filter.",
  },
  {
    title: "Chipping on tight, uneven lies is predictive",
    detail:
      "Augusta's runoffs and Bermuda-overseeded surrounds are the toughest short-game test in golf. The best short-gamers rise.",
  },
  {
    title: "Approach precision into elevated, firm greens",
    detail:
      "Mid-iron proximity (175–225 yds) and ball-flight control are the difference between birdie looks and bogey scrambles.",
  },
];

/* ------------------------------------------------------------------ */
/*  Contender ranking — fit against the 19-trend framework             */
/* ------------------------------------------------------------------ */

export interface TrendContender {
  name: string;
  trendsHit: number;
  poolTier: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  hook: string;
}

export const trendContenders: TrendContender[] = [
  // 17 of 19
  {
    name: "Ludvig Aberg",
    trendsHit: 17,
    poolTier: "A",
    hook: "T2 at the 2023 Masters as a rookie. Elite ball-striker, 5/7 cuts and a 3rd in 2026 — Augusta loves him.",
  },
  {
    name: "Xander Schauffele",
    trendsHit: 17,
    poolTier: "A",
    hook: "Two-time major champion (2024 PGA + Open). 6/7 cuts in 2026, three top-10s, closes majors.",
  },
  {
    name: "Tommy Fleetwood",
    trendsHit: 17,
    poolTier: "A",
    hook: "OWGR #4. 5/5 cuts and FOUR top-10s in 2026 — quietly the hottest ball-striker in the field.",
  },

  // 16 of 19
  {
    name: "Scottie Scheffler",
    trendsHit: 16,
    poolTier: "A",
    hook: "Two-time Masters champion (2022, 2024). 6/6 cuts and a 2026 win. The chalkiest pick in the pool — and justified.",
  },
  {
    name: "Rory McIlroy",
    trendsHit: 16,
    poolTier: "A",
    hook: "Defending champion. Last year he hit all 19 trends and finally got his green jacket.",
  },
  {
    name: "Jon Rahm",
    trendsHit: 16,
    poolTier: "A",
    hook: "2023 Masters champion. LIV schedule is the question mark, but Augusta game travels.",
  },
  {
    name: "Bryson DeChambeau",
    trendsHit: 16,
    poolTier: "A",
    hook: "Bombers' paradise meets the longest hitter on earth. 2024 US Open champ — also LIV, also a coin flip.",
  },
  {
    name: "Matt Fitzpatrick",
    trendsHit: 16,
    poolTier: "A",
    hook: "2022 US Open champ. 7/7 cuts AND a win in 2026. Precision iron player who knows Augusta.",
  },
  {
    name: "Min Woo Lee",
    trendsHit: 16,
    poolTier: "B",
    hook: "7/7 cuts, a runner-up, $3.7M earned. Aggressive, long, and the form is electric.",
  },

  // 15 of 19
  {
    name: "Cameron Young",
    trendsHit: 15,
    poolTier: "A",
    hook: "OWGR #3, 6/6 cuts AND his first win in 2026. Massive power = par-5 edge. Profile finally caught up to results.",
  },

  // 14 of 19
  {
    name: "Collin Morikawa",
    trendsHit: 14,
    poolTier: "B",
    hook: "Best iron player in the world with a 2026 win. Slipped to Tier B — that's a gift in this format.",
  },
  {
    name: "Hideki Matsuyama",
    trendsHit: 14,
    poolTier: "A",
    hook: "2021 Masters champion. 8/8 cuts and a runner-up in 2026. Approach-first archetype.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quick takeaways for the dashboard                                  */
/* ------------------------------------------------------------------ */

export const trendTakeaways = [
  "3 players fit 17 of 19 trends: Aberg, Schauffele, Fleetwood",
  "6 players fit 16 of 19 trends: Scheffler, McIlroy, Rahm, DeChambeau, Fitzpatrick, Min Woo Lee",
  "Last year, Rory hit all 19 trends — and won. Trend-fit matters at Augusta.",
];

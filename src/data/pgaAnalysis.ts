import type { PlayerAnalysis } from "@/components/TierCard";

/* ================================================================== */
/*  PGA CHAMPIONSHIP 2026 — Aronimink Golf Club                       */
/*  Par 70 · 7,237 yards · Donald Ross · May 14–17, 2026              */
/*  2 par 5s · 4 par 3s · 12 par 4s · firm/fast bentgrass             */
/* ================================================================== */

export interface CourseIntel {
  tournament: string;
  course: string;
  par: number;
  yardage: number;
  grassType: string;
  keyStats: string[];
  historicalContext: string[];
  strategyNotes: string[];
}

export const pgaCourseIntel: CourseIntel = {
  tournament: "PGA Championship",
  course: "Aronimink Golf Club, Newtown Square, PA",
  par: 70,
  yardage: 7237,
  grassType: "Bentgrass greens · firm and fast typical",
  keyStats: [
    "SG: Approach and scoring-club play (125–175 yds) is the #1 predictor — Aronimink is a SECOND-SHOT golf course",
    "Par 70 with only TWO par 5s — birdie chances are scarce, par-4 scoring is the entire ballgame",
    "12 par 4s including #15 (newly converted to 546 yds — longest par 4 in major championship history)",
    "75 bunkers + elevated, sloping Ross greens that play smaller than they look — proximity matters more than length",
    "Hole 9 (605 yd par 5) is reachable for bombers; #16 (555 yd par 5) is reachable for most — the only birdie holes have to be cashed",
    "Hole 17 (229 yd par 3, pond left) can swing a Sunday — long-iron precision is required",
    "NOT a bombers' paradise — accuracy and iron play trump distance here. Long off the tee is a tiebreaker, not a ticket",
  ],
  historicalContext: [
    "Aronimink last hosted the PGA Championship in 1962 (won by Gary Player) — virtually NO course experience exists in the field",
    "9 of the last 10 PGA Championship winners had a prior top-20 PGA finish (Morikawa 2020 was the lone exception) — pedigree matters",
    "Every PGA winner since 2015 has been inside OWGR top 50 (except Mickelson 2021) — chalk wins this major",
    "Recent PGA champions: Scheffler (2025), Schauffele (2024), Koepka (2023), Thomas (2022), Mickelson (2021), Morikawa (2020), Koepka (2018, 2019)",
    "Past champions in this field: Scheffler, Schauffele, Koepka (×3), Thomas (×2), McIlroy (2012, 2014), Morikawa (2020), Day (2015) — deep pedigree pool",
  ],
  strategyNotes: [
    "Aronimink has hosted modern PGA Tour events (AT&T National, BMW, KPMG Women's PGA) — most pros have SOME reps. Course unknown is a smaller edge than Augusta",
    "In a 559-entry pool, fading Scheffler in Tier A is the highest-leverage move possible — but he's the shortest favorite of his career (+385)",
    "Trend-passing names in lower tiers (Fitzpatrick T1, Si Woo Kim T2, Henley T2) are the safest non-Scheffler floors",
    "LIV players (Rahm, DeChambeau, Hatton, Reed, Niemann, Koepka, Puig, Smith) have limited 2026 PGA Tour data — high-variance",
    "Weekend weather forecast matters — firm/fast = ball-striker advantage; soft = scoring barrage and contrarian darts pay",
  ],
};

/* ================================================================== */
/*  TIER-BY-TIER PLAYER ANALYSIS — 2026 PGA Championship field         */
/* ================================================================== */

export const pgaTierAnalysis: Record<number, PlayerAnalysis[]> = {
  /* ---------------------------------------------------------------- */
  /*  TIER A — Top 10 favorites                                       */
  /* ---------------------------------------------------------------- */
  1: [
    {
      name: "Scheffler, Scottie",
      jackConfidence: 96,
      abeConfidence: 12,
      rationale: "OWGR #1, defending PGA champion (2025), a 2026 win + 3 runner-ups + 9 top-10s in 9 starts. The shortest he's EVER been at a PGA (+385).",
      chalk: "The only true lock in the pool. Ownership will be 60%+ and that's correct.",
      contrarian: "Fading Scheffler is the single highest-leverage move possible. If he finishes T15+, you gain on every chalk team in the pool.",
    },
    {
      name: "McIlroy, Rory",
      jackConfidence: 82,
      abeConfidence: 35,
      rationale: "OWGR #2. Two-time PGA champion (2012, 2014). 6/6 cuts and a win in 2026. Toe injury and limited reps are the only knock — odds drifted from +650 to +900.",
      chalk: "Major monster + form = deserved Tier A chalk pivot.",
      contrarian: "Premium ownership. Story is fully baked into price.",
    },
    {
      name: "Fitzpatrick, Matt",
      jackConfidence: 90,
      abeConfidence: 70,
      rationale: "OWGR #4. 11/11 cuts, 3 wins, $10.6M earned in 2026. PASSES ALL 6 winning trends. T8 at 2025 PGA. The single best Tier A floor outside Scheffler.",
      chalk: "Trend-perfect, cut-machine, recent major contender. THE Tier A floor pick.",
      contrarian: "Best 'chalk-disguised-as-pivot' in Tier A — passes all 6 trends, ownership lags Scheffler/Rory.",
    },
    {
      name: "Schauffele, Xander",
      jackConfidence: 85,
      abeConfidence: 55,
      rationale: "Defending champion of the 2024 PGA. 9/10 cuts, 4 top-10s, T9 at 2026 Masters. PASSES ALL 6 trends. Closes majors.",
      chalk: "Past PGA champion + trend-perfect = elite Tier A play.",
      contrarian: "Solid pivot if Scheffler ownership cannibalizes him.",
    },
    {
      name: "Young, Cameron",
      jackConfidence: 82,
      abeConfidence: 70,
      rationale: "Won The Players Championship in 2026. T3 at 2022 PGA. Massive driving + improved putting. PASSES ALL 6 trends.",
      chalk: "Players champ + trend-perfect = legitimate Tier A chalk.",
      contrarian: "Major championship volatility (7 top-10s, 12 outside-top-30s) keeps ownership reasonable. Strong both columns.",
    },
    {
      name: "Rahm, Jon",
      jackConfidence: 65,
      abeConfidence: 80,
      rationale: "OWGR #20, 2-time major champ (2021 US Open, 2023 Masters). T8 at 2025 PGA challenging Scheffler late. PASSES ALL 6 trends despite LIV.",
      chalk: "LIV uncertainty caps the floor for chalk builds.",
      contrarian: "Trend-perfect + low ownership relative to talent = classic Abe leverage play. Best Tier A contrarian.",
    },
    {
      name: "Fleetwood, Tommy",
      jackConfidence: 78,
      abeConfidence: 60,
      rationale: "OWGR #6. 9/9 cuts and 5 top-10s in 2026. T5 at 2022 PGA. Iron play fits Aronimink perfectly — but no win yet in 2026.",
      chalk: "Cut machine with the right game for the course.",
      contrarian: "The 'no-win' narrative may suppress ownership — solid pivot.",
    },
    {
      name: "Morikawa, Collin",
      jackConfidence: 70,
      abeConfidence: 60,
      rationale: "2020 PGA champion. OWGR #5. 7/9 cuts, a win, 5 top-10s. Health is the question — withdrew from Truist with discomfort. T7 at Masters injured.",
      chalk: "If healthy, the iron play is a PERFECT course fit. Health risk caps it.",
      contrarian: "Health discount = ownership suppression. If he plays full, this is league-winner equity.",
    },
    {
      name: "Aberg, Ludvig",
      jackConfidence: 65,
      abeConfidence: 65,
      rationale: "OWGR #15. 8/10 cuts, $4.5M in 2026 but ZERO 2026 wins. Missed cut at 2025 PGA. No prior PGA top-20 (FAILS trend 2).",
      chalk: "Talent ceiling is real but the trend-fail and the cut at last year's PGA are red flags.",
      contrarian: "Some upside if he turns it on at his 3rd PGA — but better contrarian darts exist in Tier A.",
    },
    {
      name: "DeChambeau, Bryson",
      jackConfidence: 50,
      abeConfidence: 70,
      rationale: "Runner-up at the LAST TWO PGAs (2024, 2025). 2024 US Open champ. Missed Masters cut, withdrew from LIV Mexico City with wrist issue. FAILS trend 4 (form).",
      chalk: "Wrist + missed Masters cut = uninvestable for Jack despite the PGA history.",
      contrarian: "Boom-or-bust. Two straight PGA runner-ups can't be ignored — if the wrist is fine, the upside is top-3.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER B                                                          */
  /* ---------------------------------------------------------------- */
  2: [
    {
      name: "Henley, Russell",
      jackConfidence: 88,
      abeConfidence: 65,
      rationale: "OWGR #9 in TIER B. T3 at 2026 Masters. 8/10 cuts, a 3rd, 7 top-25s in 2026. The single biggest OWGR-vs-tier value in the entire pool.",
      chalk: "Trend-passer with elite recent major form. THE Tier B pick.",
      contrarian: "Even with the Masters T3, name recognition lags numbers — solid both columns.",
    },
    {
      name: "Kim, Si Woo",
      jackConfidence: 92,
      abeConfidence: 60,
      rationale: "13/13 cuts, a runner-up, two 3rds, $4.8M, T8 at 2025 PGA. The most consistent player in the entire 2026 field.",
      chalk: "Floor lock. Made every cut he's entered. The single safest non-Tier-A pick.",
      contrarian: "Limited Tier B contrarian leverage — chalk is correct here.",
    },
    {
      name: "Rose, Justin",
      jackConfidence: 78,
      abeConfidence: 60,
      rationale: "OWGR #7 in TIER B (!). A 2026 win + a 3rd. T3 at 2012 PGA. Five straight top-15 PGA finishes (2020–24).",
      chalk: "Massive OWGR-vs-tier value. Major-tested veteran + recent win = strong floor.",
      contrarian: "Age perception suppresses ownership. Solid pivot.",
    },
    {
      name: "MacIntyre, Robert",
      jackConfidence: 72,
      abeConfidence: 60,
      rationale: "OWGR #12 in TIER B. 9/10 cuts, a runner-up. T8 at 2024 PGA. Was 2nd at 2025 US Open.",
      chalk: "OWGR + recent major form = real value.",
      contrarian: "Lower ownership than the US-based equivalents at similar production.",
    },
    {
      name: "Cantlay, Patrick",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "OWGR #30. 8/10 cuts but ZERO top-5s in 2026 (FAILS trend 3). T3 at 2019 PGA. Putting has been a problem.",
      chalk: "Form is a real concern. Risky at this price.",
      contrarian: "Talent is real but no catalyst — middling leverage.",
    },
    {
      name: "Hovland, Viktor",
      jackConfidence: 50,
      abeConfidence: 55,
      rationale: "OWGR #27. 9/10 cuts but ZERO top-10s in 2026 (FAILS trend 3). Short game has been the issue for years.",
      chalk: "Skip. Cut floor without ceiling.",
      contrarian: "Mild leverage if the form turns — but no signal yet.",
    },
    {
      name: "Thomas, Justin",
      jackConfidence: 60,
      abeConfidence: 78,
      rationale: "TWO-TIME PGA CHAMPION (2017, 2022). OWGR #16. Coming off his best tournament of the season. Just one major top-30 in four years.",
      chalk: "Concerning major slump caps the chalk case.",
      contrarian: "Two-time PGA champ + low ownership + recent form uptick = best Tier B contrarian dart. Course knowledge from prior PGAs.",
    },
    {
      name: "Spieth, Jordan",
      jackConfidence: 45,
      abeConfidence: 70,
      rationale: "OWGR #51 — JUST FAILS trend 1. 11/12 cuts but ZERO top-10s in 2026. 2nd at 2015 PGA. Inconsistency is the story.",
      chalk: "Floor without ceiling — a dangerous combo at this tier.",
      contrarian: "Major pedigree + low ownership = Abe leverage but no recent catalyst.",
    },
    {
      name: "Hatton, Tyrrell",
      jackConfidence: 35,
      abeConfidence: 75,
      rationale: "1 PGA Tour event (LIV). OWGR #26. T3 at 2026 Masters. T10 at 2018 PGA. Full LIV momentum.",
      chalk: "Uninvestable for Jack — single data point.",
      contrarian: "LIV mystery box + Masters T3 + LIV form = legit boom-or-bust ceiling. Best Tier B LIV play.",
    },
    {
      name: "Koepka, Brooks",
      jackConfidence: 30,
      abeConfidence: 80,
      rationale: "THREE-TIME PGA CHAMPION (2018, 2019, 2023). OWGR #125. 6/9 cuts in LIV. T13 at Players, T12 at Masters. FAILS trends 1 and 4.",
      chalk: "OWGR and trends say skip.",
      contrarian: "Best contrarian dart in Tier B. Three PGAs at this price = if Brooks shows up, you win the league.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER C                                                          */
  /* ---------------------------------------------------------------- */
  3: [
    {
      name: "Matsuyama, Hideki",
      jackConfidence: 88,
      abeConfidence: 65,
      rationale: "11/11 cuts, a runner-up. 2021 Masters champ — the prototypical iron-first major winner. OWGR #17 in TIER C.",
      chalk: "Cut machine + perfect course-fit profile. Tier C floor lock.",
      contrarian: "Floor pick — limited contrarian edge.",
    },
    {
      name: "Straka, Sepp",
      jackConfidence: 85,
      abeConfidence: 60,
      rationale: "OWGR #13 in TIER C. Top-15 player in the world for the price of a Tier C pick. Iron play is elite.",
      chalk: "Massive OWGR-vs-tier value. Take him before someone else does.",
      contrarian: "Edge gets eaten as Tier C thinkers spot the OWGR.",
    },
    {
      name: "Gotterup, Chris",
      jackConfidence: 78,
      abeConfidence: 75,
      rationale: "OWGR #10 in TIER C (!). TWO 2026 wins, $4.9M, 11/12 cuts. New Jersey native — local knowledge edge. Cooling but elite season.",
      chalk: "OWGR top-10 in Tier C is a gift. Strong Jack play.",
      contrarian: "Local-comfort + form + discount = strong both columns.",
    },
    {
      name: "Lee, Min Woo",
      jackConfidence: 75,
      abeConfidence: 70,
      rationale: "10/11 cuts, a runner-up, a 3rd, $4.3M. Aggressive bomber profile. Iron play is the question for Aronimink.",
      chalk: "Form is real but the course profile slightly favors precision over power.",
      contrarian: "Solid pivot if you're fading bombers in higher tiers.",
    },
    {
      name: "Griffin, Ben",
      jackConfidence: 75,
      abeConfidence: 65,
      rationale: "OWGR #14 in TIER C. 11/14 cuts, a 3rd. Form has been steady, no top-5s in 2026 (FAILS trend 3).",
      chalk: "OWGR is huge for Tier C but the lack of top-5s caps the upside.",
      contrarian: "Mild leverage from the trend miss.",
    },
    {
      name: "Lowry, Shane",
      jackConfidence: 72,
      abeConfidence: 60,
      rationale: "2019 Open champion. 7/10 cuts and a runner-up. Elite short game — a real Aronimink fit.",
      chalk: "Major pedigree + short-game course fit = solid Tier C floor.",
      contrarian: "Modest leverage.",
    },
    {
      name: "Fowler, Rickie",
      jackConfidence: 70,
      abeConfidence: 80,
      rationale: "T2 at 2025 Quail Hollow. Three straight signature event top-10s. T3 at 2014 PGA. 9/11 cuts, a runner-up.",
      chalk: "Major pedigree + form is real.",
      contrarian: "Best Tier C contrarian play. Recent form, low ownership in Tier C, PGA history.",
    },
    {
      name: "Scott, Adam",
      jackConfidence: 75,
      abeConfidence: 50,
      rationale: "OWGR #46 but 10/10 cuts in 2026. Veteran ball-striker. FAILS trend 5 (driving) — pedigree carries.",
      chalk: "Perfect cut record in Tier C is rare. Strong floor.",
      contrarian: "Age caps ceiling — limited leverage.",
    },
    {
      name: "Burns, Sam",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "OWGR #35. 8/11 cuts, ZERO top-5s (FAILS trend 3). Recent 64 in final round at Quail Hollow.",
      chalk: "Floor risk without consistent ceiling.",
      contrarian: "Late-round Quail Hollow flash is the only catalyst — mild dart.",
    },
    {
      name: "Reed, Patrick",
      jackConfidence: 30,
      abeConfidence: 65,
      rationale: "1 PGA Tour event (LIV). 2018 Masters champ. T2 at 2017 PGA. Career-best driving and iron seasons in 2026 per LIV stats.",
      chalk: "Uninvestable.",
      contrarian: "Past major champ + claimed LIV form + dirt-low ownership = standard LIV dart.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER D                                                          */
  /* ---------------------------------------------------------------- */
  4: [
    {
      name: "Spaun, J.J.",
      jackConfidence: 85,
      abeConfidence: 70,
      rationale: "OWGR #8 in TIER D (!). 2025 US Open champion. A 2026 win, $3.3M, recent top-5 at Quail Hollow. Single biggest value in the pool.",
      chalk: "Reigning major champ at Tier D price = take him.",
      contrarian: "Even at expected high ownership, the price is wrong. Strong both columns.",
    },
    {
      name: "English, Harris",
      jackConfidence: 78,
      abeConfidence: 88,
      rationale: "T2 at 2025 PGA at Quail Hollow. OWGR #21 in TIER D. 11/12 cuts, recent top-5 at Harbour Town.",
      chalk: "Last year's PGA runner-up at this price is theft.",
      contrarian: "Best Abe play in Tier D. Major pedigree + low ownership in a low-recognition tier.",
    },
    {
      name: "Bhatia, Akshay",
      jackConfidence: 75,
      abeConfidence: 70,
      rationale: "A 2026 win + a 3rd, $6.4M. OWGR #23. Fearless shotmaking. No major pedigree yet.",
      chalk: "Form + earnings = bulletproof floor.",
      contrarian: "Mild leverage from missing major pedigree.",
    },
    {
      name: "Hojgaard, Nicolai",
      jackConfidence: 72,
      abeConfidence: 65,
      rationale: "10/11 cuts, TWO runner-ups, $4.3M. European discount on US recognition. FAILS trend 2.",
      chalk: "Cut machine with real upside.",
      contrarian: "European-form discount = solid Abe play.",
    },
    {
      name: "Day, Jason",
      jackConfidence: 70,
      abeConfidence: 75,
      rationale: "2015 PGA CHAMPION (Whistling Straits). 9/11 cuts, a runner-up in 2026. FAILS trend 4 (form).",
      chalk: "Past PGA winner + current form = solid both columns.",
      contrarian: "Major pedigree at Tier D price + low ownership = strong Abe leverage.",
    },
    {
      name: "Kitayama, Kurt",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "OWGR #34. 10/12 cuts, a runner-up. FAILS trend 4. Steady but ceiling-capped.",
      chalk: "Mid-tier floor.",
      contrarian: "No catalyst — filler.",
    },
    {
      name: "McNealy, Maverick",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "OWGR #33. 11/12 cuts but ZERO top-5s. FAILS trends 2 and 3.",
      chalk: "Cut machine, low ceiling.",
      contrarian: "Filler.",
    },
    {
      name: "Niemann, Joaquin",
      jackConfidence: 30,
      abeConfidence: 70,
      rationale: "0 PGA Tour events. OWGR #167. LIV's hottest player by reputation. Total mystery box.",
      chalk: "Uninvestable.",
      contrarian: "Best Tier D LIV dart — talent is top-20 globally if you trust the LIV results.",
    },
    {
      name: "Woodland, Gary",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "2019 US Open champ. Tier D placement is his recovery story discount.",
      chalk: "Past major + recovery story.",
      contrarian: "Sentimental dart with real ceiling.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER E                                                          */
  /* ---------------------------------------------------------------- */
  5: [
    {
      name: "Bridgeman, Jacob",
      jackConfidence: 88,
      abeConfidence: 70,
      rationale: "12/12 CUTS, a win, $6.8M, 4 top-10s. OWGR #19 in TIER E. The most consistent player in any tier outside Tier A.",
      chalk: "Take him. Floor is bulletproof, ceiling is real.",
      contrarian: "Best both-columns pick in Tier E.",
    },
    {
      name: "Fitzpatrick, Alex",
      jackConfidence: 78,
      abeConfidence: 88,
      rationale: "1 win + 3/3 CUTS + 3 top-10s in just 3 starts ($2.8M). OWGR #83 (FAILS trend 1) but small-sample form is electric.",
      chalk: "Sample size is small but the conversion rate is absurd.",
      contrarian: "Best Abe play in Tier E. Form star at zero ownership = league-winner equity.",
    },
    {
      name: "Conners, Corey",
      jackConfidence: 80,
      abeConfidence: 50,
      rationale: "OWGR #50. 10/11 cuts. Elite ball-striker — exactly the SG: Approach archetype Aronimink rewards. FAILS trend 3.",
      chalk: "Profile fit is perfect for the course. Cut floor is high.",
      contrarian: "No top-5s caps Abe interest.",
    },
    {
      name: "Theegala, Sahith",
      jackConfidence: 70,
      abeConfidence: 65,
      rationale: "13/14 cuts, 4 top-10s, $2.4M. OWGR #76 (FAILS trend 1). Solid season without a win.",
      chalk: "Cut machine in Tier E is rare — solid floor.",
      contrarian: "Form-driven leverage if he peaks.",
    },
    {
      name: "Bradley, Keegan",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "Ryder Cup captain. 8/11 cuts but ZERO top-5s (FAILS trend 3). OWGR #32.",
      chalk: "Form is a concern.",
      contrarian: "Captain narrative ≠ scoring catalyst.",
    },
    {
      name: "Hall, Harry",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "OWGR #57 (FAILS trend 1). 8/12 cuts, 3 top-10s. Mid-tier form.",
      chalk: "Filler floor.",
      contrarian: "No major catalyst.",
    },
    {
      name: "Noren, Alex",
      jackConfidence: 58,
      abeConfidence: 50,
      rationale: "OWGR #18 in TIER E (!). 9/11 cuts but ZERO top-5s. FAILS trend 3.",
      chalk: "OWGR says steal but the form says skip.",
      contrarian: "Mild leverage — no catalyst.",
    },
    {
      name: "Im, Sungjae",
      jackConfidence: 50,
      abeConfidence: 78,
      rationale: "T2 at 2020 Masters. 6/8 cuts, 2 top-10s. OWGR #67 (FAILS trend 1). Limited reps in 2026.",
      chalk: "Sample is small.",
      contrarian: "Major pedigree + low Tier E ownership = quality Abe dart.",
    },
    {
      name: "Thorbjornsen, Michael",
      jackConfidence: 45,
      abeConfidence: 55,
      rationale: "OWGR placement Tier E (FAILS trend 1). Limited data.",
      chalk: "Floor risk.",
      contrarian: "Mild upside dart.",
    },
    {
      name: "Puig, David",
      jackConfidence: 25,
      abeConfidence: 55,
      rationale: "0 PGA Tour events (LIV). OWGR #62. International unknown to US fans.",
      chalk: "Uninvestable.",
      contrarian: "LIV dart at zero ownership.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER F                                                          */
  /* ---------------------------------------------------------------- */
  6: [
    {
      name: "Reitan, Kristoffer",
      jackConfidence: 80,
      abeConfidence: 85,
      rationale: "A win + a runner-up + 3 top-10s, $5.0M earned. OWGR #25 in TIER F (!). Massive value — biggest OWGR-vs-tier gap in the tier.",
      chalk: "OWGR top-25 player at Tier F price = take him.",
      contrarian: "Best Abe play in Tier F. Hot form + low US ownership.",
    },
    {
      name: "Stevens, Sam",
      jackConfidence: 82,
      abeConfidence: 60,
      rationale: "13/14 CUTS in 2026, 2 top-10s. OWGR #49 in TIER F. Most consistent player in the tier.",
      chalk: "Cut machine — perfect Jack play.",
      contrarian: "Modest leverage.",
    },
    {
      name: "Berger, Daniel",
      jackConfidence: 70,
      abeConfidence: 55,
      rationale: "OWGR #42. 10/12 cuts, a runner-up, $3.1M. FAILS trend 4.",
      chalk: "Veteran with current form — solid floor.",
      contrarian: "Modest leverage.",
    },
    {
      name: "Mitchell, Keith",
      jackConfidence: 68,
      abeConfidence: 55,
      rationale: "11/12 cuts. OWGR #109. Steady ball-striker.",
      chalk: "Cut machine in Tier F is valuable.",
      contrarian: "Limited ceiling.",
    },
    {
      name: "Smalley, Alex",
      jackConfidence: 65,
      abeConfidence: 60,
      rationale: "12/13 cuts, a runner-up. Steady tour player.",
      chalk: "Strong cut floor for the tier.",
      contrarian: "Mild upside.",
    },
    {
      name: "Gerard, Ryan",
      jackConfidence: 65,
      abeConfidence: 65,
      rationale: "OWGR #36. 12/14 cuts, TWO runner-ups. FAILS trend 4 — form is the concern.",
      chalk: "Top-40 player at Tier F price.",
      contrarian: "Two runner-ups + low ownership = real upside.",
    },
    {
      name: "Penge, Marco",
      jackConfidence: 60,
      abeConfidence: 65,
      rationale: "OWGR #40. 7/11 cuts. European unknown to US fans.",
      chalk: "OWGR is much higher than tier suggests.",
      contrarian: "Lower ownership for a top-40 player. Solid leverage.",
    },
    {
      name: "Clark, Wyndham",
      jackConfidence: 58,
      abeConfidence: 60,
      rationale: "2023 US Open champion. OWGR #71 (FAILS trend 1). 9/11 cuts but ZERO top-5s. Form has slipped.",
      chalk: "Past major champ but the data is bad.",
      contrarian: "Boom-or-bust — major pedigree carries some weight.",
    },
    {
      name: "Taylor, Nick",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "Tour winner pedigree. Floor king but no real upside.",
      chalk: "Pure cut play.",
      contrarian: "Filler.",
    },
    {
      name: "Detry, Thomas",
      jackConfidence: 30,
      abeConfidence: 55,
      rationale: "0 PGA Tour events (LIV/no data). OWGR #61.",
      chalk: "Uninvestable.",
      contrarian: "Mystery dart.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER G — Longshots (90+ golfer field)                           */
  /* ---------------------------------------------------------------- */
  7: [
    {
      name: "Castillo, Ricky",
      jackConfidence: 75,
      abeConfidence: 70,
      rationale: "11/11 CUTS, 1 win, 2 top-10s, $1.45M. OWGR #90. The single best floor in the longshot tier — perfect cut record is unique here.",
      chalk: "THE floor lock for Tier G. Take him.",
      contrarian: "Strong both columns at zero ownership.",
    },
    {
      name: "Hisatsune, Ryo",
      jackConfidence: 70,
      abeConfidence: 78,
      rationale: "OWGR #59 stuck in TIER G. 12/13 cuts, a runner-up, FOUR top-10s, $2.6M. Best OWGR value in the tier.",
      chalk: "Top-60 player for longshot price.",
      contrarian: "Best Abe play in G. Top-10s + low US ownership.",
    },
    {
      name: "Echavarria, Nico",
      jackConfidence: 68,
      abeConfidence: 70,
      rationale: "OWGR #48 in TIER G. A 2026 win, $2.55M. FAILS trend 2 (no prior PGA top-20).",
      chalk: "Win equity is rare in Tier G — strong floor.",
      contrarian: "Win + low ownership.",
    },
    {
      name: "McCarty, Matt",
      jackConfidence: 70,
      abeConfidence: 65,
      rationale: "OWGR #43 in TIER G. 12/15 cuts, a runner-up, 4 top-10s, $2.8M. Top-50 talent at longshot price.",
      chalk: "High floor + significant value.",
      contrarian: "Strong both columns.",
    },
    {
      name: "Cauley, Bud",
      jackConfidence: 65,
      abeConfidence: 60,
      rationale: "OWGR #66. 10/12 cuts, $1.5M. Quietly solid.",
      chalk: "Reliable longshot floor.",
      contrarian: "Mild leverage.",
    },
    {
      name: "Brennan, Michael",
      jackConfidence: 60,
      abeConfidence: 60,
      rationale: "8/12 cuts, a top-10. Form is solid for an unranked longshot.",
      chalk: "Floor play.",
      contrarian: "Mild upside dart.",
    },
    {
      name: "Rai, Aaron",
      jackConfidence: 65,
      abeConfidence: 60,
      rationale: "OWGR #44 in TIER G. 7/9 cuts, 3 top-25s. Accurate iron player — Aronimink fit.",
      chalk: "Top-50 player at longshot price.",
      contrarian: "Course fit + low ownership.",
    },
    {
      name: "Coody, Pierceson",
      jackConfidence: 62,
      abeConfidence: 60,
      rationale: "OWGR #55 in TIER G. 10/13 cuts, a runner-up, $2.1M.",
      chalk: "Top-60 talent at longshot price.",
      contrarian: "Solid both columns.",
    },
    {
      name: "Putnam, Andrew",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "OWGR #82. 9/12 cuts, a runner-up, $1.7M.",
      chalk: "Decent floor.",
      contrarian: "Mild leverage.",
    },
    {
      name: "Smotherman, Austin",
      jackConfidence: 58,
      abeConfidence: 60,
      rationale: "OWGR #84. 8/13 cuts, a runner-up, $1.75M.",
      chalk: "Solid for tier.",
      contrarian: "Runner-up upside.",
    },
    {
      name: "Bridgeman? (see Tier E)",
      jackConfidence: 0,
      abeConfidence: 0,
      rationale: "Tier note: J. Bridgeman is in Tier E, not G — listed for clarity.",
      chalk: "—",
      contrarian: "—",
    },
    {
      name: "Hisatsune, Ryo (dupe note)",
      jackConfidence: 0,
      abeConfidence: 0,
      rationale: "Listed above — top OWGR play in G.",
      chalk: "—",
      contrarian: "—",
    },
  ].filter(p => p.jackConfidence > 0 || p.abeConfidence > 0),
};

/* ================================================================== */
/*  RECOMMENDED PICKS                                                 */
/* ================================================================== */

export interface RecommendedPicks {
  player: string;
  picks: {
    tier: number;
    name: string;
    reasoning: string;
  }[];
}

export const pgaRecommendedPicks: { jack: RecommendedPicks; abe: RecommendedPicks } = {
  jack: {
    player: "Jack",
    picks: [
      {
        tier: 1,
        name: "Scheffler, Scottie",
        reasoning: "Defending PGA champion (2025), OWGR #1, shortest odds of his career (+385). Ownership will be 60%+ and that's correct. The only true lock in the pool.",
      },
      {
        tier: 2,
        name: "Kim, Si Woo",
        reasoning: "13/13 CUTS in 2026 — most consistent player in the entire field. T8 at 2025 PGA. Floor lock at the safest non-Tier-A price.",
      },
      {
        tier: 3,
        name: "Matsuyama, Hideki",
        reasoning: "11/11 cuts, a runner-up, OWGR #17 in Tier C. 2021 Masters champ — the prototypical iron-first major winner. Aronimink is a second-shot course.",
      },
      {
        tier: 4,
        name: "Spaun, J.J.",
        reasoning: "OWGR #8 in TIER D. Reigning US Open champion + a 2026 win + top-5 at Quail Hollow last week. The single biggest value in the pool.",
      },
      {
        tier: 5,
        name: "Bridgeman, Jacob",
        reasoning: "12/12 CUTS, a win, $6.8M, 4 top-10s. OWGR #19 in Tier E. Floor is bulletproof, ceiling is real.",
      },
      {
        tier: 6,
        name: "Stevens, Sam",
        reasoning: "13/14 cuts, OWGR #49 in TIER F. Most consistent cut machine in Tier F.",
      },
      {
        tier: 7,
        name: "Castillo, Ricky",
        reasoning: "11/11 CUTS, a win, 2 top-10s. Single best floor in the longshot tier — a perfect cut record in Tier G is unheard of.",
      },
    ],
  },
  abe: {
    player: "Abe",
    picks: [
      {
        tier: 1,
        name: "Rahm, Jon",
        reasoning: "PASSES ALL 6 winning trends despite LIV. 2-time major champ, T8 at 2025 PGA challenging Scheffler late. Ownership lags Tier A peers — best contrarian play in the favorite tier.",
      },
      {
        tier: 2,
        name: "Koepka, Brooks",
        reasoning: "THREE-TIME PGA CHAMPION (2018, 2019, 2023). OWGR #125 means everyone fades him. If Brooks shows up at the PGA at this price, you win the league.",
      },
      {
        tier: 3,
        name: "Fowler, Rickie",
        reasoning: "T2 at 2025 Quail Hollow + 3 straight signature event top-10s + T3 at 2014 PGA. Field will pile into Matsuyama/Straka — Fowler at lower ownership has the same upside.",
      },
      {
        tier: 4,
        name: "English, Harris",
        reasoning: "T2 AT 2025 PGA at Quail Hollow. OWGR #21 in Tier D. Last year's runner-up at Tier D price = league-winner equity at low ownership.",
      },
      {
        tier: 5,
        name: "Fitzpatrick, Alex",
        reasoning: "1 win + 3/3 CUTS + 3 top-10s in just 3 starts. Form is electric, OWGR fails trend 1 so the field will fade. Pure leverage.",
      },
      {
        tier: 6,
        name: "Reitan, Kristoffer",
        reasoning: "A win + a runner-up + 3 top-10s, $5M. OWGR #25 in TIER F. Hot European form at zero US ownership = textbook Abe pick.",
      },
      {
        tier: 7,
        name: "Hisatsune, Ryo",
        reasoning: "OWGR #59 stuck in Tier G. 12/13 cuts, a runner-up, FOUR top-10s, $2.6M. Best contrarian dart in the longshot tier.",
      },
    ],
  },
};

import type { PlayerAnalysis } from "@/components/TierCard";

/* ================================================================== */
/*  MASTERS 2026 — Augusta National Golf Club                         */
/*  Par 72 · 7,545 yards · Bentgrass greens · April 9–12, 2026       */
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

export const mastersCourseIntel: CourseIntel = {
  tournament: "The Masters",
  course: "Augusta National Golf Club",
  par: 72,
  yardage: 7545,
  grassType: "Bentgrass (greens), Bermuda/Rye (fairways)",
  keyStats: [
    "SG: Approach is the #1 predictor of Masters success — second shots into elevated, firm greens demand precision with mid/long irons",
    "Par-5 scoring is critical — Augusta's four par 5s are reachable and separate contenders from the field",
    "Putting on slick bentgrass greens with severe undulation — misreads are double bogeys, not bogeys",
    "Amen Corner (holes 11-13) — the stretch where tournaments are won and lost, demands course management and nerve",
    "Driving accuracy matters less than distance — wide fairways but second-shot angles reward smart positioning",
    "Course experience is a massive edge — knowledge of where to miss, green contours, and wind patterns at Augusta is irreplaceable",
  ],
  historicalContext: [
    "Rory McIlroy is the defending champion — last year he hit all 19 historical winning trends and finally completed the career Grand Slam",
    "Scottie Scheffler won in 2022 and 2024 — two-time champion with elite course knowledge and the game to add a third",
    "Hideki Matsuyama won in 2021 — approach-first game is tailor-made for Augusta",
    "Past champions in the 2026 field: Scheffler, McIlroy, Matsuyama, Rahm (2023), Reed (2018), Garcia (2017), Willett (2016), Spieth (2015), Watson (2012, 2014), Scott (2013), Cabrera (2009), Couples (1992), Olazabal (1994, 1999), Singh (2000), Weir (2003), Z. Johnson (2007), Schwartzel (2011)",
    "The cut is top-50 and ties — more forgiving than most majors, which matters for floor-based picks",
  ],
  strategyNotes: [
    "In a 559-entry pool, differentiating in Tiers C-G matters most — that is where ownership is most diffuse",
    "Chalk plays in Tier A are fine because everyone picks from the same small group — edges come lower",
    "Augusta experience is a real, quantifiable edge — first-timers rarely contend",
    "LIV players (Bryson, Rahm, Reed, Hatton, Smith, Garcia) have ZERO PGA data points but their majors track records still matter — they're high-variance contrarian plays",
    "Weather at Augusta in April can swing results — afternoon wind and firm conditions favor ball-strikers",
  ],
};

/* ================================================================== */
/*  TIER-BY-TIER PLAYER ANALYSIS — Updated for 2026 Masters field     */
/* ================================================================== */

export const mastersTierAnalysis: Record<number, PlayerAnalysis[]> = {
  /* ---------------------------------------------------------------- */
  /*  TIER A — Top 10 favorites                                       */
  /* ---------------------------------------------------------------- */
  1: [
    {
      name: "Scheffler, Scottie",
      jackConfidence: 97,
      abeConfidence: 15,
      rationale: "Two-time Masters champion (2022, 2024). 6/6 cuts, a 2026 win, OWGR #1. The single safest pick in the pool.",
      chalk: "The lock. Ownership will be astronomical and it should be — his Augusta floor is unmatched.",
      contrarian: "Fading Scheffler is the biggest leverage play possible. If he finishes T15+, you gain on the entire field.",
    },
    {
      name: "McIlroy, Rory",
      jackConfidence: 85,
      abeConfidence: 30,
      rationale: "Defending champion. Hit all 19 historical Masters trends a year ago. 4/4 cuts and a runner-up in 2026. Scratched the Grand Slam itch — now he plays free.",
      chalk: "Defending champ + great form = high ownership but justified.",
      contrarian: "Premium priced. The narrative is fully baked in.",
    },
    {
      name: "Fleetwood, Tommy",
      jackConfidence: 90,
      abeConfidence: 60,
      rationale: "OWGR #4. 5/5 cuts and FOUR top-10s in 2026. Quietly the hottest ball-striker in the field. 17/19 trends.",
      chalk: "Underrated chalk — casual fans don't see how hot he is. Best Tier A bet that isn't Scheffler.",
      contrarian: "Strong in both columns. Form + trends = great Abe play if ownership lags name recognition.",
    },
    {
      name: "Schauffele, Xander",
      jackConfidence: 85,
      abeConfidence: 55,
      rationale: "2024 PGA + Open double. 6/7 cuts and three top-10s in 2026. 17/19 trends. Closes majors.",
      chalk: "Reliable major performer. Solid Tier A pivot off Scheffler.",
      contrarian: "Moderate ownership, strong all-around case. Both columns viable.",
    },
    {
      name: "Fitzpatrick, Matt",
      jackConfidence: 88,
      abeConfidence: 50,
      rationale: "7/7 cuts AND a 2026 win. OWGR #6. 2022 US Open champion. 16/19 trends. Precision iron player.",
      chalk: "Cut-machine with major pedigree — ideal Jack pick at the lower end of Tier A.",
      contrarian: "Could be over-shadowed by louder names — modest leverage.",
    },
    {
      name: "Matsuyama, Hideki",
      jackConfidence: 88,
      abeConfidence: 45,
      rationale: "2021 Masters champion. 8/8 cuts and a runner-up in 2026. Approach-first archetype — exactly the Augusta winner profile.",
      chalk: "Past champ + perfect form + perfect game = elite chalk.",
      contrarian: "Ownership will be high. Not a real fade candidate.",
    },
    {
      name: "Young, Cameron",
      jackConfidence: 78,
      abeConfidence: 65,
      rationale: "OWGR #3. 6/6 cuts AND his first PGA win in 2026. Massive power, par-5 edge. 15/19 trends.",
      chalk: "Profile finally caught up to the results. Aggressive Tier A bet.",
      contrarian: "Some will still see him as 'no-win' Cam — that's stale. Solid leverage if ownership lags.",
    },
    {
      name: "Aberg, Ludvig",
      jackConfidence: 80,
      abeConfidence: 65,
      rationale: "T2 at the 2023 Masters as a rookie. 5/7 cuts, a 3rd, $2.8M in 2026. 17/19 trends. Augusta loves him.",
      chalk: "Talent ceiling is top-3 in the field. Decent floor too.",
      contrarian: "Inconsistent year by elite standards — if ownership lags, the upside is huge.",
    },
    {
      name: "Rahm, Jon",
      jackConfidence: 60,
      abeConfidence: 78,
      rationale: "2023 Masters champion. 0 PGA events (LIV). OWGR #30 but his majors form is the only data that matters here. 16/19 trends.",
      chalk: "LIV uncertainty caps the floor. Not safe enough for Jack.",
      contrarian: "If the field fades him for no PGA data, he's a league-winner. Augusta game travels.",
    },
    {
      name: "DeChambeau, Bryson",
      jackConfidence: 55,
      abeConfidence: 80,
      rationale: "2024 US Open champion. 0 PGA events (LIV). Longest hitter on earth — bombers' paradise. 16/19 trends.",
      chalk: "LIV question mark and inconsistency at Augusta historically.",
      contrarian: "Best contrarian play in Tier A. Length + power + recent major win = legitimate ceiling.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER B                                                          */
  /* ---------------------------------------------------------------- */
  2: [
    {
      name: "Morikawa, Collin",
      jackConfidence: 92,
      abeConfidence: 50,
      rationale: "Best iron player in the world. A 2026 win. Falling to Tier B is a gift — he's the chalk lock here.",
      chalk: "THE Tier B pick. Approach game is tailor-made for Augusta. Ownership will be enormous and justified.",
      contrarian: "No real contrarian case — chalk is correct here.",
    },
    {
      name: "Lee, Min Woo",
      jackConfidence: 75,
      abeConfidence: 85,
      rationale: "7/7 cuts, a runner-up, $3.7M earned. 16/19 trends. Aggressive bomber, electric form.",
      chalk: "Form star with major upside. Solid Jack play.",
      contrarian: "Lower ownership than Morikawa with similar (or better) ceiling. Best Abe pivot in B.",
    },
    {
      name: "MacIntyre, Robert",
      jackConfidence: 78,
      abeConfidence: 60,
      rationale: "OWGR #8. 7/7 cuts and a runner-up in 2026. Lefties do well at Augusta (Mickelson, Bubba, Watson).",
      chalk: "Elite cut-maker with a lefty edge. Strong floor.",
      contrarian: "Underrated — name recognition is lower than form. Mild leverage.",
    },
    {
      name: "Gotterup, Chris",
      jackConfidence: 78,
      abeConfidence: 75,
      rationale: "TWO wins, 7/8 cuts, $4.2M, OWGR #11. The breakout star of 2026. First Masters appearance though.",
      chalk: "Form is undeniable. Floor risk is the Augusta debut.",
      contrarian: "Debutant discount = potential under-ownership. Talent says top-10 in B.",
    },
    {
      name: "Henley, Russell",
      jackConfidence: 75,
      abeConfidence: 50,
      rationale: "OWGR #12. 5/7 cuts and two top-10s in 2026. Steady iron player with Augusta experience.",
      chalk: "Reliable cut-maker. Solid floor pick.",
      contrarian: "Boring profile — not enough leverage to justify a contrarian build.",
    },
    {
      name: "Rose, Justin",
      jackConfidence: 70,
      abeConfidence: 55,
      rationale: "A 2026 win. Only 3/6 cuts but Augusta is his place — multiple top-10s and a runner-up here. OWGR #9.",
      chalk: "Augusta history overrides spotty 2026 form. Decent floor.",
      contrarian: "Age perception may suppress ownership. Real upside at his favorite course.",
    },
    {
      name: "Hovland, Viktor",
      jackConfidence: 50,
      abeConfidence: 60,
      rationale: "5/6 cuts but no top-10s in 2026. Augusta short game has historically been a problem.",
      chalk: "Risky — name recognition exceeds results.",
      contrarian: "If the short game has finally come around, the upside is real. But we've heard that before.",
    },
    {
      name: "Spieth, Jordan",
      jackConfidence: 55,
      abeConfidence: 78,
      rationale: "2015 Masters champion. 7/8 cuts, no top-10s in 2026. Augusta course knowledge is permanent.",
      chalk: "Form is concerning. Floor is wobbly.",
      contrarian: "Pure leverage play — minimal ownership at a course where he could win on autopilot.",
    },
    {
      name: "Koepka, Brooks",
      jackConfidence: 35,
      abeConfidence: 75,
      rationale: "OWGR #169. 4/6 cuts in LIV. Five-time major champion but the form has cratered.",
      chalk: "Don't touch.",
      contrarian: "Classic boom-or-bust — when Brooks shows up at majors, ownership at this price is criminal.",
    },
    {
      name: "Reed, Patrick",
      jackConfidence: 30,
      abeConfidence: 60,
      rationale: "2018 Masters champion. 0 PGA events (LIV). Mystery box.",
      chalk: "Uninvestable for Jack.",
      contrarian: "Past champ + dirt-low ownership = pure dart throw with major equity.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER C                                                          */
  /* ---------------------------------------------------------------- */
  3: [
    {
      name: "Kim, Si Woo",
      jackConfidence: 90,
      abeConfidence: 65,
      rationale: "9/9 cuts, $2.5M, four top-10s. The most consistent player in the entire pool. Players Championship winner pedigree.",
      chalk: "Floor lock. The single safest pick outside Tier A.",
      contrarian: "May actually be UNDER-owned because Tier C feels like 'flier' tier — that's wrong. Strong both columns.",
    },
    {
      name: "Lowry, Shane",
      jackConfidence: 78,
      abeConfidence: 55,
      rationale: "2019 Open champion. Multiple Augusta top-10s. 4/6 cuts and a runner-up in 2026. Elite short game.",
      chalk: "Major pedigree + short game fit + current form. Great Tier C chalk.",
      contrarian: "Moderate ownership, fair leverage.",
    },
    {
      name: "Bhatia, Akshay",
      jackConfidence: 75,
      abeConfidence: 85,
      rationale: "1 win, 5/7 cuts, $5.8M. Fearless shotmaking and creativity fit Augusta. Limited Augusta experience.",
      chalk: "Form says chalk but the experience gap creates floor risk.",
      contrarian: "Best Abe play in Tier C. Ceiling is enormous, ownership lags Kim.",
    },
    {
      name: "Day, Jason",
      jackConfidence: 70,
      abeConfidence: 60,
      rationale: "Former world #1. 2011 Masters runner-up. 5/7 cuts and a 2nd-place in 2026. Pedigree + form align.",
      chalk: "Past major form + Augusta history makes him a strong floor play.",
      contrarian: "Some leverage from age perception but not deep contrarian.",
    },
    {
      name: "Knapp, Jake",
      jackConfidence: 72,
      abeConfidence: 70,
      rationale: "OWGR #42 with FIVE top-10s in 7 starts. Form star. First Masters appearance.",
      chalk: "Form is undeniable but the Augusta debut is a real risk.",
      contrarian: "Under-owned because casual fans don't know him yet. Strong leverage.",
    },
    {
      name: "Spaun, J.J.",
      jackConfidence: 68,
      abeConfidence: 60,
      rationale: "OWGR #5 (!) — the breakout of 2026. A win, $2.1M. Small Augusta sample.",
      chalk: "OWGR says he belongs higher. Decent floor for Jack.",
      contrarian: "Augusta unknown caps Abe interest unless ownership is dirt low.",
    },
    {
      name: "Scott, Adam",
      jackConfidence: 75,
      abeConfidence: 50,
      rationale: "2013 Masters champion. 7/7 cuts in 2026 (no top-10s). Always shows up at Augusta.",
      chalk: "Past champ + perfect cut record = great floor play.",
      contrarian: "Age suppresses ownership but ceiling is also capped. Mild leverage.",
    },
    {
      name: "Cantlay, Patrick",
      jackConfidence: 55,
      abeConfidence: 50,
      rationale: "OWGR #35. 5/7 cuts but no top-10s in 2026. Knows Augusta but form is concerning.",
      chalk: "Floor is compromised by the lack of top-10s. Risky.",
      contrarian: "Mild leverage — talent is real but no catalyst to expect a turnaround.",
    },
    {
      name: "Burns, Sam",
      jackConfidence: 50,
      abeConfidence: 55,
      rationale: "OWGR #33. Only 4/7 cuts. Limited Augusta success and the form is shaky.",
      chalk: "Skip.",
      contrarian: "Not different enough to justify the risk.",
    },
    {
      name: "Thomas, Justin",
      jackConfidence: 35,
      abeConfidence: 80,
      rationale: "Only 3 events. Two-time major champ on the comeback trail. Pure boom-or-bust dart.",
      chalk: "Uninvestable.",
      contrarian: "If JT shows up healthy at a course he loves, this is a league-winner pick.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER D                                                          */
  /* ---------------------------------------------------------------- */
  4: [
    {
      name: "Straka, Sepp",
      jackConfidence: 85,
      abeConfidence: 55,
      rationale: "OWGR #13 in TIER D. 5/7 cuts and a runner-up. The single biggest OWGR-vs-tier value play in Tier D.",
      chalk: "Massive value. Top-15 player in the world available in D — take him.",
      contrarian: "Ownership will be high once Tier D thinkers see the OWGR. Modest leverage.",
    },
    {
      name: "Bridgeman, Jacob",
      jackConfidence: 80,
      abeConfidence: 88,
      rationale: "OWGR #18 in TIER D. 8/8 cuts, a win, four top-10s, $6.5M. Maybe the biggest value in the entire pool.",
      chalk: "Form + cuts = bulletproof floor.",
      contrarian: "Best Abe play in D. Ceiling is top-3 in the tier and ownership lags name recognition.",
    },
    {
      name: "Conners, Corey",
      jackConfidence: 78,
      abeConfidence: 45,
      rationale: "Elite ball-striker. 6/7 cuts but no top-10s. SG: Approach is Augusta's #1 stat and that's his strength.",
      chalk: "Profile fit is perfect — great Jack play.",
      contrarian: "Boring veteran, no real leverage.",
    },
    {
      name: "Hojgaard, Nicolai",
      jackConfidence: 75,
      abeConfidence: 65,
      rationale: "7/7 cuts, a runner-up, three top-10s. European form often under-owned in US pools.",
      chalk: "Cut machine with real upside. Strong Jack option.",
      contrarian: "Lower ownership than US-based equivalents. Solid Abe play.",
    },
    {
      name: "Berger, Daniel",
      jackConfidence: 70,
      abeConfidence: 60,
      rationale: "OWGR #38. 7/8 cuts, a runner-up, $2.8M. Quietly excellent year.",
      chalk: "Reliable. Good floor.",
      contrarian: "Modest leverage — his form is known by now.",
    },
    {
      name: "Kitayama, Kurt",
      jackConfidence: 65,
      abeConfidence: 55,
      rationale: "OWGR #34. 6/8 cuts, a runner-up. Solid floor but limited Augusta resume.",
      chalk: "Decent floor. Mid-tier Jack option.",
      contrarian: "Unremarkable — minimal leverage.",
    },
    {
      name: "English, Harris",
      jackConfidence: 62,
      abeConfidence: 50,
      rationale: "OWGR #20. 7/8 cuts but ZERO top-10s. Steady but ceiling-capped.",
      chalk: "Cut-maker. Floor over upside.",
      contrarian: "No catalyst — skip.",
    },
    {
      name: "McNealy, Maverick",
      jackConfidence: 60,
      abeConfidence: 50,
      rationale: "OWGR #27. 7/8 cuts. Reliable cut-maker, limited firepower.",
      chalk: "Floor play.",
      contrarian: "Filler.",
    },
    {
      name: "Woodland, Gary",
      jackConfidence: 55,
      abeConfidence: 65,
      rationale: "Won in 2026! OWGR #52. Limited Augusta success but the comeback story is real.",
      chalk: "Win is real but Augusta history is meh.",
      contrarian: "Comeback narrative + low ownership = legitimate Abe play.",
    },
    {
      name: "Hatton, Tyrrell",
      jackConfidence: 35,
      abeConfidence: 65,
      rationale: "0 PGA events (LIV). OWGR #31. Mystery box with real talent.",
      chalk: "Uninvestable for Jack.",
      contrarian: "Talent + low ownership = standard LIV leverage play.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER E                                                          */
  /* ---------------------------------------------------------------- */
  5: [
    {
      name: "Griffin, Ben",
      jackConfidence: 80,
      abeConfidence: 60,
      rationale: "OWGR #16 in TIER E (!). 6/9 cuts. The biggest OWGR-vs-tier value play in Tier E.",
      chalk: "Take him. Ranking says he should be in Tier B.",
      contrarian: "Modest leverage once Tier E thinkers spot the OWGR.",
    },
    {
      name: "Gerard, Ryan",
      jackConfidence: 78,
      abeConfidence: 70,
      rationale: "OWGR #29. 7/9 cuts, TWO runner-ups, $2.2M. Form star — first Masters though.",
      chalk: "Form is undeniable. Augusta debut is the only catch.",
      contrarian: "Casual fans don't know him. Strong Abe leverage.",
    },
    {
      name: "Penge, Marco",
      jackConfidence: 62,
      abeConfidence: 65,
      rationale: "OWGR #37. 4/8 cuts and a top-10. European unknown to US fans.",
      chalk: "OWGR is much higher than tier suggests.",
      contrarian: "Low ownership for a top-40 player. Solid leverage.",
    },
    {
      name: "Hall, Harry",
      jackConfidence: 65,
      abeConfidence: 55,
      rationale: "OWGR #62. 5/8 cuts, two top-10s. Solid mid-pack form.",
      chalk: "Decent floor.",
      contrarian: "Unremarkable.",
    },
    {
      name: "Hojgaard, Rasmus",
      jackConfidence: 60,
      abeConfidence: 60,
      rationale: "OWGR #57. 6/8 cuts. Twin of Nicolai. Steady but unspectacular.",
      chalk: "Cut-maker.",
      contrarian: "Mild European discount.",
    },
    {
      name: "Noren, Alex",
      jackConfidence: 60,
      abeConfidence: 50,
      rationale: "OWGR #19 (!). 5/7 cuts, no top-10s. Veteran cut-maker.",
      chalk: "OWGR makes him a steal in E if you trust the ranking.",
      contrarian: "Form is meh — no real upside catalyst.",
    },
    {
      name: "Bradley, Keegan",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "OWGR #26. 4/7 cuts, ZERO top-10s. Ryder Cup captain energy but the year has been mediocre.",
      chalk: "Form is concerning.",
      contrarian: "Floor is wobbly.",
    },
    {
      name: "Im, Sungjae",
      jackConfidence: 50,
      abeConfidence: 80,
      rationale: "T2 at the 2020 Masters! Only 4 events in 2026. Augusta history is the entire case.",
      chalk: "Sample size is too small.",
      contrarian: "Best Abe play in E. Augusta history + low ownership = league-winner equity.",
    },
    {
      name: "Smith, Cameron",
      jackConfidence: 30,
      abeConfidence: 70,
      rationale: "0 PGA events (LIV). 2022 Open champion. Mystery.",
      chalk: "Uninvestable.",
      contrarian: "Major champ + bottom-tier price = standard LIV dart.",
    },
    {
      name: "Homa, Max",
      jackConfidence: 25,
      abeConfidence: 50,
      rationale: "OWGR #163. 5/8 cuts. Form has cratered. Augusta history doesn't fully compensate.",
      chalk: "Skip.",
      contrarian: "Some leverage from name recognition fade but the data is grim.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER F                                                          */
  /* ---------------------------------------------------------------- */
  6: [
    {
      name: "Fox, Ryan",
      jackConfidence: 80,
      abeConfidence: 78,
      rationale: "OWGR #51 in TIER F. 4/5 cuts and FOUR top-25s. Ranking says Tier 4 talent — this is theft.",
      chalk: "Take him. Best OWGR-vs-tier value in F.",
      contrarian: "Strong both columns once you see the ranking.",
    },
    {
      name: "Stevens, Sam",
      jackConfidence: 78,
      abeConfidence: 60,
      rationale: "8/9 cuts! Two top-10s, $1.3M. The most consistent player in Tier F.",
      chalk: "Cut machine — perfect Jack play.",
      contrarian: "Modest leverage.",
    },
    {
      name: "Kim, Michael",
      jackConfidence: 65,
      abeConfidence: 60,
      rationale: "OWGR #43. 6/9 cuts and a runner-up. Form is solid for Tier F.",
      chalk: "Decent floor.",
      contrarian: "Mild leverage from low name recognition.",
    },
    {
      name: "Taylor, Nick",
      jackConfidence: 65,
      abeConfidence: 55,
      rationale: "OWGR #67. 8/9 cuts. Floor king but no real upside.",
      chalk: "Pure cut play.",
      contrarian: "No ceiling.",
    },
    {
      name: "Harman, Brian",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "2023 Open champion. OWGR #50. 6/8 cuts but no top-10s. Cut-maker.",
      chalk: "Major pedigree gives a small edge.",
      contrarian: "Limited upside.",
    },
    {
      name: "Rai, Aaron",
      jackConfidence: 60,
      abeConfidence: 50,
      rationale: "OWGR #39. 4/6 cuts. Accurate iron player with limited Augusta history.",
      chalk: "OWGR says he should be higher.",
      contrarian: "Form is uninspiring.",
    },
    {
      name: "Greyserman, Max",
      jackConfidence: 55,
      abeConfidence: 50,
      rationale: "OWGR #59. 4/8 cuts. Steady but no top-10s.",
      chalk: "Filler.",
      contrarian: "Filler.",
    },
    {
      name: "Reitan, Kristoffer",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "OWGR #46. 5/8 cuts. European unknown.",
      chalk: "Cut-maker.",
      contrarian: "Low ownership but no clear catalyst.",
    },
    {
      name: "Clark, Wyndham",
      jackConfidence: 50,
      abeConfidence: 55,
      rationale: "2023 US Open champion. OWGR #78. 6/8 cuts but no top-10s. Form has slipped.",
      chalk: "Past major champ but the data is bad.",
      contrarian: "Mild boom-or-bust angle.",
    },
    {
      name: "Garcia, Sergio",
      jackConfidence: 25,
      abeConfidence: 55,
      rationale: "2017 Masters champion. 0 PGA events (LIV). Mystery.",
      chalk: "Uninvestable.",
      contrarian: "Past champ + low ownership = sentimental dart.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  TIER G — Longshots, past champs & amateurs                      */
  /* ---------------------------------------------------------------- */
  7: [
    {
      name: "McCarty, Matt",
      jackConfidence: 75,
      abeConfidence: 65,
      rationale: "OWGR #49 stuck in Tier G. 7/10 cuts, a runner-up, $1.1M. Significant value play.",
      chalk: "Best floor in Tier G.",
      contrarian: "Strong both columns — top-50 talent at longshot price.",
    },
    {
      name: "Novak, Andrew",
      jackConfidence: 72,
      abeConfidence: 65,
      rationale: "OWGR #48. 6/9 cuts, a top-10. Quietly playing well.",
      chalk: "Reliable.",
      contrarian: "Low ownership for a top-50 player.",
    },
    {
      name: "Echavarria, Nico",
      jackConfidence: 70,
      abeConfidence: 75,
      rationale: "OWGR #40 in Tier G. A 2026 win, $2.4M, two top-10s. Massive value.",
      chalk: "Win + form is rare in Tier G — great floor.",
      contrarian: "Best Abe play in G. Win equity + low ownership.",
    },
    {
      name: "Valimaki, Sami",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "OWGR #56. 4/8 cuts. European steady.",
      chalk: "Decent floor.",
      contrarian: "Filler.",
    },
    {
      name: "Keefer, John",
      jackConfidence: 60,
      abeConfidence: 55,
      rationale: "OWGR #64. 5/9 cuts, a 3rd-place. Quietly strong.",
      chalk: "Mid-tier floor.",
      contrarian: "Mild leverage.",
    },
    {
      name: "Neergaard-Petersen, Rasmus",
      jackConfidence: 55,
      abeConfidence: 55,
      rationale: "OWGR #69. 5/6 cuts. European mystery.",
      chalk: "Cut-maker.",
      contrarian: "Tiny sample.",
    },
    {
      name: "Brennan, Michael",
      jackConfidence: 55,
      abeConfidence: 50,
      rationale: "6/9 cuts, $207K. Unranked but playing decent golf.",
      chalk: "Floor play.",
      contrarian: "Filler.",
    },
    {
      name: "Potgieter, Aldrich",
      jackConfidence: 55,
      abeConfidence: 65,
      rationale: "OWGR #77. 3/8 cuts, a top-10, $975K. Bomber profile fits Augusta.",
      chalk: "Cut risk.",
      contrarian: "Length + Augusta = real upside if he makes the weekend.",
    },
    {
      name: "Riley, Davis",
      jackConfidence: 50,
      abeConfidence: 50,
      rationale: "OWGR #120. 4/9 cuts. Slipping form.",
      chalk: "Risky.",
      contrarian: "Filler.",
    },
    {
      name: "Li, HaoTong",
      jackConfidence: 50,
      abeConfidence: 55,
      rationale: "OWGR #84. 4/9 cuts, a top-10. International unknown.",
      chalk: "Floor risk.",
      contrarian: "Low ownership.",
    },
    {
      name: "Campbell, Brian",
      jackConfidence: 35,
      abeConfidence: 45,
      rationale: "OWGR #112. Only 2/9 cuts. Form is bad.",
      chalk: "Skip.",
      contrarian: "Skip.",
    },
    {
      name: "Willett, Danny",
      jackConfidence: 35,
      abeConfidence: 60,
      rationale: "2016 Masters champion. OWGR #400. 2/4 cuts. Past champ with no current form.",
      chalk: "Uninvestable.",
      contrarian: "Past champ at zero ownership = pure dart.",
    },
    {
      name: "Johnson, Zach",
      jackConfidence: 30,
      abeConfidence: 55,
      rationale: "2007 Masters champion. OWGR #321. 2/2 cuts in limited starts.",
      chalk: "Sentimental.",
      contrarian: "Past champ low ownership dart.",
    },
    {
      name: "Johnson, Dustin",
      jackConfidence: 30,
      abeConfidence: 65,
      rationale: "2020 US Open champion. 0 PGA events (LIV). OWGR #593. Mystery box with major resume.",
      chalk: "Uninvestable.",
      contrarian: "If DJ shows up, the ceiling is still top-20.",
    },
    {
      name: "McKibbin, Tom",
      jackConfidence: 30,
      abeConfidence: 55,
      rationale: "OWGR #105. 0 PGA events (LIV). Young talent.",
      chalk: "Skip.",
      contrarian: "Future star at longshot price.",
    },
    {
      name: "Ortiz, Carlos",
      jackConfidence: 30,
      abeConfidence: 55,
      rationale: "OWGR #161. 0 PGA events (LIV).",
      chalk: "Skip.",
      contrarian: "LIV dart.",
    },
    {
      name: "Schwartzel, Charl",
      jackConfidence: 25,
      abeConfidence: 55,
      rationale: "2011 Masters champion. OWGR #566. 0 PGA events (LIV).",
      chalk: "Skip.",
      contrarian: "Past champ dart.",
    },
    {
      name: "Watson, Bubba",
      jackConfidence: 25,
      abeConfidence: 60,
      rationale: "Two-time Masters champion (2012, 2014). OWGR #702. 0 PGA events (LIV).",
      chalk: "Skip.",
      contrarian: "Lefty + two green jackets = best past-champ contrarian dart.",
    },
    {
      name: "Cabrera, Angel",
      jackConfidence: 20,
      abeConfidence: 40,
      rationale: "2009 Masters champion. Past champion exemption.",
      chalk: "Skip.",
      contrarian: "Sentimental.",
    },
    {
      name: "Couples, Fred",
      jackConfidence: 15,
      abeConfidence: 35,
      rationale: "1992 Masters champion. Past champion exemption. Ceremonial.",
      chalk: "Skip.",
      contrarian: "Skip.",
    },
    {
      name: "Olazabal, Jose Maria",
      jackConfidence: 15,
      abeConfidence: 30,
      rationale: "Two-time Masters champion (1994, 1999). Ceremonial.",
      chalk: "Skip.",
      contrarian: "Skip.",
    },
    {
      name: "Singh, Vijay",
      jackConfidence: 15,
      abeConfidence: 35,
      rationale: "2000 Masters champion. Ceremonial.",
      chalk: "Skip.",
      contrarian: "Skip.",
    },
    {
      name: "Weir, Mike",
      jackConfidence: 15,
      abeConfidence: 35,
      rationale: "2003 Masters champion. Lefty. Ceremonial at this stage.",
      chalk: "Skip.",
      contrarian: "Sentimental dart.",
    },
    {
      name: "Howell, Mason",
      jackConfidence: 25,
      abeConfidence: 55,
      rationale: "Amateur invitee. The amateurs have made the cut at Augusta before — pure ceiling play.",
      chalk: "Skip.",
      contrarian: "Amateur cut-makers are league-winners. Watch the buzz.",
    },
    {
      name: "Fang, Ethan",
      jackConfidence: 20,
      abeConfidence: 45,
      rationale: "Amateur invitee.",
      chalk: "Skip.",
      contrarian: "Amateur dart.",
    },
    {
      name: "Herrington, Jackson",
      jackConfidence: 20,
      abeConfidence: 45,
      rationale: "Amateur invitee.",
      chalk: "Skip.",
      contrarian: "Amateur dart.",
    },
    {
      name: "Holtz, Brandon",
      jackConfidence: 20,
      abeConfidence: 45,
      rationale: "Amateur invitee.",
      chalk: "Skip.",
      contrarian: "Amateur dart.",
    },
    {
      name: "Jarvis, Casey",
      jackConfidence: 20,
      abeConfidence: 45,
      rationale: "OWGR #70. International invitee.",
      chalk: "Skip.",
      contrarian: "Mild upside.",
    },
    {
      name: "Laopakdee, FIfa",
      jackConfidence: 20,
      abeConfidence: 45,
      rationale: "Amateur invitee.",
      chalk: "Skip.",
      contrarian: "Amateur dart.",
    },
    {
      name: "Pulcini, Mateo",
      jackConfidence: 20,
      abeConfidence: 45,
      rationale: "Amateur invitee.",
      chalk: "Skip.",
      contrarian: "Amateur dart.",
    },
    {
      name: "Kataoka, Naoyuki",
      jackConfidence: 20,
      abeConfidence: 40,
      rationale: "OWGR #372. International invitee.",
      chalk: "Skip.",
      contrarian: "Skip.",
    },
  ],
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

export const mastersRecommendedPicks: { jack: RecommendedPicks; abe: RecommendedPicks } = {
  jack: {
    player: "Jack",
    picks: [
      {
        tier: 1,
        name: "Scheffler, Scottie",
        reasoning: "Two-time defending champion. 6/6 cuts and a 2026 win. Ownership will be astronomical and that's fine — fading him is how you lose.",
      },
      {
        tier: 2,
        name: "Morikawa, Collin",
        reasoning: "Best iron player in the world falling to Tier B is the gift of the pool. Approach game is tailor-made for Augusta. Lock.",
      },
      {
        tier: 3,
        name: "Kim, Si Woo",
        reasoning: "9/9 cuts in 2026 — the most consistent player in the entire field. The safest non-Tier-A pick available.",
      },
      {
        tier: 4,
        name: "Straka, Sepp",
        reasoning: "OWGR #13 in Tier D. 5/7 cuts and a runner-up in 2026. Top-15 player in the world for the price of a Tier D pick.",
      },
      {
        tier: 5,
        name: "Griffin, Ben",
        reasoning: "OWGR #16 in Tier E. The biggest OWGR-vs-tier value play in the entire pool. Take him before someone else does.",
      },
      {
        tier: 6,
        name: "Stevens, Sam",
        reasoning: "8/9 cuts! Two top-10s. Most consistent player in Tier F by a mile.",
      },
      {
        tier: 7,
        name: "McCarty, Matt",
        reasoning: "OWGR #49 stuck in Tier G. 7/10 cuts, a runner-up, $1.1M. The highest floor available in G.",
      },
    ],
  },
  abe: {
    player: "Abe",
    picks: [
      {
        tier: 1,
        name: "DeChambeau, Bryson",
        reasoning: "0 PGA events but he's the longest hitter alive at the bombers' paradise. 2024 US Open champ + 16/19 trends. Best contrarian play in Tier A.",
      },
      {
        tier: 2,
        name: "Lee, Min Woo",
        reasoning: "7/7 cuts, a runner-up, $3.7M. 16/19 trends. Lower ownership than Morikawa with arguably more upside. Pure leverage.",
      },
      {
        tier: 3,
        name: "Bhatia, Akshay",
        reasoning: "1 win, $5.8M, fearless shotmaking. The field will pile into Si Woo Kim — Bhatia has the same ceiling at half the ownership.",
      },
      {
        tier: 4,
        name: "Bridgeman, Jacob",
        reasoning: "OWGR #18 in Tier D. 8/8 cuts, a win, $6.5M. Maybe the biggest value in the entire pool.",
      },
      {
        tier: 5,
        name: "Im, Sungjae",
        reasoning: "T2 at the 2020 Masters. Only 4 events in 2026 means the field will fade him. If he plays Augusta like he did in 2020, this is a league-winner.",
      },
      {
        tier: 6,
        name: "Fox, Ryan",
        reasoning: "OWGR #51 in Tier F. 4/5 cuts, four top-25s. Ranking says Tier 4 talent — at Tier F ownership.",
      },
      {
        tier: 7,
        name: "Echavarria, Nico",
        reasoning: "OWGR #40 in Tier G. A 2026 win, $2.4M, two top-10s. Win equity + dirt-low ownership = textbook Abe pick.",
      },
    ],
  },
};

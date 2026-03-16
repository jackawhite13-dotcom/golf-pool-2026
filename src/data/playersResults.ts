// The Players Championship 2026 — Final Results & Retrospective
// 73 players made the cut. Points formula: (73 + 10) - position + 1 = 84 - position
// Bonus: 1st +10, 2nd +7, 3rd +5. Missed cut = 0.

export interface GolferResult {
  name: string;
  tier: string;
  position: string; // "T5", "T22", "MC"
  positionNum: number | null; // numeric for calculation (null = missed cut)
  madeCut: boolean;
  points: number;
  preConfidenceJack: number; // 0-100 from pre-tournament analysis
  preConfidenceAbe: number;
  verdict: "great" | "good" | "ok" | "bad";
  note: string;
}

// Points calculation helper
function calcPoints(pos: number | null): number {
  if (pos === null) return 0;
  let pts = Math.max(0, 83 - pos + 1); // 84 - pos = 83 - pos + 1
  if (pos === 1) pts += 10;
  else if (pos === 2) pts += 7;
  else if (pos === 3) pts += 5;
  return pts;
}

export const PLAYERS_RESULTS = {
  tournament: "The Players Championship",
  dates: "Mar 12–15, 2026",
  location: "TPC Sawgrass",
  madeCut: 73,
  winner: "Cameron Young",
  winnerScore: "-13 (275)",

  jack: {
    team: "team jaw",
    rank: 15,
    totalPoints: 413,
    picks: [
      {
        name: "Scheffler, Scottie",
        tier: "A",
        position: "T22",
        positionNum: 22,
        madeCut: true,
        points: calcPoints(22), // 62
        preConfidenceJack: 95,
        preConfidenceAbe: 25,
        verdict: "ok" as const,
        note: "Made the cut but never threatened the top 10. Safe floor but no upside this week.",
      },
      {
        name: "Matsuyama, Hideki",
        tier: "B",
        position: "T27",
        positionNum: 27,
        madeCut: true,
        points: calcPoints(27), // 57
        preConfidenceJack: 85,
        preConfidenceAbe: 40,
        verdict: "ok" as const,
        note: "Solid cut-maker but underwhelming finish. Middle of the pack.",
      },
      {
        name: "Bridgeman, Jacob",
        tier: "C",
        position: "T5",
        positionNum: 5,
        madeCut: true,
        points: calcPoints(5), // 79
        preConfidenceJack: 90,
        preConfidenceAbe: 50,
        verdict: "great" as const,
        note: "Best pick on the team. T5 finish was a huge points haul. Confidence was justified.",
      },
      {
        name: "Rose, Justin",
        tier: "D",
        position: "T13",
        positionNum: 13,
        madeCut: true,
        points: calcPoints(13), // 71
        preConfidenceJack: 20,
        preConfidenceAbe: 82,
        verdict: "great" as const,
        note: "Low confidence from Jack but delivered big. T13 is excellent value from Tier D.",
      },
      {
        name: "Coody, Pierceson",
        tier: "E",
        position: "MC",
        positionNum: null,
        madeCut: false,
        points: 0,
        preConfidenceJack: 82,
        preConfidenceAbe: 40,
        verdict: "bad" as const,
        note: "Missed the cut despite high confidence. Biggest disappointment on the roster.",
      },
      {
        name: "Hisatsune, Ryo",
        tier: "F",
        position: "T13",
        positionNum: 13,
        madeCut: true,
        points: calcPoints(13), // 71
        preConfidenceJack: 88,
        preConfidenceAbe: 35,
        verdict: "great" as const,
        note: "Excellent pick. T13 from Tier F is a massive win. High confidence fully justified.",
      },
      {
        name: "Rodgers, Patrick",
        tier: "G",
        position: "T11",
        positionNum: 11,
        madeCut: true,
        points: calcPoints(11), // 73
        preConfidenceJack: 90,
        preConfidenceAbe: 30,
        verdict: "great" as const,
        note: "Outstanding from Tier G. T11 is one of the best low-tier picks in the pool.",
      },
    ] as GolferResult[],
  },

  abe: {
    team: "Watman",
    rank: 112,
    totalPoints: 323,
    picks: [
      {
        name: "Kim, Si Woo",
        tier: "A",
        position: "T50",
        positionNum: 50,
        madeCut: true,
        points: calcPoints(50), // 34
        preConfidenceJack: 30,
        preConfidenceAbe: 90,
        verdict: "bad" as const,
        note: "Made the cut but T50 is terrible from Tier A. Contrarian pick backfired hard.",
      },
      {
        name: "Bhatia, Akshay",
        tier: "B",
        position: "T13",
        positionNum: 13,
        madeCut: true,
        points: calcPoints(13), // 71
        preConfidenceJack: 75,
        preConfidenceAbe: 85,
        verdict: "great" as const,
        note: "Strong T13 finish. Best pick on Abe's roster by far.",
      },
      {
        name: "Straka, Sepp",
        tier: "C",
        position: "T8",
        positionNum: 8,
        madeCut: true,
        points: calcPoints(8), // 76
        preConfidenceJack: 45,
        preConfidenceAbe: 80,
        verdict: "great" as const,
        note: "Excellent T8 finish. The contrarian angle paid off here.",
      },
      {
        name: "Hojgaard, Nicolai",
        tier: "D",
        position: "T27",
        positionNum: 27,
        madeCut: true,
        points: calcPoints(27), // 57
        preConfidenceJack: 40,
        preConfidenceAbe: 60,
        verdict: "ok" as const,
        note: "Made the cut but middling finish. Not bad, not great.",
      },
      {
        name: "Conners, Corey",
        tier: "E",
        position: "T13",
        positionNum: 13,
        madeCut: true,
        points: calcPoints(13), // 71
        preConfidenceJack: 30,
        preConfidenceAbe: 55,
        verdict: "great" as const,
        note: "T13 from Tier E is a solid return. One of the better mid-tier picks.",
      },
      {
        name: "Castillo, Ricky",
        tier: "F",
        position: "T70",
        positionNum: 70,
        madeCut: true,
        points: calcPoints(70), // 14
        preConfidenceJack: 35,
        preConfidenceAbe: 88,
        verdict: "bad" as const,
        note: "Barely made the cut, finished near last. High confidence was misplaced.",
      },
      {
        name: "Hoge, Tom",
        tier: "G",
        position: "MC",
        positionNum: null,
        madeCut: false,
        points: 0,
        preConfidenceJack: 30,
        preConfidenceAbe: 55,
        verdict: "bad" as const,
        note: "Missed the cut. Zero points from Tier G hurts the total.",
      },
    ] as GolferResult[],
  },

  // Key insights
  insights: {
    whatWorked: [
      "Jack's mid/low tier picks crushed it — Bridgeman (T5), Rose (T13), Hisatsune (T13), Rodgers (T11) all delivered huge points from Tiers C-G.",
      "The chalk strategy worked: 6 of Jack's 7 picks made the cut, providing a solid floor.",
      "Abe's Bhatia (T13), Straka (T8), and Conners (T13) showed the contrarian approach can find value.",
    ],
    whatDidnt: [
      "Jack's Coody missed the cut — the one bad pick cost ~60+ potential points.",
      "Abe's Tier A pick (Si Woo Kim, T50) was a disaster. Contrarian in Tier A is high-risk and it didn't pay off.",
      "Abe's Castillo (T70) and Hoge (MC) combined for just 14 points from Tiers F-G.",
      "The 90-point gap between Jack and Abe shows chalk >> contrarian this particular week.",
    ],
    takeaways: [
      "Jack's 15th place (top 3%) validates the chalk/floor approach for cumulative standings.",
      "For the Masters, Abe should consider a less extreme contrarian approach in Tier A — the floor matters.",
      "Mid-tier picks (C-F) are where the real differentiation happens. Both teams got good value there.",
      "One missed cut can tank an entire entry. Prioritize cut probability, especially in lower tiers.",
    ],
  },
};

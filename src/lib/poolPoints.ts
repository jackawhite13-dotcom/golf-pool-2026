import type { LeaderboardPlayer } from "@/app/api/leaderboard/route";

// ── Types ──────────────────────────────────────────────────────────────

export interface Entry {
  rank: number;
  team: string;
  owner: string;
  points: number; // from Buzz (for reference/validation)
  golfers: string[];
}

export interface ScoredEntry extends Entry {
  calculatedPoints: number;
  calculatedRank: number;
  golferPoints: { name: string; points: number; position: string; matched: boolean }[];
}

// ── Normalize for matching ─────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .replace(/ø/g, "o").replace(/Ø/g, "O")
    .replace(/æ/g, "ae").replace(/Æ/g, "AE")
    .replace(/ð/g, "d").replace(/Ð/g, "D")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.\-']/g, "")
    .trim();
}

// ── Parse position string to number ────────────────────────────────────

function positionNumber(pos: string): number | null {
  if (!pos || pos === "--" || pos === "MC" || pos === "WD" || pos === "DQ") return null;
  const num = parseInt(pos.replace("T", ""), 10);
  return isNaN(num) ? null : num;
}

// ── Calculate projected cut line ────────────────────────────────────────
// The Players Championship: top 65 and ties make the cut after 36 holes.

const CUT_LINE_TOP = 65; // top 65 and ties

function calculateProjectedCutLine(
  players: LeaderboardPlayer[]
): { projectedCutScore: number | null; projectedMadeCut: Set<string> } {
  // Get all active players with a score
  const withScores = players
    .filter((p) => p.status !== "wd" && p.scoreToPar !== null)
    .sort((a, b) => (a.scoreToPar ?? 999) - (b.scoreToPar ?? 999));

  if (withScores.length === 0) {
    return { projectedCutScore: null, projectedMadeCut: new Set() };
  }

  // The 65th player's score is the cut line (ties included)
  const cutIndex = Math.min(CUT_LINE_TOP - 1, withScores.length - 1);
  const cutScore = withScores[cutIndex].scoreToPar!;

  // Everyone at or below (better than) the cut score makes it
  const madeCut = new Set<string>();
  for (const p of withScores) {
    if (p.scoreToPar !== null && p.scoreToPar <= cutScore) {
      madeCut.add(normalize(p.name));
    }
  }

  return { projectedCutScore: cutScore, projectedMadeCut: madeCut };
}

// ── Calculate pool points from leaderboard ─────────────────────────────

export function calculatePoolPoints(
  players: LeaderboardPlayer[]
): {
  pointsMap: Map<string, number>;
  positionMap: Map<string, string>;
  madeCutCount: number;
  cutHasHappened: boolean;
  projectedCutScore: number | null;
} {
  const cutHasHappened = players.some((p) => p.status === "cut");

  // If cut has officially happened, use ESPN status
  // If not, use projected cut line (top 65 and ties)
  const { projectedCutScore, projectedMadeCut } = cutHasHappened
    ? { projectedCutScore: null, projectedMadeCut: new Set<string>() }
    : calculateProjectedCutLine(players);

  // Count players who made the cut
  let madeCutCount: number;
  if (cutHasHappened) {
    madeCutCount = players.filter(
      (p) => p.status !== "cut" && p.status !== "wd"
    ).length;
  } else {
    // Use projected cut: count how many are inside the cut line
    madeCutCount = projectedMadeCut.size;
  }

  const pointsMap = new Map<string, number>();
  const positionMap = new Map<string, string>();

  for (const player of players) {
    const key = normalize(player.name);
    positionMap.set(key, player.position);

    // Officially cut or withdrawn
    if (player.status === "cut" || player.status === "wd") {
      pointsMap.set(key, 0);
      continue;
    }

    // Pre-cut: check if player is projected to miss the cut
    if (!cutHasHappened && !projectedMadeCut.has(key)) {
      pointsMap.set(key, 0);
      continue;
    }

    const pos = positionNumber(player.position);
    if (pos === null) {
      pointsMap.set(key, 0);
      continue;
    }

    // Points = madeCutCount - position + 1 (floor at 0)
    const pts = Math.max(0, madeCutCount - pos + 1);
    pointsMap.set(key, pts);
  }

  return { pointsMap, positionMap, madeCutCount, cutHasHappened, projectedCutScore };
}

// ── Match entry golfer name to leaderboard ─────────────────────────────

function matchGolferToPoints(
  golferName: string,
  pointsMap: Map<string, number>,
  positionMap: Map<string, string>
): { points: number; position: string; matched: boolean } {
  const key = normalize(golferName);

  // Direct match
  if (pointsMap.has(key)) {
    return { points: pointsMap.get(key)!, position: positionMap.get(key) || "--", matched: true };
  }

  // Try last name match
  const parts = golferName.split(" ");
  const lastName = normalize(parts[parts.length - 1]);
  const firstName = parts.length > 1 ? normalize(parts.slice(0, -1).join(" ")) : "";

  for (const [mapKey, pts] of pointsMap) {
    if (mapKey.includes(lastName)) {
      if (firstName && mapKey.includes(firstName)) {
        return { points: pts, position: positionMap.get(mapKey) || "--", matched: true };
      }
      // Single last name match
      const otherMatches = [...pointsMap.keys()].filter((k) => k.includes(lastName));
      if (otherMatches.length === 1) {
        return { points: pts, position: positionMap.get(mapKey) || "--", matched: true };
      }
    }
  }

  // Broader search: check if any key contains the full normalized name
  for (const [mapKey, pts] of pointsMap) {
    if (mapKey.includes(key) || key.includes(mapKey)) {
      return { points: pts, position: positionMap.get(mapKey) || "--", matched: true };
    }
  }

  return { points: 0, position: "--", matched: false };
}

// ── Score all entries ──────────────────────────────────────────────────

export function scoreEntries(
  entries: Entry[],
  pointsMap: Map<string, number>,
  positionMap: Map<string, string>
): ScoredEntry[] {
  const scored: ScoredEntry[] = entries.map((entry) => {
    const golferPoints = entry.golfers.map((name) => {
      const result = matchGolferToPoints(name, pointsMap, positionMap);
      return { name, ...result };
    });

    return {
      ...entry,
      calculatedPoints: entry.points,
      calculatedRank: 0,
      golferPoints,
    };
  });

  // Sort by points descending
  scored.sort((a, b) => b.calculatedPoints - a.calculatedPoints);

  // Assign ranks with ties
  let currentRank = 1;
  for (let i = 0; i < scored.length; i++) {
    if (i > 0 && scored[i].calculatedPoints < scored[i - 1].calculatedPoints) {
      currentRank = i + 1;
    }
    scored[i].calculatedRank = currentRank;
  }

  return scored;
}

// ── Find overlap between target entry and top entries ──────────────────

export interface GolferOverlap {
  golferName: string;
  count: number; // how many of the top N share this golfer
  topTeams: string[]; // which top teams have this golfer
}

export function findOverlap(
  targetEntry: ScoredEntry,
  topEntries: ScoredEntry[],
  topN: number = 20
): GolferOverlap[] {
  const top = topEntries.slice(0, topN);
  const targetGolfers = new Set(targetEntry.golfers.map(normalize));

  const overlapMap = new Map<string, { count: number; teams: string[] }>();

  for (const golfer of targetEntry.golfers) {
    const normGolfer = normalize(golfer);
    overlapMap.set(golfer, { count: 0, teams: [] });

    for (const entry of top) {
      if (entry.team === targetEntry.team) continue;
      const entryGolfers = entry.golfers.map(normalize);
      if (entryGolfers.some((eg) => eg === normGolfer)) {
        const current = overlapMap.get(golfer)!;
        current.count++;
        current.teams.push(entry.team);
      }
    }
  }

  return targetEntry.golfers.map((golfer) => ({
    golferName: golfer,
    count: overlapMap.get(golfer)?.count || 0,
    topTeams: overlapMap.get(golfer)?.teams || [],
  }));
}

// ── Scenario analysis: compare two entries ─────────────────────────────

export interface ScenarioGolfer {
  name: string;
  currentPoints: number;
  currentPosition: string;
  isShared: boolean;
}

export interface ScenarioComparison {
  yourEntry: ScoredEntry;
  targetEntry: ScoredEntry;
  pointGap: number;
  sharedGolfers: { name: string; points: number; position: string }[];
  yourUniqueGolfers: ScenarioGolfer[];
  theirUniqueGolfers: ScenarioGolfer[];
  sharedPoints: number;
  yourUniquePoints: number;
  theirUniquePoints: number;
  uniqueGap: number; // gap from unique golfers only (this is what matters)
}

export function buildScenario(
  yourEntry: ScoredEntry,
  targetEntry: ScoredEntry
): ScenarioComparison {
  const yourNorm = new Map(yourEntry.golferPoints.map((g) => [normalize(g.name), g]));
  const theirNorm = new Map(targetEntry.golferPoints.map((g) => [normalize(g.name), g]));

  const sharedGolfers: { name: string; points: number; position: string }[] = [];
  const yourUniqueGolfers: ScenarioGolfer[] = [];
  const theirUniqueGolfers: ScenarioGolfer[] = [];

  // Find shared and unique
  for (const [key, golfer] of yourNorm) {
    if (theirNorm.has(key)) {
      sharedGolfers.push({ name: golfer.name, points: golfer.points, position: golfer.position });
    } else {
      yourUniqueGolfers.push({
        name: golfer.name,
        currentPoints: golfer.points,
        currentPosition: golfer.position,
        isShared: false,
      });
    }
  }

  for (const [key, golfer] of theirNorm) {
    if (!yourNorm.has(key)) {
      theirUniqueGolfers.push({
        name: golfer.name,
        currentPoints: golfer.points,
        currentPosition: golfer.position,
        isShared: false,
      });
    }
  }

  const sharedPoints = sharedGolfers.reduce((s, g) => s + g.points, 0);
  const yourUniquePoints = yourUniqueGolfers.reduce((s, g) => s + g.currentPoints, 0);
  const theirUniquePoints = theirUniqueGolfers.reduce((s, g) => s + g.currentPoints, 0);

  return {
    yourEntry,
    targetEntry,
    pointGap: targetEntry.calculatedPoints - yourEntry.calculatedPoints,
    sharedGolfers,
    yourUniqueGolfers,
    theirUniqueGolfers,
    sharedPoints,
    yourUniquePoints,
    theirUniquePoints,
    uniqueGap: theirUniquePoints - yourUniquePoints, // positive = you're behind
  };
}

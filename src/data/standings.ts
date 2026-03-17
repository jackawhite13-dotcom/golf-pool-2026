// Post-Players Championship standings (from Buzz, March 16 2026)
// Cumulative standings use a uniform 75-point scale.
// Players: 73 made cut → 1st = 83 base pts → factor = 75/83 ≈ 0.9036

export interface StandingEntry {
  rank: number;
  team: string;
  owner: string;
  rawPoints: number;        // original tournament points
  normalizedPoints: number; // cumulative points on 75-pt scale
}

// Players normalization: 75/83 ≈ 0.903614
const PLAYERS_NORM = 75 / 83;
function norm(raw: number): number {
  return Math.round(raw * PLAYERS_NORM);
}

export const STANDINGS_AFTER_PLAYERS = {
  totalEntries: 559,
  tournament: "The Players Championship" as const,
  tournamentsCompleted: 1,
  normalizationFactor: PLAYERS_NORM,

  jack: { rank: 15, team: "team jaw", owner: "Jack White", rawPoints: 413, normalizedPoints: norm(413) } as StandingEntry,
  abe: { rank: 112, team: "Watman", owner: "Abraham Watman", rawPoints: 323, normalizedPoints: norm(323) } as StandingEntry,
  leader: { rank: 1, team: "Kalaka", owner: "Kyle Kalaka", rawPoints: 509, normalizedPoints: norm(509) } as StandingEntry,

  top20: [
    { rank: 1, team: "Kalaka", owner: "Kyle Kalaka", rawPoints: 509, normalizedPoints: norm(509) },
    { rank: 2, team: "Steven Zucker 3", owner: "Steven Zucker", rawPoints: 484, normalizedPoints: norm(484) },
    { rank: 3, team: "Bogey Boys", owner: "N R", rawPoints: 477, normalizedPoints: norm(477) },
    { rank: 4, team: "BFitz1", owner: "Brendan Fitzgerald", rawPoints: 440, normalizedPoints: norm(440) },
    { rank: 5, team: "Fols24", owner: "Christopher Foley", rawPoints: 429, normalizedPoints: norm(429) },
    { rank: 5, team: "Corey Conners fan club", owner: "Eric Adelsheimer", rawPoints: 429, normalizedPoints: norm(429) },
    { rank: 7, team: "Frank S1", owner: "Frank Schray", rawPoints: 427, normalizedPoints: norm(427) },
    { rank: 8, team: "Juniorisimo", owner: "Benny N", rawPoints: 426, normalizedPoints: norm(426) },
    { rank: 9, team: "Los Whaledos", owner: "Moises Doron", rawPoints: 422, normalizedPoints: norm(422) },
    { rank: 10, team: "RKJG", owner: "Ross Konesky", rawPoints: 421, normalizedPoints: norm(421) },
    { rank: 11, team: "Mike Crispy Jr", owner: "Michael Crispiano Jr", rawPoints: 419, normalizedPoints: norm(419) },
    { rank: 12, team: "Albert Leshinsky - 3", owner: "Albert Leshinsky", rawPoints: 416, normalizedPoints: norm(416) },
    { rank: 13, team: "Sam B", owner: "Sam B", rawPoints: 415, normalizedPoints: norm(415) },
    { rank: 13, team: "AKM", owner: "Adam Milton", rawPoints: 415, normalizedPoints: norm(415) },
    { rank: 15, team: "Laxkev22", owner: "Kevin Simon", rawPoints: 413, normalizedPoints: norm(413) },
    { rank: 15, team: "team jaw", owner: "Jack White", rawPoints: 413, normalizedPoints: norm(413) },
    { rank: 17, team: "Nick Power", owner: "Nicholas R Power", rawPoints: 407, normalizedPoints: norm(407) },
    { rank: 18, team: "Dante Pachukis", owner: "Sam Markin", rawPoints: 403, normalizedPoints: norm(403) },
    { rank: 18, team: "Martin Blackburn", owner: "Martin Blackburn", rawPoints: 403, normalizedPoints: norm(403) },
    { rank: 20, team: "Olllbuckellis", owner: "joey metz", rawPoints: 401, normalizedPoints: norm(401) },
  ] as StandingEntry[],
};

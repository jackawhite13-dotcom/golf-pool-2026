// Post-Players Championship standings (from Buzz, March 16 2026)

export interface StandingEntry {
  rank: number;
  team: string;
  owner: string;
  points: number;
}

export const STANDINGS_AFTER_PLAYERS = {
  totalEntries: 559,
  tournament: "The Players Championship" as const,
  tournamentsCompleted: 1,

  jack: { rank: 15, team: "team jaw", owner: "Jack White", points: 413 } as StandingEntry,
  abe: { rank: 112, team: "Watman", owner: "Abraham Watman", points: 323 } as StandingEntry,
  leader: { rank: 1, team: "Kalaka", owner: "Kyle Kalaka", points: 509 } as StandingEntry,

  top20: [
    { rank: 1, team: "Kalaka", owner: "Kyle Kalaka", points: 509 },
    { rank: 2, team: "Steven Zucker 3", owner: "Steven Zucker", points: 484 },
    { rank: 3, team: "Bogey Boys", owner: "N R", points: 477 },
    { rank: 4, team: "BFitz1", owner: "Brendan Fitzgerald", points: 440 },
    { rank: 5, team: "Fols24", owner: "Christopher Foley", points: 429 },
    { rank: 5, team: "Corey Conners fan club", owner: "Eric Adelsheimer", points: 429 },
    { rank: 7, team: "Frank S1", owner: "Frank Schray", points: 427 },
    { rank: 8, team: "Juniorisimo", owner: "Benny N", points: 426 },
    { rank: 9, team: "Los Whaledos", owner: "Moises Doron", points: 422 },
    { rank: 10, team: "RKJG", owner: "Ross Konesky", points: 421 },
    { rank: 11, team: "Mike Crispy Jr", owner: "Michael Crispiano Jr", points: 419 },
    { rank: 12, team: "Albert Leshinsky - 3", owner: "Albert Leshinsky", points: 416 },
    { rank: 13, team: "Sam B", owner: "Sam B", points: 415 },
    { rank: 13, team: "AKM", owner: "Adam Milton", points: 415 },
    { rank: 15, team: "Laxkev22", owner: "Kevin Simon", points: 413 },
    { rank: 15, team: "team jaw", owner: "Jack White", points: 413 },
    { rank: 17, team: "Nick Power", owner: "Nicholas R Power", points: 407 },
    { rank: 18, team: "Dante Pachukis", owner: "Sam Markin", points: 403 },
    { rank: 18, team: "Martin Blackburn", owner: "Martin Blackburn", points: 403 },
    { rank: 20, team: "Olllbuckellis", owner: "joey metz", points: 401 },
  ] as StandingEntry[],
};

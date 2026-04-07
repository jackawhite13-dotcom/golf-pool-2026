export interface Golfer {
  name: string;
  owgr: number | null;
  events: number;
  cutsMade: number;
  wins: number;
  seconds: number;
  thirds: number;
  top10: number;
  top25: number;
  earnings: string;
}

export interface Tier {
  tier: number;
  label: string;
  oddsRange: string;
  golfers: Golfer[];
}

/* ------------------------------------------------------------------ */
/*  THE MASTERS 2026 — Augusta National field by pool tier             */
/*  Updated April 7, 2026                                              */
/* ------------------------------------------------------------------ */

export const tiers: Tier[] = [
  {
    tier: 1,
    label: "Tier A",
    oddsRange: "Top 10 favorites",
    golfers: [
      { name: "Aberg, Ludvig", owgr: 17, events: 7, cutsMade: 5, wins: 0, seconds: 0, thirds: 1, top10: 3, top25: 4, earnings: "$2,841,400" },
      { name: "DeChambeau, Bryson", owgr: 24, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Fitzpatrick, Matt", owgr: 6, events: 7, cutsMade: 7, wins: 1, seconds: 1, thirds: 0, top10: 3, top25: 5, earnings: "$5,262,488" },
      { name: "Fleetwood, Tommy", owgr: 4, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 4, top25: 4, earnings: "$2,505,600" },
      { name: "Matsuyama, Hideki", owgr: 14, events: 8, cutsMade: 8, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 5, earnings: "$2,406,271" },
      { name: "McIlroy, Rory", owgr: 2, events: 4, cutsMade: 4, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 2, earnings: "$2,214,875" },
      { name: "Rahm, Jon", owgr: 30, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Schauffele, Xander", owgr: 10, events: 7, cutsMade: 6, wins: 0, seconds: 0, thirds: 1, top10: 3, top25: 5, earnings: "$3,137,238" },
      { name: "Scheffler, Scottie", owgr: 1, events: 6, cutsMade: 6, wins: 1, seconds: 0, thirds: 1, top10: 3, top25: 6, earnings: "$3,816,430" },
      { name: "Young, Cameron", owgr: 3, events: 6, cutsMade: 6, wins: 1, seconds: 0, thirds: 1, top10: 3, top25: 4, earnings: "$0" },
    ],
  },
  {
    tier: 2,
    label: "Tier B",
    oddsRange: "Next 10",
    golfers: [
      { name: "Gotterup, Chris", owgr: 11, events: 8, cutsMade: 7, wins: 2, seconds: 0, thirds: 0, top10: 3, top25: 5, earnings: "$4,218,363" },
      { name: "Henley, Russell", owgr: 12, events: 7, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 5, earnings: "$1,708,567" },
      { name: "Hovland, Viktor", owgr: 22, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,142,378" },
      { name: "Koepka, Brooks", owgr: 169, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$791,494" },
      { name: "Lee, Min Woo", owgr: 25, events: 7, cutsMade: 7, wins: 0, seconds: 1, thirds: 1, top10: 3, top25: 4, earnings: "$3,691,399" },
      { name: "MacIntyre, Robert", owgr: 8, events: 7, cutsMade: 7, wins: 0, seconds: 1, thirds: 0, top10: 3, top25: 5, earnings: "$2,910,008" },
      { name: "Morikawa, Collin", owgr: 7, events: 6, cutsMade: 4, wins: 1, seconds: 0, thirds: 0, top10: 3, top25: 3, earnings: "$5,065,472" },
      { name: "Reed, Patrick", owgr: 23, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Rose, Justin", owgr: 9, events: 6, cutsMade: 3, wins: 1, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$2,215,403" },
      { name: "Spieth, Jordan", owgr: 61, events: 8, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 4, earnings: "$1,466,864" },
    ],
  },
  {
    tier: 3,
    label: "Tier C",
    oddsRange: "Top 30",
    golfers: [
      { name: "Bhatia, Akshay", owgr: 21, events: 7, cutsMade: 5, wins: 1, seconds: 0, thirds: 1, top10: 3, top25: 5, earnings: "$5,857,708" },
      { name: "Burns, Sam", owgr: 33, events: 7, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,253,471" },
      { name: "Cantlay, Patrick", owgr: 35, events: 7, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,009,403" },
      { name: "Day, Jason", owgr: 41, events: 7, cutsMade: 5, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 3, earnings: "$1,199,398" },
      { name: "Kim, Si Woo", owgr: 28, events: 9, cutsMade: 9, wins: 0, seconds: 1, thirds: 1, top10: 4, top25: 6, earnings: "$2,546,688" },
      { name: "Knapp, Jake", owgr: 42, events: 7, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 5, top25: 6, earnings: "$2,489,463" },
      { name: "Lowry, Shane", owgr: 32, events: 6, cutsMade: 4, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 3, earnings: "$1,479,275" },
      { name: "Scott, Adam", owgr: 53, events: 7, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$1,816,747" },
      { name: "Spaun, J.J.", owgr: 5, events: 8, cutsMade: 4, wins: 1, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$2,073,772" },
      { name: "Thomas, Justin", owgr: 15, events: 3, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$0" },
    ],
  },
  {
    tier: 4,
    label: "Tier D",
    oddsRange: "Mid pack",
    golfers: [
      { name: "Berger, Daniel", owgr: 38, events: 8, cutsMade: 7, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 3, earnings: "$2,809,480" },
      { name: "Bridgeman, Jacob", owgr: 18, events: 8, cutsMade: 8, wins: 1, seconds: 0, thirds: 0, top10: 4, top25: 8, earnings: "$6,564,485" },
      { name: "Conners, Corey", owgr: 44, events: 7, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 3, earnings: "$878,653" },
      { name: "English, Harris", owgr: 20, events: 8, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 5, earnings: "$853,532" },
      { name: "Hatton, Tyrrell", owgr: 31, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Hojgaard, Nicolai", owgr: 36, events: 7, cutsMade: 7, wins: 0, seconds: 1, thirds: 1, top10: 3, top25: 5, earnings: "$2,291,827" },
      { name: "Kitayama, Kurt", owgr: 34, events: 8, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 3, earnings: "$2,245,971" },
      { name: "McNealy, Maverick", owgr: 27, events: 8, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 5, earnings: "$1,244,275" },
      { name: "Straka, Sepp", owgr: 13, events: 7, cutsMade: 5, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$3,038,670" },
      { name: "Woodland, Gary", owgr: 52, events: 8, cutsMade: 4, wins: 1, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$0" },
    ],
  },
  {
    tier: 5,
    label: "Tier E",
    oddsRange: "Form plays",
    golfers: [
      { name: "Bradley, Keegan", owgr: 26, events: 7, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$238,204" },
      { name: "Gerard, Ryan", owgr: 29, events: 9, cutsMade: 7, wins: 0, seconds: 2, thirds: 0, top10: 2, top25: 4, earnings: "$2,251,179" },
      { name: "Griffin, Ben", owgr: 16, events: 9, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$472,208" },
      { name: "Hall, Harry", owgr: 62, events: 8, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 4, earnings: "$1,168,150" },
      { name: "Hojgaard, Rasmus", owgr: 57, events: 8, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$494,257" },
      { name: "Homa, Max", owgr: 163, events: 8, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$481,170" },
      { name: "Im, Sungjae", owgr: 71, events: 4, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$404,837" },
      { name: "Noren, Alex", owgr: 19, events: 7, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$885,475" },
      { name: "Penge, Marco", owgr: 37, events: 8, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$834,008" },
      { name: "Smith, Cameron", owgr: 222, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
    ],
  },
  {
    tier: 6,
    label: "Tier F",
    oddsRange: "Sleepers",
    golfers: [
      { name: "Clark, Wyndham", owgr: 78, events: 8, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$445,892" },
      { name: "Fox, Ryan", owgr: 51, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$1,004,520" },
      { name: "Garcia, Sergio", owgr: 345, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Greyserman, Max", owgr: 59, events: 8, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$538,509" },
      { name: "Harman, Brian", owgr: 50, events: 8, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$1,002,488" },
      { name: "Kim, Michael", owgr: 43, events: 9, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 2, earnings: "$1,108,293" },
      { name: "Rai, Aaron", owgr: 39, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$270,129" },
      { name: "Reitan, Kristoffer", owgr: 46, events: 8, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$512,760" },
      { name: "Stevens, Sam", owgr: 45, events: 9, cutsMade: 8, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 3, earnings: "$1,299,128" },
      { name: "Taylor, Nick", owgr: 67, events: 9, cutsMade: 8, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$0" },
    ],
  },
  {
    tier: 7,
    label: "Tier G",
    oddsRange: "Longshots, past champs & amateurs",
    golfers: [
      { name: "Brennan, Michael", owgr: null, events: 9, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$207,495" },
      { name: "Cabrera, Angel", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Campbell, Brian", owgr: 112, events: 9, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$54,522" },
      { name: "Couples, Fred", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Echavarria, Nico", owgr: 40, events: 9, cutsMade: 4, wins: 1, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$2,361,750" },
      { name: "Fang, Ethan", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Herrington, Jackson", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Holtz, Brandon", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Howell, Mason", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Jarvis, Casey", owgr: 70, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Johnson, Dustin", owgr: 593, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Johnson, Zach", owgr: 321, events: 2, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$38,697" },
      { name: "Kataoka, Naoyuki", owgr: 372, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Keefer, John", owgr: 64, events: 9, cutsMade: 5, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 1, earnings: "$727,291" },
      { name: "Laopakdee, FIfa", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Li, HaoTong", owgr: 84, events: 9, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$519,475" },
      { name: "McCarty, Matt", owgr: 49, events: 10, cutsMade: 7, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 3, earnings: "$1,096,472" },
      { name: "McKibbin, Tom", owgr: 105, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Neergaard-Petersen, Rasmus", owgr: 69, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$118,852" },
      { name: "Novak, Andrew", owgr: 48, events: 9, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$677,757" },
      { name: "Olazabal, Jose Maria", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Ortiz, Carlos", owgr: 161, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Potgieter, Aldrich", owgr: 77, events: 8, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$974,775" },
      { name: "Pulcini, Mateo", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Riley, Davis", owgr: 120, events: 9, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$344,468" },
      { name: "Schwartzel, Charl", owgr: 566, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Singh, Vijay", owgr: null, events: 1, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$31,522" },
      { name: "Valimaki, Sami", owgr: 56, events: 8, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$389,580" },
      { name: "Watson, Bubba", owgr: 702, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Weir, Mike", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Willett, Danny", owgr: 400, events: 4, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$37,300" },
    ],
  },
];

// Normalization: cumulative standings use a uniform 75-point scale.
// Each tournament's scores are multiplied by 75 / rawFirstPlace,
// where rawFirstPlace = madeCut + 10 (the base 1st-place points before bonus).
export const NORMALIZATION_TARGET = 75;

export function getNormalizationFactor(tournament: typeof tournaments[number]): number | null {
  if (tournament.madeCut === null) return null;
  const rawFirstPlace = tournament.madeCut + 10;
  return NORMALIZATION_TARGET / rawFirstPlace;
}

export const tournaments = [
  { name: "The Players Championship", location: "TPC Sawgrass", dates: "Mar 12–15", status: "completed" as const, cutLine: 65, madeCut: 73 },
  { name: "The Masters", location: "Augusta National", dates: "Apr 9–12", status: "upcoming" as const, cutLine: 50, madeCut: null },
  { name: "PGA Championship", location: "Quail Hollow", dates: "May 14–17", status: "locked" as const, cutLine: 65, madeCut: null },
  { name: "U.S. Open", location: "Oakmont", dates: "Jun 18–21", status: "locked" as const, cutLine: 60, madeCut: null },
  { name: "The Open Championship", location: "Royal Portrush", dates: "Jul 16–19", status: "locked" as const, cutLine: 70, madeCut: null },
];

/* ------------------------------------------------------------------ */
/*  Parse tournament date ranges and determine current tournament      */
/* ------------------------------------------------------------------ */

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDateRange(dates: string): { start: Date; end: Date } {
  // Format: "Mar 12–15" or "Mar 12-15"
  const match = dates.match(/^(\w{3})\s+(\d+)[–-](\d+)$/);
  if (!match) throw new Error(`Cannot parse date range: ${dates}`);
  const month = MONTH_MAP[match[1]];
  const startDay = parseInt(match[2], 10);
  const endDay = parseInt(match[3], 10);
  return {
    start: new Date(2026, month, startDay),
    end: new Date(2026, month, endDay, 23, 59, 59),
  };
}

export interface CurrentTournament {
  name: string;
  location: string;
  dates: string;
  status: string;
  index: number;
  isCurrent: boolean;
  roundInfo: string;
}

export function getCurrentTournament(): CurrentTournament {
  const now = new Date();

  for (let i = 0; i < tournaments.length; i++) {
    const t = tournaments[i];
    const { start, end } = parseDateRange(t.dates);
    // 1-day buffer after end for results
    const bufferEnd = new Date(end.getTime() + 24 * 60 * 60 * 1000);

    if (now >= start && now <= bufferEnd) {
      // We're during this tournament (or 1 day after)
      let roundInfo: string;
      if (now > end) {
        roundInfo = "Completed";
      } else {
        const dayOfTournament = Math.floor(
          (now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1;
        if (dayOfTournament >= 1 && dayOfTournament <= 4) {
          roundInfo = `Round ${dayOfTournament}`;
        } else {
          roundInfo = "In Progress";
        }
      }
      return { ...t, index: i, isCurrent: true, roundInfo };
    }

    if (now < start) {
      // Next upcoming tournament
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const roundInfo = `Starts ${monthNames[start.getMonth()]} ${start.getDate()}`;
      return { ...t, index: i, isCurrent: false, roundInfo };
    }
  }

  // All tournaments are over
  const last = tournaments[tournaments.length - 1];
  return { ...last, index: tournaments.length - 1, isCurrent: false, roundInfo: "Season Complete" };
}

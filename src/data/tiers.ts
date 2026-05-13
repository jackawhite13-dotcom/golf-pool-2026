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
/*  PGA CHAMPIONSHIP 2026 — Aronimink Golf Club field by pool tier     */
/*  Updated May 13, 2026 (eve of round 1)                              */
/* ------------------------------------------------------------------ */

export const tiers: Tier[] = [
  {
    tier: 1,
    label: "Tier A",
    oddsRange: "Top 10 favorites",
    golfers: [
      { name: "Aberg, Ludvig", owgr: 15, events: 10, cutsMade: 8, wins: 0, seconds: 0, thirds: 1, top10: 5, top25: 7, earnings: "$4,516,733" },
      { name: "DeChambeau, Bryson", owgr: 28, events: 1, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Fitzpatrick, Matt", owgr: 4, events: 11, cutsMade: 11, wins: 3, seconds: 1, thirds: 0, top10: 5, top25: 8, earnings: "$10,595,426" },
      { name: "Fleetwood, Tommy", owgr: 6, events: 9, cutsMade: 9, wins: 0, seconds: 0, thirds: 0, top10: 5, top25: 6, earnings: "$3,567,743" },
      { name: "McIlroy, Rory", owgr: 2, events: 6, cutsMade: 6, wins: 1, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$6,956,975" },
      { name: "Morikawa, Collin", owgr: 5, events: 9, cutsMade: 7, wins: 1, seconds: 0, thirds: 0, top10: 5, top25: 5, earnings: "$6,655,930" },
      { name: "Rahm, Jon", owgr: 20, events: 1, cutsMade: 1, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$101,250" },
      { name: "Schauffele, Xander", owgr: 11, events: 10, cutsMade: 9, wins: 0, seconds: 0, thirds: 1, top10: 4, top25: 7, earnings: "$4,208,988" },
      { name: "Scheffler, Scottie", owgr: 1, events: 9, cutsMade: 9, wins: 1, seconds: 3, thirds: 1, top10: 6, top25: 9, earnings: "$10,566,430" },
      { name: "Young, Cameron", owgr: 3, events: 8, cutsMade: 7, wins: 1, seconds: 0, thirds: 1, top10: 4, top25: 6, earnings: "$5,200,000" },
    ],
  },
  {
    tier: 2,
    label: "Tier B",
    oddsRange: "Next 10",
    golfers: [
      { name: "Cantlay, Patrick", owgr: 30, events: 10, cutsMade: 8, wins: 0, seconds: 0, thirds: 0, top10: 3, top25: 6, earnings: "$2,491,903" },
      { name: "Hatton, Tyrrell", owgr: 26, events: 1, cutsMade: 1, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 1, earnings: "$1,080,000" },
      { name: "Henley, Russell", owgr: 9, events: 10, cutsMade: 8, wins: 0, seconds: 0, thirds: 1, top10: 3, top25: 7, earnings: "$2,979,817" },
      { name: "Hovland, Viktor", owgr: 27, events: 10, cutsMade: 9, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$1,699,277" },
      { name: "Kim, Si Woo", owgr: 22, events: 13, cutsMade: 13, wins: 0, seconds: 1, thirds: 2, top10: 6, top25: 8, earnings: "$4,838,865" },
      { name: "Koepka, Brooks", owgr: 125, events: 9, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 5, earnings: "$1,315,994" },
      { name: "MacIntyre, Robert", owgr: 12, events: 10, cutsMade: 9, wins: 0, seconds: 1, thirds: 0, top10: 3, top25: 5, earnings: "$3,007,808" },
      { name: "Rose, Justin", owgr: 7, events: 9, cutsMade: 6, wins: 1, seconds: 0, thirds: 1, top10: 2, top25: 3, earnings: "$3,394,486" },
      { name: "Spieth, Jordan", owgr: 51, events: 12, cutsMade: 11, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 6, earnings: "$2,292,596" },
      { name: "Thomas, Justin", owgr: 16, events: 8, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$2,400,000" },
    ],
  },
  {
    tier: 3,
    label: "Tier C",
    oddsRange: "Top 30",
    golfers: [
      { name: "Burns, Sam", owgr: 35, events: 11, cutsMade: 8, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 5, earnings: "$2,390,160" },
      { name: "Fowler, Rickie", owgr: 37, events: 11, cutsMade: 9, wins: 0, seconds: 1, thirds: 0, top10: 4, top25: 7, earnings: "$4,096,077" },
      { name: "Gotterup, Chris", owgr: 10, events: 12, cutsMade: 11, wins: 2, seconds: 0, thirds: 0, top10: 3, top25: 8, earnings: "$4,975,545" },
      { name: "Griffin, Ben", owgr: 14, events: 14, cutsMade: 11, wins: 0, seconds: 0, thirds: 1, top10: 2, top25: 4, earnings: "$2,199,898" },
      { name: "Lee, Min Woo", owgr: 31, events: 11, cutsMade: 10, wins: 0, seconds: 1, thirds: 1, top10: 3, top25: 6, earnings: "$4,348,499" },
      { name: "Lowry, Shane", owgr: 38, events: 10, cutsMade: 7, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$1,847,968" },
      { name: "Matsuyama, Hideki", owgr: 17, events: 11, cutsMade: 11, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 6, earnings: "$2,916,771" },
      { name: "Reed, Patrick", owgr: 24, events: 1, cutsMade: 1, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$427,500" },
      { name: "Scott, Adam", owgr: 46, events: 10, cutsMade: 10, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 7, earnings: "$2,982,307" },
      { name: "Straka, Sepp", owgr: 13, events: 10, cutsMade: 9, wins: 0, seconds: 1, thirds: 0, top10: 3, top25: 6, earnings: "$3,800,000" },
    ],
  },
  {
    tier: 4,
    label: "Tier D",
    oddsRange: "Mid pack",
    golfers: [
      { name: "Bhatia, Akshay", owgr: 23, events: 11, cutsMade: 8, wins: 1, seconds: 0, thirds: 1, top10: 3, top25: 7, earnings: "$6,363,733" },
      { name: "Day, Jason", owgr: 41, events: 11, cutsMade: 9, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$1,793,380" },
      { name: "English, Harris", owgr: 21, events: 12, cutsMade: 11, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 7, earnings: "$2,024,258" },
      { name: "Hojgaard, Nicolai", owgr: 29, events: 11, cutsMade: 10, wins: 0, seconds: 2, thirds: 1, top10: 4, top25: 7, earnings: "$4,258,570" },
      { name: "Kitayama, Kurt", owgr: 34, events: 12, cutsMade: 10, wins: 0, seconds: 1, thirds: 0, top10: 3, top25: 6, earnings: "$3,598,421" },
      { name: "McNealy, Maverick", owgr: 33, events: 12, cutsMade: 11, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 7, earnings: "$2,012,782" },
      { name: "Niemann, Joaquin", owgr: 167, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Spaun, J.J.", owgr: 8, events: 12, cutsMade: 7, wins: 1, seconds: 0, thirds: 0, top10: 2, top25: 5, earnings: "$3,296,522" },
      { name: "Woodland, Gary", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
    ],
  },
  {
    tier: 5,
    label: "Tier E",
    oddsRange: "Form plays",
    golfers: [
      { name: "Bradley, Keegan", owgr: 32, events: 11, cutsMade: 8, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 3, earnings: "$1,180,054" },
      { name: "Bridgeman, Jacob", owgr: 19, events: 12, cutsMade: 12, wins: 1, seconds: 0, thirds: 0, top10: 4, top25: 8, earnings: "$6,824,450" },
      { name: "Conners, Corey", owgr: 50, events: 11, cutsMade: 10, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 3, earnings: "$1,204,895" },
      { name: "Fitzpatrick, Alex", owgr: 83, events: 3, cutsMade: 3, wins: 1, seconds: 0, thirds: 0, top10: 3, top25: 3, earnings: "$2,832,750" },
      { name: "Hall, Harry", owgr: 57, events: 12, cutsMade: 8, wins: 0, seconds: 0, thirds: 0, top10: 3, top25: 5, earnings: "$1,917,025" },
      { name: "Im, Sungjae", owgr: 67, events: 8, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$1,298,970" },
      { name: "Noren, Alex", owgr: 18, events: 11, cutsMade: 9, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,825,392" },
      { name: "Puig, David", owgr: 62, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Theegala, Sahith", owgr: 76, events: 14, cutsMade: 13, wins: 0, seconds: 0, thirds: 0, top10: 4, top25: 8, earnings: "$2,398,723" },
      { name: "Thorbjornsen, Michael", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
    ],
  },
  {
    tier: 6,
    label: "Tier F",
    oddsRange: "Sleepers",
    golfers: [
      { name: "Berger, Daniel", owgr: 42, events: 12, cutsMade: 10, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$3,091,923" },
      { name: "Clark, Wyndham", owgr: 71, events: 11, cutsMade: 9, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 4, earnings: "$990,686" },
      { name: "Detry, Thomas", owgr: 61, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Gerard, Ryan", owgr: 36, events: 14, cutsMade: 12, wins: 0, seconds: 2, thirds: 0, top10: 2, top25: 4, earnings: "$2,619,223" },
      { name: "Mitchell, Keith", owgr: 109, events: 12, cutsMade: 11, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,057,801" },
      { name: "Penge, Marco", owgr: 40, events: 11, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$943,413" },
      { name: "Reitan, Kristoffer", owgr: 25, events: 12, cutsMade: 9, wins: 1, seconds: 1, thirds: 0, top10: 3, top25: 5, earnings: "$5,009,729" },
      { name: "Smalley, Alex", owgr: 78, events: 13, cutsMade: 12, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 7, earnings: "$2,281,550" },
      { name: "Stevens, Sam", owgr: 49, events: 14, cutsMade: 13, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 6, earnings: "$1,883,220" },
      { name: "Taylor, Nick", owgr: null, events: 0, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
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
  { name: "The Masters", location: "Augusta National", dates: "Apr 9–12", status: "completed" as const, cutLine: 50, madeCut: null },
  { name: "PGA Championship", location: "Aronimink Golf Club", dates: "May 14–17", status: "upcoming" as const, cutLine: 70, madeCut: null },
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

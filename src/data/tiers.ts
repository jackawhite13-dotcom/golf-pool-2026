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

export const tiers: Tier[] = [
  {
    tier: 1,
    label: "Tier A",
    oddsRange: "Rank 1–10",
    golfers: [
      { name: "Aberg, Ludvig", owgr: 21, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 2, earnings: "$1,537,875" },
      { name: "Fleetwood, Tommy", owgr: 3, events: 3, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$1,536,700" },
      { name: "Henley, Russell", owgr: 6, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 4, earnings: "$1,299,539" },
      { name: "Hovland, Viktor", owgr: 18, events: 4, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$733,350" },
      { name: "Kim, Si Woo", owgr: 28, events: 7, cutsMade: 7, wins: 0, seconds: 1, thirds: 1, top10: 3, top25: 5, earnings: "$2,247,955" },
      { name: "McIlroy, Rory", owgr: 2, events: 3, cutsMade: 3, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 2, earnings: "$2,142,750" },
      { name: "Morikawa, Collin", owgr: 5, events: 5, cutsMade: 4, wins: 1, seconds: 0, thirds: 0, top10: 3, top25: 3, earnings: "$5,065,472" },
      { name: "Schauffele, Xander", owgr: 10, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,029,280" },
      { name: "Scheffler, Scottie", owgr: 1, events: 5, cutsMade: 5, wins: 1, seconds: 0, thirds: 1, top10: 3, top25: 5, earnings: "$3,545,180" },
      { name: "Young, Cameron", owgr: 15, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 1, top10: 2, top25: 3, earnings: "$1,971,920" },
    ],
  },
  {
    tier: 2,
    label: "Tier B",
    oddsRange: "Rank 11–20",
    golfers: [
      { name: "Bhatia, Akshay", owgr: 19, events: 6, cutsMade: 4, wins: 1, seconds: 0, thirds: 1, top10: 3, top25: 4, earnings: "$5,448,680" },
      { name: "Cantlay, Patrick", owgr: 33, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$604,740" },
      { name: "Fitzpatrick, Matt", owgr: 24, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$899,488" },
      { name: "Fowler, Rickie", owgr: 60, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$1,189,827" },
      { name: "Gotterup, Chris", owgr: 7, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 4, earnings: "$3,837,375" },
      { name: "Koepka, Brooks", owgr: 221, events: 3, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$274,176" },
      { name: "Lee, Min Woo", owgr: 30, events: 5, cutsMade: 5, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 3, earnings: "$2,979,049" },
      { name: "MacIntyre, Robert", owgr: 8, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$943,475" },
      { name: "Matsuyama, Hideki", owgr: 12, events: 6, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$2,131,971" },
      { name: "McNealy, Maverick", owgr: 25, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$1,020,475" },
    ],
  },
  {
    tier: 3,
    label: "Tier C",
    oddsRange: "Rank 21–30",
    golfers: [
      { name: "Berger, Daniel", owgr: 34, events: 7, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 3, earnings: "$2,756,730" },
      { name: "Bridgeman, Jacob", owgr: 22, events: 6, cutsMade: 6, wins: 1, seconds: 0, thirds: 0, top10: 3, top25: 6, earnings: "$5,477,960" },
      { name: "English, Harris", owgr: 16, events: 6, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 4, earnings: "$757,007" },
      { name: "Griffin, Ben", owgr: 13, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$412,583" },
      { name: "Kitayama, Kurt", owgr: 31, events: 6, cutsMade: 5, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 3, earnings: "$2,224,092" },
      { name: "Knapp, Jake", owgr: 42, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 4, top25: 5, earnings: "$2,166,475" },
      { name: "Lowry, Shane", owgr: 29, events: 4, cutsMade: 3, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 3, earnings: "$1,419,650" },
      { name: "Scott, Adam", owgr: 50, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 3, earnings: "$1,662,222" },
      { name: "Spieth, Jordan", owgr: 64, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 3, earnings: "$1,105,675" },
      { name: "Straka, Sepp", owgr: 9, events: 5, cutsMade: 4, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 3, earnings: "$2,307,420" },
    ],
  },
  {
    tier: 4,
    label: "Tier D",
    oddsRange: "Rank 31–40",
    golfers: [
      { name: "Burns, Sam", owgr: 32, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$747,918" },
      { name: "Gerard, Ryan", owgr: 27, events: 7, cutsMade: 6, wins: 0, seconds: 2, thirds: 0, top10: 2, top25: 4, earnings: "$2,072,429" },
      { name: "Hall, Harry", owgr: 56, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 4, earnings: "$1,108,525" },
      { name: "Hojgaard, Nicolai", owgr: 52, events: 4, cutsMade: 4, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 4, earnings: "$1,013,320" },
      { name: "Mitchell, Keith", owgr: 114, events: 7, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$749,596" },
      { name: "Noren, Alex", owgr: 17, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$697,200" },
      { name: "Rose, Justin", owgr: 5, events: 5, cutsMade: 2, wins: 1, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$1,806,375" },
      { name: "Spaun, J.J.", owgr: 11, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$88,522" },
      { name: "Theegala, Sahith", owgr: 76, events: 7, cutsMade: 7, wins: 0, seconds: 0, thirds: 0, top10: 3, top25: 5, earnings: "$1,689,668" },
      { name: "Thorbjornsen, Michael", owgr: 59, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 2, earnings: "$712,930" },
    ],
  },
  {
    tier: 5,
    label: "Tier E",
    oddsRange: "Rank 41–50",
    golfers: [
      { name: "Bezuidenhout, Christiaan", owgr: 89, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$253,720" },
      { name: "Bradley, Keegan", owgr: 23, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$156,464" },
      { name: "Conners, Corey", owgr: 39, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$308,100" },
      { name: "Coody, Pierceson", owgr: 48, events: 7, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 5, earnings: "$1,617,699" },
      { name: "Hojgaard, Rasmus", owgr: 51, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$415,977" },
      { name: "McCarty, Matt", owgr: 43, events: 7, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 3, earnings: "$1,060,663" },
      { name: "Rai, Aaron", owgr: 35, events: 4, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$270,129" },
      { name: "Taylor, Nick", owgr: 62, events: 6, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$672,409" },
      { name: "Thomas, Justin", owgr: 14, events: 1, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Thompson, Davis", owgr: 111, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$269,504" },
    ],
  },
  {
    tier: 6,
    label: "Tier F",
    oddsRange: "Rank 51–60",
    golfers: [
      { name: "Castillo, Ricky", owgr: 95, events: 5, cutsMade: 5, wins: 1, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$1,220,139" },
      { name: "Clark, Wyndham", owgr: 68, events: 5, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$354,642" },
      { name: "Day, Jason", owgr: 40, events: 5, cutsMade: 3, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 2, earnings: "$820,160" },
      { name: "Echavarria, Nico", owgr: 37, events: 7, cutsMade: 3, wins: 1, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$2,309,000" },
      { name: "Hisatsune, Ryo", owgr: 65, events: 7, cutsMade: 6, wins: 0, seconds: 1, thirds: 0, top10: 3, top25: 3, earnings: "$1,682,177" },
      { name: "Im, Sungjae", owgr: 79, events: 1, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Olesen, Thorbjorn", owgr: 102, events: 3, cutsMade: 1, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$31,776" },
      { name: "Pendrith, Taylor", owgr: 66, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$545,105" },
      { name: "Reitan, Kristoffer", owgr: 46, events: 4, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$222,360" },
      { name: "Stevens, Sam", owgr: 49, events: 7, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$835,978" },
    ],
  },
  {
    tier: 7,
    label: "Tier G",
    oddsRange: "Rank 61+",
    golfers: [
      { name: "Bauchou, Zach", owgr: 172, events: 6, cutsMade: 6, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 3, earnings: "$357,587" },
      { name: "Brennan, Michael", owgr: null, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$96,120" },
      { name: "Campbell, Brian", owgr: 96, events: 6, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$54,522" },
      { name: "Cauley, Bud", owgr: 81, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$431,722" },
      { name: "Cole, Eric", owgr: 121, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$175,038" },
      { name: "Dahmen, Joel", owgr: 163, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$592,700" },
      { name: "Finau, Tony", owgr: 104, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$621,529" },
      { name: "Fisk, Steven", owgr: 128, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$83,850" },
      { name: "Fox, Ryan", owgr: 44, events: 4, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 4, earnings: "$1,004,520" },
      { name: "Glover, Lucas", owgr: 78, events: 3, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$193,500" },
      { name: "Greyserman, Max", owgr: 54, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$538,509" },
      { name: "Grillo, Emiliano", owgr: 113, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$100,436" },
      { name: "Harman, Brian", owgr: 58, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$360,429" },
      { name: "Higgo, Garrick", owgr: 74, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$70,026" },
      { name: "Highsmith, Joe", owgr: 132, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$94,763" },
      { name: "Hodges, Lee", owgr: 133, events: 4, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$318,881" },
      { name: "Hoey, Rico", owgr: 80, events: 7, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$159,199" },
      { name: "Hoge, Tom", owgr: 98, events: 7, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$644,364" },
      { name: "Homa, Max", owgr: 149, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$352,920" },
      { name: "Hubbard, Mark", owgr: 139, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$131,182" },
      { name: "Hughes, Mackenzie", owgr: 110, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$266,053" },
      { name: "Jaeger, Stephan", owgr: 109, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 1, earnings: "$468,832" },
      { name: "Kanaya, Takumi", owgr: 127, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$203,210" },
      { name: "Keefer, John", owgr: 67, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$143,191" },
      { name: "Kim, Michael", owgr: 55, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$315,618" },
      { name: "Kim, S.H.", owgr: 153, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$338,545" },
      { name: "Kirk, Chris", owgr: 99, events: 6, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$103,000" },
      { name: "Kizzire, Patton", owgr: 230, events: 4, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$274,171" },
      { name: "Li, HaoTong", owgr: 75, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 2, earnings: "$519,475" },
      { name: "McCarthy, Denny", owgr: 94, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$175,145" },
      { name: "McGreevy, Max", owgr: 72, events: 7, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$295,782" },
      { name: "Meissner, Mac", owgr: 106, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$197,669" },
      { name: "Moore, Taylor", owgr: 140, events: 4, cutsMade: 4, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 1, earnings: "$837,023" },
      { name: "Mouw, William", owgr: 126, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$342,382" },
      { name: "Novak, Andrew", owgr: 47, events: 6, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$497,850" },
      { name: "Pavon, Matthieu", owgr: 263, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$267,208" },
      { name: "Penge, Marco", owgr: 38, events: 4, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$355,500" },
      { name: "Phillips, Chandler", owgr: 168, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$172,711" },
      { name: "Poston, J.T.", owgr: 70, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$164,275" },
      { name: "Potgieter, Aldrich", owgr: 71, events: 6, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 1, top25: 1, earnings: "$878,250" },
      { name: "Power, Seamus", owgr: 157, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$285,607" },
      { name: "Putnam, Andrew", owgr: 122, events: 4, cutsMade: 2, wins: 0, seconds: 1, thirds: 0, top10: 1, top25: 1, earnings: "$682,400" },
      { name: "Ramey, Chad", owgr: 155, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$287,318" },
      { name: "Riley, Davis", owgr: 107, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 1, earnings: "$322,589" },
      { name: "Rodgers, Patrick", owgr: 85, events: 7, cutsMade: 7, wins: 0, seconds: 0, thirds: 1, top10: 1, top25: 2, earnings: "$1,057,109" },
      { name: "Roy, Kevin", owgr: 138, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 3, earnings: "$428,642" },
      { name: "Schenk, Adam", owgr: 141, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$247,283" },
      { name: "Schmid, Matti", owgr: 90, events: 8, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 2, top25: 2, earnings: "$509,801" },
      { name: "Smalley, Alex", owgr: 123, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$361,691" },
      { name: "Smith, Jordan", owgr: 93, events: 5, cutsMade: 4, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$315,428" },
      { name: "Smotherman, Austin", owgr: 100, events: 6, cutsMade: 3, wins: 0, seconds: 1, thirds: 0, top10: 2, top25: 2, earnings: "$977,100" },
      { name: "Valimaki, Sami", owgr: 53, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$230,330" },
      { name: "van Rooyen, Erik", owgr: 146, events: 6, cutsMade: 0, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$0" },
      { name: "Vegas, Jhonattan", owgr: 101, events: 5, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$363,250" },
      { name: "Vilips, Karl", owgr: 145, events: 4, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 1, earnings: "$159,367" },
      { name: "Walker, Danny", owgr: 227, events: 6, cutsMade: 3, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$82,656" },
      { name: "Whaley, Vince", owgr: 120, events: 6, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$59,158" },
      { name: "Woodland, Gary", owgr: 148, events: 5, cutsMade: 2, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$39,228" },
      { name: "Yellamaraju, Sudarshan", owgr: 216, events: 6, cutsMade: 5, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 2, earnings: "$358,940" },
      { name: "Yu, Kevin", owgr: 115, events: 5, cutsMade: 1, wins: 0, seconds: 0, thirds: 0, top10: 0, top25: 0, earnings: "$34,375" },
    ],
  },
];

export const tournaments = [
  { name: "The Players Championship", location: "TPC Sawgrass", dates: "Mar 12–15", status: "upcoming" as const },
  { name: "The Masters", location: "Augusta National", dates: "Apr 9–12", status: "locked" as const },
  { name: "PGA Championship", location: "Quail Hollow", dates: "May 14–17", status: "locked" as const },
  { name: "U.S. Open", location: "Oakmont", dates: "Jun 18–21", status: "locked" as const },
  { name: "The Open Championship", location: "Royal Portrush", dates: "Jul 16–19", status: "locked" as const },
];

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ENTRY_PRICES = { 1: 350, 2: 575, 3: 725 };
const AVG_REVENUE_PER_ENTRY = 300; // blended average across 1/2/3 entry pricing
const INDIVIDUAL_SPLIT = 0.8;
const CUMULATIVE_SPLIT = 0.2;
const NUM_TOURNAMENTS = 5;
const COST_PER_PERSON = 287.5;

const INDIVIDUAL_PAYOUTS: Record<number, number> = {
  1: 0.45,
  2: 0.25,
  3: 0.17,
  4: 0.08,
  5: 0.05,
};

const CUMULATIVE_PAYOUTS: Record<number, number> = {
  1: 0.35,
  2: 0.22,
  3: 0.15,
  4: 0.1,
  5: 0.07,
  6: 0.05,
  7: 0.03,
  8: 0.02,
  9: 0.005,
  10: 0.005,
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Scenario {
  tournamentFinishes: { place: number; count: number }[];
  cumulativePlace: number | null;
}

/* ------------------------------------------------------------------ */
/*  Helper: format currency                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  if (n < 0) return "-$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtExact(n: number): string {
  if (n < 0) return "-$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ------------------------------------------------------------------ */
/*  Reusable card                                                      */
/* ------------------------------------------------------------------ */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

const ENTRY_COUNT = 559;

export default function PayoutsPage() {
  /* --- state --- */
  // individual tournament scenario toggles
  const [finish1st, setFinish1st] = useState(false);
  const [finish2nd, setFinish2nd] = useState(false);
  const [finish3rd, setFinish3rd] = useState(false);
  const [finish4th, setFinish4th] = useState(false);
  const [cashCount, setCashCount] = useState(0); // 0 = use individual toggles, 1-5 = override
  const [cumulativePlace, setCumulativePlace] = useState<number | null>(null);

  // page title
  useEffect(() => {
    document.title = "Payout Simulator | Majors Pool 2026";
  }, []);

  /* --- derived calculations --- */
  const totalPot = ENTRY_COUNT * AVG_REVENUE_PER_ENTRY;
  const individualPool = totalPot * INDIVIDUAL_SPLIT;
  const cumulativePool = totalPot * CUMULATIVE_SPLIT;
  const perTournamentPool = individualPool / NUM_TOURNAMENTS;

  // per-tournament placement payouts
  const tournamentPayoutFor = useCallback(
    (place: number) => {
      const pct = INDIVIDUAL_PAYOUTS[place];
      if (!pct) return 0;
      return perTournamentPool * pct;
    },
    [perTournamentPool]
  );

  // cumulative placement payouts
  const cumulativePayoutFor = useCallback(
    (place: number) => {
      const pct = CUMULATIVE_PAYOUTS[place];
      if (!pct) return 0;
      return cumulativePool * pct;
    },
    [cumulativePool]
  );

  // build scenario from toggles
  const buildScenario = useCallback((): Scenario => {
    const tournamentFinishes: { place: number; count: number }[] = [];

    if (cashCount > 0) {
      // "cash X times" mode: assume best available placements
      // We distribute across the toggled placements or default to 1st
      const placements = [];
      if (finish1st) placements.push(1);
      if (finish2nd) placements.push(2);
      if (finish3rd) placements.push(3);
      if (finish4th) placements.push(4);

      if (placements.length === 0) {
        // default: assume mix of placements
        for (let i = 0; i < cashCount; i++) {
          const place = Math.min(i + 2, 4); // 2nd, 3rd, 4th, 4th...
          const existing = tournamentFinishes.find((f) => f.place === place);
          if (existing) existing.count++;
          else tournamentFinishes.push({ place, count: 1 });
        }
      } else {
        // distribute cashCount across toggled placements
        let remaining = cashCount;
        for (const p of placements) {
          if (remaining <= 0) break;
          tournamentFinishes.push({ place: p, count: 1 });
          remaining--;
        }
        // fill remaining with lowest toggled place
        if (remaining > 0) {
          const lowest = placements[placements.length - 1];
          const existing = tournamentFinishes.find((f) => f.place === lowest);
          if (existing) existing.count += remaining;
        }
      }
    } else {
      // individual toggle mode
      if (finish1st) tournamentFinishes.push({ place: 1, count: 1 });
      if (finish2nd) tournamentFinishes.push({ place: 2, count: 1 });
      if (finish3rd) tournamentFinishes.push({ place: 3, count: 1 });
      if (finish4th) tournamentFinishes.push({ place: 4, count: 1 });
    }

    return {
      tournamentFinishes,
      cumulativePlace,
    };
  }, [finish1st, finish2nd, finish3rd, finish4th, cashCount, cumulativePlace]);

  const scenario = buildScenario();

  // total scenario earnings
  let scenarioTotal = 0;
  for (const f of scenario.tournamentFinishes) {
    scenarioTotal += tournamentPayoutFor(f.place) * f.count;
  }
  if (scenario.cumulativePlace) {
    scenarioTotal += cumulativePayoutFor(scenario.cumulativePlace);
  }

  const perPersonGross = scenarioTotal / 2;
  const perPersonNet = perPersonGross - COST_PER_PERSON;
  const roi = COST_PER_PERSON > 0 ? (perPersonNet / COST_PER_PERSON) * 100 : 0;

  /* --- quick scenario presets --- */
  function applyPreset(preset: string) {
    // reset everything first
    setFinish1st(false);
    setFinish2nd(false);
    setFinish3rd(false);
    setFinish4th(false);
    setCashCount(0);
    setCumulativePlace(null);

    switch (preset) {
      case "conservative":
        setFinish4th(true);
        setCashCount(1);
        break;
      case "target":
        setFinish3rd(true);
        setFinish4th(true);
        setCashCount(2);
        break;
      case "dream":
        setFinish2nd(true);
        setFinish3rd(true);
        setCashCount(3);
        setCumulativePlace(3);
        break;
      case "jackpot":
        setFinish1st(true);
        setCashCount(1);
        setCumulativePlace(1);
        break;
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--green-accent)]"
      >
        &larr; Back to Hub
      </Link>

      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[var(--green-accent)]">
          Jack &amp; Abe
        </p>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Payout Simulator
        </h1>
        <p className="max-w-2xl text-sm text-[var(--text-muted)]">
          Toggle what-if scenarios and see exactly what you&apos;d take home.
          All math updates live. 559 entries, $575 for 2 entries, 50/50 split.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  POOL OVERVIEW                                                */}
      {/* ============================================================ */}
      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Pool Overview — {ENTRY_COUNT} Entries
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-[var(--text-muted)]">Total Pot</p>
            <p className="text-xl font-bold text-[var(--green-accent)]">
              {fmt(totalPot)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Individual Pool (80%)
            </p>
            <p className="text-xl font-bold">{fmt(individualPool)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Cumulative Pool (20%)
            </p>
            <p className="text-xl font-bold">{fmt(cumulativePool)}</p>
          </div>
        </div>
      </Card>

      {/* ============================================================ */}
      {/*  PER-TOURNAMENT PAYOUT BREAKDOWN                             */}
      {/* ============================================================ */}
      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Per-Tournament Payouts ({fmt(perTournamentPool)} / event)
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((place) => (
            <div
              key={place}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3 text-center"
            >
              <p className="mb-1 text-xs text-[var(--text-muted)]">
                {place === 1
                  ? "1st"
                  : place === 2
                  ? "2nd"
                  : place === 3
                  ? "3rd"
                  : `${place}th`}
              </p>
              <p className="text-sm font-bold">
                {fmt(tournamentPayoutFor(place))}
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">
                {(INDIVIDUAL_PAYOUTS[place] * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ============================================================ */}
      {/*  CUMULATIVE PAYOUT BREAKDOWN                                 */}
      {/* ============================================================ */}
      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Cumulative Season Payouts ({fmt(cumulativePool)} pool)
        </h2>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((place) => (
            <div
              key={place}
              className={`rounded-lg border p-3 text-center ${
                place <= 3
                  ? "border-[var(--green-accent)]/30 bg-[var(--green-dark)]/20"
                  : "border-[var(--card-border)] bg-[var(--background)]"
              }`}
            >
              <p className="mb-1 text-[10px] text-[var(--text-muted)]">
                {place === 1
                  ? "1st"
                  : place === 2
                  ? "2nd"
                  : place === 3
                  ? "3rd"
                  : `${place}th`}
              </p>
              <p className="text-xs font-bold">
                {fmt(cumulativePayoutFor(place))}
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">
                {(CUMULATIVE_PAYOUTS[place] * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ============================================================ */}
      {/*  QUICK SCENARIOS                                             */}
      {/* ============================================================ */}
      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Quick Scenarios
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              key: "conservative",
              label: "Conservative",
              desc: "Cash once, no cumulative",
            },
            {
              key: "target",
              label: "Target",
              desc: "Cash twice, top 10 cumulative",
            },
            {
              key: "dream",
              label: "Dream",
              desc: "Cash 3x + top 3 cumulative",
            },
            {
              key: "jackpot",
              label: "Jackpot",
              desc: "Win a tournament + 1st cumulative",
            },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => applyPreset(p.key)}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3 text-left transition-all hover:border-[var(--green-accent)]/50 hover:bg-[var(--green-dark)]/30 active:scale-[0.98]"
            >
              <p className="text-sm font-bold">{p.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{p.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* ============================================================ */}
      {/*  WHAT-IF TOGGLES                                             */}
      {/* ============================================================ */}
      <div className="mb-6 grid gap-6 sm:grid-cols-2">
        {/* Tournament finishes */}
        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
            Tournament Finishes
          </h2>
          <div className="space-y-3">
            {[
              { label: "We finish 1st in a tournament", state: finish1st, setter: setFinish1st, payout: tournamentPayoutFor(1) },
              { label: "We finish 2nd in a tournament", state: finish2nd, setter: setFinish2nd, payout: tournamentPayoutFor(2) },
              { label: "We finish 3rd in a tournament", state: finish3rd, setter: setFinish3rd, payout: tournamentPayoutFor(3) },
              { label: "We finish 4th in a tournament", state: finish4th, setter: setFinish4th, payout: tournamentPayoutFor(4) },
            ].map((item) => (
              <label
                key={item.label}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 transition-all hover:border-[var(--green-accent)]/30"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={() => item.setter(!item.state)}
                    className="h-4 w-4 rounded border-[var(--card-border)] bg-[var(--background)] accent-[var(--green-accent)]"
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-xs font-semibold text-[var(--green-accent)]">
                  {fmt(item.payout)}
                </span>
              </label>
            ))}
          </div>

          {/* Cash count */}
          <div className="mt-4 rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                We cash in X of 5 tournaments
              </span>
              <select
                value={cashCount}
                onChange={(e) => setCashCount(Number(e.target.value))}
                className="rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1 text-sm text-[var(--foreground)] focus:border-[var(--green-accent)] focus:outline-none"
              >
                <option value={0}>Use toggles above</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} tournament{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            {cashCount > 0 && (
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Distributes {cashCount} cash{cashCount > 1 ? "es" : ""} across
                your toggled placements above. If none toggled, defaults to
                mid-range finishes.
              </p>
            )}
          </div>
        </Card>

        {/* Cumulative standing */}
        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
            Cumulative Standing
          </h2>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            Select your end-of-season cumulative standing. This is the 20% pool
            paid to the top 10 finishers based on normalized points across all 5
            tournaments.
          </p>
          <div className="space-y-2">
            {[
              { place: null as number | null, label: "No cumulative payout" },
              { place: 1, label: "1st place cumulative" },
              { place: 2, label: "2nd place cumulative" },
              { place: 3, label: "3rd place cumulative" },
              { place: 5, label: "5th place cumulative" },
              { place: 8, label: "8th place cumulative" },
              { place: 10, label: "10th place cumulative" },
            ].map((item) => (
              <label
                key={item.label}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2.5 transition-all hover:border-[var(--green-accent)]/30"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="cumulative"
                    checked={cumulativePlace === item.place}
                    onChange={() => setCumulativePlace(item.place)}
                    className="h-4 w-4 accent-[var(--green-accent)]"
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-xs font-semibold text-[var(--green-accent)]">
                  {item.place ? fmt(cumulativePayoutFor(item.place)) : "--"}
                </span>
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* ============================================================ */}
      {/*  PAYOUT SUMMARY                                              */}
      {/* ============================================================ */}
      <Card className="border-[var(--green-accent)]/30 bg-[var(--green-dark)]/20">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Your Scenario Summary
        </h2>

        {/* Scenario breakdown */}
        <div className="mb-6 space-y-2">
          {scenario.tournamentFinishes.length === 0 &&
            !scenario.cumulativePlace && (
              <p className="text-sm text-[var(--text-muted)]">
                Toggle scenarios above to see your projected payout.
              </p>
            )}

          {scenario.tournamentFinishes.map((f) => (
            <div
              key={f.place}
              className="flex items-center justify-between rounded-lg bg-[var(--card-bg)] px-4 py-2"
            >
              <span className="text-sm">
                {f.place === 1
                  ? "1st"
                  : f.place === 2
                  ? "2nd"
                  : f.place === 3
                  ? "3rd"
                  : `${f.place}th`}{" "}
                place finish x{f.count}
              </span>
              <span className="text-sm font-bold text-[var(--green-accent)]">
                {fmt(tournamentPayoutFor(f.place) * f.count)}
              </span>
            </div>
          ))}

          {scenario.cumulativePlace && (
            <div className="flex items-center justify-between rounded-lg bg-[var(--card-bg)] px-4 py-2">
              <span className="text-sm">
                {scenario.cumulativePlace === 1
                  ? "1st"
                  : scenario.cumulativePlace === 2
                  ? "2nd"
                  : scenario.cumulativePlace === 3
                  ? "3rd"
                  : `${scenario.cumulativePlace}th`}{" "}
                place cumulative
              </span>
              <span className="text-sm font-bold text-[var(--green-accent)]">
                {fmt(cumulativePayoutFor(scenario.cumulativePlace))}
              </span>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="space-y-3 border-t border-[var(--card-border)] pt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">
              Total Team Payout
            </span>
            <span className="text-lg font-bold">{fmt(scenarioTotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">
              Per Person (50/50 split)
            </span>
            <span className="text-lg font-bold">{fmtExact(perPersonGross)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">
              Cost Per Person
            </span>
            <span className="text-sm text-[var(--text-muted)]">
              -{fmtExact(COST_PER_PERSON)}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--card-border)] pt-3">
            <span className="font-semibold">Per-Person Take-Home</span>
            <span
              className={`text-2xl font-extrabold ${
                perPersonNet >= 0
                  ? "text-[var(--green-accent)]"
                  : "text-red-400"
              }`}
            >
              {fmtExact(perPersonNet)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">ROI</span>
            <span
              className={`text-lg font-bold ${
                roi >= 0 ? "text-[var(--green-accent)]" : "text-red-400"
              }`}
            >
              {roi >= 0 ? "+" : ""}
              {roi.toFixed(0)}%
            </span>
          </div>
        </div>
      </Card>

      {/* ============================================================ */}
      {/*  ENTRY FEE REFERENCE                                         */}
      {/* ============================================================ */}
      <Card className="mt-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Entry Fee Reference
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {Object.entries(ENTRY_PRICES).map(([count, price]) => (
            <div
              key={count}
              className={`rounded-lg border p-3 ${
                count === "2"
                  ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/20"
                  : "border-[var(--card-border)] bg-[var(--background)]"
              }`}
            >
              <p className="text-xs text-[var(--text-muted)]">
                {count} {Number(count) === 1 ? "entry" : "entries"}
              </p>
              <p className="text-lg font-bold">${price}</p>
              <p className="text-[10px] text-[var(--text-muted)]">
                ${(price / Number(count)).toFixed(0)}/entry
              </p>
              {count === "2" && (
                <p className="mt-1 text-[10px] font-semibold text-[var(--green-accent)]">
                  Our plan
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import Link from "next/link";
import { tournaments, getCurrentTournament } from "@/data/tiers";
import { STANDINGS_AFTER_PLAYERS } from "@/data/standings";

export default function Home() {
  const current = getCurrentTournament();
  const s = STANDINGS_AFTER_PLAYERS;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-10 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[var(--green-accent)]">
          Pollack&apos;s Golf
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Majors + Players Pool
          <span className="text-[var(--green-accent)]"> 2026</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[var(--text-muted)]">
          559 entries &middot; ~$175K+ pot &middot; 5 tournaments &middot; 7 tiers per event
        </p>
      </section>

      {/* Current Standings */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          Our Standings — After {s.tournamentsCompleted} of 5 Tournaments
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Jack */}
          <div className="rounded-xl border border-blue-900/40 bg-blue-950/20 p-5">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">JACK — team jaw</span>
              <span className="text-xs text-[var(--text-muted)]">Chalk / Floor</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{s.jack.rank}th</span>
              <span className="text-sm text-[var(--text-muted)]">of {s.totalEntries}</span>
            </div>
            <p className="mt-1 text-sm">
              <span className="font-semibold">{s.jack.points} pts</span>
              <span className="text-[var(--text-muted)]"> &middot; {s.leader.points - s.jack.points} pts behind 1st</span>
            </p>
          </div>

          {/* Abe */}
          <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-5">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">ABE — Watman</span>
              <span className="text-xs text-[var(--text-muted)]">Contrarian / Ceiling</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{s.abe.rank}th</span>
              <span className="text-sm text-[var(--text-muted)]">of {s.totalEntries}</span>
            </div>
            <p className="mt-1 text-sm">
              <span className="font-semibold">{s.abe.points} pts</span>
              <span className="text-[var(--text-muted)]"> &middot; {s.leader.points - s.abe.points} pts behind 1st</span>
            </p>
          </div>
        </div>

        {/* Leader context */}
        <div className="mt-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-center text-xs text-[var(--text-muted)]">
          Leader: <span className="font-semibold text-white">{s.leader.team}</span> ({s.leader.owner}) — {s.leader.points} pts
          &middot; Jack is top {((s.jack.rank / s.totalEntries) * 100).toFixed(1)}%
        </div>
      </section>

      {/* Season Schedule */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          2026 Season
        </h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {tournaments.map((t, i) => {
            const isCompleted = t.status === "completed";
            const isNext = i === current.index && !current.isCurrent;
            const isLive = i === current.index && current.isCurrent;
            return (
              <div
                key={t.name}
                className={`rounded-lg border p-3 ${
                  isLive
                    ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/30"
                    : isNext
                    ? "border-[var(--green-accent)]/30 bg-[var(--green-dark)]/15"
                    : isCompleted
                    ? "border-[var(--card-border)] bg-[var(--card-bg)] opacity-70"
                    : "border-[var(--card-border)] bg-[var(--card-bg)]"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--green-accent)]">T{i + 1}</span>
                  {isCompleted && (
                    <span className="rounded-full bg-[var(--text-muted)] px-2 py-0.5 text-[10px] font-bold text-black">
                      DONE
                    </span>
                  )}
                  {isLive && (
                    <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black animate-pulse">
                      LIVE
                    </span>
                  )}
                  {isNext && (
                    <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black">
                      NEXT
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold leading-tight">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.location}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{t.dates}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Strategy — collapsible */}
      <section className="mb-8">
        <details className="group rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
          <summary className="cursor-pointer px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)] select-none">
            Our Strategy (Locked In)
            <span className="ml-2 text-[var(--text-muted)] group-open:hidden">+</span>
            <span className="ml-2 text-[var(--text-muted)] hidden group-open:inline">−</span>
          </summary>
          <div className="space-y-4 px-6 pb-6 text-sm leading-relaxed">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-blue-900/40 bg-blue-950/20 p-3">
                <p className="mb-1 text-xs font-bold text-blue-400">JACK: The Floor (Chalk)</p>
                <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Favorites and proven cut-makers in top tiers</li>
                  <li>Consistent players with top-25 upside in mid/low tiers</li>
                  <li>Goal: accumulate points, compete for cumulative</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-3">
                <p className="mb-1 text-xs font-bold text-amber-400">ABE: The Ceiling (Contrarian)</p>
                <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Fade chalk, target low-owned players with win equity</li>
                  <li>Hot form, recent winners, sleepers in mid/low tiers</li>
                  <li>Goal: hunt tournament wins, accept more variance</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 text-[var(--text-muted)]">
              <p><strong className="text-white">1. Different golfers across both entries.</strong> Two differentiated entries nearly double our probability of cashing vs. identical lineups.</p>
              <p><strong className="text-white">2. 50/50 split on all winnings. No exceptions.</strong> $575 total cost, $287.50 each.</p>
              <p><strong className="text-white">3. Optimize per-tournament first.</strong> ~75% of the pot is in individual events. Cumulative takes care of itself if we pick well week-to-week.</p>
              <p><strong className="text-white">4. Any single cash = profit.</strong> Even 5th place in one tournament ($1,000) covers our $575 investment.</p>
            </div>
          </div>
        </details>
      </section>

      {/* How This Pool Works — painfully simple */}
      <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--green-accent)]">
          How This Pool Works
        </h2>
        <div className="space-y-5 text-sm">
          {/* The Basics */}
          <div>
            <h3 className="mb-2 font-semibold text-white">The Basics</h3>
            <ul className="space-y-1.5 text-[var(--text-muted)]">
              <li>There are <strong className="text-white">5 tournaments</strong> this season (Players, Masters, PGA, US Open, The Open).</li>
              <li>Before each tournament, you pick <strong className="text-white">7 golfers</strong> — one from each tier (A through G). Tiers are based on odds to win.</li>
              <li>Your golfers play. <strong className="text-white">Higher finish = more points.</strong> Miss the cut = 0 points.</li>
            </ul>
          </div>

          {/* Points */}
          <div>
            <h3 className="mb-2 font-semibold text-white">How Points Work</h3>
            <ul className="space-y-1.5 text-[var(--text-muted)]">
              <li>1st place gets the most points. Each place down loses 1 point. Last cut-maker gets 11 pts. Miss cut = 0.</li>
              <li>The starting number = <strong className="text-white">(golfers who made the cut) + 10</strong>. At The Players, 73 made the cut, so 1st place = 83 pts.</li>
              <li><strong className="text-white">Bonus points:</strong> Win the tournament = +10 extra. 2nd = +7. 3rd = +5.</li>
              <li>Whoever&apos;s 7 golfers score the most combined points wins that tournament.</li>
            </ul>
          </div>

          {/* Payouts */}
          <div>
            <h3 className="mb-2 font-semibold text-white">Who Gets Paid</h3>
            <ul className="space-y-1.5 text-[var(--text-muted)]">
              <li><strong className="text-white">Each tournament:</strong> Top 5 finishers get paid ($7K / $4.1K / $2.9K / $1.7K / $1K). Plus $450 for leading after rounds 1, 2, and 3.</li>
              <li><strong className="text-white">Overall cumulative:</strong> Top 5 across all 5 tournaments get paid ($11.7K / $7K / $4.9K / $2.8K / $1.5K). Scores are normalized to a 75-point scale so every tournament counts equally.</li>
              <li><strong className="text-white">Bonus payouts:</strong> Most tournament winners selected + most cuts made (TBD amounts).</li>
            </ul>
          </div>

          {/* Our Deal */}
          <div>
            <h3 className="mb-2 font-semibold text-white">Our Deal</h3>
            <ul className="space-y-1.5 text-[var(--text-muted)]">
              <li>We have <strong className="text-white">2 entries</strong> (Jack + Abe). Cost: $575 total, split 50/50 ($287.50 each).</li>
              <li>All winnings from either entry split <strong className="text-white">50/50</strong>, no exceptions.</li>
            </ul>
          </div>

          <div className="pt-2 text-center">
            <Link href="/payouts" className="text-xs font-semibold text-[var(--green-accent)] hover:underline">
              See full payout simulator &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

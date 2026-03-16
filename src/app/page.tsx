import Link from "next/link";
import Countdown from "@/components/Countdown";
import { tournaments, getCurrentTournament } from "@/data/tiers";

export default function Home() {
  const current = getCurrentTournament();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-12 text-center sm:mb-16">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[var(--green-accent)]">
          Pollack&apos;s Golf
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Majors + Players Pool
          <span className="text-[var(--green-accent)]"> 2026</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-sm text-[var(--text-muted)] sm:text-base">
          559 entries &middot; ~$175K+ pot &middot; 5 tournaments &middot; 7 tiers per event
        </p>

        {/* Countdown */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-4">
            <p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {current.isCurrent
                ? `${current.name} — ${current.roundInfo}`
                : `${current.name} — ${current.roundInfo}`}
            </p>
            <Countdown />
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="mb-16 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <Link
          href="/live"
          className="group relative overflow-hidden rounded-xl border border-[var(--green-accent)]/40 bg-[var(--green-dark)]/30 p-6 transition-all hover:border-[var(--green-accent)]/60 hover:shadow-lg hover:shadow-[var(--green-accent)]/10 sm:p-8"
        >
          <div className="absolute right-4 top-4 text-3xl opacity-30 transition-opacity group-hover:opacity-50">
            📡
          </div>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-xl font-bold sm:text-2xl">Live Scoring</h2>
            <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black animate-pulse">
              LIVE
            </span>
          </div>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Track Jack &amp; Abe&apos;s picks in real time at {current.name}.
            Live leaderboard positions, scores, and team totals.
          </p>
          <span className="text-sm font-semibold text-[var(--green-accent)]">
            Watch Live →
          </span>
        </Link>

        <Link
          href="/players-championship"
          className="group relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:border-[var(--green-accent)]/40 hover:shadow-lg hover:shadow-[var(--green-accent)]/5 sm:p-8"
        >
          <div className="absolute right-4 top-4 text-3xl opacity-20 transition-opacity group-hover:opacity-40">
            ⛳
          </div>
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">The Players Championship</h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Tournament 1 of 5 — TPC Sawgrass, Mar 12–15. Course intel, tier-by-tier analysis,
            and confidence ratings for every player.
          </p>
          <span className="text-sm font-semibold text-[var(--green-accent)]">
            View Analysis →
          </span>
        </Link>

        <Link
          href="/strategy"
          className="group relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:border-[var(--green-accent)]/40 hover:shadow-lg hover:shadow-[var(--green-accent)]/5 sm:p-8"
        >
          <div className="absolute right-4 top-4 text-3xl opacity-20 transition-opacity group-hover:opacity-40">
            🧠
          </div>
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">Strategy Center</h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Jack &amp; Abe coordination hub — chalk vs. contrarian method locked in,
            50/50 split confirmed, season-long planning.
          </p>
          <span className="text-sm font-semibold text-[var(--green-accent)]">
            View Strategy →
          </span>
        </Link>

        <Link
          href="/payouts"
          className="group relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:border-[var(--green-accent)]/40 hover:shadow-lg hover:shadow-[var(--green-accent)]/5 sm:p-8"
        >
          <div className="absolute right-4 top-4 text-3xl opacity-20 transition-opacity group-hover:opacity-40">
            💰
          </div>
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">Payout Simulator</h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Interactive what-if scenarios — toggle entry counts, finishes,
            and see exactly what you&apos;d take home.
          </p>
          <span className="text-sm font-semibold text-[var(--green-accent)]">
            Run Scenarios →
          </span>
        </Link>
      </section>

      {/* Season Schedule */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold">2026 Season Schedule</h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {tournaments.map((t, i) => {
            const isActive = i === current.index;
            return (
              <div
                key={t.name}
                className={`rounded-lg border p-4 ${
                  isActive
                    ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/30"
                    : "border-[var(--card-border)] bg-[var(--card-bg)]"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--green-accent)]">T{i + 1}</span>
                  {isActive && current.isCurrent && (
                    <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black animate-pulse">
                      LIVE
                    </span>
                  )}
                  {isActive && !current.isCurrent && (
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

      {/* Pool Rules */}
      <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8">
        <h2 className="mb-6 text-lg font-bold">Official Pool Rules</h2>
        <div className="space-y-6">
          {/* Scoring */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              Scoring
            </h3>
            <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <li>Points are based on finishing position. 1st place earns the most points; each successive place is one point less.</li>
              <li>Bonus points: 1st place +10, 2nd place +7, 3rd place +5.</li>
              <li>
                Points scale starts at 10 more than the number of players who make the cut. For The Players: 73 made the cut,
                so 1st = 83 pts (+10 bonus = 93 total), 2nd = 82 pts (+7 bonus = 89 total),
                3rd = 81 pts (+5 bonus = 86 total), down to 11 pts for last cut-maker.
              </li>
              <li>Missed cut = 0 points.</li>
            </ul>
          </div>

          <div className="border-t border-[var(--card-border)]" />

          {/* Withdrawals */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              Withdrawals
            </h3>
            <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <li>If a player withdraws, you earn 0 points. No replacements.</li>
              <li>Monitor withdrawal news before each tournament.</li>
            </ul>
          </div>

          <div className="border-t border-[var(--card-border)]" />

          {/* Cumulative / Season-Long */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              Cumulative / Season-Long
            </h3>
            <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <li>Same position-based scoring for season standings, but adjusted to a uniform 75-point scale so every tournament is weighted equally.</li>
              <li>For The Players: all scores multiplied by 75/83 (0.9036) since 1st place was 83 pts.</li>
              <li>Top 5 cumulative finishers get paid (~25% of total pot).</li>
              <li>Bonus payouts for most winners selected and most cuts made (TBD).</li>
            </ul>
          </div>

          <div className="border-t border-[var(--card-border)]" />

          {/* Entry & Payment */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              Entry &amp; Payment
            </h3>
            <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <li>$350 / 1 entry, $575 / 2 entries, $725 / 3 entries.</li>
              <li>Must be paid before tournament starts or locked out — no exceptions.</li>
              <li>Payment via Zelle or Venmo.</li>
            </ul>
          </div>

          <div className="border-t border-[var(--card-border)]" />

          {/* General */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              General
            </h3>
            <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <li>Commissioner&apos;s doc is the source of truth for updates and tentative payouts.</li>
              <li>Selections for The Players Championship must be submitted before 7:40 AM EST on tournament morning.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

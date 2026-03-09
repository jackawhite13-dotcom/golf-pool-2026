import Link from "next/link";
import Countdown from "@/components/Countdown";
import { tournaments } from "@/data/tiers";

export default function Home() {
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
          ~300 entries &middot; ~$150K pot &middot; 5 tournaments &middot; 7 tiers per event
        </p>

        {/* Countdown */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-4">
            <p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-muted)]">
              The Players Championship begins in
            </p>
            <Countdown />
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="mb-16 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <Link
          href="/strategy"
          className="group relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:border-[var(--green-accent)]/40 hover:shadow-lg hover:shadow-[var(--green-accent)]/5 sm:p-8"
        >
          <div className="absolute right-4 top-4 text-3xl opacity-20 transition-opacity group-hover:opacity-40">
            🧠
          </div>
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">Strategy Center</h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Jack &amp; Abe coordination hub — game theory, financial arrangements,
            chalk vs. contrarian analysis, and season-long planning.
          </p>
          <span className="text-sm font-semibold text-[var(--green-accent)]">
            View Strategy →
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
            Tournament 1 of 5 — TPC Sawgrass, Mar 12–15. Course intel, tier-by-tier picks,
            and recommended lineups for Jack &amp; Abe.
          </p>
          <span className="text-sm font-semibold text-[var(--green-accent)]">
            View Picks →
          </span>
        </Link>
      </section>

      {/* Season Schedule */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold">2026 Season Schedule</h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {tournaments.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-lg border p-4 ${
                t.status === "upcoming"
                  ? "border-[var(--green-accent)]/40 bg-[var(--green-dark)]/30"
                  : "border-[var(--card-border)] bg-[var(--card-bg)]"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--green-accent)]">T{i + 1}</span>
                {t.status === "upcoming" && (
                  <span className="rounded-full bg-[var(--green-accent)] px-2 py-0.5 text-[10px] font-bold text-black">
                    NEXT
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold leading-tight">{t.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{t.location}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{t.dates}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pool Rules Summary */}
      <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-bold">Pool Rules at a Glance</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--green-accent)]">Entry</h3>
            <p className="text-sm text-[var(--text-muted)]">
              $350/1 entry · $575/2 entries · $725/3 entries
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--green-accent)]">Picks</h3>
            <p className="text-sm text-[var(--text-muted)]">
              7 golfers per tournament — one from each tier (1-10, 11-20, 21-30, 31-40, 41-50, 51-60, 61+)
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--green-accent)]">Individual Payouts</h3>
            <p className="text-sm text-[var(--text-muted)]">
              ~80% of pot split across 5 events. Top 4–5 paid per tournament (47.5% / 27.5% / 17.5% / 10%).
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--green-accent)]">Cumulative Payout</h3>
            <p className="text-sm text-[var(--text-muted)]">
              ~20% of pot. Standings-based scoring normalized to 70pts per tournament.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--green-accent)]">Scoring</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Position-based: 1st ≈ 75pts, 2nd = 74pts, etc. + bonus for top 3. Missed cut = 0.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--green-accent)]">Special Bonuses</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Most tournament winners selected. Most total prize money selected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

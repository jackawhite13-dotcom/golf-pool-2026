# Majors Pool 2026

Real-time strategy and tracking hub for a 559-entry golf majors pool (2026 season).

## Tech Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- ESPN leaderboard API integration
- Session-based password auth
- Deployed on Vercel

## Project Structure
- `src/app/` — Pages: home hub, live scoring, payouts, tournaments
- `src/components/` — AuthShell, PasswordGate, Navigation, LineupSummary, TierCard, Countdown
- `src/data/` — Pool entries (559), tier definitions (7 tiers, 70 golfers), standings, results
- `src/lib/` — Points calculation logic

## Key Data
- 5 tournaments: Players, Masters, PGA, US Open, The Open
- 7 tiers (A-G) with 10 golfers each
- Normalized scoring to 75-point scale per tournament
- Two tracked entries: "team jaw" (Jack) and "Watman" (Abe)

## Development
```bash
cd golf-pool-2026
npm install
npm run dev  # runs on default port
```

## API
- `POST /api/leaderboard` — Fetches live ESPN leaderboard data

## Notes
- Password is session-based (stored in sessionStorage)
- Standings data needs manual updates after each tournament
- CSV exports in root are data snapshots (can be cleaned up)

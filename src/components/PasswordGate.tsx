"use client";

import { useState, useEffect, type ReactNode } from "react";

const SITE_PASSWORD = "1234";

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pool-auth");
    if (stored === "true") {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);

    if (password === SITE_PASSWORD) {
      sessionStorage.setItem("pool-auth", "true");
      setAuthenticated(true);
    } else {
      setError(true);
    }
  }

  if (loading) return null;
  if (authenticated) return <>{children}</>;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center">
          <div className="mb-3 text-4xl">&#9971;</div>
          <h2 className="mb-1 text-lg font-bold text-white">Majors Pool 2026</h2>
          <p className="mb-6 text-sm text-[var(--text-muted)]">
            Jack &amp; Abe&apos;s strategy hub. Enter password to continue.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className="mb-3 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none focus:border-[var(--green-accent)]/50"
            autoFocus
          />
          {error && (
            <p className="mb-3 text-xs text-red-400">Wrong password. Try again.</p>
          )}
          <button
            type="submit"
            disabled={!password}
            className="w-full rounded-lg bg-[var(--green-accent)] px-4 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-03-12T07:00:00-05:00"); // Thursday round 1 tee times

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.expired) {
    return <p className="text-[var(--green-accent)] font-semibold text-sm">The Players Championship is underway!</p>;
  }

  const blocks = [
    { value: time.days, label: "DAYS" },
    { value: time.hours, label: "HRS" },
    { value: time.minutes, label: "MIN" },
    { value: time.seconds, label: "SEC" },
  ];

  return (
    <div className="flex items-center gap-3">
      {blocks.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
              {String(b.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] tracking-widest text-[var(--text-muted)]">{b.label}</span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-xl text-[var(--green-accent)] opacity-50">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

interface Pick {
  tier: number;
  golfer: string;
  rationale: string;
}

interface LineupSummaryProps {
  name: string;
  role: string;
  color: "blue" | "amber";
  picks: Pick[];
}

export default function LineupSummary({ name, role, color, picks }: LineupSummaryProps) {
  const borderColor = color === "blue" ? "border-blue-900/40" : "border-amber-900/40";
  const bgColor = color === "blue" ? "bg-blue-950/20" : "bg-amber-950/20";
  const accentColor = color === "blue" ? "text-blue-400" : "text-amber-400";
  const dotColor = color === "blue" ? "bg-blue-400" : "bg-amber-400";

  return (
    <div className={`rounded-xl border ${borderColor} ${bgColor} p-5`}>
      <div className="mb-4">
        <p className={`text-xs font-bold uppercase tracking-wider ${accentColor}`}>
          {name}&apos;s Lineup
        </p>
        <p className="text-sm font-semibold text-white">{role}</p>
      </div>
      <div className="space-y-2.5">
        {picks.map((pick) => (
          <div key={pick.tier} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-[var(--card-border)] text-[10px] font-bold text-[var(--text-muted)]">
              {String.fromCharCode(64 + pick.tier)}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                <p className="text-xs font-semibold text-white">{pick.golfer}</p>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">{pick.rationale}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

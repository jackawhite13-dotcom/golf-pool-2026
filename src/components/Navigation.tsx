"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Hub" },
  { href: "/strategy", label: "Strategy Center" },
  { href: "/players-championship", label: "The Players" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-[var(--green-accent)]">MAJORS</span>
            <span className="text-white">POOL</span>
          </span>
          <span className="hidden text-xs text-[var(--text-muted)] sm:inline">2026</span>
        </Link>
        <div className="flex gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                pathname === link.href
                  ? "bg-[var(--green-accent)] text-black"
                  : "text-[var(--text-muted)] hover:bg-[var(--card-bg)] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

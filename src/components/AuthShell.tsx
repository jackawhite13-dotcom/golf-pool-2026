"use client";

import { type ReactNode } from "react";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <PasswordGate>
      <Navigation />
      <main>{children}</main>
    </PasswordGate>
  );
}

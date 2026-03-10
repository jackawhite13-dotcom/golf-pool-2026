export async function callDebateAPI(params: {
  system: string;
  prompt: string;
  useSearch?: boolean;
  maxTokens?: number;
}): Promise<string> {
  const password =
    typeof window !== "undefined"
      ? sessionStorage.getItem("debate-password") || ""
      : "";

  const res = await fetch("/api/debate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params, password }),
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("debate-password");
      sessionStorage.removeItem("debate-auth");
    }
    throw new Error("Session expired. Please refresh and re-enter the password.");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API error");
  return data.text;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const res = await fetch("/api/debate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "verify", password }),
  });
  return res.ok;
}

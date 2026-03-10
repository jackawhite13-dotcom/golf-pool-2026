import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, action } = body;

    // Validate password
    if (password !== process.env.DEBATE_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Password verification endpoint
    if (action === "verify") {
      return NextResponse.json({ valid: true });
    }

    // Claude API call
    const { system, prompt, useSearch, maxTokens } = body;

    const apiBody: Record<string, unknown> = {
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens || 1000,
      system,
      messages: [{ role: "user", content: prompt }],
    };

    if (useSearch) {
      apiBody.tools = [{ type: "web_search_20250305", name: "web_search" }];
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(apiBody),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "API error" },
        { status: res.status }
      );
    }

    const text = (data.content || [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { type: string; text: string }) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

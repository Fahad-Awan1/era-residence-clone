import { NextResponse } from "next/server";

/**
 * Local stand-in for the source site's Webflow form backend. It validates the
 * enquiry and acknowledges it, but does not store or forward anything.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const missing = ["name", "email", "phone"].filter((field) => !String(body?.[field] ?? "").trim());
  if (missing.length) {
    return NextResponse.json({ error: "Missing fields", missing }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

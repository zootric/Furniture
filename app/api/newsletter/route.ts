import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter sign-up endpoint. When NEWSLETTER_WEBHOOK_URL is configured the address
 * is forwarded there (any service that accepts a JSON POST). Without it, nothing is
 * stored, and the response says so rather than claiming a subscription.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 422 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({
      ok: true,
      message: "Thank you. Sign-ups are not connected yet, so write to hello@arlowstudio.com to join the list.",
    });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "arlow-newsletter" }),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't add you just now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Thank you. We'll send a note when new pieces are released." });
}

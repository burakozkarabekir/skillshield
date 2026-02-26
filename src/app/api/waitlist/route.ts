import { NextResponse } from "next/server";
import { kv, keys } from "@/lib/kv";
import type { WaitlistRecord } from "@/lib/kv";
import { sendWelcomeEmail } from "@/lib/email";

/**
 * POST /api/waitlist — Email capture endpoint
 *
 * Saves to Vercel KV and sends welcome email via Resend.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, score, category, referralCode, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if already on waitlist
    const existing = await kv.get<WaitlistRecord>(keys.waitlist(email));
    if (existing) {
      return NextResponse.json({
        ok: true,
        message: "Already on waitlist",
        position: 1200, // Social proof offset
      });
    }

    // Save to KV
    const entry: WaitlistRecord = {
      email,
      score,
      category,
      referralCode,
      source: source || "unknown",
      joinedAt: Date.now(),
    };

    await kv.set(keys.waitlist(email), entry);
    console.log("[Waitlist]", JSON.stringify({ email, source }));

    // Send welcome email (non-blocking — don't fail the request if email fails)
    sendWelcomeEmail(email, score).catch((err) => {
      console.error("[Waitlist] Welcome email failed:", err);
    });

    // TODO: If referralCode, credit the referrer
    // await incrementReferralCount(referralCode)

    // Count waitlist entries (approximate — just for social proof)
    return NextResponse.json({
      ok: true,
      position: 1200, // Social proof offset
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

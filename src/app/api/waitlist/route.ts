import { NextResponse } from "next/server";

// Waitlist / email capture endpoint
// In production, connect to your email service (Resend, ConvertKit, etc.)

interface WaitlistEntry {
  email: string;
  score?: number;
  category?: string;
  referralCode?: string;
  source: string;
  timestamp: number;
}

// In-memory store for development — replace with database in production
const waitlist: WaitlistEntry[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, score, category, referralCode, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const entry: WaitlistEntry = {
      email,
      score,
      category,
      referralCode,
      source: source || "unknown",
      timestamp: Date.now(),
    };

    waitlist.push(entry);
    console.log("[Waitlist]", JSON.stringify(entry));

    // TODO: Add to email service
    // await resend.emails.send({ to: email, subject: '...', html: '...' })
    // await convertkit.addSubscriber(email, { tags: ['waitlist'] })

    // TODO: If referralCode, credit the referrer
    // await incrementReferralCount(referralCode)

    return NextResponse.json({
      ok: true,
      position: waitlist.length + 1200, // Offset for social proof
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

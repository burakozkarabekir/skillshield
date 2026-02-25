import { NextResponse } from "next/server";

// Referral tracking API
// Tracks when someone visits via a referral link

// In-memory store — replace with database in production
const referralCounts: Record<string, number> = {};

export async function POST(request: Request) {
  try {
    const { referralCode } = await request.json();

    if (!referralCode) {
      return NextResponse.json({ error: "Missing referral code" }, { status: 400 });
    }

    referralCounts[referralCode] = (referralCounts[referralCode] || 0) + 1;

    console.log("[Referral]", referralCode, "count:", referralCounts[referralCode]);

    return NextResponse.json({
      ok: true,
      count: referralCounts[referralCode],
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  return NextResponse.json({
    count: referralCounts[code] || 0,
  });
}

import { NextResponse } from "next/server";
import { kv, keys } from "@/lib/kv";
import type { PremiumRecord } from "@/lib/kv";

/**
 * GET /api/premium/status?email=<email> — Check if email has premium access
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Missing 'email' query parameter" },
      { status: 400 }
    );
  }

  const record = await kv.get<PremiumRecord>(keys.premium(email));

  if (!record) {
    return NextResponse.json({ isPremium: false });
  }

  return NextResponse.json({
    isPremium: true,
    purchasedAt: record.purchasedAt,
    scoreId: record.scoreId,
  });
}

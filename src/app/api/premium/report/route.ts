import { NextResponse } from "next/server";
import { kv, keys } from "@/lib/kv";
import type { PremiumRecord } from "@/lib/kv";
import type { ScoringResult } from "@/lib/types";
import { generatePremiumReport } from "@/lib/premium-report";
import { renderPremiumPDF } from "@/lib/pdf-report";

/**
 * GET /api/premium/report?email=<email>&scoreId=<scoreId>
 *
 * Verifies premium access, generates PDF report, returns it.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const scoreId = searchParams.get("scoreId");

  if (!email || !scoreId) {
    return NextResponse.json(
      { error: "Missing 'email' and 'scoreId' query parameters" },
      { status: 400 }
    );
  }

  // Verify premium access
  const premiumRecord = await kv.get<PremiumRecord>(keys.premium(email));
  if (!premiumRecord) {
    return NextResponse.json(
      { error: "Premium access not found for this email" },
      { status: 403 }
    );
  }

  // Fetch score
  const scoreResult = await kv.get<ScoringResult & { scoreId: string }>(
    keys.score(scoreId)
  );
  if (!scoreResult) {
    return NextResponse.json(
      { error: "Score not found" },
      { status: 404 }
    );
  }

  // Generate premium report
  const report = generatePremiumReport(scoreResult);

  // Render PDF
  const pdfBuffer = await renderPremiumPDF(report);

  return new Response(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="skillshield-rapor-${scoreId}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}

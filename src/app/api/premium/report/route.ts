import { NextResponse } from "next/server";
import { kv, keys } from "@/lib/kv";
import type { PremiumRecord } from "@/lib/kv";
import type { ScoringResult } from "@/lib/types";
import { generateEnhancedPremiumReport } from "@/lib/premium-report";
import { renderEnhancedPremiumPDF } from "@/lib/pdf-report";

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

  // Generate enhanced premium report
  const report = generateEnhancedPremiumReport(scoreResult);

  // Render enhanced PDF (5-6 pages)
  const pdfBuffer = await renderEnhancedPremiumPDF(report);

  return new Response(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="adaptai-rapor-${scoreId}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}

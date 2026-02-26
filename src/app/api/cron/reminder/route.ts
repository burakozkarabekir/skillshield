import { NextResponse } from "next/server";
import { kv, keys } from "@/lib/kv";
import type { PremiumRecord, EmailScoreEntry } from "@/lib/kv";
import { sendReminderEmail } from "@/lib/email";

/**
 * GET /api/cron/reminder — Send 3-month reminder emails
 *
 * Protected by CRON_SECRET header.
 * Scans premium users and sends reminders to those whose last quiz
 * was 85-95 days ago (targeting the ~3 month mark).
 *
 * Triggered daily via Vercel Cron at 09:00 UTC.
 */
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const DAY_MS = 1000 * 60 * 60 * 24;
  const MIN_DAYS = 85;
  const MAX_DAYS = 95;

  let sent = 0;
  let scanned = 0;

  try {
    // Scan all premium:* keys
    const allPremiumKeys: string[] = [];
    let scanCursor = 0;

    // First pass: collect all keys
    const firstScan = await kv.scan(scanCursor, { match: "premium:*", count: 100 });
    allPremiumKeys.push(...firstScan[1]);
    scanCursor = Number(firstScan[0]);

    while (scanCursor !== 0) {
      const nextScan = await kv.scan(scanCursor, { match: "premium:*", count: 100 });
      allPremiumKeys.push(...nextScan[1]);
      scanCursor = Number(nextScan[0]);
    }

    // Second pass: process each key
    for (const key of allPremiumKeys) {
      scanned++;
      const record = await kv.get<PremiumRecord>(key);
      if (!record?.email) continue;

      // Check if we already sent a reminder recently (within 80 days)
      if (record.lastReminderSent && now - record.lastReminderSent < MIN_DAYS * DAY_MS) {
        continue;
      }

      // Get email scores to find the last quiz date
      const scores = await kv.get<EmailScoreEntry[]>(keys.emailScores(record.email));
      if (!scores || scores.length === 0) continue;

      // Find the most recent score
      const sorted = scores.sort((a, b) => b.createdAt - a.createdAt);
      const lastScore = sorted[0];
      const daysSinceLastQuiz = (now - lastScore.createdAt) / DAY_MS;

      // Only send if last quiz was 85-95 days ago
      if (daysSinceLastQuiz < MIN_DAYS || daysSinceLastQuiz > MAX_DAYS) {
        continue;
      }

      // Send reminder
      await sendReminderEmail(record.email, lastScore.overallScore, lastScore.createdAt);

      // Update lastReminderSent
      await kv.set(key, { ...record, lastReminderSent: now });

      sent++;
    }

    console.log(`[Cron/Reminder] Scanned ${scanned} premium records, sent ${sent} reminders`);

    return NextResponse.json({
      success: true,
      scanned,
      sent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Cron/Reminder] Error: ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { Resend } from "resend";

/**
 * Email service using Resend.
 * Degrades gracefully when RESEND_API_KEY is not set (logs to console).
 */

const FROM_EMAIL = "AdaptAI <noreply@adaptai.dev>";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// ─── Welcome Email (waitlist signup) ────────────────────────────────────────

export async function sendWelcomeEmail(email: string, score?: number) {
  const resend = getResend();
  if (!resend) {
    console.log(`[Email] Welcome email skipped (no API key): ${email}`);
    return;
  }

  const scoreText = score
    ? `Yapay Zeka Kariyer Risk Skorun: ${score}/100.`
    : "Skorunu yakında hesaplayabilirsin.";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "AdaptAI'a hoş geldin",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hoş geldin!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          ${scoreText}
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          Yapay zeka yetenekleri her ay değişiyor. Risk profilini etkileyen bir gelişme olduğunda seni bilgilendireceğiz.
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 32px;">
          Ayda en fazla bir e-posta. Tek tıkla abonelikten çık.
        </p>
      </div>
    `,
  });
}

// ─── Premium Confirmation Email ─────────────────────────────────────────────

export async function sendPremiumConfirmationEmail(
  email: string,
  scoreId?: string
) {
  const resend = getResend();
  if (!resend) {
    console.log(`[Email] Premium confirmation skipped (no API key): ${email}`);
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://adaptai.dev";
  const reportUrl = scoreId
    ? `${appUrl}/premium/success?scoreId=${scoreId}`
    : `${appUrl}/premium/success`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "AdaptAI Pro — Raporun hazır!",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Raporun hazır!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          AdaptAI Pro satın alımın tamamlandı. Detaylı skor raporun, kişiselleştirilmiş öneriler ve PDF kariyer raporun hazır.
        </p>
        <div style="margin: 32px 0;">
          <a href="${reportUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Raporumu görüntüle
          </a>
        </div>
        <p style="font-size: 14px; color: #888;">
          PDF raporunu istediğin zaman indirebilirsin.
        </p>
      </div>
    `,
  });
}

// ─── 3-Month Reminder Email ──────────────────────────────────────────────────

export async function sendReminderEmail(
  email: string,
  lastScore: number,
  lastDate: number
) {
  const resend = getResend();
  if (!resend) {
    console.log(`[Email] Reminder email skipped (no API key): ${email}`);
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://adaptai.dev";
  const dateStr = new Date(lastDate).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "3 ay oldu — yapay zeka risk skorun degisti mi?",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Skorunu guncelleme zamani!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          ${dateStr} tarihinde yapay zeka kariyer risk skorun <strong>${lastScore}/100</strong> idi.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          Son 3 ayda yapay zeka yetenekleri onemli olcude degisti. Yeni beceriler edindin mi? Skorunun nasil degistigini gor.
        </p>
        <div style="margin: 32px 0;">
          <a href="${appUrl}/quiz" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Testi Tekrar Coz
          </a>
        </div>
        <p style="font-size: 14px; color: #888;">
          Ilerleme takibi icin ayni e-posta adresini kullanmayi unutma.
        </p>
        <p style="font-size: 12px; color: #aaa; margin-top: 32px;">
          Bu e-postayi artik almak istemiyorsan, cevap vererek bize bildir.
        </p>
      </div>
    `,
  });
}

// ─── Score Update Email ─────────────────────────────────────────────────────

export async function sendScoreUpdateEmail(
  email: string,
  oldScore: number,
  newScore: number
) {
  const resend = getResend();
  if (!resend) {
    console.log(`[Email] Score update skipped (no API key): ${email}`);
    return;
  }

  const direction = newScore > oldScore ? "yükseldi" : "düştü";
  const emoji = newScore > oldScore ? "" : "";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Yapay zeka risk skorun ${direction}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Skor güncellemesi</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          Yapay Zeka Kariyer Risk Skorun ${oldScore}'dan ${newScore}'a ${direction}.
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 32px;">
          Detaylar için AdaptAI'ı ziyaret et.
        </p>
      </div>
    `,
  });
}

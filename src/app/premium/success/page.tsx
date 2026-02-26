"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const scoreId = searchParams.get("scoreId");
  const [downloading, setDownloading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  async function handleDownload() {
    if (!email || !scoreId) return;
    setDownloading(true);
    try {
      const res = await fetch(
        `/api/premium/report?email=${encodeURIComponent(email)}&scoreId=${scoreId}`
      );
      if (!res.ok) {
        alert("PDF indirme basarisiz. Lutfen e-postanizi kontrol edin.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `skillshield-rapor-${scoreId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("PDF indirme sirasinda bir hata olustu.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-5xl mb-6">&#10003;</div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Satin alimin tamamlandi!
        </h1>
        <p className="mt-4 text-muted text-lg">
          SkillShield Pro raporun hazir. Detayli skor analizi,
          kisisellestirilmis oneriler ve PDF kariyer raporunu asagidan indirebilirsin.
        </p>

        {/* Email input for PDF download */}
        <div className="mt-10 max-w-sm mx-auto">
          {!emailSubmitted ? (
            <>
              <p className="text-sm text-muted mb-3">
                Satin alma sirasinda kullandigin e-posta adresini gir:
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="senin@emailin.com"
                className="w-full rounded-lg border border-border px-4 py-3 text-center focus:outline-none focus:border-accent"
              />
              <button
                onClick={() => email.includes("@") && setEmailSubmitted(true)}
                disabled={!email.includes("@")}
                className="mt-3 w-full rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Dogrula
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDownload}
                disabled={downloading || !scoreId}
                className="w-full rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors disabled:opacity-50 cursor-pointer"
              >
                {downloading ? "Hazirlaniyor..." : "PDF Raporumu Indir"}
              </button>
              {!scoreId && (
                <p className="mt-3 text-sm text-muted">
                  Skor bulunamadi. Lutfen once testi tamamla.
                </p>
              )}
            </>
          )}
        </div>

        {/* What's included */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          <div className="rounded-xl border border-border bg-card-bg p-6">
            <h3 className="font-semibold mb-2">Detayli Skor Raporu</h3>
            <p className="text-sm text-muted">
              Her boyutun derinlemesine analizi, guclu ve zayif yonlerin.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card-bg p-6">
            <h3 className="font-semibold mb-2">Kisisel Oneriler</h3>
            <p className="text-sm text-muted">
              Risk profiline ozel beceri gelistirme onerileri ve eylem plani.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card-bg p-6">
            <h3 className="font-semibold mb-2">PDF Kariyer Raporu</h3>
            <p className="text-sm text-muted">
              Profesyonel formatta indirilebilir rapor.
            </p>
          </div>
        </div>

        {/* Back links */}
        <div className="mt-12 flex justify-center gap-6">
          <a
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Ana sayfaya don
          </a>
          <a
            href="/quiz"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Testi tekrar coz
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PremiumSuccessPage() {
  return (
    <Suspense fallback={
      <div className="px-6 py-20 text-center">
        <p className="text-muted">Yukleniyor...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

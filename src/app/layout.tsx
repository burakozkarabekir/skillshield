import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdaptAI — Yapay Zeka Kariyer Risk Skoru",
  description:
    "Yapay zekanın işini nasıl etkileyeceğini öğren. Ücretsiz 7 dakikalık testi çöz ve görev bazında analizle kişiselleştirilmiş Yapay Zeka Kariyer Risk Skorunu al.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://adaptai.dev"
  ),
  openGraph: {
    title: "Yapay Zeka Kariyer Risk Skorun Kaç?",
    description:
      "Ücretsiz 7 dakikalık testi çöz. Kişiselleştirilmiş skorunu al. Nerede durduğunu tam olarak bil.",
    type: "website",
    siteName: "AdaptAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yapay Zeka Kariyer Risk Skorun Kaç?",
    description:
      "Ücretsiz 7 dakikalık testi çöz. Kişiselleştirilmiş skorunu al. Nerede durduğunu tam olarak bil.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased min-h-screen flex flex-col">
        <nav className="border-b border-border px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight">
              AdaptAI
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/progress"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Ilerleme
              </a>
              <a
                href="/quiz"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                Testi Coz
              </a>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border px-6 py-12 mt-auto">
          <div className="mx-auto max-w-5xl text-center text-sm text-muted">
            <p>
              O*NET görev verileri, BLS projeksiyonları ve yapay zeka
              yetenek karşılaştırmalarına dayalı analiz.
            </p>
            <p className="mt-2">
              Skorlar mevcut yapay zeka yetenek örtüşmesini temsil eder,
              iş kaybı tahmini değildir.
            </p>
            <p className="mt-4 text-xs">
              &copy; {new Date().getFullYear()} AdaptAI. Tüm hakları
              saklıdır.
            </p>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

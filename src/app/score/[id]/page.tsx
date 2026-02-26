import Link from "next/link";
import type { Metadata } from "next";

// Dynamic score page with OG metadata for shared links
// When someone shares their score, this page generates the right OG tags
// so the preview card shows their exact score on LinkedIn/Twitter

interface ScorePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ s?: string; j?: string; c?: string; ref?: string }>;
}

export async function generateMetadata({ searchParams }: ScorePageProps): Promise<Metadata> {
  const { s, j, c } = await searchParams;
  const score = s || "50";
  const jobTitle = j ? decodeURIComponent(j) : "Profesyonel";
  const category = c || "moderate";

  const ogImageUrl = `/api/og?score=${score}&job=${encodeURIComponent(jobTitle)}&category=${category}`;

  return {
    title: `${jobTitle}: ${score}/100 Yapay Zeka Risk Skoru | AdaptAI`,
    description: `${jobTitle} Yapay Zeka Kariyer Risk Değerlendirmesinde ${score}/100 aldı. SENİN skorunu 2 dakikada öğren.`,
    openGraph: {
      title: `${jobTitle} Yapay Zeka Riski: ${score}/100 — Seninki kaç?`,
      description: `Bu ${jobTitle} Yapay Zeka Kariyer Risk Değerlendirmesinde ${score}/100 aldı. Ücretsiz 2 dakikalık testi çöz.`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${jobTitle} AI Risk Score: ${score}/100`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${jobTitle} Yapay Zeka Riski: ${score}/100`,
      description: `Ücretsiz 2 dakikalık değerlendirmeyi çöz. SENİN Yapay Zeka Kariyer Risk Skorun kaç?`,
      images: [ogImageUrl],
    },
  };
}

export default async function ScorePage({ searchParams }: ScorePageProps) {
  const { s, j, c, ref } = await searchParams;
  const score = s || "50";
  const jobTitle = j ? decodeURIComponent(j) : "Profesyonel";
  const category = c || "moderate";

  const categoryColor = category === "critical" ? "text-danger"
    : category === "high" ? "text-warning"
    : category === "moderate" ? "text-accent"
    : "text-success";

  // Build quiz link with referral tracking
  const quizLink = ref ? `/quiz?ref=${ref}` : "/quiz";

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight">
          AdaptAI
        </Link>
        <Link
          href={quizLink}
          className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
        >
          SENİN Skorunu Al
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-2xl mx-auto">
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8 w-full">
          <p className="text-sm text-gray-500 mb-4">Birinin Yapay Zeka Kariyer Risk Skoru</p>

          <div className={`text-6xl font-bold ${categoryColor} mb-2`}>
            {score}<span className="text-2xl text-gray-500">/100</span>
          </div>

          <h1 className="text-xl font-bold mb-2">{jobTitle}</h1>
          <p className="text-gray-400">
            {category === "critical" && "Kritik yapay zeka etki riski"}
            {category === "high" && "Yüksek yapay zeka etki riski"}
            {category === "moderate" && "Orta düzey yapay zeka etki riski"}
            {category === "low" && "Düşük yapay zeka etki riski"}
          </p>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 w-full">
          <h2 className="text-2xl font-bold mb-2">SENİN skorun kaç?</h2>
          <p className="text-gray-400 mb-6">
            Ücretsiz 2 dakikalık Yapay Zeka Kariyer Risk Değerlendirmesini çöz ve işinin gerçekten ne kadar güvende olduğunu öğren.
          </p>
          <Link
            href={quizLink}
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Testi Çöz →
          </Link>
          <p className="text-xs text-gray-500 mt-3">Ücretsiz · 2 dakika · Kayıt gerekmez</p>
        </div>
      </div>
    </main>
  );
}

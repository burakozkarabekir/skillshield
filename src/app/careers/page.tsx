import { jobPages, seoShared } from "@/copy/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesleğe Göre Yapay Zeka Kariyer Risk Skorları | SkillShield",
  description:
    "Yapay zekanın farklı kariyerleri nasıl etkilediğini görün. Muhasebeciler, yazılım mühendisleri, hemşireler, tasarımcılar, pazarlamacılar ve daha fazlası için yapay zeka risk skorlarına göz atın.",
};

export default function CareersPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Kariyere göre yapay zeka risk skorları.
        </h1>
        <p className="mt-4 text-muted text-lg">
          Her mesleğin farklı bir yapay zeka risk profili var. Aşağıdan kendi mesleğini bul veya kişiselleştirilmiş skor için testi çöz.
        </p>

        <div className="mt-12 space-y-6">
          {jobPages.map((job) => {
            const riskColor =
              job.averageScore <= 25
                ? "#22c55e"
                : job.averageScore <= 50
                  ? "#eab308"
                  : job.averageScore <= 75
                    ? "#f97316"
                    : "#ef4444";

            return (
              <a
                key={job.slug}
                href={`/careers/${job.slug}`}
                className="flex items-center gap-6 rounded-xl border border-border bg-card-bg p-6 hover:border-accent/50 transition-colors"
              >
                <span
                  className="text-3xl font-bold shrink-0 w-16 text-center"
                  style={{ color: riskColor }}
                >
                  {job.averageScore}
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {job.riskSummary}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted">Mesleğini bulamadın mı?</p>
          <a
            href="/quiz"
            className="mt-4 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            Kişisel skorunu al
          </a>
        </div>

        {/* Methodology */}
        <div className="mt-16 border-t border-border pt-8">
          <h3 className="text-sm font-semibold">{seoShared.methodology.headline}</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            {seoShared.methodology.body}
          </p>
        </div>
      </div>
    </div>
  );
}

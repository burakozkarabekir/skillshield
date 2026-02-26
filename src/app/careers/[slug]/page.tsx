import { notFound } from "next/navigation";
import { jobPages, seoShared, seoTemplates } from "@/copy/seo";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobPages.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobPages.find((j) => j.slug === slug);
  if (!job) return {};
  return {
    title: job.metaTitle,
    description: job.metaDescription,
    openGraph: {
      title: job.metaTitle,
      description: job.metaDescription,
    },
  };
}

export default async function CareerPage({ params }: PageProps) {
  const { slug } = await params;
  const job = jobPages.find((j) => j.slug === slug);
  if (!job) notFound();

  const riskColor =
    job.averageScore <= 25
      ? "#22c55e"
      : job.averageScore <= 50
        ? "#eab308"
        : job.averageScore <= 75
          ? "#f97316"
          : "#ef4444";

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-8">
          <a href="/" className="hover:underline">{seoShared.breadcrumb.home}</a>
          {" / "}
          <a href="/careers" className="hover:underline">{seoShared.breadcrumb.careers}</a>
          {" / "}
          <span>{job.jobTitle}</span>
        </nav>

        {/* Hero */}
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          {job.heroHeadline}
        </h1>
        <p className="mt-4 text-lg text-muted">{job.heroSubhead}</p>

        {/* Average Score Badge */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-border bg-card-bg px-6 py-4">
          <span
            className="text-4xl font-bold"
            style={{ color: riskColor }}
          >
            {job.averageScore}
          </span>
          <div>
            <p className="text-sm font-medium">Ortalama Risk Skoru</p>
            <p className="text-xs text-muted">{job.jobTitle.toLowerCase()} için</p>
          </div>
        </div>

        {/* Risk Summary */}
        <p className="mt-10 text-muted leading-relaxed">{job.riskSummary}</p>

        {/* Tasks at Risk */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-risk-critical">Yapay Zekanın Yapabildiği Görevler</h2>
            <ul className="mt-4 space-y-3">
              {job.tasksAtRisk.map((task) => (
                <li key={task} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-risk-critical shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-risk-low">Yapay Zekanın Yapamadığı Görevler</h2>
            <ul className="mt-4 space-y-3">
              {job.tasksSafe.map((task) => (
                <li key={task} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-risk-low shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold">{job.verdictHeadline}</h2>
          <p className="mt-4 text-muted leading-relaxed">{job.verdictBody}</p>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-foreground text-background p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold">{job.ctaHeadline}</h2>
          <p className="mt-3 opacity-80">{job.ctaSubhead}</p>
          <a
            href="/quiz"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {seoTemplates.verdictCta}
          </a>
        </div>

        {/* Methodology */}
        <div className="mt-16 border-t border-border pt-12">
          <h3 className="text-lg font-bold">{seoShared.methodology.headline}</h3>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            {seoShared.methodology.body}
          </p>
          <p className="mt-4 text-xs text-muted">
            {seoShared.disclaimerFooter}
          </p>
        </div>

        {/* Related Jobs */}
        <div className="mt-16">
          <h3 className="text-lg font-bold">{seoShared.relatedJobs.headline}</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {jobPages
              .filter((j) => j.slug !== slug)
              .map((j) => (
                <a
                  key={j.slug}
                  href={`/careers/${j.slug}`}
                  className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-card-bg transition-colors"
                >
                  {j.jobTitle} ({j.averageScore}/100)
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

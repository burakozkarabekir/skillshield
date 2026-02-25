import Link from "next/link";
import { JOB_CATEGORIES } from "@/lib/scoring";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// SEO landing pages for "[job title] AI risk"
// These pages target organic search traffic and funnel to the quiz

const JOB_SEO_DATA: Record<string, {
  title: string;
  risk: number;
  category: string;
  description: string;
  keyTasks: string[];
  aiThreats: string[];
  safeAspects: string[];
  timeline: string;
  reskillingSuggestions: string[];
}> = {
  "software-engineer": {
    title: "Software Engineer",
    risk: 35,
    category: "moderate",
    description: "Software engineering faces moderate AI disruption. While AI coding assistants are transforming how code is written, the creative problem-solving, system design, and stakeholder communication aspects remain distinctly human.",
    keyTasks: ["Writing code", "System design", "Code review", "Debugging", "Requirements gathering"],
    aiThreats: ["AI code generation (Copilot, Claude)", "Automated testing", "No-code/low-code platforms", "AI-powered debugging"],
    safeAspects: ["Complex system architecture", "Cross-team collaboration", "Ambiguous problem solving", "Strategic technical decisions"],
    timeline: "5-8 years before significant role transformation",
    reskillingSuggestions: ["Master AI-assisted development", "Focus on system design & architecture", "Build leadership and mentoring skills", "Learn AI/ML fundamentals"],
  },
  "copywriter": {
    title: "Copywriter",
    risk: 72,
    category: "high",
    description: "Copywriting faces significant AI disruption. AI can now generate marketing copy, blog posts, and social media content at scale. However, brand strategy, emotional storytelling, and audience insight remain human strengths.",
    keyTasks: ["Writing marketing copy", "Blog content", "Social media posts", "Email campaigns", "Brand voice development"],
    aiThreats: ["AI content generation", "Automated A/B copy testing", "AI translation and localization", "Template-based content at scale"],
    safeAspects: ["Brand strategy", "Emotional storytelling", "Audience research", "Creative direction"],
    timeline: "2-4 years before significant role transformation",
    reskillingSuggestions: ["Become an AI-augmented content strategist", "Master prompt engineering for content", "Develop brand strategy expertise", "Build video/multimedia skills"],
  },
  "data-analyst": {
    title: "Data Analyst",
    risk: 68,
    category: "high",
    description: "Data analysis faces high AI disruption risk. AI can now process, visualize, and interpret data faster than humans. However, asking the right questions, communicating insights to stakeholders, and contextual business understanding are harder to automate.",
    keyTasks: ["Data cleaning", "Building dashboards", "Writing SQL queries", "Statistical analysis", "Presenting insights"],
    aiThreats: ["AI-powered analytics platforms", "Natural language data querying", "Automated reporting", "AI pattern recognition"],
    safeAspects: ["Business context interpretation", "Stakeholder communication", "Strategic question framing", "Cross-functional collaboration"],
    timeline: "3-5 years before significant role transformation",
    reskillingSuggestions: ["Learn AI/ML model building", "Develop business strategy skills", "Master data storytelling", "Build product analytics expertise"],
  },
  "graphic-designer": {
    title: "Graphic Designer",
    risk: 65,
    category: "high",
    description: "Graphic design faces substantial disruption from AI image generation tools. While AI can create stunning visuals, human designers excel at brand consistency, creative direction, and understanding nuanced client needs.",
    keyTasks: ["Creating visual assets", "Brand identity design", "UI/UX design", "Layout and typography", "Client presentations"],
    aiThreats: ["AI image generation (Midjourney, DALL-E)", "Automated layout tools", "AI logo generators", "Template-based design platforms"],
    safeAspects: ["Brand strategy and consistency", "Creative direction", "Client relationship management", "UX research and strategy"],
    timeline: "3-5 years before significant role transformation",
    reskillingSuggestions: ["Master AI design tools", "Pivot toward UX/product design", "Develop brand strategy skills", "Build motion design capabilities"],
  },
  "accountant": {
    title: "Accountant",
    risk: 75,
    category: "critical",
    description: "Accounting faces high automation risk. Routine bookkeeping, tax preparation, and financial reporting are increasingly handled by AI. Advisory, strategic planning, and complex regulatory navigation remain human-centric.",
    keyTasks: ["Bookkeeping", "Tax preparation", "Financial reporting", "Auditing", "Compliance"],
    aiThreats: ["Automated bookkeeping software", "AI tax preparation", "Real-time financial reporting", "AI audit tools"],
    safeAspects: ["Strategic financial advisory", "Complex tax planning", "Regulatory navigation", "Client relationship management"],
    timeline: "3-5 years before significant role transformation",
    reskillingSuggestions: ["Move toward financial advisory", "Specialize in complex tax strategy", "Learn data analytics", "Develop client consulting skills"],
  },
  "marketing-manager": {
    title: "Marketing Manager",
    risk: 45,
    category: "moderate",
    description: "Marketing management faces moderate disruption. While AI automates content creation, ad optimization, and analytics, the strategic thinking, brand building, and cross-functional leadership aspects are harder to replace.",
    keyTasks: ["Campaign strategy", "Team management", "Budget allocation", "Brand development", "Performance analysis"],
    aiThreats: ["AI content generation", "Automated ad optimization", "AI-powered analytics", "Programmatic marketing"],
    safeAspects: ["Strategic brand building", "Team leadership", "Cross-functional collaboration", "Creative campaign vision"],
    timeline: "5-8 years before significant role transformation",
    reskillingSuggestions: ["Master AI marketing tools", "Focus on brand strategy", "Develop leadership skills", "Build data-driven decision-making"],
  },
  "customer-service-rep": {
    title: "Customer Service Representative",
    risk: 78,
    category: "critical",
    description: "Customer service roles face very high AI disruption. AI chatbots and voice assistants handle increasing volumes of customer queries. Complex escalations and emotional situations still require human touch.",
    keyTasks: ["Answering customer queries", "Resolving complaints", "Processing returns", "Upselling", "Documentation"],
    aiThreats: ["AI chatbots", "Voice AI assistants", "Automated ticket routing", "Self-service portals"],
    safeAspects: ["Complex emotional situations", "High-value customer relationships", "Creative problem resolution", "Escalation handling"],
    timeline: "2-4 years before significant role transformation",
    reskillingSuggestions: ["Move into customer success management", "Develop sales skills", "Learn CRM and data analysis", "Build specialized product expertise"],
  },
  "product-manager": {
    title: "Product Manager",
    risk: 30,
    category: "moderate",
    description: "Product management has relatively low AI disruption risk. The role is fundamentally about human judgment, stakeholder management, and strategic decision-making — areas where AI assists but doesn't replace.",
    keyTasks: ["Product strategy", "Roadmap planning", "Stakeholder alignment", "User research", "Prioritization"],
    aiThreats: ["AI-powered user analytics", "Automated A/B testing", "AI product recommendations", "Automated market research"],
    safeAspects: ["Strategic vision", "Cross-functional leadership", "Ambiguous decision-making", "Stakeholder influence"],
    timeline: "8-10 years before significant role transformation",
    reskillingSuggestions: ["Master AI product features", "Deepen data science understanding", "Build AI strategy expertise", "Develop stronger technical skills"],
  },
};

// Generate static paths for SEO
export async function generateStaticParams() {
  return Object.keys(JOB_SEO_DATA).map((slug) => ({ slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = JOB_SEO_DATA[slug];
  if (!job) return {};

  return {
    title: `${job.title} AI Risk Score: ${job.risk}/100 — Will AI Replace ${job.title}s? | SkillShield`,
    description: `${job.title} AI automation risk is ${job.risk}/100 (${job.category}). ${job.description.slice(0, 120)}... Get your personalized score.`,
    openGraph: {
      title: `${job.title} AI Risk: ${job.risk}/100 — Is Your Job Safe?`,
      description: `${job.description.slice(0, 200)}...`,
    },
  };
}

export default async function JobSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOB_SEO_DATA[slug];

  if (!job) {
    notFound();
  }

  const categoryColor = job.category === "critical" ? "text-danger"
    : job.category === "high" ? "text-warning"
    : job.category === "moderate" ? "text-accent"
    : "text-success";

  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </Link>
        <Link
          href="/quiz"
          className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
        >
          Get Your Score
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm mb-4 border ${
            job.category === "critical" ? "bg-danger/10 border-danger/30 text-danger"
            : job.category === "high" ? "bg-warning/10 border-warning/30 text-warning"
            : job.category === "moderate" ? "bg-accent/10 border-accent/30 text-accent"
            : "bg-success/10 border-success/30 text-success"
          }`}>
            {job.category.toUpperCase()} RISK
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Will AI Replace{" "}
            <span className={categoryColor}>{job.title}s</span>?
          </h1>
          <p className="text-gray-400 text-lg">
            AI Career Risk Score: <span className={`font-bold text-2xl ${categoryColor}`}>{job.risk}/100</span>
          </p>
        </div>

        {/* Description */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8">
          <p className="text-gray-300 leading-relaxed">{job.description}</p>
          <p className="text-sm text-gray-500 mt-4">{job.timeline}</p>
        </div>

        {/* Two columns: Threats vs Safe */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-card-bg border border-danger/30 rounded-2xl p-6">
            <h2 className="font-bold text-danger mb-4">AI Threats</h2>
            <ul className="space-y-2">
              {job.aiThreats.map((threat, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-danger mt-0.5">!</span> {threat}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card-bg border border-success/30 rounded-2xl p-6">
            <h2 className="font-bold text-success mb-4">Safe Aspects</h2>
            <ul className="space-y-2">
              {job.safeAspects.map((aspect, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-success mt-0.5">+</span> {aspect}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reskilling suggestions */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8">
          <h2 className="font-bold mb-4">How to Future-Proof Your Career</h2>
          <ol className="space-y-3">
            {job.reskillingSuggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {suggestion}
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            This is the average {job.title} score.
            <br />
            What&apos;s yours?
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Your personal score depends on your specific tasks, AI adoption, and career trajectory.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Get Your Personal Score →
          </Link>
          <p className="text-xs text-gray-500 mt-3">Free · 2 minutes · No signup required</p>
        </div>

        {/* Other jobs (internal linking for SEO) */}
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">Other Job AI Risk Scores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(JOB_SEO_DATA)
              .filter(([s]) => s !== slug)
              .slice(0, 8)
              .map(([s, j]) => (
                <Link
                  key={s}
                  href={`/jobs/${s}`}
                  className="bg-card-bg border border-card-border rounded-xl p-3 text-center hover:border-accent/50 transition-colors"
                >
                  <div className="text-sm font-semibold">{j.title}</div>
                  <div className={`text-lg font-bold ${
                    j.risk >= 75 ? "text-danger"
                    : j.risk >= 50 ? "text-warning"
                    : j.risk >= 30 ? "text-accent"
                    : "text-success"
                  }`}>
                    {j.risk}/100
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `Will AI Replace ${job.title}s? AI Risk Score: ${job.risk}/100`,
              description: job.description,
              author: {
                "@type": "Organization",
                name: "SkillShield",
              },
            }),
          }}
        />

        {/* Browse all categories */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            See all{" "}
            <span className="text-accent">{JOB_CATEGORIES.length}</span>{" "}
            job categories analyzed
          </p>
        </div>
      </article>
    </main>
  );
}

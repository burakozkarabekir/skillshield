export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          How safe is your career
          <br />
          <span className="text-[var(--accent)]">from AI?</span>
        </h1>
        <p className="text-xl opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get a research-backed AI Career Risk Score in under 3 minutes.
          Understand which of your skills are at risk, which are safe, and
          exactly what to do about it.
        </p>
        <a
          href="/quiz"
          className="inline-block px-10 py-4 bg-[var(--accent)] text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Take the Free Assessment
        </a>
        <p className="text-sm opacity-40 mt-4">
          10 questions. No signup required.
        </p>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Tell us your role",
              description:
                "Select your job category so we can calibrate against research data for your field.",
            },
            {
              step: "2",
              title: "Answer 10 questions",
              description:
                "Quick, plain-language questions about your daily tasks, skills, and work environment.",
            },
            {
              step: "3",
              title: "Get your score",
              description:
                "See your overall risk score, per-skill breakdown, and personalized reskilling priorities.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm opacity-70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research basis */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          Built on Real Research
        </h2>
        <p className="text-center opacity-60 max-w-2xl mx-auto mb-10">
          Our scoring methodology draws on peer-reviewed research and industry
          analysis — not guesswork.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            "Frey & Osborne — The Future of Employment (Oxford)",
            "McKinsey Global Institute — Automation Research",
            "World Economic Forum — Future of Jobs 2025",
            "O*NET — Occupational Task Breakdowns",
            "Goldman Sachs — AI Sector Exposure Analysis",
            "Brookings Institution — Automation & Workforce",
          ].map((source) => (
            <div
              key={source}
              className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-sm"
            >
              {source}
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          What You&apos;ll Get
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Overall Risk Score (0-100)",
              description:
                "A single number that tells you how exposed your career is to AI automation, calibrated against thousands of occupations.",
            },
            {
              title: "Per-Skill Risk Breakdown",
              description:
                "Each of your core skills rated low, medium, or high risk with an explanation of WHY and the AI capability that threatens it.",
            },
            {
              title: "5-Dimension Analysis",
              description:
                "See how you score across task composition, skill replaceability, industry velocity, experience moat, and human interaction.",
            },
            {
              title: "Reskilling Priorities",
              description:
                "Specific skills to develop, why they matter, estimated learning time, and recommended resources to get started.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]"
            >
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">
                {item.title}
              </h3>
              <p className="text-sm opacity-70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to find out?</h2>
        <p className="opacity-60 mb-8">
          The average person takes 2 minutes and 40 seconds.
        </p>
        <a
          href="/quiz"
          className="inline-block px-10 py-4 bg-[var(--accent)] text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Start the Assessment
        </a>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-xs opacity-30 border-t border-[var(--card-border)]">
        <p>
          SkillShield is an educational tool. Scores are estimates based on
          published research and should inform — not dictate — career decisions.
        </p>
      </footer>
    </main>
  );
}

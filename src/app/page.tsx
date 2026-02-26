import { hero, socialProof, howItWorks, whyThisMatters, faq, footerCta } from "@/copy/landing";

function HeroSection() {
  return (
    <section className="px-6 pt-20 pb-16 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {hero.headlines[0]}
        </h1>
        <p className="mt-6 text-lg text-muted sm:text-xl max-w-2xl mx-auto">
          {hero.subheads[0]}
        </p>
        <div className="mt-10">
          <a
            href="/quiz"
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {hero.ctas[0]}
          </a>
        </div>
        <p className="mt-4 text-sm text-muted">
          Ücretsiz. 7 dakika sürer. Kayıt gerekmez.
        </p>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="border-y border-border bg-card-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          {socialProof.headlines[0]}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {socialProof.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          {socialProof.sourceNote}
        </p>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold">
          {howItWorks.headlines[0]}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <div key={step.number}>
              <p className="text-4xl font-bold text-accent">{step.number}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyThisMattersSection() {
  return (
    <section className="bg-card-bg border-y border-border px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold">{whyThisMatters.headlines[0]}</h2>
        <p className="mt-6 text-muted leading-relaxed">
          {whyThisMatters.body[0]}
        </p>
        <div className="mt-10">
          <a
            href="/quiz"
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {hero.ctas[2]}
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold">{faq.headlines[0]}</h2>
        <div className="mt-12 space-y-8">
          {faq.items.map((item) => (
            <details key={item.question} className="group border-b border-border pb-6">
              <summary className="cursor-pointer text-lg font-medium list-none flex items-center justify-between">
                {item.question}
                <span className="ml-4 text-muted group-open:rotate-45 transition-transform text-xl">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCtaSection() {
  return (
    <section className="bg-foreground text-background px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold">{footerCta.headlines[0]}</h2>
        <p className="mt-4 text-lg opacity-80">{footerCta.subheads[0]}</p>
        <div className="mt-10">
          <a
            href="/quiz"
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {footerCta.ctas[0]}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <HowItWorksSection />
      <WhyThisMattersSection />
      <FAQSection />
      <FooterCtaSection />
    </>
  );
}

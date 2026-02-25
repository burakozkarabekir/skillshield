"use client";

import { premiumCta, emailCapture } from "@/copy/premium";
import { errors, empty } from "@/copy/microcopy";
import { useState } from "react";

export default function PremiumPage() {
  const [paymentError, setPaymentError] = useState(false);

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {premiumCta.headlines[0]}
          </h1>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            {premiumCta.subheads[0]}
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {premiumCta.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card-bg p-6"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Card */}
        <div className="mt-16 rounded-2xl border-2 border-accent bg-card-bg p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold">SkillShield Pro</h2>
          <p className="mt-6 text-5xl font-bold">
            {premiumCta.pricing.amount}
          </p>
          <p className="mt-1 text-muted">{premiumCta.pricing.period}</p>
          <p className="mt-4 text-sm text-muted">
            {premiumCta.pricing.anchoring[1]}
          </p>

          {paymentError ? (
            <div className="mt-8">
              <p className="text-sm text-risk-critical font-medium">
                {errors.paymentFailed.headlines[0]}
              </p>
              <p className="mt-1 text-xs text-muted">
                {errors.paymentFailed.body[0]}
              </p>
              <button
                onClick={() => setPaymentError(false)}
                className="mt-4 rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
              >
                {errors.paymentFailed.cta}
              </button>
            </div>
          ) : (
            <button className="mt-8 rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors">
              {premiumCta.ctas[0]}
            </button>
          )}

          <p className="mt-4 text-xs text-muted">
            {premiumCta.guarantee[1]}
          </p>
        </div>

        {/* Trust / Anchoring */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">{premiumCta.pricing.anchoring[2]}</p>
        </div>
      </div>
    </div>
  );
}

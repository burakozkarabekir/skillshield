"use client";

import { getReferralTier } from "@/lib/referral";

interface ReferralTrackerProps {
  referralCount: number;
  referralCode: string;
}

export default function ReferralTracker({ referralCount, referralCode }: ReferralTrackerProps) {
  const tiers = getReferralTier(referralCount);
  const nextTier = tiers.find((t) => !t.unlocked);

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6 w-full max-w-md">
      <h3 className="font-semibold mb-2">Davet İlerlemen</h3>
      <p className="text-sm text-gray-400 mb-4">
        Ödülleri açmak için özel bağlantını paylaş
      </p>

      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-accent">{referralCount}</div>
        <div className="text-sm text-gray-500">kişi senin bağlantınla kaydoldu</div>
      </div>

      {/* Referral code display */}
      <div className="bg-background rounded-lg p-3 mb-4 text-center">
        <div className="text-xs text-gray-500 mb-1">Davet kodun</div>
        <code className="text-accent font-mono">{referralCode}</code>
      </div>

      {/* Tier progress */}
      <div className="space-y-3">
        {tiers.map((tier) => (
          <div
            key={tier.count}
            className={`flex items-center gap-3 text-sm ${
              tier.unlocked ? "text-success" : "text-gray-500"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                tier.unlocked
                  ? "bg-success/20 text-success"
                  : "bg-card-border text-gray-600"
              }`}
            >
              {tier.unlocked ? "✓" : tier.count}
            </div>
            <div className="flex-1">
              <div className={tier.unlocked ? "line-through" : ""}>{tier.reward}</div>
              <div className="text-xs text-gray-600">{tier.count} davet</div>
            </div>
          </div>
        ))}
      </div>

      {nextTier && (
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500">
            Sonraki ödülü açmak için {nextTier.count - referralCount} davet daha gerekiyor
          </div>
          {/* Progress bar to next tier */}
          <div className="mt-2 h-2 bg-card-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (referralCount / nextTier.count) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

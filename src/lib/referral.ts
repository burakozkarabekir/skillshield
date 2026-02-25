// Referral tracking and viral loop mechanics

export function generateReferralCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function buildShareUrl(baseUrl: string, params: {
  score: number;
  jobTitle: string;
  category: string;
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}): string {
  const url = new URL('/results', baseUrl);
  url.searchParams.set('s', params.score.toString());
  url.searchParams.set('j', encodeURIComponent(params.jobTitle));
  url.searchParams.set('c', params.category);
  if (params.ref) url.searchParams.set('ref', params.ref);
  if (params.utm_source) url.searchParams.set('utm_source', params.utm_source);
  if (params.utm_medium) url.searchParams.set('utm_medium', params.utm_medium);
  if (params.utm_campaign) url.searchParams.set('utm_campaign', params.utm_campaign);
  return url.toString();
}

export function buildLinkedInShareUrl(text: string, url: string): string {
  const shareUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
  shareUrl.searchParams.set('url', url);
  return shareUrl.toString();
}

export function buildTwitterShareUrl(text: string, url: string): string {
  const shareUrl = new URL('https://twitter.com/intent/tweet');
  shareUrl.searchParams.set('text', text);
  shareUrl.searchParams.set('url', url);
  return shareUrl.toString();
}

// Referral reward tiers — gamify sharing
export const REFERRAL_TIERS = [
  { count: 3, reward: 'Detailed AI Impact Timeline for your role', unlocked: false },
  { count: 5, reward: '7-day premium trial (reskilling roadmap)', unlocked: false },
  { count: 10, reward: 'Full month of premium free', unlocked: false },
  { count: 25, reward: 'Lifetime premium access', unlocked: false },
] as const;

export function getReferralTier(referralCount: number) {
  return REFERRAL_TIERS.map(tier => ({
    ...tier,
    unlocked: referralCount >= tier.count,
  }));
}

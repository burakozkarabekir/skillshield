# SkillShield Deployment Guide

## Quick Start (First Deploy)

### 1. Link to Vercel

```bash
npx vercel link
```

### 2. Create Vercel KV Store

```bash
# In Vercel Dashboard → Storage → Create → KV
# This auto-injects KV_REST_API_URL and KV_REST_API_TOKEN
```

### 3. Set Environment Variables

In **Vercel Dashboard → Settings → Environment Variables**, add:

| Variable | Where | Example |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | All | `https://skillshield.dev` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | All | `pk_live_...` |
| `STRIPE_SECRET_KEY` | Production + Preview | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Production | `whsec_...` |

KV variables are auto-injected when you link the KV store.

### 4. Deploy

```bash
git push  # Vercel auto-deploys from GitHub
```

### 5. Domain Setup

```bash
# In Vercel Dashboard → Settings → Domains → Add
# Add: skillshield.dev
# Add: www.skillshield.dev (redirects to apex)
#
# DNS records (at your registrar):
#   A     @    76.76.21.21
#   CNAME www  cname.vercel-dns.com
```

### 6. Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://skillshield.dev/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy signing secret → set as `STRIPE_WEBHOOK_SECRET` in Vercel

---

## Architecture

```
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Vercel CDN │────▶│  Next.js    │────▶│  Vercel KV   │
│  (Edge Cache)│     │  (Serverless)│     │  (Upstash)   │
└──────────────┘     └─────────────┘     └──────────────┘
                           │
                     ┌─────┴─────┐
                     │  Stripe   │
                     │ (Payments)│
                     └───────────┘
```

### Caching Strategy

| Route | Cache | TTL |
|---|---|---|
| `/api/og/*` | Edge (CDN) | 1h, stale-while-revalidate 24h |
| Static assets | CDN | 1 year, immutable |
| API routes | No cache | Rate limited (30 req/min/IP) |
| Marketing pages | ISR (future) | Revalidate every 1h |

### Rate Limiting

- **Right now**: In-memory rate limiter in Edge middleware (30 req/min per IP)
- **At scale (100K+ users)**: Switch to `@upstash/ratelimit` with sliding window

---

## Cost Estimation

### Free Tier (covers MVP + launch)

| Service | Free Limit | Our Usage (est.) |
|---|---|---|
| Vercel Hobby | 100GB bandwidth | ~5GB/mo at launch |
| Vercel KV | 3K commands/day | ~100 quiz completions/day |
| Stripe | 2.9% + 30¢ per txn | Pay as you go |
| Vercel Analytics | 2.5K events/mo | May exceed quickly |

### When to Upgrade ($20-45/mo)

- **Vercel Pro ($20/mo)**: When you need >1 team member, custom headers, or >100GB bandwidth
- **KV Pro ($25/mo)**: When you exceed 3K commands/day (~100 completions/day)
- **Total at 10K users/mo**: ~$45/mo + Stripe fees

---

## Security Checklist (Pre-Launch)

- [ ] All secrets in Vercel env vars (never in code)
- [ ] `.env.local` in `.gitignore`
- [ ] Stripe webhook signature verification enabled
- [ ] Rate limiting active on all API routes
- [ ] Security headers set (X-Frame-Options, CSP, etc.)
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] No sensitive data in client-side bundles
- [ ] `STRIPE_SECRET_KEY` only in server-side code

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars
cp .env.example .env.local
# Fill in values from Vercel Dashboard

# 3. Run dev server
npm run dev

# 4. Stripe webhook testing
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

# HomeBiz Kids — Hermes Takeover Plan

Validated on: 2026-04-30
Repo: https://github.com/sandreu-ai/HomeBiz-Kids
Live site: https://homebizkids.com → https://www.homebizkids.com/

## Current validated state

- Next.js 16.2.4 App Router, React 19, TypeScript strict, Tailwind 4.
- Production build passes locally with `npm run build`.
- Live domain responds on Vercel and redirects apex to `www.homebizkids.com`.
- App currently runs on demo data from `src/lib/demo-data/`.
- Clerk is installed/scaffolded with `/sign-in`, `/sign-up`, and `src/proxy.ts`; real protection activates only when Clerk env vars are present.
- Session/demo state is still simulated through `src/providers/DemoSessionProvider.tsx` until Clerk users are mapped to persisted family records.
- Prisma schema exists in `prisma/schema.prisma`, but database is not wired.
- There was no `.env.example` even though the README instructs `cp .env.example .env.local`; this has now been added.

## Non-negotiable product rules

- This is not a chore tracker. Keep the framing as a family marketplace that rewires the brain.
- No fiat/real-money wallet inside the app. Stripe is only for the subscription. Tokens stay virtual.
- No public kid profiles, public marketplace, or stranger interaction.
- Parent-owned account model: children are profiles under a parent account and do not need email addresses.
- Preserve a demo/marketing mode for screenshots and product walkthroughs.
- Keep plan gates centralized in `src/lib/plan.ts`.

## Brand kit rules

### Wordmark color sequence

Use the HomeBiz Kids letter-by-letter wordmark color sequence:

```text
H = Blue        o = Red       m = Yellow    e = Blue
B = Green      i = Red       z = Yellow
K = Blue       i = Yellow    d = Green     s = Red
```

Rule: order rotates Blue → Red → Yellow → Green; never two adjacent letters in the same color.

### Voice rules — marketing and in-product copy

1. Talk to kids like young entrepreneurs. Talk to parents like adults.
2. Praise the action, never the personality.
3. Use Caveat once or twice per surface — never as a heading by itself.
4. Pastel = emotion. Blue = trust. Yellow = reward. Green = success. Red = decline only.
5. One primary action per card. Counteroffer is a 1st-class citizen.

## Phase 1 — Make accounts real

Goal: replace demo-only state with real parent accounts, child profiles, family data, and persisted forms.

Recommended sequence:

1. Tests/tooling before production wiring. ✅
   - Vitest baseline exists via `npm test`.
   - Safety/product rule tests guard parent-owned child profiles and no-fiat-token architecture.
   - Clerk setup tests guard auth routes, provider wrapping, env placeholders, and proxy protection.

2. Clerk scaffold. ✅
   - Parent sign-up/sign-in routes exist at `/sign-up` and `/sign-in`.
   - `src/proxy.ts` protects `/dashboard`, `/child`, and `/trusted` when Clerk keys are configured.
   - Child profiles remain internal database records under the parent's family.
   - Trusted adults can be invited later; do not let them see unrelated family data.
   - Still needed: real Clerk env vars and mapping Clerk user IDs to family/user records.

3. Add Neon/Postgres.
   - Set `DATABASE_URL`.
   - Run `npx prisma generate` and `npx prisma db push` after schema review.
   - Create `prisma/seed.ts` that mirrors demo data for development/demo accounts.

4. Add a Prisma client helper.
   - Example target: `src/lib/prisma.ts`.
   - Keep it server-only.

5. Replace demo reads incrementally.
   - Start with family/session resolution.
   - Then jobs.
   - Then proposals/pitches.
   - Then invoices and wallet transactions.
   - Then rewards/savings/reports.

6. Add server actions in stable files.
   - `src/actions/jobs.ts`
   - `src/actions/proposals.ts`
   - `src/actions/invoices.ts`
   - `src/actions/rewards.ts`
   - `src/actions/family.ts`

## Phase 2 — Photos and subscription billing

1. Photo proof backend.
   - Wire `PhotoUploadCard` to UploadThing or Supabase Storage.
   - Do not expose uploaded kid/family images publicly.
   - Store only scoped URLs/keys associated with the family/job/invoice.

2. Stripe subscription.
   - Pricing CTAs go to Stripe Checkout for Family plan only.
   - Add webhook route for subscription lifecycle and update `Family.plan`.
   - Billing must not interact with in-app token balances.

## Phase 3 — Polish and retention

- PDF homeschool portfolio export with `@react-pdf/renderer`.
- Resend trusted adult invites.
- PWA push notifications for parent alerts on submitted invoices/pitches.
- Notification preferences page.
- New-family onboarding flow.

## Known technical notes

- `npm audit --audit-level=moderate` reports moderate vulnerabilities under Next/Prisma dependency trees. The automatic fixes suggest breaking downgrades, so do not run `npm audit fix --force` blindly.
- A Vitest baseline now exists via `npm test`.
- `src/lib/safety/product-rules.test.ts` codifies core child-safety/product constraints so future schema/type changes cannot accidentally reintroduce in-app fiat wallets or require child email accounts.
- `src/lib/auth/clerk-setup.test.ts` codifies Clerk integration expectations: dependency installed, provider wraps the app when configured, `/sign-in` and `/sign-up` exist, `src/proxy.ts` protects app sections, and `.env.example` uses placeholders only.
- `src/providers/index.tsx` intentionally runs without `ClerkProvider` when `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is absent so local demo mode and Vercel preview builds do not crash before Clerk env vars are installed.
- `src/proxy.ts` uses the Next.js 16 proxy convention instead of deprecated `middleware.ts`; it passes through while Clerk keys are absent and protects `/dashboard`, `/child`, and `/trusted` once both Clerk keys exist.
- Prisma 7 uses `prisma.config.ts` for `DATABASE_URL`; keep `datasource db` in `prisma/schema.prisma` provider-only unless the Prisma version is intentionally changed.
- Keep demo data available for marketing and screenshots, but gate demo-switcher behavior outside production unless intentionally enabled for demos.

## Access needed from Santiago when implementation begins

- Vercel project access for deployment/env vars.
- Clerk project keys so Clerk can be activated locally/Vercel: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
- Neon/Postgres access after database is created.
- Stripe test-mode access before billing integration.
- Domain registrar access is not needed unless DNS changes are required.

# HomeBiz Kids

> A family marketplace that rewires the brain!

HomeBiz Kids helps parents form capable, goal-oriented, generous children while bringing more peace to the home. Parents create missions around household help, sibling service, social courage, detailed follow-through, and delayed gratification; kids can also pitch work they notice and learn to create value instead of only trading time for money.

Built with Next.js 16, TypeScript, Tailwind 4, Clerk auth scaffolding, and a fully designed Prisma schema. Currently runs on demo data, with production-readiness checks, Prisma/Postgres adapter scaffolding, and parent onboarding prepared for when Clerk keys and a real database are added.

[![Built with Next.js](https://img.shields.io/badge/Built_with-Next.js_16-blue)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue)](https://tailwindcss.com)

---

## Getting Started

```bash
npm install
cp .env.example .env.local       # fill in Clerk keys and DATABASE_URL when connecting services
npm run dev                      # http://localhost:3000
```

The app runs entirely on demo data in `src/lib/demo-data/`. **No database required to run locally.**

A floating **Demo User Switcher** (bottom-right of every page) lets you toggle between four demo personas:
- **Santiago** — parent → `/dashboard`
- **Daniel** — child, age 12 → `/child`
- **Mateo** — child, age 9 → `/child`
- **Grandpa Joe** — trusted adult → `/trusted`

---

## What's Inside

### Three role-based experiences
- **Parent dashboard** (`/dashboard`) — overview, formation missions, pitch reviews, invoice/reflection approvals, family management, reward store, weekly reports, badges, homeschool portfolio export, family economy settings
- **Child app** (`/child`) — visually distinct playful “tiny business HQ,” selectable illustrated kid avatars, mission board, **Make Your Pitch** flow, wallet, savings goals, badges, rewards, work history
- **Trusted adult portal** (`/trusted`) — propose encouragement/mission opportunities (parent-approval gated)

### Signature features
1. **6-step Job Pitch flow** (`/child/propose`) — Problem → Why it matters → Solution → Details → Reward → Proof
2. **Counteroffer system** — parents coach scope, standards, and reward
3. **Quality checklists** — define what “done with care” means before work starts
4. **Bonus selector** + **praise bank** — reward specific action, not personality
5. **Skill badges** — Initiative, Follow-Through, Diligence, Stewardship, Courage, Service, Negotiator, etc.
6. **Savings goals** — delayed gratification with visible progress
7. **Family economy settings** — tokens / privileges / physical chips, custom token name, feature toggles
8. **Age-based job suggestions** (5–7 / 8–10 / 11–14 / 15+) — auto-fill the create-job form
9. **Weekly family report** — per-child summaries, top skill, suggested jobs next week
10. **Homeschool portfolio export** — exportable preview of skills, badges, reflections, parent notes
11. **Revision flow** — `REVISION_REQUESTED` invoice status, child-side resubmit
12. **Before/after photo proof** — camera-first proof, standards, reflection, side-by-side comparison, and simple child invoices that carry the before photo into parent review
13. **Illustrated kid identity** — children choose from a small set of boy/girl character avatars used across the child portal

### Token-only currency model
HomeBiz Kids does **not** handle real money. Tokens are virtual. Parents define what tokens unlock in their family — privileges, treats, experiences, savings goals, or rewards handled entirely outside the app. This keeps the product child-safe, parent-controlled, and free of in-app payment-processing complexity.

### Public marketing site
- Landing (`/`) · Pricing (`/pricing`) · About (`/about`) · Privacy (`/privacy`) · Terms (`/terms`)

---

## Pricing Tiers

| | Free | Family |
|---|---|---|
| **Price** | $0 forever | $8.99/mo or $89/year |
| Children | 1 | Unlimited |
| Active missions | 3 / month | Unlimited |
| Work history | 30 days | Forever |
| Reward store | ✓ | ✓ |
| Savings goals | ✓ | ✓ |
| Before/after photos | — | ✓ |
| Child-created value pitches | — | ✓ |
| Quality checklists & bonuses | — | ✓ |
| Trusted adults (up to 4) | — | ✓ |
| Weekly reports | — | ✓ |
| Homeschool portfolio export | — | ✓ |

Plan limits live in [`src/lib/plan.ts`](src/lib/plan.ts).

---

## Tech Stack

- **Framework**: Next.js 16 App Router (Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4 (CSS-first config in `globals.css`)
- **UI primitives**: Custom shadcn-style components built on Radix UI
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Fonts**: DM Sans, Caveat, DM Mono via `next/font`
- **Database (scaffolded, not activated)**: Prisma 7 + PostgreSQL using `@prisma/adapter-pg`; full schema in [`prisma/schema.prisma`](prisma/schema.prisma), server-only client helper in `src/lib/db.ts`, and parent/family session scaffold in `src/lib/family/parent-family-session.ts`
- **Auth (scaffolded)**: Clerk via `@clerk/nextjs`; `src/proxy.ts` protects app sections once Clerk keys are configured, while local/no-key mode falls back to demo sessions
- **Session/demo state**: `DemoSessionProvider` powers the current demo data until persisted family records replace it
- **PWA**: installable on iOS, Android, and desktop via `manifest.json`

---

## Project Structure

```
homebiz-kids/
├── prisma/schema.prisma          # Full Prisma schema (23 models)
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── logo.svg                  # HomeBiz Kids logomark
│   └── icons/                    # PWA icon sizes
├── scripts/gen-icons.mjs         # PWA icon generator (run once)
└── src/
    ├── app/                      # All routes (Next.js App Router), including /sign-in, /sign-up, and /onboarding
    ├── proxy.ts                  # Clerk route protection; pass-through until Clerk keys exist
    ├── components/
    │   ├── ui/                   # shadcn-style primitives
    │   ├── ui-custom/            # EmptyState, PageHeader, UpgradeBanner, etc.
    │   ├── layout/               # AppShell, sidebars, navs, public nav/footer
    │   ├── job/                  # JobCard, QualityChecklist, ChecklistEditor, JobSuggestionPanel
    │   ├── invoice/              # InvoiceCard, BonusSelector, PraiseBankSelector, InvoiceReviewActions
    │   ├── proposal/             # ProposalCard, JobPitchForm, PitchReviewCard, CounterOfferForm
    │   ├── child/                # AvatarPicker and illustrated child portal identity components
    │   ├── proof/                # BeforeAfterComparison, PhotoUploadCard
    │   ├── wallet/               # WalletSummary
    │   ├── rewards/              # RewardCard
    │   ├── family/               # ChildProfileCard, TrustedAdultCard
    │   ├── badges/               # SkillBadgeCard
    │   ├── savings/              # SavingsGoalCard
    │   ├── economy/              # FamilyEconomyForm
    │   ├── reports/              # WeeklyFamilyReport
    │   ├── dashboard/            # DashboardCard, ActivityFeed
    │   └── dev/                  # DemoUserSwitcher
    ├── lib/
    │   ├── child-portal/         # Avatar options and child-portal regression tests
    │   ├── demo-data/            # All seed data
    │   ├── plan.ts               # Free/Family plan limits
    │   └── utils.ts              # cn(), formatters, status colors
    ├── providers/
    │   └── DemoSessionProvider.tsx
    └── types/
        └── index.ts              # All shared types
```

---

## Wiring Clerk Auth

Clerk is installed and scaffolded, but real hosted sign-in/sign-up appears only after keys are added.

1. Create a Clerk application.
2. Copy `.env.example` to `.env.local`.
3. Set:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - keep `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
   - keep `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
   - keep `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
   - keep `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`
4. Add the same values in Vercel Project Settings → Environment Variables.

Until both required keys exist, `src/providers/index.tsx` keeps the app in demo/no-key mode and `src/proxy.ts` passes requests through. Once keys are present, `/dashboard`, `/child`, and `/trusted` are protected by Clerk while marketing routes remain public.

---

## Wiring a Real Database

```bash
# 1. Set DATABASE_URL in .env.local
# 2. Validate the Prisma 7 config + schema
npx prisma validate
# 3. Generate Prisma client + push schema
npx prisma generate
npx prisma db push
# 4. (Optional) Write prisma/seed.ts based on src/lib/demo-data/, then:
npx prisma db seed
```

Prisma 7 reads the database URL from `prisma.config.ts`, which loads `.env.local` first and then `.env`.

To swap demo reads for real Prisma reads, replace each page's `DEMO_*` import with a Prisma query in a Server Component or Server Action. Component props and types stay identical.

---

## Deploy

Fastest path is **Vercel**:

```bash
git init
git add .
git commit -m "Initial commit: HomeBiz Kids"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/homebiz-kids.git
git push -u origin main
```

Then go to [vercel.com/new](https://vercel.com/new), import the repo, and click Deploy. Vercel auto-detects Next.js and uses sane defaults.

**Custom domain**: Vercel dashboard → Settings → Domains. Cost is whatever your registrar charges (~$12/year for `.com`).

---

## Roadmap to Production

- **Auth + onboarding** — Clerk is scaffolded (`@clerk/nextjs`, `/sign-in`, `/sign-up`, guarded `src/proxy.ts`); `/onboarding` now guides the parent from service readiness to the first child profile while preserving no-key demo mode
- **Database** — connect Neon, Supabase, or any Postgres host, then run `npx prisma generate` and `npx prisma db push`; `User.clerkUserId` and the server-only parent/family scaffold are ready for Clerk mapping
- **Photo uploads** — wire `PhotoUploadCard` to UploadThing or Supabase Storage
- **Stripe** — connect Pricing page CTAs to Stripe Checkout for the Family plan
- **PDF export** — implement homeschool portfolio export with `@react-pdf/renderer`
- **Email** — Resend for trusted adult invites
- **Push notifications** — parent alerts via PWA service worker

---

## Privacy

HomeBiz Kids is built privacy-first for kids:
- Children don't need email addresses
- No ads in the child portal
- No public profiles, no marketplace, no stranger interaction
- No fiat money exchange — all currency is virtual tokens
- Parent owns the family account and controls every permission

See [`/privacy`](src/app/privacy/page.tsx) for the full policy.

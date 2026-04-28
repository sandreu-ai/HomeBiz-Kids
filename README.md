# HomeBiz Kids

> Your kids do the work. You get your weekends back.

HomeBiz Kids turns everyday family work into a real economy. Kids spot jobs, pitch a price, do the work, and send their parent an invoice. They learn responsibility and entrepreneurship — parents get a cleaner house and time to think.

Built with Next.js 16, TypeScript, Tailwind 4, and a fully designed Prisma schema. Currently runs on demo data — connect a real Postgres database when ready.

[![Built with Next.js](https://img.shields.io/badge/Built_with-Next.js_16-blue)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue)](https://tailwindcss.com)

---

## Getting Started

```bash
npm install
cp .env.example .env.local       # fill in DATABASE_URL when connecting Postgres
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
- **Parent dashboard** (`/dashboard`) — overview, jobs, pitch reviews, invoice approvals, family management, reward store, weekly reports, badges, homeschool portfolio export, family economy settings
- **Child app** (`/child`) — home, job board, **Make Your Pitch** flow, wallet, savings goals, badges, rewards, work history
- **Trusted adult portal** (`/trusted`) — propose jobs (parent-approval gated)

### Signature features
1. **6-step Job Pitch flow** (`/child/propose`) — Problem → Why it matters → Solution → Details → Reward → Proof
2. **Counteroffer system** — parents negotiate scope and reward
3. **Quality checklists** — define what "done" means
4. **Bonus selector** + **praise bank** — reward excellence
5. **Skill badges** — Initiative, Follow-Through, Diligence, Negotiator, etc.
6. **Savings goals** — delayed gratification with progress bar
7. **Family economy settings** — tokens / privileges / physical chips, custom token name, feature toggles
8. **Age-based job suggestions** (5–7 / 8–10 / 11–14 / 15+) — auto-fill the create-job form
9. **Weekly family report** — per-child summaries, top skill, suggested jobs next week
10. **Homeschool portfolio export** — exportable preview of skills, badges, reflections, parent notes
11. **Revision flow** — `REVISION_REQUESTED` invoice status, child-side resubmit
12. **Before/after photo proof** — placeholder uploader + side-by-side comparison

### Token-only currency model
HomeBiz Kids does **not** handle real money. Tokens are virtual. Parents define what tokens are worth in their family — privileges, treats, or informal cash conversion that happens entirely outside the app. This keeps everything child-safe, COPPA-friendly, and free of payment-processing complexity.

### Public marketing site
- Landing (`/`) · Pricing (`/pricing`) · About (`/about`) · Privacy (`/privacy`) · Terms (`/terms`)

---

## Pricing Tiers

| | Free | Family |
|---|---|---|
| **Price** | $0 forever | $8.99/mo or $89/year |
| Children | 1 | Unlimited |
| Active jobs | 3 / month | Unlimited |
| Work history | 30 days | Forever |
| Reward store | ✓ | ✓ |
| Savings goals | ✓ | ✓ |
| Before/after photos | — | ✓ |
| Child-created pitches | — | ✓ |
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
- **Database (defined, not wired)**: Prisma + PostgreSQL — full schema in [`prisma/schema.prisma`](prisma/schema.prisma)
- **Session**: `DemoSessionProvider` (drop-in replaceable with Clerk/NextAuth/Supabase)
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
    ├── app/                      # All routes (Next.js App Router)
    ├── components/
    │   ├── ui/                   # shadcn-style primitives
    │   ├── ui-custom/            # EmptyState, PageHeader, UpgradeBanner, etc.
    │   ├── layout/               # AppShell, sidebars, navs, public nav/footer
    │   ├── job/                  # JobCard, QualityChecklist, ChecklistEditor, JobSuggestionPanel
    │   ├── invoice/              # InvoiceCard, BonusSelector, PraiseBankSelector, InvoiceReviewActions
    │   ├── proposal/             # ProposalCard, JobPitchForm, PitchReviewCard, CounterOfferForm
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
    │   ├── demo-data/            # All seed data
    │   ├── plan.ts               # Free/Family plan limits
    │   └── utils.ts              # cn(), formatters, status colors
    ├── providers/
    │   └── DemoSessionProvider.tsx
    └── types/
        └── index.ts              # All shared types
```

---

## Wiring a Real Database

```bash
# 1. Set DATABASE_URL in .env.local
# 2. Generate Prisma client + push schema
npx prisma generate
npx prisma db push
# 3. (Optional) Write prisma/seed.ts based on src/lib/demo-data/, then:
npx prisma db seed
```

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

- **Auth** — replace `DemoSessionProvider` with Clerk (`@clerk/nextjs`)
- **Database** — connect Neon, Supabase, or any Postgres host
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

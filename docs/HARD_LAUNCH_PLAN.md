# HomeBiz Kids Hard Launch Plan

Status: operator plan for the next public/private beta push.

## Candid launch call

HomeBiz Kids is not ready for a broad paid public launch yet. It is now much closer to a credible private beta: parent auth/database scaffolding exists, first-family onboarding exists, dashboard/children/jobs have family-scoped seams, and the PWA/App Store/Google Play path is clarified.

The right launch tomorrow is a **controlled PWA beta with 1-3 known families**, not App Store/Google Play submission and not paid Stripe checkout.

## Must-have gates before inviting beta families

1. **One real parent account can complete onboarding**
   - Clerk keys configured in production.
   - Postgres `DATABASE_URL` configured in production.
   - Parent signs up, creates family, adds first child without child email.
   - Dashboard cards and Children page show the persisted records.

2. **Parent jobs are real enough for beta**
   - Parent can create a job from `/dashboard/jobs/new`.
   - Job persists under the parent family only.
   - Jobs list and job detail read from the family-scoped data seam.
   - No cross-family leakage.

3. **Privacy and child safety are preserved**
   - Children remain parent-owned profiles.
   - No public kid profiles.
   - No stranger marketplace.
   - No real-money child wallet or cash payout framing.
   - Token economy remains family-defined and virtual.

4. **Mobile install path works as PWA**
   - `public/manifest.json` is privacy-safe and installable.
   - iPhone: Safari → Share → Add to Home Screen.
   - Android: Chrome → Install app / Add to Home screen.
   - App Store / Google Play are later distribution tracks, not tomorrow's blocker.

5. **Legal basics are visible**
   - `/privacy` and `/terms` load.
   - Copy avoids implying child public profiles, paid marketplace access, or financial services.

## Stretch gates, not launch blockers

- Stripe subscription checkout.
- Apple Pay / Google Pay wallet checkout.
- Apple App Store / Google Play native wrapper submission.
- Trusted adult production workflow.
- Full invoice/proof upload backend.
- Homeschool portfolio export from live data.
- Rewards/settings/reports live-data replacement.

## Tomorrow execution order

1. Configure production Clerk + database env privately; do not paste secrets into chat or git.
2. Run Prisma validation/generate and production build.
3. Create a real parent account and first family/child in production.
4. Create one real parent job and verify it appears in list/detail after reload.
5. Mobile smoke test on iPhone Safari and Android Chrome if available.
6. Invite 1-3 trusted families with the positioning: “private beta, PWA install, parent-supervised token economy.”

## Current remaining demo surfaces

The following are still demo-first and should not be oversold as production-complete:

- Parent: proposals, invoices, rewards, settings, reports, homeschool portfolio, family page, child detail page.
- Child: jobs, invoices, revisions, rewards, savings, wallet, work history, reports.
- Trusted adult portal: jobs/proposals.

## Messaging guardrails

Use:
- “Private family app”
- “PWA beta”
- “Parent-owned child profiles”
- “Virtual family tokens”
- “Apple App Store / Google Play later”

Avoid:
- “App Store ready”
- “Apple Pay checkout”
- “Public marketplace”
- “Kids earn money in the app”
- “Fully production-ready”

## Verification run from this milestone

- `npm test` — passing.
- `npm run build` — passing.
- `npx prisma validate` — passing.
- Secret scan of changed files — no obvious secrets found.

import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, KeyRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeFirstFamilyOnboarding } from "@/app/onboarding/actions";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";

function SetupCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof KeyRound;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-tint text-blue-deep">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-xl font-black text-ink">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-ink-3">{children}</div>
    </div>
  );
}

export default async function OnboardingPage() {
  const status = await getParentFamilySessionStatus();

  return (
    <main className="min-h-screen bg-bone px-4 py-12 text-ink sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-deep">
            Parent onboarding
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Set up your real family account.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-3">
            This is the bridge from polished demo to real product: parent account,
            family record, then child profiles. children stay as parent-owned profiles
            and do not need email accounts.
          </p>
        </div>

        {status.status === "needs-clerk" && (
          <SetupCard icon={KeyRound} title="Step 1: add Clerk keys">
            <p>
              Clerk routes are installed, but the app still needs the publishable and secret keys
              before real parent sign-up can be activated.
            </p>
            <ul className="mt-4 space-y-2">
              {status.missing.map((key) => (
                <li key={key} className="flex items-center gap-2 font-mono text-xs text-ink">
                  <CheckCircle2 className="h-4 w-4 text-yellow-ink" /> {key}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-5">
              <Link href="/sign-up">
                Go to sign-up route <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </SetupCard>
        )}

        {status.status === "needs-database" && (
          <SetupCard icon={Database} title="Step 2: connect Postgres">
            <p>
              Clerk is configured, but the database is not ready. Add `DATABASE_URL`, then
              Prisma can create the parent-owned family records.
            </p>
          </SetupCard>
        )}

        {status.status === "signed-out" && (
          <SetupCard icon={KeyRound} title="Step 1: create your parent login">
            <p>Sign up as the parent first. Children are added later as profiles under you.</p>
            <Button asChild className="mt-5">
              <Link href="/sign-up">
                Create parent account <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </SetupCard>
        )}

        {status.status === "ready" && (
          <SetupCard icon={Users} title="Step 3: Add your first child profile">
            <p>
              Your parent login is available. Create the family workspace, then add your
              first child profile. Keep it lightweight: name and age only to start.
            </p>
            <form action={completeFirstFamilyOnboarding} className="mt-5 space-y-5 rounded-2xl border border-blue-soft bg-blue-tint p-5">
              <div className="space-y-2">
                <Label htmlFor="familyName">Family workspace name</Label>
                <Input
                  id="familyName"
                  name="familyName"
                  required
                  placeholder="The Andreu Family"
                  autoComplete="organization"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                <div className="space-y-2">
                  <Label htmlFor="childName">First child name</Label>
                  <Input
                    id="childName"
                    name="childName"
                    required
                    placeholder="Mateo"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childAge">Age</Label>
                  <Input
                    id="childAge"
                    name="childAge"
                    required
                    type="number"
                    min={3}
                    max={18}
                    inputMode="numeric"
                    placeholder="9"
                  />
                </div>
              </div>

              <p className="rounded-2xl bg-white p-4 text-xs font-semibold text-ink-3">
                Children stay as parent-owned profiles. They do not need separate login accounts,
                and this setup avoids public profiles or payment-style identity fields.
              </p>

              <Button type="submit" size="lg">
                Create my family workspace <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </SetupCard>
        )}

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/dashboard" className="font-bold text-blue-deep hover:underline">
            View demo dashboard
          </Link>
          <Link href="/" className="font-bold text-blue-deep hover:underline">
            Back to marketing site
          </Link>
        </div>
      </div>
    </main>
  );
}

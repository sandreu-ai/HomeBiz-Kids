import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

function ClerkNotConfigured() {
  return (
    <main className="min-h-screen bg-bone px-6 py-16 text-ink">
      <div className="mx-auto max-w-xl rounded-3xl border border-mud/20 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
          Auth setup pending
        </p>
        <h1 className="mt-3 text-3xl font-black">Clerk keys are needed to sign in.</h1>
        <p className="mt-4 text-ink/70">
          The HomeBiz Kids sign-in route is wired. Add your Clerk publishable and secret keys to
          the environment, then this page will show the hosted sign-in form.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 font-bold text-white">
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <ClerkNotConfigured />;
  }

  return (
    <main className="min-h-screen bg-bone px-6 py-16">
      <div className="mx-auto flex max-w-5xl justify-center">
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}

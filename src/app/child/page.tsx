"use client";

import Link from "next/link";
import { useSession } from "@/providers/DemoSessionProvider";
import { WalletSummary } from "@/components/wallet/WalletSummary";
import { JobCard } from "@/components/job/JobCard";
import { SavingsGoalCard } from "@/components/savings/SavingsGoalCard";
import { SkillBadgeCard } from "@/components/badges/SkillBadgeCard";
import { AvatarPicker, LittleIllustratedKid } from "@/components/child/AvatarPicker";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { ArrowRight, Camera, Sparkles, Star } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";
import { getKidAvatarOption } from "@/lib/child-portal/avatar-options";

export default function ChildHomePage() {
  const { session } = useSession();
  const profile = session.childProfile;

  if (!profile) {
    return (
      <div className="text-center p-8">
        <p className="text-ink-3">Switch to a child user to see this page.</p>
      </div>
    );
  }

  const firstName = session.user.name.split(" ")[0];
  const availableJobs = DEMO_JOBS.filter((j) => j.status === "OPEN").slice(0, 3);
  const activeBadges = profile.badges?.filter((b) => !b.earned).slice(0, 2) ?? [];
  const selectedAvatar = getKidAvatarOption(profile.id === "child-mateo" ? "avatar-boy-green-curls" : "avatar-boy-blue-wave");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border-4 border-ink bg-white p-5 shadow-pop sm:p-7">
        <div className="absolute right-4 top-4 rotate-6 rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-black text-yellow-ink shadow-soft">
          sticker-style
        </div>
        <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-yellow-tint px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-yellow-ink">
              <Star className="h-3.5 w-3.5 fill-yellow text-yellow-deep" />
              Problem-solving station
            </div>
            <div>
              <p className="text-sm font-bold text-ink-3">Welcome back, {firstName}.</p>
              <h1 className="mt-1 text-4xl font-black leading-[0.95] text-ink sm:text-5xl">
                <span className="sr-only">Where kids make a difference</span>
                <span aria-hidden="true">Where kids make a <span className="script text-red-deep underline decoration-yellow decoration-8 underline-offset-[-2px]">difference</span>.</span>
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-ink-3 sm:text-base">
              Solve a problem today: notice what someone needs, make a helpful plan, do careful work, snap proof, and show the difference you made.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="gold" className="border-2 border-ink shadow-cta-yellow">
                <Link href="/child/propose">
                  Solve a Problem
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-ink bg-white">
                <Link href="/child/jobs">
                  Find a Way to Help
                  <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-64 w-full max-w-sm items-end justify-center rounded-[2rem] bg-blue-tint p-5">
            <div className="absolute left-3 top-4 -rotate-6 rounded-full border-2 border-ink bg-green px-3 py-1 text-xs font-black text-white">
              +10
            </div>
            <div className="absolute right-6 top-8 rotate-6 rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-black text-yellow-ink">
              easy!!
            </div>
            <div className="rounded-[2rem] border-4 border-ink bg-white p-4 shadow-pop">
              <LittleIllustratedKid avatar={selectedAvatar} size="xl" />
            </div>
            <div className="absolute bottom-4 right-4 rounded-2xl border-2 border-ink bg-white px-3 py-2 shadow-card">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-deep">Playful avatar</p>
              <p className="text-xs font-bold text-ink">This is your character.</p>
            </div>
          </div>
        </div>
      </section>

      <AvatarPicker selectedId={selectedAvatar.id} />

      <WalletSummary profile={profile} />

      <Link
        href="/child/jobs"
        className="block rounded-3xl border-4 border-ink bg-gradient-to-br from-yellow-tint to-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop group"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-yellow text-2xl shadow-sm">
            <Camera className="h-7 w-7 text-yellow-ink" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-xs font-black uppercase tracking-wider text-yellow-ink">
              Start with proof
            </p>
            <h3 className="text-lg font-black text-ink">Take a before photo when you accept a job</h3>
            <p className="mt-0.5 text-sm text-ink-3">
              Your before picture can carry into the invoice so your parent sees the transformation.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-yellow-ink transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <SectionHeader title="Jobs you can claim" subtitle="Pick work that creates real value">
              <Button asChild variant="ghost" size="sm">
                <Link href="/child/jobs">All jobs</Link>
              </Button>
            </SectionHeader>
            <div className="space-y-3">
              {availableJobs.map((j) => <JobCard key={j.id} job={j} viewAs="child" />)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {profile.activeSavingsGoal && (
            <div>
              <SectionHeader title="Saving for...">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/child/savings-goals">Manage</Link>
                </Button>
              </SectionHeader>
              <SavingsGoalCard goal={profile.activeSavingsGoal} />
            </div>
          )}

          {activeBadges.length > 0 && (
            <div>
              <SectionHeader title="Badges in progress">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/child/badges">All</Link>
                </Button>
              </SectionHeader>
              <div className="space-y-3">
                {activeBadges.map((b) => <SkillBadgeCard key={b.badgeCode} childBadge={b} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-blue-soft bg-blue-tint p-6 text-center">
        <Sparkles className="mx-auto mb-2 h-6 w-6 text-blue-deep" />
        <p className="text-sm font-black text-blue-deep">Build your work streak</p>
        <p className="mt-1 text-xs text-ink-3">
          You're on day {profile.streak}. Every completed job is proof that you can do hard things.
        </p>
      </div>
    </div>
  );
}

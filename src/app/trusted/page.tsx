"use client";

import Link from "next/link";
import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job/JobCard";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { Plus, Heart } from "lucide-react";
import { DEMO_JOBS, DEMO_CHILD_PROFILES } from "@/lib/demo-data";

export default function TrustedHomePage() {
  const { session } = useSession();
  const myJobs = DEMO_JOBS.filter((j) => j.postedById === session.user.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title={`Welcome, ${session.user.name.split(" ")[0]}!`}
        subtitle="Help shape the kids' work life. Your jobs need parent approval before they go live."
      >
        <Button asChild>
          <Link href="/trusted/jobs/new">
            <Plus className="w-4 h-4" />
            Post a Job
          </Link>
        </Button>
      </PageHeader>

      <div className="bg-blue-tint border border-blue-soft rounded-2xl p-5 flex items-start gap-3">
        <Heart className="w-5 h-5 text-blue-deep mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-ink">You're a Trusted Adult.</p>
          <p className="text-sm text-ink-3 mt-1">
            Your role: encourage, post helpful jobs, and celebrate good work.
            Parents approve all your job posts before kids see them.
          </p>
        </div>
      </div>

      <div>
        <SectionHeader title="The kids" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.values(DEMO_CHILD_PROFILES).map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-line shadow-card p-4 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: p.user.avatarColor ?? "#6E9BCB" }}
              >
                {p.user.name[0]}
              </div>
              <div>
                <p className="font-semibold text-ink">{p.user.name}</p>
                <p className="text-xs text-ink-3">Age {p.age} · {p.completedJobsCount} jobs done</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Your posted jobs" />
        {myJobs.length === 0 ? (
          <p className="text-sm text-ink-3 text-center py-8">
            You haven't posted any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {myJobs.map((j) => <JobCard key={j.id} job={j} viewAs="trusted" />)}
          </div>
        )}
      </div>
    </div>
  );
}

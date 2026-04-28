"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { JobCard } from "@/components/job/JobCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Plus, Briefcase } from "lucide-react";
import Link from "next/link";
import { DEMO_JOBS } from "@/lib/demo-data";

export default function TrustedJobsPage() {
  const { session } = useSession();
  const myJobs = DEMO_JOBS.filter((j) => j.postedById === session.user.id);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Your Jobs" subtitle="Jobs you've posted to the family">
        <Button asChild>
          <Link href="/trusted/jobs/new">
            <Plus className="w-4 h-4" />
            Post a Job
          </Link>
        </Button>
      </PageHeader>

      {myJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          heading="Post your first job"
          subtext="Help shape the kids' work life by suggesting something meaningful."
          actionLabel="Post a Job"
          actionHref="/trusted/jobs/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myJobs.map((j) => <JobCard key={j.id} job={j} viewAs="trusted" />)}
        </div>
      )}
    </div>
  );
}

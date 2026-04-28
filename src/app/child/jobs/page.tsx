"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { JobCard } from "@/components/job/JobCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Briefcase } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";

export default function ChildJobsPage() {
  const { session } = useSession();
  const userId = session.user.id;

  const available = DEMO_JOBS.filter((j) => j.status === "OPEN");
  const myActive = DEMO_JOBS.filter(
    (j) => j.claimedById === userId && ["CLAIMED", "IN_PROGRESS"].includes(j.status)
  );
  const submitted = DEMO_JOBS.filter(
    (j) => j.claimedById === userId && j.status === "SUBMITTED"
  );

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Job Board"
        subtitle="Pick your next job and earn what you've worked for"
      />

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available ({available.length})</TabsTrigger>
          <TabsTrigger value="my-jobs">My Jobs ({myActive.length})</TabsTrigger>
          <TabsTrigger value="waiting">Waiting Review ({submitted.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          {available.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              heading="No jobs available right now"
              subtext="Check back later, or pitch your own job!"
              actionLabel="Make Your Pitch"
              actionHref="/child/propose"
            />
          ) : (
            <div className="space-y-3">
              {available.map((j) => <JobCard key={j.id} job={j} viewAs="child" />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-jobs">
          {myActive.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              heading="No active jobs"
              subtext="Claim a job from the board to get started."
            />
          ) : (
            <div className="space-y-3">
              {myActive.map((j) => <JobCard key={j.id} job={j} viewAs="child" />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="waiting">
          {submitted.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              heading="No pending submissions"
              subtext="Submit a finished job to see it here."
            />
          ) : (
            <div className="space-y-3">
              {submitted.map((j) => <JobCard key={j.id} job={j} viewAs="child" />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

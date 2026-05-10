import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job/JobCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Plus, Briefcase } from "lucide-react";
import { getParentJobs } from "@/lib/family/jobs-data";
import type { Job } from "@/types";

function JobGrid({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        heading="No jobs here yet"
        subtext="Jobs posted by parents or trusted adults will appear here."
        actionLabel="Create your first job"
        actionHref="/dashboard/jobs/new"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} viewAs="parent" />
      ))}
    </div>
  );
}

export default async function JobsPage() {
  const { jobs, mode, familyName } = await getParentJobs();
  const open = jobs.filter((j) => j.status === "OPEN");
  const inProgress = jobs.filter((j) => ["CLAIMED", "IN_PROGRESS"].includes(j.status));
  const submitted = jobs.filter((j) => j.status === "SUBMITTED");
  const approved = jobs.filter((j) => j.status === "APPROVED");

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Jobs"
        subtitle={
          mode === "live" && familyName
            ? `Every job posted in ${familyName}, by status`
            : "Every job posted in your family marketplace, by status"
        }
      >
        <Button asChild>
          <Link href="/dashboard/jobs/new">
            <Plus className="w-4 h-4" />
            Create Job
          </Link>
        </Button>
      </PageHeader>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({open.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="review">To Review ({submitted.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <JobGrid jobs={jobs} />
        </TabsContent>
        <TabsContent value="open">
          <JobGrid jobs={open} />
        </TabsContent>
        <TabsContent value="in-progress">
          <JobGrid jobs={inProgress} />
        </TabsContent>
        <TabsContent value="review">
          <JobGrid jobs={submitted} />
        </TabsContent>
        <TabsContent value="approved">
          <JobGrid jobs={approved} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

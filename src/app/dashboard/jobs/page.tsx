import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job/JobCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Plus, Briefcase } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";

export default function JobsPage() {
  const open = DEMO_JOBS.filter((j) => j.status === "OPEN");
  const inProgress = DEMO_JOBS.filter((j) => ["CLAIMED", "IN_PROGRESS"].includes(j.status));
  const submitted = DEMO_JOBS.filter((j) => j.status === "SUBMITTED");
  const approved = DEMO_JOBS.filter((j) => j.status === "APPROVED");

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Jobs"
        subtitle="Every job posted in your family marketplace, by status"
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
          <TabsTrigger value="all">All ({DEMO_JOBS.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({open.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="review">To Review ({submitted.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
        </TabsList>

        {[
          ["all", DEMO_JOBS],
          ["open", open],
          ["in-progress", inProgress],
          ["review", submitted],
          ["approved", approved],
        ].map(([key, list]) => (
          <TabsContent key={key as string} value={key as string}>
            {(list as typeof DEMO_JOBS).length === 0 ? (
              <EmptyState
                icon={Briefcase}
                heading="No jobs here yet"
                subtext="Jobs posted by parents or trusted adults will appear here."
                actionLabel="Create your first job"
                actionHref="/dashboard/jobs/new"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(list as typeof DEMO_JOBS).map((job) => (
                  <JobCard key={job.id} job={job} viewAs="parent" />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { JobCard } from "@/components/job/JobCard";
import { ProposalCard } from "@/components/proposal/ProposalCard";
import { Button } from "@/components/ui/button";
import { WeeklyFamilyReport } from "@/components/reports/WeeklyFamilyReport";
import {
  Briefcase,
  Lightbulb,
  Receipt,
  Coins,
  CheckCircle2,
  Plus,
  Users,
  Sparkles,
} from "lucide-react";
import {
  DEMO_JOBS,
  DEMO_PROPOSALS,
  DEMO_INVOICES,
  DEMO_PITCHES,
  DEMO_ACTIVITY,
  DEMO_CHILD_PROFILES,
  DEMO_WEEKLY_REPORT,
} from "@/lib/demo-data";

export default function DashboardPage() {
  const openJobs = DEMO_JOBS.filter((j) => j.status === "OPEN").length;
  const inProgressJobs = DEMO_JOBS.filter((j) => j.status === "IN_PROGRESS" || j.status === "CLAIMED").length;
  const pendingProposals = DEMO_PITCHES.filter((p) => p.status === "PENDING").length;
  const pendingInvoices = DEMO_INVOICES.filter((i) => i.status === "SUBMITTED").length;
  const totalTokens = Object.values(DEMO_CHILD_PROFILES).reduce((sum, c) => sum + c.tokenBalance, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Things are getting done."
        subtitle="Here's what your family handled this week — without you having to ask."
      >
        <Button asChild>
          <Link href="/dashboard/jobs/new">
            <Plus className="w-4 h-4" />
            Create Job
          </Link>
        </Button>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          label="Open Jobs"
          value={`${openJobs} waiting`}
          subtext="Jobs ready to be claimed"
          icon={Briefcase}
          iconColor="text-blue-deep"
          iconBg="bg-blue-tint"
          href="/dashboard/jobs"
        />
        <DashboardCard
          label="Pending Pitches"
          value={pendingProposals}
          subtext={pendingProposals > 0 ? "From kids waiting for review" : "No pending proposals"}
          icon={Lightbulb}
          iconColor="text-yellow-ink"
          iconBg="bg-yellow-tint"
          href="/dashboard/proposals"
        />
        <DashboardCard
          label="Invoices to Review"
          value={pendingInvoices}
          subtext={pendingInvoices > 0 ? "Need your approval" : "All caught up!"}
          icon={Receipt}
          iconColor="text-blue-deep"
          iconBg="bg-blue-tint"
          href="/dashboard/invoices"
        />
        <DashboardCard
          label="Family Tokens"
          value={totalTokens}
          subtext={`Across ${Object.keys(DEMO_CHILD_PROFILES).length} children`}
          icon={Coins}
          iconColor="text-yellow-ink"
          iconBg="bg-yellow-tint"
          href="/dashboard/children"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending proposals */}
        <div className="lg:col-span-2 space-y-6">
          {pendingProposals > 0 && (
            <div>
              <SectionHeader
                title="New proposals from your kids"
                subtitle="Review their pitches and approve, counter, or request changes"
              >
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard/proposals">View all</Link>
                </Button>
              </SectionHeader>
              <div className="space-y-3">
                {DEMO_PITCHES.filter((p) => p.status === "PENDING").map((p) => (
                  <ProposalCard
                    key={p.id}
                    viewAs="parent"
                    href={`/dashboard/proposals/${p.id}`}
                    proposal={{
                      id: p.id,
                      title: p.title,
                      description: p.proposedSolution,
                      whyItMatters: p.whyItMatters,
                      tokenAsk: p.tokenAsk,
                      estimatedTime: p.estimatedTime,
                      status: p.status,
                      createdAt: p.createdAt,
                      proposedById: p.proposedById,
                      proposedBy: p.proposedBy,
                      beforePhotoUrl: p.beforePhotoUrl,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Open jobs preview */}
          <div>
            <SectionHeader title="Open jobs" subtitle="Available for kids to claim">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/jobs">View all</Link>
              </Button>
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DEMO_JOBS.filter((j) => j.status === "OPEN")
                .slice(0, 4)
                .map((job) => (
                  <JobCard key={job.id} job={job} viewAs="parent" />
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Activity */}
          <div className="bg-white rounded-2xl border border-line shadow-card p-5">
            <SectionHeader title="Family activity" subtitle="Latest events" />
            <ActivityFeed events={DEMO_ACTIVITY} maxItems={6} />
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-line shadow-card p-5">
            <p className="text-xs font-semibold text-ink-3 uppercase tracking-wider mb-3">
              Quick actions
            </p>
            <div className="space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-start">
                <Link href="/dashboard/jobs/new">
                  <Plus className="w-4 h-4" /> New job
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start">
                <Link href="/dashboard/rewards/new">
                  <Sparkles className="w-4 h-4" /> Add reward
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start">
                <Link href="/dashboard/family">
                  <Users className="w-4 h-4" /> Invite trusted adult
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly report */}
      <div>
        <SectionHeader
          title="This week's family report"
          subtitle="Track work, character growth, and progress"
        >
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/reports">All reports</Link>
          </Button>
        </SectionHeader>
        <WeeklyFamilyReport report={DEMO_WEEKLY_REPORT} />
      </div>
    </div>
  );
}

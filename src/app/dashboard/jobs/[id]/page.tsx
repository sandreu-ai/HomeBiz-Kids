import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { JobStatusBadge } from "@/components/job/JobStatusBadge";
import { DifficultyBadge } from "@/components/job/DifficultyBadge";
import { VirtueBadge } from "@/components/job/VirtueBadge";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { DEMO_JOBS } from "@/lib/demo-data";
import { Calendar, User, Coins, Clock, ArrowLeft } from "lucide-react";
import { formatDate, formatTokens, getCategoryEmoji, getCategoryLabel } from "@/lib/utils";

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const job = DEMO_JOBS.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/dashboard/jobs">
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>
      </Button>

      <div className="bg-white rounded-3xl border border-line shadow-card p-8 mb-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-bone flex items-center justify-center text-3xl shrink-0">
            {getCategoryEmoji(job.category)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <JobStatusBadge status={job.status} />
              <DifficultyBadge difficulty={job.difficulty} />
              <span className="text-xs text-ink-3">
                {getCategoryLabel(job.category)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-ink leading-tight">{job.title}</h1>
            <p className="text-sm text-ink-3 mt-1">
              Posted by {job.postedBy.name} · {formatDate(job.createdAt)}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1.5 bg-yellow-tint px-3 py-1.5 rounded-full mb-1">
              <span className="text-yellow-deep">✦</span>
              <span className="text-sm font-bold text-yellow-ink">
                {formatTokens(job.tokenReward)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-ink leading-relaxed">{job.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {job.dueDate && (
              <div className="bg-bone rounded-xl p-3">
                <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1">
                  Due
                </p>
                <p className="text-sm font-medium text-ink flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(job.dueDate)}
                </p>
              </div>
            )}
            {job.estimatedTime && (
              <div className="bg-bone rounded-xl p-3">
                <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1">
                  Est. time
                </p>
                <p className="text-sm font-medium text-ink flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.estimatedTime}
                </p>
              </div>
            )}
            {job.claimedBy && (
              <div className="bg-blue-tint rounded-xl p-3">
                <p className="text-[10px] font-semibold text-blue-deep uppercase tracking-wider mb-1">
                  Claimed by
                </p>
                <p className="text-sm font-medium text-ink flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {job.claimedBy.name}
                </p>
              </div>
            )}
            <div className="bg-yellow-tint rounded-xl p-3">
              <p className="text-[10px] font-semibold text-yellow-ink uppercase tracking-wider mb-1">
                Reward
              </p>
              <p className="text-sm font-medium text-ink flex items-center gap-1">
                <Coins className="w-3 h-3" />
                {formatTokens(job.tokenReward)}
              </p>
            </div>
          </div>

          {job.virtues.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                Virtues practiced
              </p>
              <div className="flex flex-wrap gap-2">
                {job.virtues.map((v) => <VirtueBadge key={v} virtue={v} />)}
              </div>
            </div>
          )}

          {job.checklist && job.checklist.length > 0 && (
            <QualityChecklist items={job.checklist} />
          )}

          {(job.beforePhoto || job.afterPhoto) && (
            <BeforeAfterComparison
              beforeUrl={job.beforePhoto?.url}
              afterUrl={job.afterPhoto?.url}
            />
          )}
        </div>
      </div>

      {job.status === "OPEN" && (
        <div className="bg-white rounded-2xl border border-line shadow-card p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Edit or cancel this job</p>
            <p className="text-xs text-ink-3">No one has claimed it yet.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="destructive" size="sm">Cancel job</Button>
          </div>
        </div>
      )}
    </div>
  );
}

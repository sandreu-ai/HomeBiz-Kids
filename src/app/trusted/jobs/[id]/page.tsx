import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { JobStatusBadge } from "@/components/job/JobStatusBadge";
import { DifficultyBadge } from "@/components/job/DifficultyBadge";
import { VirtueBadge } from "@/components/job/VirtueBadge";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { ArrowLeft, Calendar, Clock, Coins, Shield } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";
import { formatDate, formatTokens, getCategoryEmoji } from "@/lib/utils";

export default async function TrustedJobDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const job = DEMO_JOBS.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/trusted/jobs">
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>
      </Button>

      <div className="bg-blue-tint border border-blue-soft rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-deep mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-ink">Read-only view</p>
          <p className="text-sm text-ink-3 mt-0.5">
            As a trusted adult, you can view family jobs but only the parent and child can edit them.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-line shadow-card p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-bone flex items-center justify-center text-2xl shrink-0">
            {getCategoryEmoji(job.category)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <JobStatusBadge status={job.status} />
              <DifficultyBadge difficulty={job.difficulty} />
            </div>
            <h1 className="text-xl font-bold text-ink">{job.title}</h1>
            <p className="text-xs text-ink-3 mt-0.5">
              Posted by {job.postedBy.name}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-tint px-3 py-1.5 rounded-full shrink-0">
            <span className="text-yellow-deep">✦</span>
            <span className="font-bold text-yellow-ink">{formatTokens(job.tokenReward)}</span>
          </div>
        </div>

        <p className="text-sm text-ink leading-relaxed mb-5">{job.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {job.dueDate && (
            <div className="bg-bone rounded-xl p-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ink-3" />
              <div>
                <p className="text-[10px] text-ink-3 uppercase">Due</p>
                <p className="text-sm font-medium text-ink">{formatDate(job.dueDate)}</p>
              </div>
            </div>
          )}
          {job.estimatedTime && (
            <div className="bg-bone rounded-xl p-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-ink-3" />
              <div>
                <p className="text-[10px] text-ink-3 uppercase">Estimated time</p>
                <p className="text-sm font-medium text-ink">{job.estimatedTime}</p>
              </div>
            </div>
          )}
          {job.claimedBy && (
            <div className="bg-blue-tint rounded-xl p-3 flex items-center gap-2">
              <Coins className="w-4 h-4 text-blue-deep" />
              <div>
                <p className="text-[10px] text-blue-deep uppercase">Claimed by</p>
                <p className="text-sm font-medium text-ink">{job.claimedBy.name}</p>
              </div>
            </div>
          )}
        </div>

        {job.virtues.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-ink-3 mb-2 uppercase tracking-wider">
              Virtues practiced
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.virtues.map((v) => <VirtueBadge key={v} virtue={v} />)}
            </div>
          </div>
        )}

        {job.checklist && job.checklist.length > 0 && (
          <div className="mb-5">
            <QualityChecklist items={job.checklist} />
          </div>
        )}

        {(job.beforePhoto || job.afterPhoto) && (
          <BeforeAfterComparison
            beforeUrl={job.beforePhoto?.url}
            afterUrl={job.afterPhoto?.url}
          />
        )}
      </div>
    </div>
  );
}

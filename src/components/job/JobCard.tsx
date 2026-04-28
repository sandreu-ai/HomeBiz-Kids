import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { JobStatusBadge } from "./JobStatusBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import { VirtueBadge } from "./VirtueBadge";
import { Coin } from "@/components/ui/coin";
import { getCategoryEmoji, getCategoryLabel, formatDate } from "@/lib/utils";
import type { Job } from "@/types";

interface JobCardProps {
  job: Job;
  viewAs?: "parent" | "child" | "trusted";
  href?: string;
}

export function JobCard({ job, viewAs = "parent", href }: JobCardProps) {
  const detailHref =
    href ??
    (viewAs === "parent"
      ? `/dashboard/jobs/${job.id}`
      : viewAs === "child"
      ? `/child/jobs/${job.id}`
      : `/trusted/jobs/${job.id}`);

  return (
    <Link href={detailHref} className="block group">
      <Card className="hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
        <CardContent className="p-5">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xl shrink-0">
                {getCategoryEmoji(job.category)}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-ink text-sm leading-tight truncate">
                  {job.title}
                </h3>
                <p className="text-xs text-ink-3 mt-0.5">
                  {getCategoryLabel(job.category)}
                </p>
              </div>
            </div>
            <JobStatusBadge status={job.status} className="shrink-0" />
          </div>

          {/* Description */}
          <p className="text-xs text-ink-3 line-clamp-2 mb-3 leading-relaxed">
            {job.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <DifficultyBadge difficulty={job.difficulty} />
            {job.virtues.slice(0, 2).map((v) => (
              <VirtueBadge key={v} virtue={v} />
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-ink-3">
              {/* Reward */}
              <span className="flex items-center gap-1.5 font-bold text-yellow-ink">
                <Coin size="md" />
                {job.tokenReward}
              </span>

              {/* Posted by */}
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {job.postedBy.name.split(" ")[0]}
              </span>

              {/* Due date */}
              {job.dueDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(job.dueDate)}
                </span>
              )}
            </div>

            <ArrowRight className="w-4 h-4 text-line group-hover:text-blue-deep group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Claimed by */}
          {job.claimedBy && (
            <div className="mt-3 pt-3 border-t border-line">
              <p className="text-xs text-ink-3">
                Claimed by{" "}
                <span className="font-medium text-ink">
                  {job.claimedBy.name}
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

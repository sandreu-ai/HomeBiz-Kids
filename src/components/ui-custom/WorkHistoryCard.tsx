import type { Invoice } from "@/types";
import { formatDate, formatTokens, getCategoryEmoji } from "@/lib/utils";
import { VirtueBadge } from "@/components/job/VirtueBadge";
import { CheckCircle2, Star } from "lucide-react";

interface WorkHistoryCardProps {
  invoice: Invoice;
}

export function WorkHistoryCard({ invoice }: WorkHistoryCardProps) {
  const job = invoice.job;
  const feedback = invoice.feedback;

  const ratingConfig = {
    great: { label: "Great job", emoji: "👍", color: "text-blue-deep" },
    improvement: { label: "Needs improvement", emoji: "📝", color: "text-yellow-ink" },
    above_beyond: { label: "Above & beyond", emoji: "⭐", color: "text-yellow-ink" },
  };

  return (
    <div className="bg-white rounded-2xl border border-line shadow-card p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-tint flex items-center justify-center text-xl shrink-0">
          {getCategoryEmoji(job.category)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-ink leading-tight">{job.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-3 h-3 text-blue-deep" />
            <span className="text-xs text-ink-3">
              Completed {invoice.reviewedAt ? formatDate(invoice.reviewedAt) : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-tint px-2.5 py-1 rounded-full shrink-0">
          <span className="text-yellow-deep text-xs">✦</span>
          <span className="text-xs font-bold text-yellow-ink">
            {formatTokens(job.tokenReward + (invoice.bonusTokens ?? 0))}
          </span>
        </div>
      </div>

      {/* Proof thumbnails */}
      {invoice.photoProofs.length > 0 && (
        <div className="flex gap-2 mb-4">
          {invoice.photoProofs.map((photo) => (
            <div
              key={photo.id}
              className={`flex-1 aspect-video rounded-xl flex items-center justify-center text-sm ${
                photo.phase === "before"
                  ? "bg-line/50"
                  : "bg-blue-tint"
              }`}
            >
              <div className="text-center">
                <div className="text-2xl">{photo.phase === "before" ? "📸" : "✨"}</div>
                <p className="text-[10px] text-ink-3 mt-1 capitalize">{photo.phase}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Virtues */}
      {job.virtues.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.virtues.map((v) => <VirtueBadge key={v} virtue={v} />)}
        </div>
      )}

      {/* Parent feedback */}
      {feedback && (
        <div className="border-t border-line pt-4">
          <div className="flex items-start gap-2">
            <Star className={`w-4 h-4 mt-0.5 shrink-0 ${ratingConfig[feedback.rating].color}`} />
            <div>
              <p className="text-xs font-semibold text-ink">
                {ratingConfig[feedback.rating].label}
              </p>
              {feedback.note && (
                <p className="text-xs text-ink-3 mt-1 italic">"{feedback.note}"</p>
              )}
              {feedback.bonusTokens && (
                <p className="text-xs text-yellow-ink font-medium mt-1">
                  +{feedback.bonusTokens} bonus tokens earned!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

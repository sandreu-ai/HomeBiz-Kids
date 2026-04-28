import Link from "next/link";
import type { JobProposal } from "@/types";
import { formatRelativeDate, formatTokens, getProposalStatusColor } from "@/lib/utils";
import { Camera, Clock, Coins, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProposalCardProps {
  proposal: JobProposal;
  href?: string;
  viewAs?: "parent" | "child";
}

export function ProposalCard({ proposal, href, viewAs = "parent" }: ProposalCardProps) {
  const detailHref = href ?? `/dashboard/proposals/${proposal.id}`;

  const statusLabel: Record<typeof proposal.status, string> = {
    PENDING: "Awaiting Review",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    COUNTERED: "Countered",
  };

  return (
    <Link href={detailHref} className="block group">
      <div className="bg-white rounded-2xl border border-line shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all p-5">
        {/* Top */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-tint flex items-center justify-center text-lg shrink-0">
              💡
            </div>
            <div>
              <h3 className="font-semibold text-ink text-sm leading-tight">
                {proposal.title}
              </h3>
              <p className="text-xs text-ink-3 mt-0.5">
                Proposed by {proposal.proposedBy.name} · {formatRelativeDate(proposal.createdAt)}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0",
              getProposalStatusColor(proposal.status)
            )}
          >
            {statusLabel[proposal.status]}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-ink-3 line-clamp-2 mb-3 leading-relaxed">
          {proposal.description}
        </p>

        {/* Counteroffer banner */}
        {proposal.status === "COUNTERED" && proposal.counterOffer && (
          <div className="mb-3 bg-blue-tint rounded-xl p-3 border border-blue-soft">
            <p className="text-xs font-semibold text-blue-deep mb-1">Parent counteroffer</p>
            <p className="text-xs text-ink">{proposal.counterOffer}</p>
          </div>
        )}

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-ink-3">
            <span className="flex items-center gap-1 font-semibold text-yellow-ink">
              <Coins className="w-3.5 h-3.5" />
              {formatTokens(proposal.tokenAsk)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {proposal.estimatedTime}
            </span>
            {proposal.beforePhotoUrl && (
              <span className="flex items-center gap-1 text-blue-deep">
                <Camera className="w-3 h-3" />
                Before photo
              </span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-line group-hover:text-blue-deep group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";
import type { JobPitch } from "@/types";
import { Button } from "@/components/ui/button";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { CounterOfferForm } from "./CounterOfferForm";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import {
  Clock,
  Coins,
  AlertCircle,
  CheckCircle2,
  Repeat,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PitchReviewCardProps {
  pitch: JobPitch;
}

export function PitchReviewCard({ pitch }: PitchReviewCardProps) {
  const [mode, setMode] = useState<"view" | "counter">("view");
  const [decision, setDecision] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
      {/* Header strip */}
      <div className="bg-gradient-to-br from-yellow-tint to-bone p-6 border-b border-line">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-sm shrink-0"
            style={{ backgroundColor: pitch.proposedBy.avatarColor ?? "#6E9BCB" }}
          >
            {getInitials(pitch.proposedBy.name)}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider mb-0.5">
              Job Pitch from {pitch.proposedBy.name}
            </p>
            <h2 className="text-xl font-bold text-ink">{pitch.title}</h2>
            <p className="text-xs text-ink-3 mt-1">
              Submitted {formatRelativeDate(pitch.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Pitch contents */}
      <div className="p-6 space-y-5">
        {/* Pitch fields */}
        <div className="space-y-4">
          <div className="bg-bone rounded-xl p-4 border-l-4 border-yellow-deep">
            <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider mb-1">
              Problem noticed
            </p>
            <p className="text-sm text-ink leading-relaxed">{pitch.problemNoticed}</p>
          </div>

          <div className="bg-bone rounded-xl p-4 border-l-4 border-blue">
            <p className="text-xs font-bold text-blue-deep uppercase tracking-wider mb-1">
              Why it matters
            </p>
            <p className="text-sm text-ink leading-relaxed">{pitch.whyItMatters}</p>
          </div>

          <div className="bg-bone rounded-xl p-4 border-l-4 border-blue-deep">
            <p className="text-xs font-bold text-blue-deep uppercase tracking-wider mb-1">
              What I will do
            </p>
            <p className="text-sm text-ink leading-relaxed">{pitch.proposedSolution}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bone rounded-xl p-3">
              <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1">
                Estimated time
              </p>
              <p className="text-sm font-medium text-ink flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {pitch.estimatedTime}
              </p>
            </div>
            <div className="bg-yellow-tint rounded-xl p-3">
              <p className="text-[10px] font-semibold text-yellow-ink uppercase tracking-wider mb-1">
                Reward asked
              </p>
              <p className="text-sm font-bold text-yellow-ink flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                {pitch.tokenAsk} tokens
              </p>
            </div>
          </div>

          <div className="bg-bone rounded-xl p-4 border-l-4 border-red">
            <p className="text-xs font-bold text-red-deep uppercase tracking-wider mb-1">
              Why this reward is fair
            </p>
            <p className="text-sm text-ink leading-relaxed italic">"{pitch.whyRewardIsFair}"</p>
          </div>

          {pitch.noteToParent && (
            <div className="bg-blue-tint rounded-xl p-4 flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-blue-deep mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-deep mb-1">Note to you</p>
                <p className="text-sm text-ink italic">"{pitch.noteToParent}"</p>
              </div>
            </div>
          )}
        </div>

        {/* Before photo */}
        {pitch.beforePhotoUrl && (
          <BeforeAfterComparison
            beforeUrl={pitch.beforePhotoUrl}
            afterLabel="After (not yet)"
          />
        )}

        {/* Suggested checklist */}
        {pitch.suggestedChecklist && pitch.suggestedChecklist.length > 0 && (
          <div>
            <p className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
              Proposed checklist
            </p>
            <QualityChecklist items={pitch.suggestedChecklist} />
          </div>
        )}

        {/* Counter banner if already countered */}
        {pitch.counterOffer && (
          <div className="bg-blue-tint border-2 border-blue-soft rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Repeat className="w-4 h-4 text-blue-deep" />
              <p className="text-xs font-bold text-blue-deep uppercase tracking-wider">
                Your counteroffer
              </p>
            </div>
            <p className="text-sm text-ink mb-2">{pitch.counterOffer.parentNote}</p>
            {pitch.counterOffer.scopeChange && (
              <p className="text-xs text-ink-3 mb-1">
                <span className="font-semibold">Scope change:</span> {pitch.counterOffer.scopeChange}
              </p>
            )}
            {pitch.counterOffer.newTokens !== undefined && (
              <p className="text-xs text-yellow-ink font-medium">
                New reward: {pitch.counterOffer.newTokens} tokens (was {pitch.tokenAsk})
              </p>
            )}
            <p className="text-xs text-ink-3 mt-2">
              Waiting for {pitch.proposedBy.name.split(" ")[0]} to accept, decline, or revise.
            </p>
          </div>
        )}

        {/* Action area */}
        {pitch.status === "PENDING" && !decision && mode === "view" && (
          <div className="border-t border-line pt-5 space-y-3">
            <p className="text-xs font-semibold text-ink uppercase tracking-wider">
              Your decision
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => setDecision("approved")} className="justify-start">
                <CheckCircle2 className="w-4 h-4" />
                Approve as-is
              </Button>
              <Button onClick={() => setMode("counter")} variant="outline" className="justify-start">
                <Repeat className="w-4 h-4" />
                Counteroffer
              </Button>
              <Button onClick={() => setDecision("changes")} variant="outline" className="justify-start">
                <AlertCircle className="w-4 h-4" />
                Request changes
              </Button>
              <Button onClick={() => setDecision("declined")} variant="outline" className="justify-start text-red-deep border-red-soft hover:bg-red-tint">
                <XCircle className="w-4 h-4" />
                Decline
              </Button>
            </div>
          </div>
        )}

        {mode === "counter" && (
          <div className="border-t border-line pt-5">
            <CounterOfferForm
              originalTokens={pitch.tokenAsk}
              onSubmit={() => setDecision("countered")}
              onCancel={() => setMode("view")}
            />
          </div>
        )}

        {decision && (
          <div className={cn(
            "border-t border-line pt-5",
          )}>
            <div className={cn(
              "rounded-2xl p-4 flex items-center gap-3",
              decision === "approved" && "bg-blue-tint",
              decision === "declined" && "bg-red-tint",
              (decision === "changes" || decision === "countered") && "bg-blue-tint"
            )}>
              <CheckCircle2 className={cn(
                "w-5 h-5 shrink-0",
                decision === "approved" && "text-blue-deep",
                decision === "declined" && "text-red-deep",
                (decision === "changes" || decision === "countered") && "text-blue-deep"
              )} />
              <div>
                <p className="text-sm font-semibold text-ink">
                  {decision === "approved" && "Pitch approved!"}
                  {decision === "declined" && "Pitch declined."}
                  {decision === "changes" && "Changes requested."}
                  {decision === "countered" && "Counteroffer sent."}
                </p>
                <p className="text-xs text-ink-3 mt-0.5">
                  {pitch.proposedBy.name.split(" ")[0]} will be notified.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import type { WeeklyReport } from "@/types";
import { Briefcase, Coins, Gift, Star, Trophy, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

interface WeeklyFamilyReportProps {
  report: WeeklyReport;
}

export function WeeklyFamilyReport({ report }: WeeklyFamilyReportProps) {
  return (
    <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-deep to-blue-deep text-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
              Weekly Family Report
            </p>
            <h2 className="text-2xl font-bold">
              {formatDate(report.weekStart)} – {formatDate(report.weekEnd)}
            </h2>
          </div>
          <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-xl font-bold">{report.totalJobsCompleted}</p>
            <p className="text-xs text-white/70">Jobs done</p>
          </div>
          <div>
            <p className="text-xl font-bold">{report.totalTokensEarned}</p>
            <p className="text-xs text-white/70">Tokens earned</p>
          </div>
          <div>
            <p className="text-xl font-bold">{report.totalRewardsRedeemed}</p>
            <p className="text-xs text-white/70">Rewards used</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-yellow-tint rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-ink" />
              <p className="text-xs font-semibold text-yellow-ink uppercase tracking-wider">
                Top skill practiced
              </p>
            </div>
            <p className="text-base font-bold text-ink">{report.topSkillPracticed}</p>
          </div>
          <div className="bg-blue-tint rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-blue-deep" />
              <p className="text-xs font-semibold text-blue-deep uppercase tracking-wider">
                Most impressive
              </p>
            </div>
            <p className="text-sm font-medium text-ink leading-snug">
              {report.mostImpressiveJob}
            </p>
          </div>
        </div>

        {/* Per-child summaries */}
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">Per-child summary</h3>
          <div className="space-y-3">
            {report.childSummaries.map((cs) => (
              <div key={cs.childId} className="border border-line rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-ink">{cs.childName}</h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-ink-3">
                      <span className="font-semibold text-ink">{cs.jobsCompleted}</span> jobs
                    </span>
                    <span className="text-ink-3">
                      <span className="font-semibold text-yellow-ink">{cs.tokensEarned}</span> tokens
                    </span>
                    {cs.proposalsSubmitted > 0 && (
                      <span className="text-ink-3">
                        <span className="font-semibold text-ink">{cs.proposalsSubmitted}</span> proposals
                      </span>
                    )}
                  </div>
                </div>

                {cs.topJob && (
                  <p className="text-xs text-ink-3 mb-2">
                    Top job: <span className="font-medium text-ink">{cs.topJob}</span>
                  </p>
                )}

                {cs.skillsPracticed.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cs.skillsPracticed.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] bg-green-tint text-blue-deep px-2 py-0.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {cs.badgesEarned.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs text-ink-3">Badges earned:</span>
                    {cs.badgesEarned.map((b) => (
                      <span key={b} className="text-[11px] bg-yellow-soft text-yellow-ink px-2 py-0.5 rounded-full font-medium">
                        ✦ {b.replace("_", " ").toLowerCase()}
                      </span>
                    ))}
                  </div>
                )}

                {cs.praiseHighlights.length > 0 && (
                  <div className="bg-bone rounded-xl p-2.5 mt-2 space-y-1">
                    {cs.praiseHighlights.map((p, i) => (
                      <p key={i} className="text-xs text-ink-3 italic">
                        ❝ {p} ❞
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Suggested next week */}
        {report.suggestedJobsNextWeek.length > 0 && (
          <>
            <Separator />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-deep" />
                <h3 className="text-sm font-semibold text-ink">Suggested for next week</h3>
              </div>
              <ul className="space-y-1.5">
                {report.suggestedJobsNextWeek.map((s, i) => (
                  <li key={i} className="text-sm text-ink-3 flex gap-2">
                    <span className="text-blue-deep">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

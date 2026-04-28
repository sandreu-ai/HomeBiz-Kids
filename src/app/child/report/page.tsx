"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { DEMO_WEEKLY_REPORT } from "@/lib/demo-data";

export default function ChildReportPage() {
  const { session } = useSession();
  const userId = session.user.id;
  const childId = session.childProfile?.id;

  const cs = DEMO_WEEKLY_REPORT.childSummaries.find((c) => c.childId === childId);

  if (!cs) {
    return (
      <div className="max-w-3xl mx-auto text-center p-8">
        <PageHeader title="Your Week" />
        <p className="text-ink-3">Switch to a child user to see this report.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Your Week"
        subtitle="A celebration of what you got done."
      />

      <div className="bg-gradient-to-br from-blue-deep to-blue-deep text-white rounded-3xl p-8 mb-6">
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
          {cs.childName}'s week
        </p>
        <h2 className="text-3xl font-bold mb-1">
          {cs.jobsCompleted} jobs · {cs.tokensEarned} tokens
        </h2>
        {cs.bonusesEarned > 0 && (
          <p className="text-yellow-deep mt-2">+{cs.bonusesEarned} bonus{cs.bonusesEarned !== 1 ? "es" : ""} for excellence ✨</p>
        )}
      </div>

      {cs.topJob && (
        <div className="bg-yellow-tint border border-yellow rounded-2xl p-5 mb-4">
          <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider mb-1">⭐ Top job</p>
          <p className="font-semibold text-ink">{cs.topJob}</p>
        </div>
      )}

      <div className="bg-white border border-line shadow-card rounded-2xl p-5 mb-4">
        <p className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Skills you practiced</p>
        <div className="flex flex-wrap gap-2">
          {cs.skillsPracticed.map((s) => (
            <span key={s} className="text-sm bg-green-tint text-blue-deep px-3 py-1 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      {cs.praiseHighlights.length > 0 && (
        <div className="bg-bone rounded-2xl p-5 space-y-2">
          <p className="text-xs font-bold text-ink uppercase tracking-wider">Praise from your parent</p>
          {cs.praiseHighlights.map((p, i) => (
            <p key={i} className="text-sm text-ink italic">❝ {p} ❞</p>
          ))}
        </div>
      )}
    </div>
  );
}

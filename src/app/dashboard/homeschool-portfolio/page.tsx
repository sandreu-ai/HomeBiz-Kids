import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Lock, FileText } from "lucide-react";
import { DEMO_CHILD_PROFILES, DEMO_INVOICES, DEMO_PITCHES, DEMO_WEEKLY_REPORT } from "@/lib/demo-data";
import { SKILL_BADGES } from "@/lib/demo-data/badges";

export default function HomeschoolPortfolioPage() {
  const profile = DEMO_CHILD_PROFILES.daniel;

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Homeschool Portfolio"
        subtitle="Turn family missions into a record of life skills, service, initiative, and entrepreneurship"
      >
        <Button variant="gold">
          <Download className="w-4 h-4" />
          Export PDF
          <Lock className="w-3 h-3 ml-1 opacity-60" />
        </Button>
      </PageHeader>

      <div className="bg-gradient-to-br from-bone to-green-tint rounded-3xl border border-line p-8 mb-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-yellow-tint text-yellow-ink text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <FileText className="w-3 h-3" /> Portfolio Preview
          </div>
          <h1 className="text-3xl font-bold text-ink">
            {profile.user.name}'s Work Portfolio
          </h1>
          <p className="text-ink-3 mt-2">School year 2025-2026</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 text-center border border-line">
            <p className="text-2xl font-bold text-blue-deep">{profile.completedJobsCount}</p>
            <p className="text-xs text-ink-3">Jobs completed</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-line">
            <p className="text-2xl font-bold text-yellow-ink">{profile.lifetimeTokens}</p>
            <p className="text-xs text-ink-3">Tokens earned</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-line">
            <p className="text-2xl font-bold text-blue-deep">{DEMO_PITCHES.length}</p>
            <p className="text-xs text-ink-3">Pitches submitted</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-line">
            <p className="text-2xl font-bold text-red-deep">
              {profile.badges?.filter((b) => b.earned).length ?? 0}
            </p>
            <p className="text-xs text-ink-3">Badges earned</p>
          </div>
        </div>

        <div className="space-y-6">
          <PortfolioSection title="Life Skills Practiced">
            <div className="flex flex-wrap gap-2">
              {profile.virtues.map((v) => (
                <span key={v} className="bg-green-tint text-blue-deep text-sm px-3 py-1.5 rounded-full font-medium">
                  {v.replace("_", " ").toLowerCase()}
                </span>
              ))}
            </div>
          </PortfolioSection>

          <PortfolioSection title="Earned Badges">
            {profile.badges?.filter(b => b.earned).map((b) => {
              const meta = SKILL_BADGES[b.badgeCode];
              return (
                <div key={b.badgeCode} className="bg-white border border-yellow-deep rounded-xl p-3 flex items-center gap-3 mb-2">
                  <span className="text-2xl">{meta.emoji}</span>
                  <div>
                    <p className="font-semibold text-ink text-sm">{meta.title} Badge</p>
                    <p className="text-xs text-ink-3">{meta.description}</p>
                  </div>
                </div>
              );
            })}
          </PortfolioSection>

          <PortfolioSection title="Entrepreneurship Lessons">
            <ul className="space-y-1.5 text-sm text-ink">
              <li>• Submitted {DEMO_PITCHES.length} self-initiated job pitches</li>
              <li>• Practiced negotiation through {DEMO_PITCHES.filter(p => p.status === "COUNTERED").length} counteroffer interactions</li>
              <li>• Submitted {DEMO_INVOICES.length} invoices with reflection</li>
              <li>• Currently saving toward: {profile.activeSavingsGoal?.title}</li>
            </ul>
          </PortfolioSection>

          <PortfolioSection title="Recent Reflections">
            {DEMO_INVOICES.filter((i) => i.reflection).map((inv) => (
              <div key={inv.id} className="bg-white border-l-4 border-blue rounded-lg p-3 mb-2">
                <p className="text-xs font-semibold text-ink mb-1">{inv.job.title}</p>
                <p className="text-sm text-ink-3 italic">"{inv.reflection}"</p>
              </div>
            ))}
          </PortfolioSection>

          <PortfolioSection title="Parent Notes">
            {DEMO_INVOICES.filter((i) => i.feedback?.note).map((inv) => (
              <div key={inv.id} className="bg-white border-l-4 border-yellow-deep rounded-lg p-3 mb-2">
                <p className="text-xs font-semibold text-ink mb-1">{inv.job.title}</p>
                <p className="text-sm text-ink-3 italic">"{inv.feedback!.note}"</p>
              </div>
            ))}
          </PortfolioSection>
        </div>
      </div>

      <div className="bg-ink text-white rounded-2xl p-6 text-center">
        <Lock className="w-6 h-6 mx-auto mb-2 opacity-60" />
        <p className="font-semibold mb-1">PDF Export — Academy plan</p>
        <p className="text-xs text-white/60 mb-4">
          Export this entire portfolio as a beautiful PDF for homeschool records, conferences, or year-end review.
        </p>
        <Button asChild variant="gold" size="sm">
          <Link href="/pricing">Upgrade to unlock</Link>
        </Button>
      </div>
    </div>
  );
}

function PortfolioSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-ink mb-3 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

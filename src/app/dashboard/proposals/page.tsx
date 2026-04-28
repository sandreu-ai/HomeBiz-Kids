import { PageHeader } from "@/components/ui-custom/PageHeader";
import { ProposalCard } from "@/components/proposal/ProposalCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Lightbulb } from "lucide-react";
import { DEMO_PITCHES } from "@/lib/demo-data";

export default function ProposalsPage() {
  const pending = DEMO_PITCHES.filter((p) => p.status === "PENDING");
  const countered = DEMO_PITCHES.filter((p) => p.status === "COUNTERED");
  const all = DEMO_PITCHES;

  function pitchToProposal(p: typeof DEMO_PITCHES[number]) {
    return {
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
      counterOffer: p.counterOffer?.parentNote,
      counterTokens: p.counterOffer?.newTokens,
    };
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Job Pitches"
        subtitle="Proposals from your kids — review, approve, counter, or request changes"
      />

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="countered">Countered ({countered.length})</TabsTrigger>
          <TabsTrigger value="all">All ({all.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pending.length === 0 ? (
            <EmptyState
              icon={Lightbulb}
              heading="No pending pitches"
              subtext="When your kids spot work and pitch it, you'll see their proposals here."
            />
          ) : (
            <div className="space-y-3">
              {pending.map((p) => (
                <ProposalCard key={p.id} proposal={pitchToProposal(p)} viewAs="parent" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="countered">
          {countered.length === 0 ? (
            <EmptyState icon={Lightbulb} heading="No counteroffers" subtext="Counteroffers you've made appear here." />
          ) : (
            <div className="space-y-3">
              {countered.map((p) => (
                <ProposalCard key={p.id} proposal={pitchToProposal(p)} viewAs="parent" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-3">
            {all.map((p) => (
              <ProposalCard key={p.id} proposal={pitchToProposal(p)} viewAs="parent" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

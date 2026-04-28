import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PitchReviewCard } from "@/components/proposal/PitchReviewCard";
import { ArrowLeft } from "lucide-react";
import { DEMO_PITCHES } from "@/lib/demo-data";

export default async function ProposalDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const pitch = DEMO_PITCHES.find((p) => p.id === id);
  if (!pitch) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/dashboard/proposals">
          <ArrowLeft className="w-4 h-4" />
          Back to proposals
        </Link>
      </Button>
      <PitchReviewCard pitch={pitch} />
    </div>
  );
}

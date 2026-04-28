import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart } from "lucide-react";

export default function TrustedNewJobPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Post a Job"
        subtitle="Suggest meaningful work. Parents will approve before kids see it."
      />

      <div className="bg-blue-tint border border-blue-soft rounded-2xl p-4 mb-6 flex items-start gap-2">
        <Heart className="w-4 h-4 text-blue-deep mt-0.5 shrink-0" />
        <p className="text-xs text-ink">
          Your job will be reviewed by the parent before it goes to the kids.
        </p>
      </div>

      <form className="bg-white rounded-2xl border border-line shadow-card p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Job title</Label>
          <Input id="title" placeholder="e.g. Organize the pantry shelf" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" rows={4} placeholder="Take everything off the shelf, wipe it down, organize by category..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Reward suggestion</Label>
            <Input type="number" placeholder="20" />
          </div>
          <div className="space-y-2">
            <Label>Suggested for</Label>
            <Select defaultValue="any">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any child</SelectItem>
                <SelectItem value="daniel">Daniel</SelectItem>
                <SelectItem value="mateo">Mateo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Note for the parents (optional)</Label>
          <Textarea id="note" rows={2} placeholder="Any context for why you're suggesting this..." />
        </div>

        <div className="flex gap-2 justify-end pt-3 border-t border-line">
          <Button asChild variant="ghost">
            <Link href="/trusted/jobs">Cancel</Link>
          </Button>
          <Button asChild>
            <Link href="/trusted/jobs">Submit for parent review</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

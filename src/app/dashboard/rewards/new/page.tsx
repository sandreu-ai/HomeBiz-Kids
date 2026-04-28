import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewRewardPage() {
  const SUGGESTED_EMOJIS = ["🎬", "🍦", "📖", "🎮", "🍕", "🌙", "🍪", "🎁", "⚽", "🎨"];

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Create a Reward"
        subtitle="Add something to your family reward store"
      />

      <form className="bg-white rounded-2xl border border-line shadow-card p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Reward name</Label>
          <Input id="title" placeholder="e.g. Movie Night" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" placeholder="Pick any movie and we'll watch it together as a family." rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cost">Token cost</Label>
            <Input id="cost" type="number" placeholder="50" />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select defaultValue="ACTIVITY">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVITY">Activity</SelectItem>
                <SelectItem value="SCREEN_TIME">Screen Time</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
                <SelectItem value="TREAT">Treat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Emoji</Label>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                className="w-10 h-10 rounded-xl bg-bone hover:bg-line flex items-center justify-center text-xl border border-line"
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-3 border-t border-line">
          <Button asChild variant="ghost">
            <Link href="/dashboard/rewards">Cancel</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/rewards">Add reward</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

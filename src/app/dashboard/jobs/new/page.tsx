import { PageHeader } from "@/components/ui-custom/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEMO_JOB_SUGGESTIONS } from "@/lib/demo-data";
import { JobSuggestionPanel } from "@/components/job/JobSuggestionPanel";
import { ChecklistEditor } from "@/components/job/ChecklistEditor";
import Link from "next/link";

export default function NewJobPage() {
  const categories = [
    "HOUSEHOLD", "YARD_WORK", "PET_CARE", "LEARNING", "SERVICE",
    "CREATIVE", "BUSINESS", "BONUS_CHALLENGE", "ORGANIZATION", "OUTDOOR"
  ];
  const difficulties = ["EASY", "MEDIUM", "HARD", "CHALLENGE"];
  const virtues = [
    "RESPONSIBILITY", "INITIATIVE", "DILIGENCE", "HONESTY", "FOLLOW_THROUGH",
    "PROBLEM_SOLVING", "SERVICE", "STEWARDSHIP", "COMMUNICATION", "RESILIENCE"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Create a Job"
        subtitle="Define the work, the standards, and the reward."
      >
        <Button asChild variant="ghost">
          <Link href="/dashboard/jobs">Cancel</Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-line shadow-card p-6 space-y-5">
            <h2 className="font-semibold text-ink">The work</h2>
            <div className="space-y-2">
              <Label htmlFor="title">Job title</Label>
              <Input id="title" placeholder="e.g. Clean Your Room" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Be clear about exactly what needs to happen so there's no confusion later."
              />
              <p className="text-xs text-ink-3">
                Clear work, clear standards, clear reward.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-line shadow-card p-6 space-y-5">
            <div>
              <h2 className="font-semibold text-ink">Quality checklist</h2>
              <p className="text-xs text-ink-3 mt-0.5">
                Define what "done" looks like. Kids check these off before submitting an invoice.
              </p>
            </div>
            <ChecklistEditor />
          </div>

          <div className="bg-white rounded-2xl border border-line shadow-card p-6 space-y-5">
            <h2 className="font-semibold text-ink">Reward & assignment</h2>
            <div className="space-y-2">
              <Label htmlFor="reward-amount">Token reward</Label>
              <div className="flex items-center gap-3">
                <Input id="reward-amount" type="number" placeholder="25" className="w-32" />
                <span className="text-sm text-ink-3">tokens</span>
              </div>
              <p className="text-xs text-ink-3">
                Kids spend tokens in your family reward store.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Assigned to</Label>
              <Select defaultValue="open">
                <SelectTrigger>
                  <SelectValue placeholder="Open or assigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open to all children</SelectItem>
                  <SelectItem value="child-daniel">Daniel</SelectItem>
                  <SelectItem value="child-mateo">Mateo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="due">Due date</Label>
                <Input id="due" type="date" />
              </div>
              <div className="space-y-2">
                <Label>Proof required</Label>
                <Select defaultValue="AFTER_ONLY">
                  <SelectTrigger>
                    <SelectValue placeholder="Proof setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">No photo</SelectItem>
                    <SelectItem value="AFTER_ONLY">After photo only</SelectItem>
                    <SelectItem value="BEFORE_ONLY">Before photo only</SelectItem>
                    <SelectItem value="BEFORE_AND_AFTER">Before + After</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-line shadow-card p-6 space-y-3">
            <h2 className="font-semibold text-ink">Virtue / skill focus</h2>
            <p className="text-xs text-ink-3">
              Tag this job with the character it builds. Shows up in work history and weekly reports.
            </p>
            <div className="flex flex-wrap gap-2">
              {virtues.map((v) => (
                <button
                  key={v}
                  type="button"
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-line bg-bone hover:border-green hover:bg-green-tint transition-colors text-ink"
                >
                  {v.replace("_", " ").toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end sticky bottom-0 bg-bone pt-4 border-t border-line">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/jobs">Cancel</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/jobs">Post job</Link>
            </Button>
          </div>
        </form>

        {/* Suggestions sidebar */}
        <div className="space-y-4">
          <JobSuggestionPanel suggestions={DEMO_JOB_SUGGESTIONS} />
        </div>
      </div>
    </div>
  );
}

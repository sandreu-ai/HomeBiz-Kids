"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChecklistEditor } from "@/components/job/ChecklistEditor";
import { PhotoUploadCard } from "@/components/proof/PhotoUploadCard";
import { CheckCircle2, Lightbulb, Eye, AlertCircle, Coins, Clock, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "problem", label: "Problem", icon: AlertCircle },
  { key: "why", label: "Why it matters", icon: Eye },
  { key: "solution", label: "Solution", icon: CheckCircle2 },
  { key: "details", label: "Details", icon: Clock },
  { key: "reward", label: "Reward", icon: Coins },
  { key: "proof", label: "Proof", icon: Sparkles },
] as const;

export function JobPitchForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    title: "",
    problem: "",
    whyItMatters: "",
    solution: "",
    estimatedTime: "",
    tokenAsk: 20,
    whyFair: "",
    note: "",
  });

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setSubmitted(true);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function update<K extends keyof typeof data>(key: K, val: typeof data[K]) {
    setData({ ...data, [key]: val });
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-blue-deep to-blue-deep text-white rounded-3xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-yellow-deep" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Pitch submitted!</h2>
        <p className="text-white/80 mb-6 leading-relaxed">
          Your parent will review your pitch and let you know.
          Good entrepreneurs notice problems and offer helpful solutions.
        </p>
        <Button asChild variant="gold">
          <Link href="/child">Back to home</Link>
        </Button>
      </div>
    );
  }

  const currentStep = STEPS[step];

  return (
    <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
      {/* Header / progress */}
      <div className="bg-gradient-to-br from-yellow-tint to-bone p-6 border-b border-line">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-yellow-ink" />
          <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <h1 className="text-2xl font-bold text-ink mb-1">Make Your Pitch</h1>
        <p className="text-sm text-ink-3">
          See something that needs doing? Turn it into a job.
        </p>

        <div className="flex gap-1 mt-5">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-yellow" : "bg-line"
              )}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 space-y-5 min-h-[300px]">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">What would you call this job?</Label>
              <Input
                id="title"
                placeholder="e.g. Deep clean my room"
                value={data.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="problem">What problem did you notice?</Label>
              <Textarea
                id="problem"
                placeholder="My room is messy and hard to walk through. There's clothes on the floor..."
                rows={4}
                value={data.problem}
                onChange={(e) => update("problem", e.target.value)}
              />
              <p className="text-xs text-ink-3 italic">
                Real entrepreneurs notice problems first.
              </p>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="space-y-2">
            <Label htmlFor="why">Why does this matter?</Label>
            <Textarea
              id="why"
              placeholder="It will be easier to find my school stuff and the room won't feel stressful..."
              rows={5}
              value={data.whyItMatters}
              onChange={(e) => update("whyItMatters", e.target.value)}
            />
            <p className="text-xs text-ink-3 italic">
              Good pitches explain the value.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <Label htmlFor="solution">What will you do?</Label>
            <Textarea
              id="solution"
              placeholder="I will make my bed, pick up clothes, organize my desk, vacuum..."
              rows={5}
              value={data.solution}
              onChange={(e) => update("solution", e.target.value)}
            />
            <p className="text-xs text-ink-3 italic">
              Be specific. Specific work = clear standards.
            </p>
          </div>
        )}

        {step === 3 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="time">How long will it take?</Label>
              <Input
                id="time"
                placeholder="e.g. 45 minutes"
                value={data.estimatedTime}
                onChange={(e) => update("estimatedTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Suggested checklist (optional)</Label>
              <p className="text-xs text-ink-3 -mt-1 mb-2">
                What does "done" look like? Add the steps.
              </p>
              <ChecklistEditor />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="tokens">How many tokens do you think is fair?</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tokens"
                  type="number"
                  className="w-32 text-2xl font-bold h-14"
                  value={data.tokenAsk}
                  onChange={(e) => update("tokenAsk", Number(e.target.value))}
                />
                <span className="text-base text-ink-3">tokens</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="why-fair">Why is that reward fair?</Label>
              <Textarea
                id="why-fair"
                placeholder="It will take a while and the room will look totally different..."
                rows={4}
                value={data.whyFair}
                onChange={(e) => update("whyFair", e.target.value)}
              />
              <p className="text-xs text-ink-3 italic">
                Pricing your work is a real entrepreneurial skill. Be honest.
              </p>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <PhotoUploadCard
              phase="before"
              hint="Take a photo before you start so you can show the transformation later."
            />
            <div className="space-y-2">
              <Label htmlFor="note">Note to parent (optional)</Label>
              <Textarea
                id="note"
                placeholder="Anything you want them to know..."
                rows={3}
                value={data.note}
                onChange={(e) => update("note", e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-line p-4 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={prev} disabled={step === 0}>
          Back
        </Button>
        <p className="text-xs text-ink-3">
          {currentStep.label}
        </p>
        <Button onClick={next}>
          {step === STEPS.length - 1 ? "Submit pitch" : "Next"}
        </Button>
      </div>
    </div>
  );
}

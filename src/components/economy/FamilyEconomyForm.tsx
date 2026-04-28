"use client";

import { useState } from "react";
import type { FamilyEconomySettings } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FamilyEconomyFormProps {
  initial: FamilyEconomySettings;
}

function Toggle({ label, hint, value, onChange }: { label: string; hint?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {hint && <p className="text-xs text-ink-3 mt-0.5">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={cn(
          "shrink-0 w-11 h-6 rounded-full p-0.5 transition-colors",
          value ? "bg-blue-deep" : "bg-line"
        )}
      >
        <span
          className={cn(
            "block w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
            value && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}

export function FamilyEconomyForm({ initial }: FamilyEconomyFormProps) {
  const [s, setS] = useState(initial);

  function update<K extends keyof FamilyEconomySettings>(key: K, val: FamilyEconomySettings[K]) {
    setS((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className="space-y-6">
      {/* Currency */}
      <section className="bg-white rounded-2xl border border-line shadow-card p-6">
        <h2 className="font-semibold text-ink mb-1">Currency</h2>
        <p className="text-xs text-ink-3 mb-4">
          Choose how your family economy works.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Currency type</Label>
            <Select value={s.currencyType} onValueChange={(v) => update("currencyType", v as FamilyEconomySettings["currencyType"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIRTUAL_TOKENS">Virtual tokens</SelectItem>
                <SelectItem value="PRIVILEGES">Privileges (screen time, activities)</SelectItem>
                <SelectItem value="PHYSICAL_TOKENS">Physical tokens (beans, marbles, chips)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>What do you call them?</Label>
            <div className="flex flex-wrap gap-2">
              {["tokens", "stars", "coins", "points", "Family Dollars"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => update("tokenName", name)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                    s.tokenName === name
                      ? "border-blue-deep bg-blue-deep text-white"
                      : "border-line bg-bone hover:border-green text-ink"
                  )}
                >
                  {name}
                </button>
              ))}
              <Input
                value={s.tokenName}
                onChange={(e) => update("tokenName", e.target.value)}
                className="w-40 h-8 text-xs"
                placeholder="Custom..."
              />
            </div>
          </div>

        </div>
      </section>

      {/* Approvals */}
      <section className="bg-white rounded-2xl border border-line shadow-card p-6">
        <h2 className="font-semibold text-ink mb-4">Approvals & permissions</h2>
        <div className="divide-y divide-line">
          <Toggle
            label="Require parent approval for all payouts"
            hint="Tokens or cash only move after you approve."
            value={s.requireApprovalForPayouts}
            onChange={(v) => update("requireApprovalForPayouts", v)}
          />
          <Toggle
            label="Allow children to propose jobs"
            hint="Kids can pitch their own work via the Job Pitch flow."
            value={s.allowChildProposals}
            onChange={(v) => update("allowChildProposals", v)}
          />
          <Toggle
            label="Allow trusted adults to post jobs"
            hint="Grandparents and mentors can suggest work."
            value={s.allowTrustedAdultJobs}
            onChange={(v) => update("allowTrustedAdultJobs", v)}
          />
          <Toggle
            label="Trusted adult jobs need parent approval first"
            hint="Kids only see them after you approve."
            value={s.trustedAdultJobsRequireApproval}
            onChange={(v) => update("trustedAdultJobsRequireApproval", v)}
          />
        </div>
      </section>

      {/* Proof & Reflection */}
      <section className="bg-white rounded-2xl border border-line shadow-card p-6">
        <h2 className="font-semibold text-ink mb-4">Quality & proof</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Default proof requirement</Label>
            <Select value={s.defaultProofRequirement} onValueChange={(v) => update("defaultProofRequirement", v as FamilyEconomySettings["defaultProofRequirement"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NONE">No photo required</SelectItem>
                <SelectItem value="AFTER_ONLY">After photo only</SelectItem>
                <SelectItem value="BEFORE_ONLY">Before photo only</SelectItem>
                <SelectItem value="BEFORE_AND_AFTER">Before & after photos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="divide-y divide-line">
            <Toggle
              label="Require child reflection on invoices"
              hint="Kids write what they learned before submitting."
              value={s.requireReflection}
              onChange={(v) => update("requireReflection", v)}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white rounded-2xl border border-line shadow-card p-6">
        <h2 className="font-semibold text-ink mb-4">Features</h2>
        <div className="divide-y divide-line">
          <Toggle label="Enable bonuses" hint="Reward excellence and character." value={s.enableBonuses} onChange={(v) => update("enableBonuses", v)} />
          <Toggle label="Enable savings goals" hint="Children can save toward bigger rewards." value={s.enableSavingsGoals} onChange={(v) => update("enableSavingsGoals", v)} />
          <Toggle label="Enable skill badges" hint="Track character formation through earned badges." value={s.enableSkillBadges} onChange={(v) => update("enableSkillBadges", v)} />
          <Toggle label="Enable weekly family reports" hint="Auto-generated weekly summaries." value={s.enableWeeklyReports} onChange={(v) => update("enableWeeklyReports", v)} />
        </div>
      </section>

      <div className="flex justify-end sticky bottom-4">
        <Button size="lg">Save settings</Button>
      </div>
    </div>
  );
}

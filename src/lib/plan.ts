import type { FamilyPlan } from "@/types";

export interface PlanLimits {
  /** Maximum number of children profiles. null = unlimited. */
  maxChildren: number | null;
  /** Maximum jobs that can be created in a calendar month. null = unlimited. */
  maxJobsPerMonth: number | null;
  /** Maximum trusted adults that can be invited. */
  maxTrustedAdults: number;
  /** How many days back the work history will show. null = forever. */
  historyDays: number | null;
  beforeAfterPhotos: boolean;
  childPitches: boolean;
  bonusesAndPraise: boolean;
  qualityChecklists: boolean;
  weeklyReports: boolean;
  homeschoolPortfolioExport: boolean;
  rewardStore: boolean;
  savingsGoals: boolean;
}

export const PLAN_LIMITS: Record<FamilyPlan, PlanLimits> = {
  FREE: {
    maxChildren: 1,
    maxJobsPerMonth: 3,
    maxTrustedAdults: 0,
    historyDays: 30,
    beforeAfterPhotos: false,
    childPitches: false,
    bonusesAndPraise: false,
    qualityChecklists: false,
    weeklyReports: false,
    homeschoolPortfolioExport: false,
    rewardStore: true,
    savingsGoals: true,
  },
  FAMILY: {
    maxChildren: null,
    maxJobsPerMonth: null,
    maxTrustedAdults: 4,
    historyDays: null,
    beforeAfterPhotos: true,
    childPitches: true,
    bonusesAndPraise: true,
    qualityChecklists: true,
    weeklyReports: true,
    homeschoolPortfolioExport: true,
    rewardStore: true,
    savingsGoals: true,
  },
};

export function getLimits(plan: FamilyPlan): PlanLimits {
  return PLAN_LIMITS[plan];
}

export function isFeatureAvailable(plan: FamilyPlan, feature: keyof PlanLimits): boolean {
  const v = PLAN_LIMITS[plan][feature];
  if (typeof v === "boolean") return v;
  // Numeric limits: 0 means "not available", null/positive number means available with that ceiling.
  if (v === null) return true;
  return v > 0;
}

export const PLAN_LABEL: Record<FamilyPlan, string> = {
  FREE: "Free",
  FAMILY: "Family",
};

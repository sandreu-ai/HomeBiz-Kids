import type { WeeklyReport } from "@/types";

export const DEMO_WEEKLY_REPORT: WeeklyReport = {
  id: "report-001",
  familyId: "family-reyes",
  weekStart: "2026-04-20",
  weekEnd: "2026-04-26",
  totalJobsCompleted: 6,
  totalTokensEarned: 130,
  totalRewardsRedeemed: 1,
  topSkillPracticed: "Initiative",
  mostImpressiveJob: "Daniel practiced saying hi first and followed through with courage",
  childSummaries: [
    {
      childId: "child-daniel",
      childName: "Daniel",
      jobsCompleted: 4,
      tokensEarned: 65,
      proposalsSubmitted: 2,
      bonusesEarned: 1,
      skillsPracticed: ["Initiative", "Diligence", "Service", "Follow-Through"],
      badgesEarned: ["INITIATIVE"],
      topJob: "Did quiet favors for Mateo",
      praiseHighlights: [
        "You practiced courage by going first.",
        "You served your sibling without making it about yourself.",
      ],
    },
    {
      childId: "child-mateo",
      childName: "Mateo",
      jobsCompleted: 2,
      tokensEarned: 35,
      proposalsSubmitted: 0,
      bonusesEarned: 0,
      skillsPracticed: ["Responsibility", "Follow-Through"],
      badgesEarned: [],
      topJob: "Owned trash day without reminders",
      praiseHighlights: ["You showed responsibility."],
    },
  ],
  suggestedJobsNextWeek: [
    "Mateo could create a peaceful reading shelf",
    "Daniel could design a value-creation plan",
    "Both kids: do one sibling favor together",
  ],
  createdAt: "2026-04-26T20:00:00Z",
};

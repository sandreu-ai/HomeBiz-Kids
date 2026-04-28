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
  mostImpressiveJob: "Daniel proposed and completed Deep Clean My Room without being asked",
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
      topJob: "Read to Mateo (above & beyond)",
      praiseHighlights: [
        "You showed initiative.",
        "You went above and beyond.",
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
      topJob: "Take out trash for the week",
      praiseHighlights: ["You showed responsibility."],
    },
  ],
  suggestedJobsNextWeek: [
    "Mateo could try organizing the bookshelf (in progress)",
    "Daniel could pitch a creative business idea",
    "Both kids: pull weeds together",
  ],
  createdAt: "2026-04-26T20:00:00Z",
};

import type { SavingsGoal } from "@/types";

export const DEMO_SAVINGS_GOALS: Record<string, SavingsGoal> = {
  daniel: {
    id: "goal-daniel-001",
    childId: "child-daniel",
    title: "New Lego Set",
    emoji: "🧱",
    targetTokens: 200,
    savedTokens: 85,
    deadline: "2026-06-15",
    isActive: true,
    createdAt: "2026-03-10T00:00:00Z",
  },
  mateo: {
    id: "goal-mateo-001",
    childId: "child-mateo",
    title: "Pokemon Cards",
    emoji: "🎴",
    targetTokens: 100,
    savedTokens: 35,
    isActive: true,
    createdAt: "2026-04-01T00:00:00Z",
  },
};

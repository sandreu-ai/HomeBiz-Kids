import type { User, ChildProfile, Family, FamilyMember } from "@/types";
import { DEMO_SAVINGS_GOALS } from "./savings";
import { DEMO_CHILD_BADGES } from "./badges";

export const DEMO_FAMILY: Family = {
  id: "family-reyes",
  name: "Reyes Family",
  createdAt: "2024-09-01T00:00:00Z",
  members: [],
  plan: "FAMILY",
  currentBillingMonth: "2026-04",
};

export const DEMO_USERS: Record<string, User> = {
  santiago: {
    id: "user-santiago",
    name: "Santiago Reyes",
    email: "santiago@reyes.family",
    role: "PARENT",
    avatarColor: "#3F6B4F",
    createdAt: "2024-09-01T00:00:00Z",
    familyId: "family-reyes",
  },
  daniel: {
    id: "user-daniel",
    name: "Daniel Reyes",
    role: "CHILD",
    avatarColor: "#6E9BCB",
    createdAt: "2024-09-01T00:00:00Z",
    familyId: "family-reyes",
  },
  mateo: {
    id: "user-mateo",
    name: "Mateo Reyes",
    role: "CHILD",
    avatarColor: "#D9A441",
    createdAt: "2024-09-01T00:00:00Z",
    familyId: "family-reyes",
  },
  joe: {
    id: "user-joe",
    name: "Grandpa Joe",
    email: "joe@grandpa.com",
    role: "TRUSTED_ADULT",
    avatarColor: "#A8B5A2",
    createdAt: "2024-10-15T00:00:00Z",
    familyId: "family-reyes",
  },
};

export const DEMO_CHILD_PROFILES: Record<string, ChildProfile> = {
  daniel: {
    id: "child-daniel",
    userId: "user-daniel",
    user: DEMO_USERS.daniel,
    age: 12,
    tokenBalance: 145,
    virtues: ["INITIATIVE", "DILIGENCE", "FOLLOW_THROUGH"],
    level: 4,
    streak: 7,
    lifetimeTokens: 640,
    completedJobsCount: 18,
    badges: DEMO_CHILD_BADGES["child-daniel"],
    activeSavingsGoal: DEMO_SAVINGS_GOALS.daniel,
  },
  mateo: {
    id: "child-mateo",
    userId: "user-mateo",
    user: DEMO_USERS.mateo,
    age: 9,
    tokenBalance: 60,
    virtues: ["RESPONSIBILITY", "SERVICE"],
    level: 2,
    streak: 3,
    lifetimeTokens: 240,
    completedJobsCount: 8,
    badges: DEMO_CHILD_BADGES["child-mateo"],
    activeSavingsGoal: DEMO_SAVINGS_GOALS.mateo,
  },
};

export const DEMO_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "member-santiago",
    userId: "user-santiago",
    familyId: "family-reyes",
    user: DEMO_USERS.santiago,
    role: "PARENT",
    approved: true,
    joinedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "member-daniel",
    userId: "user-daniel",
    familyId: "family-reyes",
    user: DEMO_USERS.daniel,
    role: "CHILD",
    approved: true,
    joinedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "member-mateo",
    userId: "user-mateo",
    familyId: "family-reyes",
    user: DEMO_USERS.mateo,
    role: "CHILD",
    approved: true,
    joinedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "member-joe",
    userId: "user-joe",
    familyId: "family-reyes",
    user: DEMO_USERS.joe,
    role: "TRUSTED_ADULT",
    approved: true,
    joinedAt: "2024-10-15T00:00:00Z",
  },
];

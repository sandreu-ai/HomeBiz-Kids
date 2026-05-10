import "server-only";

import { Role } from "@prisma/client";
import { DEMO_CHILD_PROFILES } from "@/lib/demo-data";
import { getPrisma } from "@/lib/db";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";
import type { ChildProfile, User, VirtueFocus } from "@/types";

export type ParentChildrenProfiles = {
  mode: "demo" | "live";
  familyId: string | null;
  familyName: string | null;
  profiles: ChildProfile[];
};

function getDemoChildrenProfiles(): ParentChildrenProfiles {
  return {
    mode: "demo",
    familyId: null,
    familyName: null,
    profiles: Object.values(DEMO_CHILD_PROFILES),
  };
}

export async function getParentChildrenProfiles(): Promise<ParentChildrenProfiles> {
  const session = await getParentFamilySessionStatus();

  if (session.status !== "ready") {
    return getDemoChildrenProfiles();
  }

  const prisma = getPrisma();
  const parent = await prisma.user.findUnique({
    where: { clerkUserId: session.clerkUserId },
    include: {
      familyMembers: {
        where: { role: Role.PARENT, approved: true },
        include: { family: true },
        take: 1,
      },
    },
  });

  const family = parent?.familyMembers[0]?.family;

  if (!family) {
    return {
      mode: "live",
      familyId: null,
      familyName: null,
      profiles: [],
    };
  }

  const familyId = family.id;
  const profiles = await prisma.childProfile.findMany({
    where: {
      user: {
        familyMembers: {
          some: { familyId, role: Role.CHILD, approved: true },
        },
      },
    },
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });

  return {
    mode: "live",
    familyId,
    familyName: family.name,
    profiles: profiles.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      user: {
        id: profile.user.id,
        name: profile.user.name,
        email: profile.user.email ?? undefined,
        role: profile.user.role,
        avatarUrl: profile.user.avatarUrl ?? undefined,
        avatarColor: profile.user.avatarColor ?? undefined,
        createdAt: profile.user.createdAt.toISOString(),
        familyId,
      } satisfies User,
      age: profile.age,
      tokenBalance: profile.tokenBalance,
      virtues: profile.virtues as VirtueFocus[],
      level: profile.level,
      streak: profile.streak,
      lifetimeTokens: profile.lifetimeTokens,
      completedJobsCount: profile.completedJobs,
    })),
  };
}

import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { getPrisma } from "@/lib/db";
import {
  getMissingProductionServiceKeys,
  isClerkConfigured,
  isDatabaseConfigured,
} from "@/lib/config/app-mode";

type ParentFamilySessionStatus =
  | { status: "needs-clerk"; missing: string[] }
  | { status: "needs-database"; missing: string[] }
  | { status: "signed-out"; missing: [] }
  | { status: "ready"; clerkUserId: string; missing: [] };

export async function getParentFamilySessionStatus(): Promise<ParentFamilySessionStatus> {
  if (!isClerkConfigured()) {
    return { status: "needs-clerk", missing: getMissingProductionServiceKeys() };
  }

  if (!isDatabaseConfigured()) {
    return { status: "needs-database", missing: getMissingProductionServiceKeys() };
  }

  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return { status: "signed-out", missing: [] };
  }

  return { status: "ready", clerkUserId, missing: [] };
}

type EnsureParentFamilyInput = {
  clerkUserId: string;
  email?: string | null;
  name?: string | null;
  familyName?: string | null;
};

// Child profiles are created separately after the parent family exists.
// Children stay as parent-owned profiles and do not need login accounts.
export async function ensureParentFamilyForClerkUser(input: EnsureParentFamilyInput) {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const existingParent = await tx.user.findUnique({
      where: { clerkUserId: input.clerkUserId },
      include: {
        familyMembers: {
          include: { family: true },
          where: { role: "PARENT" },
          take: 1,
        },
      },
    });

    if (existingParent?.familyMembers[0]) {
      return {
        user: existingParent,
        family: existingParent.familyMembers[0].family,
        created: false,
      };
    }

    const parentName = input.name?.trim() || input.email?.split("@")[0] || "Parent";
    const familyName = input.familyName?.trim() || `${parentName}'s Family`;

    const family = await tx.family.create({
      data: {
        name: familyName,
        members: {
          create: {
            role: "PARENT",
            approved: true,
            user: {
              create: {
                clerkUserId: input.clerkUserId,
                email: input.email || null,
                name: parentName,
                role: "PARENT",
              },
            },
          },
        },
        economySettings: {
          create: {
            currencyType: "VIRTUAL_TOKENS",
            tokenName: "tokens",
            requireApprovalForPayouts: true,
            allowChildProposals: true,
            allowTrustedAdultJobs: true,
            defaultProofRequirement: "AFTER_ONLY",
          },
        },
      },
      include: {
        members: {
          include: { user: true },
        },
      },
    });

    return {
      user: family.members[0].user,
      family,
      created: true,
    };
  });
}

type CreateFirstChildProfileInput = {
  familyId: string;
  name: string;
  age: number;
};

export async function createFirstChildProfile(input: CreateFirstChildProfileInput) {
  const childName = input.name.trim();

  if (!childName) {
    throw new Error("Child name is required.");
  }

  if (!Number.isInteger(input.age) || input.age < 3 || input.age > 18) {
    throw new Error("Child age must be between 3 and 18.");
  }

  const prisma = getPrisma();

  return prisma.familyMember.create({
    data: {
      family: { connect: { id: input.familyId } },
      role: Role.CHILD,
      approved: true,
      user: {
        create: {
          name: childName,
          role: Role.CHILD,
          avatarColor: "#4285F4",
          childProfile: {
            create: {
              age: input.age,
              tokenBalance: 0,
              virtues: ["helpfulness", "responsibility", "initiative"],
            },
          },
        },
      },
    },
    include: {
      user: {
        include: { childProfile: true },
      },
    },
  });
}

export async function getCurrentClerkParentProfile() {
  const user = await currentUser();

  return {
    clerkUserId: user?.id ?? null,
    email: user?.primaryEmailAddress?.emailAddress ?? null,
    name: user?.fullName ?? user?.firstName ?? null,
  };
}

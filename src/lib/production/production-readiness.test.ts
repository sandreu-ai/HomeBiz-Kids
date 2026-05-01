import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (relativePath: string) =>
  readFileSync(path.join(root, relativePath), "utf8");

describe("production readiness scaffold", () => {
  it("centralizes service readiness checks for Clerk and database", () => {
    const configPath = "src/lib/config/app-mode.ts";
    expect(existsSync(path.join(root, configPath))).toBe(true);

    const config = read(configPath);
    expect(config).toContain("isClerkConfigured");
    expect(config).toContain("isDatabaseConfigured");
    expect(config).toContain("getMissingProductionServiceKeys");
    expect(config).toContain("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
    expect(config).toContain("CLERK_SECRET_KEY");
    expect(config).toContain("DATABASE_URL");
  });

  it("adds a server-only Prisma client singleton without embedding a database URL", () => {
    const dbPath = "src/lib/db.ts";
    expect(existsSync(path.join(root, dbPath))).toBe(true);

    const db = read(dbPath);
    expect(db).toContain("server-only");
    expect(db).toContain("PrismaClient");
    expect(db).toContain("PrismaPg");
    expect(db).toContain("getPrisma");
    expect(db).toContain("globalForPrisma");
    expect(db).not.toMatch(/postgresql:\/\//);
  });

  it("adds a parent-family session scaffold that keeps children under a parent account", () => {
    const sessionPath = "src/lib/family/parent-family-session.ts";
    expect(existsSync(path.join(root, sessionPath))).toBe(true);

    const session = read(sessionPath);
    expect(session).toContain("getParentFamilySessionStatus");
    expect(session).toContain("ensureParentFamilyForClerkUser");
    expect(session).toContain("clerkUserId");
    expect(session).toContain("PARENT");
    expect(session).toContain("Child profiles are created separately");
    expect(session).not.toContain("childEmail");
  });

  it("adds a guarded onboarding route for the first real family setup", () => {
    const onboardingPath = "src/app/onboarding/page.tsx";
    expect(existsSync(path.join(root, onboardingPath))).toBe(true);

    const onboarding = read(onboardingPath);
    expect(onboarding).toContain("getParentFamilySessionStatus");
    expect(onboarding).toContain("/sign-up");
    expect(onboarding).toContain("Add your first child profile");
    expect(onboarding).toContain("children stay as parent-owned profiles");
  });

  it("points public acquisition CTAs at sign-up while preserving explicit demo access", () => {
    const publicNav = read("src/components/layout/PublicNav.tsx");
    const landing = read("src/app/page.tsx");
    const pricing = read("src/app/pricing/page.tsx");

    expect(publicNav).toContain('href="/sign-in"');
    expect(publicNav).toContain('href="/sign-up"');
    expect(landing).toContain('href="/sign-up"');
    expect(pricing).toContain('href="/sign-up"');
    expect(landing).toContain('href="/dashboard"');
    expect(landing).toContain("View demo dashboard");
  });
});

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = join(__dirname, "../../..");
const schema = readFileSync(join(repoRoot, "prisma/schema.prisma"), "utf8");
const types = readFileSync(join(repoRoot, "src/types/index.ts"), "utf8");

describe("HomeBiz Kids product safety rules", () => {
  it("keeps child profiles parent-owned without requiring child email addresses", () => {
    expect(schema).toContain("email         String?             @unique");
    expect(types).toContain("email?: string");
  });

  it("does not model an in-app fiat wallet or cash rewards", () => {
    const forbiddenPatterns = [
      /\bFIAT\b/,
      /\bCASH\b/,
      /cashBalance/,
      /cashReward/,
      /cashAsk/,
      /cashEarned/,
      /targetCash/,
      /savedCash/,
      /\bcash\s+Float/,
      /totalCashEarned/,
    ];

    for (const pattern of forbiddenPatterns) {
      expect(`${schema}\n${types}`, `Forbidden real-money wallet schema pattern: ${pattern}`).not.toMatch(pattern);
    }
  });
});

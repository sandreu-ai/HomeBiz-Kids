import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const landing = () => readFileSync(path.join(root, "src/app/page.tsx"), "utf8");

describe("landing page positioning", () => {
  it("leads with concise entrepreneurial character formation instead of word salad", () => {
    const page = landing();
    const publicCopy = [
      page,
      readFileSync(path.join(root, "src/app/about/page.tsx"), "utf8"),
      readFileSync(path.join(root, "src/app/layout.tsx"), "utf8"),
      readFileSync(path.join(root, "src/components/layout/PublicFooter.tsx"), "utf8"),
    ].join("\n");

    expect(page).toContain("Gamify your child’s growth into a better human being.");
    expect(publicCopy).toContain("entrepreneurial mindset");
    expect(publicCopy).toContain("better human");
    expect(publicCopy).not.toMatch(/family marketplace that rewires the brain/i);
    expect(publicCopy).not.toContain("successful, goal-oriented, detailed, generous, entrepreneurial, and peaceful to live with");
  });
});

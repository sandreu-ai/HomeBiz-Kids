import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");

describe("public SEO structured data", () => {
  it("publishes WebApplication and Organization JSON-LD on the root layout", () => {
    expect(layout).toContain("application/ld+json");
    expect(layout).toContain('"@type": "WebApplication"');
    expect(layout).toContain('"@type": "Organization"');
    expect(layout).toContain("HomeBiz Kids");
    expect(layout).toContain("https://www.homebizkids.com");
  });

  it("keeps the canonical production domain aligned across metadata and schema", () => {
    expect(layout).toContain('metadataBase: new URL("https://www.homebizkids.com")');
    expect(layout).toContain('const baseUrl = "https://www.homebizkids.com"');
    expect(layout).toContain("url: baseUrl");
  });
});

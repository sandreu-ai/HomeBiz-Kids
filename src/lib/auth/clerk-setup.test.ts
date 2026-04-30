import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (relativePath: string) =>
  readFileSync(path.join(root, relativePath), "utf8");

describe("Clerk auth setup", () => {
  it("installs Clerk and wraps the app with ClerkProvider while keeping demo session local", () => {
    const pkg = JSON.parse(read("package.json"));
    const providers = read("src/providers/index.tsx");

    expect(pkg.dependencies["@clerk/nextjs"]).toBeTruthy();
    expect(providers).toContain("ClerkProvider");
    expect(providers).toContain("DemoSessionProvider");
    expect(providers).toContain("isClerkConfigured");
    expect(providers).toContain("<ClerkProvider>\n      <DemoSessionProvider>");
    expect(providers).toContain("return <DemoSessionProvider>{children}</DemoSessionProvider>");
  });

  it("adds hosted auth routes and protects real app sections with the Next.js proxy convention", () => {
    const proxyPath = "src/proxy.ts";

    expect(existsSync(path.join(root, "src/app/sign-in/[[...sign-in]]/page.tsx"))).toBe(true);
    expect(existsSync(path.join(root, "src/app/sign-up/[[...sign-up]]/page.tsx"))).toBe(true);
    expect(existsSync(path.join(root, proxyPath))).toBe(true);
    expect(existsSync(path.join(root, "src/middleware.ts"))).toBe(false);

    const proxy = read(proxyPath);
    expect(proxy).toContain("clerkMiddleware");
    expect(proxy).toContain("isClerkConfigured");
    expect(proxy).toContain("NextResponse.next");
    expect(proxy).toContain("/dashboard(.*)");
    expect(proxy).toContain("/child(.*)");
    expect(proxy).toContain("/trusted(.*)");
    expect(proxy).toContain("auth.protect");
  });

  it("documents only placeholder Clerk environment variables", () => {
    const envExample = read(".env.example");

    expect(envExample).toContain("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=");
    expect(envExample).toContain("CLERK_SECRET_KEY=");
    expect(envExample).toContain("NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in");
    expect(envExample).toContain("NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up");
    expect(envExample).toContain("NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard");
    expect(envExample).not.toMatch(/pk_(live|test)_[A-Za-z0-9]/);
    expect(envExample).not.toMatch(/sk_(live|test)_[A-Za-z0-9]/);
  });
});

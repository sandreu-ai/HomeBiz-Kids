import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = join(__dirname, "../../..");
const read = (path: string) => readFileSync(join(repoRoot, path), "utf8");

describe("child portal experience direction", () => {
  it("gives children a playful portal shell that is visually distinct from the parent dashboard", () => {
    const childNav = read("src/components/layout/ChildNav.tsx");
    const childHome = read("src/app/child/page.tsx");

    expect(childNav).toContain("kid-portal-shell");
    expect(childNav).toContain("Problem-solving station");
    expect(childHome).toContain("Where kids make a difference");
    expect(childHome).toContain("Solve a problem today");
    expect(childHome).not.toContain("Where kids run a tiny business");
    expect(childHome).not.toContain("My tiny business HQ");
    expect(childHome).toContain("Playful avatar");
    expect(childHome).toContain("sticker-style");
  });

  it("ships selectable illustrated kid avatars for boys and girls", () => {
    const avatarLibrary = read("src/lib/child-portal/avatar-options.ts");
    const avatarPicker = read("src/components/child/AvatarPicker.tsx");

    expect(avatarLibrary).toContain("KID_AVATAR_OPTIONS");
    expect(avatarLibrary).toMatch(/gender:\s*"boy"/);
    expect(avatarLibrary).toMatch(/gender:\s*"girl"/);
    expect(avatarLibrary.match(/gender:\s*"boy"/g)?.length ?? 0).toBeGreaterThanOrEqual(6);
    expect(avatarLibrary.match(/gender:\s*"girl"/g)?.length ?? 0).toBeGreaterThanOrEqual(6);
    expect(avatarLibrary.match(/id:\s*"avatar-/g)?.length ?? 0).toBeGreaterThanOrEqual(12);
    expect(avatarLibrary).toContain("hijab");
    expect(avatarLibrary).toContain("glasses");
    expect(avatarLibrary).toContain("side-sweep");
    expect(avatarPicker).toContain("Choose your character");
    expect(avatarPicker).toContain("LittleIllustratedKid");
  });

  it("lets children build a custom avatar from constrained polished parts", () => {
    const avatarLibrary = read("src/lib/child-portal/avatar-options.ts");
    const avatarPicker = read("src/components/child/AvatarPicker.tsx");
    const childHome = read("src/app/child/page.tsx");

    expect(avatarLibrary).toContain("AVATAR_BUILDER_PARTS");
    expect(avatarLibrary).toContain("skinTones");
    expect(avatarLibrary).toContain("hairStyles");
    expect(avatarLibrary).toContain("hairColors");
    expect(avatarLibrary).toContain("shirtColors");
    expect(avatarLibrary).toContain("#4285F4");
    expect(avatarLibrary).toContain("#EA4335");
    expect(avatarLibrary).toContain("#FBBC04");
    expect(avatarLibrary).toContain("#34A853");
    expect(avatarLibrary).not.toContain("Lavender");
    expect(avatarLibrary).not.toContain("Coral");
    expect(avatarLibrary).toContain("accessories");
    expect(avatarLibrary).toContain("buildKidAvatarOption");
    expect(avatarPicker).toContain("Build your avatar");
    expect(avatarPicker).toContain("Choose skin tone");
    expect(avatarPicker).toContain("Choose hair style");
    expect(avatarPicker).toContain("Choose shirt color");
    expect(avatarPicker).toContain("Choose accessory");
    expect(avatarPicker).toContain("Use this character");
    expect(avatarPicker).toContain("✓");
    expect(avatarPicker).not.toContain("{avatar.gender}");
    expect(avatarPicker).toContain("useState");
    expect(childHome).toContain("Build your avatar");
  });

  it("keeps the child invoice builder simple and camera-first with before photos carried into invoices", () => {
    const invoicePage = read("src/app/child/invoices/new/page.tsx");
    const photoCard = read("src/components/proof/PhotoUploadCard.tsx");

    expect(invoicePage).toContain("Simple kid invoice");
    expect(invoicePage).toContain("Before photo from when you started");
    expect(invoicePage).toContain("Take an after picture");
    expect(invoicePage).toContain("What did you do?");
    expect(invoicePage).toContain("Tokens requested");
    expect(photoCard).toContain('capture="environment"');
    expect(photoCard).toContain("Open camera");
  });
});

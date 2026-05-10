// One-off icon generator. Reads public/logo.svg and writes PNG variants for PWA + iOS.
// Run with: node scripts/gen-icons.mjs
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");
const ICONS = join(PUBLIC, "icons");
mkdirSync(ICONS, { recursive: true });

const BONE = "#FAF7F2";
const BLUE_DEEP = "#1A73E8";
const sourceSvg = readFileSync(join(PUBLIC, "logo.svg"));

// Trim the SVG's internal whitespace first, then place the logomark larger inside
// the app icon. The old generator rendered the visible house at ~35% of the
// icon; these scales make the visible logo roughly 75% larger while preserving
// safe margins for iOS/PWA masks.
async function renderLogo(markSize) {
  return sharp(sourceSvg)
    .resize(1024, 1024, { fit: "contain" })
    .trim({ threshold: 8 })
    .resize(markSize, markSize, { fit: "inside" })
    .png()
    .toBuffer();
}

async function emitIcon(size, outName, bg = BONE, markPct = 0.62) {
  const markSize = Math.round(size * markPct);
  const offset = Math.round((size - markSize) / 2);
  const logo = await renderLogo(markSize);
  return sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(join(ICONS, outName));
}

// Maskable icons keep a little more safe area so OS-level crops do not cut off
// the roof while still making the logo materially larger than before.
async function emitMaskable(size, outName) {
  return emitIcon(size, outName, BLUE_DEEP, 0.58);
}

const sizes = [
  ["icon-192.png", 192, "padded"],
  ["icon-256.png", 256, "padded"],
  ["icon-384.png", 384, "padded"],
  ["icon-512.png", 512, "padded"],
  ["icon-maskable-192.png", 192, "maskable"],
  ["icon-maskable-512.png", 512, "maskable"],
];

const tasks = sizes.map(([name, size, kind]) =>
  kind === "maskable" ? emitMaskable(size, name) : emitIcon(size, name)
);

// apple-touch-icon: 180×180, no transparency (iOS clips a rounded square)
tasks.push(emitIcon(180, "../apple-touch-icon.png", "#FFFFFF", 0.65));

// favicon ico-style — use a 32×32 PNG (modern browsers accept PNG favicons)
tasks.push(emitIcon(32, "../favicon.png", BONE, 0.72));

// Smaller iOS sizes (older devices)
tasks.push(emitIcon(120, "icon-120.png", "#FFFFFF", 0.65));
tasks.push(emitIcon(152, "icon-152.png", "#FFFFFF", 0.65));
tasks.push(emitIcon(167, "icon-167.png", "#FFFFFF", 0.65));

await Promise.all(tasks);
console.log("✓ Icons written to public/icons + apple-touch-icon.png + favicon.png");

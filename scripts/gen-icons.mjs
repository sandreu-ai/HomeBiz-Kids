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

// Standard PWA sizes — square logo on bone background, padded
async function emitPadded(size, outName, bg = BONE, padPct = 0.18) {
  const inner = Math.round(size * (1 - padPct * 2));
  const offset = Math.round((size - inner) / 2);
  const logo = await sharp(sourceSvg).resize(inner, inner).png().toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(join(ICONS, outName));
}

// Maskable: blue background, full-bleed safe area (logo at 60% to satisfy mask)
async function emitMaskable(size, outName) {
  const inner = Math.round(size * 0.6);
  const offset = Math.round((size - inner) / 2);
  const logo = await sharp(sourceSvg).resize(inner, inner).png().toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: BLUE_DEEP },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(join(ICONS, outName));
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
  kind === "maskable" ? emitMaskable(size, name) : emitPadded(size, name)
);

// apple-touch-icon: 180×180, no transparency (iOS clips a rounded square)
tasks.push(emitPadded(180, "../apple-touch-icon.png", "#FFFFFF", 0.16));

// favicon ico-style — use a 32×32 PNG (modern browsers accept PNG favicons)
tasks.push(emitPadded(32, "../favicon.png", BONE, 0.12));

// Smaller iOS sizes (older devices)
tasks.push(emitPadded(120, "icon-120.png", "#FFFFFF", 0.16));
tasks.push(emitPadded(152, "icon-152.png", "#FFFFFF", 0.16));
tasks.push(emitPadded(167, "icon-167.png", "#FFFFFF", 0.16));

await Promise.all(tasks);
console.log("✓ Icons written to public/icons + apple-touch-icon.png + favicon.png");

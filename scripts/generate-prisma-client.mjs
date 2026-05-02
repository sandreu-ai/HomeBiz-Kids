import { spawnSync } from "node:child_process";

// Prisma 7 loads prisma.config.ts during `prisma generate`, and this project's
// config expects DATABASE_URL to exist. Client generation does not need a real
// database connection, so provide a harmless placeholder when preview/build
// environments have not configured the production database yet.
process.env.DATABASE_URL ||= "postgresql://user:password@localhost:5432/homebizkids";

const result = spawnSync("prisma", ["generate"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

process.exit(result.status ?? 1);

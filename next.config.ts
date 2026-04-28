import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root so it doesn't pick up stray lockfiles in
  // parent directories. Uses the directory that Next.js spawns from.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

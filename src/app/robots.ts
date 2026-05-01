import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/child/",
          "/trusted/",
          "/sign-in/",
          "/sign-up/",
          "/onboarding/",
        ],
      },
    ],
    sitemap: "https://www.homebizkids.com/sitemap.xml",
    host: "https://www.homebizkids.com",
  };
}

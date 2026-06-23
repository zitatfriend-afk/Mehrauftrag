import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.mehrauftrag.de/sitemap.xml",
    host: "https://www.mehrauftrag.de",
  };
}

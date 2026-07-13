import type { MetadataRoute } from "next";

const BASE = "https://www.mehrauftrag.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/google-ads",
    "/elektriker",
    "/kostenlose-analyse",
    "/webseite-fuer-gebaeudereinigung",
    "/webseite-fuer-schweisser",
    "/karriere",
  ];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}

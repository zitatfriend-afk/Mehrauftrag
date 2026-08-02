import type { MetadataRoute } from "next";
import { getAllSlugs } from "./ratgeber/_articles";

const BASE = "https://www.mehrauftrag.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "",
    "/grafikdesign",
    "/google-ads",
    "/elektriker",
    "/kostenlose-analyse",
    "/webseite-fuer-gastronomie",
    "/webseite-fuer-restaurant",
    "/webseite-fuer-pizzeria",
    "/webseite-fuer-cafe",
    "/webseite-fuer-bar",
    "/webseite-fuer-foodtruck",
    "/webseite-fuer-hausmeisterservice",
    "/webseite-fuer-gebaeudereinigung",
    "/webseite-fuer-schweisser",
    "/karriere",
    "/ratgeber",
  ];

  const ratgeberRoutes = getAllSlugs().map((slug) => `/ratgeber/${slug}`);

  return [...routes, ...ratgeberRoutes].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}

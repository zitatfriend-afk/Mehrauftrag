import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { getAllSlugs } from "./ratgeber/_articles";
import { getAllAnalyseSlugs } from "./analyse/_analyse-content";

const BASE = "https://www.mehrauftrag.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "",
    "/grafikdesign",
    "/google-ads",
    "/elektriker",
    "/kostenlose-analyse",
    "/webseite-fuer-kosmetikstudio",
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
    "/webdesign-standorte",
  ];

  // Stadt-Landingpages: alle webdesign-*.html aus /public automatisch aufnehmen,
  // damit neue Wellen ohne Codeaenderung in der Sitemap landen.
  const stadtRoutes = readdirSync(join(process.cwd(), "public"))
    .filter((f) => f.startsWith("webdesign-") && f.endsWith(".html"))
    .map((f) => `/${f.replace(/\.html$/, "")}`)
    .sort();

  const ratgeberRoutes = getAllSlugs().map((slug) => `/ratgeber/${slug}`);
  const analyseRoutes = getAllAnalyseSlugs().map((slug) => `/analyse/${slug}`);

  return [...routes, ...stadtRoutes, ...ratgeberRoutes, ...analyseRoutes].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}

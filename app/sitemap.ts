import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { getAllSlugs } from "./ratgeber/_articles";
import { getAllAnalyseSlugs, getAnalyse } from "./analyse/_analyse-content";
import ROUTEN from "./routen.json";
import LASTMOD from "./lastmod.json";

const BASE = "https://www.mehrauftrag.de";

// Echte Aenderungsdaten pro URL. Erzeugt von scripts/lastmod.mjs aus der
// git-Historie und mit eingecheckt.
//
// Frueher stand hier `lastModified: new Date()` fuer JEDE URL. Damit trugen
// alle 66 Eintraege denselben Zeitstempel, naemlich den des Vercel-Builds.
// Google erkennt so etwas als Build-Artefakt und ignoriert lastmod dann fuer
// die ganze Domain. Eine URL ohne Eintrag bekommt hier bewusst KEIN
// lastModified - lieber keine Angabe als eine erfundene.
const DATEN: Record<string, string> = LASTMOD;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ROUTEN.routen.map((r) => r.pfad);

  // Stadt-Landingpages: alle webdesign-*.html aus /public automatisch aufnehmen,
  // damit neue Wellen ohne Codeaenderung in der Sitemap landen.
  const stadtRoutes = readdirSync(join(process.cwd(), "public"))
    .filter((f) => f.startsWith("webdesign-") && f.endsWith(".html"))
    .map((f) => `/${f.replace(/\.html$/, "")}`)
    .sort();

  const ratgeberRoutes = getAllSlugs().map((slug) => `/ratgeber/${slug}`);
  // Auf noindex gesetzte Analyse-Seiten gehoeren nicht in die Sitemap:
  // eine Sitemap-URL mit noindex ist ein Widerspruch und kostet Crawl-Budget.
  const analyseRoutes = getAllAnalyseSlugs()
    .filter((slug) => !getAnalyse(slug)?.noindex)
    .map((slug) => `/analyse/${slug}`);

  return [...routes, ...stadtRoutes, ...ratgeberRoutes, ...analyseRoutes].map((path) => {
    const stand = DATEN[path];
    return {
      url: `${BASE}${path}`,
      // changeFrequency ist bewusst weg: Google wertet den Wert seit Jahren
      // nicht aus, und "weekly" auf allen Seiten war ohnehin nur eine
      // Behauptung.
      ...(stand ? { lastModified: new Date(stand) } : {}),
      priority: path === "" ? 1 : 0.8,
    };
  });
}

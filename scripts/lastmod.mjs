#!/usr/bin/env node
/**
 * Schreibt app/lastmod.json: pro Sitemap-URL das ECHTE Aenderungsdatum.
 *
 * Warum es dieses Skript gibt:
 * app/sitemap.ts hat frueher fuer jede der 66 URLs `new Date()` gesetzt, also
 * den Zeitpunkt des Vercel-Builds - millisekundengenau identisch. Fuer Google
 * ist das kein Aenderungsdatum, sondern ein Build-Zeitstempel, und es
 * ignoriert lastmod dann komplett. Ein lastmod ist nur so viel wert, wie es
 * ehrlich ist.
 *
 * Woher das Datum kommt:
 *   - Feste Seiten  : git log -1 --format=%cI -- <quelldatei>
 *                     (Quelldateien stehen in app/routen.json)
 *   - Stadtseiten   : git log -1 --format=%cI -- public/webdesign-<stadt>.html
 *   - Ratgeber      : git log -L <von>,<bis>:app/ratgeber/_articles.ts
 *   - Analyse       : git log -L <von>,<bis>:app/analyse/_analyse-content.ts
 * Bei den beiden letzten liegen alle Seiten in EINER Datei. -L schaut deshalb
 * nur auf die Zeilen des jeweiligen Artikels, sonst haetten wieder alle
 * Ratgeber dasselbe Datum.
 *
 * Wenn kein verlaessliches Datum ermittelbar ist - kein git, Datei noch nie
 * committet, oder uncommittete Aenderungen im Arbeitsverzeichnis - wird die
 * URL ausgelassen. Dann steht in der Sitemap gar kein lastmod fuer sie. Das
 * ist erlaubt und deutlich besser als ein falscher Wert.
 *
 * Aufruf:  node scripts/lastmod.mjs         (schreibt app/lastmod.json)
 *          node scripts/lastmod.mjs --check (prueft nur, Exit 1 bei Abweichung)
 *
 * Laeuft NICHT auf Vercel. Vercel checkt flach aus, da gibt es keine
 * Historie. Deshalb wird app/lastmod.json mit eingecheckt und zur Buildzeit
 * nur noch gelesen.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ZIEL = join(ROOT, "app", "lastmod.json");
const CHECK_ONLY = process.argv.includes("--check");

const warnungen = [];

function git(args) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

if (git(["rev-parse", "--is-inside-work-tree"]) !== "true") {
  console.error("Kein git-Repository. Es wurde nichts geschrieben.");
  console.error("Ohne Historie gibt es kein echtes Aenderungsdatum - dann lieber kein lastmod.");
  process.exit(1);
}

// Dateien mit uncommitteten Aenderungen. Fuer die stimmt das Commit-Datum
// nicht mehr, also lieber kein lastmod als ein zu altes.
const schmutzig = new Set(
  git(["status", "--porcelain"])
    .split("\n")
    .filter(Boolean)
    .map((z) => z.slice(3).trim().replace(/^"|"$/g, ""))
    .map((z) => (z.includes(" -> ") ? z.split(" -> ")[1] : z))
);

function datumDatei(pfade) {
  const gueltig = pfade.filter((p) => existsSync(join(ROOT, p)));
  if (!gueltig.length) {
    warnungen.push(`Quelldatei fehlt: ${pfade.join(", ")}`);
    return null;
  }
  const dreckig = gueltig.filter((p) => schmutzig.has(p));
  if (dreckig.length) {
    warnungen.push(`uncommittet, lastmod ausgelassen: ${dreckig.join(", ")}`);
    return null;
  }
  const daten = gueltig.map((p) => git(["log", "-1", "--format=%cI", "--", p])).filter(Boolean);
  if (!daten.length) return null;
  return daten.sort().at(-1);
}

function datumZeilen(datei, von, bis) {
  if (schmutzig.has(datei)) {
    warnungen.push(`uncommittet, lastmod ausgelassen: ${datei}`);
    return null;
  }
  const roh = git(["log", "-L", `${von},${bis}:${datei}`, "--format=%cI", "-s", "-1"]);
  return roh.split("\n")[0].trim() || null;
}

/** Findet fuer jeden `slug: "x"` in einer Datendatei den Zeilenbereich seines Objekts. */
function slugBereiche(datei) {
  const zeilen = readFileSync(join(ROOT, datei), "utf8").split("\n");
  const treffer = [];
  zeilen.forEach((zeile, i) => {
    const m = zeile.match(/^\s*slug:\s*"([a-z0-9-]+)"/);
    if (m) treffer.push({ slug: m[1], zeile: i + 1 });
  });
  return treffer.map((t, i) => ({
    slug: t.slug,
    von: t.zeile,
    bis: i + 1 < treffer.length ? treffer[i + 1].zeile - 1 : zeilen.length,
  }));
}

// ------------------------------------------------------------------ Sammeln

const lastmod = {};
const ROUTEN = JSON.parse(readFileSync(join(ROOT, "app", "routen.json"), "utf8")).routen;

for (const r of ROUTEN) {
  const d = datumDatei(r.quelle);
  if (d) lastmod[r.pfad] = d;
}

/**
 * Stadtseiten. Sonderfall, deshalb eine eigene Funktion.
 *
 * scripts/nachbarstaedte.mjs schreibt bei jeder neuen Welle die Linkbloecke
 * auf mehreren Bestandsseiten neu. Wuerde das als Aenderung zaehlen, haetten
 * nach jeder Welle wieder alle Stadtseiten denselben Zeitstempel - und genau
 * so ein Muster ("jede Woche hat sich alles geaendert") ist der Grund, warum
 * Google lastmod misstraut. Ein neuer Nachbarlink ist keine inhaltliche
 * Aenderung der Seite. Deshalb ueberspringen wir Commits, die an dieser
 * Datei NUR den Nachbarblock angefasst haben, und nehmen den Commit davor.
 */
function nurNachbarbloecke(diff) {
  const zeilen = diff
    .split("\n")
    .filter((z) => (z.startsWith("+") || z.startsWith("-")) && !z.startsWith("+++") && !z.startsWith("---"))
    .map((z) => z.slice(1).trim());
  if (!zeilen.length) return false;
  return zeilen.every(
    (z) =>
      z === "" ||
      z.includes("nachbarstaedte:start") ||
      z.includes("nachbarstaedte:end") ||
      z.includes("nachbarstaedte-footer:start") ||
      z.includes("nachbarstaedte-footer:end") ||
      // eine Zeile, die ausser Stadt-Links nichts enthaelt
      /^(<p>)?(\s*<a href="\/webdesign-[^"]+">[^<]*<\/a>\s*(·)?\s*)+(<\/p>)?$/.test(z)
  );
}

function datumStadtseite(datei) {
  const pfad = `public/${datei}`;
  if (schmutzig.has(pfad)) {
    warnungen.push(`uncommittet, lastmod ausgelassen: ${pfad}`);
    return null;
  }
  const commits = git(["log", "--format=%H %cI", "--", pfad]).split("\n").filter(Boolean);
  for (const zeile of commits) {
    const [sha, iso] = zeile.split(" ");
    const diff = git(["show", "--format=", "--unified=0", sha, "--", pfad]);
    if (!diff) continue;
    if (nurNachbarbloecke(diff)) continue;
    return iso;
  }
  return null;
}

for (const datei of readdirSync(join(ROOT, "public")).filter((f) => f.startsWith("webdesign-") && f.endsWith(".html")).sort()) {
  const d = datumStadtseite(datei);
  if (d) lastmod[`/${datei.replace(/\.html$/, "")}`] = d;
}

// Ratgeber. Zusaetzlich ein Abgleich mit dateModified aus dem JSON-LD:
// wenn der Text neuer ist als das ausgezeichnete Datum, passen Sitemap und
// Article-Schema nicht mehr zusammen.
const ratgeberDatei = "app/ratgeber/_articles.ts";
const ratgeberText = readFileSync(join(ROOT, ratgeberDatei), "utf8");
for (const b of slugBereiche(ratgeberDatei)) {
  const d = datumZeilen(ratgeberDatei, b.von, b.bis);
  if (!d) continue;
  lastmod[`/ratgeber/${b.slug}`] = d;
  const block = ratgeberText.split("\n").slice(b.von - 1, b.bis).join("\n");
  const dm = block.match(/dateModified:\s*"(\d{4}-\d{2}-\d{2})"/);
  if (dm && dm[1] < d.slice(0, 10)) {
    warnungen.push(`/ratgeber/${b.slug}: dateModified ${dm[1]} ist aelter als die letzte Textaenderung ${d.slice(0, 10)}`);
  }
}

// Analyse-Seiten
const analyseDatei = "app/analyse/_analyse-content.ts";
for (const b of slugBereiche(analyseDatei)) {
  const d = datumZeilen(analyseDatei, b.von, b.bis);
  if (d) lastmod[`/analyse/${b.slug}`] = d;
}

// ------------------------------------------------------------------ Schreiben

const sortiert = Object.fromEntries(Object.keys(lastmod).sort().map((k) => [k, lastmod[k]]));
const inhalt = JSON.stringify(sortiert, null, 2) + "\n";
const alt = existsSync(ZIEL) ? readFileSync(ZIEL, "utf8") : "";

console.log(`URLs mit echtem Aenderungsdatum: ${Object.keys(sortiert).length}`);
const verschiedene = new Set(Object.values(sortiert)).size;
console.log(`Verschiedene Zeitstempel: ${verschiedene}`);
if (verschiedene <= 1 && Object.keys(sortiert).length > 1) {
  console.error("Alle URLs haben denselben Zeitstempel. Das war genau der alte Fehler. Abbruch.");
  process.exit(1);
}
for (const w of warnungen) console.log("  Hinweis: " + w);

if (CHECK_ONLY) {
  if (alt !== inhalt) {
    console.error("\napp/lastmod.json ist nicht aktuell. Bitte 'npm run lastmod' laufen lassen.");
    process.exit(1);
  }
  console.log("\napp/lastmod.json ist aktuell.");
} else if (alt === inhalt) {
  console.log("\napp/lastmod.json war bereits aktuell.");
} else {
  writeFileSync(ZIEL, inhalt, "utf8");
  console.log("\napp/lastmod.json geschrieben.");
}

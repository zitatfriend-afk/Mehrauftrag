#!/usr/bin/env node
/**
 * Baut auf jeder Stadt-Landingpage in public/webdesign-*.html den Block
 * "Webdesign in der Naehe" neu auf: 4 bis 6 echte <a href> auf die
 * geografisch naechstgelegenen Stadtseiten, ohne rel="nofollow".
 *
 * Warum es dieses Skript gibt:
 * Die Linkbloecke waren frueher von Hand geschrieben und blieben stehen, wie
 * sie beim Anlegen der Seite aussahen. Neue Staedte einer Welle bekamen
 * dadurch NULL eingehende Links von den Bestandsseiten. Genau die Seiten
 * ohne eingehende Links landen in der Search Console unter
 * "Gefunden - zurzeit nicht indexiert". Nach jeder Welle einmal dieses Skript
 * laufen lassen, dann ist der Linkgraph wieder vollstaendig.
 *
 * Aufruf:  node scripts/nachbarstaedte.mjs         (schreibt)
 *          node scripts/nachbarstaedte.mjs --check (prueft nur, Exit 1 bei Abweichung)
 *
 * Koordinaten stehen in scripts/staedte-geo.json. Eine Stadt ohne Eintrag
 * wird uebersprungen und die Datei bleibt unveraendert - lieber kein Block
 * als ein falscher.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const CHECK_ONLY = process.argv.includes("--check");

// Wie viele Nachbarn pro Seite. Untergrenze, damit jede Seite genug
// Kontext bekommt, Obergrenze, damit kein Linkteppich entsteht.
const MIN_LINKS = 4;
const MAX_LINKS = 6;
// Startwert vor dem Symmetrisieren. 5 plus Rueckrichtung landet in der Praxis
// bei 5 bis 6 Links pro Seite.
const K = 5;
// So viele eingehende Links soll jede Stadt mindestens behalten.
const MIN_INBOUND = 4;

const START = "<!-- nachbarstaedte:start -->";
const END = "<!-- nachbarstaedte:end -->";
const FOOT_START = "<!-- nachbarstaedte-footer:start -->";
const FOOT_END = "<!-- nachbarstaedte-footer:end -->";

// ---------------------------------------------------------------- Geodaten

const GEO = JSON.parse(readFileSync(join(ROOT, "scripts", "staedte-geo.json"), "utf8"));

function distanzKm(a, b) {
  const R = 6371;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// ---------------------------------------------------------------- Einlesen

const dateien = readdirSync(PUBLIC)
  .filter((f) => f.startsWith("webdesign-") && f.endsWith(".html"))
  .sort();

const staedte = [];
const ohneGeo = [];

for (const datei of dateien) {
  const slug = datei.replace(/\.html$/, "");
  const html = readFileSync(join(PUBLIC, datei), "utf8");
  const treffer = html.match(/<meta\s+name="geo\.placename"\s+content="([^"]+)"/i);
  const name = treffer ? treffer[1] : null;
  const geo = GEO[slug];

  if (!name) {
    ohneGeo.push(`${slug}: kein <meta name="geo.placename">`);
    continue;
  }
  if (!geo || typeof geo.lat !== "number" || typeof geo.lon !== "number") {
    ohneGeo.push(`${slug}: keine Koordinaten in scripts/staedte-geo.json`);
    continue;
  }
  staedte.push({ slug, datei, name, lat: geo.lat, lon: geo.lon, html });
}

if (staedte.length < 2) {
  console.error("Zu wenige Stadtseiten mit Geodaten. Abbruch, es wurde nichts geaendert.");
  process.exit(1);
}

// ------------------------------------------------------------- Linkgraph

// 1) Basis: die K naechsten Staedte.
const nachbarn = new Map();
for (const s of staedte) {
  const sortiert = staedte
    .filter((t) => t.slug !== s.slug)
    .map((t) => ({ slug: t.slug, km: distanzKm(s, t) }))
    .sort((a, b) => a.km - b.km);
  nachbarn.set(s.slug, sortiert.slice(0, K).map((t) => t.slug));
}

// 2) Symmetrisieren. Wenn A auf B zeigt, zeigt B auch auf A. Das ist der
//    Schritt, der neue Staedte aus dem Nichts holt: sie sind fuer ihre
//    Nachbarn die naechstgelegene Seite und tauchen dadurch dort auf.
for (const s of staedte) {
  for (const ziel of nachbarn.get(s.slug)) {
    const liste = nachbarn.get(ziel);
    if (liste && !liste.includes(s.slug)) liste.push(s.slug);
  }
}

const distanz = (a, b) => {
  const sa = staedte.find((s) => s.slug === a);
  const sb = staedte.find((s) => s.slug === b);
  return distanzKm(sa, sb);
};

const eingehend = (slug) =>
  staedte.filter((s) => s.slug !== slug && nachbarn.get(s.slug).includes(slug)).length;

// 3) Auf MAX_LINKS kuerzen. Es fliegt immer der weiteste Link raus, aber nur,
//    wenn das Ziel danach noch genug eingehende Links hat.
for (const s of staedte) {
  const liste = nachbarn.get(s.slug);
  liste.sort((a, b) => distanz(s.slug, a) - distanz(s.slug, b));
  while (liste.length > MAX_LINKS) {
    let entfernt = false;
    for (let i = liste.length - 1; i >= 0; i--) {
      const ziel = liste[i];
      if (eingehend(ziel) > Math.min(MIN_INBOUND, staedte.length - 1)) {
        liste.splice(i, 1);
        entfernt = true;
        break;
      }
    }
    if (!entfernt) break; // lieber ein Link zu viel als eine verwaiste Stadt
  }
}

// 3b) Der Linkgraph muss zusammenhaengen. Ohne diesen Schritt zerfaellt er in
//     Inseln (Rhein-Main hier, NRW dort). Ein Crawler, der auf einer Insel
//     landet, kommt dann nur ueber den Standort-Hub wieder heraus. Deshalb
//     das jeweils naechstgelegene Staedtepaar zwischen zwei Inseln
//     gegenseitig verlinken, bis nur noch eine Insel uebrig ist.
function komponenten() {
  const offen = new Set(staedte.map((s) => s.slug));
  const gruppen = [];
  while (offen.size) {
    const start = offen.values().next().value;
    const gruppe = new Set();
    const stapel = [start];
    while (stapel.length) {
      const aktuell = stapel.pop();
      if (gruppe.has(aktuell)) continue;
      gruppe.add(aktuell);
      offen.delete(aktuell);
      for (const z of nachbarn.get(aktuell) || []) if (!gruppe.has(z)) stapel.push(z);
      for (const s of staedte) {
        if (!gruppe.has(s.slug) && nachbarn.get(s.slug).includes(aktuell)) stapel.push(s.slug);
      }
    }
    gruppen.push(gruppe);
  }
  return gruppen;
}

for (let runde = 0; runde < staedte.length; runde++) {
  const gruppen = komponenten();
  if (gruppen.length < 2) break;
  const [a, b] = gruppen.sort((x, y) => y.size - x.size);
  let besteA = null;
  let besteB = null;
  let besteKm = Infinity;
  for (const x of a) {
    for (const y of b) {
      const km = distanz(x, y);
      if (km < besteKm) {
        besteKm = km;
        besteA = x;
        besteB = y;
      }
    }
  }
  if (!besteA || !besteB) break;
  if (!nachbarn.get(besteA).includes(besteB)) nachbarn.get(besteA).push(besteB);
  if (!nachbarn.get(besteB).includes(besteA)) nachbarn.get(besteB).push(besteA);
  // Bruecken sind gesetzt, jetzt darf wieder gekuerzt werden - aber die
  // Bruecke selbst bleibt stehen, weil sie in beiden Listen die weiteste
  // ist und ihr Ziel sonst wieder isoliert waere.
  for (const seite of [besteA, besteB]) {
    const liste = nachbarn.get(seite);
    const bruecke = seite === besteA ? besteB : besteA;
    while (liste.length > MAX_LINKS) {
      let entfernt = false;
      for (let i = liste.length - 1; i >= 0; i--) {
        const ziel = liste[i];
        if (ziel === bruecke) continue;
        if (eingehend(ziel) > Math.min(MIN_INBOUND, staedte.length - 1)) {
          liste.splice(i, 1);
          entfernt = true;
          break;
        }
      }
      if (!entfernt) break;
    }
  }
}

// 4) Sicherheitsnetz: keine Seite unter MIN_LINKS.
for (const s of staedte) {
  const liste = nachbarn.get(s.slug);
  if (liste.length >= MIN_LINKS) continue;
  const rest = staedte
    .filter((t) => t.slug !== s.slug && !liste.includes(t.slug))
    .map((t) => ({ slug: t.slug, km: distanzKm(s, t) }))
    .sort((a, b) => a.km - b.km);
  while (liste.length < Math.min(MIN_LINKS, staedte.length - 1) && rest.length) {
    liste.push(rest.shift().slug);
  }
}

// Endgueltige Reihenfolge: naechste Stadt zuerst.
for (const s of staedte) {
  nachbarn.get(s.slug).sort((a, b) => distanz(s.slug, a) - distanz(s.slug, b));
}

// ------------------------------------------------------------- HTML bauen

const nameVon = Object.fromEntries(staedte.map((s) => [s.slug, s.name]));

function absatz(slug) {
  const links = nachbarn
    .get(slug)
    .map((z) => `<a href="/${z}">Webdesign ${nameVon[z]}</a>`)
    .join(" · ");
  return `${START}\n    <p>${links}</p>\n    ${END}`;
}

function footerSpalte(slug) {
  const links = nachbarn
    .get(slug)
    .map((z) => `        <a href="/${z}">Webdesign ${nameVon[z]}</a>`)
    .join("\n");
  return `${FOOT_START}\n${links}\n        ${FOOT_END}`;
}

/**
 * Ersetzt einen Block. Beim ersten Lauf sind noch keine Marker da, dann
 * greift das Fallback-Pattern und setzt sie.
 */
function ersetze(html, startMark, endMark, neu, fallback, kontext) {
  const mitMarker = new RegExp(
    `${startMark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
  );
  if (mitMarker.test(html)) return html.replace(mitMarker, neu);
  if (fallback.test(html)) return html.replace(fallback, neu);
  throw new Error(`Block "${kontext}" nicht gefunden`);
}

let geaendert = 0;
const abweichungen = [];

for (const s of staedte) {
  let html = s.html;

  // a) Abschnitt <section id="region">: Ueberschrift und Linkabsatz.
  html = html.replace(
    /<h2>Auch in diesen Städten unterwegs<\/h2>/,
    "<h2>Webdesign in der Nähe</h2>"
  );
  html = ersetze(
    html,
    START,
    END,
    absatz(s.slug),
    /<p>(?:\s*<a href="\/webdesign-[^"]*">[^<]*<\/a>\s*(?:·)?\s*)+<\/p>/,
    `Linkabsatz in section#region (${s.slug})`
  );

  // b) Footer-Spalte "Webdesign in weiteren Städten".
  html = ersetze(
    html,
    FOOT_START,
    FOOT_END,
    footerSpalte(s.slug),
    /(?:\s*<a href="\/webdesign-[^"]*">[^<]*<\/a>)+\s*(?=<\/div>)/,
    `Footer-Spalte (${s.slug})`
  );

  if (html !== s.html) {
    abweichungen.push(s.slug);
    if (!CHECK_ONLY) {
      writeFileSync(join(PUBLIC, s.datei), html, "utf8");
      geaendert++;
    }
  }
}

// ------------------------------------------------------------- Ausgabe

console.log(`Stadtseiten mit Geodaten: ${staedte.length}`);
for (const s of staedte) {
  const liste = nachbarn.get(s.slug);
  console.log(
    `  ${s.name.padEnd(18)} -> ${liste.length} aus / ${eingehend(s.slug)} ein : ` +
      liste.map((z) => nameVon[z]).join(", ")
  );
}

if (ohneGeo.length) {
  console.log("\nUEBERSPRUNGEN (Datei blieb unveraendert):");
  for (const z of ohneGeo) console.log("  " + z);
}

const verwaist = staedte.filter((s) => eingehend(s.slug) === 0);
if (verwaist.length) {
  console.error("\nFEHLER: Staedte ohne eingehenden Link: " + verwaist.map((s) => s.slug).join(", "));
  process.exit(1);
}

if (CHECK_ONLY) {
  if (abweichungen.length) {
    console.error(
      `\nNicht aktuell: ${abweichungen.length} Seite(n) -> ${abweichungen.join(", ")}` +
        "\nBitte 'npm run nachbarstaedte' laufen lassen."
    );
    process.exit(1);
  }
  console.log("\nAlle Nachbarbloecke sind aktuell.");
} else {
  console.log(`\nGeschrieben: ${geaendert} Datei(en).`);
}

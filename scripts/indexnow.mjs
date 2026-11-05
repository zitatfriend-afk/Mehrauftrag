#!/usr/bin/env node
// IndexNow: meldet neue und geaenderte URLs automatisch an Bing (und alle
// weiteren IndexNow-Suchmaschinen wie Yandex, Seznam, Naver). Kostenlos.
//
// Warum: Bing hatte die Sitemap von Anfang August bis 05.11.2026 nicht mehr
// gelesen und nur 48 von 72 Seiten im Index. Die ChatGPT- und Copilot-Suche
// holt ihre Ergebnisse ueber Bing. Seit 05.11.2026 meldet jedes Deploy-Skript
// die Aenderungen nach dem Push selbst, damit das nie wieder vergessen wird.
//
// Welche URLs: alle, deren Eintrag in app/lastmod.json zwischen dem alten
// Stand (Argument 1, der Commit vor dem Push) und HEAD neu ist oder sich
// geaendert hat. lastmod.json bewegt sich nur bei echten Inhaltsaenderungen,
// also meldet IndexNow genau die richtigen Seiten. Ohne Argument wird
// origin/main@{1} versucht. Mit --alle werden alle Sitemap-URLs gemeldet.
//
// Ablauf: wartet, bis die neue Version live ist (Schluesseldatei und alle
// gemeldeten URLs liefern 200), hoechstens 6 Minuten, dann ein POST an
// api.indexnow.org. Fehler brechen den Deploy NICHT ab, sie werden nur gemeldet.
//
// Aufruf:  node scripts/indexnow.mjs <alter-commit>
//          node scripts/indexnow.mjs --alle
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const HOST = "www.mehrauftrag.de";
const BASE = `https://${HOST}`;
const KEY = "32e2af6a9af025da4aa2b077db877bb0";
const KEY_URL = `${BASE}/${KEY}.txt`;

function lastmodAus(ref) {
  try {
    return JSON.parse(execSync(`git show ${ref}:app/lastmod.json`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));
  } catch {
    return null;
  }
}

const args = process.argv.slice(2);
const jetzt = JSON.parse(readFileSync("app/lastmod.json", "utf8"));
let pfade;
if (args.includes("--alle")) {
  pfade = Object.keys(jetzt);
} else {
  const alt = lastmodAus(args[0] || "origin/main@{1}");
  if (!alt) {
    console.log("IndexNow: alter Stand nicht lesbar, es wird nichts gemeldet.");
    process.exit(0);
  }
  pfade = Object.keys(jetzt).filter((p) => alt[p] !== jetzt[p]);
}

if (pfade.length === 0) {
  console.log("IndexNow: keine neuen oder geaenderten Seiten, nichts zu melden.");
  process.exit(0);
}
const urls = pfade.map((p) => BASE + (p === "" ? "/" : p)).slice(0, 10000);
console.log(`IndexNow: ${urls.length} URL(s) zu melden:`);
urls.forEach((u) => console.log("  " + u));

async function status(url) {
  try {
    const r = await fetch(url, { method: "GET", redirect: "manual", cache: "no-store" });
    return r.status;
  } catch {
    return 0;
  }
}

const ende = Date.now() + 6 * 60 * 1000;
let bereit = false;
while (Date.now() < ende) {
  const s = await Promise.all([KEY_URL, ...urls].map(status));
  if (s.every((x) => x === 200)) { bereit = true; break; }
  process.stdout.write(".");
  await new Promise((r) => setTimeout(r, 15000));
}
console.log("");
if (!bereit) {
  console.log("IndexNow: Seiten nach 6 Minuten noch nicht alle live. Spaeter nachholen mit:");
  console.log(`  node scripts/indexnow.mjs ${args[0] || "<alter-commit>"}`);
  process.exit(0);
}

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_URL, urlList: urls }),
});
// 200 und 202 heissen angenommen. 422 = URL passt nicht zum Host, 403 = Schluessel nicht gefunden.
console.log(`IndexNow: Antwort ${r.status} ${r.status === 200 || r.status === 202 ? "(angenommen)" : "(bitte pruefen)"}`);

#!/usr/bin/env node
/**
 * Schreibt app/lastmod.json: pro Sitemap-URL das ECHTE Aenderungsdatum.
 *
 * Warum es dieses Skript gibt:
 * app/sitemap.ts hat frueher fuer jede URL `new Date()` gesetzt, also den
 * Zeitpunkt des Vercel-Builds - millisekundengenau identisch. Fuer Google ist
 * das kein Aenderungsdatum, sondern ein Build-Zeitstempel, und es ignoriert
 * lastmod dann fuer die ganze Domain. Ein lastmod ist nur so viel wert, wie
 * es ehrlich ist.
 *
 * Woher das Datum kommt:
 *   - Feste Seiten  : letzter Commit, der die Quelldatei inhaltlich geaendert
 *                     hat (Quelldateien stehen in app/routen.json)
 *   - Stadtseiten   : letzter Commit, der public/webdesign-<stadt>.html
 *                     AUSSERHALB der generierten Bloecke geaendert hat
 *   - Ratgeber      : git log -L <von>,<bis>:app/ratgeber/_articles.ts
 *   - Analyse       : git log -L <von>,<bis>:app/analyse/_analyse-content.ts
 * Bei den beiden letzten liegen alle Seiten in EINER Datei. -L schaut deshalb
 * nur auf die Zeilen des jeweiligen Artikels, sonst haetten wieder alle
 * Ratgeber dasselbe Datum.
 *
 * ZWEI SCHUTZMECHANISMEN gegen den Build-Zeitstempel durch die Hintertuer:
 *
 * 1. Generierte Bloecke zaehlen nicht.
 *    scripts/nachbarstaedte.mjs schreibt bei jeder Welle die Linkbloecke auf
 *    ALLEN Stadtseiten neu. Wuerde das als Aenderung zaehlen, haetten nach
 *    jeder Welle wieder alle Stadtseiten denselben Zeitstempel - also nach
 *    drei, vier Wellen exakt das Muster, wegen dem Google lastmod misstraut.
 *    Deshalb wird die Datei fuer den Vergleich zwischen zwei Commits ohne die
 *    markierten Bloecke betrachtet. Verglichen wird der echte Dateiinhalt,
 *    nicht das Aussehen des Diffs. Damit ist es egal, wie der Block spaeter
 *    einmal aussieht: alles zwischen den Markern ist generiert und loest kein
 *    lastmod aus.
 *
 * 2. scripts/lastmod-ignore.json.
 *    Sitewide-Aenderungen an der Vorlage (Ueberschrift umbenannt, CSS, ein
 *    Marker eingebaut) fassen zwar jede Seite an, aendern aber nichts am
 *    Inhalt. So ein Commit wird dort mit Begruendung eingetragen und dann
 *    uebersprungen. Der Eintrag ist Absicht und muss begruendet sein, damit
 *    spaeter nachvollziehbar bleibt, warum ein Datum nicht gewandert ist.
 *    Nicht missbrauchen: Wer echte Inhaltsaenderungen dort eintraegt, luegt
 *    Google an und verliert genau das Vertrauen, um das es hier geht.
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
const uebersprungen = [];

function git(args) {
  try {
    return execFileSync("git", args, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return "";
  }
}

const gitZeile = (args) => git(args).trim();

if (gitZeile(["rev-parse", "--is-inside-work-tree"]) !== "true") {
  console.error("Kein git-Repository. Es wurde nichts geschrieben.");
  console.error("Ohne Historie gibt es kein echtes Aenderungsdatum - dann lieber kein lastmod.");
  process.exit(1);
}

// ------------------------------------------------------- bewusst ignorierte Commits

const IGNORE_DATEI = join(ROOT, "scripts", "lastmod-ignore.json");
const IGNORIERT = existsSync(IGNORE_DATEI)
  ? JSON.parse(readFileSync(IGNORE_DATEI, "utf8"))
  : {};

/**
 * Ein Eintrag gilt entweder fuer alle Dateien (Wert ist ein Text) oder nur
 * fuer bestimmte Pfade (Wert ist { grund, pfade: [...] }, Pfade als Anfang
 * verglichen). Pfadgenau ist der Normalfall: derselbe Commit kann an einer
 * Datei eine Vorlagenkosmetik und an einer anderen eine echte Aenderung sein.
 */
function ignoriert(sha, pfad) {
  for (const [praefix, eintrag] of Object.entries(IGNORIERT)) {
    if (!praefix || !sha.startsWith(praefix)) continue;
    if (typeof eintrag === "string") return eintrag;
    const pfade = eintrag && eintrag.pfade;
    if (!pfade || !pfade.length) return eintrag.grund || "ohne Begruendung";
    if (pfade.some((p) => pfad.startsWith(p))) return eintrag.grund || "ohne Begruendung";
  }
  return null;
}

// ------------------------------------------------------- generierte Bloecke

/**
 * Alles zwischen diesen Markern wird von scripts/nachbarstaedte.mjs erzeugt
 * und ist keine inhaltliche Aenderung der Seite. Kommt spaeter ein weiterer
 * generierter Block dazu, gehoert sein Markerpaar hier hinein - sonst faengt
 * das Muster von vorne an.
 */
const GENERIERTE_BLOECKE = [
  /<!--\s*nachbarstaedte:start\s*-->[\s\S]*?<!--\s*nachbarstaedte:end\s*-->/g,
  /<!--\s*nachbarstaedte-footer:start\s*-->[\s\S]*?<!--\s*nachbarstaedte-footer:end\s*-->/g,
];

function ohneGenerierteBloecke(text) {
  let t = text;
  for (const muster of GENERIERTE_BLOECKE) t = t.replace(muster, "");
  return t.replace(/[ \t]+$/gm, "").trim();
}

// ------------------------------------------------------- Datum ermitteln

// Dateien mit uncommitteten Aenderungen. Fuer die stimmt das Commit-Datum
// nicht mehr, also lieber kein lastmod als ein zu altes.
const schmutzig = new Set(
  gitZeile(["status", "--porcelain"])
    .split("\n")
    .filter(Boolean)
    .map((z) => z.slice(3).trim().replace(/^"|"$/g, ""))
    .map((z) => (z.includes(" -> ") ? z.split(" -> ")[1] : z))
);

/**
 * Commits einer Datei, neueste zuerst.
 *
 * Die Anzahl ist bewusst begrenzt. Auf dem Mac liegt das Repo in einem
 * gemounteten Ordner; ein unbegrenzter git-log-Lauf greift tief in die
 * Packdatei und stirbt dort mit SIGBUS - ohne Fehlermeldung, das Ergebnis
 * waere einfach eine Seite ohne lastmod. 40 Commits pro Datei reichen weit
 * ueber jede reale Historie hinaus; wird die Grenze doch erreicht, wird
 * einmal mit 200 nachgefasst.
 */
function commitsVon(pfad) {
  const holen = (grenze) =>
    gitZeile(["log", "-n", String(grenze), "--format=%H %cI", "--", pfad])
      .split("\n")
      .filter(Boolean)
      .map((z) => {
        const [sha, iso] = z.split(" ");
        return { sha, iso };
      });

  let liste = holen(40);
  if (liste.length === 40) {
    const mehr = holen(200);
    if (mehr.length > liste.length) liste = mehr;
  }
  if (!liste.length) {
    const teile = gitZeile(["log", "-1", "--format=%H %cI", "--", pfad]).split(" ");
    if (teile.length === 2) liste = [{ sha: teile[0], iso: teile[1] }];
  }
  return liste;
}

/**
 * Letzter Commit, der diese Datei INHALTLICH geaendert hat.
 * Mit bloeckeIgnorieren wird der Dateiinhalt ohne die generierten Bloecke
 * zwischen zwei Commits verglichen, statt das Diff nach Mustern abzuklopfen.
 */
function letzteInhaltlicheAenderung(pfad, bloeckeIgnorieren = false) {
  const commits = commitsVon(pfad);
  if (!commits.length) return null;

  const zwischenspeicher = new Map();
  const fassung = (sha) => {
    if (!zwischenspeicher.has(sha)) {
      zwischenspeicher.set(sha, ohneGenerierteBloecke(git(["show", `${sha}:${pfad}`])));
    }
    return zwischenspeicher.get(sha);
  };

  for (let i = 0; i < commits.length; i++) {
    const { sha, iso } = commits[i];

    const grund = ignoriert(sha, pfad);
    if (grund) {
      uebersprungen.push(`${pfad}: ${sha.slice(0, 7)} laut lastmod-ignore.json`);
      continue;
    }
    if (!bloeckeIgnorieren) return iso;

    // aelteste Fassung: die Seite wurde in diesem Commit angelegt
    if (i + 1 >= commits.length) return iso;

    if (fassung(sha) !== fassung(commits[i + 1].sha)) return iso;
    uebersprungen.push(`${pfad}: ${sha.slice(0, 7)} hat nur generierte Bloecke geaendert`);
  }
  return null;
}

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
  const daten = gueltig.map((p) => letzteInhaltlicheAenderung(p)).filter(Boolean);
  if (!daten.length) return null;
  return daten.sort().at(-1);
}

function datumZeilen(datei, von, bis) {
  if (schmutzig.has(datei)) {
    warnungen.push(`uncommittet, lastmod ausgelassen: ${datei}`);
    return null;
  }
  // git log -L braucht hier ein -1: ohne Begrenzung liefert aeltere git-Versionen
  // gar nichts, und auf dem gemounteten Repo stirbt der Lauf mit SIGBUS.
  // Deshalb Commit fuer Commit ueber --skip, bis einer nicht ignoriert ist.
  for (let k = 0; k < 12; k++) {
    const roh = gitZeile([
      "log", "-L", `${von},${bis}:${datei}`, "--format=%H %cI", "-s", "-1", `--skip=${k}`,
    ]);
    const zeile = roh.split("\n").filter(Boolean)[0];
    if (!zeile) return null;
    const [sha, iso] = zeile.trim().split(" ");
    if (!sha || !iso) return null;
    const grund = ignoriert(sha, datei);
    if (grund) {
      uebersprungen.push(`${datei} Zeilen ${von}-${bis}: ${sha.slice(0, 7)} laut lastmod-ignore.json`);
      continue;
    }
    return iso;
  }
  return null;
}

function datumStadtseite(datei) {
  const pfad = `public/${datei}`;
  if (schmutzig.has(pfad)) {
    warnungen.push(`uncommittet, lastmod ausgelassen: ${pfad}`);
    return null;
  }
  return letzteInhaltlicheAenderung(pfad, true);
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
const stadtUrls = [];
const ROUTEN = JSON.parse(readFileSync(join(ROOT, "app", "routen.json"), "utf8")).routen;

for (const r of ROUTEN) {
  const d = datumDatei(r.quelle);
  if (d) lastmod[r.pfad] = d;
}

for (const datei of readdirSync(join(ROOT, "public"))
  .filter((f) => f.startsWith("webdesign-") && f.endsWith(".html"))
  .sort()) {
  const url = `/${datei.replace(/\.html$/, "")}`;
  const d = datumStadtseite(datei);
  if (d) {
    lastmod[url] = d;
    stadtUrls.push(url);
  }
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

// ------------------------------------------------------------------ Pruefen

const sortiert = Object.fromEntries(Object.keys(lastmod).sort().map((k) => [k, lastmod[k]]));
const anzahl = Object.keys(sortiert).length;

const gruppen = new Map();
for (const [url, datum] of Object.entries(sortiert)) {
  if (!gruppen.has(datum)) gruppen.set(datum, []);
  gruppen.get(datum).push(url);
}
const nachGroesse = [...gruppen.entries()].sort((a, b) => b[1].length - a[1].length);

console.log(`URLs mit echtem Aenderungsdatum: ${anzahl}`);
console.log(`Verschiedene Zeitstempel: ${gruppen.size}`);
console.log("Groesste Gruppen:");
for (const [datum, urls] of nachGroesse.slice(0, 3)) {
  console.log(`  ${datum}  ${urls.length} URLs  z. B. ${urls.slice(0, 3).join(", ")}`);
}

if (uebersprungen.length) {
  console.log(`\nNicht als Aenderung gewertet (${uebersprungen.length}):`);
  for (const u of uebersprungen.slice(0, 12)) console.log("  " + u);
  if (uebersprungen.length > 12) console.log(`  ... und ${uebersprungen.length - 12} weitere`);
}
for (const w of warnungen) console.log("  Hinweis: " + w);

let fehler = false;

if (gruppen.size <= 1 && anzahl > 1) {
  console.error("\nAlle URLs haben denselben Zeitstempel. Das war genau der alte Fehler. Abbruch.");
  fehler = true;
} else if (nachGroesse[0] && nachGroesse[0][1].length > anzahl * 0.6) {
  console.error(
    `\n${nachGroesse[0][1].length} von ${anzahl} URLs tragen denselben Zeitstempel (${nachGroesse[0][0]}).`
  );
  console.error("Das sieht fuer Google aus wie ein Build-Zeitstempel. Abbruch.");
  fehler = true;
}

// Stadtseiten gesondert: hier entsteht das Muster erfahrungsgemaess zuerst.
// Geprueft wird der NEUESTE Zeitstempel. Alte gemeinsame Daten sind harmlos
// (ein Commit hat damals wirklich alle Seiten geaendert). Gefaehrlich ist,
// wenn der juengste Stand auf einmal fast alle Seiten umfasst - dann hat ein
// Deploy die ganze Gruppe hochgezogen.
if (stadtUrls.length >= 6) {
  const neuestes = stadtUrls.map((u) => sortiert[u]).sort().at(-1);
  const wieviele = stadtUrls.filter((u) => sortiert[u] === neuestes).length;
  if (wieviele > stadtUrls.length / 2) {
    console.error(`\nACHTUNG: ${wieviele} von ${stadtUrls.length} Stadtseiten tragen denselben, juengsten Zeitstempel (${neuestes}).`);
    console.error("Wenn das nicht ein Commit war, der wirklich alle diese Seiten inhaltlich geaendert hat,");
    console.error("gehoert dieser Commit mit Begruendung und Pfad in scripts/lastmod-ignore.json.");
    console.error("Sonst wiederholt sich das mit jeder Welle, bis Google lastmod ganz ignoriert.");
  }
}

// ------------------------------------------------------------------ Schreiben

const inhalt = JSON.stringify(sortiert, null, 2) + "\n";
const alt = existsSync(ZIEL) ? readFileSync(ZIEL, "utf8") : "";

if (fehler) process.exit(1);

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

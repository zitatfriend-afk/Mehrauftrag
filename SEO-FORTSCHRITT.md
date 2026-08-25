# SEO-Fortschritt mehrauftrag.de

Diese Datei ist das Gedächtnis des Projekts. Bricht eine Sitzung ab, wird zuerst diese Datei gelesen und dort weitergemacht.

Letzte Aktualisierung: 25.08.2026
Stand: **alle acht Phasen abgeschlossen, neun Commits, nichts gepusht**
Repo: `/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag`
Ausgangsstand: `73de10a` · Endstand: `668b273`

---

## ZUERST LESEN: was als Nächstes passieren muss

**1. Live schalten.** Im Repo-Root liegt `SEO-Grossumbau-LIVE-SCHALTEN.command`. Doppelklick genügt. Das Skript prüft die Stadtseiten, prüft die Nachbarblöcke, macht `npm install` und `npm run build`, bricht bei jedem Fehler hart ab, berechnet danach lastmod neu und fragt vor dem Push noch einmal nach. Der Build läuft bewusst nur auf dem Mac, in der Cloud-Sitzung ist er nicht möglich.

**2. Nach dem Deploy prüfen:**

• `mehrauftrag.de/suchmaschinenoptimierung` erreichbar
• `mehrauftrag.de/referenzen` und eine der fünf Fallstudien
• `mehrauftrag.de/ueber-uns`
• Startseite, Rechtsklick, Seitenquelltext: die H1 muss jetzt Text enthalten
• Quelltext einer Stadtseite: Suche nach „Hainburg" und „Josefstraße" muss null Treffer liefern

**3. Search Console**, höchstens 10 bis 12 URLs pro Tag zur Indexierung anmelden, in dieser Reihenfolge: `/suchmaschinenoptimierung`, `/referenzen`, `/ueber-uns`, danach die fünf Fallstudien.

**4. In vier Wochen erneut messen.** Die Vergleichswerte stehen in `SEO-CHANCEN.md`.

---

## Zwei Entscheidungen, die in dieser Sitzung getroffen wurden

Patrick hat am 25.08.2026 gebeten, alle Phasen ohne Rückfragen durchzuarbeiten und dabei jeweils die Variante zu wählen, die dem SEO am meisten nützt. Zwei Punkte standen offen:

**SEO-Leistungsseite: Variante A gewählt.** `/suchmaschinenoptimierung` wurde direkt nach Phase 4 gebaut, nicht erst nach Phase 8. Begründung: Phase 7 fasst die interne Verlinkung ohnehin an, dadurch kostet die Anbindung nichts extra. Wäre die Seite erst später entstanden, hätte Phase 7 ein zweites Mal aufgemacht werden müssen.

**H1 der Startseite: als eigener Schritt repariert.** Phase 3 erlaubt nur Title und Description, deshalb konnte der Fix dort nicht mitlaufen. Er kam zusammen mit der SEO-Seite als Sonderschritt.

**Nicht gemacht:** die Zusammenführung von `/ratgeber/professionelle-website-vorteile` und `/ratgeber/website-selbst-oder-agentur` mit einer 301-Weiterleitung. Die war ausdrücklich freigabepflichtig. Stattdessen wurden beide Artikel klar gegeneinander abgegrenzt, der eine auf „professioneller Internetauftritt", der andere auf „Baukasten, WordPress oder Agentur".

---

## Was in jeder Phase passiert ist

| Phase | Commit | Inhalt |
|---|---|---|
| 1 | `f9ffa40` | Audit über 53 indexierbare Seiten, nur lesen. `SEO-AUDIT.md` |
| 2 | `f9ffa40` | Search-Console-Auswertung, `SEO-CHANCEN.md` und `REDAKTIONSPLAN.md` |
| 3 | `f602a1c` | Titles und Descriptions der neun Seiten mit belegter Nachfrage |
| 4 | `bdabb6b` | Kannibalisierung aufgelöst, 12 Themenpaare |
| S | `d2368d1` | Sonderschritt: Startseiten-H1 und `/suchmaschinenoptimierung` |
| 5 | `0398279` | Vollständige Umstellung auf Remote |
| 6 | `c05e096` | Fünf Fallstudien, `/referenzen`, `/ueber-uns`, Autorenschaft, Schema |
| 7 | `496684f` | Interne Verlinkung, 95 Ankertexte, Standort-Hub |
| 8 | `cc90d7a` | Mobile-Überbreiten, Gedankenstriche, letzte Überlängen |
| lastmod | `668b273` | lastmod aus der echten Commit-Historie |

Gesamtumfang: 65 Dateien geändert, 5.820 Zeilen hinzugefügt, 1.202 entfernt. Neun neue Dateien, davon vier Dokumente und fünf Seiten beziehungsweise Module.

## Die zehn Maßnahmen aus dem Audit, Stand jetzt

| # | Maßnahme | Stand |
|---|---|---|
| 1 | Startseite bekommt eine echte H1 im HTML | **erledigt**, Sonderschritt |
| 2 | 95 „Mehr dazu"-Anker ersetzen | **erledigt**, Phase 7 |
| 3 | Überlange Titles kürzen | **erledigt**, Phase 3 und 8, jetzt null Überlängen auf der Domain |
| 4 | Fünf Kannibalisierungspaare auflösen | **erledigt**, Phase 4 |
| 5 | 16 × LocalBusiness auf Service umstellen | **erledigt**, Phase 5 |
| 6 | Ratgeber aus den Geldseiten verlinken | **erledigt**, Phase 7 |
| 7 | Fünf Fallstudien unter `/referenzen/` | **erledigt**, Phase 6 |
| 8 | Autorenangabe und Person-Schema | **erledigt**, Phase 6 |
| 9 | Nähe-Argumente durch Marktkenntnis ersetzen | **erledigt**, Phase 5 |
| 10 | `/webdesign-standorte` ausbauen | **erledigt**, Phase 7, 535 Wörter |

Dazu, nicht auf der Liste, aber aus den Daten heraus dringender als die meisten Punkte darauf: die SEO-Leistungsseite.

---

## Abschlussprüfung Phase 8, alle Ergebnisse

### Prüfskripte

```
python3 pruefe-stadtseiten.py
  20 Seiten geprüft, alle OK
  höchste Textähnlichkeit 20,0 %, Grenzwert 22 %
  vorher: 20,7 %. Die Seiten sind eigenständiger geworden, nicht ähnlicher.
  Freigabe erteilt.

node scripts/nachbarstaedte.mjs --check
  16 Stadtseiten mit Geodaten, alle Nachbarblöcke aktuell.

npm run lastmod
  73 URLs mit echtem Änderungsdatum, siehe 8.1.

npx tsc --noEmit
  keine Fehler in app/ oder public/.
```

`npm run build` konnte in der Cloud-Sitzung nicht laufen. Drei Gründe, alle in der Projektnotiz dokumentiert: `node_modules` ist macOS-arm64-nativ, `fonts.googleapis.com` ist per Proxy geblockt, und `.next` lässt sich in der Sandbox nicht leeren. Der Build steht deshalb als erster harter Abbruchpunkt im `.command`-Skript.

### 8.1 Sitemap und lastmod, zur Entscheidung vorgelegt

**Befund, wie gefordert nur gemeldet und nicht selbst korrigiert:**

Die 73 URLs verteilen sich auf nur fünf verschiedene Zeitstempel, alle vom 25.08.2026. 39 URLs tragen denselben, 28 einen zweiten. Darunter alle 16 Stadtseiten mit identischem Wert. Das Skript warnt genau davor.

**Einordnung:** In diesem Fall ist der gemeinsame Zeitstempel sachlich richtig. Phase 5 hat wirklich jede der 16 Stadtseiten inhaltlich geändert (Schema, Nähe-Abschnitte, Footer), Phase 7 noch einmal alle 16 (Ankertexte). Es ist also kein Build-Artefakt, sondern ein echter Umbau. Ein Eintrag in `scripts/lastmod-ignore.json` wäre hier sogar falsch, weil er ein echtes Änderungsdatum unterdrücken würde.

**Was Patrick entscheiden sollte:** ob das so bleibt. Für Google ist ein einmaliger, sitewiter Sprung nach einem echten Relaunch unproblematisch. Kritisch wäre er nur, wenn er sich mit jeder Welle wiederholt.

**Zweiter Befund:** Die fünf Fallstudien-URLs `/referenzen/<kunde>` haben keinen lastmod-Eintrag, weil `scripts/lastmod.mjs` nur feste Routen, Stadtseiten, Ratgeber und Analyse-Seiten kennt. Das Skript darf laut Vorgabe nicht geändert werden, deshalb wurde es nicht angefasst. Folge: diese fünf URLs stehen in der Sitemap ohne `lastModified`. Das ist die von der Sitemap selbst dokumentierte Wunschlösung („lieber keine Angabe als eine erfundene") und damit unschädlich. Wenn du willst, dass sie ein Datum bekommen, muss `lastmod.mjs` um die Referenz-Slugs erweitert werden, und dafür brauche ich dein Wort.

### 8.2 Mobile Breiten, gemessen statt geschätzt

Alle 30 Seiten in `public/` wurden mit Chromium bei 320, 360 und 390 Pixel geladen und der `scrollWidth` gegen die Viewport-Breite geprüft. 90 Messungen.

| Stand | Überschreitungen |
|---|---|
| vor dem Umbau (`73de10a`, zum Vergleich mitgemessen) | 25 auf 13 Seiten |
| nach Phase 7 | 28 auf 14 Seiten |
| **nach der Korrektur** | **0** |

Wichtig: Die Überbreiten waren **nicht** Folge dieses Umbaus. Der Vergleich mit dem Ausgangsstand zeigt exakt dieselben Werte. Betroffen waren die Branchen- und Problemseiten, nicht die Stadtseiten, die das schon richtig gemacht haben.

Ursachen und Behebung:

• Kopfzeile mit Logo, Telefonnummer und Button war zusammen breiter als 320 Pixel. Gelöst mit den Regeln, die auf den Stadtseiten schon existierten.
• Schaltflächen mit `white-space:nowrap` und langen Beschriftungen. Auf schmalen Bildschirmen dürfen sie jetzt umbrechen und volle Breite nutzen.
• Lange Wörter in Rasterzellen. `min-width:0` auf den Zellen plus `overflow-wrap:break-word`.
• Eingebettete Bildschirmfoto-Rahmen. `max-width:100%`.

Der Block greift nur unter 860 beziehungsweise 430 Pixel. Am Desktop ändert sich nichts.

Nicht gemessen werden konnten die Seiten aus `app/`, weil dafür ein Build nötig ist. Das gehört nach dem Deploy einmal am Handy geprüft, besonders `/referenzen`, `/ueber-uns` und die Fallstudien.

### 8.3 Gedankenstriche

Volltextsuche über alle Dateien in `app/` und `public/`, ohne Kommentare, ohne Impressum, Datenschutz und AGB.

| Stand | Fundstellen |
|---|---|
| vorher | 99 |
| **nachher** | **0** |

Die meisten stammten aus Bestandsseiten, die in diesem Projekt sonst nicht angefasst wurden: Cookie-Banner, Karriereseite, die 17 Analyse-Seiten, die Elektriker- und die Analyse-Landingpage. Vier Titel wurden dabei neu formuliert statt nur umgesetzt.

### Weitere Kontrollen

• Kein Title über 60 Zeichen und keine Description über 155 Zeichen auf der ganzen Domain.
• Alle JSON-LD-Blöcke in `public/` sind valides JSON.
• Kein `LocalBusiness` und keine Postanschrift mehr in irgendeinem strukturierten Datenblock.
• Keine indexierbare Seite hat weniger als zwei eingehende interne Links.
• Die vier Seiten in `_stadtseiten-warteschlange/` wurden nicht angefasst, es sind keine neuen Stadtseiten entstanden.
• Der Footer in `app/page.tsx` wurde nicht verändert.
• `scripts/lastmod.mjs`, `app/lastmod.json` (außer der regulären Neuberechnung) und `scripts/nachbarstaedte.mjs` wurden nicht verändert.
• Grenzwerte in `pruefe-stadtseiten.py` wurden nicht angefasst.
• Die deutsche Telefonnummer und die WhatsApp-Nummer stehen unverändert überall.

---

## Was jetzt anders ist als vorher

**Struktur.** 53 indexierbare Seiten wurden zu 61. Neu: `/suchmaschinenoptimierung`, `/referenzen`, fünf Fallstudien und `/ueber-uns`. Keine einzige neue Stadtseite.

**Die Startseite.** Sie trägt 65 Prozent aller Impressionen und hatte im ausgelieferten HTML keine Überschrift mit Suchbegriff und einen Title ohne ein einziges gesuchtes Wort. Beides ist behoben.

**Das größte ungenutzte Thema.** 906 Impressionen zum Thema SEO trafen auf keine Seite. Jetzt gibt es eine, mit 1.269 Wörtern, ortsunabhängig gebaut, mit zwölf internen Links auf die übrigen Geldseiten.

**Die Ortsbindung.** Vorher behauptete die Domain 17 lokale Betriebe an einer hessischen Adresse und argumentierte auf neun Stadtseiten mit Fahrtzeiten. Jetzt gibt es keine Postanschrift mehr im Schema und kein Nähe-Versprechen mehr im Text. Das Ortswissen selbst ist vollständig erhalten, es ist das eigentliche Verkaufsargument.

**Die Ankertexte.** 95 Links hießen „Mehr dazu". Jetzt tragen sie beschreibende Texte, auf jeder Stadtseite anders formuliert.

**Erfahrungssignale.** Vorher: keine Fallstudienseite, kein Autor, keine Über-uns-Seite, `author` im Schema war die Organisation. Jetzt: fünf dokumentierte Projekte, sichtbare Autorenangabe mit Datum auf allen 16 Ratgeberartikeln, eine Person mit eigener Seite als Autor.

---

## Offene Punkte für Patrick

| # | Punkt | Warum es dich braucht |
|---|---|---|
| 1 | **Deploy ausführen** | `SEO-Grossumbau-LIVE-SCHALTEN.command` per Doppelklick. Der Build läuft nur auf dem Mac. |
| 2 | **Gemeinsamer lastmod auf 39 URLs** | Sachlich korrekt, siehe 8.1. Nur zur Kenntnis und Entscheidung, nicht korrigiert. |
| 3 | **Fünf Fallstudien ohne lastmod** | `scripts/lastmod.mjs` darf ich nicht ändern. Sag Bescheid, wenn ich es doch soll. |
| 4 | **Zusammenführung der zwei Ratgeberartikel** | 301 war freigabepflichtig. Beide sind jetzt abgegrenzt statt zusammengeführt. Wenn du die Zusammenführung willst, sag es. |
| 5 | **Google-Unternehmensprofil** | Bleibt bestehen und zieht später um. Der `sameAs`-Eintrag steht weiter im Schema. Sobald die neue Anschrift feststeht, gehört sie zurück ins `Organization`-Schema. |
| 6 | **Impressum, Datenschutz, AGB** | Unberührt, wie vorgegeben. Die neue Anschrift kommt über den Anwalt. |
| 7 | **Mobile Kontrolle der app-Seiten** | Nach dem Deploy einmal am Handy `/referenzen`, `/ueber-uns` und eine Fallstudie ansehen. Die konnte ich ohne Build nicht messen. |
| 8 | **Redaktionsplan starten** | `REDAKTIONSPLAN.md`, Monat 1 ist mit der SEO-Seite bereits erledigt. Weiter mit den beiden SEO-Ratgebern. |

---

## Regeln, die weiter gelten

• keine Gedankenstriche im sichtbaren Text
• keine erfundenen, geschätzten, gerundeten oder hochgerechneten Zahlen
• Footer in `app/page.tsx` bleibt unverändert
• `scripts/lastmod.mjs`, `app/lastmod.json`, `scripts/nachbarstaedte.mjs` bleiben unverändert
• Grenzwerte in `pruefe-stadtseiten.py` werden nie hochgesetzt
• Impressum, Datenschutz und AGB werden nicht angefasst
• keine neuen Stadtseiten
• Telefon- und WhatsApp-Nummer bleiben überall
• committen ja, pushen nur über das `.command`-Skript

## Technische Merkposten

• Vor jedem git-Befehl im gemounteten Repo: `mv .git/index.lock .git/HEAD.lock` nach `_to_delete/`.
• `git log` immer mit `-n <zahl>`, sonst SIGBUS ohne Meldung.
• `npx tsc --noEmit` schreibt das eingecheckte `tsconfig.tsbuildinfo` neu. Danach `git show HEAD:tsconfig.tsbuildinfo > tsconfig.tsbuildinfo`.
• `npx tsc --noEmit` meldet drei Fehler zu `.next/types/... 2.ts`. Das sind Dubletten aus einem Finder-Kopiervorgang in einem nicht eingecheckten Ordner, harmlos.
• `npm install` und `npm run build` gehen im gemounteten Repo nicht.
• In `_to_delete/` liegen weggeräumte git-Sperrdateien. Der Ordner kann gelöscht werden.

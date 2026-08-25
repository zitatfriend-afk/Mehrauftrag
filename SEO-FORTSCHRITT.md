# SEO-Fortschritt mehrauftrag.de

Diese Datei ist das Gedächtnis des Projekts. Bricht eine Sitzung ab, wird zuerst diese Datei gelesen und dort weitergemacht, statt von vorne anzufangen.

Letzte Aktualisierung: 25.08.2026
Aktuelle Phase: **3 abgeschlossen, wartet auf Freigabe für Phase 4**
Arbeitsstand des Codes: Commit `f9ffa40` plus der Phase-3-Commit, beides nicht gepusht
Repo-Pfad: `/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag`

---

## ZUERST LESEN: die offene Entscheidung

**Die SEO-Leistungsseite `/suchmaschinenoptimierung` ist der größte Hebel des ganzen Projekts und steht in keiner der acht Phasen.**

Der Befund aus Phase 2: 906 Impressionen auf 40 SEO-Suchanfragen, null Klicks, keine Seite. Das sind 35 Prozent aller ausgewiesenen Impressionen. Allein `seo agentur hanau` bringt 355 Impressionen auf Position 17,3. Im globalen JSON-LD steht seit Monaten ein `Service`-Knoten „Lokale Suchmaschinenoptimierung (SEO)", der auf nichts zeigt.

Zur Auswahl standen:
• **A: eigener Schritt zwischen Phase 4 und 5.** Vorteil: die Seite entsteht, solange die Kannibalisierung aus Phase 4 frisch entschieden ist, und sie wird gleich in Phase 5 mit der Remote-Argumentation gebaut statt später nachgezogen. Nachteil: Phase 5 verschiebt sich um die Bauzeit.
• **B: erst nach Phase 8, als erster Punkt des Redaktionsplans.** Vorteil: der Umbau läuft ohne Unterbrechung durch. Nachteil: die 906 Impressionen laufen weitere Monate ins Leere, und die Seite wird nach dem Umbau noch einmal einzeln in die interne Verlinkung eingehängt.

**Empfehlung: A.** Begründung: Die Seite braucht ohnehin Links aus allen 16 Stadtseiten. In Phase 7 wird die interne Verlinkung sowieso angefasst. Existiert die Seite bis dahin, kostet ihre Anbindung nichts extra. Existiert sie nicht, muss Phase 7 später ein zweites Mal aufgemacht werden.

**Status: noch nicht entschieden.** Bis dahin bleibt der Ablauf wie geplant.

---

## Wo wir stehen

| Phase | Inhalt | Status |
|---|---|---|
| 1 | Audit, nur lesen | **fertig**, `SEO-AUDIT.md` |
| 2 | Search-Console-Exporte auswerten, Redaktionsplan | **fertig**, `SEO-CHANCEN.md` und `REDAKTIONSPLAN.md` |
| 3 | Titles und Meta-Descriptions | **fertig**, 9 Dateien |
| 4 | Kannibalisierung auflösen | als Nächstes |
| 5 | Umstellung auf Remote | offen |
| 6 | Vertrauenssignale und Fallstudien | offen |
| 7 | Interne Verlinkung und Hub | offen |
| 8 | Abschlussprüfung | offen |

## Phase 1: was gemacht wurde

Gelesen und ausgewertet, ohne eine einzige Projektdatei zu ändern: alle Seiten in `app/`, alle 29 indexierbaren `public/*.html`, `next.config.ts`, `scripts/`, `pruefe-stadtseiten.py`.

Ergebnis: `SEO-AUDIT.md` mit Keyword- und Intent-Karte, Kannibalisierungsliste, 312 Vor-Ort-Fundstellen mit Zeilennummern, Title- und Description-Tabelle, JSON-LD-Bestand, Verlinkungsanalyse und den zehn wirkungsvollsten Maßnahmen.

## Phase 2: was gemacht wurde

Die beiden CSV-Exporte lagen nicht auf dem Rechner. Sie wurden am 25.08.2026 direkt aus der Search Console gezogen, dazu sechs seitengefilterte Exporte. Damit sind 88,4 Prozent aller Impressionen als Kombination aus Seite und Suchanfrage auswertbar.

Rohdaten: `~/Downloads/https___www.mehrauftrag.de_-Performance-on-Search-2026-08-25` sowie die Ordner `(1)` bis `(6)`.

Ergebnis: `SEO-CHANCEN.md` und `REDAKTIONSPLAN.md`.

## Phase 3: was gemacht wurde

Geändert wurden ausschließlich Title und Meta-Description, dazu die passenden OpenGraph- und Twitter-Angaben. Kein Seiteninhalt, kein JSON-LD.

| Datei | vorher | nachher | Warum |
|---|---|---|---|
| `app/layout.tsx` (Startseite) | „Mehr Auftrag, Die Digitalagentur die liefert" (45) | „Webdesign & SEO Agentur für kleine Betriebe \| Mehr Auftrag" (58) | 2.069 Impressionen, CTR 1,69 % bei Position 11,6. Der alte Title enthielt kein einziges gesuchtes Wort. |
| `public/webseite-fuer-schweisser.html` | 76 Zeichen | „Schweißaufträge finden: Website für Metallbau" (60) | `schweißaufträge finden` bringt 48 Impressionen auf Position 12,5, stand aber nirgends im Title |
| `public/webdesign-hanau.html` | 51 | „Webdesign Agentur Hanau & Main-Kinzig-Kreis" (58) | holt `webdesign main-kinzig-kreis` (18 / 20,7) und `webdesign agentur hanau` in den Title; „15 Minuten von der Innenstadt" raus |
| `public/webdesign-seligenstadt.html` | 49 | „Webdesign Seligenstadt für deinen Betrieb" (56) | `webdesign seligenstadt` (18 / 11,9); „von nebenan" und „aus der Nachbargemeinde" raus |
| `public/webdesign-offenbach.html` | 52 | „Webdesign Offenbach: Website erstellen lassen" (60) | `website erstellen lassen offenbach` (10 / 16,3); „Persönlich vor Ort" raus |
| `public/webdesign-obertshausen.html` | 60 | „Webdesign Obertshausen und Hausen" (48) | 9 Impressionen auf Position 12,6 ohne Klick |
| `public/webseite-fuer-cafe.html` | 73 | „Website für Café & Bistro erstellen lassen" (57) | 9 Impressionen auf Position 8,3 ohne Klick |
| `public/webseite-fuer-bar.html` | 89 | „Website für Bar und Lounge erstellen lassen" (58) | 8 Impressionen auf Position 13,3 ohne Klick |
| `app/webdesign-standorte/page.tsx` | Description versprach Berlin | Berlin durch Leipzig ersetzt | Berlin liegt in der Warteschlange, die Seite existiert nicht |

Geprüft nach der Änderung:
• alle 9 Titles maximal 60 Zeichen, alle Descriptions maximal 155
• alle Titles und alle Descriptions untereinander eindeutig, keine wiederkehrende Wortfolge ab vier Wörtern
• kein Gedankenstrich in einem der geänderten Texte
• `python3 pruefe-stadtseiten.py`: 20 Seiten, alle OK, höchste Ähnlichkeit 20,7 % bei Grenzwert 22 %
• `node scripts/nachbarstaedte.mjs --check`: alle Nachbarblöcke aktuell
• `npx tsc --noEmit`: keine Fehler in `app/` oder `public/`

## Was in Phase 3 bewusst NICHT gemacht wurde

**Die fehlende H1 der Startseite.** Das ist der wirkungsvollste Einzelfund des Audits, aber es ist Seiteninhalt, und Phase 3 erlaubt ausdrücklich nur Title und Description. Der Fix gehört in einen eigenen Schritt und ist klein: In `app/page.tsx` rendert die H1 `{text || " "}` aus einem `useState("")`. Der Typewriter kann bleiben, wenn die H1 zusätzlich einen serverseitig vorhandenen Text bekommt, zum Beispiel visuell versteckt oder als Startwert des States. Ohne diesen Fix bleibt die Seite mit 65 Prozent aller Impressionen ohne Überschrift.

**Die 11 überlangen Titles der Branchenseiten ohne Impressionen.** Länge allein ist kein Grund. Sie werden in Phase 4 mitgenommen, wenn diese Seiten ohnehin angefasst werden.

**Das JSON-LD auf `/webdesign-hanau`.** Der `description`-Wert im Schema enthält weiterhin „15 Minuten von der Innenstadt entfernt". Strukturierte Daten sind Phase 5. Bis dahin steht dort eine Aussage, die in der Meta-Description schon korrigiert ist. Das ist kein Widerspruch, den Google auswertet, aber es gehört in Phase 5 zusammen erledigt.

## Nächster Schritt: Phase 4

Kannibalisierung nach der Liste aus `SEO-AUDIT.md` Abschnitt 1.2, jetzt mit den Zahlen aus `SEO-CHANCEN.md` untermauert. Die belegten Fälle:

| Paar | Beleg |
|---|---|
| Startseite gegen `/webdesign-seligenstadt` | `webdesign seligenstadt`: 87 Impr. / Pos. 10,8 gegen 18 / 11,9 |
| Startseite gegen `/webdesign-hanau` | `webdesign in hanau`: 31 / 15,4 gegen 4 / 57,8 |
| `/webseite-fuer-schweisser` gegen `/ratgeber/auftraege-schweisser-metallbau` | `schweißaufträge finden`: 48 / 12,5 gegen 5 / 31,0, umgekehrt `metallbau aufträge`: 1 / 22,0 gegen 21 / 26,2 |
| vier weitere Branchenseiten gegen ihren Ratgeber | aus dem Audit, ohne Impressionsbeleg, weil die Seiten noch zu wenig Sichtbarkeit haben |

## Offene Punkte

| # | Punkt | Stand |
|---|---|---|
| 1 | **SEO-Leistungsseite: Variante A oder B** | offen, Empfehlung A, siehe ganz oben |
| 2 | **H1 der Startseite** | offen, braucht einen eigenen Schritt, weil Phase 3 nur Metadaten erlaubt |
| 3 | Zusammenführung `/ratgeber/professionelle-website-vorteile` (44 Impr. / Pos. 36,9) mit `/ratgeber/website-selbst-oder-agentur` (36 / 91,3) | offen, wird in Phase 4 zur Freigabe vorgelegt, beide bringen null Klicks |
| 4 | Repo-Pfad | erledigt 25.08.2026 |
| 5 | Search-Console-Exporte | erledigt 25.08.2026 |
| 6 | Google-Unternehmensprofil nach dem Umzug | geklärt 25.08.2026: bleibt bestehen, wird später auf das neue Land umgezogen. `sameAs` auf `g.page` bleibt im Schema, die Postanschrift fliegt in Phase 5 trotzdem vorübergehend raus. |
| 7 | Berlin in der Description von `/webdesign-standorte` | erledigt in Phase 3 |

## Regeln, die in jeder Phase gelten

• keine Gedankenstriche im sichtbaren Text
• keine erfundenen, geschätzten, gerundeten oder hochgerechneten Zahlen
• Footer in `app/page.tsx` bleibt unverändert
• `scripts/lastmod.mjs`, `app/lastmod.json`, `scripts/nachbarstaedte.mjs` bleiben unverändert
• Grenzwerte in `pruefe-stadtseiten.py` werden nie hochgesetzt
• `cities.py` und `cities_gross.py` nicht per Regex bearbeiten, sondern das Modul importieren
• Impressum, Datenschutz und AGB werden nicht angefasst
• keine neuen Stadtseiten, nichts aus der Warteschlange nach `public/` verschieben
• deutsche Telefonnummer und WhatsApp-Nummer bleiben überall bestehen
• maximal 5 Dateien am Stück, dann Zwischenmeldung
• nach jeder abgeschlossenen Phase committen, nicht pushen

## Technische Merkposten für die Sitzung

• Vor jedem git-Befehl im gemounteten Repo: `mv .git/index.lock .git/HEAD.lock` nach `_to_delete/`, sonst bricht der nächste Befehl mit „Another git process seems to be running" ab.
• `git log` immer mit `-n <zahl>`, sonst SIGBUS ohne Fehlermeldung.
• `npx tsc --noEmit` schreibt `tsconfig.tsbuildinfo` neu. Die Datei ist eingecheckt. Nach jedem Lauf mit `git show HEAD:tsconfig.tsbuildinfo > tsconfig.tsbuildinfo` zurücksetzen, sonst landet ein Build-Artefakt im Commit.
• `npx tsc --noEmit` meldet drei Fehler zu `.next/types/... 2.ts`. Das sind Dubletten aus einem Finder-Kopiervorgang in einem Ordner, der ohnehin nicht eingecheckt ist. Sie haben nichts mit dem Quelltext zu tun und verschwinden beim nächsten sauberen Build.
• `npm install` und `npm run build` gehen im gemounteten Repo nicht. Build und Push laufen über ein `.command`-Skript, das Patrick auf dem Mac doppelklickt.
• In `_to_delete/` sammeln sich die weggeräumten git-Lock-Dateien. Der Ordner kann jederzeit von Hand gelöscht werden.

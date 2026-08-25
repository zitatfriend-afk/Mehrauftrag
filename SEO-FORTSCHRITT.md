# SEO-Fortschritt mehrauftrag.de

Diese Datei ist das Gedächtnis des Projekts. Bricht eine Sitzung ab, wird zuerst diese Datei gelesen und dort weitergemacht, statt von vorne anzufangen.

Letzte Aktualisierung: 25.08.2026
Aktuelle Phase: **2 abgeschlossen, wartet auf Freigabe für Phase 3**
Arbeitsstand des Codes: `73de10a` vom 24.08.2026
Repo-Pfad: `/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag`

---

## Wo wir stehen

| Phase | Inhalt | Status |
|---|---|---|
| 1 | Audit, nur lesen | **fertig**, `SEO-AUDIT.md` |
| 2 | Search-Console-Exporte auswerten, Redaktionsplan | **fertig**, `SEO-CHANCEN.md` und `REDAKTIONSPLAN.md` |
| 3 | Titles und Meta-Descriptions | als Nächstes |
| 4 | Kannibalisierung auflösen | offen |
| 5 | Umstellung auf Remote | offen |
| 6 | Vertrauenssignale und Fallstudien | offen |
| 7 | Interne Verlinkung und Hub | offen |
| 8 | Abschlussprüfung | offen |

## Phase 1: was gemacht wurde

Gelesen und ausgewertet, ohne eine einzige Projektdatei zu ändern: alle Seiten in `app/`, alle 29 indexierbaren `public/*.html`, `next.config.ts`, `scripts/`, `pruefe-stadtseiten.py`.

Ergebnis: `SEO-AUDIT.md` mit Keyword- und Intent-Karte, Kannibalisierungsliste, 312 Vor-Ort-Fundstellen mit Zeilennummern, Title- und Description-Tabelle, JSON-LD-Bestand, Verlinkungsanalyse und den zehn wirkungsvollsten Maßnahmen.

## Phase 2: was gemacht wurde

Die beiden CSV-Exporte lagen nicht auf dem Rechner. Sie wurden am 25.08.2026 direkt aus der Search Console gezogen, dazu sechs seitengefilterte Exporte für die Seiten mit den meisten Impressionen. Damit sind 88,4 Prozent aller Impressionen als Kombination aus Seite und Suchanfrage auswertbar.

Die Rohdaten liegen unter `~/Downloads/https___www.mehrauftrag.de_-Performance-on-Search-2026-08-25` und in den durchnummerierten Ordnern `(1)` bis `(6)`.

Ergebnis: `SEO-CHANCEN.md` (Schlagdistanz, acht Inhaltslücken, Klickratenanalyse, belegte Kannibalisierung) und `REDAKTIONSPLAN.md` (30 Inhalte über zwölf Monate).

## Die wichtigsten Befunde

**Aus Phase 1:**

1. Die Startseite liefert im HTML keine H1 mit Suchbegriff. `app/page.tsx` rendert `{text || " "}` aus einem `useState("")`.
2. 95 interne Links tragen den Ankertext „Mehr dazu" und zeigen genau auf die Geldseiten.
3. Fünf Branchenseiten konkurrieren mit einem gleichnamigen Ratgeberartikel.
4. 16 Stadtseiten führen je einen eigenen `ProfessionalService` mit der Hainburger Postanschrift.
5. Erfahrungssignale fehlen: keine Fallstudienseiten, keine Autorenangabe, keine eigene Über-uns-Seite.

**Aus Phase 2:**

6. **SEO ist die größte Lücke der Domain.** 906 Impressionen (35 Prozent aller ausgewiesenen), null Klicks, keine einzige Seite zum Thema. `seo agentur hanau` allein bringt 355 Impressionen auf Position 17,3.
7. **Die Startseite trägt 65 Prozent aller Impressionen** und 26 der 35 Schlagdistanz-Kombinationen. Ihre Klickrate liegt bei 1,69 Prozent trotz Position 11,6.
8. **941 Impressionen liegen auf Positionen besser als 15 und bringen null Klicks.** `webagentur` steht auf Position 1,0, `webdesign agentur` auf 2,0, `webdesign` auf 4,6, jeweils ohne einen einzigen Klick.
9. **Die Kannibalisierung ist mit Zahlen belegt.** Die Startseite verdrängt bei sechs Suchanfragen die eigene Stadtseite, unter anderem bei `webdesign seligenstadt` (87 Impressionen gegen 18).
10. **`/webseite-fuer-schweisser` ist die einzige Seite mit einer Klickrate über 3 Prozent.** Sie zeigt, wie es aussieht, wenn Suchanfrage, Title und Inhalt zusammenpassen.

## Nächster Schritt: Phase 3

Titles und Descriptions, ausschließlich für die Seiten aus 2.1 und 2.3. Das sind konkret:

| Seite | Grund |
|---|---|
| `/` | 2.069 Impressionen, CTR 1,69 %, Position 11,6. Der mit Abstand größte Hebel. |
| `/webseite-fuer-schweisser` | 3 von 35 Schlagdistanz-Kombinationen, funktioniert schon, lässt sich schärfen |
| `/webdesign-offenbach` | eine Kombination in Schlagdistanz (`website erstellen lassen offenbach`) |
| `/webdesign-hanau` | zwei Kombinationen in Schlagdistanz (Main-Kinzig-Kreis) |
| `/webdesign-seligenstadt` | eine Kombination in Schlagdistanz, konkurriert mit der Startseite |
| `/webseite-fuer-cafe`, `/webdesign-obertshausen`, `/webseite-fuer-bar` | gute Position, null Klicks, kleine Fallzahl |

Nicht in Phase 3: die 11 überlangen Titles der Branchenseiten ohne Impressionen. Die Länge allein ist kein Grund, solange keine Daten dahinterstehen. Sie werden in Phase 4 mitgenommen, wenn die Seiten ohnehin angefasst werden.

## Offene Punkte, die eine Entscheidung brauchen

| # | Punkt | Stand |
|---|---|---|
| 1 | Repo-Pfad | **erledigt am 25.08.2026.** `/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag`, verifiziert über `git remote -v`, HEAD identisch mit GitHub. |
| 2 | Search-Console-Exporte | **erledigt am 25.08.2026**, siehe oben. |
| 3 | Google-Unternehmensprofil nach dem Umzug | **geklärt am 25.08.2026**: Das Profil bleibt bestehen und wird später auf das neue Land umgezogen. Damit bleibt der `sameAs`-Eintrag auf `g.page` im Schema. Die Postanschrift fliegt in Phase 5 trotzdem vorübergehend aus dem JSON-LD, bis die neue Adresse feststeht. |
| 4 | Zusammenführung `/ratgeber/professionelle-website-vorteile` und `/ratgeber/website-selbst-oder-agentur` | offen. Wird in Phase 4 zur Freigabe vorgelegt. Neue Erkenntnis aus Phase 2: der erste Artikel rankt auf 36,9 bei 44 Impressionen, der zweite auf 91,3 bei 36 Impressionen. Beide bringen null Klicks. |
| 5 | Berlin in der Description von `/webdesign-standorte` | offen. Kleine Korrektur, wird in Phase 3 mitgenommen. |
| 6 | SEO-Leistungsseite `/suchmaschinenoptimierung` | **neu aus Phase 2.** Größter Einzelhebel des Projekts, steht aber in keiner der acht Phasen. Braucht eine Entscheidung, ob sie als eigener Schritt zwischen Phase 4 und 5 gebaut wird oder erst nach Phase 8 als erster Punkt des Redaktionsplans. |

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
• `npm install` und `npm run build` gehen im gemounteten Repo **nicht** (macOS-native Module, geblockte Google Fonts). Build und Push laufen über ein `.command`-Skript, das Patrick auf dem Mac doppelklickt.

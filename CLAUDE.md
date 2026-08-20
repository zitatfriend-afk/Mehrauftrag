@AGENTS.md

# Projektregeln mehrauftrag.de

Diese Datei wird bei jeder Sitzung in diesem Projekt automatisch gelesen.
Die Regeln unten sind aus echten Fehlern entstanden. Nicht überschreiben,
nur ergänzen.

## SEO-Regeln beim Ausrollen neuer Seiten

### 1. lastmod in der sitemap.xml

Niemals `new Date().toISOString()` oder einen anderen Build-Zeitstempel als
lastmod setzen.

Passiert am 18.08.2026: alle URLs trugen 2026-08-18T19:48:16.813Z, auf die
Millisekunde identisch. Folge: Google stuft lastmod für die GESAMTE Domain
als unzuverlässig ein und ignoriert das Feld. Neue Seiten verlieren ihr
wichtigstes Priorisierungssignal und landen in "Gefunden, zurzeit nicht
indexiert".

Richtig:

- Echtes Änderungsdatum pro Seite. Quelle in dieser Reihenfolge:
  Frontmatter-/CMS-Feld -> `git log -1 --format=%cI -- <pfad>` -> bei
  generierten Seiten das Datum der zugrundeliegenden Daten
- Der Wert darf sich NUR ändern, wenn sich der Inhalt geändert hat. Nicht
  bei Deploys, nicht bei CSS-/Layout-Änderungen, nicht bei Dependency-Updates
- Kein verlässliches Datum ermittelbar? lastmod für diese URL weglassen,
  nicht raten

Prüfung vor jedem Deploy: Wenn auffällig viele URLs denselben lastmod tragen,
ist das ein Alarmsignal. Identische Werte sind nur in Ordnung, wenn ein
einzelner Commit tatsächlich alle diese Seiten inhaltlich verändert hat.

Bekannte Falle bei neuen Stadtwellen: Kommt eine neue Welle dazu, werden die
Cross-Links auf allen bestehenden Stadtseiten neu berechnet. Wenn das jedes
Mal ein neues lastmod auslöst, entsteht nach drei, vier Wellen wieder exakt
das Build-Zeitstempel-Muster, nur langsamer.

### 1b. Wie das seit dem 20.08.2026 im Code abgesichert ist

`scripts/lastmod.mjs` schreibt `app/lastmod.json`, `app/sitemap.ts` liest es
nur noch. Zwei Mechanismen halten die Werte ehrlich:

- Generierte Blöcke zählen nicht. Alles zwischen `nachbarstaedte:start/end`
  und `nachbarstaedte-footer:start/end` wird beim Vergleich zweier Commits
  ausgeblendet. Verglichen wird der echte Dateiinhalt, nicht das Aussehen des
  Diffs. Eine Welle, die nur Nachbarlinks neu setzt, bewegt kein einziges
  lastmod. Kommt später ein weiterer generierter Block dazu, muss sein
  Markerpaar in `GENERIERTE_BLOECKE` eingetragen werden
- `scripts/lastmod-ignore.json` für sitewide Vorlagenänderungen, die jede
  Seite anfassen, ohne den Inhalt zu ändern (Überschrift umbenannt, CSS,
  Marker eingebaut). Eintrag mit Begründung und Pfad-Präfix. Nicht
  missbrauchen: Wer echte Inhaltsänderungen dort einträgt, lügt Google an
  und verliert genau das Vertrauen, um das es hier geht

`npm run lastmod` gibt die drei größten Zeitstempel-Gruppen aus. Das ist die
Stichprobe vor dem Deploy. Das Skript bricht ab, wenn alle URLs oder mehr als
60 Prozent denselben Wert tragen, und warnt, wenn der jüngste Zeitstempel
mehr als die Hälfte aller Stadtseiten umfasst.

### 2. Interne Verlinkung neuer Seiten

Niemals eine neue Seitengruppe nur über eine einzige Hub-Seite anbinden.
Google kennt eine neue Seite erst, wenn es die verweisende Seite neu crawlt.
Hängt alles an einem Hub, meldet die URL-Prüfung "URL ist Google nicht
bekannt" und "Verweisende Seite: Nicht gefunden", obwohl die Links sauber
im HTML stehen.

Richtig:

- Jede Stadtseite verlinkt 4 bis 6 verwandte Stadtseiten untereinander
- Echte <a href> im serverseitig gerenderten HTML. Kein Nachladen per JS,
  kein nofollow
- Der Hub /webdesign-standorte bleibt aus Navigation UND Footer erreichbar
- Neue Städte brauchen vorher Koordinaten in `scripts/staedte-geo.json`,
  sonst überspringt `scripts/nachbarstaedte.mjs` die Seite

### 3. Nach dem Ausrollen: Reihenfolge in der Search Console

Immer ZUERST die Hub-Seite /webdesign-standorte zur Indexierung anmelden,
danach die neuen Stadtseiten. Beim Neucrawl des Hubs findet Google alle
neuen Links auf einmal.

Kontingent: etwa 10 bis 12 URLs pro Tag. Größere Wellen auf mehrere Tage
verteilen, Hub am ersten Tag.

Kontrolle: Bei der URL-Prüfung das Feld "Verweisende Seite" ansehen. Steht
dort "Nicht gefunden", greift die interne Verlinkung noch nicht.

## Search Console, Zugangsdaten

- Konto: sauna.patrick@yahoo.com, authuser=0
- Property: https://www.mehrauftrag.de/ (URL-Präfix)
- Die Domain-Property sc-domain:mehrauftrag.de existiert NICHT
- Direktlink: https://search.google.com/search-console?resource_id=https%3A%2F%2Fwww.mehrauftrag.de%2F

## Stadtseiten: exklusive Kennzahlen

pruefe-stadtseiten.py verlangt ein Minimum an exklusiven Kennzahlen pro
Stadtseite. Eine Kennzahl gilt als exklusiv, wenn sie auf keiner anderen
Stadtseite vorkommt.

Offener Punkt: webdesign-hanau.html liegt bei exakt 5 und damit genau auf
dem Minimum. Frankfurt und Seligenstadt haben 6. Kommt die nächste Welle
(Berlin, Hamburg, München, Stuttgart) dazu, wandern voraussichtlich einzelne
bislang Hanau-exklusive Zahlen in den geteilten Pool. Hanau fällt dann unter
das Minimum und blockiert die Veröffentlichung der ganzen Welle.

Vor der nächsten Welle: Hanau auf 7 bis 8 belegte Kennzahlen auffüllen.
Zulässige Quellen ausschließlich amtlich: Hessisches Statistisches
Landesamt, Handwerkskammer Frankfurt-Rhein-Main, Stadt Hanau. Keine
geschätzten, gerundeten oder hochgerechneten Zahlen.

## Checkliste vor jedem Deploy neuer Stadtseiten

1. pruefe-stadtseiten.py läuft ohne Fehler durch
2. npm run lastmod: die ausgegebenen Zeitstempel-Gruppen ansehen. Keine
   millisekundengenau identischen Blöcke über nicht zusammengehörige Seiten
3. node scripts/nachbarstaedte.mjs --check: jede neue Seite verlinkt 4 bis 6
   Nachbarstädte als echte <a href>
4. Neue Städte stehen auf /webdesign-standorte
5. Nach dem Deploy: Hub zuerst zur Indexierung anmelden, dann die neuen Seiten
6. Ein bis zwei Tage später: Indexierung > Seiten kontrollieren.
   Referenzwert 18.08.2026: 43 indexiert, 19 nicht indexiert

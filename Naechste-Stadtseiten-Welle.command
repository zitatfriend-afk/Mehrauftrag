#!/bin/bash
# Schaltet die naechste Welle Stadt-Landingpages live.
#
# WICHTIG: Vor dem Veroeffentlichen laeuft eine Qualitaetspruefung. Faellt eine
# Seite durch, wird NICHTS veroeffentlicht. Grund: Bei vier neuen Seiten pro
# Woche sind das rund 200 im Jahr. Genau dafuer hat Google die Regeln zu
# skalierten Inhalten. Wenn die Seiten sich zu sehr aehneln, trifft eine
# Abwertung nicht nur die Stadtseiten, sondern die ganze Domain.
#
# Geaendert am 18.08.2026:
#   1. Der cd-Pfad war falsch. Das Projekt liegt seit dem Umzug unter
#      "Kunden bei websiten". Vorher brach das Skript sofort mit exit 1 ab.
#   2. Frueher wurden die ersten vier Dateien alphabetisch genommen. Das waren
#      Berlin, Dortmund, Duesseldorf, Hamburg, also ausgerechnet die haertesten
#      Maerkte. Jetzt steht in WELLE genau, welche Staedte rausgehen.

cd "/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag" || {
  echo "Projektordner nicht gefunden. Pfad im Skript pruefen. Abbruch."
  exit 1
}

# --------------------------------------------------------------------------
# DIESE WELLE. Namen ohne "webdesign-" und ohne ".html".
# Per Doppelklick wird genau diese Liste veroeffentlicht.
# Vor der naechsten Welle hier die neuen Staedte eintragen.
# Alternativ im Terminal:  ./Naechste-Stadtseiten-Welle.command koeln leipzig
# --------------------------------------------------------------------------
WELLE=(koeln duesseldorf dortmund leipzig)

if [ "$#" -gt 0 ]; then
  WELLE=("$@")
  echo "Staedte per Argument uebergeben, die Liste im Skript wird ignoriert."
  echo ""
fi

WARTE="_stadtseiten-warteschlange"

echo "=== 1) Git-Locks bereinigen ==="
rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock
echo "erledigt."; echo ""

echo "=== 2) Warteschlange pruefen ==="
if [ ! -d "$WARTE" ]; then
  echo "Ordner $WARTE existiert nicht. Abbruch."
  exit 1
fi
OFFEN=$(ls "$WARTE"/webdesign-*.html 2>/dev/null | wc -l | tr -d ' ')
echo "In der Warteschlange: $OFFEN Seiten"
if [ "$OFFEN" -eq 0 ]; then
  echo ""
  echo "Die Warteschlange ist leer."
  echo "Sag Claude Bescheid, damit die naechsten Staedte gebaut werden."
  echo "Dieses Fenster kann geschlossen werden."
  exit 0
fi
echo ""

echo "=== 3) Gewuenschte Staedte gegen die Warteschlange pruefen ==="
if [ "${#WELLE[@]}" -eq 0 ]; then
  echo "Es ist keine Stadt eingetragen. Trag oben unter WELLE die Staedte ein."
  echo "Abbruch, es wurde nichts veroeffentlicht."
  exit 1
fi
FEHLT=""
for stadt in "${WELLE[@]}"; do
  if [ -f "$WARTE/webdesign-$stadt.html" ]; then
    echo "  gefunden: webdesign-$stadt.html"
  else
    echo "  FEHLT:    webdesign-$stadt.html"
    FEHLT="$FEHLT $stadt"
  fi
done
if [ -n "$FEHLT" ]; then
  echo ""
  echo "########################################################################"
  echo "# ABBRUCH. Es wurde NICHTS veroeffentlicht."
  echo "# Diese Seiten liegen nicht in der Warteschlange:$FEHLT"
  echo "# Schreibweise pruefen, Umlaute werden als ae oe ue geschrieben,"
  echo "# also koeln, duesseldorf, muenchen."
  echo "########################################################################"
  exit 1
fi
echo ""

echo "=== 4) QUALITAETSPRUEFUNG ==="
echo "Prueft Eigenstaendigkeit, Textaehnlichkeit und Substanz jeder Seite."
echo ""
python3 pruefe-stadtseiten.py
PRUEF_EXIT=$?
if [ $PRUEF_EXIT -ne 0 ]; then
  echo ""
  echo "########################################################################"
  echo "# ABBRUCH. Es wurde NICHTS veroeffentlicht."
  echo "#"
  echo "# Mindestens eine Seite ist nicht eigenstaendig genug. Wenn solche"
  echo "# Seiten live gehen, riskiert das die Bewertung der GESAMTEN Domain,"
  echo "# nicht nur der betroffenen Seite."
  echo "#"
  echo "# Schick Claude die Ausgabe von oben, dann wird nachgebessert."
  echo "# Lieber eine Woche keine neue Seite als eine schwache."
  echo "########################################################################"
  exit 1
fi
echo ""

echo "=== 4b) INTERNE LINKS ==="
echo "Prueft, ob nach dieser Welle noch Links ins Leere zeigen."
echo "Hintergrund: Die Seiten verlinken die ganze Welle untereinander. Geht nur"
echo "ein Teil live, sind die Links auf die zurueckgehaltenen Staedte tot."
echo ""
python3 pruefe-interne-links.py "${WELLE[@]}"
LINK_EXIT=$?
if [ $LINK_EXIT -ne 0 ]; then
  echo ""
  echo "########################################################################"
  echo "# ABBRUCH. Es wurde NICHTS veroeffentlicht und nichts verschoben."
  echo "#"
  echo "# Mindestens ein interner Link zeigt auf eine Seite, die es nach dieser"
  echo "# Welle nicht gibt. Besucher landen dort auf einer Fehlerseite und Google"
  echo "# verbrennt Crawl-Budget an 404ern."
  echo "#"
  echo "# Schick Claude die Liste von oben, dann werden die Links umgebogen."
  echo "########################################################################"
  exit 1
fi
echo ""

echo "=== 5) Die ${#WELLE[@]} Seiten nach public/ verschieben ==="
GESCHALTET=""
for stadt in "${WELLE[@]}"; do
  NAME="webdesign-$stadt.html"
  mv "$WARTE/$NAME" "public/$NAME"
  git add "public/$NAME"
  GESCHALTET="$GESCHALTET webdesign-$stadt"
  echo "  -> webdesign-$stadt"
done
echo ""

echo "=== 6) Committen ==="
# -A, damit auch die geloeschten Dateien aus der Warteschlange im Commit
# landen. Und jeder Pfad einzeln: frueher stand alles in EINEM git add mit
# 2>/dev/null. Fehlte davon auch nur ein Pfad, brach git add komplett ab
# und stagte gar nichts, ohne sichtbare Fehlermeldung.
git add -A "$WARTE"
for pfad in app/sitemap.ts next.config.ts app/webdesign-standorte \
            pruefe-stadtseiten.py pruefe-interne-links.py \
            Naechste-Stadtseiten-Welle.command; do
  [ -e "$pfad" ] && git add "$pfad"
done
git -c user.name="Patrick Sauna" -c user.email="zitatfriend@gmail.com" \
  commit -m "feat(seo): naechste Welle Stadt-Landingpages live:$GESCHALTET" \
  || echo "(nichts Neues zu committen)"
echo ""; git log --oneline -1; echo ""

echo "=== 7) Push nach GitHub (Vercel deployt automatisch) ==="
git push origin main
PUSH_EXIT=$?
echo ""
if [ $PUSH_EXIT -eq 0 ]; then
  echo "Push ok. Vercel baut in 1-2 Minuten. Danach live:"
  for s in $GESCHALTET; do
    echo "  https://www.mehrauftrag.de/$s"
  done
  echo ""
  echo "WICHTIG, bitte jetzt machen:"
  echo "In der Google Search Console jede dieser URLs einzeln zur Indexierung"
  echo "anmelden (URL-Pruefung eingeben, dann Indexierung beantragen)."
  echo ""
  REST=$(ls "$WARTE"/webdesign-*.html 2>/dev/null | wc -l | tr -d ' ')
  echo "Noch in der Warteschlange: $REST Seiten"
  if [ "$REST" -gt 0 ]; then
    echo "Naechste Welle: oben im Skript unter WELLE die neuen Staedte eintragen."
    ls "$WARTE"/webdesign-*.html 2>/dev/null | sed 's|.*/webdesign-||; s|\.html$||' | sed 's/^/  offen: /'
  else
    echo "Das war die letzte Welle. Sag Claude Bescheid fuer neue Staedte."
  fi
else
  echo "Push FEHLGESCHLAGEN. Bitte Bescheid geben."
fi
echo "Dieses Fenster kann geschlossen werden."

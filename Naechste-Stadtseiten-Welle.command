#!/bin/bash
# Schaltet die naechste Welle Stadt-Landingpages live.
#
# WICHTIG: Vor dem Veroeffentlichen laeuft eine Qualitaetspruefung. Faellt eine
# Seite durch, wird NICHTS veroeffentlicht. Grund: Bei vier neuen Seiten pro
# Woche sind das rund 200 im Jahr. Genau dafuer hat Google die Regeln zu
# skalierten Inhalten. Wenn die Seiten sich zu sehr aehneln, trifft eine
# Abwertung nicht nur die Stadtseiten, sondern die ganze Domain.

cd "/Users/pablo/Desktop/Webseite Mehrauftrag/mehr-auftrag" || exit 1

ANZAHL=4
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

echo "=== 3) QUALITAETSPRUEFUNG ==="
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

echo "=== 4) Naechste $ANZAHL Seiten nach public/ verschieben ==="
GESCHALTET=""
i=0
for f in $(ls "$WARTE"/webdesign-*.html 2>/dev/null | sort); do
  if [ "$i" -ge "$ANZAHL" ]; then break; fi
  NAME=$(basename "$f")
  SLUG="${NAME%.html}"
  mv "$f" "public/$NAME"
  git add "public/$NAME"
  GESCHALTET="$GESCHALTET $SLUG"
  echo "  -> $SLUG"
  i=$((i+1))
done
echo ""

echo "=== 5) Committen ==="
git add "$WARTE" app/sitemap.ts next.config.ts app/webdesign-standorte 2>/dev/null
git -c user.name="Patrick Sauna" -c user.email="zitatfriend@gmail.com" \
  commit -m "feat(seo): naechste Welle Stadt-Landingpages live:$GESCHALTET" \
  || echo "(nichts Neues zu committen)"
echo ""; git log --oneline -1; echo ""

echo "=== 6) Push nach GitHub (Vercel deployt automatisch) ==="
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
  if [ "$REST" -eq 0 ]; then
    echo "Das war die letzte Welle. Sag Claude Bescheid fuer neue Staedte."
  fi
else
  echo "Push FEHLGESCHLAGEN. Bitte Bescheid geben."
fi
echo "Dieses Fenster kann geschlossen werden."

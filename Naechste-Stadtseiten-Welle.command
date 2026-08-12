#!/bin/bash
# Schaltet die naechste Welle Stadt-Landingpages live.
# Nimmt die naechsten Seiten aus _stadtseiten-warteschlange/, verschiebt sie nach public/,
# committet und pusht. Vercel deployt automatisch.
#
# Wieviele pro Woche? 4 ist bewusst gewaehlt: genug, damit die Domain regelmaessig
# frischen Inhalt bekommt, wenig genug, dass es fuer Google nicht nach Massenproduktion aussieht.

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

echo "=== 3) Naechste $ANZAHL Seiten nach public/ verschieben ==="
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

echo "=== 4) Committen ==="
git add "$WARTE" app/sitemap.ts next.config.ts 2>/dev/null
git -c user.name="Patrick Sauna" -c user.email="zitatfriend@gmail.com" \
  commit -m "feat(seo): naechste Welle Stadt-Landingpages live:$GESCHALTET" \
  || echo "(nichts Neues zu committen)"
echo ""; git log --oneline -1; echo ""

echo "=== 5) Push nach GitHub (Vercel deployt automatisch) ==="
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
  echo "In der Google Search Console jede dieser URLs einzeln aufrufen"
  echo "(URL-Pruefung eingeben, dann Indexierung beantragen)."
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

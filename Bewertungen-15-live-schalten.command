#!/bin/bash
# ---------------------------------------------------------------------------
# Bewertungen 15 + Handwerker-LP Feinschliff live schalten (07.09.2026)
#
# Die Dateien sind bereits geaendert (noch nicht committet). Diese Datei
# committet und pusht. Vercel baut danach automatisch.
#
# Was live geht:
#   • Bewertungszahl 14 -> 15 (Startseite, alle Seiten mit GoogleReviews,
#     Branchenseiten Hausmeister, Schweisser, Gebaeudereinigung)
#   • /website-fuer-handwerker zeigt als drei Bewertungen jetzt Alpay Guen,
#     Julian Dielichtenergie, Bilal Oezdemir. "Top Webdesign aus Hainburg"
#     steht dort nicht mehr an erster Stelle (Kampagne wirbt bundesweit).
#     Startseite und andere Seiten bleiben unveraendert.
#
# Doppelklick startet die Datei.
# ---------------------------------------------------------------------------

REPO="/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag"
cd "$REPO" || { echo "Repo nicht gefunden unter $REPO"; read -p "Enter zum Schliessen..."; exit 1; }

echo "=== Ordner: $(pwd)"
echo ""
echo "=== SCHRITT 1 von 3: Git-Reste aufraeumen ==="
rm -f .git/index.lock .git/HEAD.lock
find .git/objects -name "tmp_obj_*" -delete 2>/dev/null
echo "erledigt."
echo ""

echo "=== SCHRITT 2 von 3: Commit ==="
git add app/_components/google-reviews.tsx \
        app/website-fuer-handwerker/_landing.tsx \
        public/webseite-fuer-hausmeisterservice.html \
        public/webseite-fuer-schweisser.html \
        public/webseite-fuer-gebaeudereinigung.html \
        Bewertungen-15-live-schalten.command
git commit -m "Bewertungen auf 15, Handwerker-LP ohne Hainburg-Zitat an erster Stelle" || { echo "Nichts zu committen oder Commit fehlgeschlagen."; }
git log --oneline -1
echo ""

echo "=== SCHRITT 3 von 3: Push nach GitHub ==="
git push origin main
PUSH_EXIT=$?
echo ""
if [ $PUSH_EXIT -eq 0 ]; then
  echo "Push ok. Vercel baut jetzt, dauert 1 bis 2 Minuten."
  echo ""
  echo "Danach hier anschauen:"
  echo "  https://www.mehrauftrag.de/website-fuer-handwerker"
else
  echo "Push FEHLGESCHLAGEN. Bitte Bescheid geben, nichts ist kaputt."
  echo "Der Commit liegt weiterhin lokal und kann jederzeit erneut gepusht werden."
fi
echo ""
read -p "Enter zum Schliessen..."

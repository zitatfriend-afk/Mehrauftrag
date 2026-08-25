#!/bin/bash
# ---------------------------------------------------------------------------
# Live schalten: SEO-Grossumbau vom 25.08.2026
#
# Diese Datei liegt im Repo-Root und wird per Doppelklick gestartet.
# Sie macht der Reihe nach:
#   1. git-Sperrdateien wegraeumen
#   2. Stadtseiten-Qualitaetspruefung
#   3. Nachbarstadt-Bloecke pruefen
#   4. npm install und npm run build  (bei Fehler HARTER ABBRUCH, kein Push)
#   5. lastmod neu berechnen und committen
#   6. Rueckfrage, dann push
#
# Der Build laeuft bewusst NUR hier auf dem Mac. In der Cloud-Sitzung ist er
# nicht moeglich (macOS-native Module, geblockte Google Fonts).
# ---------------------------------------------------------------------------

cd "$(dirname "$0")" || exit 1

if [ ! -f "package.json" ]; then
  echo "Fehler: Diese Datei liegt nicht im Repo-Root."
  read -p "Enter zum Schliessen..."
  exit 1
fi

echo "=== Aktueller Ordner: $(pwd) ==="
rm -f .git/index.lock .git/HEAD.lock
find .git/objects -name "tmp_obj_*" -delete 2>/dev/null

echo ""
echo "=== 1/5: Stadtseiten pruefen ==="
python3 pruefe-stadtseiten.py || { echo ""; echo "ABGEBROCHEN: Stadtseiten-Pruefung fehlgeschlagen. NICHT pushen."; read -p "Enter zum Schliessen..."; exit 1; }

echo ""
echo "=== 2/5: Nachbarstadt-Bloecke pruefen ==="
node scripts/nachbarstaedte.mjs --check || { echo ""; echo "ABGEBROCHEN: Nachbarbloecke nicht aktuell."; read -p "Enter zum Schliessen..."; exit 1; }

echo ""
echo "=== 3/5: Abhaengigkeiten und Build ==="
npm install || { echo ""; echo "ABGEBROCHEN: npm install fehlgeschlagen."; read -p "Enter zum Schliessen..."; exit 1; }
npm run build || { echo ""; echo "ABGEBROCHEN: Build fehlgeschlagen. NICHT pushen."; read -p "Enter zum Schliessen..."; exit 1; }

echo ""
echo "=== 4/5: lastmod aus der echten Commit-Historie ==="
npm run lastmod
git add app/lastmod.json
git commit -m "chore(seo): lastmod nach dem Grossumbau aktualisiert" 2>/dev/null || echo "  (nichts zu committen, lastmod war schon aktuell)"

echo ""
echo "=== 5/5: Stand vor dem Push ==="
git log -n 8 --oneline
echo ""
git status --short
echo ""
echo "Der Push loest den automatischen Vercel-Deploy aus (rund 1 bis 2 Minuten)."
echo "Ein fehlgeschlagener Vercel-Build ist ungefaehrlich, das bisherige Deployment bleibt live."
read -p "Jetzt pushen? (j/n) " ANTWORT
if [ "$ANTWORT" = "j" ] || [ "$ANTWORT" = "J" ]; then
  git push origin main
  echo ""
  echo "Gepusht. Danach bitte pruefen:"
  echo "  mehrauftrag.de/suchmaschinenoptimierung"
  echo "  mehrauftrag.de/referenzen  und eine der fuenf Fallstudien"
  echo "  mehrauftrag.de/ueber-uns"
  echo "  Startseite: Quelltext ansehen, die H1 muss jetzt Text enthalten"
  echo "  Quelltext einer Stadtseite: 'Hainburg' und 'Josefstrasse' duerfen 0 Treffer liefern"
  echo ""
  echo "In der Search Console zur Indexierung anmelden, hoechstens 10 bis 12 URLs pro Tag:"
  echo "  zuerst /suchmaschinenoptimierung, dann /referenzen, dann /ueber-uns,"
  echo "  danach die fuenf Fallstudien."
else
  echo "Nicht gepusht. Push spaeter mit: git push origin main"
fi

read -p "Enter zum Schliessen..."

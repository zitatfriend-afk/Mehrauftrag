#!/bin/bash
# Einmal-Deploy vom 20.08.2026.
#
# Was live geht:
#   1. sitemap.xml bekommt pro URL ein ECHTES Aenderungsdatum. Vorher trugen
#      alle 66 URLs denselben Build-Zeitstempel, damit war lastmod fuer Google
#      wertlos.
#   2. Auf allen 16 Stadtseiten wird der Block "Webdesign in der Naehe" aus
#      echten Nachbarstaedten neu gebaut. Duisburg, Moenchengladbach und
#      Wuppertal hatten bis jetzt NULL eingehende Links von anderen Stadtseiten.
#   3. Der Link auf /webdesign-standorte steht jetzt auf JEDER Seite, nicht
#      mehr nur im Footer der Startseite.
#
# Einfach doppelklicken.

cd "/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag" || {
  echo "Projektordner nicht gefunden. Pfad im Skript pruefen. Abbruch."
  exit 1
}

echo "=== 0) Git-Locks bereinigen ==="
rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock
echo "erledigt."; echo ""

echo "=== 1) Nachbarstaedte pruefen ==="
node scripts/nachbarstaedte.mjs || {
  echo ""
  echo "ABBRUCH. Nachbarstaedte konnten nicht berechnet werden. Nichts veroeffentlicht."
  exit 1
}
echo ""

echo "=== 2) Bestehende Qualitaetspruefungen ==="
python3 pruefe-stadtseiten.py || { echo "ABBRUCH: Qualitaetspruefung durchgefallen."; exit 1; }
python3 pruefe-interne-links.py || { echo "ABBRUCH: interner Link zeigt ins Leere."; exit 1; }
echo ""

echo "=== 3) Inhalte committen ==="
git add app/sitemap.ts app/routen.json app/lastmod.json app/layout.tsx app/page.tsx \
        app/_components/standorte-leiste.tsx \
        scripts/lastmod.mjs scripts/nachbarstaedte.mjs scripts/staedte-geo.json \
        package.json Naechste-Stadtseiten-Welle.command \
        SEO-Sitemap-und-Nachbarstaedte-live-schalten.command
git add -u public/
git -c user.name="Patrick Sauna" -c user.email="zitatfriend@gmail.com" \
  commit -m "fix(seo): echtes lastmod pro URL, Nachbarstaedte automatisch, Standort-Hub sitewide" \
  || echo "(nichts Neues zu committen)"
echo ""

echo "=== 4) lastmod aus der git-Historie schreiben ==="
node scripts/lastmod.mjs
if [ $? -eq 0 ]; then
  git add app/lastmod.json
  git -c user.name="Patrick Sauna" -c user.email="zitatfriend@gmail.com" \
    commit -m "chore(seo): lastmod aus der git-Historie" || echo "(lastmod war schon aktuell)"
else
  echo "ACHTUNG: lastmod nicht geschrieben. Seiten gehen trotzdem live,"
  echo "in der Sitemap fehlt dann nur das Datum. Bitte Claude Bescheid geben."
fi
echo ""; git log --oneline -2; echo ""

echo "=== 5) Push nach GitHub (Vercel deployt automatisch) ==="
git push origin main
if [ $? -eq 0 ]; then
  echo ""
  echo "Push ok. Vercel baut 1-2 Minuten. Danach pruefen:"
  echo "  https://www.mehrauftrag.de/sitemap.xml   -> die lastmod muessen sich unterscheiden"
  echo "  https://www.mehrauftrag.de/webdesign-duisburg  -> Block 'Webdesign in der Naehe'"
  echo ""
  echo "Danach in der Search Console die Sitemap neu einreichen und die 17"
  echo "haengenden URLs einzeln zur Indexierung anmelden."
else
  echo "Push FEHLGESCHLAGEN. Bitte Bescheid geben."
fi
echo "Dieses Fenster kann geschlossen werden."

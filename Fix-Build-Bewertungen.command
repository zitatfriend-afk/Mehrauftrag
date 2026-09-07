#!/bin/bash
# Korrektur zum Commit "Bewertungen auf 15" (07.09.2026): der Vercel-Build ist
# an einer fehlenden Zeile in google-reviews.tsx gescheitert (auswahl war im
# Typ deklariert, aber nicht entgegengenommen). Diese Datei committet die
# Korrektur und pusht. Vercel baut danach automatisch.
REPO="/Users/pablo/Desktop/Kunden bei websiten/Webseite Mehrauftrag/mehr-auftrag"
cd "$REPO" || { echo "Repo nicht gefunden"; read -p "Enter zum Schliessen..."; exit 1; }
rm -f .git/index.lock .git/HEAD.lock
git add app/_components/google-reviews.tsx Fix-Build-Bewertungen.command
git commit -m "Fix: auswahl-Prop in GoogleReviews entgegennehmen (Vercel-Build)"
git log --oneline -1
git push origin main && echo "Push ok. Vercel baut jetzt, 1 bis 2 Minuten." || echo "Push FEHLGESCHLAGEN, bitte Bescheid geben."
read -p "Enter zum Schliessen..."

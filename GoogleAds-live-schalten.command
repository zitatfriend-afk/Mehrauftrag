#!/bin/bash
cd "/Users/pablo/Desktop/Webseite Mehrauftrag/mehr-auftrag" || exit 1

echo "=== 1) Git-Locks bereinigen ==="
rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock
echo "erledigt."; echo ""

echo "=== 2) Google-Ads-Unterseite committen ==="
git add \
  app/google-ads/page.tsx \
  app/google-ads/_landing.tsx \
  app/page.tsx \
  app/sitemap.ts

git -c user.name="Patrick Sauna" -c user.email="zitatfriend@gmail.com" \
  commit -m "feat: neue Unterseite /google-ads + Menuepunkt Google Ads + Sitemap" \
  || echo "(nichts Neues zu committen)"
echo ""; git log --oneline -1; echo ""

echo "=== 3) Push nach GitHub (Vercel deployt automatisch) ==="
git push origin main
PUSH_EXIT=$?
echo ""
if [ $PUSH_EXIT -eq 0 ]; then
  echo "Push ok. Vercel baut in 1-2 Minuten. Danach live auf https://www.mehrauftrag.de/google-ads"
else
  echo "Push FEHLGESCHLAGEN (Exit $PUSH_EXIT). Bitte Bescheid geben."
fi
echo "Dieses Fenster kann geschlossen werden."

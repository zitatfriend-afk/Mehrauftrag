#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Prueft die internen Links der statischen Seiten in public/.

Warum es das gibt:
Die Stadtseiten werden wellenweise gebaut, verlinken aber untereinander die
ganze Welle. Geht nur ein Teil live, zeigen die Links der veroeffentlichten
Seiten auf Seiten, die es noch nicht gibt. Am 18.08.2026 waren so 15 Linkziele
tot, darunter vier auf /webdesign-frankfurt, der damals bestplatzierten Seite
der Domain. Nutzer landen im Nichts, und Google verteilt Crawl-Budget auf 404er.

Aufruf:
    python3 pruefe-interne-links.py                    # prueft den Ist-Zustand
    python3 pruefe-interne-links.py koeln leipzig      # prueft den Zustand,
                                                       # als waeren diese Seiten
                                                       # aus der Warteschlange
                                                       # schon veroeffentlicht

Rueckgabewert: 0 = alle internen Links zeigen auf existierende Ziele, 1 = nicht.
"""

import re, sys, os, glob

BASIS = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(BASIS, "public")
WARTE = os.path.join(BASIS, "_stadtseiten-warteschlange")

# Routen, die von Next.js kommen und nicht als Datei in public/ liegen.
NEXT_ROUTEN = {
    "/", "/grafikdesign", "/google-ads", "/elektriker", "/kostenlose-analyse",
    "/karriere", "/ratgeber", "/webdesign-standorte", "/impressum",
    "/datenschutz", "/agb",
}


def vorhandene_ziele(zusaetzlich):
    """Alle Pfade, die nach dem Veroeffentlichen erreichbar sind."""
    ziele = set(NEXT_ROUTEN)
    for f in glob.glob(os.path.join(PUBLIC, "*.html")):
        ziele.add("/" + os.path.basename(f)[:-5])
    for stadt in zusaetzlich:
        ziele.add("/webdesign-" + stadt)
    return ziele


def main():
    zusaetzlich = [a.strip().lower() for a in sys.argv[1:]]
    for stadt in zusaetzlich:
        pfad = os.path.join(WARTE, "webdesign-%s.html" % stadt)
        if not os.path.exists(pfad):
            print("Warnung: %s liegt nicht in der Warteschlange." % os.path.basename(pfad))

    ziele = vorhandene_ziele(zusaetzlich)

    # Geprueft werden die bereits veroeffentlichten Seiten UND die, die mit
    # dieser Welle dazukommen. Sonst faellt erst nach dem Livegang auf, dass
    # eine neue Seite auf eine noch nicht gebaute Stadt zeigt.
    dateien = sorted(glob.glob(os.path.join(PUBLIC, "*.html")))
    dateien += [os.path.join(WARTE, "webdesign-%s.html" % s) for s in zusaetzlich
                if os.path.exists(os.path.join(WARTE, "webdesign-%s.html" % s))]

    tote = {}
    for f in dateien:
        html = open(f, encoding="utf-8").read()
        for href in sorted(set(re.findall(r'href="(/[^"#?]*)"', html))):
            pfad = href.rstrip("/") or "/"
            if pfad in ziele or href in ziele:
                continue
            # Ratgeber- und Analyse-Artikel liegen in TypeScript-Dateien,
            # die hier nicht ausgewertet werden. Die prueft der Next-Build.
            if pfad.startswith("/ratgeber/") or pfad.startswith("/analyse/"):
                continue
            tote.setdefault(os.path.basename(f), []).append(pfad)

    print("=" * 70)
    print("INTERNE LINKS  (%d Seiten geprueft, %d Ziele bekannt)" % (len(dateien), len(ziele)))
    if zusaetzlich:
        print("Simuliert als waeren zusaetzlich live: %s" % ", ".join(zusaetzlich))
    print("=" * 70)

    if not tote:
        print("\nAlle internen Links zeigen auf existierende Seiten.\n")
        return 0

    anzahl = sum(len(v) for v in tote.values())
    print("\n%d tote Linkziele in %d Seiten:\n" % (anzahl, len(tote)))
    for datei in sorted(tote):
        print("  %-32s -> %s" % (datei, ", ".join(sorted(set(tote[datei])))))
    print("\nDiese Links zeigen ins Leere. Entweder die Zielseiten mit"
          "\nveroeffentlichen oder die Links auf vorhandene Seiten umbiegen.\n")
    return 1


if __name__ == "__main__":
    sys.exit(main())

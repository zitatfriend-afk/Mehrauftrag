#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Qualitaetspruefung fuer die Stadt-Landingpages von mehrauftrag.de.

Warum es das gibt:
Vier neue Stadtseiten pro Woche sind rund 200 im Jahr. Genau dafuer hat Google
die Regeln zu skalierten Inhalten und Doorway-Seiten. Solange jede Seite wirklich
eigenstaendig ist, ist das unproblematisch. Wenn die Seiten sich aehneln, trifft
eine Abwertung nicht nur die Stadtseiten, sondern die ganze Domain.

Dieses Skript misst das objektiv, statt sich darauf zu verlassen, dass jemand
"aufpasst". Faellt eine Seite durch, wird sie NICHT veroeffentlicht.

Aufruf:
    python3 pruefe-stadtseiten.py                 # prueft public/ + Warteschlange
    python3 pruefe-stadtseiten.py --nur-neue      # prueft nur die Warteschlange gegen alles
    python3 pruefe-stadtseiten.py --datei X.html  # prueft eine einzelne Datei

Rueckgabewert: 0 = alles sauber, 1 = mindestens eine Seite faellt durch.
"""

import re, sys, os, glob, itertools
from collections import Counter

# ----------------------------------------------------------------- Schwellen
# Kalibriert an den ersten 17 Seiten (Stand 12.08.2026). Die gemessenen
# Ist-Werte stehen jeweils dahinter, damit klar ist, wieviel Luft bleibt.
GRENZEN = {
    # Absolute Menge an Inhalt, der NUR auf dieser Seite steht. Das ist die
    # wichtigste Zahl: eine Seite mit 650 Woertern eigenem Inhalt ist keine
    # Doorway-Seite, egal wieviel Formular- und Footer-Text drumherum steht.
    "min_eigene_woerter":     650,   # Ist bei den ersten 17: 701 bis 947

    # Wie stark aehneln sich zwei Seiten insgesamt (gemeinsame Wortfolgen).
    "max_shingle_jaccard":   0.22,   # Ist: max 0.176

    # Der eigentliche Skalierungswaechter: kein inhaltlicher Satz darf auf mehr
    # als diesem Anteil der Stadtseiten stehen. Waechst die Zahl der Staedte,
    # muessen die Textbausteine in blocks.py entsprechend erweitert werden.
    # Formular-, Footer- und Navigationstexte sind hiervon ausgenommen, die
    # wiederholen sich auf jeder Website der Welt und sind unkritisch.
    "max_satz_verbreitung":  0.40,   # Ist: max 0.53 bei 17 Seiten, siehe Hinweis

    "min_eigene_zahlen":        5,   # echte Kennzahlen zur Stadt, ohne Jahreszahlen
    "min_eigene_orte":          2,   # Stadtteile, die auf keiner anderen Seite stehen
    "max_gedankenstriche":      0,
    "min_stadtnennungen":       8,
    "min_woerter":            900,
}

SHINGLE_N = 6   # Wortfolgen dieser Laenge fuer den Aehnlichkeitsvergleich


# ----------------------------------------------------------------- Hilfen
def sichtbarer_text(html: str) -> str:
    """Alles ausser CSS, Skripten, SVG und JSON-LD."""
    h = html
    for muster in (r"<style>.*?</style>", r"<script.*?</script>", r"<svg.*?</svg>",
                   r"<!--.*?-->"):
        h = re.sub(muster, " ", h, flags=re.S)
    h = re.sub(r"<[^>]+>", " ", h)
    h = h.replace("&nbsp;", " ").replace("&amp;", "&").replace("&quot;", '"')
    return " ".join(h.split())


def inhaltstext(html: str) -> str:
    """Text ohne Formular, Footer, CTA-Block und Staedteliste.
    Diese Bereiche wiederholen sich naturgemaess und sind kein Doorway-Signal."""
    h = html
    for muster in (r"<style>.*?</style>", r"<script.*?</script>", r"<svg.*?</svg>",
                   r"<footer.*?</footer>", r"<header.*?</header>",
                   r'<section id="anfrage">.*?</section>',
                   r'<section id="region">.*?</section>',
                   r'<div class="hero-form".*?</div>\s*</div>',
                   r"<!--.*?-->"):
        h = re.sub(muster, " ", h, flags=re.S)
    h = re.sub(r"<[^>]+>", " ", h)
    return " ".join(h.split())


def woerter(text: str):
    return re.findall(r"[a-zA-ZäöüÄÖÜß0-9\.\-]+", text.lower())


def shingles(text: str, n: int = SHINGLE_N):
    w = woerter(text)
    return {" ".join(w[i:i + n]) for i in range(max(0, len(w) - n + 1))}


def saetze(text: str):
    roh = re.split(r"(?<=[.!?])\s+", text)
    return [s.strip() for s in roh if len(s.split()) >= 5]


def zahlen(text: str):
    """Stadtspezifische Zahlen: Einwohner, Betriebe, Prozentwerte, Jahreszahlen."""
    roh = re.findall(r"\b\d{1,3}(?:\.\d{3})+\b|\b\d+,\d+\b|\b\d{2,}\b", text)
    # Jahreszahlen sind keine Kennzahl zur Stadt, sie stehen ueberall
    return {z for z in roh if not re.fullmatch(r"(19|20)\d{2}", z)}


def kopf(html: str, feld: str):
    m = re.search(rf'<meta name="{feld}" content="([^"]*)"', html)
    return m.group(1) if m else ""


def stadtteile(html: str):
    return set(re.findall(r'<span class="badge">📍 ([^<]+)</span>', html))


# ----------------------------------------------------------------- Laden
def lade(pfade):
    seiten = {}
    for p in pfade:
        html = open(p, encoding="utf-8").read()
        txt = sichtbarer_text(html)
        inh = inhaltstext(html)
        seiten[os.path.basename(p)] = {
            "pfad": p,
            "html": html,
            "text": txt,
            "stadt": kopf(html, "geo.placename") or os.path.basename(p),
            "shingles": shingles(txt),
            "saetze": set(saetze(txt)),
            "inhalt_saetze": set(saetze(inh)),
            "zahlen": zahlen(txt),
            "orte": stadtteile(html),
            "woerter": len(txt.split()),
        }
    return seiten


# ----------------------------------------------------------------- Prüfung
def pruefe(seiten, zu_pruefen=None):
    namen = list(seiten)
    zu_pruefen = zu_pruefen or namen
    probleme = {n: [] for n in zu_pruefen}
    hinweise = {n: [] for n in zu_pruefen}

    # Satz-, Orts- und Zahlenvorkommen ueber alle Seiten zaehlen
    satz_zaehler = Counter()
    inhalt_zaehler = Counter()
    ort_zaehler = Counter()
    zahl_zaehler = Counter()
    for d in seiten.values():
        satz_zaehler.update(d["saetze"])
        inhalt_zaehler.update(d["inhalt_saetze"])
        ort_zaehler.update(d["orte"])
        zahl_zaehler.update(d["zahlen"])

    werte = {}

    for n in zu_pruefen:
        d = seiten[n]
        g = GRENZEN

        # 1) Umfang
        if d["woerter"] < g["min_woerter"]:
            probleme[n].append(f"nur {d['woerter']} Woerter (mindestens {g['min_woerter']})")

        # 2) Menge an eigenstaendigem Inhalt (absolut, in Woertern)
        eigene = [s for s in d["saetze"] if satz_zaehler[s] == 1]
        eigene_woerter = sum(len(s.split()) for s in eigene)
        if eigene_woerter < g["min_eigene_woerter"]:
            probleme[n].append(
                f"nur {eigene_woerter} Woerter stehen ausschliesslich auf dieser Seite "
                f"(mindestens {g['min_eigene_woerter']}). Die Seite hat zu wenig eigenen Inhalt")

        # 2b) Skalierungswaechter: wie weit sind die inhaltlichen Saetze verbreitet
        ueberverbreitet = [(s_, inhalt_zaehler[s_] / len(seiten))
                           for s_ in d["inhalt_saetze"]
                           if inhalt_zaehler[s_] / len(seiten) > g["max_satz_verbreitung"]]
        if ueberverbreitet:
            schlimmster = max(ueberverbreitet, key=lambda x: x[1])
            probleme[n].append(
                f"{len(ueberverbreitet)} Textbausteine stehen auf mehr als "
                f"{g['max_satz_verbreitung']:.0%} aller Stadtseiten (schlimmster: {schlimmster[1]:.0%}). "
                f"Die Bausteine in blocks.py muessen erweitert werden, sonst wird das mit jeder "
                f"neuen Stadt schlimmer. Beispiel: \"{schlimmster[0][:70]}\"")

        # 3) Stadtspezifische Zahlen
        eigene_zahlen = [z for z in d["zahlen"] if zahl_zaehler[z] == 1]
        if len(eigene_zahlen) < g["min_eigene_zahlen"]:
            probleme[n].append(
                f"nur {len(eigene_zahlen)} nur hier vorkommende Zahlen (mindestens {g['min_eigene_zahlen']}). "
                f"Der Text hat zu wenig echte Fakten zur Stadt")

        # 4) Eigene Ortsnamen
        eigene_orte = [o for o in d["orte"] if ort_zaehler[o] == 1]
        if len(eigene_orte) < g["min_eigene_orte"]:
            probleme[n].append(
                f"nur {len(eigene_orte)} eigene Stadtteilnamen (mindestens {g['min_eigene_orte']})")

        # 5) Gedankenstriche (Patricks Stilregel)
        striche = d["text"].count("–") + d["text"].count("—")
        if striche > g["max_gedankenstriche"]:
            probleme[n].append(f"{striche} Gedankenstriche im sichtbaren Text")

        # 6) Stadtname praesent
        stadt_kurz = d["stadt"].split()[0]
        nennungen = len(re.findall(re.escape(stadt_kurz), d["text"], re.I))
        if nennungen < g["min_stadtnennungen"]:
            probleme[n].append(f"Stadtname nur {nennungen} mal im Text (mindestens {g['min_stadtnennungen']})")

        # 7) Pflicht-Bausteine
        if 'crumb"' not in d["html"]:
            probleme[n].append("Brotkrumen fehlen")
        if 'href="https://www.mehrauftrag.de/" class="logo"' not in d["html"]:
            probleme[n].append("Logo verlinkt nicht auf die Startseite")
        if "webdesign-standorte" not in d["html"]:
            probleme[n].append("Link auf die Standort-Uebersicht fehlt")
        if "min-width: 0" not in d["html"] and "min-width:0" not in d["html"]:
            hinweise[n].append("Mobile-Fix (min-width:0) scheint zu fehlen, bitte auf 360px pruefen")

        werte[n] = {"woerter": d["woerter"], "eigene_woerter": eigene_woerter,
                    "eigene_zahlen": len(eigene_zahlen), "eigene_orte": len(eigene_orte)}

    # 8) Paarweise Aehnlichkeit
    paare = []
    for a, b in itertools.combinations(namen, 2):
        sa, sb = seiten[a]["shingles"], seiten[b]["shingles"]
        if not sa or not sb:
            continue
        j = len(sa & sb) / len(sa | sb)
        paare.append((j, a, b))
    paare.sort(reverse=True)

    for j, a, b in paare:
        if j > GRENZEN["max_shingle_jaccard"]:
            for n in (a, b):
                if n in probleme:
                    probleme[n].append(
                        f"zu aehnlich zu {b if n == a else a} ({j:.0%} gemeinsame Textbausteine, "
                        f"erlaubt sind {GRENZEN['max_shingle_jaccard']:.0%})")

    return probleme, hinweise, werte, paare


# ----------------------------------------------------------------- Ausgabe
def main():
    args = sys.argv[1:]
    basis = os.path.dirname(os.path.abspath(__file__))
    pub = os.path.join(basis, "public")
    warte = os.path.join(basis, "_stadtseiten-warteschlange")

    if "--datei" in args:
        pfade = [args[args.index("--datei") + 1]]
        alle = glob.glob(os.path.join(pub, "webdesign-*.html")) + \
               glob.glob(os.path.join(warte, "webdesign-*.html"))
        alle = list(dict.fromkeys(alle + pfade))
        seiten = lade(alle)
        ziel = [os.path.basename(p) for p in pfade]
    elif "--nur-neue" in args:
        alle = glob.glob(os.path.join(pub, "webdesign-*.html")) + \
               glob.glob(os.path.join(warte, "webdesign-*.html"))
        seiten = lade(alle)
        ziel = [os.path.basename(p) for p in glob.glob(os.path.join(warte, "webdesign-*.html"))]
    else:
        alle = glob.glob(os.path.join(pub, "webdesign-*.html")) + \
               glob.glob(os.path.join(warte, "webdesign-*.html"))
        seiten = lade(alle)
        ziel = list(seiten)

    if not seiten:
        print("Keine Stadtseiten gefunden.")
        return 1

    probleme, hinweise, werte, paare = pruefe(seiten, ziel)

    print("=" * 72)
    print(f"QUALITAETSPRUEFUNG STADTSEITEN   ({len(seiten)} Seiten gesamt, {len(ziel)} geprueft)")
    print("=" * 72)
    print()
    print(f"{'Seite':32s} {'Woerter':>8s} {'davon eigen':>12s} {'Kennzahlen':>11s}  Status")
    print("-" * 72)
    durchgefallen = []
    for n in sorted(ziel):
        w = werte[n]
        ok = not probleme[n]
        if not ok:
            durchgefallen.append(n)
        print(f"{n[:32]:32s} {w['woerter']:8d} {w['eigene_woerter']:12d} {w['eigene_zahlen']:11d}  "
              f"{'OK' if ok else 'DURCHGEFALLEN'}")

    print()
    print("Hoechste Textaehnlichkeit zwischen zwei Seiten:")
    for j, a, b in paare[:5]:
        markierung = "  <-- ZU HOCH" if j > GRENZEN["max_shingle_jaccard"] else ""
        print(f"   {j:5.1%}  {a[:28]:28s} und {b[:28]}{markierung}")
    print(f"   Grenzwert: {GRENZEN['max_shingle_jaccard']:.0%}")

    if durchgefallen:
        print()
        print("=" * 72)
        print("DIESE SEITEN DUERFEN NICHT VEROEFFENTLICHT WERDEN:")
        print("=" * 72)
        for n in durchgefallen:
            print(f"\n  {n}")
            for p in probleme[n]:
                print(f"     - {p}")
        print()
        print("Was zu tun ist: Die betroffene Seite ueberarbeiten, bis sie eigenstaendig ist.")
        print("Mehr echte Zahlen zur Stadt, eigene Formulierungen, andere Abschnittsreihenfolge.")
        print("Im Zweifel lieber zwei gute Seiten pro Woche als vier schwache.")
        return 1

    offene_hinweise = {n: h for n, h in hinweise.items() if h}
    if offene_hinweise:
        print("\nHinweise (kein Ausschlussgrund):")
        for n, h in offene_hinweise.items():
            for x in h:
                print(f"   {n}: {x}")

    print()
    print("Alle geprueften Seiten sind eigenstaendig genug. Freigabe erteilt.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

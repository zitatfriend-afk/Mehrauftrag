# SEO-Audit mehrauftrag.de

Stand: 25.08.2026
Grundlage: Repo-Stand `73de10a` vom 24.08.2026 (github.com/zitatfriend-afk/Mehrauftrag)
Umfang: alle Seiten in `app/` und alle `public/*.html`
Phase 1 der Neuausrichtung. In dieser Phase wurde keine einzige Projektdatei geändert.

---

## Zusammenfassung in fünf Sätzen

Die Domain hat 53 indexierbare Seiten, gute Inhalte und eine technisch saubere Basis, aber drei strukturelle Bremsen: die Startseite liefert im ausgelieferten HTML gar keine H1 mit Suchbegriff, 15 von 45 Titles sind zu lang und werden von Google gekürzt, und fünf Branchenseiten konkurrieren direkt mit einem gleichnamigen Ratgeberartikel.
Die interne Verlinkung ist extrem einseitig: 95 Links tragen den Ankertext „Mehr dazu", und alle 16 Ratgeberartikel hängen praktisch an einem einzigen Hub.
Für die Umstellung auf Remote gibt es 312 Fundstellen, davon 62 in JSON-LD und Rechtstexten und rund 110 im sichtbaren Text der Stadtseiten.
Der riskanteste Punkt beim Umzug ist nicht der Fließtext, sondern die 16 eigenständigen `ProfessionalService`-Einträge, die jeweils die Hainburger Postanschrift führen: 16 lokale Betriebsprofile an einer Adresse, die es dann nicht mehr gibt.
Erfahrungssignale fehlen fast vollständig: keine Fallstudienseiten, keine Autorenangabe, keine eigene Über-uns-Seite. Genau das ist der Hebel für die Autorität, die auf Seite 3 und 4 fehlt.

---

## 1.1 Keyword- und Intent-Karte

Legende Intent: **K** = kommerziell (Kaufabsicht), **I** = informativ, **N** = navigational.
„Geldseite" heißt: Seite, die eine Anfrage auslösen soll.

### App-Routen

| URL | Hauptkeyword | Intent | Zielgruppe |
|---|---|---|---|
| `/` | digitalagentur / webdesign agentur | K | Alle KMU, Einstieg über Marke |
| `/grafikdesign` | grafikdesign frankfurt, textildruck firmenkleidung | K | KMU mit Werbemittel- und Printbedarf |
| `/google-ads` | google ads für lokale unternehmen | K | Betriebe, die sofort Anfragen wollen |
| `/elektriker` | website für elektriker | K | Elektrobetriebe |
| `/kostenlose-analyse` | kostenlose website analyse (Elektriker) | K (Lead-Magnet) | Elektrobetriebe |
| `/karriere` | jobs mehr auftrag | N | Bewerber |
| `/ratgeber` | ratgeber online-marketing kleine betriebe | I (Hub) | Alle Branchen |
| `/webdesign-standorte` | webdesign standorte | K (Hub) | Betriebe, die eine Stadt suchen |
| `/impressum`, `/datenschutz`, `/agb` | keins | N | Pflicht, korrekt auf noindex |
| `/analyse/*` (17 Seiten) | keins | K (Formular) | Alle, korrekt auf noindex |

### Stadtseiten (16 Seiten, alle `public/webdesign-*.html`)

Alle folgen demselben Muster: Hauptkeyword `webdesign <stadt>`, Intent kommerziell, Zielgruppe kleine Betriebe in dieser Stadt (Handwerk, Gastronomie, Reinigung, Metallbau, Hausmeisterservice, Kosmetik).

| URL | Hauptkeyword | Nebenkeyword laut H1 und Description |
|---|---|---|
| `/webdesign-aschaffenburg` | webdesign aschaffenburg | handwerk, bayerischer untermain |
| `/webdesign-dietzenbach` | webdesign dietzenbach | kreisstadt, logistik |
| `/webdesign-dortmund` | webdesign dortmund | handwerksbetriebe, stadtbezirke |
| `/webdesign-duesseldorf` | webdesign düsseldorf | stadtteile, handwerksunternehmen |
| `/webdesign-duisburg` | webdesign duisburg | einzelunternehmer, ortsteile |
| `/webdesign-frankfurt` | webdesign frankfurt | kleine betriebe, stadtteile |
| `/webdesign-hanau` | webdesign hanau | aufträge, nähe |
| `/webdesign-koeln` | webdesign köln | veedel, stadtteile |
| `/webdesign-leipzig` | webdesign leipzig, website erstellen lassen | ortsteile |
| `/webdesign-moenchengladbach` | webdesign mönchengladbach | gladbach, rheydt |
| `/webdesign-muehlheim` | webdesign mühlheim | mittelstand, dietesheim, lämmerspiel |
| `/webdesign-obertshausen` | webdesign obertshausen | hausen, industriezulieferer |
| `/webdesign-offenbach` | webdesign offenbach | mehr anfragen |
| `/webdesign-rodgau` | webdesign rodgau, website erstellen lassen | fünf stadtteile |
| `/webdesign-seligenstadt` | webdesign seligenstadt | froschhausen, klein-welzheim |
| `/webdesign-wuppertal` | webdesign wuppertal | elberfeld, barmen, cronenberg |

### Branchen- und Problemseiten (13 Seiten)

| URL | Hauptkeyword | Intent | Zielgruppe |
|---|---|---|---|
| `/webseite-fuer-gastronomie` | website für gastronomie erstellen lassen | K | Gastronomie allgemein |
| `/webseite-fuer-restaurant` | website für restaurant erstellen lassen | K | Restaurants |
| `/webseite-fuer-pizzeria` | website für pizzeria, online bestellen ohne provision | K | Pizzerien, Lieferdienste |
| `/webseite-fuer-cafe` | website für café erstellen lassen | K | Cafés, Bistros |
| `/webseite-fuer-bar` | website für bar erstellen lassen | K | Bars, Cocktailbars |
| `/webseite-fuer-foodtruck` | website für foodtruck | K | Foodtrucks, Streetfood, Catering |
| `/webseite-fuer-gebaeudereinigung` | website für gebäudereinigung | K | Reinigungsfirmen |
| `/webseite-fuer-hausmeisterservice` | website für hausmeisterservice | K | Hausmeisterservice, Objektbetreuung |
| `/webseite-fuer-schweisser` | website für schweißer, metallbau | K | Schweiß- und Metallbaubetriebe |
| `/webseite-fuer-kosmetikstudio` | website für kosmetikstudio, kosmetikerin | K | Kosmetikstudios, Nagelstudios |
| `/webseite-fuer-physiotherapie` | website für physiotherapiepraxis | K | Physiopraxen |
| `/website-bringt-keine-anfragen` | website bringt keine anfragen | I mit Kaufkante | Betriebe mit bestehender Website |
| `/website-relaunch` | website relaunch | K | Betriebe mit veralteter Website |

### Ratgeber (16 Artikel, alle Intent informativ)

| URL | Hauptkeyword | Zielgruppe |
|---|---|---|
| `/ratgeber/online-marketing-restaurant` | online-marketing restaurant | Gastronomie |
| `/ratgeber/kunden-gewinnen-handwerk` | kunden gewinnen handwerk | Handwerk |
| `/ratgeber/auftraege-gebaeudereinigung` | aufträge gebäudereinigung | Reinigungsfirmen |
| `/ratgeber/kundinnen-gewinnen-kosmetikstudio` | kundinnen gewinnen kosmetikstudio | Kosmetik |
| `/ratgeber/auftraege-hausmeisterservice` | aufträge hausmeisterservice | Hausmeisterservice |
| `/ratgeber/auftraege-schweisser-metallbau` | aufträge schweißer metallbau | Metallbau |
| `/ratgeber/ki-suche-google-2026` | ki-suche, chatgpt sichtbarkeit | Alle |
| `/ratgeber/seo-oder-google-ads` | seo oder google ads | Alle |
| `/ratgeber/website-selbst-oder-agentur` | website selbst bauen oder agentur | Alle |
| `/ratgeber/professionelle-website-vorteile` | was bringt eine professionelle website | Alle |
| `/ratgeber/lokale-seo-google-maps` | lokale seo, google maps | Alle |
| `/ratgeber/google-bewertungen-mehr-kunden` | google bewertungen | Alle |
| `/ratgeber/corporate-design-werbemittel` | corporate design werbemittel | Alle |
| `/ratgeber/werbeagentur-rhein-main-finden` | werbeagentur rhein-main | Regional |
| `/ratgeber/webdesign-frankfurt` | website frankfurt worauf achten | Regional |
| `/ratgeber/webdesign-dach-region` | webdesign dach-region | DACH |

**Auffälligkeit:** Es gibt keine einzige Seite für den mit Abstand naheliegendsten kommerziellen Oberbegriff der Agentur, also „website erstellen lassen" oder „webdesign agentur" ohne Stadt. Die Startseite müsste das leisten, tut es aber wegen der fehlenden H1 und des markenlastigen Titles nicht.

---

## 1.2 Kannibalisierung

Sortiert nach Dringlichkeit. Die Empfehlung „Geldseite" bedeutet: diese Seite soll bei kommerziellen Suchanfragen ranken, die andere wird auf eine reine Wissensfrage zugespitzt und verlinkt mit beschreibendem Ankertext dorthin.

### A. Branchenseite gegen gleichnamigen Ratgeberartikel (fünf Paare, höchste Priorität)

| Nr. | URL 1 (Branchenseite) | URL 2 (Ratgeber) | Gemeinsames Keyword | Geldseite | Umwidmung der anderen |
|---|---|---|---|---|---|
| 1 | `/webseite-fuer-gebaeudereinigung` | `/ratgeber/auftraege-gebaeudereinigung` | aufträge gebäudereinigung online | Branchenseite | Ratgeber auf „Rahmenverträge mit Hausverwaltungen und Gewerbekunden gewinnen" zuspitzen, Kaufabsicht aus Titel und Einleitung entfernen |
| 2 | `/webseite-fuer-hausmeisterservice` | `/ratgeber/auftraege-hausmeisterservice` | aufträge hausmeisterservice | Branchenseite | Ratgeber auf „WEG und Objektbetreuung: wie Verwalter Dienstleister auswählen" zuspitzen |
| 3 | `/webseite-fuer-schweisser` | `/ratgeber/auftraege-schweisser-metallbau` | aufträge schweißer metallbau | Branchenseite | Ratgeber auf „Verfahren, Zertifikate und Referenzen richtig zeigen" zuspitzen |
| 4 | `/webseite-fuer-kosmetikstudio` | `/ratgeber/kundinnen-gewinnen-kosmetikstudio` | kundinnen gewinnen kosmetikstudio | Branchenseite | Ratgeber auf „Terminbuchung, Instagram und Bewertungen im Termingeschäft" zuspitzen |
| 5 | `/webseite-fuer-restaurant` und `/webseite-fuer-gastronomie` | `/ratgeber/online-marketing-restaurant` | online marketing restaurant | `/webseite-fuer-restaurant` | Ratgeber auf „Google-Unternehmensprofil und Bewertungen für Gastronomie" zuspitzen |

### B. Zwei Geldseiten auf dieselbe Suchintention

| Nr. | URL 1 | URL 2 | Gemeinsames Keyword | Geldseite | Umwidmung |
|---|---|---|---|---|---|
| 6 | `/webseite-fuer-gastronomie` | `/webseite-fuer-restaurant` | website für restaurant erstellen lassen | `/webseite-fuer-restaurant` | Gastronomie-Seite wird echte Kategorieseite: kurzer Überblick, dann klare Verzweigung zu Restaurant, Pizzeria, Café, Bar, Foodtruck. Der Begriff „Restaurant" verschwindet aus ihrem Title. |
| 7 | `/elektriker` | `/kostenlose-analyse` | website analyse elektriker | `/elektriker` | `/kostenlose-analyse` verliert den Elektriker-Bezug im Title und wird branchenoffener Lead-Magnet für alle Gewerke |
| 8 | `/webdesign-frankfurt` | `/ratgeber/webdesign-frankfurt` | webdesign frankfurt | Stadtseite | Ratgeberartikel bekommt einen Titel ohne „Webdesign Frankfurt", zum Beispiel Richtung „Worauf Betriebe im Rhein-Main-Gebiet bei ihrer Website achten sollten". Der Slug bleibt, damit keine Weiterleitung nötig wird. |
| 9 | `/website-relaunch` | `/website-bringt-keine-anfragen` | alte website bringt nichts | beide behalten, Abgrenzung schärfen | Relaunch = Entscheidung ist gefallen, Umsetzung gesucht. Keine-Anfragen = Ursache noch unklar, Diagnose gesucht. Diese Trennung steht heute nur implizit im Text und gehört in Title und Einleitung. |

### C. Schwächere Überschneidungen, beobachten statt sofort handeln

| Nr. | URL 1 | URL 2 | Gemeinsames Keyword | Empfehlung |
|---|---|---|---|---|
| 10 | `/ratgeber/professionelle-website-vorteile` | `/ratgeber/website-selbst-oder-agentur` | lohnt sich eine professionelle website | Zwei Blickwinkel auf dieselbe Frage. Zusammenführen wäre sauberer als beide zu behalten. Vorschlag zur Freigabe in Phase 4. |
| 11 | `/ratgeber/werbeagentur-rhein-main-finden` | `/ratgeber/webdesign-frankfurt` | agentur im rhein-main-gebiet | Nach der Remote-Umstellung verlieren beide ihren regionalen Zweck. Einer der beiden wird zur bundesweiten Auswahlhilfe. |
| 12 | `/grafikdesign` | `/ratgeber/corporate-design-werbemittel` | corporate design werbemittel | Geringes Risiko, weil der Ratgeber schon jetzt auf `/grafikdesign` verlinkt. Ankertext präzisieren reicht. |

**Keine Seite wird gelöscht.** Für Paar 10 wird in Phase 4 eine Zusammenführung mit 301 vorgeschlagen und erst nach ausdrücklicher Freigabe umgesetzt.

---

## 1.3 Vor-Ort-Widersprüche

Volltextsuche über `app/`, `public/` und `scripts/`. Gesucht wurde nach: „vor Ort", „bei dir im Betrieb", „aus der Region", „in deiner Nähe", „Josefstraße", „Hainburg", „63512", „Rhein-Main".

### Überblick

| Begriff | Treffer |
|---|---|
| vor Ort | 50 |
| bei dir im Betrieb | 6 |
| aus der Region | 5 |
| in deiner Nähe | 11 |
| Josefstraße | 38 |
| Hainburg | 99 |
| 63512 | 38 |
| Rhein-Main | 65 |
| **Summe** | **312** |

Davon entfallen 9 Treffer auf Impressum, Datenschutz und AGB. Diese Dateien werden laut Vorgabe nicht angefasst, sie stehen unten trotzdem in der Liste, damit die Zahlen aufgehen.

### Die vier Bauteile, in denen die Ortsbindung steckt

Die 312 Fundstellen sind keine 312 Einzelentscheidungen. Sie verteilen sich auf vier wiederkehrende Bauteile:

1. **JSON-LD auf den 16 Stadtseiten.** Jede Stadtseite trägt einen eigenen `ProfessionalService` mit `address` Josefstraße 28, 63512 Hainburg. Macht 48 Treffer und ist der technisch heikelste Teil, siehe 1.5.
2. **Sichtbarer Footer auf den 16 Stadtseiten.** Jede Seite nennt die Anschrift zusätzlich im Footer. Macht 16 weitere Treffer.
3. **Ein Nähe-Abschnitt auf 9 der 16 Stadtseiten.** Eine eigene H2, die den Standortvorteil erklärt. Die restlichen 7 Stadtseiten haben ihn nicht.
4. **Verstreute Formulierungen im Fließtext und in den FAQ-Antworten**, zum Beispiel „Ein Erstgespräch vor Ort in deinem Betrieb ist für uns normal".

### Die Nähe-Abschnitte auf den Stadtseiten

| Stadtseite | Überschrift des Nähe-Abschnitts | Remote-Hinweis vorhanden |
|---|---|---|
| `/webdesign-hanau` | Eine Agentur, die 15 Minuten entfernt sitzt | nein |
| `/webdesign-obertshausen` | Rund zehn Minuten von unserem Büro | nein |
| `/webdesign-rodgau` | Kurze Wege, echtes Ortswissen | nein |
| `/webdesign-muehlheim` | Aus der Region, nicht aus dem Netz | nein |
| `/webdesign-offenbach` | Warum eine Agentur aus dem Kreis Offenbach | nein |
| `/webdesign-koeln` | Eine Agentur aus dem Rhein-Main-Gebiet | nein |
| `/webdesign-leipzig` | Warum eine hessische Agentur für Leipzig | nein |
| `/webdesign-moenchengladbach` | Eine Agentur aus Hessen, ein Kunde im Sauerland | nein |
| `/webdesign-seligenstadt` | kein eigener Abschnitt, aber Title und H1 tragen „von nebenan" | nein |
| übrige 7 Stadtseiten | kein Nähe-Abschnitt | nein |

`/webdesign-muehlheim` ist der schwierigste Fall: die Überschrift „Aus der Region, nicht aus dem Netz" stellt Remote-Arbeit ausdrücklich als das Schlechtere dar. Diese Seite braucht in Phase 5 die gründlichste Überarbeitung.

Umgekehrt sind `/webdesign-koeln`, `/webdesign-leipzig`, `/webdesign-moenchengladbach`, `/webdesign-dortmund`, `/webdesign-duisburg`, `/webdesign-duesseldorf` und `/webdesign-wuppertal` bereits heute ortsferne Seiten. Sie argumentieren mit Marktkenntnis statt mit Fahrtzeit und taugen als Vorlage für die anderen neun.

### Seiten mit vorhandenem Remote-Hinweis

Nur an vier Stellen im Projekt steht heute schon etwas Remote-Taugliches:

| Datei | vorhandener Hinweis |
|---|---|
| `app/_components/structured-data.tsx` | `areaServed` DACH, aber gleichzeitig Postanschrift Hainburg |
| `app/analyse/_analyse-content.ts` | „aus der Ferne", „per WhatsApp", DACH |
| `public/webseite-fuer-physiotherapie.html` | „Zum Festpreis, DACH-weit" in der Description |
| `app/ratgeber/_articles.ts` | Artikel `webdesign-dach-region` argumentiert durchgehend ortsunabhängig |

Alle anderen Seiten haben keinen Remote-Hinweis.

### Vollständige Fundstellenliste


#### `app/_components/google-reviews.tsx`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 37 | Hainburg | text: "Top Webdesign aus Hainburg. |

#### `app/_components/structured-data.tsx`
Remote-Hinweis auf der Seite: ja (DACH)

| Zeile | Begriff | Satz |
|---|---|---|
| 42 | Josefstraße | streetAddress: "Josefstraße 28", |
| 43 | 63512 | postalCode: "63512", |
| 44 | Hainburg | addressLocality: "Hainburg", |
| 218 | Hainburg | text: "Mehr Auftrag sitzt in Hainburg im Rhein-Main-Gebiet bei Frankfurt am Main und betreut Kunden in der gesamten DACH-Region, also Deutschland, Oesterreich und der Schweiz.", |
| 218 | Rhein-Main | text: "Mehr Auftrag sitzt in Hainburg im Rhein-Main-Gebiet bei Frankfurt am Main und betreut Kunden in der gesamten DACH-Region, also Deutschland, Oesterreich und der Schweiz.", |

#### `app/agb/page.tsx` **[nicht anfassen: Rechtstext]**
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 46 | Josefstraße | Geschäftsbezeichnung Mehr Auftrag, Josefstraße 28, 63512 Hainburg (nachfolgend „Agentur“ oder |
| 46 | Hainburg | Geschäftsbezeichnung Mehr Auftrag, Josefstraße 28, 63512 Hainburg (nachfolgend „Agentur“ oder |
| 46 | 63512 | Geschäftsbezeichnung Mehr Auftrag, Josefstraße 28, 63512 Hainburg (nachfolgend „Agentur“ oder |

#### `app/analyse/_analyse-content.ts`
Remote-Hinweis auf der Seite: ja (DACH, per WhatsApp, aus der Ferne)

| Zeile | Begriff | Satz |
|---|---|---|
| 343 | Rhein-Main | audience: "Betriebe im Rhein-Main-Gebiet", |
| 344 | Rhein-Main | metaTitle: "Kostenlose Website-Analyse im Rhein-Main-Gebiet \| Mehr Auftrag", |
| 346 | Rhein-Main | "Kostenlose Analyse für Betriebe im Rhein-Main-Gebiet: Wo dein Auftritt im regionalen Wettbewerb steht und wie du mehr Anfragen gewinnst. |
| 347 | Rhein-Main | eyebrow: "Für das Rhein-Main-Gebiet", |
| 348 | Rhein-Main | h1: "Kostenlose Website-Analyse für Betriebe im Rhein-Main-Gebiet", |
| 350 | Rhein-Main | "Wir sitzen selbst im Rhein-Main-Gebiet und kennen den lokalen Wettbewerb. |
| 359 | Rhein-Main | leadSource: "Analyse - Rhein-Main", |
| 368 | Rhein-Main | "Kostenlose Analyse für Betriebe in Frankfurt und im Rhein-Main-Gebiet: Wie du lokal besser gefunden wirst und mehr Kunden gewinnst. |

#### `app/datenschutz/page.tsx` **[nicht anfassen: Rechtstext]**
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 127 | Josefstraße | street="Josefstraße 28" |
| 128 | Hainburg | city="63512 Hainburg" |
| 128 | 63512 | city="63512 Hainburg" |

#### `app/elektriker/_landing.tsx`
Remote-Hinweis auf der Seite: ja (per WhatsApp)

| Zeile | Begriff | Satz |
|---|---|---|
| 13 | Rhein-Main | * Zielgruppe: Elektriker-Betriebsinhaber (35–55), Region Frankfurt & Rhein-Main. |
| 181 | aus der Region | text: "Persönlicher Ansprechpartner aus der Region – Sie reden mit einem Menschen, nicht mit einer Hotline. |
| 498 | Rhein-Main | Für Elektriker in Frankfurt &amp; Rhein-Main. |

#### `app/elektriker/page.tsx`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 6 | Rhein-Main | title: "Websites für Elektriker in Frankfurt & Rhein-Main \| Mehr Auftrag", |
| 8 | Rhein-Main | Professionelle Websites speziell für Elektrikerbetriebe in Frankfurt und Rhein-Main – mit Click-to-Call, Google Maps und Bewertungen.", |
| 11 | Rhein-Main | title: "Websites für Elektriker in Frankfurt & Rhein-Main", |
| 13 | Rhein-Main | Websites speziell für Elektrikerbetriebe in Frankfurt und Rhein-Main.", |

#### `app/grafikdesign/_landing.tsx`
Remote-Hinweis auf der Seite: ja (DACH, per WhatsApp, aus der Ferne)

| Zeile | Begriff | Satz |
|---|---|---|
| 12 | Rhein-Main | * Zielgruppe: Unternehmen aus Frankfurt und dem Rhein-Main-Gebiet, die |
| 208 | Rhein-Main | title: "Fest im Rhein-Main-Gebiet", |
| 259 | Rhein-Main | Wir sitzen im Rhein-Main-Gebiet und betreuen Kunden in Frankfurt und der ganzen Region. |
| 450 | Rhein-Main | Grafikdesign & Werbetechnik aus Frankfurt und Rhein-Main |
| 648 | vor Ort | text="Das Team war im Einsatz gut, trat vor Ort aber uneinheitlich auf. |
| 818 | Rhein-Main | {/* ─── Lokal: Frankfurt & Rhein-Main + interne Verlinkung ─── */} |
| 831 | Rhein-Main | Dein Grafikdesigner für Frankfurt und das Rhein-Main-Gebiet |
| 835 | Rhein-Main | Wir sitzen im Rhein-Main-Gebiet und arbeiten für Betriebe in Frankfurt und der ganzen Region. |

#### `app/grafikdesign/page.tsx`
Remote-Hinweis auf der Seite: ja (aus der Ferne)

| Zeile | Begriff | Satz |
|---|---|---|
| 7 | Rhein-Main | "Grafikdesign, Textildruck und Werbetechnik aus Frankfurt und Rhein-Main mit eigenem Grafikteam. |
| 12 | Rhein-Main | "Eigenes Grafikteam für Frankfurt und Rhein-Main. |
| 35 | Rhein-Main | { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" }, |
| 111 | Rhein-Main | Wir sitzen im Rhein-Main-Gebiet und betreuen Kunden in Frankfurt und der ganzen Region. |

#### `app/impressum/page.tsx` **[nicht anfassen: Rechtstext]**
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 28 | Josefstraße | street="Josefstraße 28" |
| 29 | Hainburg | city="63512 Hainburg" |
| 29 | 63512 | city="63512 Hainburg" |
| 39 | Josefstraße | street="Josefstraße 28" |
| 40 | Hainburg | city="63512 Hainburg" |
| 40 | 63512 | city="63512 Hainburg" |

#### `app/kostenlose-analyse/_landing.tsx`
Remote-Hinweis auf der Seite: ja (per WhatsApp)

| Zeile | Begriff | Satz |
|---|---|---|
| 13 | Rhein-Main | * Zielgruppe: Elektriker-Betriebsinhaber (35–55), Region Frankfurt & Rhein-Main. |

#### `app/page.tsx`
Remote-Hinweis auf der Seite: ja (DACH, per Telefon, per WhatsApp, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 182 | aus der Region | imageAlt: "Website von Blitz Industrie und Gebäudereinigung aus der Region Bebra, Gebäudereinigung und Hausmeisterservice, erstellt von Mehr Auftrag", |

#### `app/ratgeber/_articles.ts`
Remote-Hinweis auf der Seite: ja (ortsunabhängig, DACH, per Telefon, per WhatsApp, aus der Ferne)

| Zeile | Begriff | Satz |
|---|---|---|
| 56 | Hainburg | Sie tippen etwas wie Pizzeria in der Nähe oder Restaurant Hainburg in Google ein und schauen sich in wenigen Sekunden an, was ihnen angezeigt wird: die Karte, die Bewertungen, die Fotos, die Öffnungszeiten. |
| 134 | Hainburg | "Wenn jemand Elektriker Hainburg oder Gebäudereinigung Frankfurt sucht, entscheidet die lokale Suche bei Google darüber, wer den Auftrag bekommt. |
| 205 | Rhein-Main | "Auftraggeber suchen selten allgemein, sondern konkret: Gebäudereinigung Frankfurt, Büroreinigung in der Nähe oder Unterhaltsreinigung Rhein-Main. |
| 269 | Hainburg | Wer Kosmetikstudio Hainburg oder Wimpernverlängerung in der Nähe sucht, bekommt in erster Linie Websites angezeigt, keine Instagram-Profile. |
| 439 | vor Ort | "Viele Schweißbetriebe arbeiten nicht nur in der eigenen Werkstatt, sondern fahren zum Kunden, etwa für Reparaturen an Maschinen, Geländern oder Toren vor Ort. |
| 494 | Rhein-Main | "Wenn jemand die KI fragt Welche Werbeagentur im Rhein-Main-Gebiet macht Websites für Handwerker, dann empfiehlt die KI die Betriebe, die sie versteht und für vertrauenswürdig hält. |
| 573 | vor Ort | "Gerade für lokale Betriebe ist SEO stark, weil die Konkurrenz vor Ort meist überschaubar ist. |
| 764 | in deiner Nähe | "Wenn jemand in deiner Nähe nach einem Betrieb wie deinem sucht, entscheiden wenige Zeilen bei Google darüber, wer den Auftrag bekommt: die drei Einträge, die zusammen mit der Karte ganz oben erscheinen. |
| 812 | Hainburg | a: "Lokale SEO umfasst alle Maßnahmen, mit denen ein Betrieb bei Suchen mit örtlichem Bezug besser gefunden wird, etwa Elektriker in der Nähe oder Friseur Hainburg. |
| 920 | vor Ort | Das Logo hat mal ein Bekannter gemacht, die Visitenkarten kamen von einer Online-Druckerei, die Beschriftung am Transporter hat der Werbetechniker vor Ort entworfen, und die Arbeitsshirts sind schlicht die, die gerade im Angebot waren.", |
| 966 | vor Ort | Gerade bei Handwerk und Dienstleistungen vor Ort ist das ein spürbarer Unterschied.", |
| 976 | Rhein-Main | { label: "Werbeagentur im Rhein-Main-Gebiet finden", href: "/ratgeber/werbeagentur-rhein-main-finden" }, |
| 987 | Rhein-Main | title: "Werbeagentur im Rhein-Main-Gebiet finden: worauf du achten solltest", |
| 988 | Rhein-Main | metaTitle: "Werbeagentur im Rhein-Main-Gebiet finden: Checkliste \| Ratgeber", |
| 990 | Rhein-Main | "Die richtige Werbeagentur im Rhein-Main-Gebiet finden: worauf kleine Betriebe achten sollten und woran du eine gute von einer schlechten erkennst.", |
| 995 | Rhein-Main | "Das Rhein-Main-Gebiet rund um Frankfurt, Offenbach und Hanau hat viele Agenturen, von der großen Full-Service-Agentur bis zum Ein-Mann-Freelancer. |
| 1036 | Rhein-Main | Vieles lässt sich heute problemlos aus der Ferne klären, und im Rhein-Main-Gebiet sind die Wege für einen Termin ohnehin kurz.", |
| 1060 | Rhein-Main | title: "Website für Betriebe in Frankfurt und Rhein-Main: worauf du achten solltest", |
| 1061 | Rhein-Main | metaTitle: "Website Frankfurt & Rhein-Main: worauf Betriebe achten \| Ratgeber", |
| 1063 | Rhein-Main | "Worauf Betriebe in Frankfurt und im Rhein-Main-Gebiet bei ihrer Website achten sollten: lokale Auffindbarkeit, Ladezeit, Bilder und Google-Profil, verständlich erklärt.", |
| 1068 | Rhein-Main | "Frankfurt und das umliegende Rhein-Main-Gebiet sind wirtschaftlich stark und entsprechend hart umkämpft. |
| 1079 | vor Ort | label: "Konkret für Frankfurt: so bauen wir Websites für Betriebe vor Ort", |
| 1124 | Hainburg | Mehr Auftrag sitzt in Hainburg im Rhein-Main-Gebiet und betreut Betriebe in Frankfurt und der ganzen Umgebung, vieles davon bequem aus der Ferne.", |
| 1124 | Rhein-Main | Mehr Auftrag sitzt in Hainburg im Rhein-Main-Gebiet und betreut Betriebe in Frankfurt und der ganzen Umgebung, vieles davon bequem aus der Ferne.", |
| 1129 | Rhein-Main | { label: "Werbeagentur im Rhein-Main-Gebiet finden", href: "/ratgeber/werbeagentur-rhein-main-finden" }, |
| 1168 | vor Ort | "Für die Zusammenarbeit über Ländergrenzen hinweg braucht es heute kein Büro vor Ort. |
| 1201 | Rhein-Main | { label: "Werbeagentur im Rhein-Main-Gebiet finden", href: "/ratgeber/werbeagentur-rhein-main-finden" }, |

#### `app/ratgeber/page.tsx`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 11 | Rhein-Main | "Der Mehr-Auftrag-Ratgeber: praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für Handwerk, Gastronomie und Dienstleister im Rhein-Main-Gebiet. |
| 16 | Rhein-Main | "Praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für kleine und mittlere Betriebe im Rhein-Main-Gebiet.", |

#### `app/webdesign-standorte/page.tsx`
Remote-Hinweis auf der Seite: ja (per Telefon, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 49 | Rhein-Main | titel: "Rhein-Main und Untermain", |
| 51 | Hainburg | "Unser Kerngebiet rund um Hainburg. |
| 261 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg ·{" "} |
| 261 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg ·{" "} |
| 261 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg ·{" "} |

#### `public/webdesign-aschaffenburg.html`
Remote-Hinweis auf der Seite: ja (bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 146 | vor Ort | Ein Erstgespräch vor Ort in deinem Betrieb ist bei uns Standard und kostet nichts." |
| 566 | vor Ort | ✓ Persönlich vor Ort |
| 600 | aus der Region | Agentur aus der Region |
| 602 | Hainburg | Von Hainburg nach Aschaffenburg sind es rund 29 Kilometer und gut eine halbe Stunde, über die hessisch-bayerische Grenze, aber im selben Wirtschaftsraum. |
| 697 | vor Ort | Ein Erstgespräch vor Ort in deinem Betrieb ist bei uns Standard und kostet nichts. |
| 747 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 747 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 764 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 764 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 764 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-dietzenbach.html`
Remote-Hinweis auf der Seite: ja (bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 114 | bei dir im Betrieb | Erstgespräch bei dir im Betrieb, kostenlos." |
| 114 | Hainburg | Von Hainburg aus sind es rund 20 Kilometer, gut 30 Minuten. |
| 542 | vor Ort | ✓ Persönlich vor Ort |
| 584 | vor Ort | Kreisverwaltung vor Ort Als Kreisstadt sitzen hier Behörden und die Wirtschaftsförderung des Kreises. |
| 600 | vor Ort | Gastronomie und Imbiss Einpendler essen mittags vor Ort, Anwohner bestellen abends. |
| 601 | vor Ort | Einzelhandel und Fachgeschäfte Gegen Rathaus-Center und Onlinehandel hilft nur eins: online sichtbar sein und den Vorteil vor Ort ausspielen. |
| 625 | Hainburg | Unser Büro liegt in Hainburg, gut 20 Kilometer entfernt, im selben Landkreis, dessen Verwaltung in Dietzenbach sitzt. |
| 656 | vor Ort | 1 Gespräch, kostenlos Telefon oder Besuch vor Ort, wie es dir lieber ist. |
| 672 | bei dir im Betrieb | Erstgespräch bei dir im Betrieb, kostenlos. |
| 672 | Hainburg | Von Hainburg aus sind es rund 20 Kilometer, gut 30 Minuten. |
| 723 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 723 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 740 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 740 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 740 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-dortmund.html`
Remote-Hinweis auf der Seite: ja (per WhatsApp, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 665 | Hainburg | Unser Büro liegt in Hainburg bei Frankfurt. |
| 763 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 763 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 780 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-duesseldorf.html`
Remote-Hinweis auf der Seite: ja (DACH, per WhatsApp, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 175 | vor Ort | "name": "Ihr sitzt nicht vor Ort. |
| 624 | vor Ort | Der Markt vor Ort |
| 673 | Hainburg | Wir sitzen in Hainburg bei Frankfurt und bauen für Betriebe, die Anfragen brauchen und kein Markenhandbuch. |
| 686 | vor Ort | 1 Gespräch, kostenlos Telefon oder Besuch vor Ort, wie es dir lieber ist. |
| 722 | vor Ort | Ihr sitzt nicht vor Ort. |
| 771 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 771 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 788 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 788 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 788 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-duisburg.html`
Remote-Hinweis auf der Seite: ja (aus der Ferne, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 38 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 39 | 63512 | "postalCode": "63512", |
| 40 | Hainburg | "addressLocality": "Hainburg", |
| 87 | vor Ort | Wer regelmäßig jemanden im Betrieb stehen haben will, ist bei einer Agentur vor Ort besser aufgehoben." } |
| 87 | Hainburg | "acceptedAnswer": { "@type": "Answer", "text": "Unser Büro steht in Hainburg bei Frankfurt. |
| 579 | Hainburg | Unser Büro steht in Hainburg bei Frankfurt. |
| 629 | vor Ort | Wer regelmäßig jemanden im Betrieb stehen haben will, ist bei einer Agentur vor Ort besser aufgehoben. |
| 629 | Hainburg | Unser Büro steht in Hainburg bei Frankfurt. |
| 677 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 677 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 694 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 694 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 694 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-frankfurt.html`
Remote-Hinweis auf der Seite: ja (bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 162 | Hainburg | Von Hainburg aus sind es je nach Stadtteil 25 bis 40 Minuten. |
| 616 | vor Ort | Der Markt vor Ort |
| 713 | Hainburg | Von Hainburg aus sind es je nach Stadtteil 25 bis 40 Minuten. |
| 763 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 763 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 780 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-hanau.html`
Remote-Hinweis auf der Seite: ja (DACH, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 134 | vor Ort | Ein Erstgespräch vor Ort in deinem Betrieb ist für uns normal, nicht die Ausnahme. |
| 134 | Hainburg | Wir sitzen in Hainburg, das sind rund 15 Minuten Fahrt. |
| 158 | Rhein-Main | Wir betreuen Kunden im gesamten Rhein-Main-Gebiet und darüber hinaus. |
| 559 | Hainburg | Unser Büro liegt in Hainburg, rund 15 Minuten von der Hanauer Innenstadt. |
| 561 | vor Ort | ✓ Persönlich vor Ort in Hanau |
| 596 | vor Ort | Der Markt vor Ort |
| 648 | Hainburg | Zwischen unserem Büro in Hainburg und der Hanauer Innenstadt liegen keine sechs Kilometer Luftlinie. |
| 695 | vor Ort | Ein Erstgespräch vor Ort in deinem Betrieb ist für uns normal, nicht die Ausnahme. |
| 695 | Hainburg | Wir sitzen in Hainburg, das sind rund 15 Minuten Fahrt. |
| 698 | Rhein-Main | Wir betreuen Kunden im gesamten Rhein-Main-Gebiet und darüber hinaus. |
| 746 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 746 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 763 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 763 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 763 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-koeln.html`
Remote-Hinweis auf der Seite: ja (per Telefon, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 664 | Rhein-Main | Eine Agentur aus dem Rhein-Main-Gebiet |
| 665 | Hainburg | Wir sitzen in Hainburg bei Frankfurt, gut anderthalb Stunden von Köln. |
| 763 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 763 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 780 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-leipzig.html`
Remote-Hinweis auf der Seite: ja (per Telefon, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 683 | Hainburg | Wir sitzen in Hainburg bei Frankfurt und arbeiten bundesweit. |
| 763 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 763 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 780 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 780 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-moenchengladbach.html`
Remote-Hinweis auf der Seite: ja (per Telefon, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 38 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 39 | 63512 | "postalCode": "63512", |
| 40 | Hainburg | "addressLocality": "Hainburg", |
| 77 | Hainburg | Unser Büro steht in Hainburg bei Frankfurt, gearbeitet wird per Telefon, Videocall und Entwurfslink." } |
| 579 | vor Ort | Wenn dir persönliche Termine vor Ort wichtig sind, sag es gleich, dann sind wir die Falschen. |
| 579 | Hainburg | Unser Büro steht in Hainburg bei Frankfurt, nicht am Niederrhein. |
| 627 | vor Ort | Wer regelmäßige Termine vor Ort braucht, ist bei einer Agentur um die Ecke besser aufgehoben, das sagen wir offen. |
| 677 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 677 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 694 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 694 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 694 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-muehlheim.html`
Remote-Hinweis auf der Seite: ja (bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 126 | bei dir im Betrieb | Erstgespräch bei dir im Betrieb, kostenlos und unverbindlich." |
| 126 | Hainburg | "text": "Ja, von Hainburg aus rund 30 Minuten. |
| 546 | vor Ort | ✓ Persönlich vor Ort |
| 647 | Hainburg | Von Hainburg nach Mühlheim sind es rund 15 Kilometer am Main entlang. |
| 661 | bei dir im Betrieb | Erstgespräch bei dir im Betrieb, kostenlos und unverbindlich. |
| 661 | Hainburg | Ja, von Hainburg aus rund 30 Minuten. |
| 727 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 727 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 744 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 744 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 744 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-obertshausen.html`
Remote-Hinweis auf der Seite: ja (bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 114 | Hainburg | "text": "Ja, wir sitzen in Hainburg und sind in rund 15 Minuten bei dir. |
| 534 | vor Ort | ✓ Persönlich vor Ort |
| 568 | vor Ort | Der Markt vor Ort |
| 574 | vor Ort | Bei 6.310 Einpendlern und 8.900 Auspendlern (30.06.2025) hat Obertshausen den ausgeglichensten Pendlersaldo der Nachbarstädte, es wird also auffallend viel vor Ort gearbeitet. |
| 618 | Hainburg | Zwischen Hainburg und Obertshausen liegen gut fünf Kilometer Luftlinie. |
| 666 | Hainburg | Ja, wir sitzen in Hainburg und sind in rund 15 Minuten bei dir. |
| 716 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 716 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 733 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 733 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 733 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-offenbach.html`
Remote-Hinweis auf der Seite: ja (bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 8 | vor Ort | Persönlich vor Ort, in 2 Wochen online."> |
| 19 | vor Ort | Persönlich vor Ort, in 2 Wochen online."> |
| 31 | vor Ort | Persönlich vor Ort, in 2 Wochen online.", |
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 154 | vor Ort | Erstgespräch vor Ort, kostenlos und unverbindlich." |
| 154 | Hainburg | "text": "Ja, wir sitzen in Hainburg und sind in gut 20 Minuten bei dir. |
| 574 | vor Ort | ✓ Persönlich vor Ort |
| 677 | Hainburg | Wir sitzen in Hainburg, gut 20 Minuten von der Offenbacher Innenstadt. |
| 691 | vor Ort | Erstgespräch vor Ort, kostenlos und unverbindlich. |
| 691 | Hainburg | Ja, wir sitzen in Hainburg und sind in gut 20 Minuten bei dir. |
| 757 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 757 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 774 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 774 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 774 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 797 | Rhein-Main | Webdesign und Online-Marketing für Offenbach am Main und das Rhein-Main-Gebiet |

#### `public/webdesign-rodgau.html`
Remote-Hinweis auf der Seite: ja (DACH, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 130 | vor Ort | Erstgespräch vor Ort, kostenlos." |
| 130 | Hainburg | Von Hainburg aus sind wir schnell da, je nach Stadtteil in 15 bis 25 Minuten. |
| 550 | vor Ort | ✓ Persönlich vor Ort |
| 584 | aus der Region | Agentur aus der Region |
| 586 | Hainburg | Von Hainburg nach Weiskirchen sind es ein paar Minuten, nach Dudenhofen etwas mehr. |
| 603 | vor Ort | 10.973 Arbeitsplätze vor Ort Sozialversicherungspflichtig Beschäftigte am Arbeitsort, Stand 2024. |
| 682 | vor Ort | Erstgespräch vor Ort, kostenlos. |
| 682 | Hainburg | Von Hainburg aus sind wir schnell da, je nach Stadtteil in 15 bis 25 Minuten. |
| 732 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 732 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 749 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 749 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 749 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-seligenstadt.html`
Remote-Hinweis auf der Seite: ja (DACH, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 39 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 40 | 63512 | "postalCode": "63512", |
| 41 | Hainburg | "addressLocality": "Hainburg", |
| 107 | Hainburg | "name": "Ihr sitzt in Hainburg. |
| 110 | bei dir im Betrieb | Seligenstadt ist unsere Nachbarstadt, das Erstgespräch machen wir bei dir im Betrieb, kostenlos." |
| 535 | Hainburg | Zwischen unserem Büro in Hainburg und der Seligenstädter Altstadt liegen keine fünf Kilometer. |
| 538 | vor Ort | ✓ Persönlich vor Ort |
| 621 | Hainburg | Seligenstadt ist unsere direkte Nachbarstadt, 4,8 Kilometer Luftlinie von Hainburg. |
| 652 | vor Ort | 1 Gespräch, kostenlos Telefon oder Besuch vor Ort, wie es dir lieber ist. |
| 668 | bei dir im Betrieb | Seligenstadt ist unsere Nachbarstadt, das Erstgespräch machen wir bei dir im Betrieb, kostenlos. |
| 668 | Hainburg | Ihr sitzt in Hainburg. |
| 719 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 719 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 736 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 736 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 736 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webdesign-wuppertal.html`
Remote-Hinweis auf der Seite: ja (DACH, aus der Ferne, bundesweit)

| Zeile | Begriff | Satz |
|---|---|---|
| 38 | Josefstraße | "streetAddress": "Josefstraße 28", |
| 39 | 63512 | "postalCode": "63512", |
| 40 | Hainburg | "addressLocality": "Hainburg", |
| 87 | vor Ort | Wer regelmäßige Termine im Betrieb braucht, ist bei einer Agentur vor Ort besser aufgehoben." } |
| 579 | Hainburg | Wir sitzen in Hainburg bei Frankfurt, nicht im Bergischen. |
| 629 | vor Ort | Wer regelmäßige Termine im Betrieb braucht, ist bei einer Agentur vor Ort besser aufgehoben. |
| 677 | Hainburg | Unser Büro liegt in Hainburg im Kreis Offenbach. |
| 677 | Rhein-Main | Von dort betreuen wir Betriebe im Rhein-Main-Gebiet und bundesweit. |
| 694 | Josefstraße | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 694 | Hainburg | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |
| 694 | 63512 | Mehr Auftrag · Josefstraße 28 · 63512 Hainburg |

#### `public/webseite-fuer-bar.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 465 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · heute Abend geöffnet |

#### `public/webseite-fuer-cafe.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 465 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · jetzt geöffnet |

#### `public/webseite-fuer-foodtruck.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 465 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · heute im Einsatz |

#### `public/webseite-fuer-gastronomie.html`
Remote-Hinweis auf der Seite: ja (DACH)

| Zeile | Begriff | Satz |
|---|---|---|
| 414 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · jetzt geöffnet |
| 532 | in deiner Nähe | Sie muss genau dann erscheinen, wenn in deiner Nähe jemand nach Essen sucht. |

#### `public/webseite-fuer-gebaeudereinigung.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 525 | vor Ort | Das schafft lokales Vertrauen und stärkt dein Ranking vor Ort. |

#### `public/webseite-fuer-hausmeisterservice.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 463 | aus der Region | Für Blitz Industrie und Gebäudereinigung aus der Region ist genau so eine Seite entstanden. |

#### `public/webseite-fuer-kosmetikstudio.html`
Remote-Hinweis auf der Seite: ja (DACH)

| Zeile | Begriff | Satz |
|---|---|---|
| 440 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · jetzt geöffnet |
| 559 | in deiner Nähe | Sie muss genau dann auftauchen, wenn in deiner Nähe jemand nach deiner Behandlung sucht. |

#### `public/webseite-fuer-physiotherapie.html`
Remote-Hinweis auf der Seite: ja (remote, ortsunabhängig, DACH, per Telefon, per WhatsApp, aus der Ferne)

| Zeile | Begriff | Satz |
|---|---|---|
| 344 | Hainburg | ★★★★★ „Top Webdesign aus Hainburg. |

#### `public/webseite-fuer-pizzeria.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 465 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · Lieferung &amp; Abholung |

#### `public/webseite-fuer-restaurant.html`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 465 | in deiner Nähe | 📍 Ergebnisse in deiner Nähe · heute Abend geöffnet |
| 541 | in deiner Nähe | Sie muss auftauchen, wenn in deiner Nähe jemand ein Restaurant sucht. |

#### `public/webseite-fuer-schweisser.html`
Remote-Hinweis auf der Seite: ja (per WhatsApp)

| Zeile | Begriff | Satz |
|---|---|---|
| 485 | vor Ort | Direkt vor Ort oder per Einsendung. |
| 526 | vor Ort | Das schafft lokales Vertrauen und stärkt dein Ranking vor Ort. |
| 563 | vor Ort | WIG MAG E-Hand mobil vor Ort |

#### `scripts/nachbarstaedte.mjs`
Remote-Hinweis auf der Seite: NEIN

| Zeile | Begriff | Satz |
|---|---|---|
| 144 | Rhein-Main | // Inseln (Rhein-Main hier, NRW dort). |

---

## 1.4 Titles und Meta-Descriptions

Gemessen in Zeichen. Grenzwerte laut Vorgabe: Title 60, Description 155.
Ergebnis: **15 Titles zu lang**, **21 Descriptions zu lang**, keine fehlenden, keine doppelten.

Kein Title und keine Description fehlt, und es gibt keine Dublette. Das Problem ist ausschließlich die Länge, und zwar konzentriert: alle 11 Branchenseiten aus `public/` liegen über dem Title-Limit, teils um mehr als 30 Zeichen. Google schneidet diese Titles ab, und abgeschnitten wird das Ende, also genau dort, wo „Mehr Auftrag" steht.

### App-Routen

| URL | Title | Zeichen | Description | Zeichen | Befund |
|---|---|---:|---|---:|---|
| `/` | Mehr Auftrag – Die Digitalagentur die liefert | 45 | Mehr Aufträge, mehr Umsatz, mehr Wachstum. Mehr Auftrag ist die Digitalagentur für Handwerk, Gastronomie, Physiotherapie und alle Branchen die online wachsen wollen. | 165 | Description 10 zu lang |
| `/grafikdesign` | Grafikdesign & Textildruck Frankfurt \| Logo, Flyer & Firmenkleidung \| Mehr Auftrag | 82 | Grafikdesign, Textildruck und Werbetechnik aus Frankfurt und Rhein-Main mit eigenem Grafikteam. Visitenkarten, Flyer, Logo Design, Autoaufkleber, Fahrzeugbeschriftung sowie Firmenkleidung und Firmenshirts mit Logo, individuell gestaltet und auf Wunsch mit Druck. | 262 | Title 22 zu lang, Description 107 zu lang |
| `/google-ads` | Google Ads für lokale Unternehmen \| Mehr Auftrag | 48 | Mit Google Ads erscheinen Sie genau dann, wenn Kunden nach Ihrer Leistung suchen. Sichtbar ab dem ersten Tag, Budget voll steuerbar, Ergebnisse messbar. Für Handwerk, Gastronomie, Praxen, Dienstleister und Handel. | 213 | Description 58 zu lang |
| `/elektriker` | Websites für Elektriker in Frankfurt & Rhein-Main \| Mehr Auftrag | 64 | In 7 Tagen online. Mehr Anfragen. Fester Preis. Professionelle Websites speziell für Elektrikerbetriebe in Frankfurt und Rhein-Main – mit Click-to-Call, Google Maps und Bewertungen. | 181 | Title 4 zu lang, Description 26 zu lang |
| `/kostenlose-analyse` | Kostenlose Website-Analyse für Elektriker \| Mehr Auftrag | 56 | Kostenloser Potenzial-Check für Ihren Elektrobetrieb: Wir prüfen Ihre Sichtbarkeit bei Google, Performance und Mobile-Tauglichkeit – unverbindlich und in 30 Minuten. | 165 | Description 10 zu lang |
| `/karriere` | Karriere – Mehr Auftrag | 23 | Werde Teil des Teams von Mehr Auftrag. Wir suchen Webdesigner, Kundenbetreuer und Vertriebsberater für unser wachsendes Digitalagentur-Team. | 140 | ok |
| `/ratgeber` | Ratgeber – Online-Marketing, Webdesign & mehr Anfragen \| Mehr Auftrag | 69 | Der Mehr-Auftrag-Ratgeber: praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für Handwerk, Gastronomie und Dienstleister im Rhein-Main-Gebiet. Verständlich und ohne Fachchinesisch. | 194 | Title 9 zu lang, Description 39 zu lang |
| `/webdesign-standorte` | Webdesign in deiner Stadt | Alle Standorte | Mehr Auftrag | 57 | Übersicht aller Städte, in denen wir Websites für Handwerk, Gastronomie und lokale Dienstleister bauen. Von Hanau und Offenbach bis Frankfurt, Köln und Berlin. | 159 | Description 4 zu lang |

> `/impressum`, `/datenschutz`, `/agb` und die 17 `/analyse/`-Seiten stehen auf noindex und bleiben hier außen vor.

### Stadtseiten

| URL | Title | Zeichen | Description | Zeichen | Befund |
|---|---|---:|---|---:|---|
| `/webdesign-aschaffenburg` | Webdesign Aschaffenburg für Handwerk \| Mehr Auftrag | 51 | Webdesign für Aschaffenburg: Websites für Handwerk, Handel, Gastronomie und Dienstleister am Bayerischen Untermain. Lokale SEO, kostenloser Entwurf. | 148 | ok |
| `/webdesign-dietzenbach` | Webdesign Dietzenbach für Betriebe \| Mehr Auftrag | 49 | Webdesign für die Kreisstadt Dietzenbach: Websites für Handwerk, Handel, Logistik und Dienstleister mit lokaler SEO. Kostenloser Entwurf, in 2 Wochen online. | 157 | Description 2 zu lang |
| `/webdesign-dortmund` | Webdesign Dortmund: Anfragen statt Klicks \| Mehr Auftrag | 56 | Webdesign Dortmund für Handwerk, Gastronomie und Dienstleister. 4.453 Handwerksbetriebe, 12 Stadtbezirke als Suchräume. Kostenloser Entwurf. | 140 | ok |
| `/webdesign-duesseldorf` | Webdesign Düsseldorf abseits der Kö \| Mehr Auftrag | 50 | Webdesign Düsseldorf für Handwerk, Gastronomie und Dienstleister. 3.905 Handwerksunternehmen, Sichtbarkeit über die Stadtteile. Kostenloser Entwurf. | 148 | ok |
| `/webdesign-duisburg` | Webdesign Duisburg für Einzelunternehmer \| Mehr Auftrag | 55 | Webdesign Duisburg für Handwerk, Logistik und Gastronomie: 75 Prozent der Betriebe sind Einzelunternehmer, 46 Ortsteile als Suchräume. Kostenloser Entwurf. | 155 | ok |
| `/webdesign-frankfurt` | Webdesign Frankfurt für kleine Betriebe \| Mehr Auftrag | 54 | Webdesign Frankfurt für Handwerk, Gastronomie und Dienstleister ohne Konzernpreise. Lokale SEO für die Stadtteile, kostenloser Entwurf, online in 2 Wochen. | 155 | ok |
| `/webdesign-hanau` | Webdesign Hanau, das Aufträge bringt \| Mehr Auftrag | 51 | Webdesign-Agentur für Hanau: Websites für Handwerk, Gastronomie und Dienstleister, die bei Google gefunden werden. 15 Minuten von der Innenstadt entfernt. | 154 | ok |
| `/webdesign-koeln` | Webdesign Köln fürs eigene Veedel \| Mehr Auftrag | 48 | Webdesign Köln für Handwerk, Gastronomie und Dienstleister. 86 Stadtteile, 86 Suchräume. Lokale SEO, kostenloser Entwurf, in 2 Wochen online. | 141 | ok |
| `/webdesign-leipzig` | Webdesign Leipzig \| Website erstellen lassen \| Mehr Auftrag | 59 | Webdesign Leipzig für Handwerk, Gastronomie und Dienstleister. 5.219 Handwerksbetriebe, 63 Ortsteile als Suchräume. Kostenloser Entwurf, in 2 Wochen online. | 156 | Description 1 zu lang |
| `/webdesign-moenchengladbach` | Webdesign Mönchengladbach: Gladbach & Rheydt \| Mehr Auftrag | 59 | Webdesign Mönchengladbach für Handwerk, Gewerbe und Gastronomie: 3.603 Betriebe, 44 Stadtteile, zwei Zentren als getrennte Suchräume. Kostenloser Entwurf. | 154 | ok |
| `/webdesign-muehlheim` | Webdesign Mühlheim für den Mittelstand \| Mehr Auftrag | 53 | Webdesign für Mühlheim am Main, Dietesheim und Lämmerspiel: Websites für Handwerk, Kfz, Bau und Dienstleister mit lokaler SEO. Kostenloser Entwurf. | 147 | ok |
| `/webdesign-obertshausen` | Webdesign Obertshausen \| Website für Betriebe \| Mehr Auftrag | 60 | Webdesign für Obertshausen und Hausen: Websites für Handwerk, Industriezulieferer und lokale Dienstleister mit lokaler SEO. Kostenlos, in 2 Wochen online. | 154 | ok |
| `/webdesign-offenbach` | Webdesign Offenbach für mehr Anfragen \| Mehr Auftrag | 52 | Webdesign-Agentur für Offenbach am Main: Websites für Handwerk, Gastronomie und Dienstleister mit lokaler SEO. Persönlich vor Ort, in 2 Wochen online. | 150 | ok |
| `/webdesign-rodgau` | Webdesign Rodgau \| Website erstellen lassen \| Mehr Auftrag | 58 | Webdesign für Betriebe in Rodgau: Jügesheim, Nieder-Roden, Dudenhofen, Weiskirchen, Hainhausen. Lokale SEO für alle fünf Stadtteile. Kostenloser Entwurf. | 153 | ok |
| `/webdesign-seligenstadt` | Webdesign Seligenstadt von nebenan \| Mehr Auftrag | 49 | Webdesign aus der Nachbargemeinde: Websites für Betriebe in Seligenstadt, Froschhausen und Klein-Welzheim. Lokale SEO, kostenloser Entwurf, in 2 Wochen online. | 159 | Description 4 zu lang |
| `/webdesign-wuppertal` | Webdesign Wuppertal: Elberfeld & Barmen \| Mehr Auftrag | 54 | Webdesign Wuppertal für Handwerk und Gewerbe: 4.649 Handwerksbetriebe, 10 Stadtbezirke und 69 Quartiere mit eigenen Ortsnamen. Kostenloser Entwurf. | 147 | ok |

### Branchen- und Problemseiten

| URL | Title | Zeichen | Description | Zeichen | Befund |
|---|---|---:|---|---:|---|
| `/webseite-fuer-bar` | Website für Bar erstellen lassen \| Mehr Gäste & Reservierungen über Google \| Mehr Auftrag | 89 | Website für deine Bar, Cocktailbar oder Lounge erstellen lassen. Mit Getränkekarte, Event-Kalender, Reservierung für Gruppen und lokaler SEO, damit Gäste dich bei Google finden. Kostenloser Entwurf, in 2 Wochen online. | 218 | Title 29 zu lang, Description 63 zu lang |
| `/webseite-fuer-cafe` | Website für Café erstellen lassen \| Mehr Gäste über Google \| Mehr Auftrag | 73 | Website für dein Café oder Bistro erstellen lassen. Mit digitaler Frühstücks- und Kuchenkarte, Öffnungszeiten, Reservierung für Brunch und lokaler SEO, damit Gäste dich bei Google finden. Kostenloser Entwurf, in 2 Wochen online. | 228 | Title 13 zu lang, Description 73 zu lang |
| `/webseite-fuer-foodtruck` | Website für Foodtruck erstellen lassen \| Standort, Catering & Google \| Mehr Auftrag | 83 | Website für deinen Foodtruck oder dein Streetfood-Business erstellen lassen. Mit aktuellem Standort, Speisekarte, Catering- und Event-Anfrage und lokaler SEO, damit Gäste und Veranstalter dich bei Google finden. Kostenloser Entwurf, in 2 Wochen online. | 252 | Title 23 zu lang, Description 97 zu lang |
| `/webseite-fuer-gastronomie` | Website für Restaurant & Gastronomie erstellen lassen \| Mehr Gäste über Google \| Mehr Auftrag | 93 | Website für dein Restaurant, deine Pizzeria, dein Café oder deine Bar erstellen lassen. Mit digitaler Speisekarte, Online-Reservierung, Bestellung ohne Portal-Provision und lokaler SEO, damit Gäste dich bei Google Maps finden und direkt reservieren. Kostenloser Entwurf, in 2 Wochen online. | 290 | Title 33 zu lang, Description 135 zu lang |
| `/webseite-fuer-gebaeudereinigung` | Website für Gebäudereinigung \| Mehr Aufträge über Google \| Mehr Auftrag | 71 | Website für Reinigungsfirmen und Gebäudereiniger. Mit Leistungsseiten, Bewertungen und lokaler SEO für Büro-, Treppenhaus- und Sonderreinigung. Kostenloser Entwurf, in 2 Wochen online. | 184 | Title 11 zu lang, Description 29 zu lang |
| `/webseite-fuer-hausmeisterservice` | Website für Hausmeisterservice \| Aufträge von Hausverwaltungen \| Mehr Auftrag | 77 | Website für Hausmeisterservice und Objektbetreuung. Mit lokaler SEO, klaren Leistungsseiten und echten Bewertungen, damit Hausverwaltungen und Gewerbe dich finden. Kostenloser Entwurf, in 2 Wochen online. | 204 | Title 17 zu lang, Description 49 zu lang |
| `/webseite-fuer-kosmetikstudio` | Website für Kosmetikerin & Kosmetikstudio erstellen lassen \| Mehr Auftrag | 73 | Website für Kosmetikerinnen und Kosmetikstudios erstellen lassen. Mit Online-Terminbuchung rund um die Uhr, Behandlungen und Preisen, Vorher-Nachher-Galerie und lokaler SEO, damit Kundinnen dich bei Google finden und direkt buchen. Kostenloser Entwurf, in 2 Wochen online. | 272 | Title 13 zu lang, Description 117 zu lang |
| `/webseite-fuer-physiotherapie` | Website für Physiotherapiepraxis \| Mehr Auftrag | 47 | Website für Physiotherapiepraxen: Online-Terminanfrage, Kassenzulassung sichtbar, Leistungen klar erklärt, schnell und mobiloptimiert. Zum Festpreis, DACH-weit. | 160 | Description 5 zu lang |
| `/webseite-fuer-pizzeria` | Website für Pizzeria erstellen lassen \| Online bestellen ohne Portal-Provision \| Mehr Auftrag | 93 | Website für deine Pizzeria erstellen lassen. Mit eigener Online-Bestellung ohne Portal-Provision, digitaler Pizzakarte, Lieferung und Abholung und lokaler SEO, damit Gäste dich bei Google finden. Kostenloser Entwurf, in 2 Wochen online. | 236 | Title 33 zu lang, Description 81 zu lang |
| `/webseite-fuer-restaurant` | Website für Restaurant erstellen lassen \| Mehr Gäste & Reservierungen über Google \| Mehr Auftrag | 96 | Website für dein Restaurant erstellen lassen. Mit Online-Reservierung, digitaler Speisekarte und lokaler SEO, damit Gäste dich bei Google finden und den Tisch direkt buchen. Kostenloser Entwurf, in 2 Wochen online. | 214 | Title 36 zu lang, Description 59 zu lang |
| `/webseite-fuer-schweisser` | Website für Schweißer & Metallbau \| Mehr Aufträge über Google \| Mehr Auftrag | 76 | Website für Schweißbetriebe, Metallbauer und mobile Schweißer. Mit Galerie deiner Schweißnähte, Verfahren, Zertifikaten und lokaler SEO. Kostenloser Entwurf, in 2 Wochen online. | 177 | Title 16 zu lang, Description 22 zu lang |
| `/website-bringt-keine-anfragen` | Website bringt keine Anfragen? Das hilft \| Mehr Auftrag | 55 | Website online, aber kaum Anfragen? Kostenlose Analyse zeigt woran es liegt: Ladezeit, Mobilansicht, Nutzen, fehlende SEO. Sofortmaßnahmen statt Neubau. | 152 | ok |
| `/website-relaunch` | Website relaunchen lassen \| Mehr Auftrag | 40 | Alte Website runderneuern, ohne Google-Rankings zu verlieren: neues Design, schnelle Ladezeit, mobiloptimiert. Ablauf, Dauer und Kosten eines Relaunchs. | 152 | ok |

### Ratgeber

| URL | Title | Zeichen | Description | Zeichen | Befund |
|---|---|---:|---|---:|---|
| `/ratgeber/online-marketing-restaurant` | Online-Marketing für Restaurants: mehr Gäste \| Ratgeber | 55 | Wie Restaurants, Pizzerien und Cafés online mehr Gäste gewinnen: Website, Google-Profil, Bewertungen und Reservierungen richtig aufsetzen. | 138 | ok |
| `/ratgeber/kunden-gewinnen-handwerk` | Kunden gewinnen als Handwerker: der Praxis-Leitfaden \| Ratgeber | 63 | Wie Handwerksbetriebe online neue Kunden gewinnen: Website, lokale Google-Sichtbarkeit, Bewertungen und die richtige Anfrage-Strecke. | 133 | Title 3 zu lang |
| `/ratgeber/auftraege-gebaeudereinigung` | Mehr Aufträge für die Gebäudereinigung online \| Ratgeber | 56 | Wie Gebäudereiniger online planbar neue Auftraggeber gewinnen: lokale Sichtbarkeit, überzeugende Website, Bewertungen und der Weg zu Gewerbekunden mit Rahmenverträgen. | 167 | Description 12 zu lang |
| `/ratgeber/kundinnen-gewinnen-kosmetikstudio` | Kundinnen gewinnen als Kosmetikstudio \| Ratgeber | 48 | Wie Kosmetikstudios, Nagelstudios und Kosmetikerinnen online mehr Kundinnen gewinnen: Google-Profil, eigene Website mit Terminbuchung, Instagram und Bewertungen richtig kombinieren. | 181 | Description 26 zu lang |
| `/ratgeber/auftraege-hausmeisterservice` | Aufträge für den Hausmeisterservice gewinnen \| Ratgeber | 55 | Wie Hausmeisterservices an Daueraufträge von Hausverwaltungen, WEG und Gewerbeobjekten kommen: das Leistungsspektrum richtig zeigen, Zuverlässigkeit belegen und saisonale Chancen nutzen. | 186 | Description 31 zu lang |
| `/ratgeber/auftraege-schweisser-metallbau` | Aufträge gewinnen als Schweißer & Metallbauer \| Ratgeber | 56 | Wie Schweißfachbetriebe und Metallbauer online Aufträge gewinnen: zwei Zielgruppen richtig ansprechen, Verfahren und Qualifikationen zeigen, mit Projektfotos überzeugen. | 169 | Description 14 zu lang |
| `/ratgeber/ki-suche-google-2026` | KI-Suche & Google 2026: so wirst du gefunden \| Ratgeber | 55 | Wie kleine Betriebe 2026 über Google UND KI wie ChatGPT und Perplexity gefunden werden: Was sich in der Suche ändert und was du konkret tun musst. | 146 | ok |
| `/ratgeber/seo-oder-google-ads` | SEO oder Google Ads: was lohnt sich? Vergleich \| Ratgeber | 57 | SEO oder Google Ads für kleine Unternehmen? Der ehrliche Vergleich: Kosten, Geschwindigkeit, Nachhaltigkeit und wann sich welcher Weg lohnt. | 140 | ok |
| `/ratgeber/website-selbst-oder-agentur` | Website selbst bauen oder Agentur? Entscheidungshilfe \| Ratgeber | 64 | Baukasten selbst nutzen oder Agentur beauftragen? Der ehrliche Vergleich für kleine Betriebe: Kosten, Zeit, Ergebnis und wann sich was lohnt. | 141 | Title 4 zu lang |
| `/ratgeber/professionelle-website-vorteile` | Was bringt eine professionelle Website wirklich? \| Ratgeber | 59 | Lohnt sich eine professionelle Website für kleine Betriebe? Was sie bringt: mehr Anfragen, Vertrauen, Sichtbarkeit bei Google und KI. | 133 | ok |
| `/ratgeber/lokale-seo-google-maps` | Lokale SEO: bei Google & auf der Karte nach oben \| Ratgeber | 59 | Lokale SEO für kleine Betriebe: Wie du in der Nähe-Suche und auf Google Maps ganz oben erscheinst – Google-Profil, NAP-Daten, Bewertungen und lokale Inhalte erklärt. | 165 | Description 10 zu lang |
| `/ratgeber/google-bewertungen-mehr-kunden` | Google-Bewertungen: mehr Kunden gewinnen \| Ratgeber | 51 | Warum Google-Bewertungen über neue Kunden und deine Platzierung entscheiden – und wie du als kleiner Betrieb systematisch mehr echte Bewertungen bekommst. | 154 | ok |
| `/ratgeber/corporate-design-werbemittel` | Corporate Design & Werbemittel für kleine Betriebe \| Ratgeber | 61 | Warum Logo, Visitenkarten, Fahrzeugbeschriftung und Firmenkleidung zusammengehören: wie kleine Betriebe mit einem einheitlichen Auftritt größer und verlässlicher wirken. | 169 | Title 1 zu lang, Description 14 zu lang |
| `/ratgeber/werbeagentur-rhein-main-finden` | Werbeagentur im Rhein-Main-Gebiet finden: Checkliste \| Ratgeber | 63 | Die richtige Werbeagentur im Rhein-Main-Gebiet finden: worauf kleine Betriebe achten sollten und woran du eine gute von einer schlechten erkennst. | 146 | Title 3 zu lang |
| `/ratgeber/webdesign-frankfurt` | Website Frankfurt & Rhein-Main: worauf Betriebe achten \| Ratgeber | 65 | Worauf Betriebe in Frankfurt und im Rhein-Main-Gebiet bei ihrer Website achten sollten: lokale Auffindbarkeit, Ladezeit, Bilder und Google-Profil, verständlich erklärt. | 168 | Title 5 zu lang, Description 13 zu lang |
| `/ratgeber/webdesign-dach-region` | Webdesign für die DACH-Region (DE · AT · CH) \| Ratgeber | 55 | Wie Betriebe mit einer Website Kunden in ganz Deutschland, Österreich und der Schweiz gewinnen: länderübergreifend gefunden werden, aus einer Hand betreut. | 155 | ok |

### Was in 1.4 sonst auffällt

**Die Startseite ist der schwächste Title der ganzen Domain.** „Mehr Auftrag – Die Digitalagentur die liefert" enthält keinen einzigen Begriff, den ein Betrieb eintippt. Wer die Marke nicht kennt, findet die Seite darüber nie. Zusammen mit der fehlenden H1 (siehe 1.6) ist die Startseite damit für generische Suchanfragen praktisch unsichtbar.

**Fehlerhafte Angabe:** Die Description von `/webdesign-standorte` verspricht „bis Frankfurt, Köln und Berlin". Eine Berliner Stadtseite existiert im Live-Bestand nicht, sie liegt in `_stadtseiten-warteschlange/`. Wer über Berlin klickt, findet dort nichts. Das gehört korrigiert, unabhängig von Phase 3.

**Alle 16 Stadtseiten liegen sauber im Rahmen.** Titles zwischen 48 und 60 Zeichen, Descriptions zwischen 140 und 159. Nur `/webdesign-seligenstadt` (159) und `/webdesign-dietzenbach` (157) sind minimal über dem Ziel. Die Stadtseiten brauchen in Phase 3 keine Längenkorrektur, sondern höchstens eine Anpassung an die tatsächlich gesuchte Formulierung.

**Gedankenstriche im Bestand.** Vier Titles und mehrere Descriptions tragen einen Gedankenstrich, zum Beispiel „Mehr Auftrag – Die Digitalagentur die liefert" oder „Karriere – Mehr Auftrag". Auch im Fließtext der Startseite und in `/elektriker` stehen welche. Das widerspricht der Hausregel. In diesem Audit sind sie bewusst wortgetreu zitiert, damit die Fundstellen stimmen. Beim Überarbeiten in Phase 3 und 5 fallen sie weg.

**Die Ratgeber-Titles enden alle auf „| Ratgeber" statt auf „| Mehr Auftrag".** Das ist konsistent und nicht falsch, kostet aber bei jedem Suchergebnis eine Markennennung. In Phase 3 zu entscheiden.

---

## 1.5 Strukturierte Daten

### Was wo ausgezeichnet ist

| Seitengruppe | JSON-LD-Typen | Quelle |
|---|---|---|
| alle Seiten (aus dem Layout) | `Organization` + `ProfessionalService` (ein Knoten, zwei Typen), `WebSite`, 6 × `Service` | `app/_components/structured-data.tsx` |
| `/` zusätzlich | `FAQPage` | `HomeFaqSchema` in derselben Datei |
| `/grafikdesign` | `Service`, `FAQPage`, `BreadcrumbList` | `app/grafikdesign/page.tsx` |
| `/elektriker` | `FAQPage` | `app/elektriker/page.tsx` |
| `/kostenlose-analyse` | `FAQPage` | `app/kostenlose-analyse/page.tsx` |
| `/ratgeber` | `CollectionPage`, `ItemList`, `BreadcrumbList` | `app/ratgeber/page.tsx` |
| `/ratgeber/<slug>` (16) | `Article`, `FAQPage`, `BreadcrumbList` | `app/ratgeber/[slug]/page.tsx` |
| 16 Stadtseiten | `ProfessionalService` mit `PostalAddress`, `City`, mehrere `Place`, `Organization` (parent), 3 × `Offer`/`Service`, `FAQPage`, `BreadcrumbList` | jeweils inline im HTML |
| 11 Branchenseiten | `Service`, `Organization`, `Country`, `BusinessAudience`, `FAQPage` | jeweils inline im HTML |
| `/webseite-fuer-kosmetikstudio`, `/webseite-fuer-physiotherapie`, `/website-relaunch`, `/website-bringt-keine-anfragen` | zusätzlich `BreadcrumbList` | inline |
| `/webdesign-standorte`, `/google-ads`, `/karriere` | nur das globale Schema | keine eigene Auszeichnung |

### Stimmen die Angaben mit dem Inhalt überein?

Weitgehend ja. Drei Abweichungen:

**1. Die Bewertungsauszeichnung ist sauber.** `aggregateRating` wurde am 24.08.2026 entfernt, echte Bewertungen stehen jetzt sichtbar im Content. Das ist korrekt gelöst und braucht keine Änderung.

**2. `foundingDate: "2025-05"` beschreibt die Firmengründung, nicht die Domain.** Sachlich richtig, aber im Zusammenspiel mit einer Domain, die erst seit rund April 2026 läuft, sendet es ein Alter, das die Domain selbst nicht hat. Kein Fehler, nur ein Punkt, den man bei jeder Bewertung der Rankings mitdenken muss.

**3. Die FAQ-Antwort „Wo ist Mehr Auftrag ansässig?" nennt Hainburg im Fließtext des Schemas.** Sie steht so auch sichtbar auf der Startseite und ist damit heute konsistent. Nach dem Umzug ist sie falsch und muss in Phase 5 zusammen mit dem sichtbaren Text geändert werden.

### Wo LocalBusiness oder eine Postadresse steht

Das ist der kritischste Befund des ganzen Audits.

| Ort | Was dort steht |
|---|---|
| `app/_components/structured-data.tsx`, Zeilen 41 bis 47 | `PostalAddress` Josefstraße 28, 63512 Hainburg, im Knoten `#organization`, der zugleich `ProfessionalService` ist. Gilt über das Layout für **jede** Seite. |
| 16 × `public/webdesign-*.html` | je ein eigenständiger `ProfessionalService` mit `name: "Mehr Auftrag Webdesign <Stadt>"`, eigener `url`, eigener `telephone`, eigener `image`, `priceRange` und **derselben** `PostalAddress` Josefstraße 28, 63512 Hainburg |

Damit behauptet die Domain heute 17 lokale Geschäftsbetriebe, die alle unter einer einzigen hessischen Adresse sitzen, von denen aber 16 nach einer anderen Stadt benannt sind. Das ist schon jetzt angreifbar, weil `LocalBusiness` und seine Unterklassen einen Standort meinen, an dem Kunden erscheinen können. Nach dem Umzug ins Ausland ist die Angabe schlicht falsch.

**Empfehlung für Phase 5.4, hier nur zur Vorbereitung notiert:**

• Der Knoten in `structured-data.tsx` wird reine `Organization`. Der Typ `ProfessionalService` und das Feld `address` entfallen, bis die neue Anschrift feststeht.
• `areaServed` bleibt, wird aber auf Deutschland als Hauptmarkt zugeschnitten, wie in Phase 5.4 vorgegeben.
• `openingHoursSpecification` und `priceRange` gehören zu einem Ladengeschäft und entfallen mit. `contactPoint` mit Telefon, E-Mail und Sprache bleibt und trägt die Erreichbarkeit.
• Auf jeder Stadtseite wird aus `ProfessionalService` ein `Service` mit `provider` als Verweis auf `#organization` und `areaServed` auf die jeweilige Stadt. Der Stadtname bleibt damit erhalten, ohne einen Betriebssitz zu behaupten.
• `sameAs` mit dem `g.page`-Link bleibt, solange das Google-Unternehmensprofil besteht. Ob das Profil den Umzug überlebt, ist eine Entscheidung außerhalb dieses Audits und gehört auf die Liste der offenen Fragen.

### Was fehlt

| Fehlend | Betrifft | Wirkung |
|---|---|---|
| `Person`-Schema für Patrick Sauna | ganze Domain | Erfahrungssignal, das Google für E-E-A-T ausdrücklich sucht |
| `author` als Person statt als Organisation | 16 Ratgeberartikel | derselbe Punkt, an der Stelle wo er am meisten zählt |
| sichtbare Autorenangabe und sichtbares Datum | 16 Ratgeberartikel | im Schema stehen `datePublished` und `dateModified`, auf der Seite steht nur Kategorie und Lesezeit |
| `BreadcrumbList` | `/grafikdesign` hat sie, `/elektriker`, `/google-ads`, `/kostenlose-analyse`, `/webdesign-standorte` und 7 der Branchenseiten nicht | Breadcrumb-Darstellung im Suchergebnis |
| eigenes Schema | `/webdesign-standorte`, `/google-ads` | beide tragen nur das globale Schema |

---

## 1.6 Interne Verlinkung

Ausgewertet wurden alle `<a href>` in `public/*.html` sowie alle `href`-Angaben in `app/**/*.tsx` und `app/**/*.ts`, inklusive der dynamisch erzeugten Links (Ratgeber-Hub, Related-Blöcke). Der eine Link auf `/webdesign-standorte`, der über `StandorteLeiste` auf jeder Seite steht, ist mitgezählt.

### Eingehende interne Links je Seite

| Eingehend | URL | Quellen |
|---:|---|---|
| 1 | `/ratgeber/online-marketing-restaurant` | `/ratgeber (Hub)` |
| 2 | `/karriere` | `/`, `app/_components/karriere-shell.tsx` |
| 2 | `/ratgeber/auftraege-gebaeudereinigung` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/auftraege-hausmeisterservice` | `/ratgeber (Hub)`, `/webseite-fuer-hausmeisterservice` |
| 2 | `/ratgeber/auftraege-schweisser-metallbau` | `/ratgeber (Hub)`, `/webseite-fuer-schweisser` |
| 2 | `/ratgeber/corporate-design-werbemittel` | `/grafikdesign`, `/ratgeber (Hub)` |
| 2 | `/ratgeber/google-bewertungen-mehr-kunden` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/ki-suche-google-2026` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/kunden-gewinnen-handwerk` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/kundinnen-gewinnen-kosmetikstudio` | `/ratgeber (Hub)`, `/webseite-fuer-kosmetikstudio` |
| 2 | `/ratgeber/lokale-seo-google-maps` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/professionelle-website-vorteile` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/seo-oder-google-ads` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/webdesign-dach-region` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/webdesign-frankfurt` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/website-selbst-oder-agentur` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 2 | `/ratgeber/werbeagentur-rhein-main-finden` | `/ratgeber (Hub)`, `Ratgeber-Fließtext` |
| 3 | `/google-ads` | `/`, `/grafikdesign`, `Ratgeber-Fließtext` |
| 3 | `/kostenlose-analyse` | `/grafikdesign`, `/webdesign-standorte`, `Ratgeber-Fließtext` |
| 3 | `/webseite-fuer-physiotherapie` | `/`, `/website-bringt-keine-anfragen`, `/website-relaunch` |
| 3 | `/website-bringt-keine-anfragen` | `/`, `/webseite-fuer-physiotherapie`, `/website-relaunch` |
| 3 | `/website-relaunch` | `/`, `/webseite-fuer-physiotherapie`, `/website-bringt-keine-anfragen` |
| 4 | `/webdesign-aschaffenburg` | `/webdesign-leipzig`, `/webdesign-obertshausen`, `/webdesign-rodgau`, `/webdesign-seligenstadt` |
| 4 | `/webdesign-dietzenbach` | `/webdesign-aschaffenburg`, `/webdesign-frankfurt`, `/webdesign-offenbach`, `/webdesign-rodgau` |
| 4 | `/webdesign-leipzig` | `/webdesign-aschaffenburg`, `/webdesign-muehlheim`, `/webdesign-obertshausen`, `/webdesign-seligenstadt` |
| 5 | `/grafikdesign` | `/`, `/webdesign-dietzenbach`, `/webdesign-offenbach`, `/webseite-fuer-kosmetikstudio`, `Ratgeber-Fließtext` |
| 5 | `/ratgeber` | `/`, `/webseite-fuer-physiotherapie`, `/website-bringt-keine-anfragen`, `/website-relaunch`, `app/analyse/[slug]/page.tsx` |
| 5 | `/webdesign-dortmund` | `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-koeln`, `/webdesign-moenchengladbach`, `/webdesign-wuppertal` |
| 5 | `/webdesign-duesseldorf` | `/webdesign-dortmund`, `/webdesign-duisburg`, `/webdesign-koeln`, `/webdesign-moenchengladbach`, `/webdesign-wuppertal` |
| 5 | `/webdesign-duisburg` | `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-koeln`, `/webdesign-moenchengladbach`, `/webdesign-wuppertal` |
| 5 | `/webdesign-moenchengladbach` | `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-koeln`, `/webdesign-wuppertal` |
| 5 | `/webdesign-seligenstadt` | `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-hanau`, `/webdesign-leipzig`, `/webdesign-rodgau` |
| 5 | `/webdesign-wuppertal` | `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-koeln`, `/webdesign-moenchengladbach` |
| 5 | `/webseite-fuer-bar` | `/webseite-fuer-cafe`, `/webseite-fuer-foodtruck`, `/webseite-fuer-gastronomie`, `/webseite-fuer-pizzeria`, `/webseite-fuer-restaurant` |
| 5 | `/webseite-fuer-foodtruck` | `/webseite-fuer-bar`, `/webseite-fuer-cafe`, `/webseite-fuer-gastronomie`, `/webseite-fuer-pizzeria`, `/webseite-fuer-restaurant` |
| 6 | `/webdesign-frankfurt` | `/webdesign-dietzenbach`, `/webdesign-hanau`, `/webdesign-koeln`, `/webdesign-muehlheim`, `/webdesign-offenbach`, `Ratgeber-Fließtext` |
| 6 | `/webdesign-koeln` | `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-frankfurt`, `/webdesign-moenchengladbach`, `/webdesign-wuppertal` |
| 6 | `/webdesign-offenbach` | `/webdesign-dietzenbach`, `/webdesign-frankfurt`, `/webdesign-hanau`, `/webdesign-muehlheim`, `/webdesign-obertshausen`, `/webdesign-rodgau` |
| 6 | `/webseite-fuer-cafe` | `/webseite-fuer-bar`, `/webseite-fuer-foodtruck`, `/webseite-fuer-gastronomie`, `/webseite-fuer-pizzeria`, `/webseite-fuer-restaurant`, `Ratgeber-Fließtext` |
| 7 | `/webdesign-hanau` | `/webdesign-aschaffenburg`, `/webdesign-frankfurt`, `/webdesign-leipzig`, `/webdesign-muehlheim`, `/webdesign-obertshausen`, `/webdesign-offenbach`, `/webdesign-seligenstadt` |
| 7 | `/webdesign-rodgau` | `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-hanau`, `/webdesign-muehlheim`, `/webdesign-obertshausen`, `/webdesign-offenbach`, `/webdesign-seligenstadt` |
| 7 | `/webseite-fuer-pizzeria` | `/webdesign-rodgau`, `/webseite-fuer-bar`, `/webseite-fuer-cafe`, `/webseite-fuer-foodtruck`, `/webseite-fuer-gastronomie`, `/webseite-fuer-restaurant`, `Ratgeber-Fließtext` |
| 8 | `/webdesign-muehlheim` | `/webdesign-dietzenbach`, `/webdesign-frankfurt`, `/webdesign-hanau`, `/webdesign-leipzig`, `/webdesign-obertshausen`, `/webdesign-offenbach`, `/webdesign-rodgau`, `/webdesign-seligenstadt` |
| 9 | `/webdesign-obertshausen` | `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-frankfurt`, `/webdesign-hanau`, `/webdesign-leipzig`, `/webdesign-muehlheim` und 3 weitere |
| 11 | `/webseite-fuer-restaurant` | `/webdesign-aschaffenburg`, `/webdesign-duesseldorf`, `/webdesign-koeln`, `/webdesign-leipzig`, `/webdesign-seligenstadt`, `/webseite-fuer-bar` und 5 weitere |
| 17 | `/elektriker` | `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-frankfurt` und 11 weitere |
| 17 | `/webdesign-standorte` | `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-frankfurt` und 11 weitere |
| 17 | `/webseite-fuer-gastronomie` | `/`, `/webdesign-dietzenbach`, `/webdesign-dortmund`, `/webdesign-duisburg`, `/webdesign-frankfurt`, `/webdesign-hanau` und 11 weitere |
| 18 | `/webseite-fuer-kosmetikstudio` | `/`, `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg` und 12 weitere |
| 24 | `/` | `/elektriker`, `/google-ads`, `/grafikdesign`, `/kostenlose-analyse`, `/ratgeber`, `/webdesign-aschaffenburg` und 18 weitere |
| 24 | `/webseite-fuer-schweisser` | `/`, `/webdesign-aschaffenburg`, `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg`, `/webdesign-frankfurt` und 18 weitere |
| 25 | `/webseite-fuer-hausmeisterservice` | `/`, `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg` und 19 weitere |
| 27 | `/webseite-fuer-gebaeudereinigung` | `/`, `/webdesign-aschaffenburg`, `/webdesign-dietzenbach`, `/webdesign-dortmund`, `/webdesign-duesseldorf`, `/webdesign-duisburg` und 21 weitere |

### Verwaiste und faktisch verwaiste Seiten

Streng verwaist, also ganz ohne internen Link, ist keine indexierbare Seite. Faktisch verwaist sind aber diese:

| Seite | Situation |
|---|---|
| `/ratgeber/online-marketing-restaurant` | genau **ein** eingehender Link, nämlich der Hub. Kein einziger thematisch passender Kontextlink, obwohl es fünf Gastronomieseiten gibt. |
| 12 weitere Ratgeberartikel | je zwei eingehende Links: der Hub und ein Link aus einem anderen Ratgeberartikel. Von einer Geldseite verlinkt werden nur drei Artikel. |
| `/google-ads` | drei eingehende Links, alle aus der Navigation oder aus Nebentexten. Keine einzige Stadtseite und keine Branchenseite verlinkt darauf, obwohl Google Ads dort das naheliegende Zusatzangebot wäre. |
| `/karriere` | zwei Links, davon einer aus dem eigenen Shell. Steht in der Sitemap und ist indexierbar. |
| `/kostenlose-analyse` | drei eingehende Links. Für einen Lead-Magneten sehr wenig. |
| `/webseite-fuer-physiotherapie`, `/website-relaunch`, `/website-bringt-keine-anfragen` | je drei Links, und die verweisen fast nur aufeinander. Diese drei neuen Seiten bilden eine geschlossene Insel. |

Die CLAUDE.md-Regel „niemals eine neue Seitengruppe nur über eine einzige Hub-Seite anbinden" ist beim Ratgeber genau so verletzt worden, wie sie es für Stadtseiten verbietet.

### Nichtssagende Ankertexte

| Ankertext | Anzahl | Wo |
|---|---|---|
| „Mehr dazu" | 95 | in den Branchen-Kacheln aller 16 Stadtseiten, jeweils sechs pro Seite, verlinkt auf die passende Branchenseite |
| „Mehr Auftrag" | 42 | Logo-Link im Kopf, funktional in Ordnung |

Die 95 „Mehr dazu"-Links sind der größte einzelne Hebel der internen Verlinkung. Sie zeigen von den Stadtseiten auf genau die Branchenseiten, die ranken sollen, und verschenken dabei jeden Ankertext. Aus „Mehr dazu" wird zum Beispiel „Website für Gebäudereinigung", und die Zielseite bekommt 16 thematisch eindeutige Signale statt 16 leerer.

Wichtig dabei: der Ankertext muss je Stadt variieren, sonst entsteht ein exakt identischer Textbaustein auf allen 16 Seiten und `pruefe-stadtseiten.py` schlägt zu Recht an.

### Geldseiten mit zu wenig internen Links

| Geldseite | eingehend | Bewertung |
|---|---|---|
| `/webseite-fuer-bar` | 5 | nur aus dem eigenen Gastro-Cluster, keine Stadtseite verlinkt darauf |
| `/webseite-fuer-foodtruck` | 5 | dasselbe |
| `/webseite-fuer-cafe` | 6 | dasselbe |
| `/webseite-fuer-pizzeria` | 7 | eine Stadtseite verlinkt darauf |
| `/webseite-fuer-physiotherapie` | 3 | neu, noch nirgends eingebunden |
| `/website-relaunch` | 3 | neu, noch nirgends eingebunden |
| `/website-bringt-keine-anfragen` | 3 | neu, noch nirgends eingebunden |
| `/google-ads` | 3 | Leistungsseite ohne Rückenwind |
| `/grafikdesign` | 5 | nur zwei Stadtseiten verlinken darauf |
| `/elektriker` | 17 | gut versorgt |
| `/webseite-fuer-gebaeudereinigung` | 27 | am besten versorgt |

Die Verteilung zeigt das Muster: die sechs Branchen, die in den Stadtseiten-Kacheln vorkommen (Handwerk, Gastronomie, Reinigung, Metallbau, Hausmeisterservice, Kosmetik), bekommen je 17 bis 27 Links. Alles andere hängt in der Luft.

### Weitere Befunde zur Verlinkung

**Die Startseite hat keine H1 im ausgelieferten HTML.** `app/page.tsx` ist eine Client-Komponente, die H1 rendert `{text || " "}`, und `text` startet mit `useState("")`. Im serverseitig gerenderten HTML steht damit ein Leerzeichen in der H1. Erst im Browser tippt sich „MEHR AUFTRÄGE." zeichenweise hinein, und auch dann steht dort kein Wort, das jemand sucht. Das ist der wirkungsvollste Einzelfund dieses Audits, weil die Startseite alle internen Links der Domain bündelt und diese Kraft an keinem Suchbegriff festmacht.

**`/webdesign-standorte` trägt rund 200 Wörter eigenen Text** und besteht ansonsten aus der automatisch erzeugten Städteliste. Für eine Seite, auf die 17 interne Links zeigen, ist das zu dünn. Sie steht in Phase 7.4 ohnehin auf der Liste.

**Die Nachbarstadt-Verlinkung funktioniert.** Jede Stadtseite hat vier bis neun eingehende Links aus anderen Stadtseiten, erzeugt von `scripts/nachbarstaedte.mjs`. Zwei Cluster sind sauber getrennt: Rhein-Main und Nordrhein-Westfalen. Leipzig hängt am Rhein-Main-Cluster, was geografisch nicht passt, aber ohne sächsische Nachbarseite auch nicht besser lösbar ist.

---

## 1.7 Die zehn wirkungsvollsten Maßnahmen

Sortiert nach Wirkung geteilt durch Aufwand. Die Phase in Klammern verweist auf den vereinbarten Ablauf.

| # | Maßnahme | Wirkung | Aufwand | Phase |
|---|---|---|---|---|
| 1 | **Startseite bekommt eine echte H1 im HTML.** Der Typewriter-Effekt bleibt sichtbar, die H1 trägt zusätzlich einen Text, der beim ersten Render dasteht und einen Suchbegriff enthält. Dazu ein Title, der nicht nur die Marke nennt. | sehr hoch | sehr gering | 3 |
| 2 | **95 „Mehr dazu"-Anker durch beschreibende Ankertexte ersetzen**, je Stadt unterschiedlich formuliert. Trifft genau die Geldseiten. | hoch | gering | 7 |
| 3 | **15 überlange Titles kürzen**, gesuchte Formulierung nach vorne, „Mehr Auftrag" ans Ende. Betrifft fast ausschließlich die Branchenseiten, die schon Impressionen sammeln. | hoch | gering | 3 |
| 4 | **Fünf Kannibalisierungspaare Branchenseite gegen Ratgeber auflösen.** Ein klares Signal statt zweier halber. | hoch | mittel | 4 |
| 5 | **16 × `ProfessionalService` mit Hainburger Adresse auf `Service` umstellen**, Postadresse aus dem globalen Schema entfernen. Beseitigt einen Widerspruch, der nach dem Umzug zur Falschangabe wird. | hoch | mittel | 5 |
| 6 | **Ratgeberartikel aus den Geldseiten heraus verlinken**, nicht nur aus dem Hub. Jeder Artikel braucht mindestens einen Kontextlink aus dem Fließtext einer thematisch passenden Seite. | mittel bis hoch | gering | 7 |
| 7 | **Fünf Fallstudienseiten unter `/referenzen/`** aus den bestehenden Referenzen. Der einzige Baustein, der echte Erfahrung belegt und den kein Wettbewerber kopieren kann. | hoch | hoch | 6 |
| 8 | **Autorenangabe, Datum und `Person`-Schema auf den 16 Ratgeberartikeln.** Kleiner Eingriff, direkt auf das Autoritätsproblem gerichtet. | mittel | gering | 6 |
| 9 | **Nähe-Argumente auf neun Stadtseiten durch Marktkenntnis ersetzen.** Nötig für die Umstellung, und die überarbeiteten Abschnitte sind inhaltlich stärker als die alten. | mittel | hoch | 5 |
| 10 | **`/webdesign-standorte` von 200 auf mindestens 500 Wörter ausbauen** und die falsche Berlin-Nennung in der Description korrigieren. | mittel | gering | 7 |

**Knapp außerhalb der zehn, aber vorgemerkt:** eine eigene `/ueber-uns`-Seite (Phase 6.4), 21 zu lange Descriptions (Phase 3), `BreadcrumbList` auf den Seiten, die noch keine hat (Phase 6.5), und die drei neuen Seiten `/website-relaunch`, `/website-bringt-keine-anfragen`, `/webseite-fuer-physiotherapie` aus ihrer Insel herausholen (Phase 7.1).

---

## Was in Phase 1 bewusst nicht bewertet wurde

• **Rankings und Impressionen.** Die beiden Search-Console-Exporte liegen noch nicht vor, siehe offene Fragen. Alles oben ist eine reine Bestandsaufnahme am Quelltext.
• **Ladezeit und Core Web Vitals.** Nicht Teil des Auftrags. Auffällig ist nur, dass `app/page.tsx` mit rund 2.100 Zeilen komplett als Client-Komponente läuft und Framer Motion auf der Startseite ausliefert.
• **Backlinks.** Von außen nicht messbar ohne Zugang zu einem Backlink-Werkzeug.
• **Die vier Seiten in `_stadtseiten-warteschlange/`** (Berlin, Hamburg, München, Stuttgart). Der Stadtseiten-Ausbau ist laut Vorgabe gestoppt, sie wurden nur für die Zählung in `pruefe-stadtseiten.py` betrachtet.

## Referenzwerte für später

`python3 pruefe-stadtseiten.py` läuft am 25.08.2026 fehlerfrei durch:
• 20 geprüfte Seiten, alle mit Status OK
• höchste Textähnlichkeit zwischen zwei Seiten: 20,7 Prozent (Leipzig und Rodgau), Grenzwert 22 Prozent
• Hanau liegt bei 18 belegten Kennzahlen, der in CLAUDE.md notierte Hanau-Blocker ist gelöst

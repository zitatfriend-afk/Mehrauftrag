# Testanfragen aus den Zahlen halten

Stand 23.09.2026

## Warum

Funktionstests am Formular landen als echter Lead in `public.leads` und tauchen
danach in Google Ads als Conversion und im CRM als Anfrage auf. Am 18.09. und am
23.09. ist genau das passiert. Beide Male sah eine Woche besser aus, als sie war.

## Wie ein Test erkannt wird

Zwei Merkmale, beide greifen unabhaengig voneinander:

1. Die Edge Function `submit-website-lead` haengt an die Quelle den Zusatz
   ` (Test)`, sobald der Name das Wort "test" enthaelt. Aus
   `Website - Handwerker LP` wird dann `Website - Handwerker LP (Test)`.
2. Der Name selbst enthaelt "test".

## Filter fuer Auswertungen

Jede Liste, jedes Dashboard und jede Auswertung schliesst Tests so aus:

```sql
where coalesce(source, '') not like '%(Test)%'
  and name not ilike '%test%'
```

In Supabase-JS:

```ts
query
  .not("source", "ilike", "%(Test)%")
  .not("name", "ilike", "%test%");
```

## Was die Datenbank schon selbst macht

In `public.leads` haengt seit den Meta-Lead-Ads-Zeiten der Trigger
`trg_discard_synthetic_test_leads`. Er loescht einen frisch angelegten Lead
sofort wieder, wenn einer dieser Faelle zutrifft:

• Der Name beginnt mit `TEST ` (auch mit vorangestelltem gruenem Punkt)
• Der Name enthaelt `TEST Meta Lead` oder `<test lead`
• Die E-Mail ist `test@meta.com` oder passt auf `test-meta-%@example.com`

Das ist bewusst enger gefasst als `name ilike '%test%'`. Ein echter Kunde, der
zufaellig "Testorf" heisst, wird dadurch nicht geloescht.

Wer also sicher gehen will, dass ein Funktionstest gar nicht erst liegen
bleibt, nennt ihn `TEST ...` am Zeilenanfang. Dann raeumt die Datenbank selbst
auf. Geprueft am 23.09.2026, funktioniert.

## Wo das bereits greift

• Datenbank-Trigger `trg_discard_synthetic_test_leads`, loescht sofort.
• Edge Function `supabase/functions/submit-website-lead/index.ts`, haengt bei
  jedem Namen mit "test" den Zusatz ` (Test)` an die Quelle. Das faengt die
  Faelle ab, die der Trigger absichtlich durchlaesst.

## Wo es noch eingebaut werden muss

• CRM unter app.mehrauftrag.de, Lead-Liste und Dashboard. Der Quellcode dazu
  liegt nicht in diesem Repository und war am 23.09.2026 in keinem verbundenen
  Ordner zu finden. Sobald klar ist, wo er liegt, den Filter oben dort in die
  Lead-Abfrage einsetzen.

## Beim naechsten Test daran denken

Im Namensfeld das Wort "Test" verwenden, zum Beispiel "TESTLAUF bitte
ignorieren". Dann greift die Kennzeichnung automatisch und der Eintrag faellt
aus allen Auswertungen heraus, auch wenn er versehentlich stehen bleibt.

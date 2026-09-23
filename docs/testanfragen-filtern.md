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

## Wo das bereits greift

• Edge Function `supabase/functions/submit-website-lead/index.ts`, Kennzeichnung
  beim Anlegen.

## Wo es noch eingebaut werden muss

• CRM unter app.mehrauftrag.de, Lead-Liste und Dashboard. Der Quellcode dazu
  liegt nicht in diesem Repository und war am 23.09.2026 in keinem verbundenen
  Ordner zu finden. Sobald klar ist, wo er liegt, den Filter oben dort in die
  Lead-Abfrage einsetzen.

## Beim naechsten Test daran denken

Im Namensfeld das Wort "Test" verwenden, zum Beispiel "TESTLAUF bitte
ignorieren". Dann greift die Kennzeichnung automatisch und der Eintrag faellt
aus allen Auswertungen heraus, auch wenn er versehentlich stehen bleibt.

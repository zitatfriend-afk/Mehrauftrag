# Welche Felder das Formular ins CRM schreibt

Stand 23.09.2026. Gilt fuer die Landingpage /website-fuer-handwerker und die
Edge Function submit-website-lead (Projekt ezrxxxilssmzcavdvvbe, verify_jwt = false).

## source

Beginnt immer mit "Website", damit das CRM die Anfrage in seine Inbox einsortiert.
Der Kanal haengt hinten dran:

• Website - Handwerker LP
• Website - Handwerker LP - Google Ad
• Website - Handwerker LP - Meta Ad
• Website - Handwerker LP - Social

Bei einer Testanfrage (Name enthaelt "test") haengt die Edge Function " (Test)" an.

## draft_channel

Diese Spalte gehoert dem CRM und steht dort fuer die Versandart des Entwurfs
(whatsapp oder email). Das Formular schreibt deshalb nur noch "email" hinein,
wenn der Betrieb gar keine Telefonnummer hinterlassen hat. In allen anderen
Faellen bleibt die Spalte leer und das CRM behaelt seine eigene Auswahl.

Reicht jemand spaeter seine Telefonnummer nach, wird draft_channel nicht
angefasst. Die Nummer steht in der Nachtrags-Mail.

Der gewuenschte Kontaktweg steht ohnehin in der Anfrage-Mail ("Gewuenschter Weg")
und ergibt sich aus den Feldern phone und email.

## campaign_id und campaign_name

campaign_id = gclid aus der Google-Ads-URL, campaign_name = utm_campaign.
Ohne diese Parameter bleiben beide Felder leer, kein Platzhalter.
Beide Werte werden beim ersten Aufruf im sessionStorage gemerkt, damit sie
auch dann noch da sind, wenn der Besucher zwischendurch auf /datenschutz war.

## Pflichtfelder

name ist Pflicht. Dazu mindestens eines von phone oder email.
Geprueft wird das zweimal: im Formular und in der Edge Function.

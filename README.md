# Sportabzeichen-Rechner

Eine Web-Hilfe für Schüler:innen, die das **Deutsche Sportabzeichen** machen wollen. Sie wählen Geschlecht und Altersgruppe aus, sehen sofort alle relevanten Disziplinen und können sich aus jeder der vier Gruppen (Ausdauer, Kraft, Schnelligkeit, Koordination) eine Disziplin in einen persönlichen Plan packen.

Live: über die Netlify-URL des Projekts.

## Was die Seite kann

1. Anforderungen für **Bronze, Silber, Gold** pro Disziplin — gefiltert nach Geschlecht und Alter (10–17)
2. Eigene Detailseite pro Disziplin mit Beschreibung, Materialliste, Tipps und **YouTube-Übungsvideos** aus dem offiziellen DOSB-Booklet
3. Persönlicher **Plan** — eine Disziplin pro Gruppe auswählen, dann ein zusammengestellter Übungsplan
4. Auswahl bleibt zwischen Besuchen erhalten (`localStorage`)

## Zielgruppe

Schüler:innen einer Schule. Die Auftraggeberin ist eine Lehrerin, die ihren Schüler:innen die Anforderungen übersichtlicher zeigen möchte als die klassischen Tabellen.

## Datenquellen

Alle Werte und Beschreibungen stammen aus offiziellen DOSB-PDFs:
1. DSA-Leistungsübersicht Kinder & Jugend A4 (Gültigkeit ab 2024)
2. DSA-Prüfungswegweiser 2026
3. DSA-Erweiterter Leistungskatalog Kraft & Koordination (gültig ab 2026)
4. DSA-Übungsbooklet 2020 (für die eingebetteten YouTube-Videos)

Alle Materialien sind frei zugänglich unter `https://deutsches-sportabzeichen.de/materialien`.

> **Hinweis:** Diese Seite ist eine inoffizielle Schüler:innen-Hilfe und kein offizielles DOSB-Material. Im Zweifel gilt der offizielle Prüfungswegweiser.

## Technik

1. Statisches HTML + CSS + Vanilla-JavaScript
2. Kein Build-Schritt, keine Abhängigkeiten
3. Hosting auf Netlify (automatischer Deploy bei jedem Push auf `main`)
4. YouTube-Videos eingebettet via `youtube-nocookie.com` (datenschutzfreundlich)

## Aktualisieren

Wenn der DOSB neue Werte für 2027 oder später veröffentlicht:
1. Neue PDF herunterladen
2. Werte in `data.js` aktualisieren (Schema siehe `CLAUDE.md`)
3. `git push` — Netlify deployt automatisch

## Dateien

```
index.html    HTML-Gerüst
styles.css    Styling
data.js       Alle Disziplinen + Werte + Beschreibungen + Videos
app.js        Routing + Rendering + State
CLAUDE.md     Technische Doku (Architektur, Datenmodell)
README.md     Diese Datei
```

## Mitwirkende

1. Tom Sindermann (Konzept, Auftrag)
2. Claude (Code, Datenextraktion, Doku)

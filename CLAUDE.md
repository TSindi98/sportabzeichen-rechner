# CLAUDE.md – Anweisungen für Claude

Diese Datei richtet sich an Claude (oder andere KI-Assistenten), die mit dem Projekt arbeiten. Sie beschreibt Architektur, Datenmodell und Konventionen, damit du Änderungen sicher umsetzen kannst.

## Was ist das Projekt?

Eine **statische Single-Page-Website** für Schüler:innen (10–17 Jahre), die zeigt, welche Leistungen sie für das **Deutsche Sportabzeichen** (Bronze / Silber / Gold) erbringen müssen. Die Anforderungen sind gefiltert nach Geschlecht und Altersgruppe. Pro Disziplin gibt es eine Detailseite mit Beschreibung, Bronze/Silber/Gold-Werten und YouTube-Übungsvideos aus dem offiziellen DOSB-Booklet.

**Zielgruppe der Website:** Schüler:innen einer Schule. Die Auftraggeberin ist die Mutter des Nutzers (Lehrerin).

**Nicht-Ziele:** Erwachsene (ab 18) — der erweiterte Kraftkatalog (Push-Ups etc.) ist bewusst nicht eingebaut.

## Tech Stack

Bewusst minimal:
1. Statisches HTML + CSS + Vanilla-JS (keine Frameworks, kein Build-Schritt)
2. Hash-Routing (`#/`, `#/disziplin/<gruppe>/<id>`, `#/plan`) — funktioniert auf jedem statischen Host ohne Server-Konfig
3. Daten als JavaScript-Objekt in `data.js` (keine API, kein Fetch)
4. YouTube-Videos eingebettet via `youtube-nocookie.com`-Iframes (Privacy-Mode)
5. State persistiert in `localStorage` (Geschlecht, Alter, Auswahl-Plan)

**Begründung:** Wartbar von einer Lehrerin / einer KI-Assistentin ohne Build-Pipeline. Funktioniert lokal (file://) und live (GitHub Pages / Netlify) gleichermaßen.

## Datei-Übersicht

| Datei | Zweck |
|---|---|
| `index.html` | HTML-Gerüst, lädt data.js + app.js |
| `styles.css` | Komplettes CSS |
| `data.js` | Alle Disziplinen, Werte, Beschreibungen, Videos (~700 Zeilen) |
| `app.js` | Routing, Rendering, State-Management |
| `CLAUDE.md` | Diese Datei |
| `README.md` | Für menschliche Leser:innen auf GitHub |

## Datenmodell (data.js)

Das `DATA`-Objekt hat drei Top-Level-Felder:

```javascript
{
  ageGroups: [{ id: "10-11", label: "10–11 Jahre" }, ...],
  genders:   [{ id: "w", label: "weiblich", symbol: "♀" }, { id: "m", ... }],
  groups: [...]  // 4 Disziplingruppen
}
```

### Disziplingruppen

Vier Gruppen entsprechend der DOSB-Struktur:
1. `ausdauer` (Ausdauer)
2. `kraft` (Kraft)
3. `schnelligkeit` (Schnelligkeit)
4. `koordination` (Koordination)

### Disziplin-Schema

Jede Disziplin sieht so aus:

```javascript
{
  id: "werfen",                    // URL-slug, eindeutig pro Gruppe
  label: "Werfen",                 // Anzeigename
  unit: "Meter",                   // Einheit für die Werte (nicht bei type:"skill")
  short: "Wirf ...",               // 1-Zeiler oben auf Detail-Seite
  howTo: "...",                    // Generische Beschreibung der Bewegung
  tips: ["...", "..."],            // Array kurzer Tipps
  materials: "...",                // Was man braucht
  extended: true,                  // OPTIONAL: aus erweitertem Katalog 2026 (gestricheltes Card-Design)
  type: "skill",                   // OPTIONAL: bei Gerätturnen (text statt Zahl, "geschafft/nicht geschafft")
  videos: [                        // OPTIONAL: disziplin-weite Videos (gelten für alle Altersgruppen)
    { id: "8GIVlIzQBis", title: "Medizinball – Technik" }
  ],
  values: {                        // PFLICHT: pro Altersgruppe ein Eintrag
    "10-11": { ... },
    "12-13": { ... },
    "14-15": { ... },
    "16-17": { ... }
  }
}
```

### Pro-Altersgruppe-Eintrag (`values[age]`)

Numerische Disziplin (Standard):
```javascript
{
  variant: "Schlagball 80 g",     // Untertitel "Anforderungen für dich"
  variantByGender: {              // OPTIONAL: ersetzt variant pro Geschlecht (für Kugelstoßen)
    w: "Kugelstoßen 3 kg",
    m: "Kugelstoßen 4 kg"
  },
  note: "Zusatzhinweis",          // OPTIONAL
  w: ["15,00", "18,00", "22,00"], // Bronze / Silber / Gold für weiblich
  m: ["26,00", "30,00", "33,00"], // Bronze / Silber / Gold für männlich
  short: "...",                   // OPTIONAL: überschreibt discipline.short
  howTo: "...",                   // OPTIONAL: überschreibt discipline.howTo
  materials: "...",               // OPTIONAL: überschreibt discipline.materials
  tips: ["..."],                  // OPTIONAL: überschreibt discipline.tips
  videos: [{ id: "...", title: "..." }]  // OPTIONAL: altersspezifische Videos
}
```

Skill-Disziplin (Gerätturnen — `type: "skill"`):
```javascript
{
  variant: "Klimmzüge am Reck",   // Wird als Untertitel im Detail-Titel angezeigt
  bronze: "Ein Klimmzug ...",     // Textuelle Bronze-Anforderung
  silber: "Drei Klimmzüge ...",
  gold:   "Drei Klimmzüge, dazwischen ...",
  short:  "...",
  howTo:  "...",
  materials: "...",
  tips: ["..."],
  videos: [...]
}
```

### Resolve-Logik

Die Detail-Seite löst Felder so auf (siehe `app.js`, Helper `resolved`):
1. `data.howTo` (altersspezifisch) hat Vorrang vor `discipline.howTo` (generisch)
2. Gleiches für `short`, `materials`, `tips`
3. Videos: `values[age].videos` + `discipline.videos` werden **kombiniert**, falls beide existieren

**Warum so:** Die meisten Disziplinen (Sprint, Hochsprung, Schwimmen, ...) haben in jedem Alter dieselbe Bewegung — nur die Werte ändern sich. Da reicht der generische Text. Bei Gerätturnen wechselt die Übung pro Alter komplett (Klimmzüge → Handstand → Hüft-Aufschwung) — da brauchen wir altersspezifische `howTo`/`materials`/`tips`. Statt 168 Einzelseiten haben wir 21 Disziplinen × dynamische Resolve-Logik.

### Wo altersspezifische Texte ergänzt sind

Aktuell in 16 Einträgen (4 Disziplinen × 4 Alter):
1. `kraft / turn_kraft`
2. `schnelligkeit / turn_schnelligkeit`
3. `koordination / turn_koord`
4. `koordination / koord_leiter`

Bei den anderen 17 Disziplinen reicht der generische Text auf Disziplin-Ebene.

## App-Architektur (app.js)

Eine IIFE, die folgende Bereiche enthält:

1. **State** (`state.gender`, `state.age`, `state.selection`)
2. **Storage** (`loadState`, `saveState` — `localStorage` mit Key `sportabzeichen-selection-v2`)
3. **Routing** (`parseHash`, `navigate` — Hash-basiert)
4. **Home-View** (`renderHome`, `renderFilters`, `renderGroups`, `buildCard`, `renderPlanBar`)
5. **Detail-View** (`renderDetail`, `renderVideos`, `collectVideos`)
6. **Plan-View** (`renderPlan`)
7. **Hauptrender** (`render` — wechselt zwischen den 3 Views)

`hashchange`-Event triggert `render`.

## Konventionen

### Sprache
1. **Deutsch durchgängig** (alle UI-Texte, Beschreibungen, Tipps, Variant-Labels)
2. **Gendern mit Doppelpunkt** (Schüler:innen, Lehrer:in, Helfer:in)
3. **Direkte Anrede** — "Du läufst...", "Wirf den Ball..." (nicht "Man läuft")
4. Bei Anforderungen-Sektion: Überschrift heißt "**Anforderungen für dich**"

### Typografische Anführungszeichen
Bei deutschen Anführungszeichen `„..."` muss das schließende `"` innerhalb eines JS-Strings mit Backslash escaped werden: `„foo\"`. Sonst schließt es vorzeitig den String und gibt Syntax-Errors.

```javascript
// Falsch ↓
howTo: "... das Muster „innen – außen"."

// Richtig ↓
howTo: "... das Muster „innen – außen\"."
```

### Verträglichkeit
1. Keine Emojis in UI-Texten außer wenn vom Nutzer explizit erwünscht (Gruppen-Icons sind eine Ausnahme: 🏃 💪 ⚡ 🤸)
2. Keine Bindestriche als Listenzeichen (nutze `•` oder nummerierte Listen) — globale Regel des Nutzers

### YouTube-Embedding
1. **Domain:** `youtube-nocookie.com/embed/<id>?rel=0` (Privacy-Mode)
2. **`loading="lazy"`** — Videos werden erst nachgeladen, wenn sie sichtbar sind
3. **Quelle:** Videos sind offiziell vom DOSB öffentlich gemacht (Booklet 2020 + erweiterter Katalog 2026), Einbettung ist rechtlich unproblematisch
4. **Fehler 153** tritt auf, wenn die Seite via `file://` aufgerufen wird. Auf `http(s)://` läuft alles.

## Quellen der Daten

Alle Werte stammen aus offiziellen DOSB-PDFs (heruntergeladen aus `https://deutsches-sportabzeichen.de/materialien`):

1. **DSA-Leistungsübersicht KiJu A4 (Gültigkeit ab 2024)** — Bronze/Silber/Gold-Werte für 10–17, weiblich + männlich
2. **DSA-Prüfungswegweiser 2026** — Beschreibungen der Gerätturn-Elemente, Bestimmungen
3. **DSA-Erweiterter Leistungskatalog Kraft & Koordination (gültig ab 2026)** — die 4 neuen Koordinationsdisziplinen (Ball umgreifen, Kick-Fangen, T-Lauf, Koordinationsleiter)
4. **DSA-Übungsbooklet 2020** — Quelle der YouTube-Videos (41 Links extrahiert via PyMuPDF aus den eingebetteten Annotations, dann pro Seite zu Disziplinen gemappt)

### Wenn 2027er Werte kommen
1. Neues `ONE8Y_DSA_Leistungsuebersicht_KiJu_A4_*` PDF von der Materialien-Seite herunterladen
2. Werte in `data.js` aktualisieren (Struktur bleibt gleich)
3. Pushen — Netlify deployt automatisch

## Deployment

**GitHub Repo:** `https://github.com/TSindi98/sportabzeichen-rechner` (public)

**Hosting:** Netlify, automatischer Build bei jedem Push auf `main`. Kein Build-Schritt nötig (Publish Directory = root).

**Workflow für Updates:**
```bash
# Lokal ändern
git add <files>
git commit -m "..."
git push
# → Netlify deployt in ~30 Sekunden automatisch
```

## Häufige Aufgaben

### Neue Disziplin hinzufügen
1. In `data.js` im passenden `groups[].disciplines[]`-Array ein neues Objekt einfügen
2. Schema beachten (siehe oben). Pflichtfelder: `id`, `label`, `unit` (oder `type:"skill"`), `values` mit allen 4 Altersgruppen
3. Bei Bedarf `videos`, `short`, `howTo`, `tips`, `materials` ergänzen
4. **Validieren:** `node -e "eval(require('fs').readFileSync('data.js','utf8').replace('const DATA','global.DATA')); console.log('ok', DATA.groups.length)"`

### Werte einer existierenden Disziplin ändern
1. `data.js` → entsprechende `values[age].w` oder `values[age].m` ändern (Reihenfolge: `[Bronze, Silber, Gold]`)

### Video tauschen
1. Im DOSB-Booklet (oder erw. Katalog) den neuen QR-Code lesen → YouTube-ID notieren
2. In `data.js` bei `videos[].id` oder `values[age].videos[].id` die ID ersetzen

### Layout/Farben ändern
1. CSS-Variablen oben in `styles.css` (z.B. `--bronze`, `--accent`, `--card`)
2. Bei Komponenten-spezifischen Änderungen: die jeweiligen Klassen anpassen

## Wichtige Designentscheidungen

1. **Hash-Routing statt History-API** — funktioniert auf statischen Hosts ohne 404-Konfiguration
2. **Keine Build-Pipeline** — Datei direkt editierbar, kein npm/Node nötig (außer für lokale Validierung)
3. **localStorage statt URL-State** — Auswahl persistiert über Sessions, ist aber Browser-lokal (nicht teilbar)
4. **`youtube-nocookie.com`** — datenschutzfreundlicher für Schulkontext
5. **Plan-Seite ist nur Anzeige** — keine Datenbank, kein "speichern als PDF" (Browser-Druck reicht)
6. **Erweiterte Kraft-Disziplinen weggelassen** — Push-Ups etc. sind im DSA erst ab 18 erlaubt, also für unsere Zielgruppe (10–17) irrelevant

## Was bewusst NICHT drin ist

1. Erwachsenen-Anforderungen (ab 18 Jahre)
2. Anforderungen für Menschen mit Behinderung (separater DOSB-Katalog, anderer Scope)
3. Schwimmnachweis als Tracking (wird nur als Pflicht-Hinweis in der Info-Box genannt)
4. User-Accounts / Login
5. Backend / Datenbank

## Bekannte Punkte für mögliche Erweiterungen

Was die Mutter / der Nutzer ggf. später ergänzen möchte:
1. Übungsbooklet als Datei verlinken (Booklet-Platzhalter auf Detail-Seite ist schon da)
2. Bilderreihen statt nur Videos (würde die Datenstruktur leicht erweitern)
3. Druck-optimierte Plan-Seite (rudimentäres `@media print` ist schon da)
4. Spracheinstellung (für Schüler:innen mit anderer Muttersprache — der DOSB hat alte Leporellos auf Arabisch, Türkisch, Russisch etc.)

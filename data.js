// Datenquelle: Deutsches Sportabzeichen, Kinder & Jugend, Gültigkeit ab 2024,
// erweiterter Leistungskatalog Koordination gültig ab 2026.
// Quellen: DOSB Prüfungswegweiser 2026, DSA Leistungsübersicht KiJu A4,
// DSA Erweiterter Leistungskatalog Kraft & Koordination 2026.

const DATA = {
  ageGroups: [
    { id: "10-11", label: "10–11 Jahre" },
    { id: "12-13", label: "12–13 Jahre" },
    { id: "14-15", label: "14–15 Jahre" },
    { id: "16-17", label: "16–17 Jahre" }
  ],

  genders: [
    { id: "w", label: "weiblich", symbol: "♀" },
    { id: "m", label: "männlich", symbol: "♂" }
  ],

  groups: [
    {
      id: "ausdauer",
      label: "Ausdauer",
      color: "#1e7a3c",
      icon: "🏃",
      description: "Wähle eine Disziplin aus dieser Gruppe.",
      disciplines: [
        {
          id: "800m",
          label: "800 m Lauf",
          unit: "Minuten",
          short: "Renne 800 m so schnell wie möglich.",
          howTo: "Auf einer normalen Rundbahn (400 m Umfang) sind das zwei Runden. Der Start erfolgt aus einer ruhigen Standstellung. Die Zeitmessung beginnt mit dem Startsignal und endet, sobald du die Ziellinie überquerst.",
          tips: [
            "Teile dir die Kräfte ein — viele starten zu schnell und müssen am Ende langsamer werden.",
            "Bleib auf der Innenbahn, das ist die kürzeste Strecke.",
            "Atme gleichmäßig durch Mund und Nase."
          ],
          materials: "Rundbahn (400 m) oder vermessene 800-m-Strecke, Stoppuhr",
          values: {
            "10-11": { variant: "800 m", w: ["5:20", "4:40", "4:00"], m: ["5:05", "4:20", "3:35"] },
            "12-13": { variant: "800 m", w: ["5:10", "4:25", "3:45"], m: ["4:45", "4:00", "3:15"] },
            "14-15": { variant: "800 m", w: ["5:00", "4:20", "3:35"], m: ["4:20", "3:40", "3:00"] },
            "16-17": { variant: "800 m", w: ["4:50", "4:05", "3:25"], m: ["4:05", "3:25", "2:45"] }
          }
        },
        {
          id: "dauerlauf",
          label: "Dauer-/Geländelauf",
          unit: "Minuten",
          short: "Laufe so lange am Stück, wie deine Altersgruppe es vorgibt.",
          howTo: "Die Strecke ist frei wählbar — Sportplatz, Park, Wald, eine Rundstrecke um die Schule. Wichtig ist, dass du ohne Pause durchläufst. Du musst die Zeit aus der Tabelle mindestens erreichen oder überschreiten.",
          tips: [
            "Lauf gleichmäßig, lieber etwas langsamer, aber durchgängig — Gehen ist nicht erlaubt.",
            "Such dir eine Strecke ohne starke Steigungen.",
            "Sprich mit deinem Sportlehrer oder deiner Sportlehrerin ab, ob ihr eine Runde habt, die ihr abnehmen könnt."
          ],
          materials: "Beliebige Strecke, Stoppuhr",
          values: {
            "10-11": { variant: "Strecke beliebig", w: ["15:00", "20:00", "30:00"], m: ["17:00", "25:00", "35:00"] },
            "12-13": { variant: "Strecke beliebig", w: ["20:00", "30:00", "40:00"], m: ["25:00", "35:00", "45:00"] },
            "14-15": { variant: "Strecke beliebig", w: ["30:00", "40:00", "50:00"], m: ["35:00", "45:00", "60:00"] },
            "16-17": { variant: "Strecke beliebig", w: ["45:00", "60:00", "75:00"], m: ["55:00", "70:00", "90:00"] }
          }
        },
        {
          id: "schwimmen_ausdauer",
          label: "Schwimmen (Ausdauer)",
          unit: "Minuten",
          short: "Schwimme 200 m bzw. 400 m am Stück.",
          howTo: "Die Schwimmtechnik darfst du frei wählen (Brust, Kraul, Rücken). Du startest vom Block oder vom Beckenrand. Während des Schwimmens darfst du die Technik wechseln. Wenden ist erlaubt, aber du musst die Wand mit einem Körperteil berühren.",
          tips: [
            "Brustschwimmen ist meistens die kräftesparendste Variante über lange Strecken.",
            "Tauche nach dem Start und nach jeder Wende möglichst kurz — über Wasser bist du in der Regel schneller (außer beim Brust-Tauchzug).",
            "Auf 200 m oder 400 m solltest du nicht zu schnell anfangen."
          ],
          materials: "Schwimmbecken (mind. 12,5 m lang), Stoppuhr",
          values: {
            "10-11": { variant: "200 m", w: ["7:20", "6:25", "5:30"], m: ["7:00", "6:20", "5:10"] },
            "12-13": { variant: "400 m", w: ["14:50", "12:55", "11:00"], m: ["13:30", "11:30", "9:45"] },
            "14-15": { variant: "400 m", w: ["13:05", "11:40", "10:00"], m: ["12:00", "10:15", "8:50"] },
            "16-17": { variant: "400 m", w: ["11:50", "10:30", "9:05"], m: ["11:00", "9:40", "8:20"] }
          }
        },
        {
          id: "radfahren_ausdauer",
          label: "Radfahren (Ausdauer)",
          unit: "Minuten",
          short: "Fahre 10 km mit dem Fahrrad gegen die Uhr.",
          howTo: "Die Strecke sollte möglichst eben und ohne Verkehrseinflüsse sein. Du startest aus dem Stand, die Zeit läuft ab dem Lostreten. E-Bikes und Pedelecs sind nicht erlaubt — auch nicht mit ausgeschaltetem Motor.",
          tips: [
            "Trag einen Helm — das ist beim Sportabzeichen ausdrücklich empfohlen.",
            "Wähle eine Strecke, die du sicher kennst.",
            "Halte gleichmäßiges Tempo, statt am Anfang Vollgas zu geben."
          ],
          materials: "Verkehrssicheres Fahrrad (kein E-Bike), 10-km-Strecke, Stoppuhr",
          values: {
            "10-11": { variant: "10 km", w: ["50:30", "43:00", "35:30"], m: ["48:30", "41:00", "33:30"] },
            "12-13": { variant: "10 km", w: ["45:00", "39:30", "33:30"], m: ["43:00", "37:00", "31:30"] },
            "14-15": { variant: "10 km", w: ["38:00", "32:30", "28:30"], m: ["32:00", "28:00", "24:00"] },
            "16-17": { variant: "10 km", w: ["32:30", "28:30", "25:00"], m: ["27:00", "23:30", "20:30"] }
          }
        }
      ]
    },

    {
      id: "kraft",
      label: "Kraft",
      color: "#c0392b",
      icon: "💪",
      description: "Wähle eine Disziplin aus dieser Gruppe.",
      disciplines: [
        {
          id: "werfen",
          label: "Werfen",
          unit: "Meter",
          short: "Wirf den Ball so weit wie möglich.",
          howTo: "Bis 13 Jahre wirfst du einen Schlagball (80 g), ab 14 Jahre einen Wurfball (200 g). Du hast drei Versuche — der weiteste zählt. Der Wurf erfolgt aus einem kurzen Anlauf. Übertrittst du die Abwurflinie, ist der Versuch ungültig.",
          tips: [
            "Werfe mit deinem starken Arm.",
            "Drehe den Oberkörper im Wurf — die Weite kommt aus dem ganzen Körper, nicht nur aus dem Arm.",
            "Lass den Ball möglichst hoch los — der ideale Abwurfwinkel ist ca. 40°."
          ],
          materials: "Schlagball 80 g (bis 13) / Wurfball 200 g (ab 14), Maßband, Abwurflinie",
          values: {
            "10-11": { variant: "Schlagball 80 g", w: ["11,00", "15,00", "18,00"], m: ["21,00", "25,00", "28,00"] },
            "12-13": { variant: "Schlagball 80 g", w: ["15,00", "18,00", "22,00"], m: ["26,00", "30,00", "33,00"] },
            "14-15": { variant: "Wurfball 200 g", w: ["20,00", "24,00", "27,00"], m: ["30,00", "34,00", "37,00"] },
            "16-17": { variant: "Wurfball 200 g", w: ["24,00", "27,00", "31,00"], m: ["34,00", "38,00", "42,00"] }
          }
        },
        {
          id: "kugelstossen",
          label: "Medizinball / Kugelstoßen",
          unit: "Meter",
          short: "Stoße den Ball / die Kugel so weit wie möglich.",
          howTo: "Mit 10–11 Jahren stößt du einen Medizinball (1 kg) aus dem Stand. Ab 12 Jahren wird es eine richtige Kugel mit unterschiedlichem Gewicht je nach Alter und Geschlecht. Wichtig: Die Kugel wird gestoßen (vom Hals weg), nicht geworfen. Drei Versuche — der weiteste zählt.",
          tips: [
            "Die Kugel liegt am Hals, der Ellbogen zeigt nach vorne.",
            "Stoß aus dem ganzen Körper — Beine, Hüfte und Arm geben den Schwung.",
            "Übe vorher den Bewegungsablauf ohne Kugel."
          ],
          materials: "Medizinball 1 kg / Kugel je nach Alter (3–5 kg), Maßband, Stoßkreis oder Abstoßlinie",
          videos: [
            { id: "8GIVlIzQBis", title: "Medizinball – Technik ohne Anlauf" },
            { id: "hL6SGuG_01I", title: "Medizinball – Vertiefung" }
          ],
          values: {
            "10-11": { variant: "Medizinball 1 kg", w: ["5,00", "6,00", "7,00"], m: ["5,50", "6,50", "7,50"] },
            "12-13": { variant: "Kugelstoßen 3 kg", w: ["4,75", "5,25", "5,75"], m: ["6,25", "6,75", "7,25"] },
            "14-15": { variant: "Kugelstoßen 3 / 4 kg", w: ["5,50", "6,00", "6,50"], m: ["7,00", "7,50", "8,00"], note: "♀ 3 kg · ♂ 4 kg" },
            "16-17": { variant: "Kugelstoßen 3 / 5 kg", w: ["5,75", "6,25", "6,75"], m: ["7,50", "8,00", "8,50"], note: "♀ 3 kg · ♂ 5 kg" }
          }
        },
        {
          id: "standweitsprung",
          label: "Standweitsprung",
          unit: "Meter",
          short: "Springe aus dem Stand beidbeinig so weit wie möglich.",
          howTo: "Du stehst hinter einer Absprunglinie mit beiden Füßen parallel. Aus dem Stand (ohne Anlauf) springst du beidbeinig so weit wie möglich nach vorne. Gemessen wird vom Absprung zur Ferse der hinteren Landung. Drei Versuche — der weiteste zählt.",
          tips: [
            "Schwing die Arme nach hinten und dann kraftvoll nach vorne, um Schwung aufzubauen.",
            "Geh leicht in die Knie, bevor du springst.",
            "Lande beidbeinig und versuche, nicht nach hinten zu kippen — sonst zählt der Punkt, an dem du das nächste Mal den Boden berührst."
          ],
          materials: "Absprunglinie auf festem Untergrund, Maßband",
          values: {
            "10-11": { variant: "aus dem Stand", w: ["1,30", "1,45", "1,65"], m: ["1,50", "1,70", "1,85"] },
            "12-13": { variant: "aus dem Stand", w: ["1,40", "1,60", "1,80"], m: ["1,70", "1,90", "2,05"] },
            "14-15": { variant: "aus dem Stand", w: ["1,55", "1,70", "1,90"], m: ["1,90", "2,05", "2,25"] },
            "16-17": { variant: "aus dem Stand", w: ["1,65", "1,80", "2,00"], m: ["2,05", "2,20", "2,40"] }
          }
        },
        {
          id: "turn_kraft",
          label: "Gerätturnen (Kraft)",
          type: "skill",
          short: "Eine festgelegte Turnübung — je nach Alter ein anderes Element.",
          howTo: "Je nach Altersgruppe musst du eine andere Übung am vorgegebenen Gerät turnen. Die Übung muss in der Grobform erkennbar sein. Bewertet wird mit „geschafft / nicht geschafft\".",
          tips: [
            "Trainiere die Übung unbedingt mit einer Lehrkraft oder Trainer:in, die das absichern können.",
            "Trag eng anliegende Kleidung — kein Schmuck, lange Haare zusammenbinden.",
            "Geh die Übung vorher mehrmals langsam durch, bevor du sie zur Wertung turnst."
          ],
          materials: "Je nach Alter: Parallelbarren (10-11), Reck (12-13 + 16-17), Matten und Wand (14-15)",
          values: {
            "10-11": {
              variant: "Stützschwingen am Parallelbarren",
              bronze: "Aus dem Vierfüßlerstand vorlings auf dem Barren zweimal vor- und zurückschwingen. Nach dem dritten Vorschwung Landung im Vierfüßlerstand rücklings.",
              silber: "Viermal vor- und zurückschwingen. Aufgabe endet im Vierfüßlerstand vorlings.",
              gold: "Viermal vor- und zurückschwingen mit Grätschen und Schließen der Beine über dem Holm im Vorschwung.",
              videos: [
                { id: "Tl53f5lLVkc", title: "Stützschwingen – Gold-Leistung" },
                { id: "HIIH5sl7Nrs", title: "Vorübung Stützschwingen", note: "Heranführung an die Grätschbewegung" }
              ]
            },
            "12-13": {
              variant: "Klimmzüge am Reck",
              bronze: "Ein Klimmzug aus dem Hang mit deutlichem Ziehen des Kinns über die Stange.",
              silber: "Drei Klimmzüge aus dem Hang.",
              gold: "Drei Klimmzüge, dazwischen jeweils komplett aushängen (Arme zwischen den Klimmzügen ganz gestreckt)."
            },
            "14-15": {
              variant: "Handstand (3 Matten, Wand, kleiner Kasten)",
              bronze: "Aufschwingen Handstand vor einer Wand (ca. 30 cm Abstand). Wand darf nicht berührt werden. Position kurz erreichen.",
              silber: "Aufschwingen Handstand auf der Matte, ggf. Sicherung durch zwei Personen.",
              gold: "Handstand auf der Matte, Helfer:in steht auf kleinem Kasten und klemmt eine Hand zwischen die Füße. Position 2 Sekunden halten."
            },
            "16-17": {
              variant: "Hüft-Aufschwung (Sprossenwand / Reck)",
              bronze: "An der Sprossenwand oder am sprunghohen Reck dreimal die geschlossenen, gehockten Beine bis zum Rumpf anheben (mindestens bis Oberschenkel waagerecht).",
              silber: "Hüft-Aufschwung am kopfhohen Reck mit kleinem Kasten als Geländehilfe.",
              gold: "Hüft-Aufschwung am schulterhohen Reck.",
              videos: [
                { id: "npKkkBpu8RM", title: "Hüft-Aufschwung – Gold-Leistung" }
              ]
            }
          }
        }
      ]
    },

    {
      id: "schnelligkeit",
      label: "Schnelligkeit",
      color: "#e67e22",
      icon: "⚡",
      description: "Wähle eine Disziplin aus dieser Gruppe.",
      disciplines: [
        {
          id: "sprint",
          label: "Sprint",
          unit: "Sekunden",
          short: "Renne 50 m oder 100 m so schnell wie möglich.",
          howTo: "Bis 13 Jahre läufst du 50 m, ab 14 Jahre 100 m. Du startest aus einer ruhigen Standstellung — Startblöcke sind nicht nötig. Auf das Kommando „Auf die Plätze – fertig – los\" sprintest du los. Bei zwei Fehlstarts wirst du disqualifiziert.",
          tips: [
            "Konzentriere dich aufs Startkommando — die Reaktion macht oft den Unterschied.",
            "Halte den Kopf gerade und schau geradeaus, nicht zum Nachbarn.",
            "Sprinte bis durch die Ziellinie, nicht bis kurz davor."
          ],
          materials: "50 m / 100 m markierte Bahn, Stoppuhr",
          videos: [
            { id: "Un-EU216B5I", title: "Anfersen", note: "Lauf-ABC: aktiver Armschwung, Fersen zum Po ziehen" },
            { id: "fEfWwPG2_mQ", title: "Kniehebelauf (Skippings)", note: "Lauf-ABC: Oberschenkel und Oberkörper bilden rechten Winkel" },
            { id: "kiv9172dUrs", title: "Hopserlauf", note: "Lauf-ABC: impulsives Hochziehen, „Apfel pflücken\"" },
            { id: "bh9B9hvHjS8", title: "Schrittlänge", note: "Lauf-ABC: aktives Ziehen aus der Oberschenkelrückseite" }
          ],
          values: {
            "10-11": { variant: "50 m", w: ["11,0", "10,1", "9,1"], m: ["10,3", "9,3", "8,4"] },
            "12-13": { variant: "50 m", w: ["10,6", "9,6", "8,5"], m: ["9,7", "8,9", "8,1"] },
            "14-15": { variant: "100 m", w: ["18,6", "17,0", "15,5"], m: ["17,0", "15,4", "14,1"] },
            "16-17": { variant: "100 m", w: ["17,6", "16,3", "15,0"], m: ["16,3", "14,8", "13,5"] }
          }
        },
        {
          id: "schwimmen_sprint",
          label: "25 m Schwimmen",
          unit: "Sekunden",
          short: "Schwimme 25 m so schnell wie möglich.",
          howTo: "Du startest vom Startblock (Startsprung) oder vom Beckenrand bzw. aus dem Wasser. Die Schwimmtechnik kannst du frei wählen — du darfst sie auch während des Schwimmens wechseln.",
          tips: [
            "Kraulen ist meistens am schnellsten — aber nur, wenn du die Technik beherrschst.",
            "Spring beim Start so flach wie möglich rein und versuche, nach dem Eintauchen schnell wieder Vortrieb aufzunehmen.",
            "Berühr am Ziel die Wand mit der Hand — nicht früher abbremsen!"
          ],
          materials: "Schwimmbecken (mind. 12,5 m / Wassertiefe 1,80 m im Startbereich), Stoppuhr",
          values: {
            "10-11": { variant: "25 m beliebige Lage", w: ["39,0", "31,5", "25,5"], m: ["36,0", "29,0", "22,5"] },
            "12-13": { variant: "25 m beliebige Lage", w: ["35,0", "29,0", "23,5"], m: ["33,0", "27,0", "21,0"] },
            "14-15": { variant: "25 m beliebige Lage", w: ["33,0", "27,5", "21,5"], m: ["31,0", "25,5", "20,0"] },
            "16-17": { variant: "25 m beliebige Lage", w: ["30,5", "25,5", "20,0"], m: ["29,5", "24,5", "19,0"] }
          }
        },
        {
          id: "radfahren_sprint",
          label: "200 m Radfahren",
          unit: "Sekunden",
          short: "Fahre 200 m mit dem Fahrrad gegen die Uhr.",
          howTo: "Der Start ist „fliegend\" — du fährst dich also vor der Startlinie schon ein, beschleunigst und die Zeit läuft erst ab dem Überfahren der Startlinie. Die Strecke sollte gerade, eben und ohne Verkehr sein. Die Abnahme darf nicht auf einem Fahrradergometer erfolgen.",
          tips: [
            "Setz vor dem Start einen großen Gang ein, damit du beim Überfahren der Linie schon Tempo hast.",
            "Trag einen Helm.",
            "Such dir eine Strecke ohne enge Kurven — Vollgas in Kurven kann gefährlich sein."
          ],
          materials: "200-m-Strecke (gerade, eben), Fahrrad (kein E-Bike), Stoppuhr, Helm dringend empfohlen",
          values: {
            "10-11": { variant: "fliegender Start", w: ["37,0", "32,0", "27,0"], m: ["35,0", "30,5", "26,0"] },
            "12-13": { variant: "fliegender Start", w: ["31,0", "27,0", "23,5"], m: ["29,5", "26,0", "22,5"] },
            "14-15": { variant: "fliegender Start", w: ["27,0", "24,5", "21,5"], m: ["24,0", "21,5", "19,0"] },
            "16-17": { variant: "fliegender Start", w: ["25,0", "22,5", "20,0"], m: ["22,0", "19,5", "17,0"] }
          }
        },
        {
          id: "turn_schnelligkeit",
          label: "Gerätturnen (Schnelligkeit)",
          type: "skill",
          short: "Eine festgelegte Sprungübung am Gerät.",
          howTo: "Je nach Altersgruppe springst du eine andere Übung — von der Sprungrolle bis zum Handstütz-Sprungüberschlag am Sprungtisch. Bewertet wird mit „geschafft / nicht geschafft\". Wichtig: gute Sicherung mit Matten.",
          tips: [
            "Übe den Anlauf — er bestimmt deinen Schwung.",
            "Bei Sprungrolle und Überschlag den Kopf einrollen, damit dein Nacken nicht stark belastet wird.",
            "Sprungübungen brauchen eine Sicherheitsstellung durch eine erfahrene Person."
          ],
          materials: "Je nach Alter: Sprungbrett, Weichbodenmatten, Turnmatten, Sprungtisch",
          values: {
            "10-11": {
              variant: "Sprungrolle (Weichbodenmatten + Sprungbrett)",
              bronze: "Anlauf, beidbeiniger Absprung vom Sprungbrett, Sprungrolle auf zwei übereinander gelegte Weichbodenmatten mit Landung in den Stand.",
              silber: "Sprungrolle auf drei übereinander gelegte Weichbodenmatten.",
              gold: "Sprungrolle auf vier übereinander gelegte Weichbodenmatten.",
              videos: [
                { id: "0jf4PZ0jLTQ", title: "Sprungrolle – Aufrollen in Slow-Mo" },
                { id: "LATquuE5Gt8", title: "Sprungrolle – Hilfestellung" }
              ]
            },
            "12-13": {
              variant: "Handstütz-Sprungüberschlag (4 Weichbodenmatten)",
              bronze: "Anlauf, Absprung am hinteren Ende der quer gelegten Matten, in die Handstützposition und umfallen in Rückenlage auf längs gelegte Matten.",
              silber: "Wie Bronze, zusätzlich mit Abdruck aus dem Handstütz.",
              gold: "Mit Abdruck Aufstehen in den Stand auf der längs gelegten Weichbodenmatte.",
              videos: [
                { id: "-V-1nA5Nj1Y", title: "Handstütz-Sprungüberschlag – Gold-Leistung" },
                { id: "IH8XGuBXZbU", title: "Handstütz-Sprungüberschlag – Silber-Leistung", note: "Zugleich Vorübung für Gold" }
              ]
            },
            "14-15": {
              variant: "Grätsch(winkel)sprung (Sprungbrett, 4 Matten)",
              bronze: "Anlauf, Absprung vom Sprungbrett, Grätschsprung mit beliebiger Landung auf zwei doppelt gelegten Turnmatten.",
              silber: "Grätschsprung mit Landung in den ruhigen Stand.",
              gold: "Grätschwinkelsprung (deutlicher Hüftwinkel, Knie zeigen nach oben), Landung in ruhigen Stand.",
              videos: [
                { id: "U2rRm9zqTME", title: "Grätschwinkelsprung – Bronze-Vorübung" },
                { id: "Vsv27ZzQNjs", title: "Vorübung am Boden", note: "Grätschwinkelsprung auf einer Bodenfläche" },
                { id: "jqPLbq-wVOQ", title: "Grätschwinkelsprung – Gold-Leistung" }
              ]
            },
            "16-17": {
              variant: "Handstütz-Sprungüberschlag (Sprungtisch)",
              bronze: "Sprungtisch wird mit Mattenberg gleichhoch abgesichert. Anlauf und Absprung ohne Aufsatz der Hände auf den Sprungtisch.",
              silber: "Sprung mit Stütz der Hände (leicht ausgedreht) und gestreckten Armen auf den Sprungtisch.",
              gold: "Stützaufnahme, Abdruck und Landung in Rückenlage auf dem Weichbodenmattenberg.",
              videos: [
                { id: "-V-1nA5Nj1Y", title: "Handstütz-Sprungüberschlag – Gold-Leistung" },
                { id: "IH8XGuBXZbU", title: "Handstütz-Sprungüberschlag – Silber-Leistung" }
              ]
            }
          }
        }
      ]
    },

    {
      id: "koordination",
      label: "Koordination",
      color: "#2980b9",
      icon: "🤸",
      description: "Wähle eine Disziplin aus dieser Gruppe.",
      disciplines: [
        {
          id: "hochsprung",
          label: "Hochsprung",
          unit: "Meter",
          short: "Springe über eine Latte — pro Höhe drei Versuche.",
          howTo: "Die Latte wird in verschiedenen Höhen aufgelegt. Pro Höhe hast du drei Versuche. Nach drei Fehlversuchen in Folge scheidest du aus. Du musst mit einem Fuß abspringen — kein beidbeiniger Absprung. Anlauflänge frei wählbar.",
          tips: [
            "Die meisten springen mit der „Flop\"-Technik (Rücken zur Latte) — das ist Trainingssache.",
            "Eine alternative ist der Schersprung (Beine schwingen einzeln über die Latte) — einfacher zu lernen.",
            "Lauf den Anlauf vorher mehrmals durch, ohne zu springen."
          ],
          materials: "Hochsprunganlage, Latte, Matten",
          values: {
            "10-11": { variant: "klassisch", w: ["0,80", "0,90", "1,00"], m: ["0,85", "0,95", "1,05"] },
            "12-13": { variant: "klassisch", w: ["0,90", "1,00", "1,10"], m: ["0,95", "1,05", "1,15"] },
            "14-15": { variant: "klassisch", w: ["0,95", "1,05", "1,15"], m: ["1,10", "1,20", "1,30"] },
            "16-17": { variant: "klassisch", w: ["1,05", "1,15", "1,25"], m: ["1,20", "1,30", "1,40"] }
          }
        },
        {
          id: "weitsprung",
          label: "Weitsprung",
          unit: "Meter",
          short: "Springe aus dem Anlauf so weit wie möglich.",
          howTo: "Anlauflänge frei wählbar. Du springst von einem Balken (Holz/Plastik, 1,21–1,23 m breit) oder einer 80 cm breiten Absprungfläche in die Sprunggrube. Gemessen wird vom Absprung zum hintersten Eindruck deiner Landung. Drei Versuche.",
          tips: [
            "Treffe den Absprung möglichst genau — übertrittst du den Balken, ist der Versuch ungültig.",
            "Schwing die Arme im Sprung mit, das gibt mehr Weite.",
            "Lande mit beiden Beinen vor — nicht versuchen, im Sand zu rollen, sondern fallen lassen."
          ],
          materials: "Weitsprunganlage mit Sprunggrube, Absprungbalken oder -fläche, Maßband",
          values: {
            "10-11": { variant: "klassisch", w: ["2,30", "2,60", "2,90"], m: ["2,60", "2,90", "3,20"] },
            "12-13": { variant: "klassisch", w: ["2,80", "3,10", "3,40"], m: ["3,20", "3,50", "3,80"] },
            "14-15": { variant: "klassisch", w: ["3,20", "3,50", "3,80"], m: ["3,80", "4,10", "4,40"] },
            "16-17": { variant: "klassisch", w: ["3,40", "3,70", "4,00"], m: ["4,30", "4,60", "4,90"] }
          }
        },
        {
          id: "schleuderball",
          label: "Drehwurf / Schleuderball",
          unit: "Punkte / Meter",
          short: "Mit 10–11 Tennisring, ab 12 Schleuderball — beides aus Drehbewegung.",
          howTo: "10–11 Jahre: Drehwurf mit einem Tennisring (160-220 g). Du wirfst aus seitlicher Schrittstellung mit einer Drehbewegung. Du erhältst Punkte je Zone (1-8). Ab 12 Jahre: Schleuderball (1 kg) mit Lederschlaufe. Wurf aus Stand, Anlauf oder Drehung. Die Weite zählt. Drei Versuche, die besten drei werden addiert (Drehwurf) bzw. der weiteste gilt (Schleuderball).",
          tips: [
            "Bau Schwung aus dem ganzen Körper auf — die Energie kommt aus den Beinen und der Hüfte.",
            "Beim Schleuderball: halte den Ball nicht zu fest, der Schwung soll fließen.",
            "Übertritt den Abwurfbalken nicht, sonst ist der Wurf ungültig."
          ],
          materials: "Tennisring (160-220 g) bzw. Schleuderball 1 kg, Maßband, Abwurflinie",
          videos: [
            { id: "rEX4hsjFsRQ", title: "Technik Drehen", note: "Schlaufe sollte unter Spannung sein" },
            { id: "R8lk7hfgKCg", title: "Wurf-Anlauf-Technik" },
            { id: "JSUIi5AHrkI", title: "Wurftechnik", note: "Ausreichend Platz für Drehung lassen" }
          ],
          values: {
            "10-11": { variant: "Drehwurf (Tennisring) – Punkte", w: ["27", "30", "36"], m: ["33", "39", "45"], note: "Summe der 3 besten Würfe in Zonenpunkten" },
            "12-13": { variant: "Schleuderball 1 kg – Meter", w: ["17,00", "19,50", "22,00"], m: ["19,50", "24,00", "27,50"] },
            "14-15": { variant: "Schleuderball 1 kg – Meter", w: ["19,50", "22,50", "25,50"], m: ["23,50", "28,00", "32,00"] },
            "16-17": { variant: "Schleuderball 1 kg – Meter", w: ["22,00", "25,00", "28,00"], m: ["27,50", "32,00", "36,50"] }
          }
        },
        {
          id: "seilspringen",
          label: "Seilspringen",
          unit: "Sprünge",
          short: "Springe eine vorgegebene Sprungform ohne Unterbrechung.",
          howTo: "Du springst mit einem normalen Springseil (ohne Motor) eine bestimmte Anzahl Sprünge ohne Unterbrechung. Die Technik hängt vom Alter ab — Grundsprung vorwärts, rückwärts, oder Kreuzdurchschlag. Zwischensprünge sind nicht erlaubt (außer bei jüngeren Kindern bei der Grundübung).",
          tips: [
            "Wähle ein Seil, das zu dir passt: Wenn du in der Mitte des Seils stehst, sollten die Griffe etwa Achselhöhe erreichen.",
            "Spring nicht zu hoch — kleine, schnelle Sprünge sind effizienter.",
            "Der Kreuzdurchschlag braucht Übung: Arme vor dem Körper kreuzen, durchspringen, wieder öffnen."
          ],
          materials: "Springseil ohne Motor",
          values: {
            "10-11": { variant: "Grundsprung vorwärts ohne Zwischensprung", w: ["20", "30", "40"], m: ["20", "30", "40"] },
            "12-13": { variant: "Grundsprung rückwärts ohne Zwischensprung", w: ["10", "20", "30"], m: ["10", "20", "30"] },
            "14-15": { variant: "Kreuzdurchschlag ohne Zwischensprung", w: ["10", "15", "20"], m: ["10", "15", "20"] },
            "16-17": { variant: "Kreuzdurchschlag ohne Zwischensprung", w: ["10", "15", "20"], m: ["10", "15", "20"] }
          }
        },
        {
          id: "turn_koord",
          label: "Gerätturnen (Koordination)",
          type: "skill",
          short: "Eine festgelegte Turnübung — je nach Alter ein anderes Element.",
          howTo: "Je nach Altersgruppe turnst du eine andere Übung: an den Ringen schwingen, ein Rad schlagen, eine Rolle in Kastengasse, oder einen Sprung mit Drehung. Bewertet wird mit „geschafft / nicht geschafft\".",
          tips: [
            "Sicherheitsstellung durch eine Lehrkraft oder Trainer:in ist wichtig.",
            "Trag eng anliegende Kleidung, leg Schmuck ab, binde lange Haare zusammen.",
            "Bei der Drehung den Blick fixieren („Spotting\"), das hilft gegen Schwindel."
          ],
          materials: "Je nach Alter: Ringe (10-11), Matten (12-13 + 14-15), Turnmatten (16-17)",
          values: {
            "10-11": {
              variant: "Schwingen an den Ringen",
              bronze: "Aus dem Stand auf kleinem Kasten Arme strecken, abspringen und anziehen. Vor- und zurückpendeln, am Ende des Rückpendelns Arme strecken und landen.",
              silber: "Drei Vor- und Rückschwünge an den Ringen mit rhythmischem Abstoßen am Boden (zwei Kontakte je Vor- und Rückschwung).",
              gold: "Wie Silber, zusätzlich mit deutlichem Höhengewinn."
            },
            "12-13": {
              variant: "Rad (Handstützüberschlag seitwärts)",
              bronze: "Aus dem Aufschwingen Rad vorlings vor einer hochgestellten Weichbodenmatte. Abstand zur Matte im Handaufsatz ca. 30 cm.",
              silber: "Rad mit Landung gegen die Bewegungsrichtung.",
              gold: "Rad in einem durch Kreidestriche markierten Korridor von 30 cm Breite."
            },
            "14-15": {
              variant: "Rolle (4 kleine Kästen, Turnmatten)",
              bronze: "Aus der Bauchlage auf einem kleinen Kasten Rolle vorwärts in der Kastengasse mit richtigem Handaufsatz und Aufstehen über einen vierten Kasten – ohne Abstützen der Hände.",
              silber: "Aus dem Strecksitz Rolle rückwärts in der Kastengasse, Landung in Hockposition auf einem gleichhohen Turnmattenberg.",
              gold: "Wie Silber, aber Landung auf einem 20 cm höheren Turnmattenberg."
            },
            "16-17": {
              variant: "Sprung mit Drehung (Turnmatten)",
              bronze: "Vier Strecksprünge mit je ½ Drehung in den sicheren Stand: erster und dritter nach links, zweiter und vierter nach rechts.",
              silber: "Ein Strecksprung mit 1/1 Drehung.",
              gold: "Ein Strecksprung mit 1/1 Drehung in den sicheren beidbeinigen Stand."
            }
          }
        },
        {
          id: "ball_umgreifen",
          label: "Ball umgreifen",
          unit: "Wiederholungen in 30 Sek.",
          extended: true,
          short: "Greife einen Ball in 30 Sekunden so oft wie möglich um.",
          howTo: "Ausgangsposition: breiter Grätschstand mit gebeugten Knien. Der Ball wird mittig zwischen den Beinen gehalten — eine Hand vorne, eine hinten. Aus dieser Position lässt du den Ball los und versuchst, ihn so schnell wie möglich mit beiden Händen wieder zu fassen, bevor er den Boden berührt. Die Hände müssen wechseln: Die Hand von vorne greift jetzt von hinten und umgekehrt. Zähle 30 Sekunden lang die korrekten Umgriffe.",
          tips: [
            "Wähle einen Ball, der gut in der Hand liegt — Basketball, Volleyball oder Gymnastikball funktionieren gut.",
            "Geh tief in die Grätsche — je näher der Ball am Boden ist, desto kürzer ist der Weg.",
            "Berührt der Ball deine Beine, ist es trotzdem kein Fehler — nur Bodenkontakt beendet den Versuch."
          ],
          materials: "Ein Ball (Volleyball, Basketball oder ähnlich), Timer 30 Sek., Klickzähler hilfreich",
          videos: [
            { id: "DKIsl6GuytE", title: "Ball umgreifen – Bewegungsablauf" }
          ],
          values: {
            "10-11": { variant: "30 Sek. – Anzahl Umgriffe", w: ["12", "17", "23"], m: ["15", "20", "25"] },
            "12-13": { variant: "30 Sek. – Anzahl Umgriffe", w: ["19", "25", "31"], m: ["23", "29", "36"] },
            "14-15": { variant: "30 Sek. – Anzahl Umgriffe", w: ["24", "31", "38"], m: ["29", "37", "44"] },
            "16-17": { variant: "30 Sek. – Anzahl Umgriffe", w: ["28", "36", "44"], m: ["34", "42", "51"] }
          }
        },
        {
          id: "kick_fangen",
          label: "Kick-Fangen",
          unit: "Wiederholungen in 30 Sek.",
          extended: true,
          short: "Lass den Ball fallen, kick ihn hoch, fang ihn — 30 Sekunden lang.",
          howTo: "Stell dich in eine markierte Fläche (2 × 2 m). Halte einen Fußball in den Händen. Lass den Ball senkrecht fallen, spiel ihn nach dem ersten Aufprall mit dem Fuß oder dem Knie über Kopfhöhe und fange ihn dann mit beiden Händen. Eine korrekte Abfolge zählt. Zähle 30 Sekunden lang.",
          tips: [
            "Lass den Ball wirklich fallen — nicht werfen.",
            "Der Ball muss über Kopfhöhe — sonst zählt der Versuch nicht.",
            "Übe in Ruhe, bis du den Bewegungsablauf flüssig hast."
          ],
          materials: "Fußball oder ähnlich großer Ball, markierte Fläche 2 × 2 m, Timer 30 Sek.",
          videos: [
            { id: "cZNFcLqbD7E", title: "Kick-Fangen – Bewegungsablauf" }
          ],
          values: {
            "10-11": { variant: "30 Sek. – Anzahl Ballkontakte", w: ["5", "7", "9"], m: ["7", "10", "14"] },
            "12-13": { variant: "30 Sek. – Anzahl Ballkontakte", w: ["6", "8", "11"], m: ["9", "13", "16"] },
            "14-15": { variant: "30 Sek. – Anzahl Ballkontakte", w: ["7", "9", "12"], m: ["11", "14", "18"] },
            "16-17": { variant: "30 Sek. – Anzahl Ballkontakte", w: ["7", "10", "13"], m: ["12", "16", "19"] }
          }
        },
        {
          id: "t_lauf",
          label: "Koordinations-T-Lauf",
          unit: "Sekunden",
          extended: true,
          short: "Sprint, Side Steps und Rückwärtslauf auf einem T-Parcours.",
          howTo: "Vier Hütchen werden in T-Form aufgestellt: Hütchen A am Start, Hütchen B 9 m davor, Hütchen C 4,5 m links von B, Hütchen D 4,5 m rechts von B. Ablauf: Sprint von A zu B, Side Steps zu C, Side Steps quer zu D, Side Steps zurück zu B, Rückwärtslauf zu A. Jedes Hütchen muss mit der Hand berührt werden. Gemessen wird die Zeit auf Zehntelsekunde genau.",
          tips: [
            "Beine bei den Side Steps nicht überkreuzen — das ist ein Fehler.",
            "Bei Rückwärtslauf die Hüfte gerade halten, nicht zur Seite drehen.",
            "Übe die Reihenfolge der Hütchen mehrmals langsam, bevor du auf Zeit läufst."
          ],
          materials: "4 Hütchen (flache Markierungsteller), Stoppuhr",
          videos: [
            { id: "7oBZg_zloO0", title: "Koordinations-T-Lauf – kompletter Ablauf" }
          ],
          values: {
            "10-11": { variant: "Sprint vor – Side Steps – Rückwärtslauf", w: ["18,7", "17,3", "15,8"], m: ["18,3", "16,8", "15,3"] },
            "12-13": { variant: "Sprint vor – Side Steps – Rückwärtslauf", w: ["16,9", "15,4", "13,9"], m: ["16,5", "15,0", "13,5"] },
            "14-15": { variant: "Sprint vor – Side Steps – Rückwärtslauf", w: ["15,5", "14,1", "12,6"], m: ["15,1", "13,6", "12,1"] },
            "16-17": { variant: "Sprint vor – Side Steps – Rückwärtslauf", w: ["14,7", "13,2", "11,7"], m: ["14,1", "12,6", "11,2"] }
          }
        },
        {
          id: "koord_leiter",
          label: "Koordinationsleiter",
          unit: "Sekunden",
          extended: true,
          short: "Durchlaufe die Koordinationsleiter mit einer altersspezifischen Schrittfolge.",
          howTo: "Eine 12-sprossige Koordinationsleiter (oder mit Kreide/Klebeband markiert) wird ausgelegt. Du läufst sie einmal in eine Richtung durch, drehst dich, und läufst dann ohne Pause wieder zurück. Die Schrittfolge hängt von deiner Altersgruppe ab: 10-11 Doppelschritt seitwärts, 12-13 Ickey Shuffle, 14-15 „3 plus 1\", 16-17 „Zwei-Zwei seitwärts\". Gemessen wird die Gesamtzeit beider Durchläufe.",
          tips: [
            "Lerne die Schrittfolge erst langsam, ohne Zeitdruck. Erst wenn sie sicher sitzt, gibst du Gas.",
            "Bleib auf den Ballen — flacher und schneller Bodenkontakt.",
            "Schau nicht ständig auf die Felder, sondern entwickele Rhythmus."
          ],
          materials: "Koordinationsleiter (12 Sprossen, ca. 40 cm Abstand) oder Kreide-Markierung, Stoppuhr",
          values: {
            "10-11": {
              variant: "Doppelschritt seitwärts (Hin & Rückweg)",
              w: ["26,1", "22,7", "19,3"], m: ["26,1", "22,7", "19,3"],
              videos: [
                { id: "kreLlChQw_o", title: "Doppelschritt seitwärts – Schrittfolge für 10–11 Jahre" }
              ]
            },
            "12-13": {
              variant: "Ickey Shuffle (Hin & Rückweg)",
              w: ["29,2", "25,8", "22,4"], m: ["29,2", "25,8", "22,4"],
              videos: [
                { id: "8aajoTCVw9E", title: "Ickey Shuffle – Schrittfolge für 12–13 Jahre" }
              ]
            },
            "14-15": {
              variant: "3 plus 1 (Hin & Rückweg)",
              w: ["33,5", "30,1", "26,7"], m: ["33,5", "30,1", "26,7"],
              videos: [
                { id: "PEDA2w6nkGw", title: "3 plus 1 – Schrittfolge für 14–15 Jahre" }
              ]
            },
            "16-17": {
              variant: "Zwei-Zwei seitwärts (Hin & Rückweg)",
              w: ["33,2", "29,8", "26,4"], m: ["33,2", "29,8", "26,4"],
              videos: [
                { id: "R59nUxu0jDI", title: "Zwei-Zwei seitwärts – Schrittfolge für 16–17 Jahre" }
              ]
            }
          }
        }
      ]
    }
  ]
};

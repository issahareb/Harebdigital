/** Shared service, contact and project copy. Public language selection is URL-based; see lib/locale.ts. */

export const HD_SPRACHEN = ['de', 'en', 'es'] as const
export type HdLang = (typeof HD_SPRACHEN)[number]
export const HD_STANDARD: HdLang = 'de'

export const HD_HREFLANG: Record<HdLang, string> = { de: 'de-DE', en: 'en', es: 'es' }

/** Der Name des Kekses, in dem eine ausdrückliche Wahl liegt. */
export const HD_KEKS = 'hd-sprache'

export function istHdLang(wert: string | null | undefined): wert is HdLang {
  return !!wert && (HD_SPRACHEN as readonly string[]).includes(wert)
}

/**
 * Die Sprache der Landingpage, aus drei Quellen in dieser Reihenfolge.
 *
 * 1. Die ausdrückliche Wahl aus dem Schalter. Wer einmal umgestellt hat, will
 *    nicht bei jedem Aufruf wieder umstellen.
 * 2. Die Einstellung des Browsers, sofern wir die Sprache haben.
 * 3. Das Land. Und hier steht bewusst nicht Deutsch als Rückfall: wer aus
 *    Frankreich mit französischem Browser kommt, versteht Englisch eher als
 *    Deutsch. Deutsch bleibt der Rückfall nur innerhalb Deutschlands.
 *
 * Das Land kommt aus dem Kopf, den Cloudflare setzt. Fehlt der, wird die
 * Region aus dem Accept-Language-Kopf gelesen ("de-AT" nennt AT). Das ist kein
 * Ersatz, aber besser als zu raten.
 */
export function hdSprache({
  gewaehlt,
  akzeptiert,
  land,
}: {
  gewaehlt?: string | null
  akzeptiert?: string | null
  land?: string | null
}): HdLang {
  if (istHdLang(gewaehlt)) return gewaehlt

  const ausBrowser = sprachAusKopf(akzeptiert)
  if (ausBrowser) return ausBrowser

  const wo = (land || regionAusKopf(akzeptiert) || '').toUpperCase()
  return wo === 'DE' ? 'de' : 'en'
}

/** Die Region der ersten Sprachmarke: "de-AT,de;q=0.9" nennt AT. */
export function regionAusKopf(kopf: string | null | undefined): string | null {
  const erste = kopf?.split(',')[0]?.split(';')[0]?.trim()
  const teil = erste?.split('-')[1]
  return teil && teil.length === 2 ? teil.toUpperCase() : null
}

/**
 * Die beste unterstützte Sprache aus einem Accept-Language-Kopf.
 *
 * Der Kopf ist eine nach Gewicht sortierte Wunschliste ("de-CH,de;q=0.9,
 * en;q=0.8"). Gewertet wird nach dem angegebenen q-Wert und nicht nach der
 * Reihenfolge, denn die Reihenfolge ist nicht vorgeschrieben. Verglichen wird
 * nur das Sprachkürzel vor dem Bindestrich: wer de-AT spricht, soll die
 * deutsche Fassung sehen und nicht die deutsche verfehlen.
 *
 * Null, wenn keine der genannten Sprachen dabei ist. Was dann gilt, entscheidet
 * hdSprache und nicht diese Funktion: hier steht nur, was im Kopf steht.
 */
export function sprachAusKopf(kopf: string | null | undefined): HdLang | null {
  if (!kopf) return null

  let beste: HdLang | null = null
  let bestesGewicht = -1

  for (const teil of kopf.split(',')) {
    const [markeRoh, ...rest] = teil.trim().split(';')
    const marke = markeRoh.trim().toLowerCase()
    if (!marke) continue

    const q = rest
      .map((r) => r.trim())
      .find((r) => r.startsWith('q='))
      ?.slice(2)
    const gewicht = q === undefined ? 1 : Number.parseFloat(q)
    if (!Number.isFinite(gewicht) || gewicht <= bestesGewicht) continue

    const kuerzel = marke.split('-')[0]
    const treffer = HD_SPRACHEN.find((l) => l === kuerzel)
    if (!treffer) continue

    beste = treffer
    bestesGewicht = gewicht
  }

  return beste
}

export type HdTexte = {
  meta: { titel: string; beschreibung: string }
  ctaHaupt: string
  buehne: {
    /* Zwei Zeilen, und zwar als zwei Angaben. Ein einziger Satz haette dem
       Zeilenumbruch des Browsers vertraut, und der bricht dort, wo die Breite
       endet, nicht dort, wo der Sinn endet: aus "Gefunden werden. Arbeit
       loswerden." wurde auf dem Telefon "Gefunden / werden. Arbeit /
       loswerden." Zwei Zeilen, zwei Felder. */
    titelOben: string
    titelUnten: string
    vorspann: string
    arbeitenAnsehen: string
    /* Der Text zum Standbild des Films. Es ist kein Schmuck, sondern das
       erste Bild der Seite — wer es nicht sieht, soll wissen, was dort
       steht. */
    bildAlt: string
    /* Der Hinweis nach unten, solange der Film noch nicht laeuft. */
    hinweis: string
  }
  /* Das Kartenmenue in der Kopfzeile.
   *
   * `{formular}` in einem `href` wird von der Komponente durch den
   * sprachrichtigen Pfad zur Anfrageseite ersetzt. Sonst muesste hier drei
   * Mal dieselbe Adresse mit unterschiedlichem Sprachpraefix stehen, und
   * beim naechsten Sprachwechsel waere genau eine davon vergessen. */
  menue: {
    oeffnen: string
    schliessen: string
    karten: { label: string; links: { label: string; href: string }[] }[]
  }
  probleme: { titel: string; punkte: string[] }
  behauptung: string
  /* Der Filmabschnitt.
   *
   * Der Film lag zuerst auf der Buehne ganz oben und wurde beim Scrollen
   * durchgefahren. Dort steht jetzt die Statue, und der Film hat einen
   * eigenen Abschnitt weiter unten bekommen — er verliert dabei nichts,
   * denn was er zeigt, ist eine Behauptung ueber die Arbeit und keine
   * Begruessung. */
  bewegtbild: {
    label: string
    titel: string
    text: string
    bildAlt: string
  }
  /* Der Abschnitt "Was ich verstanden habe".
   *
   * Er ist die einzige Stelle der Seite, an der nicht die Arbeit belegt wird,
   * sondern der Grund dafuer. Zwei Abschnitte, die aufeinander aufbauen und
   * deshalb eine Liste sind und keine zwei Felder: die Reihenfolge traegt das
   * Argument. Der Kanal misst und verschiebt seine Gewichte -> der Mensch
   * verschiebt sich nicht.
   *
   * Jeder Abschnitt bekommt genau ein Motiv und einen eigenen Bildschirm.
   * Vorher standen alle drei auf einer festgehaltenen Buehne hintereinander;
   * das las sich als ein einziger langer Abschnitt mit einem Bilderstapel
   * darin, und genau das war der Einwand.
   *
   * `wortLinks` und `wortRechts` sind die zwei Haelften eines einzigen
   * grossen Wortes. Dazwischen steht das Motiv. Der Trennpunkt muss in jeder
   * Sprache an einer Stelle liegen, an der das Wort noch lesbar zerfaellt:
   * ALGO|RITHMUS, ALGO|RITHM, ALGO|RITMO. */
  verstaendnis: {
    label: string
    akte: {
      wortLinks: string
      wortRechts: string
      titel: string
      /* Absaetze, nicht ein Absatz. Der erste Akt traegt zwei Aussagen —
         wonach sortiert wird, und dass sich das verschiebt — und die gehoeren
         in denselben Abschnitt, weil die zweite ohne die erste nichts
         bedeutet. */
      text: string[]
    }[]
    /* Die Groessen, nach denen sortiert wird. Sie laufen als Schrift auf der
       Unendlichkeitsschleife mit — deshalb kurz, deshalb ohne Punkt. */
    kriterien: string[]
    sekunden: { zahl: string; label: string }
    statueAlt: string
    knotenAlt: string
    falterAlt: string
  }
  arbeiten: {
    label: string
    titel: string
    kundeLabel: string
    kundeName: string
    kundeText: string
    werte: { wert: string; name: string }[]
    quelle: string
    seiteAnsehen: string
    belegAlt: string
    ansehen: string
    projekte: { name: string; alt: string; text: string; url: string | null }[]
  }
  werkschau: {
    label: string
    vorher: string
    weiter: string
    /* Die Beschriftung einer Folie fuer Vorlesegeraete. Sichtbar steht in der
       Galerie nichts als das Bild — die Namen der Projekte standen frueher
       darunter und sind bewusst weg. `{n}` und `{von}` werden ersetzt. */
    folie: string
  }
  leistungen: {
    label: string
    titel: string
    vorspann: string
    /* Die Beschriftung der beiden Verweise auf jeder Kachel. */
    anfragen: string
    mehr: string
    /* `slug` ist in allen drei Sprachen derselbe. Das ist Absicht: die
       Adresse einer Leistung soll sich nicht aendern, wenn jemand die Sprache
       umstellt, und sie ist der Schluessel, mit dem das Formular die richtige
       Auswahl vorbelegt. Deutsch, weil der Markt deutsch ist. */
    punkte: {
      n: string
      slug: string
      titel: string
      text: string
      /* Die Detailseite unter /leistungen/<slug>. */
      detail: {
        vorspann: string
        dabei: { titel: string; punkte: string[] }
        ablauf: { titel: string; text: string }
        preis: { titel: string; text: string }
      }
    }[]
  }
  /* Der Reichweiten-Beleg.
   *
   * Steht als eigener Abschnitt zwischen den Leistungen und dem Ablauf und
   * behauptet etwas, was die Seite sonst nirgends behauptet: dass hier auch
   * die Aufmerksamkeit VOR der Website herkommt.
   *
   * Die Zahlen stehen als Text neben den Bildschirmfotos, nicht nur darin.
   * Eine Zahl, die ausschliesslich in einem Bild steht, existiert fuer
   * Google, fuer ein Vorlesegeraet und fuer jede Antwortmaschine nicht — und
   * die Zahlen sind hier das ganze Argument.
   *
   * `konten` und `belege` sind Listen, weil weitere dazukommen. Ein Eintrag
   * ist ein Objekt hier und zwei Dateien in public/social. */
  social: {
    label: string
    titel: string
    vorspann: string
    /* Ordnet die Konten ein, bevor jemand sie falsch liest: Versuchsaufbau,
       nicht Arbeitsprobe aus seiner Branche. */
    einordnung: string
    konten: {
      name: string
      handle: string
      netz: string
      art: string
      bild: string
      alt: string
      zahlen: { wert: string; label: string }[]
    }[]
    belege: {
      bild: string
      alt: string
      titel: string
      text: string
      zahlen: { wert: string; label: string }[]
    }[]
    hookTitel: string
    hookAbsaetze: string[]
  }
  ablauf: { label: string; titel: string; schritte: { n: string; t: string; b: string }[] }
  fakten: { zahl: number; suffix: string; v: string }[]
  schluss: { titel: string; text: string }
  fuss: { inhaber: string; impressum: string; datenschutz: string; portfolio: string }
  /* Die Kontaktseite.
   *
   * Sie ist beim Umzug auf die eigene Domain dazugekommen. Unter issahareb.me
   * fuehrte der Ruf zur Tat auf `/anfrage` — ein Formular, das seine Eingaben
   * an den L.U.K.A.S.-Server weiterreicht. Das haengt an einem fremden Dienst
   * und einem Token, die hier nicht liegen, und ist deshalb nicht mitgekommen.
   *
   * Was stattdessen dasteht, ist die ehrliche Fassung derselben Sache: die
   * beiden Wege, auf denen eine Anfrage tatsaechlich ankommt. Ein Formular,
   * das nur so tut, waere schlechter als keines — der Besucher glaubt, er habe
   * Kontakt aufgenommen, und hoert auf, es zu versuchen. */
  kontakt: {
    titel: string
    beschreibung: string
    vorspann: string
    epost: string
    telefon: string
    sitz: string
    zurueck: string
    /* Das Formular.
     *
     * Es traegt keinen eigenen Empfaenger: es setzt eine E-Mail auf und
     * uebergibt sie dem Mailprogramm des Besuchers. Das ist bewusst so —
     * ein Formular, das "danke" sagt und die Nachricht verwirft, ist
     * schlechter als keines, und einen Versand ueber einen eigenen Dienst
     * gibt es hier noch nicht. So sieht der Absender, was rausgeht, hat es
     * selbst im Postausgang, und nichts kann still verlorengehen. */
    formular: {
      titel: string
      leistung: string
      leistungLeer: string
      name: string
      epost: string
      nachricht: string
      nachrichtHinweis: string
      senden: string
      hinweis: string
    }
  }
}

const DE: HdTexte = {
  meta: {
    titel: 'Hareb Digital: Websites, die gefunden werden und Arbeit abnehmen',
    beschreibung:
      'Hareb Digital baut Websites, Webanwendungen und Automatisierungen für kleine und mittlere Unternehmen. Ein Ansprechpartner, fester Preis, Antwort in 24 Stunden.',
  },
  ctaHaupt: 'Projekt anfragen',
  buehne: {
    titelOben: 'Lass uns gemeinsam',
    titelUnten: 'etwas Einzigartiges bauen.',
    vorspann:
      'Websites und Programme für Betriebe ohne IT-Abteilung. Kein Baukasten, kein Plugin-Stapel, keine Agentur-Kette: du sprichst mit dem, der es baut. Du sagst mir, was dich stört, ich sage dir, was es kostet.',
    arbeitenAnsehen: 'Arbeiten ansehen',
    bildAlt:
      'Eine schwarze Büste mit zurückgelegtem Kopf, das Gesicht von leuchtend grüner Masse überzogen, die am Kinn herabläuft.',
    hinweis: 'Scrollen',
  },
  menue: {
    oeffnen: 'Menü öffnen',
    schliessen: 'Menü schließen',
    karten: [
      {
        label: 'Arbeiten',
        links: [
          { label: 'Kundenprojekt', href: '#arbeiten' },
          { label: 'Websites', href: '#werkschau' },
          { label: 'Social Media', href: '#social' },
        ],
      },
      {
        label: 'Angebot',
        links: [
          { label: 'Was ich mache', href: '#leistungen' },
          { label: 'So läuft es', href: '#ablauf' },
        ],
      },
      {
        label: 'Loslegen',
        links: [
          { label: 'Projekt anfragen', href: '{formular}' },
          { label: 'Portfolio', href: 'https://issahareb.me' },
        ],
      },
    ],
  },
  probleme: {
    titel: 'Kommt dir einer dieser Sätze bekannt vor?',
    punkte: [
      'Das Telefon klingelt nicht mehr so wie früher.',
      'Bei Google finden uns nur die, die uns sowieso kennen.',
      'Die Seite sieht aus wie 2014.',
      'Auf dem Handy ist alles verrutscht.',
      'Angebote schreiben dauert jedes Mal ewig.',
      'Die Agentur meldet sich seit Wochen nicht.',
      'Barrierefrei soll sie jetzt auch noch sein.',
      'Drei Leute reden mit, gebaut hat sie keiner davon.',
    ],
  },
  behauptung:
    'Genau das ist die Arbeit. Du bekommst keine Präsentation, sondern eine Seite, die läuft. Kein Baukasten, kein Abo, keine Warteschleife. Klemmt etwas, schreibst du mir und nicht einer Hotline.',
  bewegtbild: {
    label: 'Wie ich arbeite',
    titel: 'Der Nebel zieht ab, der Schreibtisch bleibt stehen.',
    text: 'Am Anfang eines Projekts sieht niemand etwas: nicht du, weil du kein Angebot lesen kannst, das aus Fachbegriffen besteht, und nicht ich, weil ich noch nicht weiß, woran es bei dir wirklich klemmt. Das Bild klärt sich beim Bauen, nicht davor. Scroll — dann siehst du, was ich meine.',
    bildAlt:
      'Ein Schreibtisch auf einem Berggipfel über dem Nebelmeer, dahinter geht die Sonne über den Tälern auf.',
  },
  verstaendnis: {
    label: 'Was ich verstanden habe',
    akte: [
      {
        wortLinks: 'ALGO',
        wortRechts: 'RITHMUS',
        titel: 'Ich weiß, wonach sortiert wird — und dass es sich verschiebt.',
        text: [
          'Kein Kanal zeigt ein Video, weil es gut ist. Er zeigt es, weil Zahlen es sagen: wie lange jemand bleibt, ob er zurückspult, ob er speichert, ob er es weiterschickt. Diese Größen sind kein Geheimnis. Man muss sie nur ernst nehmen, bevor der erste Schnitt sitzt.',
          'Was diesen Monat oben steht, zählt im nächsten weniger. Die Gewichtung wird geändert, ohne Ankündigung, und jeder Trick, der auf genau eine Einstellung gebaut war, stirbt mit ihr. Deshalb hänge ich nichts an einen Trick.',
        ],
      },
      {
        wortLinks: 'DREI',
        wortRechts: 'SEKUNDEN',
        titel: 'Der Mensch verschiebt sich nicht.',
        text: [
          'Drei Sekunden entscheiden, ob weitergewischt wird. In dieser Zeit liest niemand, er erkennt: ein Gesicht, eine Bewegung, etwas, das nicht aufgeht. Wer das trifft, muss den Algorithmus nicht überlisten. Er liefert ihm genau das Signal, auf das der wartet.',
        ],
      },
    ],
    kriterien: [
      'Verweildauer',
      'Wiedergaberate',
      'Gespeichert',
      'Geteilt',
      'Zurückgespult',
      'Kommentiert',
      'Profilaufruf',
    ],
    sekunden: { zahl: '3', label: 'Sekunden, bevor entschieden ist' },
    statueAlt:
      'Schwarze Büste mit zurückgelegtem Kopf, das Gesicht von leuchtend grüner Masse überzogen, die am Kinn herabläuft',
    knotenAlt: 'Ein endlos rotierender Knoten, dessen Oberfläche vollständig aus Ziffern besteht',
    falterAlt: 'Eine schillernde Form, die sich aufklappt wie zwei Flügel',
  },
  arbeiten: {
    label: 'Arbeiten',
    /* Geschuetzte Leerzeichen: "online gestellt" und "im Betrieb" sind je
       eine Aussage. Der Zeilenumbruch darf zwischen ihnen liegen, nicht in
       ihnen. Ohne das stand hier "Gebaut, online / gestellt, im Betrieb." */
    titel: 'Gebaut, online gestellt, im Betrieb.',
    kundeLabel: 'Kundenprojekt',
    kundeName: 'Taxi B&B Essen',
    kundeText:
      'Buchungen sofort oder auf Termin, ein Verwaltungsbereich mit eigener Datenbank, automatische E-Mails und technisches SEO bis hinunter zu den strukturierten Daten.',
    werte: [
      { wert: '92', name: 'Onpage' },
      { wert: '99', name: 'Technik' },
      { wert: '97', name: 'Struktur' },
      { wert: '80', name: 'Inhalt' },
    ],
    quelle: 'Gemessen von seobility.net am 28.07.2026.',
    seiteAnsehen: 'Seite ansehen',
    belegAlt: 'Buchungsstrecke und Startseite von taxibbessen.de',
    ansehen: 'Ansehen',
    projekte: [
      {
        name: 'GuardianGrid',
        alt: 'Anmeldebereich von guardiangrid.io',
        text: 'Eine eigene Webanwendung für Destiny 2: GuardianGrid verbindet Spielkonten und bereitet Spieldaten übersichtlich auf. Von der Anmeldung bis zur Datenverarbeitung habe ich die Anwendung entwickelt und betreibe sie auf eigener Infrastruktur.',
        url: 'https://www.guardiangrid.io',
      },
      {
        name: 'L.U.K.A.S.',
        alt: 'Oberfläche des KI-Agenten L.U.K.A.S.',
        text: 'Eigenes Produkt: ein KI-Agent mit dauerhaftem Gedächtnis, der echte Aufgaben übernimmt statt nur zu antworten.',
        url: null,
      },
    ],
  },
  werkschau: {
    label: 'Websites',
    vorher: 'Vorheriges Bild',
    weiter: 'Nächstes Bild',
    folie: 'Bild {n} von {von}',
  },
  leistungen: {
    label: 'Leistungen',
    titel: 'Was dein Betrieb braucht.',
    vorspann:
      'Wir klären gemeinsam, welche Änderungen sinnvoll sind und was zuerst umgesetzt werden sollte.',
    anfragen: 'Jetzt unverbindlich anfragen',
    mehr: 'Mehr Infos',
    punkte: [
      {
        n: '01',
        slug: 'neue-website',
        titel: 'Webdesign & Entwicklung',
        text: 'Eine individuelle Website mit klaren Inhalten, passendem Design und einem einfachen Weg zur Anfrage. Für Handy und Rechner entwickelt.',
        detail: {
          vorspann:
            'Deine Website soll zeigen, was du anbietest, und die Kontaktaufnahme einfach machen. Ich entwickle dafür Struktur, Gestaltung und Funktionen passend zu deinem Unternehmen.',
          dabei: {
            titel: 'Was dabei entsteht',
            punkte: [
              'Eine Seitenstruktur und Texte, die wir gemeinsam auf dein Angebot und deine Zielgruppe abstimmen',
              'Ein individuelles Design für Handy, Tablet und Rechner',
              'Technische Grundlagen für Suchmaschinen: klare Seitenstruktur, schnelle Ladezeiten und strukturierte Daten',
              'Barrierearme Bedienung mit Tastaturnavigation, verständlicher Struktur und geprüften Kontrasten',
              'Passende Kontaktwege, etwa ein Anfrageformular oder eine Buchungsfunktion im vereinbarten Umfang',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Wir klären Ziele und Anforderungen und stimmen den Entwurf ab. Während der Umsetzung siehst du Zwischenstände. Vor der Veröffentlichung prüfen wir Inhalte und Funktionen gemeinsam. Wie du Inhalte später pflegen möchtest, legen wir zu Beginn fest.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Als Orientierung: zwei bis drei Wochen für eine Landingpage, vier bis acht Wochen für eine mehrseitige Website. Vor dem Start erhältst du einen vereinbarten Zeitplan und ein Angebot mit festem Preis. Mögliche laufende Kosten werden separat ausgewiesen.',
          },
        },
      },
      {
        n: '02',
        slug: 'website-ueberarbeiten',
        titel: 'Website-Relaunch',
        text: 'Die vorhandene Website gezielt verbessern: Gestaltung, Ladezeiten und Bedienung prüfen, sinnvolle Inhalte und Funktionen erhalten.',
        detail: {
          vorspann:
            'Deine Website ist da, passt aber nicht mehr zu deinem Unternehmen oder ist umständlich zu bedienen? Ich prüfe, was sich weiterverwenden lässt, und überarbeite Gestaltung, Inhalte und Technik dort, wo es sinnvoll ist.',
          dabei: {
            titel: 'Was wir überarbeiten',
            punkte: [
              'Bestandsaufnahme mit einer klaren Empfehlung, was bleibt und was sich ändern sollte',
              'Gestaltung und Seitenstruktur passend zu deinem heutigen Angebot',
              'Prüfung und Optimierung von Bildern, Code und Ladezeiten',
              'Bedienung und Darstellung auf Handy, Tablet und Rechner',
              'Prüfung und Verbesserung der Zugänglichkeit im vereinbarten Projektumfang',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Nach einem ersten Blick auf deine Website besprechen wir die wichtigsten Schwachstellen. Wir wägen eine gezielte Überarbeitung gegen einen Neuaufbau ab und vereinbaren den Umfang. Bestehende Inhalte, Funktionen und Seitenadressen berücksichtige ich bei der Planung.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Je nach Umfang ist eine Überarbeitung in etwa ein bis vier Wochen möglich. Die erste Einschätzung ist kostenlos. Für die vereinbarten Änderungen erhältst du vorab einen festen Preis und einen Zeitplan.',
          },
        },
      },
      {
        n: '03',
        slug: 'automatisierung',
        titel: "Automatisierung",
        text: "Vom Kauf bis zum Versand: Ich verbinde Shop, E-Mail, Buchhaltung und weitere Systeme zu passenden Abläufen.",
        detail: {
          vorspann: "Nach einem Kauf erhält dein Kunde automatisch eine Bestätigungsmail. Im Hintergrund können Zahlung, Rechnung, Lagerbestand und Versand zusammenspielen. Ich verbinde deine Systeme zu einfachen oder komplexen Abläufen und lege mit dir fest, wann sie selbstständig laufen und wo du freigibst.",
          dabei: {
            titel: "Konkrete Beispiele für deinen Betrieb",
            punkte: [
              "Online-Shop: Nach Eingang der Bestellung eine Bestätigungsmail mit den Bestelldaten versenden; nach bestätigter Zahlung die nächsten Schritte auslösen.",
              "Auftragsabwicklung: Rechnungen aus Bestelldaten erstellen, an die Buchhaltung übergeben und den Lagerbestand abgleichen. Fehlende Artikel lösen eine interne Aufgabe aus.",
              "Versand: Bezahlte, lieferbare Bestellungen an den Versand übergeben und Kunden die Sendungsverfolgung schicken, sobald eine Sendungsnummer vorliegt.",
              "Anfragen und Angebote: Formulardaten prüfen, im Kundensystem speichern, dem passenden Ansprechpartner zuweisen und einen Angebotsentwurf zur Freigabe vorbereiten.",
              "Termine und offene Vorgänge: Buchungen mit dem Kalender abgleichen, Erinnerungen versenden und dein Team auf ausstehende Rückmeldungen hinweisen.",
            ],
          },
          ablauf: {
            titel: "Was im Hintergrund passiert",
            text: "Ein Ereignis startet den Ablauf, etwa eine neue Bestellung oder eine bestätigte Zahlung. Über Schnittstellen tauschen die beteiligten Programme Daten aus. Der Ablauf prüft Pflichtangaben und Bedingungen: Ist bezahlt? Ist der Artikel verfügbar? Danach führt er die passenden Schritte in der richtigen Reihenfolge aus und speichert den Bearbeitungsstand. Doppelte Meldungen werden abgefangen, damit nicht zweimal dieselbe Rechnung entsteht. Schlägt ein Schritt fehl, kann er erneut versucht oder mit einer Meldung an dein Team zur Prüfung angehalten werden. Welche Verbindungen möglich sind und welche Schritte du freigibst, klären wir vorab und testen den Ablauf einschließlich typischer Ausnahmen.",
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Ein einfacher Ablauf lässt sich häufig in ein bis zwei Wochen umsetzen. Die Dauer hängt von den beteiligten Programmen und Schnittstellen ab. Du erhältst einen festen Projektpreis; mögliche Kosten für externe Dienste klären wir vorab.',
          },
        },
      },
      {
        n: '04',
        slug: 'gefunden-werden',
        titel: 'SEO & AEO',
        text: 'Technik und Inhalte so aufbereiten, dass Suchmaschinen und KI-Antwortsysteme dein Angebot besser verstehen können.',
        detail: {
          vorspann:
            'Damit Interessenten dein Angebot finden können, müssen Suchmaschinen und KI-Antwortsysteme deine Website verstehen. Ich prüfe Technik, Seitenstruktur und Inhalte und verbessere die Grundlagen für deine Sichtbarkeit.',
          dabei: {
            titel: 'Was ich prüfe und verbessere',
            punkte: [
              'Technisches SEO: Erreichbarkeit für Suchmaschinen, Seitenstruktur, Ladezeiten und strukturierte Daten',
              'Suchbegriffe, die zu deinem Angebot, deiner Zielgruppe und gegebenenfalls deiner Region passen',
              'Einheitliche Unternehmensangaben auf deiner Website und in deinem Google-Unternehmensprofil',
              'Verständliche Antworten auf Kundenfragen, die auch KI-Antwortsysteme als Quelle nutzen können',
              'Auswertung verfügbarer Daten zu Sichtbarkeit, Suchanfragen und Website-Besuchen',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Zuerst erfasse ich den aktuellen Stand. Anschließend priorisieren wir Verbesserungen nach erwartetem Nutzen und Aufwand. Nach der Umsetzung prüfen wir die Entwicklung anhand verfügbarer Daten. Platzierungen und Nennungen in KI-Antworten lassen sich nicht garantieren.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Die erste Analyse dauert meist wenige Tage. Daraus ergeben sich Umfang, Zeitplan und Festpreis für die Umsetzung. Veränderungen der Sichtbarkeit beobachten wir über einen passenden Zeitraum, da sie nicht unmittelbar nach einer Änderung eintreten müssen.',
          },
        },
      },
    ],
  },
  social: {
    label: 'Social Media',
    titel: 'Reichweite, für die kein Cent Werbebudget bezahlt wurde.',
    vorspann:
      'Bevor jemand deine Website besucht, muss er von dir gehört haben. Genau das baue ich auch: Inhalte, die von allein laufen. Zwei Konten, beide ohne einen Euro Mediabudget.',
    einordnung:
      'Die Konten sind Versuchsaufbauten und keine Arbeitsproben aus deiner Branche. Übertragbar ist nicht das Thema der Videos, sondern der Aufbau der ersten drei Sekunden. Der entscheidet darüber, ob ein Video überhaupt gesehen wird.',
    konten: [
      {
        name: 'dailyraphood',
        handle: '@dailyraphood',
        netz: 'Instagram',
        art: 'Rap- und Hip-Hop-Konto, rein organisch aufgebaut',
        bild: 'drh-profil',
        alt: 'Instagram-Profil dailyraphood mit 21,3 Tausend Abonnenten und 631 Beiträgen',
        zahlen: [
          { wert: '21.300', label: 'Abonnenten' },
          { wert: '631', label: 'Beiträge' },
          { wert: '0 €', label: 'Werbebudget' },
        ],
      },
      {
        name: 'Mr Han',
        handle: '@issa3701',
        netz: 'TikTok',
        art: 'Privates Konto, rein organisch gewachsen',
        bild: 'mrhan-profil',
        alt: 'TikTok-Profil Mr Han, @issa3701, mit 13.903 Followern und 538.113 Likes',
        zahlen: [
          { wert: '13.903', label: 'Follower' },
          { wert: '538.113', label: 'Likes' },
          { wert: '0 €', label: 'Werbebudget' },
        ],
      },
    ],
    belege: [
      {
        bild: 'drh-beitrag',
        alt: 'Instagram-Beitragsstatistik: 1.322.523 erreichte Konten, 1.582 Abonnements, 45.956 Likes, 575 Kommentare',
        titel: 'Ein einziger Beitrag',
        text: 'Über 1.500 neue Follower aus einem Video, 1,3 Millionen erreichte Konten, und 99 Prozent davon waren vorher keine Follower. Getragen hat das nicht die Größe des Kontos, sondern der Anfang des Videos.',
        zahlen: [
          { wert: '1.582', label: 'neue Follower aus einem Beitrag' },
          { wert: '1.322.523', label: 'erreichte Konten' },
          { wert: '45.956', label: 'Likes' },
          { wert: '575', label: 'Kommentare' },
          { wert: '30.905', label: 'mal geteilt' },
          { wert: '11.794', label: 'gespeichert' },
        ],
      },
      {
        bild: 'drh-woche',
        alt: 'Instagram-Wochenstatistik: 1.724.151 Impressionen, 405.352 erreichte Konten, 4.724 Profilaufrufe',
        titel: 'Eine Woche',
        text: '1,7 Millionen Impressionen in sieben Tagen, dazu 4.724 Profilaufrufe. Eine Anzeige hört auf zu wirken, sobald das Budget aufgebraucht ist. Hier war nie eins da.',
        zahlen: [
          { wert: '1.724.151', label: 'Impressionen in sieben Tagen' },
          { wert: '405.352', label: 'erreichte Konten' },
          { wert: '4.724', label: 'Profilaufrufe' },
        ],
      },
    ],
    hookTitel: 'Warum ein Video läuft und fast alle anderen nicht',
    hookAbsaetze: [
      'Die Frage kam beim Scrollen, nicht aus einem Marketingbuch: warum habe ich dieses eine Video bis zum Ende gesehen, obwohl ich das davor nach nicht einmal zwei Sekunden weggewischt habe?',
      'Die Antwort ist ein Moment, der den Zuschauer dazu bringt, sich selbst eine Frage zu stellen. Kein Versprechen, keine Ankündigung, sondern etwas, das nicht aufgeht. Solange die Frage offen ist, bleibt er.',
      'Ein Beispiel: jemand taucht einen übergroßen Keks in Milch und beißt anschließend an der trockenen Stelle ab. Wozu dann das Eintauchen? Man schaut weiter, um es herauszufinden — und genau so lange dauert das Video.',
      'Für einen Betrieb ist das dieselbe Mechanik. Statt zu zeigen, was ein Produkt kann, wird ein Moment gebaut, der nicht zusammenpasst, und das Produkt löst ihn auf. Genau dort wird aus einem Video eine Anzeige, die niemand überspringt.',
    ],
  },
  ablauf: {
    label: 'So läuft es',
    titel: 'Vier Schritte, kein Kleingedrucktes.',
    schritte: [
      {
        n: '01',
        t: 'Du erzählst',
        b: 'Per E-Mail oder im Gespräch beschreibst du dein Unternehmen und dein Ziel. Wir klären, was du brauchst und welche Informationen für die Planung noch fehlen.',
      },
      {
        n: '02',
        t: 'Du bekommst ein Angebot',
        b: 'Ich melde mich in der Regel innerhalb von 24 Stunden. Sobald die Anforderungen geklärt sind, erhältst du ein Angebot mit Leistungsumfang, Zeitplan und Festpreis.',
      },
      {
        n: '03',
        t: 'Du prüfst den Entwurf',
        b: 'Für Website-Projekte ist auf Wunsch ein kostenloser erster Entwurf möglich. Den Umfang stimmen wir vorher ab. Danach entscheidest du über die Zusammenarbeit.',
      },
      {
        n: '04',
        t: 'Dein Projekt geht online',
        b: 'Nach der gemeinsamen Prüfung geht dein Projekt online. Wenn ich deine Website hoste, betreue und entwickle ich sie laufend weiter. Umfang und Kosten für Hosting, Wartung und Weiterentwicklung vereinbaren wir vorab.',
      },
    ],
  },
  fakten: [
    { zahl: 24, suffix: ' h', v: 'bis du eine Antwort hast' },
    { zahl: 1, suffix: '', v: 'Ansprechpartner, von Anfang bis Ende' },
    { zahl: 0, suffix: ' €', v: 'für den ersten Entwurf' },
  ],
  schluss: {
    titel: 'Erzähl mir, was dich stört.',
    text: 'Drei Sätze genügen: was ihr macht und was gerade nicht funktioniert. Innerhalb von 24 Stunden hast du eine ehrliche Einschätzung zu Umfang, Dauer und Preis.',
  },
  fuss: {
    inhaber: 'Inhaber Issa Hareb',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    portfolio: 'Portfolio',
  },
  kontakt: {
    titel: 'Projekt anfragen',
    beschreibung:
      'Kontakt zu Hareb Digital: Website, Webanwendung oder Automatisierung. Kurz beschreiben, Antwort innerhalb von 24 Stunden.',
    vorspann:
      'Schreib mir, was ihr macht und was gerade nicht funktioniert. Drei Sätze genügen. Innerhalb von 24 Stunden bekommst du eine ehrliche Einschätzung zu Umfang, Dauer und Preis — von mir, nicht von einem Vertrieb.',
    epost: 'E-Mail',
    telefon: 'Telefon',
    sitz: 'Geschäftsanschrift',
    zurueck: 'Zurück zur Startseite',
    formular: {
      titel: 'Deine Projektanfrage',
      leistung: 'Worum geht es?',
      leistungLeer: 'Weiß ich noch nicht',
      name: 'Name',
      epost: 'E-Mail',
      nachricht: 'Dein Vorhaben',
      nachrichtHinweis: 'Was macht dein Unternehmen? Was möchtest du erreichen oder verbessern? Den Link zu deiner bisherigen Website kannst du hier ergänzen.',
      senden: 'E-Mail vorbereiten',
      hinweis:
        'Öffnet dein E-Mail-Programm mit deiner Anfrage. Prüfe die Nachricht und sende sie dort ab.',
    },
  },
}

const EN: HdTexte = {
  meta: {
    titel: 'Hareb Digital: websites that get found and take work off your desk',
    beschreibung:
      'Hareb Digital builds websites, web applications and automation for small and mid-sized businesses. One contact, a fixed price, an answer within 24 hours.',
  },
  ctaHaupt: 'Start a project',
  buehne: {
    titelOben: "Let's build something",
    titelUnten: 'singular. Together.',
    vorspann:
      'Websites and software for businesses without an IT department. No page builder, no stack of plugins, no agency chain: you talk to the person who builds it. You tell me what bothers you, I tell you what it costs.',
    arbeitenAnsehen: 'See the work',
    bildAlt:
      'A black bust with its head tipped back, the face coated in glowing green liquid running down from the chin.',
    hinweis: 'Scroll',
  },
  menue: {
    oeffnen: 'Open menu',
    schliessen: 'Close menu',
    karten: [
      {
        label: 'Work',
        links: [
          { label: 'Client project', href: '#arbeiten' },
          { label: 'Websites', href: '#werkschau' },
          { label: 'Social media', href: '#social' },
        ],
      },
      {
        label: 'Services',
        links: [
          { label: 'What I do', href: '#leistungen' },
          { label: 'How it works', href: '#ablauf' },
        ],
      },
      {
        label: 'Start',
        links: [
          { label: 'Start a project', href: '{formular}' },
          { label: 'Portfolio', href: 'https://issahareb.me' },
        ],
      },
    ],
  },
  probleme: {
    titel: 'Does any of this sound familiar?',
    punkte: [
      'The phone rings less than it used to.',
      'On Google we only get found by people who already know us.',
      'The site looks like 2014.',
      'On a phone everything is out of place.',
      'Writing quotes takes forever every single time.',
      'The agency has not answered for weeks.',
      'Now it is supposed to be accessible on top of everything else.',
      'Three people have opinions, none of them built it.',
    ],
  },
  behauptung:
    'That is exactly the work. You get a site that runs, not a presentation. No page builder, no subscription, no hold music. If something breaks, you write to me and not to a hotline.',
  bewegtbild: {
    label: 'How I work',
    titel: 'The fog lifts, the desk stays where it is.',
    text: 'At the start of a project nobody can see anything: not you, because you cannot read a quote made of jargon, and not me, because I do not yet know what actually gets in your way. The picture clears while it is being built, not before. Scroll — then you will see what I mean.',
    bildAlt:
      'A desk on a mountain top above the clouds, with the sun rising over the valleys behind it.',
  },
  verstaendnis: {
    label: 'What I worked out',
    akte: [
      {
        wortLinks: 'ALGO',
        wortRechts: 'RITHM',
        titel: 'I know what gets measured — and that it keeps moving.',
        text: [
          'No platform shows a video because it is good. It shows it because the numbers say so: how long someone stays, whether they rewind, whether they save it, whether they pass it on. Those figures are no secret. They just have to be taken seriously before the first cut lands.',
          'What counts most this month counts less next month. The weighting changes without notice, and every trick built for one exact setting dies with it. So I hang nothing on a trick.',
        ],
      },
      {
        wortLinks: 'THREE',
        wortRechts: 'SECONDS',
        titel: 'People do not move.',
        text: [
          'Three seconds decide whether someone swipes on. In that time nobody reads, they recognise: a face, a movement, something that does not add up. Hit that and you do not need to outsmart the algorithm. You hand it exactly the signal it is waiting for.',
        ],
      },
    ],
    kriterien: [
      'Watch time',
      'Completion rate',
      'Saves',
      'Shares',
      'Rewatches',
      'Comments',
      'Profile visits',
    ],
    sekunden: { zahl: '3', label: 'seconds before it is decided' },
    statueAlt:
      'A black bust with its head tipped back, the face coated in glowing green liquid running down from the chin',
    knotenAlt: 'An endlessly turning knot whose surface is made entirely of digits',
    falterAlt: 'An iridescent form opening out like a pair of wings',
  },
  arbeiten: {
    label: 'Work',
    titel: 'Built, shipped, and running.',
    kundeLabel: 'Client project',
    kundeName: 'Taxi B&B Essen',
    kundeText:
      'Instant or scheduled bookings, an admin area with its own database, automatic emails, and technical SEO down to the structured data.',
    werte: [
      { wert: '92', name: 'On-page' },
      { wert: '99', name: 'Technical' },
      { wert: '97', name: 'Structure' },
      { wert: '80', name: 'Content' },
    ],
    quelle: 'Measured by seobility.net on 28 July 2026.',
    seiteAnsehen: 'Visit the site',
    belegAlt: 'Booking flow and home page of taxibbessen.de',
    ansehen: 'Visit',
    projekte: [
      {
        name: 'GuardianGrid',
        alt: 'Sign-in area of guardiangrid.io',
        text: 'My own web application for Destiny 2: GuardianGrid connects game accounts and presents game data clearly. I developed the application, from sign-in to data processing, and run it on my own infrastructure.',
        url: 'https://www.guardiangrid.io',
      },
      {
        name: 'L.U.K.A.S.',
        alt: 'Interface of the AI agent L.U.K.A.S.',
        text: 'Own product: an AI agent with lasting memory that takes on real tasks instead of only answering.',
        url: null,
      },
    ],
  },
  werkschau: {
    label: 'Websites',
    vorher: 'Previous image',
    weiter: 'Next image',
    folie: 'Image {n} of {von}',
  },
  leistungen: {
    label: 'Services',
    titel: 'What your business needs.',
    vorspann:
      'Together, we decide which changes are useful and what to work on first.',
    anfragen: 'Ask without obligation',
    mehr: 'More details',
    punkte: [
      {
        n: '01',
        slug: 'neue-website',
        titel: 'Web design & development',
        text: 'A bespoke website with clear content, considered design and a simple way to enquire. Built for mobile and desktop.',
        detail: {
          vorspann:
            'Your website should explain what you offer and make it easy to get in touch. I develop the structure, design and features around your business.',
          dabei: {
            titel: 'What we build',
            punkte: [
              'Site structure and copy developed together around your offer and audience',
              'An individual design for mobile, tablet and desktop',
              'Technical foundations for search: clear structure, fast loading and structured data',
              'Accessible foundations with keyboard navigation, clear structure and checked contrast',
              'Suitable contact options, such as an enquiry form or booking feature within the agreed scope',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'We clarify your goals and requirements and agree on the design. You see progress during development. Before launch, we review the content and features together. How you want to update content later is part of our initial planning.',
          },
          preis: {
            titel: 'Time and price',
            text: 'As a guide: two to three weeks for a landing page, four to eight for a multi-page website. Before work starts, you receive an agreed timeline and a fixed-price proposal. Any ongoing costs are listed separately.',
          },
        },
      },
      {
        n: '02',
        slug: 'website-ueberarbeiten',
        titel: 'Website redesign',
        text: 'Improve your existing website: review design, loading times and usability while retaining useful content and features.',
        detail: {
          vorspann:
            'Does your website no longer reflect your business, or is it awkward to use? I review what can be retained and improve the design, content and technology where it makes sense.',
          dabei: {
            titel: 'What we improve',
            punkte: [
              'A review with clear recommendations on what to keep and what to change',
              'Design and site structure suited to what your business offers today',
              'Review and optimisation of images, code and loading times',
              'Usability and presentation on mobile, tablet and desktop',
              'Accessibility review and improvements within the agreed project scope',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'After an initial look at your website, we discuss its main weaknesses. We weigh focused improvements against a rebuild and agree on the scope. Existing content, features and page addresses are considered in the plan.',
          },
          preis: {
            titel: 'Time and price',
            text: 'Depending on the scope, a redesign may take around one to four weeks. The initial assessment is free. You receive a fixed price and a timeline for the agreed changes before work starts.',
          },
        },
      },
      {
        n: '03',
        slug: 'automatisierung',
        titel: "Automation",
        text: "From purchase to dispatch: I connect your shop, email, accounting and other systems into practical workflows.",
        detail: {
          vorspann: "After a purchase, your customer automatically receives a confirmation email. Behind the scenes, payment, invoicing, stock and dispatch can work together. I connect your systems into simple or complex workflows and agree with you where they run independently and where approval is needed.",
          dabei: {
            titel: "Practical examples for your business",
            punkte: [
              "Online shop: Send an order confirmation with the order details, then trigger the next steps once payment is confirmed.",
              "Order processing: Create invoices from order data, transfer them to accounting and reconcile stock. Missing items trigger an internal task.",
              "Dispatch: Pass paid, available orders to fulfilment and send tracking details to customers once a tracking number is available.",
              "Enquiries and quotes: Validate form data, save it in your customer system, assign the right contact and prepare a quote for approval.",
              "Appointments and open tasks: Sync bookings with your calendar, send reminders and flag outstanding responses to your team.",
            ],
          },
          ablauf: {
            titel: "What happens behind the scenes",
            text: "An event starts the workflow, such as a new order or a confirmed payment. Integrations let the connected systems exchange data. The workflow checks required information and conditions: Has payment arrived? Is the item available? It then carries out the relevant steps in order and records their status. Duplicate events are caught to avoid creating the same invoice twice. If a step fails, it can be retried or paused for review with a notification to your team. Before implementation, we check which integrations are available, agree on approval steps and test the workflow, including common exceptions.",
          },
          preis: {
            titel: 'Time and price',
            text: 'A simple workflow can often be implemented in one to two weeks. Timing depends on the software and integrations involved. You receive a fixed project price, with any external service costs discussed in advance.',
          },
        },
      },
      {
        n: '04',
        slug: 'gefunden-werden',
        titel: 'SEO & AEO',
        text: 'Prepare your website’s technology and content so search engines and AI answer systems can better understand what you offer.',
        detail: {
          vorspann:
            'For potential customers to find your offer, search engines and AI answer systems need to understand your website. I review its technology, structure and content to improve the foundations of your visibility.',
          dabei: {
            titel: 'What I review and improve',
            punkte: [
              'Technical SEO: search engine access, site structure, loading times and structured data',
              'Search terms relevant to your offer, audience and, where appropriate, location',
              'Consistent business information on your website and Google Business Profile',
              'Clear answers to customer questions that AI answer systems can also use as sources',
              'Analysis of available data on visibility, search queries and website visits',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'I start by assessing the current position. We then prioritise improvements by expected benefit and effort. After implementation, we review progress using available data. Search rankings and mentions in AI answers cannot be guaranteed.',
          },
          preis: {
            titel: 'Time and price',
            text: 'The initial analysis usually takes a few days. It informs the scope, timeline and fixed implementation price. Changes in visibility are monitored over a suitable period, since their effects may not be immediate.',
          },
        },
      },
    ],
  },
  social: {
    label: 'Social media',
    titel: 'Reach that no advertising budget paid for.',
    vorspann:
      'Before anyone visits your website, they have to have heard of you. I build that part too: content that travels on its own. Two accounts, neither with a single euro of media budget.',
    einordnung:
      'These accounts are experiments, not work samples from your industry. What transfers is not the subject of the videos but how the first three seconds are built. That is what decides whether a video gets watched at all.',
    konten: [
      {
        name: 'dailyraphood',
        handle: '@dailyraphood',
        netz: 'Instagram',
        art: 'Rap and hip-hop account, grown purely organically',
        bild: 'drh-profil',
        alt: 'Instagram profile dailyraphood with 21.3 thousand followers and 631 posts',
        zahlen: [
          { wert: '21,300', label: 'followers' },
          { wert: '631', label: 'posts' },
          { wert: '€0', label: 'ad budget' },
        ],
      },
      {
        name: 'Mr Han',
        handle: '@issa3701',
        netz: 'TikTok',
        art: 'Personal account, grown purely organically',
        bild: 'mrhan-profil',
        alt: 'TikTok profile Mr Han, @issa3701, with 13,903 followers and 538,113 likes',
        zahlen: [
          { wert: '13,903', label: 'followers' },
          { wert: '538,113', label: 'likes' },
          { wert: '€0', label: 'ad budget' },
        ],
      },
    ],
    belege: [
      {
        bild: 'drh-beitrag',
        alt: 'Instagram post insights: 1,322,523 accounts reached, 1,582 follows, 45,956 likes, 575 comments',
        titel: 'One single post',
        text: 'Over 1,500 new followers from one video, 1.3 million accounts reached, and 99 per cent of them were not following the account beforehand. What carried it was not the size of the account but the opening of the video.',
        zahlen: [
          { wert: '1,582', label: 'new followers from one post' },
          { wert: '1,322,523', label: 'accounts reached' },
          { wert: '45,956', label: 'likes' },
          { wert: '575', label: 'comments' },
          { wert: '30,905', label: 'shares' },
          { wert: '11,794', label: 'saves' },
        ],
      },
      {
        bild: 'drh-woche',
        alt: 'Instagram weekly insights: 1,724,151 impressions, 405,352 accounts reached, 4,724 profile visits',
        titel: 'One week',
        text: '1.7 million impressions in seven days, plus 4,724 profile visits. An ad stops working the moment the budget runs out. There never was one here.',
        zahlen: [
          { wert: '1,724,151', label: 'impressions in seven days' },
          { wert: '405,352', label: 'accounts reached' },
          { wert: '4,724', label: 'profile visits' },
        ],
      },
    ],
    hookTitel: 'Why one video travels and almost none of the others do',
    hookAbsaetze: [
      'The question came while scrolling, not from a marketing book: why did I watch this one video to the end when I swiped past the one before it in under two seconds?',
      'The answer is a moment that makes the viewer ask themselves a question. Not a promise, not an announcement, but something that does not add up. As long as the question is open, they stay.',
      'An example: someone dips an oversized cookie in milk and then bites the dry side. So why dip it at all? You keep watching to find out — and that is exactly how long the video runs.',
      'For a business the mechanism is identical. Instead of showing what a product does, you build a moment that does not fit, and the product resolves it. That is where a video turns into an ad nobody skips.',
    ],
  },
  ablauf: {
    label: 'How it works',
    titel: 'Four steps, no small print.',
    schritte: [
      {
        n: '01',
        t: 'Tell me about your project',
        b: 'Describe your business and your goal by email or in a conversation. We clarify what you need and which details are still missing for planning.',
      },
      {
        n: '02',
        t: 'Receive a proposal',
        b: 'I usually reply within 24 hours. Once the requirements are clear, you receive a proposal with the scope, timeline and fixed price.',
      },
      {
        n: '03',
        t: 'Review the design',
        b: 'For website projects, a free initial design is available on request. We agree on its scope beforehand. You then decide whether to move forward together.',
      },
      {
        n: '04',
        t: 'Your project goes live',
        b: 'After our joint review, your project goes live. If I host your website, I continue to maintain and develop it. We agree on the scope and costs of hosting, maintenance and ongoing development in advance.',
      },
    ],
  },
  fakten: [
    { zahl: 24, suffix: ' h', v: 'until you have an answer' },
    { zahl: 1, suffix: '', v: 'contact, from start to finish' },
    { zahl: 0, suffix: ' €', v: 'for the first draft' },
  ],
  schluss: {
    titel: 'Tell me what bothers you.',
    text: 'Three sentences will do: what you do and what is not working right now. Within 24 hours you have an honest read on scope, timeline and price.',
  },
  fuss: {
    inhaber: 'Owner Issa Hareb',
    impressum: 'Legal notice',
    datenschutz: 'Privacy',
    portfolio: 'Portfolio',
  },
  kontakt: {
    titel: 'Start a project',
    beschreibung:
      'Get in touch with Hareb Digital: website, web application or automation. Describe it briefly, answer within 24 hours.',
    vorspann:
      'Tell me what you do and what is not working right now. Three sentences will do. Within 24 hours you get an honest read on scope, timeline and price — from me, not from a sales desk.',
    epost: 'Email',
    telefon: 'Phone',
    sitz: 'Business address',
    zurueck: 'Back to the home page',
    formular: {
      titel: 'Your project enquiry',
      leistung: 'What is it about?',
      leistungLeer: 'Not sure yet',
      name: 'Name',
      epost: 'Email',
      nachricht: 'Your project',
      nachrichtHinweis: 'What does your business do? What would you like to achieve or improve? You can include a link to your existing website.',
      senden: 'Prepare email',
      hinweis:
        'Opens your email app with your enquiry. Review the message and send it from there.',
    },
  },
}

const ES: HdTexte = {
  meta: {
    titel: 'Hareb Digital: webs que se encuentran y que te quitan trabajo',
    beschreibung:
      'Hareb Digital crea webs, aplicaciones y automatizaciones para pequeñas y medianas empresas. Una sola persona de contacto, precio cerrado y respuesta en 24 horas.',
  },
  ctaHaupt: 'Solicitar proyecto',
  buehne: {
    titelOben: 'Construyamos juntos',
    titelUnten: 'algo único.',
    vorspann:
      'Webs y programas para empresas sin departamento de informática. Sin maquetador, sin pila de plugins, sin cadena de agencia: hablas con quien la construye. Tú me cuentas qué te molesta, yo te digo lo que cuesta.',
    arbeitenAnsehen: 'Ver los trabajos',
    bildAlt:
      'Un busto negro con la cabeza inclinada hacia atrás y el rostro cubierto por una masa verde luminosa que gotea desde la barbilla.',
    hinweis: 'Desplázate',
  },
  menue: {
    oeffnen: 'Abrir menú',
    schliessen: 'Cerrar menú',
    karten: [
      {
        label: 'Trabajos',
        links: [
          { label: 'Proyecto de cliente', href: '#arbeiten' },
          { label: 'Webs', href: '#werkschau' },
          { label: 'Redes sociales', href: '#social' },
        ],
      },
      {
        label: 'Servicios',
        links: [
          { label: 'Lo que hago', href: '#leistungen' },
          { label: 'Cómo funciona', href: '#ablauf' },
        ],
      },
      {
        label: 'Empezar',
        links: [
          { label: 'Solicitar proyecto', href: '{formular}' },
          { label: 'Portfolio', href: 'https://issahareb.me' },
        ],
      },
    ],
  },
  probleme: {
    titel: '¿Te suena alguna de estas frases?',
    punkte: [
      'El teléfono ya no suena como antes.',
      'En Google solo nos encuentran los que ya nos conocen.',
      'La web parece de 2014.',
      'En el móvil está todo descolocado.',
      'Preparar presupuestos tarda una eternidad cada vez.',
      'La agencia lleva semanas sin contestar.',
      'Y ahora encima tiene que ser accesible.',
      'Opinan tres personas y ninguna la ha construido.',
    ],
  },
  behauptung:
    'Ese es justo el trabajo. No recibes una presentación, sino una web que funciona. Sin plantillas, sin cuota mensual, sin música de espera. Si algo falla, me escribes a mí y no a un centro de atención.',
  bewegtbild: {
    label: 'Cómo trabajo',
    titel: 'La niebla se retira, el escritorio se queda.',
    text: 'Al principio de un proyecto nadie ve nada: tú no, porque no se puede leer un presupuesto hecho de tecnicismos, y yo tampoco, porque aún no sé qué te bloquea de verdad. La imagen se aclara mientras se construye, no antes. Desplázate y verás a qué me refiero.',
    bildAlt:
      'Un escritorio en la cima de una montaña sobre el mar de nubes, con el sol saliendo tras los valles.',
  },
  verstaendnis: {
    label: 'Lo que he entendido',
    akte: [
      {
        wortLinks: 'ALGO',
        wortRechts: 'RITMO',
        titel: 'Sé según qué se ordena, y que eso se desplaza.',
        text: [
          'Ninguna plataforma muestra un vídeo porque sea bueno. Lo muestra porque lo dicen los números: cuánto se queda alguien, si lo rebobina, si lo guarda, si lo reenvía. Esas magnitudes no son ningún secreto. Solo hay que tomárselas en serio antes del primer corte.',
          'Lo que pesa este mes pesa menos el siguiente. La ponderación cambia sin avisar, y cada truco construido para un ajuste exacto muere con él. Por eso no cuelgo nada de un truco.',
        ],
      },
      {
        wortLinks: 'TRES',
        wortRechts: 'SEGUNDOS',
        titel: 'La persona no se desplaza.',
        text: [
          'Tres segundos deciden si alguien sigue deslizando. En ese tiempo nadie lee, reconoce: una cara, un movimiento, algo que no encaja. Quien acierta ahí no necesita burlar al algoritmo. Le entrega justo la señal que está esperando.',
        ],
      },
    ],
    kriterien: [
      'Tiempo de vista',
      'Tasa de finalización',
      'Guardados',
      'Compartidos',
      'Repeticiones',
      'Comentarios',
      'Visitas al perfil',
    ],
    sekunden: { zahl: '3', label: 'segundos antes de que esté decidido' },
    statueAlt:
      'Busto negro con la cabeza inclinada hacia atrás y el rostro cubierto por una masa verde luminosa que gotea desde la barbilla',
    knotenAlt: 'Un nudo que gira sin fin y cuya superficie está hecha enteramente de cifras',
    falterAlt: 'Una forma iridiscente que se abre como un par de alas',
  },
  arbeiten: {
    label: 'Trabajos',
    titel: 'Hecho, publicado y en marcha.',
    kundeLabel: 'Proyecto de cliente',
    kundeName: 'Taxi B&B Essen',
    kundeText:
      'Reservas inmediatas o programadas, un panel de administración con su propia base de datos, correos automáticos y SEO técnico hasta los datos estructurados.',
    werte: [
      { wert: '92', name: 'On-page' },
      { wert: '99', name: 'Técnica' },
      { wert: '97', name: 'Estructura' },
      { wert: '80', name: 'Contenido' },
    ],
    quelle: 'Medido por seobility.net el 28/07/2026.',
    seiteAnsehen: 'Ver la web',
    belegAlt: 'Proceso de reserva y página de inicio de taxibbessen.de',
    ansehen: 'Ver',
    projekte: [
      {
        name: 'GuardianGrid',
        alt: 'Zona de acceso de guardiangrid.io',
        text: 'Mi propia aplicación web para Destiny 2: GuardianGrid conecta cuentas del juego y presenta sus datos de forma clara. Desarrollé la aplicación, desde el acceso hasta el procesamiento de datos, y la mantengo en infraestructura propia.',
        url: 'https://www.guardiangrid.io',
      },
      {
        name: 'L.U.K.A.S.',
        alt: 'Interfaz del agente de IA L.U.K.A.S.',
        text: 'Producto propio: un agente de IA con memoria duradera que asume tareas reales en lugar de solo responder.',
        url: null,
      },
    ],
  },
  werkschau: {
    label: 'Webs',
    vorher: 'Imagen anterior',
    weiter: 'Imagen siguiente',
    folie: 'Imagen {n} de {von}',
  },
  leistungen: {
    label: 'Servicios',
    titel: 'Lo que necesita tu negocio.',
    vorspann:
      'Juntos definimos qué cambios son útiles y cuáles conviene implementar primero.',
    anfragen: 'Consultar sin compromiso',
    mehr: 'Más información',
    punkte: [
      {
        n: '01',
        slug: 'neue-website',
        titel: 'Diseño y desarrollo web',
        text: 'Una web a medida con contenidos claros, un diseño cuidado y una forma sencilla de contactarte. Pensada para móvil y computadora.',
        detail: {
          vorspann:
            'Tu web debe explicar lo que ofreces y facilitar el contacto. Desarrollo su estructura, diseño y funciones a partir de las necesidades de tu empresa.',
          dabei: {
            titel: 'Qué desarrollamos',
            punkte: [
              'Estructura y textos que definimos juntos según tu oferta y tu público',
              'Diseño propio para móvil, tablet y computadora',
              'Bases técnicas para buscadores: estructura clara, carga rápida y datos estructurados',
              'Bases de accesibilidad con navegación por teclado, estructura clara y contraste revisado',
              'Vías de contacto adecuadas, como un formulario o una función de reservas dentro del alcance acordado',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Definimos objetivos y requisitos y acordamos el diseño. Durante el desarrollo ves los avances. Antes de publicar, revisamos juntos los contenidos y las funciones. La forma de actualizar los contenidos después se define al inicio.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'Como orientación: de dos a tres semanas para una landing page y de cuatro a ocho para una web con varias páginas. Antes de empezar, recibes un calendario acordado y una propuesta con precio fijo. Los posibles costos recurrentes se detallan por separado.',
          },
        },
      },
      {
        n: '02',
        slug: 'website-ueberarbeiten',
        titel: 'Rediseño web',
        text: 'Mejorar tu web actual: revisar diseño, tiempos de carga y facilidad de uso, conservando los contenidos y las funciones útiles.',
        detail: {
          vorspann:
            '¿Tu web ya no representa a tu empresa o resulta difícil de usar? Reviso qué se puede conservar y mejoro el diseño, los contenidos y la tecnología donde sea necesario.',
          dabei: {
            titel: 'Qué mejoramos',
            punkte: [
              'Revisión con recomendaciones claras sobre qué conservar y qué cambiar',
              'Diseño y estructura adaptados a lo que ofrece hoy tu negocio',
              'Revisión y optimización de imágenes, código y tiempos de carga',
              'Presentación y facilidad de uso en móvil, tablet y computadora',
              'Revisión y mejora de la accesibilidad dentro del alcance acordado',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Después de revisar tu web, comentamos los principales puntos débiles. Comparamos una mejora puntual con una reconstrucción y acordamos el alcance. La planificación tiene en cuenta los contenidos, las funciones y las direcciones de las páginas existentes.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'Según el alcance, la renovación puede tomar entre una y cuatro semanas. La evaluación inicial es gratuita. Antes de empezar, recibes un precio fijo y un calendario para los cambios acordados.',
          },
        },
      },
      {
        n: '03',
        slug: 'automatisierung',
        titel: "Automatización",
        text: "De la compra al envío: conecto tu tienda, correo, contabilidad y otros sistemas en procesos coordinados.",
        detail: {
          vorspann: "Tras una compra, tu cliente recibe automáticamente un correo de confirmación. En segundo plano, el pago, la factura, el inventario y el envío pueden trabajar juntos. Conecto tus sistemas en procesos simples o complejos y acordamos cuándo funcionan solos y dónde necesitas aprobar un paso.",
          dabei: {
            titel: "Ejemplos concretos para tu negocio",
            punkte: [
              "Tienda online: Enviar una confirmación con los datos del pedido e iniciar los siguientes pasos cuando se confirme el pago.",
              "Gestión de pedidos: Crear facturas con los datos de compra, enviarlas a contabilidad y sincronizar el inventario. Si falta un artículo, generar una tarea interna.",
              "Envíos: Pasar los pedidos pagados y disponibles al servicio de envíos y comunicar el seguimiento al cliente cuando exista un número de envío.",
              "Consultas y presupuestos: Validar formularios, guardar los datos en el sistema de clientes, asignar un responsable y preparar un presupuesto para su aprobación.",
              "Citas y tareas pendientes: Sincronizar reservas con el calendario, enviar recordatorios y avisar al equipo de respuestas pendientes.",
            ],
          },
          ablauf: {
            titel: "Qué ocurre en segundo plano",
            text: "Un evento inicia el proceso, como un pedido nuevo o un pago confirmado. Las integraciones permiten que los sistemas intercambien datos. El proceso comprueba la información necesaria y las condiciones: ¿Se ha recibido el pago? ¿Hay existencias? Después ejecuta los pasos correspondientes en orden y registra su estado. Detecta eventos duplicados para evitar crear la misma factura dos veces. Si falla un paso, puede reintentarse o detenerse para revisión con un aviso al equipo. Antes de empezar, comprobamos las conexiones disponibles, acordamos las aprobaciones y probamos el proceso con las excepciones habituales.",
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'Un proceso sencillo suele poder implementarse en una o dos semanas. El plazo depende de los programas y las integraciones involucradas. Recibes un precio fijo para el proyecto y aclaramos de antemano los posibles costos de servicios externos.',
          },
        },
      },
      {
        n: '04',
        slug: 'gefunden-werden',
        titel: 'SEO y AEO',
        text: 'Preparar la tecnología y los contenidos de tu web para que los buscadores y los sistemas de respuesta con IA entiendan mejor tu oferta.',
        detail: {
          vorspann:
            'Para que tus posibles clientes encuentren tu oferta, los buscadores y los sistemas de respuesta con IA necesitan comprender tu web. Reviso su tecnología, estructura y contenidos para mejorar las bases de tu visibilidad.',
          dabei: {
            titel: 'Qué reviso y mejoro',
            punkte: [
              'SEO técnico: acceso para buscadores, estructura, tiempos de carga y datos estructurados',
              'Términos de búsqueda adecuados para tu oferta, tu público y, cuando corresponda, tu ubicación',
              'Datos de empresa coherentes en tu web y en tu Perfil de Empresa de Google',
              'Respuestas claras a las preguntas de los clientes que también puedan servir como fuente para sistemas de IA',
              'Análisis de los datos disponibles sobre visibilidad, búsquedas y visitas a la web',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Primero analizo la situación actual. Después priorizamos mejoras según su utilidad prevista y el esfuerzo necesario. Tras implementarlas, revisamos la evolución con los datos disponibles. No se pueden garantizar posiciones ni menciones en respuestas de IA.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'El análisis inicial suele tomar unos días y permite definir el alcance, el calendario y el precio fijo de la implementación. Observamos la visibilidad durante un periodo adecuado, ya que los efectos de los cambios pueden tardar en aparecer.',
          },
        },
      },
    ],
  },
  social: {
    label: 'Redes sociales',
    titel: 'Alcance por el que no se pagó ni un céntimo de publicidad.',
    vorspann:
      'Antes de que alguien visite tu web, tiene que haber oído hablar de ti. Eso también lo construyo: contenido que circula solo. Dos cuentas, ninguna con un euro de presupuesto publicitario.',
    einordnung:
      'Las cuentas son experimentos, no muestras de trabajo de tu sector. Lo que se traslada no es el tema de los vídeos, sino cómo se construyen los tres primeros segundos. Eso decide si un vídeo llega a verse.',
    konten: [
      {
        name: 'dailyraphood',
        handle: '@dailyraphood',
        netz: 'Instagram',
        art: 'Cuenta de rap y hip-hop, crecida de forma puramente orgánica',
        bild: 'drh-profil',
        alt: 'Perfil de Instagram dailyraphood con 21,3 mil seguidores y 631 publicaciones',
        zahlen: [
          { wert: '21.300', label: 'seguidores' },
          { wert: '631', label: 'publicaciones' },
          { wert: '0 €', label: 'presupuesto publicitario' },
        ],
      },
      {
        name: 'Mr Han',
        handle: '@issa3701',
        netz: 'TikTok',
        art: 'Cuenta personal, crecida de forma puramente orgánica',
        bild: 'mrhan-profil',
        alt: 'Perfil de TikTok Mr Han, @issa3701, con 13.903 seguidores y 538.113 me gusta',
        zahlen: [
          { wert: '13.903', label: 'seguidores' },
          { wert: '538.113', label: 'me gusta' },
          { wert: '0 €', label: 'presupuesto publicitario' },
        ],
      },
    ],
    belege: [
      {
        bild: 'drh-beitrag',
        alt: 'Estadísticas de una publicación de Instagram: 1.322.523 cuentas alcanzadas, 1.582 seguimientos, 45.956 me gusta, 575 comentarios',
        titel: 'Una sola publicación',
        text: 'Más de 1.500 seguidores nuevos a partir de un vídeo, 1,3 millones de cuentas alcanzadas, y el 99 por ciento no seguía la cuenta antes. Lo que lo sostuvo no fue el tamaño de la cuenta, sino el inicio del vídeo.',
        zahlen: [
          { wert: '1.582', label: 'seguidores nuevos de una publicación' },
          { wert: '1.322.523', label: 'cuentas alcanzadas' },
          { wert: '45.956', label: 'me gusta' },
          { wert: '575', label: 'comentarios' },
          { wert: '30.905', label: 'veces compartido' },
          { wert: '11.794', label: 'guardados' },
        ],
      },
      {
        bild: 'drh-woche',
        alt: 'Estadísticas semanales de Instagram: 1.724.151 impresiones, 405.352 cuentas alcanzadas, 4.724 visitas al perfil',
        titel: 'Una semana',
        text: '1,7 millones de impresiones en siete días, más 4.724 visitas al perfil. Un anuncio deja de funcionar en cuanto se agota el presupuesto. Aquí nunca hubo ninguno.',
        zahlen: [
          { wert: '1.724.151', label: 'impresiones en siete días' },
          { wert: '405.352', label: 'cuentas alcanzadas' },
          { wert: '4.724', label: 'visitas al perfil' },
        ],
      },
    ],
    hookTitel: 'Por qué un vídeo circula y casi ninguno de los demás lo hace',
    hookAbsaetze: [
      'La pregunta surgió mientras hacía scroll, no en un libro de marketing: ¿por qué vi este vídeo hasta el final si al anterior lo salté en menos de dos segundos?',
      'La respuesta es un momento que lleva al espectador a hacerse una pregunta a sí mismo. No una promesa ni un anuncio, sino algo que no encaja. Mientras la pregunta siga abierta, se queda.',
      'Un ejemplo: alguien moja una galleta enorme en leche y después muerde por el lado seco. ¿Para qué mojarla entonces? Sigues mirando para averiguarlo — y el vídeo dura exactamente eso.',
      'Para una empresa el mecanismo es el mismo. En lugar de mostrar lo que hace un producto, se construye un momento que no encaja y el producto lo resuelve. Ahí es donde un vídeo se convierte en un anuncio que nadie se salta.',
    ],
  },
  ablauf: {
    label: 'Cómo funciona',
    titel: 'Cuatro pasos, sin letra pequeña.',
    schritte: [
      {
        n: '01',
        t: 'Cuéntame tu proyecto',
        b: 'Por correo o en una conversación, me cuentas sobre tu empresa y tu objetivo. Aclaramos qué necesitas y qué información falta para planificar.',
      },
      {
        n: '02',
        t: 'Recibes una propuesta',
        b: 'Suelo responder en un plazo de 24 horas. Una vez claros los requisitos, recibes una propuesta con el alcance, el calendario y un precio fijo.',
      },
      {
        n: '03',
        t: 'Revisas el diseño',
        b: 'Para proyectos web, puedes solicitar un primer diseño gratuito. Acordamos su alcance de antemano. Después decides si quieres que trabajemos juntos.',
      },
      {
        n: '04',
        t: 'Tu proyecto se publica',
        b: 'Después de revisarlo juntos, tu proyecto se publica. Si alojo tu web, sigo cuidándola y desarrollándola. Acordamos de antemano el alcance y los costos del alojamiento, mantenimiento y desarrollo continuo.',
      },
    ],
  },
  fakten: [
    { zahl: 24, suffix: ' h', v: 'hasta tener una respuesta' },
    { zahl: 1, suffix: '', v: 'persona de contacto, de principio a fin' },
    { zahl: 0, suffix: ' €', v: 'por la primera propuesta' },
  ],
  schluss: {
    titel: 'Cuéntame qué te molesta.',
    text: 'Con tres frases basta: a qué os dedicáis y qué no está funcionando. En menos de 24 horas tienes una valoración honesta de alcance, plazo y precio.',
  },
  fuss: {
    inhaber: 'Titular Issa Hareb',
    impressum: 'Aviso legal',
    datenschutz: 'Privacidad',
    portfolio: 'Portafolio',
  },
  kontakt: {
    titel: 'Solicitar proyecto',
    beschreibung:
      'Contacto con Hareb Digital: web, aplicación o automatización. Cuéntalo brevemente, respuesta en 24 horas.',
    vorspann:
      'Escríbeme a qué os dedicáis y qué no está funcionando. Con tres frases basta. En menos de 24 horas recibes una valoración honesta de alcance, plazo y precio — de mí, no de un comercial.',
    epost: 'Correo',
    telefon: 'Teléfono',
    sitz: 'Dirección comercial',
    zurueck: 'Volver a la página de inicio',
    formular: {
      titel: 'Tu consulta de proyecto',
      leistung: '¿De qué se trata?',
      leistungLeer: 'Aún no lo sé',
      name: 'Nombre',
      epost: 'Correo',
      nachricht: 'Tu proyecto',
      nachrichtHinweis: '¿A qué se dedica tu empresa? ¿Qué te gustaría lograr o mejorar? Puedes incluir un enlace a tu web actual.',
      senden: 'Preparar correo',
      hinweis: 'Abre tu aplicación de correo con la consulta preparada. Revisa el mensaje y envíalo desde allí.',
    },
  },
}

export const HD_TEXTE: Record<HdLang, HdTexte> = { de: DE, en: EN, es: ES }

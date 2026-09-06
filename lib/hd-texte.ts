/**
 * Die Texte der Landingpage von Hareb Digital, in drei Sprachen.
 *
 * Eigenes Wörterbuch, nicht das des Portfolios. Die beiden Seiten sprechen
 * bewusst verschieden: das Portfolio spricht zu Auftraggebern, die Websites
 * schon einordnen können, die Landingpage zu Betrieben ohne IT-Abteilung.
 * Ein gemeinsames Wörterbuch hätte den Ton der einen an den der anderen
 * gebunden.
 *
 * Die Auswahl trifft der Browser des Besuchers über den Accept-Language-Kopf,
 * nicht die Adresse. Das wäre auf einer indexierten Seite falsch — ein
 * Crawler bekäme je nach Laune eine andere Fassung unter derselben Adresse.
 * Diese Seite trägt `noindex`, solange sie unter issahareb.me liegt, und
 * bekommt ihren Verkehr aus Anzeigen. Für sie zählt, dass der Besucher in
 * seiner Sprache landet, ohne vorher etwas anklicken zu müssen.
 */

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
  /* Der Abschnitt "Was ich verstanden habe".
   *
   * Er ist die einzige Stelle der Seite, an der nicht die Arbeit belegt wird,
   * sondern der Grund dafuer. Drei Akte, die aufeinander aufbauen und deshalb
   * eine Liste sind und keine drei Felder: die Reihenfolge traegt das
   * Argument. Kanal misst -> Gewichtung verschiebt sich -> der Mensch bleibt.
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
      text: string
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
      'Ein Schreibtisch auf einem Berggipfel über dem Nebelmeer, dahinter geht die Sonne über den Tälern auf.',
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
  verstaendnis: {
    label: 'Was ich verstanden habe',
    akte: [
      {
        wortLinks: 'ALGO',
        wortRechts: 'RITHMUS',
        titel: 'Ich weiß, wonach sortiert wird.',
        text: 'Kein Kanal zeigt ein Video, weil es gut ist. Er zeigt es, weil Zahlen es sagen: wie lange jemand bleibt, ob er zurückspult, ob er speichert, ob er es weiterschickt. Diese Größen sind kein Geheimnis. Man muss sie nur ernst nehmen, bevor der erste Schnitt sitzt.',
      },
      {
        wortLinks: 'IMMER',
        wortRechts: 'ANDERS',
        titel: 'Und dass sie sich verschieben.',
        text: 'Was diesen Monat oben steht, zählt im nächsten weniger. Die Gewichtung wird geändert, ohne Ankündigung, und jeder Trick, der auf genau eine Einstellung gebaut war, stirbt mit ihr. Deshalb hänge ich nichts an einen Trick.',
      },
      {
        wortLinks: 'DREI',
        wortRechts: 'SEKUNDEN',
        titel: 'Der Mensch verschiebt sich nicht.',
        text: 'Drei Sekunden entscheiden, ob weitergewischt wird. In dieser Zeit liest niemand, er erkennt: ein Gesicht, eine Bewegung, etwas, das nicht aufgeht. Wer das trifft, muss den Algorithmus nicht überlisten. Er liefert ihm genau das Signal, auf das der wartet.',
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
        text: 'Eigenes Produkt: Anmeldung über einen fremden Anbieter, Auswertung großer Datenmengen, laufender Betrieb auf eigener Infrastruktur.',
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
    titel: 'Such dir aus, was gerade drückt.',
    vorspann:
      'Du musst nicht alles auf einmal machen. Meistens ist es einer dieser vier Punkte, und der bringt schon den Unterschied.',
    anfragen: 'Jetzt unverbindlich anfragen',
    mehr: 'Mehr Infos',
    punkte: [
      {
        n: '01',
        slug: 'neue-website',
        titel: 'Eine neue Website',
        text: 'Von der ersten Skizze bis zu dem Tag, an dem sie läuft. Sie sieht auf dem Handy so gut aus wie am Rechner, wird bei Google gefunden und schickt dir Anfragen direkt zu. Eine Landingpage in zwei bis drei Wochen, eine mehrseitige Seite in vier bis acht.',
        detail: {
          vorspann:
            'Eine Website, die nicht nur da ist, sondern arbeitet: gefunden werden, verstanden werden, Anfragen bekommen. Gebaut von einer Person, von der Struktur über das Design bis zum Code — keine Weitergabe, keine Zwischenstation.',
          dabei: {
            titel: 'Was dabei entsteht',
            punkte: [
              'Struktur und Texte, gemeinsam erarbeitet — nicht von dir geliefert und von mir eingefügt',
              'Eigenes Design statt Vorlage, auf dem Handy zuerst gedacht',
              'Technisches SEO von Anfang an: Struktur, Ladezeit, strukturierte Daten',
              'Barrierefrei nach BFSG, nicht nachträglich draufgesetzt',
              'Ein Kontaktweg, der bei dir ankommt und nicht im Nichts endet',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Ein Gespräch, dann ein Entwurf, den du siehst, bevor du dich festlegst. Danach wird gebaut, du siehst Zwischenstände, und am Ende geht sie live — mit Übergabe, damit du selbst Texte ändern kannst.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Eine Landingpage in zwei bis drei Wochen, eine mehrseitige Seite in vier bis acht. Fester Preis, kein Stundenzettel: Du weißt vorher, was es kostet.',
          },
        },
      },
      {
        n: '02',
        slug: 'website-ueberarbeiten',
        titel: 'Die bestehende überarbeiten',
        text: 'Wenn das Grundgerüst steht, aber nichts davon mehr stimmt. Neues Aussehen ohne bei null anzufangen, schneller, endlich sauber auf dem Handy. Und barrierefrei nach dem Barrierefreiheitsstärkungsgesetz, was nachträglich aufwendiger ist als gleich mitgemacht.',
          detail: {
          vorspann:
            'Nicht alles muss weg. Oft steht die Struktur, und was fehlt, ist alles andere: das Aussehen, die Ladezeit, die Bedienung auf dem Handy. Das lässt sich überarbeiten, ohne bei null anzufangen — und es geht schneller und kostet weniger als ein Neubau.',
          dabei: {
            titel: 'Was dabei entsteht',
            punkte: [
              'Ein Blick auf das, was da ist: was bleibt, was geht, was neu muss',
              'Neues Aussehen auf der bestehenden Struktur',
              'Ladezeit heruntergeholt — meistens der größte einzelne Gewinn',
              'Sauber auf dem Handy, statt am Rechner entworfen und dort gequetscht',
              'Barrierefrei nach BFSG nachgezogen',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Zuerst schaue ich mir die Seite an und sage dir, was sich lohnt und was nicht. Erst danach entscheiden wir über den Umfang — es kann gut sein, dass drei Eingriffe reichen.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Je nach Umfang eine bis vier Wochen. Der Blick auf die bestehende Seite ist kostenlos, danach ein fester Preis für das, was wir vereinbaren.',
          },
        },
      },
      {
        n: '03',
        slug: 'automatisierung',
        titel: 'Abläufe automatisieren',
        text: 'Alles, was du jede Woche von Hand machst und nicht müsstest. Angebote, Rechnungen, Terminerinnerungen, Anfragen sortieren und beantworten.',
        detail: {
          vorspann:
            'Jeder Betrieb hat drei bis fünf Handgriffe, die jede Woche wiederkehren und niemandem gehören. Angebote abtippen, Termine erinnern, Anfragen sortieren. Das lässt sich abgeben — nicht an einen Menschen, sondern an einen Ablauf, der immer gleich funktioniert.',
          dabei: {
            titel: 'Was dabei entsteht',
            punkte: [
              'Angebote und Rechnungen aus einer Vorlage statt aus dem Kopf',
              'Terminerinnerungen, die von allein rausgehen',
              'Anfragen vorsortiert, beantwortet oder weitergereicht',
              'Ein Ort, an dem du siehst, was offen ist — statt fünf Postfächer',
              'Anbindung an das, was du schon nutzt, statt eines neuen Programms',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Wir gehen eine Woche deiner Arbeit durch und suchen die Handgriffe, die sich wiederholen. Der teuerste kommt zuerst dran, damit sich der Aufwand sofort rechnet.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Ein einzelner Ablauf ist meist in ein bis zwei Wochen fertig. Fester Preis je Ablauf, damit du entscheiden kannst, wie viele es werden.',
          },
        },
      },
      {
        n: '04',
        slug: 'gefunden-werden',
        titel: 'Nur gefunden werden',
        text: 'Die Seite bleibt, wie sie ist. Sichtbar wird sie trotzdem: ganz oben bei Google und in den Antworten von ChatGPT und Perplexity.',
        detail: {
          vorspann:
            'Manchmal ist die Seite in Ordnung und nur niemand findet sie. Dann muss nichts neu gebaut werden. Sichtbarkeit ist eine eigene Arbeit: verstanden werden von Google — und inzwischen genauso von den Antwortmaschinen, die immer mehr Leute statt einer Suche benutzen.',
          dabei: {
            titel: 'Was dabei entsteht',
            punkte: [
              'Technisches SEO: Struktur, Ladezeit, strukturierte Daten',
              'Die Begriffe, nach denen in deiner Gegend tatsächlich gesucht wird',
              'Ein Eintrag bei Google, der zur Seite passt und nicht danebensteht',
              'Inhalte, aus denen ChatGPT und Perplexity zitieren können',
              'Messung, damit man sieht, ob es wirkt — nicht nur behauptet',
            ],
          },
          ablauf: {
            titel: 'Wie es läuft',
            text: 'Erst eine Bestandsaufnahme mit Zahlen, dann die Eingriffe in der Reihenfolge ihrer Wirkung. Du bekommst die Messung vorher und nachher, nicht nur einen Bericht.',
          },
          preis: {
            titel: 'Dauer und Preis',
            text: 'Die Bestandsaufnahme dauert wenige Tage. Was danach kommt, hängt vom Befund ab und wird vorher als fester Preis benannt.',
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
        b: 'Eine kurze Mail oder ein Telefonat. Ich will wissen, was dich stört, nicht welche Technik du dir vorstellst.',
      },
      {
        n: '02',
        t: 'Ich sage, was geht',
        b: 'Innerhalb von 24 Stunden: ein fester Preis statt eines Stundenzettels, wie lange es dauert, ob es sich lohnt. Auch wenn die Antwort nein ist.',
      },
      {
        n: '03',
        t: 'Du siehst es vorher',
        b: 'Auf Wunsch ein erster Entwurf, bevor du dich festlegst. Gefällt er nicht, hast du nichts verloren.',
      },
      {
        n: '04',
        t: 'Es läuft und bleibt betreut',
        b: 'Gebaut, online gestellt, überwacht. Klemmt etwas, schreibst du mir statt einer Hotline.',
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
    sitz: 'Sitz',
    zurueck: 'Zurück zur Startseite',
    formular: {
      titel: 'Schreib mir',
      leistung: 'Worum geht es?',
      leistungLeer: 'Weiß ich noch nicht',
      name: 'Name',
      epost: 'E-Mail',
      nachricht: 'Was ist los?',
      nachrichtHinweis: 'Was ihr macht und was gerade nicht funktioniert. Drei Sätze genügen.',
      senden: 'Anfrage schreiben',
      hinweis:
        'Öffnet deine E-Mail mit allem schon eingetragen. Du siehst, was rausgeht, bevor du es abschickst.',
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
      'A desk on a mountain top above the clouds, with the sun rising over the valleys behind it.',
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
  verstaendnis: {
    label: 'What I worked out',
    akte: [
      {
        wortLinks: 'ALGO',
        wortRechts: 'RITHM',
        titel: 'I know what gets measured.',
        text: 'No platform shows a video because it is good. It shows it because the numbers say so: how long someone stays, whether they rewind, whether they save it, whether they pass it on. Those figures are no secret. They just have to be taken seriously before the first cut lands.',
      },
      {
        wortLinks: 'NEVER',
        wortRechts: 'THE SAME',
        titel: 'And that it keeps moving.',
        text: 'What counts most this month counts less next month. The weighting changes without notice, and every trick built for one exact setting dies with it. So I hang nothing on a trick.',
      },
      {
        wortLinks: 'THREE',
        wortRechts: 'SECONDS',
        titel: 'People do not move.',
        text: 'Three seconds decide whether someone swipes on. In that time nobody reads, they recognise: a face, a movement, something that does not add up. Hit that and you do not need to outsmart the algorithm. You hand it exactly the signal it is waiting for.',
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
        text: 'Own product: sign-in through a third-party provider, analysis of large data sets, running in production on my own infrastructure.',
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
    titel: 'Pick whatever hurts most right now.',
    vorspann:
      'You do not have to do everything at once. Usually it is one of these four, and that one already makes the difference.',
    anfragen: 'Ask without obligation',
    mehr: 'More details',
    punkte: [
      {
        n: '01',
        slug: 'neue-website',
        titel: 'A new website',
        text: 'From the first sketch to the day it goes live. It looks as good on a phone as on a desktop, gets found on Google, and sends enquiries straight to you. A landing page in two to three weeks, a multi-page site in four to eight.',
        detail: {
          vorspann:
            'A website that does not just exist but works: gets found, gets understood, brings enquiries. Built by one person, from structure through design to code — nothing handed on, no middle step.',
          dabei: {
            titel: 'What you get',
            punkte: [
              'Structure and copy worked out together — not delivered by you and pasted in by me',
              'Its own design instead of a template, thought out for the phone first',
              'Technical SEO from the start: structure, load time, structured data',
              'Accessible under the German accessibility act, not bolted on afterwards',
              'One contact route that reaches you instead of ending nowhere',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'One conversation, then a draft you see before you commit. Then it gets built, you see it along the way, and it goes live — with a handover so you can change the copy yourself.',
          },
          preis: {
            titel: 'Time and price',
            text: 'A landing page in two to three weeks, a multi-page site in four to eight. A fixed price, no timesheet: you know what it costs before it starts.',
          },
        },
      },
      {
        n: '02',
        slug: 'website-ueberarbeiten',
        titel: 'Rework the one you have',
        text: 'When the structure is fine but nothing else is. A new look without starting from zero, faster, and finally right on a phone. Accessible under the German accessibility act too, which costs more to add later than to build in.',
        detail: {
          vorspann:
            'Not everything has to go. Often the structure stands and what is missing is everything else: the look, the load time, the way it behaves on a phone. That can be reworked without starting from zero — faster and cheaper than a rebuild.',
          dabei: {
            titel: 'What you get',
            punkte: [
              'A look at what is there: what stays, what goes, what has to be new',
              'A new look on the existing structure',
              'Load time brought down — usually the single biggest win',
              'Right on the phone, instead of designed for desktop and squeezed',
              'Accessibility brought up to the standard',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'First I look at the site and tell you what is worth doing and what is not. Only then do we decide on scope — it may well be that three changes are enough.',
          },
          preis: {
            titel: 'Time and price',
            text: 'One to four weeks depending on scope. The look at your existing site is free; after that a fixed price for what we agree.',
          },
        },
      },
      {
        n: '03',
        slug: 'automatisierung',
        titel: 'Automate the routine',
        text: 'Everything you do by hand every week and do not have to. Quotes, invoices, appointment reminders, sorting and answering enquiries.',
        detail: {
          vorspann:
            'Every business has three to five steps that come back every week and belong to nobody. Typing out quotes, reminding people of appointments, sorting enquiries. Those can be handed over — not to a person, but to a process that works the same way every time.',
          dabei: {
            titel: 'What you get',
            punkte: [
              'Quotes and invoices from a template instead of from memory',
              'Appointment reminders that go out on their own',
              'Enquiries pre-sorted, answered, or passed on',
              'One place where you see what is open — instead of five inboxes',
              'Connected to what you already use, not another program',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'We go through a week of your work and find the steps that repeat. The most expensive one goes first, so the effort pays for itself straight away.',
          },
          preis: {
            titel: 'Time and price',
            text: 'A single process is usually done in one to two weeks. A fixed price per process, so you decide how many there are.',
          },
        },
      },
      {
        n: '04',
        slug: 'gefunden-werden',
        titel: 'Just get found',
        text: 'The site stays as it is. It becomes visible anyway: at the top on Google and in the answers from ChatGPT and Perplexity.',
        detail: {
          vorspann:
            'Sometimes the site is fine and nobody finds it. Then nothing needs rebuilding. Visibility is its own job: being understood by Google — and by now just as much by the answer engines more and more people use instead of a search.',
          dabei: {
            titel: 'What you get',
            punkte: [
              'Technical SEO: structure, load time, structured data',
              'The terms people in your area actually search for',
              'A Google listing that matches the site instead of sitting beside it',
              'Content that ChatGPT and Perplexity can quote from',
              'Measurement, so you can see whether it works rather than take it on trust',
            ],
          },
          ablauf: {
            titel: 'How it works',
            text: 'First a survey with numbers, then the changes in order of effect. You get the measurement before and after, not just a report.',
          },
          preis: {
            titel: 'Time and price',
            text: 'The survey takes a few days. What follows depends on what it finds and is named as a fixed price beforehand.',
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
        t: 'You tell me',
        b: 'A short email or one phone call. I want to know what bothers you, not which technology you have in mind.',
      },
      {
        n: '02',
        t: 'I tell you what is possible',
        b: 'Within 24 hours: a fixed price rather than a timesheet, how long it takes, whether it is worth it. Including when the answer is no.',
      },
      {
        n: '03',
        t: 'You see it first',
        b: 'A first draft before you commit, if you want one. If you do not like it, you have lost nothing.',
      },
      {
        n: '04',
        t: 'It runs and stays looked after',
        b: 'Built, shipped, monitored. If something breaks, you write to me instead of a hotline.',
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
    sitz: 'Based in',
    zurueck: 'Back to the home page',
    formular: {
      titel: 'Write to me',
      leistung: 'What is it about?',
      leistungLeer: 'Not sure yet',
      name: 'Name',
      epost: 'Email',
      nachricht: 'What is going on?',
      nachrichtHinweis: 'What you do and what is not working right now. Three sentences will do.',
      senden: 'Write the enquiry',
      hinweis:
        'Opens your email with everything filled in. You see what goes out before you send it.',
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
      'Un escritorio en la cima de una montaña sobre el mar de nubes, con el sol saliendo tras los valles.',
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
  verstaendnis: {
    label: 'Lo que he entendido',
    akte: [
      {
        wortLinks: 'ALGO',
        wortRechts: 'RITMO',
        titel: 'Sé según qué se ordena.',
        text: 'Ninguna plataforma muestra un vídeo porque sea bueno. Lo muestra porque lo dicen los números: cuánto se queda alguien, si lo rebobina, si lo guarda, si lo reenvía. Esas magnitudes no son ningún secreto. Solo hay que tomárselas en serio antes del primer corte.',
      },
      {
        wortLinks: 'SIEMPRE',
        wortRechts: 'DISTINTO',
        titel: 'Y que se desplazan.',
        text: 'Lo que pesa este mes pesa menos el siguiente. La ponderación cambia sin avisar, y cada truco construido para un ajuste exacto muere con él. Por eso no cuelgo nada de un truco.',
      },
      {
        wortLinks: 'TRES',
        wortRechts: 'SEGUNDOS',
        titel: 'La persona no se desplaza.',
        text: 'Tres segundos deciden si alguien sigue deslizando. En ese tiempo nadie lee, reconoce: una cara, un movimiento, algo que no encaja. Quien acierta ahí no necesita burlar al algoritmo. Le entrega justo la señal que está esperando.',
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
        text: 'Producto propio: acceso a través de un proveedor externo, análisis de grandes volúmenes de datos y funcionamiento continuo en infraestructura propia.',
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
    titel: 'Elige lo que más aprieta ahora.',
    vorspann:
      'No hace falta hacerlo todo a la vez. Casi siempre es uno de estos cuatro puntos, y ese ya marca la diferencia.',
    anfragen: 'Consultar sin compromiso',
    mehr: 'Más información',
    punkte: [
      {
        n: '01',
        slug: 'neue-website',
        titel: 'Una web nueva',
        text: 'Desde el primer boceto hasta el día en que funciona. Se ve igual de bien en el móvil que en el ordenador, se encuentra en Google y te envía las solicitudes directamente. Una landing en dos o tres semanas, una web de varias páginas en cuatro a ocho.',
        detail: {
          vorspann:
            'Una web que no solo está, sino que trabaja: que se encuentra, que se entiende, que trae solicitudes. Construida por una sola persona, de la estructura al diseño y al código — sin traspasos ni estaciones intermedias.',
          dabei: {
            titel: 'Qué se obtiene',
            punkte: [
              'Estructura y textos trabajados juntos, no entregados por ti y pegados por mí',
              'Diseño propio en lugar de plantilla, pensado primero para el móvil',
              'SEO técnico desde el principio: estructura, tiempo de carga, datos estructurados',
              'Accesible según la ley alemana, no añadido después',
              'Una vía de contacto que llega a ti y no acaba en la nada',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Una conversación, luego un borrador que ves antes de comprometerte. Después se construye, ves los avances, y sale en vivo — con una entrega para que puedas cambiar los textos tú mismo.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'Una landing en dos o tres semanas, una web de varias páginas en cuatro a ocho. Precio cerrado, sin partes de horas: sabes lo que cuesta antes de empezar.',
          },
        },
      },
      {
        n: '02',
        slug: 'website-ueberarbeiten',
        titel: 'Renovar la que ya tienes',
        text: 'Cuando la estructura está bien pero nada más lo está. Un aspecto nuevo sin empezar de cero, más rápida y por fin correcta en el móvil. Y accesible según la ley alemana, que después cuesta más que de entrada.',
        detail: {
          vorspann:
            'No hace falta tirarlo todo. A menudo la estructura aguanta y lo que falta es todo lo demás: el aspecto, el tiempo de carga, el comportamiento en el móvil. Eso se puede renovar sin empezar de cero — más rápido y más barato que rehacerla.',
          dabei: {
            titel: 'Qué se obtiene',
            punkte: [
              'Una revisión de lo que hay: qué se queda, qué se va, qué hay que rehacer',
              'Aspecto nuevo sobre la estructura existente',
              'Tiempo de carga reducido — normalmente la mayor ganancia individual',
              'Correcta en el móvil, en vez de diseñada para escritorio y encajada a la fuerza',
              'Accesibilidad puesta al día',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Primero miro la web y te digo qué merece la pena y qué no. Solo después decidimos el alcance — puede que con tres cambios baste.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'De una a cuatro semanas según el alcance. La revisión de tu web actual es gratuita; después, precio cerrado para lo acordado.',
          },
        },
      },
      {
        n: '03',
        slug: 'automatisierung',
        titel: 'Automatizar lo repetitivo',
        text: 'Todo lo que haces a mano cada semana y no haría falta. Presupuestos, facturas, recordatorios de cita, clasificar y responder solicitudes.',
        detail: {
          vorspann:
            'Toda empresa tiene tres o cinco pasos que vuelven cada semana y no son de nadie. Teclear presupuestos, recordar citas, clasificar solicitudes. Eso se puede delegar — no a una persona, sino a un proceso que funciona igual siempre.',
          dabei: {
            titel: 'Qué se obtiene',
            punkte: [
              'Presupuestos y facturas desde una plantilla, no de memoria',
              'Recordatorios de cita que salen solos',
              'Solicitudes preclasificadas, respondidas o derivadas',
              'Un solo sitio donde ves lo que está abierto, en vez de cinco buzones',
              'Conectado a lo que ya usas, sin otro programa más',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Repasamos una semana de tu trabajo y buscamos los pasos que se repiten. El más caro va primero, para que el esfuerzo se pague enseguida.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'Un proceso suele estar listo en una o dos semanas. Precio cerrado por proceso, para que decidas cuántos son.',
          },
        },
      },
      {
        n: '04',
        slug: 'gefunden-werden',
        titel: 'Solo que te encuentren',
        text: 'La web se queda como está. Aun así se vuelve visible: arriba en Google y en las respuestas de ChatGPT y Perplexity.',
        detail: {
          vorspann:
            'A veces la web está bien y simplemente nadie la encuentra. Entonces no hay que rehacer nada. La visibilidad es un trabajo propio: que Google te entienda — y a estas alturas también los motores de respuesta que cada vez más gente usa en lugar de buscar.',
          dabei: {
            titel: 'Qué se obtiene',
            punkte: [
              'SEO técnico: estructura, tiempo de carga, datos estructurados',
              'Los términos que de verdad se buscan en tu zona',
              'Una ficha de Google que encaja con la web en vez de ir por su lado',
              'Contenidos que ChatGPT y Perplexity pueden citar',
              'Medición, para ver si funciona en vez de creerlo',
            ],
          },
          ablauf: {
            titel: 'Cómo funciona',
            text: 'Primero un diagnóstico con cifras, luego los cambios por orden de efecto. Recibes la medición antes y después, no solo un informe.',
          },
          preis: {
            titel: 'Plazo y precio',
            text: 'El diagnóstico son unos pocos días. Lo que venga después depende del hallazgo y se nombra antes como precio cerrado.',
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
        t: 'Tú me cuentas',
        b: 'Dos minutos de formulario o una llamada. Quiero saber qué te molesta, no qué tecnología tienes en mente.',
      },
      {
        n: '02',
        t: 'Yo te digo qué se puede',
        b: 'En menos de 24 horas: un precio cerrado en lugar de una hoja de horas, lo que tarda y si merece la pena. También cuando la respuesta es no.',
      },
      {
        n: '03',
        t: 'Lo ves antes',
        b: 'Si quieres, una primera propuesta antes de comprometerte. Si no te gusta, no has perdido nada.',
      },
      {
        n: '04',
        t: 'Funciona y sigue atendida',
        b: 'Hecha, publicada y vigilada. Si algo falla, me escribes a mí y no a un centro de atención.',
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
    sitz: 'Sede',
    zurueck: 'Volver a la página de inicio',
    formular: {
      titel: 'Escríbeme',
      leistung: '¿De qué se trata?',
      leistungLeer: 'Aún no lo sé',
      name: 'Nombre',
      epost: 'Correo',
      nachricht: '¿Qué ocurre?',
      nachrichtHinweis: 'A qué os dedicáis y qué no está funcionando. Con tres frases basta.',
      senden: 'Redactar la consulta',
      hinweis:
        'Abre tu correo con todo ya escrito. Ves lo que sale antes de enviarlo.',
    },
  },
}

export const HD_TEXTE: Record<HdLang, HdTexte> = { de: DE, en: EN, es: ES }

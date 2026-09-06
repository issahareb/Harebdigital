import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Anfrageformular } from '@/components/anfrageformular'
import { HdUnterseite } from '@/components/hd-unterseite'
import { HD_TEXTE } from '@/lib/hd-texte'
import { marke } from '@/lib/marke'
import { sprache } from '@/lib/sprache'

/**
 * Die Kontaktseite — das Ziel jedes Rufs zur Tat auf der Landingpage.
 *
 * Unter issahareb.me zeigte der Knopf auf `/anfrage`, ein Formular, das seine
 * Eingaben an den L.U.K.A.S.-Server weiterreicht. Das haengt an einem fremden
 * Dienst und an einem Token, die beide nicht mit umgezogen sind. Hier stehen
 * deshalb die beiden Wege, auf denen eine Anfrage tatsaechlich ankommt.
 *
 * Ein Formular gibt es inzwischen doch — aber eines, das nichts verspricht,
 * was es nicht haelt: es setzt die E-Mail auf und uebergibt sie dem
 * Mailprogramm des Besuchers. Er sieht, was rausgeht, und hat es im eigenen
 * Postausgang. Ein Formular, das "danke" sagt und die Nachricht verwirft,
 * waere schlechter als gar keines.
 *
 * `?leistung=<slug>` belegt die Auswahl vor. Wer auf einer Kachel oder einer
 * Detailseite auf "anfragen" geklickt hat, findet sie schon ausgewaehlt.
 */

export async function generateMetadata(): Promise<Metadata> {
  const t = HD_TEXTE[await sprache()].kontakt
  return {
    title: `${t.titel} — Hareb Digital`,
    description: t.beschreibung,
    alternates: { canonical: '/kontakt/' },
  }
}

export default async function Kontaktseite() {
  const lang = await sprache()
  const t = HD_TEXTE[lang].kontakt

  return (
    <HdUnterseite lang={lang}>
      <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
        {t.titel}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--hd-ink-soft)]">
        {t.vorspann}
      </p>

      {/* `Suspense`, weil das Formular die Adresszeile liest. Ohne die Klammer
          zwingt Next die ganze Seite in die Auslieferung beim Aufruf und
          meldet das beim Bauen als Fehler. */}
      <Suspense fallback={null}>
        <Anfrageformular t={HD_TEXTE[lang]} epost={marke.email} />
      </Suspense>

      <dl className="mt-16 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="hd-label">{t.epost}</dt>
          <dd className="mt-1 text-lg">
            <a href={`mailto:${marke.email}`} className="hover:text-[color:var(--hd-accent)]">
              {marke.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="hd-label">{t.telefon}</dt>
          <dd className="mt-1 text-lg">
            <a
              href={`tel:${marke.telefon.replace(/\s/g, '')}`}
              className="hover:text-[color:var(--hd-accent)]"
            >
              {marke.telefon}
            </a>
          </dd>
        </div>
        <div>
          <dt className="hd-label">{t.sitz}</dt>
          <dd className="mt-1 text-lg">{marke.ort}</dd>
        </div>
      </dl>
    </HdUnterseite>
  )
}

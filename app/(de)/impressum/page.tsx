import type { Metadata } from 'next'
import { HdUnterseite, Rechtsabschnitt } from '@/components/hd-unterseite'
import { marke } from '@/lib/marke'
import { sprache } from '@/lib/sprache'

export const metadata: Metadata = {
  title: `Impressum — ${marke.name}`,
  description: `Impressum und Anbieterkennzeichnung von ${marke.name}.`,
  alternates: { canonical: '/impressum/' },
  // Rechtstexte gehören nicht in den Index — sie sollen niemanden anziehen.
  robots: { index: false, follow: true },
}

/** Einheitliche deutsche Anbieterkennzeichnung für alle Sprachversionen. */
export default async function Impressum() {
  return (
    <HdUnterseite lang={await sprache()}>
      <div lang="de">
        <h1 className="font-display text-4xl font-bold tracking-tight">Impressum</h1>

        <div className="mt-10 max-w-2xl space-y-8">
          <Rechtsabschnitt titel="Angaben gemäß § 5 DDG">
            <p>
              {marke.name}
              <br />
              {marke.inhaber}
              <br />
              {marke.strasse}
              <br />
              {marke.plz} {marke.ort}
              <br />
              Deutschland
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Geschäftssitz und Tätigkeitsgebiet">
            <p>Geschäftssitz in Sankt Augustin, persönlich in Essen und im Ruhrgebiet tätig. Betreuung von Projekten auch überregional.</p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Kontakt">
            <p>
              Telefon: <a href={`tel:${marke.telefon.replace(/\s/g, '')}`}>{marke.telefon}</a>
              <br />
              E-Mail: <a href={`mailto:${marke.kontaktEmail}`}>{marke.kontaktEmail}</a>
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Umsatzsteuer">
            <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>{marke.inhaber}, Anschrift wie oben</p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Streitschlichtung">
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Rechtsabschnitt>
        </div>
      </div>
    </HdUnterseite>
  )
}

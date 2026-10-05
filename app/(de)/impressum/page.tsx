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

/*
 * Deutsch, auch wenn die Seite darum herum drei Sprachen spricht.
 *
 * Das ist kein Versäumnis: die Anbieterkennzeichnung nach § 5 DDG richtet sich
 * nach dem Recht am Sitz des Anbieters, und der ist Essen. Eine übersetzte
 * Fassung wäre keine zweite Rechtsgrundlage, sondern nur eine zweite Stelle,
 * an der ein Zahlendreher stehen kann. Der Rahmen bleibt in der Sprache des
 * Besuchers, der Text selbst trägt sein eigenes `lang`.
 */
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
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Kontakt">
            <p>
              Telefon: {marke.telefon}
              <br />
              E-Mail: {marke.email}
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Umsatzsteuer">
            <p>PLATZHALTER_USTID</p>
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

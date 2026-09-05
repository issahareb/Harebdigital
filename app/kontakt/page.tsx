import type { Metadata } from 'next'
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
 * Ein nachgebautes Formular ohne Empfaenger waere die schlechtere Loesung: es
 * saehe vollstaendiger aus und waere es nicht — der Besucher glaubt, er habe
 * Kontakt aufgenommen, und versucht es kein zweites Mal.
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

      <dl className="mt-12 grid gap-6 sm:grid-cols-2">
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { HdUnterseite } from '@/components/hd-unterseite'
import { HD_SPRACHEN, HD_TEXTE } from '@/lib/hd-texte'
import { sprache } from '@/lib/sprache'

/**
 * Die Detailseite einer Leistung.
 *
 * Auf der Startseite steht je Leistung ein Absatz — genug, um zu erkennen, ob
 * es die eigene Sache ist, zu wenig, um sich zu entscheiden. Hier steht, was
 * dabei entsteht, wie es laeuft und was es kostet.
 *
 * Der `slug` ist in allen drei Sprachen derselbe. Das ist Absicht: wer die
 * Sprache umstellt, soll auf derselben Seite bleiben und nicht auf der
 * Startseite landen. Der Text darauf wechselt, die Adresse nicht.
 *
 * Dieselbe Kennung belegt drueben im Formular die Auswahl vor — deshalb ist
 * sie eine eigene Angabe im Wortverzeichnis und nicht aus dem Titel abgeleitet:
 * ein Titel aendert sich, eine Adresse darf das nicht.
 */

/* Alle vier Adressen stehen beim Bauen fest. Sie sind in jeder Sprache
   gleich, also genuegt eine Liste. */
export function generateStaticParams() {
  return HD_TEXTE[HD_SPRACHEN[0]].leistungen.punkte.map((l) => ({ slug: l.slug }))
}

function finde(lang: (typeof HD_SPRACHEN)[number], slug: string) {
  return HD_TEXTE[lang].leistungen.punkte.find((l) => l.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const lang = await sprache()
  const l = finde(lang, slug)
  if (!l) return {}
  return {
    title: `${l.titel} — Hareb Digital`,
    description: l.detail.vorspann,
    alternates: { canonical: `/leistungen/${slug}/` },
    openGraph: {
      type: 'article',
      title: `${l.titel} — Hareb Digital`,
      description: l.detail.vorspann,
      url: `/leistungen/${slug}/`,
    },
  }
}

export default async function Leistungsseite({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const lang = await sprache()
  const l = finde(lang, slug)
  if (!l) notFound()

  const t = HD_TEXTE[lang]

  return (
    <HdUnterseite lang={lang}>
      <span className="hd-label">{t.leistungen.label}</span>
      <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
        {l.titel}
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--hd-ink-soft)]">
        {l.detail.vorspann}
      </p>

      <section className="mt-14">
        <h2 className="font-display text-xl font-bold tracking-tight">{l.detail.dabei.titel}</h2>
        <ul className="mt-5 space-y-3">
          {l.detail.dabei.punkte.map((p) => (
            <li key={p} className="flex gap-3 text-pretty leading-relaxed text-[color:var(--hd-ink-soft)]">
              <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[color:var(--hd-accent)]" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-tight">{l.detail.ablauf.titel}</h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[color:var(--hd-ink-soft)]">
          {l.detail.ablauf.text}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-tight">{l.detail.preis.titel}</h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[color:var(--hd-ink-soft)]">
          {l.detail.preis.text}
        </p>
      </section>

      {/* Der Weg zurueck ins Formular, mit dieser Leistung schon ausgewaehlt.
          Wer bis hierher gelesen hat, soll nicht erst wieder suchen muessen,
          worum es ging. */}
      <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={`/kontakt/?leistung=${l.slug}`} className="hd-cta px-7 py-3.5 text-[17px]">
          {t.leistungen.anfragen}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
        <Link
          href="/#leistungen"
          className="text-[15px] text-[color:var(--hd-ink-soft)] underline-offset-4 hover:text-[color:var(--hd-ink)] hover:underline"
        >
          {t.leistungen.titel}
        </Link>
      </div>
    </HdUnterseite>
  )
}

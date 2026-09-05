import type { Metadata } from 'next'
import { HdLanding } from '@/components/hd-landing'
import { HD_TEXTE } from '@/lib/hd-texte'
import { sprache } from '@/lib/sprache'

/**
 * Die Landingpage von Hareb Digital — jetzt die Startseite der eigenen Domain.
 *
 * Die Seite selbst ist ein Server-Bauteil und trägt nur die Metadaten und die
 * Sprachwahl; alles Bewegte liegt in einem Client-Blatt daneben. Das ist keine
 * Formsache: die Scroll-Kopplung und die hochzählenden Zahlen brauchen den
 * Browser, die Metadaten nicht.
 *
 * Die Sprache kommt aus der Wahl im Schalter, sonst aus dem
 * Accept-Language-Kopf, sonst aus dem Land, und in keinem Fall aus der
 * Adresse. Der Kopf ist ein Anfrageheader, die Seite wird damit bei jedem
 * Aufruf gerendert statt einmal vorab. Für eine Seite ohne Datenbankzugriff
 * ist das eine Handvoll Millisekunden.
 *
 * `canonical` zeigt fest auf die Wurzel: es gibt genau eine Adresse für alle
 * drei Sprachfassungen, und ein Crawler soll sie auch als eine behandeln.
 */

export async function generateMetadata(): Promise<Metadata> {
  const t = HD_TEXTE[await sprache()]
  return {
    title: t.meta.titel,
    description: t.meta.beschreibung,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName: 'Hareb Digital',
      title: t.meta.titel,
      description: t.meta.beschreibung,
      url: '/',
    },
  }
}

export default async function Startseite() {
  return <HdLanding lang={await sprache()} />
}

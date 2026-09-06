import type { MetadataRoute } from 'next'
import { HD_SPRACHEN, HD_TEXTE } from '@/lib/hd-texte'
import { DOMAIN } from '@/lib/marke'

/*
 * Zwei Adressen, mehr gibt es nicht: die Landingpage und die Kontaktseite.
 *
 * Die Sprachfassungen stehen bewusst NICHT drin. Sie haben keine eigenen
 * Adressen — dieselbe URL liefert je nach Accept-Language einen anderen Text.
 * Ein hreflang-Eintrag ohne eigene Adresse waere eine Falschaussage.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const jetzt = new Date()
  /* Die vier Leistungsseiten. Ihre Adressen sind in allen drei Sprachen
     dieselben, also genuegt eine Liste — und genau deshalb stehen sie
     ueberhaupt in der Sitemap: eine Seite, die je nach Browsersprache anders
     heisst, koennte man einem Crawler nicht nennen. */
  const leistungen = HD_TEXTE[HD_SPRACHEN[0]].leistungen.punkte.map((l) => ({
    url: `${DOMAIN}/leistungen/${l.slug}/`,
    lastModified: jetzt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${DOMAIN}/`, lastModified: jetzt, changeFrequency: 'weekly', priority: 1 },
    ...leistungen,
    { url: `${DOMAIN}/kontakt/`, lastModified: jetzt, changeFrequency: 'monthly', priority: 0.8 },
  ]
}

import type { MetadataRoute } from 'next'
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
  return [
    { url: `${DOMAIN}/`, lastModified: jetzt, changeFrequency: 'weekly', priority: 1 },
    { url: `${DOMAIN}/kontakt/`, lastModified: jetzt, changeFrequency: 'monthly', priority: 0.8 },
  ]
}

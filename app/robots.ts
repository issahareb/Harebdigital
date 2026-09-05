import type { MetadataRoute } from 'next'
import { DOMAIN } from '@/lib/marke'

/*
 * Die Seite trug unter issahareb.me/start `noindex` — mit der Begruendung,
 * dass sie unter einer fremden Domain keine Bewertung aufbauen soll, die beim
 * Umzug verloren geht. Der Umzug ist passiert, also wird indexiert.
 *
 * Die Rechtsseiten bleiben draussen: sie sollen niemanden anziehen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/impressum/', '/datenschutz/'] }],
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  }
}

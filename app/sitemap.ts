import type { MetadataRoute } from 'next'
import { HD_SPRACHEN, HD_TEXTE } from '@/lib/hd-texte'
import { DOMAIN } from '@/lib/marke'
import { languageAlternates, localizedPath } from '@/lib/locale'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...HD_TEXTE.de.leistungen.punkte.map((l) => `/leistungen/${l.slug}/`),
    '/kontakt/',
  ]
  // lastModified is intentionally omitted: a build date is not a content change.
  return paths.flatMap((path) =>
    HD_SPRACHEN.map((lang) => ({
      url: `${DOMAIN}${localizedPath(lang, path)}`,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([code, url]) => [code, `${DOMAIN}${url}`]),
        ),
      },
    })),
  )
}

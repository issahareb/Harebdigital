import type { Metadata } from 'next'
import type { HdLang } from './hd-texte'
import { DOMAIN } from './marke'
import { languageAlternates, localizedPath } from './locale'
import { STUDIO_COPY } from './studio-copy'

export function pageMetadata(
  lang: HdLang,
  path = '/',
  title = STUDIO_COPY[lang].title,
  description = STUDIO_COPY[lang].description,
): Metadata {
  const url = localizedPath(lang, path)
  const image = {
    url: '/studio/impulse/og-impulse.jpg',
    width: 1200,
    height: 630,
    alt: 'Hareb Digital – Webdesign, SEO & Automatisierung',
  }
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      siteName: 'Hareb Digital',
      title,
      description,
      url,
      locale: { de: 'de_DE', en: 'en_GB', es: 'es_ES' }[lang],
      alternateLocale: ['de_DE', 'en_GB', 'es_ES'].filter(
        (l) => l !== { de: 'de_DE', en: 'en_GB', es: 'es_ES' }[lang],
      ),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${DOMAIN}${image.url}`] },
  }
}

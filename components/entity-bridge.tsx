import type { HdLang } from '@/lib/hd-texte'

const PERSON_ID = 'https://issahareb.me/#issa-hareb'
const ORGANIZATION_ID = 'https://issahareb.me/#hareb-digital'
const PORTFOLIO_URL = 'https://issahareb.me/'
const HAREB_DIGITAL_URL = 'https://hareb.digital/'
const GOOGLE_BUSINESS_URL = 'https://share.google/EUZlSQOOkoXIK0AMM'
const INSTAGRAM_URL = 'https://www.instagram.com/issa3701__/'
const TIKTOK_URL = 'https://www.tiktok.com/@issa3701'

const COPY: Record<HdLang, { prefix: string; suffix: string; link: string }> = {
  de: {
    prefix: 'Hareb Digital wurde von',
    suffix: 'gegründet.',
    link: 'Portfolio und Projekte',
  },
  en: {
    prefix: 'Hareb Digital was founded by',
    suffix: '.',
    link: 'Portfolio and projects',
  },
  es: {
    prefix: 'Hareb Digital fue fundada por',
    suffix: '.',
    link: 'Portafolio y proyectos',
  },
}

const ENTITY_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': ORGANIZATION_ID,
      name: 'Hareb Digital',
      url: HAREB_DIGITAL_URL,
      founder: { '@id': PERSON_ID },
      employee: { '@id': PERSON_ID },
      sameAs: [GOOGLE_BUSINESS_URL],
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Issa Hareb',
      url: PORTFOLIO_URL,
      jobTitle: 'Founder of Hareb Digital',
      worksFor: { '@id': ORGANIZATION_ID },
      sameAs: [INSTAGRAM_URL, TIKTOK_URL],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hareb.digital/#website',
      url: HAREB_DIGITAL_URL,
      name: 'Hareb Digital',
      publisher: { '@id': ORGANIZATION_ID },
      about: { '@id': ORGANIZATION_ID },
    },
  ],
}

/**
 * Cross-domain entity bridge. The organisation id intentionally matches the
 * id already used on issahareb.me, while the founder points back to the exact
 * Person id from the portfolio. That gives crawlers the same two entities in
 * both directions instead of two similarly named but disconnected records.
 */
export function EntityBridge({ lang }: { lang: HdLang }) {
  const t = COPY[lang]

  return (
    <section
      aria-label="Hareb Digital founder"
      className="border-t border-white/10 bg-[#0b0a09] px-6 py-6 text-white/65"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ENTITY_GRAPH) }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[13px] leading-relaxed sm:flex-row sm:items-center sm:justify-between">
        <p>
          {t.prefix}{' '}
          <a
            href={PORTFOLIO_URL}
            className="font-medium text-white/85 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
          >
            Issa Hareb
          </a>{' '}
          {t.suffix}
        </p>
        <a
          href={PORTFOLIO_URL}
          className="w-fit underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
        >
          {t.link}: issahareb.me
        </a>
      </div>
    </section>
  )
}

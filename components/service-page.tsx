import { LocalServices } from './local-services'
import { AiDiscovery } from './ai-discovery'
import { WebdesignDetails } from './webdesign-details'
import Link from 'next/link'
import { ServiceVisual } from './service-visual'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { DOMAIN } from '@/lib/marke'
import { localizedPath } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { HdUnterseite } from './hd-unterseite'
import { JsonLd, ORGANIZATION_ID } from './studio-schema'

const descriptions: Record<HdLang, string[]> = {
  de: [
    'Individuelles Webdesign und Webentwicklung für Unternehmen in Essen, Bonn und darüber hinaus. Leistungen, Ablauf und Kundenprojekt im Überblick.',
    'Website-Relaunch mit Hareb Digital: Inhalte sinnvoll übernehmen, Design verbessern und Ladezeiten reduzieren. Direkte Abstimmung mit dem Entwickler.',
    'Wiederkehrende Aufgaben automatisieren: Angebote, Terminerinnerungen und Anfragen. Hareb Digital verbindet passende Abläufe mit deinen Werkzeugen.',
    'Technisches SEO und AEO: klare Seitenstruktur, lokale Auffindbarkeit und verständliche Antworten. Für Unternehmen aus Essen, Bonn und darüber hinaus.',
  ],
  en: [
    'Bespoke web design, responsive development and technical SEO for businesses in Essen, Bonn and beyond. Plan your new website with Issa Hareb.',
    'Redesign your website with Hareb Digital: preserve useful content, improve the design and reduce loading times. Clear planning and one point of contact.',
    'Automate recurring tasks, from quotes and appointment reminders to enquiries. Hareb Digital connects workflows with the tools your business already uses.',
    'Technical SEO and AEO: clear site structure, local visibility and useful answers. Hareb Digital works with businesses in Essen, Bonn and beyond.',
  ],
  es: [
    'Diseño web a medida, desarrollo adaptable y SEO técnico para empresas de Essen, Bonn y otros lugares. Planifica tu nueva web con Issa Hareb.',
    'Rediseña tu web con Hareb Digital: conserva los contenidos útiles, mejora el diseño y reduce los tiempos de carga. Planificación clara y contacto directo.',
    'Automatiza tareas recurrentes, presupuestos, recordatorios y consultas. Hareb Digital conecta procesos con las herramientas que tu empresa ya utiliza.',
    'SEO técnico y AEO: estructura clara, visibilidad local y respuestas útiles. Hareb Digital ayuda a empresas de Essen, Bonn y otros lugares.',
  ],
}
export function serviceMetadata(lang: HdLang, slug: string) {
  const index = HD_TEXTE[lang].leistungen.punkte.findIndex((l) => l.slug === slug)
  if (index < 0) notFound()
  const title = lang === 'de' && index === 0
    ? 'Website erstellen lassen | Hareb Digital'
    : lang === 'en' && index === 3
      ? 'SEO & AEO for Search Visibility | Hareb Digital'
    : `${STUDIO_COPY[lang].serviceNames[index]} | Hareb Digital`
  return pageMetadata(lang, `/leistungen/${slug}/`, title, descriptions[lang][index])
}
export function ServicePage({ lang, slug }: { lang: HdLang; slug: string }) {
  const t = STUDIO_COPY[lang]
  const original = HD_TEXTE[lang]
  const i = original.leistungen.punkte.findIndex((l) => l.slug === slug)
  if (i < 0) notFound()
  const service = original.leistungen.punkte[i]
  const url = `${DOMAIN}${localizedPath(lang, `/leistungen/${slug}/`)}`
  return (
    <HdUnterseite lang={lang} motiv>
      <nav className="breadcrumbs" aria-label={t.breadcrumb}>
        <Link data-track-id="service-page-link-1" href={localizedPath(lang)}>{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link data-track-id="service-page-link-2" href={`${localizedPath(lang)}#leistungen`}>{t.nav[1]}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t.serviceNames[i]}</span>
      </nav>
      <span className="eyebrow">
        {service.n} / {t.nav[1]}
      </span>
      <h1 className="mt-5">{lang === 'de' && i === 0 ? 'Website erstellen lassen' : t.serviceNames[i]}</h1>
      <p className="service-detail-lead">{lang === 'de' && i === 0
        ? 'Ich bin Issa Hareb und entwickle Unternehmenswebsites mit klaren Inhalten, mobiler Gestaltung und passenden Kontaktwegen. Ich betreue Projekte in Essen, Bonn und darüber hinaus persönlich.'
        : service.detail.vorspann}</p>
      <figure className="service-detail-art" data-reveal>
        <ServiceVisual index={i} lang={lang} />
        <figcaption>
          <span>
            0{i + 1} / {t.serviceNames[i]}
          </span>
          <span>HAREB DIGITAL</span>
        </figcaption>
      </figure>
      <div className="service-detail-grid" data-reveal>
        <section data-track-section="service-page-section-3">
          <h2>{service.detail.dabei.titel}</h2>
          <ul>
            {service.detail.dabei.punkte.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <div>
          <section data-track-section="service-page-section-4">
            <h2>{service.detail.ablauf.titel}</h2>
            <p>{service.detail.ablauf.text}</p>
          </section>
          <section data-track-section="service-page-section-5">
            <h2>{service.detail.preis.titel}</h2>
            <p>{service.detail.preis.text}</p>
          </section>
        </div>
      </div>
      {lang === 'de' && i === 0 && <WebdesignDetails />}
      {i === 3 && <AiDiscovery lang={lang} />}
      {lang === 'de' && <LocalServices currentPath={`/leistungen/${slug}/`} />}
      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Link
          href={`${localizedPath(lang, '/kontakt/')}?leistung=${service.slug}`}
          className="button button-dark"
        >
          {t.project}
          <ArrowUpRight size={18} aria-hidden />
        </Link>
        <Link data-track-id="service-page-link-6" href={`${localizedPath(lang)}#leistungen`} className="text-link">
          {t.nav[1]}
          <ArrowUpRight size={17} aria-hidden />
        </Link>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': `${url}#service`,
              name: t.serviceNames[i],
              description: descriptions[lang][i],
              url,
              provider: {
                '@type': 'ProfessionalService',
                '@id': ORGANIZATION_ID,
                name: 'Hareb Digital',
                url: `${DOMAIN}/`,
              },
              areaServed: [{ '@type': 'City', name: 'Essen' }, { '@type': 'City', name: 'Bonn' }, { '@type': 'Country', name: 'Germany' }],
              availableChannel: {
                '@type': 'ServiceChannel',
                serviceUrl: `${DOMAIN}${localizedPath(lang, '/kontakt/')}`,
              },
            },
            {
              '@type': 'WebPage',
              '@id': `${url}#webpage`,
              url,
              name: t.serviceNames[i],
              inLanguage: lang,
              mainEntity: { '@id': `${url}#service` },
              isPartOf: { '@id': `${DOMAIN}/#website` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t.home,
                  item: `${DOMAIN}${localizedPath(lang)}`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: t.serviceNames[i],
                  item: url,
                },
              ],
            },
          ],
        }}
      />
    </HdUnterseite>
  )
}

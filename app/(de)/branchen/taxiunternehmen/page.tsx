import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { HdUnterseite } from '@/components/hd-unterseite'
import { JsonLd, ORGANIZATION_ID } from '@/components/studio-schema'
import { DOMAIN } from '@/lib/marke'
import { ONE_PAGER_PRICE, WEBSITE_PRICE, HOSTING_MONTHLY_PRICE, WEBSITE_PACKAGE } from '@/lib/pricing'

const path = '/branchen/taxiunternehmen/'
const url = `${DOMAIN}${path}`
const title = 'Website für Taxiunternehmen | Hareb Digital'
const description = 'Websites für Taxiunternehmen: Leistungen zeigen und Fahrtanfragen geordnet erfassen. Mit Einblick in das Kundenprojekt Taxi B&B Essen und klarer Preisorientierung.'
const enquiry = `/kontakt/?leistung=neue-website&projekt=${encodeURIComponent('Ich plane eine Website für mein Taxiunternehmen. Bitte klären Sie mit mir den Website-Umfang und ein separates Angebot für mögliche Online-Fahrtanfragen.\n\nMein Betrieb: ')}`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url, languages: { 'de-DE': url } },
  openGraph: {
    type: 'website', url, title, description, locale: 'de_DE',
    images: [{ url: '/studio/evidence/taxi-desktop-20261016-v9.webp', width: 1440, height: 940, alt: 'Website des Kundenprojekts Taxi B&B Essen' }],
  },
}

export default function TaxiWebsitePage() {
  return <HdUnterseite lang="de" motiv>
    <nav className="breadcrumbs" aria-label="Brotkrumennavigation">
      <Link href="/">Startseite</Link><span aria-hidden="true">/</span><span aria-current="page">Websites für Taxiunternehmen</span>
    </nav>
    <span className="eyebrow">FÜR TAXIUNTERNEHMEN</span>
    <h1 className="mt-5">Dein Taxibetrieb.<br />Ein klarer Weg zur Fahrtanfrage.</h1>
    <p className="service-detail-lead">Eine Website für dein Taxiunternehmen zeigt Fahrgästen, welche Leistungen du anbietest und wie sie dich erreichen. Ich bin Issa Hareb und verbinde deinen Auftritt mit einem Anfrageweg, der zu deinem Betrieb passt.</p>
    <div className="mt-8 flex flex-wrap items-center gap-6">
      <Link className="button button-dark" href={enquiry} data-track-id="taxi-industry-enquire">Taxi-Website besprechen <ArrowUpRight size={17} aria-hidden /></Link>
      <Link className="text-link" href="/projekte/taxi-bb-essen/" data-track-id="taxi-industry-proof">Kundenprojekt ansehen <ArrowUpRight size={17} aria-hidden /></Link>
    </div>

    <div className="service-detail-grid mt-12">
      <section data-track-section="taxi-industry-website">
        <h2>Fahrgäste finden die passenden Informationen.</h2>
        <p>Leistungen, Einzugsgebiet und Kontaktmöglichkeiten werden verständlich dargestellt. Auf dem Handy sollen Fahrgäste direkt erkennen, ob dein Angebot zu ihrer Fahrt passt und wie sie anfragen können.</p>
        <ul>
          <li>Eigene Inhalte zu den tatsächlich angebotenen Leistungen</li>
          <li>Gut erreichbare Kontaktmöglichkeiten auf dem Smartphone</li>
          <li>Klare Seitenstruktur und technische SEO-Grundlagen</li>
        </ul>
      </section>
      <section data-track-section="taxi-industry-enquiries">
        <h2>Du bekommst Angaben, mit denen du arbeiten kannst.</h2>
        <p>Wenn du Online-Fahrtanfragen brauchst, planen wir gemeinsam die notwendigen Angaben: etwa Abholort, Ziel, gewünschte Zeit und Rückrufmöglichkeit. Danach legen wir fest, wie die Anfrage bei dir ankommt und bearbeitet wird.</p>
        <p>Eine Fahrtanfrage ist noch keine bestätigte Buchung. Bestätigung, Verfügbarkeit und Zuständigkeiten stimmen wir vor der Umsetzung ab.</p>
      </section>
    </div>

    <section className="mt-12" data-track-section="taxi-industry-case" aria-labelledby="taxi-case-title">
      <span className="eyebrow">VERÖFFENTLICHTES KUNDENPROJEKT</span>
      <h2 id="taxi-case-title">So wurde es für Taxi B&amp;B Essen umgesetzt.</h2>
      <p>Für Taxi B&amp;B Essen habe ich eine responsive Website mit Online-Fahrtanfragen, einem geschützten Verwaltungsbereich und automatischen E-Mail-Benachrichtigungen entwickelt. Die Fallstudie zeigt die Funktionen und datierte technische Messungen.</p>
      <figure className="service-detail-art">
        <Image src="/studio/evidence/taxi-desktop-20261016-v9.webp" alt="Website von Taxi B&B Essen als Beispiel für einen Taxi-Webauftritt" width={1440} height={940} sizes="(max-width: 700px) 92vw, 1100px" />
        <figcaption>Taxi B&amp;B Essen · veröffentlichtes Kundenprojekt · Aufnahme vom 16. Oktober 2026</figcaption>
      </figure>
      <Link className="text-link" href="/projekte/taxi-bb-essen/" data-track-id="taxi-industry-case-details">Umsetzung und Messgrundlage ansehen <ArrowUpRight size={17} aria-hidden /></Link>
    </section>

    <div className="service-detail-grid mt-12">
      <section data-track-section="taxi-industry-scope">
        <h2>Was kostet die Website?</h2>
        <p>Ein One-Pager startet ab {ONE_PAGER_PRICE} €, eine mehrseitige Website ab {WEBSITE_PRICE.toLocaleString('de-DE')} €, jeweils einmalig. Optional auf Wunsch: Verwaltung, Hosting und Pflege für {HOSTING_MONTHLY_PRICE.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € im Monat. Seitenumfang, Inhalte und Konditionen stehen vor der Beauftragung in deinem Angebot.</p>
        <p>{WEBSITE_PACKAGE.de.scope}</p>
        <p>{WEBSITE_PACKAGE.de.timeline}</p>
        <p>Online-Fahrtanfragen, ein Verwaltungsbereich und individuelle Schnittstellen werden separat kalkuliert. Domain und Lizenzen sind nicht pauschal enthalten.</p>
        <Link className="text-link" href="/leistungen/neue-website/" data-track-id="taxi-industry-website-scope">Website-Angebote und Konditionen ansehen <ArrowUpRight size={17} aria-hidden /></Link>
      </section>
      <section data-track-section="taxi-industry-next-step">
        <h2>Was braucht dein Betrieb?</h2>
        <p>Schick mir den Namen deines Betriebs und, falls vorhanden, deine Website. Sag kurz dazu, welche Leistungen du zeigen möchtest und wie du Fahrtanfragen bisher bearbeitest. Daraus klären wir den passenden Umfang.</p>
        <p>Du hast bereits einen Auftritt? Bei einem <Link className="text-link" href="/leistungen/website-ueberarbeiten/">Website-Relaunch</Link> prüfen wir, welche Inhalte und Funktionen sinnvoll erhalten bleiben.</p>
        <Link className="button button-dark" href={enquiry} data-track-id="taxi-industry-final-enquire">Mein Taxiunternehmen vorstellen <ArrowUpRight size={17} aria-hidden /></Link>
      </section>
    </div>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Service', '@id': `${url}#service`, name: 'Websites für Taxiunternehmen', description, url, provider: { '@id': ORGANIZATION_ID }, serviceType: 'Webdesign und Webentwicklung', areaServed: { '@type': 'Country', name: 'Germany' } },
        { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, inLanguage: 'de', mainEntity: { '@id': `${url}#service` }, isPartOf: { '@id': `${DOMAIN}/#website` } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Websites für Taxiunternehmen', item: url },
        ] },
      ],
    }} />
  </HdUnterseite>
}

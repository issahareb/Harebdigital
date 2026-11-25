import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HdUnterseite } from '@/components/hd-unterseite'
import { JsonLd, ORGANIZATION_ID } from '@/components/studio-schema'
import { TENSA_GATE_URL, TensaVideo } from '@/components/tensa-case'

const url = 'https://hareb.digital/projekte/tensa/'
export const metadata: Metadata = {
  title: 'TENSA: Onlineshop im Aufbau | Hareb Digital',
  description: 'Einblicke in die laufende Entwicklung für die Modemarke TENSA: animierte Launch-Seite und ein umfangreicher Onlineshop mit Kundenkonten und modernen Zahlungsarten im Aufbau.',
  alternates: { canonical: url },
  openGraph: { url, title: 'TENSA · Einblick in die laufende Entwicklung', description: 'Animierte Gate-Seite für den ersten Drop. Der Onlineshop ist im Aufbau.', images: ['/projekte/tensa/launch-poster.webp'] },
}

export default function Page() {
  return <HdUnterseite lang="de" motiv>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${url}#projektbericht`,
      url,
      inLanguage: 'de',
      name: 'TENSA: Launch-Seite und Onlineshop im Aufbau',
      description: metadata.description,
      author: { '@id': ORGANIZATION_ID, '@type': 'Organization', name: 'Hareb Digital', url: 'https://hareb.digital/' },
      about: { '@type': 'WebSite', name: 'TENSA', url: TENSA_GATE_URL },
    }} />
    <nav className="breadcrumbs" aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span aria-current="page">TENSA</span></nav>
    <span className="eyebrow">KUNDENPROJEKT · MODE · IN BEARBEITUNG</span>
    <h1 className="mt-5">TENSA. Vorfreude auf den ersten Drop.</h1>
    <p className="service-detail-lead">Für die Modemarke TENSA entwickeln wir einen eigenständigen Markenauftritt und einen umfangreichen Onlineshop. Die Gate-Seite ist bereits online. Ein leuchtender 3D-Ring setzt den Zip-Hoodie für den ersten Drop in Szene.</p>
    <a className="text-link" href={TENSA_GATE_URL}>TENSA-Gate-Seite besuchen <ArrowUpRight size={17} aria-hidden /></a>
    <TensaVideo />
    <div className="service-detail-grid">
      <section><h2>Der Launch beginnt vor dem Verkauf.</h2><p>Die Gate-Seite kündigt den ersten Drop an und macht aus dem Warten ein Markenerlebnis. Das TENSA-Logo, das Produkt und eine bewegte Lichtinszenierung stehen im Mittelpunkt. Im Video ist zu sehen, wie die Beleuchtung auf die Bewegung des Mauszeigers reagiert.</p><p>So bekommt die Marke schon vor der Shopöffnung einen eigenen Auftritt. Dahinter entsteht aktuell der eigentliche Shop.</p></section>
      <section><h2>Der Shop dahinter.</h2><p>Im Aufbau ist ein Einkaufserlebnis vom ersten Produkt bis zur Bestellung. Zum geplanten Funktionsumfang gehören:</p><ul>
        <li>Kundenregistrierung und persönliche Konten mit Adressverwaltung und Bestellübersicht</li>
        <li>Kollektionen und Produktseiten mit Größen, Farben, Bildern und Verfügbarkeiten</li>
        <li>Warenkorb und ein übersichtlicher, für Smartphones optimierter Checkout</li>
        <li>PayPal, Klarna, Apple Pay, Google Pay, Vorkasse und Kauf auf Rechnung</li>
        <li>Bestellbestätigungen per E-Mail sowie Informationen zu Versand und Bestellstatus</li>
        <li>Verwaltung von Produkten, Lagerbeständen, Bestellungen und Rabattcodes</li>
      </ul><p>Diese Funktionen werden aktuell aufgebaut. Die Anbindung und Freischaltung der Zahlungsarten gehören zur weiteren Umsetzung vor dem Launch.</p><p>Du planst deinen eigenen Auftritt? Hier findest du den <Link className="text-link" href="/leistungen/neue-website/">Leistungsumfang für eine neue Website aus Essen</Link>.</p></section>
    </div>
    <div className="mt-12 flex flex-wrap items-center gap-6"><Link className="button button-dark" href="/kontakt/?leistung=webanwendungen">Eigenen Onlineshop besprechen <ArrowUpRight size={17} aria-hidden /></Link><Link className="text-link" href="/#arbeiten">Weitere Arbeiten ansehen <ArrowUpRight size={17} aria-hidden /></Link></div>
  </HdUnterseite>
}

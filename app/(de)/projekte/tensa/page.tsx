import type { Metadata } from 'next'
import Link from 'next/link'
import { HdUnterseite } from '@/components/hd-unterseite'
import { TensaVideo } from '@/components/tensa-case'

const url = 'https://hareb.digital/projekte/tensa/'
export const metadata: Metadata = {
  title: 'TENSA: Onlineshop im Aufbau | Hareb Digital',
  description: 'Einblicke in die laufende Entwicklung für die Modemarke TENSA: animierte Launch-Seite und ein umfangreicher Onlineshop mit Kundenkonten und modernen Zahlungsarten im Aufbau.',
  alternates: { canonical: url },
  openGraph: { url, title: 'TENSA · Einblick in die laufende Entwicklung', description: 'Launch-Inszenierung und Onlineshop für eine Modemarke. Noch nicht live.', images: ['/projekte/tensa/launch-poster.webp'] },
}

export default function Page() {
  return <HdUnterseite lang="de" motiv>
    <nav className="breadcrumbs" aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span aria-current="page">TENSA</span></nav>
    <span className="eyebrow">KUNDENPROJEKT · MODE · IN BEARBEITUNG</span>
    <h1 className="mt-5">TENSA. Vorfreude auf den ersten Drop.</h1>
    <p className="service-detail-lead">Für die Modemarke TENSA entwickeln wir einen eigenständigen Markenauftritt und einen umfangreichen Onlineshop. Die Website ist noch nicht live. Hier zeigen wir einen echten Zwischenstand aus der laufenden Arbeit.</p>
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
      </ul><p>Diese Funktionen werden aktuell aufgebaut. Die Anbindung und Freischaltung der Zahlungsarten gehören zur weiteren Umsetzung vor dem Launch.</p></section>
    </div>
    <div className="mt-12 flex flex-wrap items-center gap-6"><Link className="button button-dark" href="/kontakt/?leistung=webanwendungen">Eigenen Onlineshop besprechen ↗</Link><Link className="text-link" href="/#arbeiten">Weitere Arbeiten ansehen ↗</Link></div>
  </HdUnterseite>
}

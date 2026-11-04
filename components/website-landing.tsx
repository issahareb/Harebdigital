import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { IntroOffer } from './intro-offer'

/** Reuse the homepage's complete offer UI, including copy, controls and motion. */
export function WebsiteLanding() {
  return <>
    <IntroOffer headingLevel="h1" />
    <div className="wrap website-landing-more">
      <section aria-labelledby="website-local-title">
        <h2 id="website-local-title">Website erstellen lassen in Essen</h2>
        <p>Ich bin Issa Hareb und entwickle Websites für Unternehmen in Essen und im Ruhrgebiet. Von der Gestaltung bis zur technischen Umsetzung hast du einen direkten Ansprechpartner.</p>
        <p>Ein veröffentlichtes Beispiel ist die <Link className="text-link" href="/projekte/taxi-bb-essen/" data-track-id="website-local-case">Website für Taxi B&amp;B Essen mit Online-Fahrtanfragen</Link>. Welche Seiten und Funktionen dein Unternehmen braucht, klären wir vor dem Start.</p>
      </section>
      <Link href="/" className="text-link" data-track-id="website-main-site">
        Arbeiten & mehr auf hareb.digital
        <ArrowUpRight size={17} aria-hidden />
      </Link>
    </div>
  </>
}

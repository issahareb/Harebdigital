import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { IntroOffer } from './intro-offer'

/** Reuse the homepage's complete offer UI, including copy, controls and motion. */
export function WebsiteLanding() {
  return <>
    <IntroOffer headingLevel="h1" />
    <div className="wrap website-landing-more">
      <Link href="/" className="text-link" data-track-id="website-main-site">
        Arbeiten & mehr auf hareb.digital
        <ArrowUpRight size={17} aria-hidden />
      </Link>
    </div>
  </>
}

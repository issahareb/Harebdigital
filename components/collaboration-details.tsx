import { JsonLd } from './studio-schema'
import { DOMAIN } from '@/lib/marke'
import { PricingSummary } from './pricing-summary'
import { LocalServices } from './local-services'
import { HostingCare } from './hosting-care'
import { VoiceOffer } from './voice-offer'
import { MotionFeature } from './motion-feature'
import { TikTokCaseStudy } from './tiktok-case-study'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { PORTFOLIO } from '@/lib/marke'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { EditorialMotion } from './editorial-motion'
import { VISUAL_COPY } from '@/lib/service-visuals'
import { StudioEvidence } from './service-visual'

function Lines({ text }: { text: string }) { return <>{text.split('\n').map((line, i) => <span className="heading-line" key={i}>{line}</span>)}</> }

export function CollaborationDetails({ lang }: { lang: HdLang }) {
 const t = STUDIO_COPY[lang]
 const original = HD_TEXTE[lang]
 return <><SiteHeader lang={lang} /><main id="main" className="collaboration-details">
 <header className="wrap section-space details-heading"><Link className="text-link" href={localizedPath(lang)}>{t.home} ↗</Link><p className="eyebrow">HAREB DIGITAL</p><h1>{lang === 'de' ? 'Was hinter deinem Projekt steckt.' : lang === 'en' ? 'What goes into your project.' : 'Lo que hay detrás de tu proyecto.'}</h1><p>{lang === 'de' ? 'Leistungen, Arbeitsweise und Betreuung. Hier findest du die Details, wenn du tiefer einsteigen möchtest.' : lang === 'en' ? 'Services, process and support. Explore the details behind your project.' : 'Servicios, proceso y soporte. Descubre los detalles de tu proyecto.'}</p></header>
 <section className="wrap section-space"><h2>{t.approachLabel}</h2><p className="service-detail-lead">{t.approachText}</p></section>
 <VoiceOffer lang={lang} /><PricingSummary lang={lang} />
        <MotionFeature lang={lang} />
        <section data-track-section="hd-landing-section-6" id="social" className="social-section section-space" aria-labelledby="social-title">
          <div className="wrap social-grid">
            <figure className="social-art" data-reveal>
              <Image
                src="/social/mrhan-profil.webp"
                alt={VISUAL_COPY[lang].socialAlt}
                width={1125}
                height={542}
                sizes="(max-width: 700px) 90vw, 45vw"
              />
              <figcaption>{VISUAL_COPY[lang].socialArchive}</figcaption>
            </figure>
            <div>
              <div className="section-label">
                <span className="small-index">04 /</span>
                <span className="eyebrow">{lang === 'de' ? 'Eigene Content-Experimente' : lang === 'en' ? 'Independent content experiments' : 'Experimentos propios de contenido'}</span>
              </div>
              <h2 id="social-title">
                <Lines text={t.socialTitle} />
              </h2>
              <p>{t.socialText}</p>
              {lang === 'de' && <Link data-track-id="hd-landing-link-7" className="text-link" href="/leistungen/social-media-marketing/">Social Media für dein Unternehmen ↗</Link>}
              <span className="social-profile-label">TikTok · @issa3701</span>
              <a data-track-id="hd-landing-a-8" href="https://www.tiktok.com/@issa3701" className="text-link">
                Mr Han
                <ArrowUpRight size={17} aria-hidden />
              </a>
            </div>
            <div className="social-proof">
              <span className="social-proof-label">{VISUAL_COPY[lang].socialProofLabel}</span>
              <div className="social-stat">
                <strong>
                  {lang === 'en' ? '1.3' : '1,3'}
                  <span> M</span>
                </strong>
                <span>{t.reach}</span>
              </div>
              <div className="social-proof-bottom">
                <Image
                  src="/social/drh-beitrag.webp"
                  alt={original.social.belege[0].alt}
                  width={450}
                  height={700}
                  sizes="180px"
                  className="social-receipt"
                />
                <div>
                  <strong>0 €</strong>
                  <span>{t.budget}</span>
                  <p>{t.socialSource}</p>
                </div>
              </div>
            </div>
          </div>
          <TikTokCaseStudy lang={lang} />
        </section>
        <section
          id="studio"
          className="studio-section wrap section-space"
          aria-labelledby="studio-title"
        >
          <StudioEvidence lang={lang} />
          <div className="studio-copy" data-reveal>
            <div className="section-label">
              <span className="small-index">05 /</span>
              <span className="eyebrow">{t.nav[2]}</span>
            </div>
            <h2 id="studio-title">
              <Lines text={t.studioTitle} />
            </h2>
            <p>{t.studioText}</p>
            <a data-track-id="hd-landing-a-9" href={PORTFOLIO} className="text-link" rel="me">
              {t.studioLink}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <div className="studio-signature">
              <span>Issa Hareb</span>
              <span>
                DESIGN & DEVELOPMENT
                <br />
                NRW, DE
              </span>
            </div>
          </div>
        </section>
        <section
          id="ablauf"
          className="process-section wrap section-space"
          aria-labelledby="process-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-label">
                <span className="small-index">06 /</span>
                <span className="eyebrow">{original.ablauf.label}</span>
              </div>
              <h2 id="process-title">
                <Lines text={t.processTitle} />
              </h2>
            </div>
            <ArrowDown className="section-arrow" size={54} strokeWidth={1} aria-hidden />
          </div>
          <ol className="process-list">
            {original.ablauf.schritte.map((step) => (
              <li key={step.n} data-reveal>
                <span>{step.n}</span>
                <div className="process-step-title">{step.t}</div>
                <p>{step.b}</p>
              </li>
            ))}
          </ol>
        </section>
        <HostingCare lang={lang} />
        <section data-track-section="hd-landing-section-10" id="faq" className="faq-section wrap section-space" aria-labelledby="faq-title">
          <div>
            <div className="section-label">
              <span className="small-index">08 /</span>
              <span className="eyebrow">FAQ</span>
            </div>
            <h2 id="faq-title">
              <Lines text={t.faqTitle} />
            </h2>
            <p>{t.faqIntro}</p>
          </div>
          <div className="faq-list" data-reveal>
            {t.faq.map((item, i) => (
              <details key={item.question} open={i === 0}>
                <summary>
                  <span className="faq-question">{item.question}</span>
                  <Plus size={20} aria-hidden />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

<div className="wrap section-space">{lang === 'de' && <LocalServices />}</div>
<JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${DOMAIN}${localizedPath(lang, '/zusammenarbeit/')}#faq`, inLanguage: lang, mainEntity: t.faq.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }} />
</main><SiteFooter lang={lang} /><EditorialMotion /></>
}

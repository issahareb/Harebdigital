import { LocalServices } from './local-services'
import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { AiDiscovery } from './ai-discovery'
import { HostingCare } from './hosting-care'
import { IntroOffer } from './intro-offer'
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
import { CinematicHero } from './cinematic-hero'
import { StudioSchema } from './studio-schema'
import { EditorialMotion } from './editorial-motion'
import { ScrollAccent } from './scroll-accent'
import { VISUAL_COPY } from '@/lib/service-visuals'
import { ServiceVisual, StudioEvidence } from './service-visual'
import { WebsiteShowcase } from './website-showcase'

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span className="heading-line" key={i}>
          {line}
        </span>
      ))}
    </>
  )
}

export function HdLanding({ lang }: { lang: HdLang }) {
  const t = STUDIO_COPY[lang]
  const original = HD_TEXTE[lang]
  return (
    <>
      <SiteHeader lang={lang} />
      <main id="main">
        <CinematicHero
          lang={lang}
          copy={{
            headline: t.headline,
            kicker: t.kicker,
            intro: t.intro,
            project: lang === 'de' ? 'Deine Idee besprechen' : lang === 'en' ? 'Discuss your idea' : 'Hablemos de tu idea',
            scroll: t.scroll,
            motionOff: t.motionOff,
            motionOn: t.motionOn,
            heroAlt: t.heroAlt,
            heroChapters: t.heroChapters,
          }}
        />
        <div className="discipline-strip wrap">
          {t.strip.map((label, i) => (
            <span key={label}>
              <span className="small-index">0{i + 1}</span>
              {label}
              <ArrowUpRight size={16} aria-hidden />
            </span>
          ))}
        </div>
        <section
          id="anspruch"
          className="approach wrap section-space"
          aria-labelledby="approach-title"
        >
          <div className="section-label">
            <span className="small-index">01 /</span>
            <span className="eyebrow">{t.approachLabel}</span>
          </div>
          <div className="approach-content">
            <h2 id="approach-title">
              {t.approach[0]}
              <br />
              <ScrollAccent text={t.approach[1]} />
            </h2>
            <div className="approach-bottom">
              <p>{t.approachText}</p>
            </div>
          </div>
        </section>
        <VoiceOffer lang={lang} />
        <section data-track-section="hd-landing-section-1" id="arbeiten" className="work-section section-space" aria-labelledby="work-title">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <div>
                <div className="section-label">
                  <span className="small-index">02 /</span>
                  <span className="eyebrow">{t.nav[0]}</span>
                </div>
                <h2 id="work-title">
                  <Lines text={t.workTitle} />
                </h2>
              </div>
              <p>{t.workIntro}</p>
            </div>
            <article className="featured-work">
              <a
                href="https://www.taxibbessen.de/"
                className="project-visual project-visual--responsive"
              >
                <span className="project-devices">
                  <span className="project-desktop-view">
                    <span className="project-browserbar">
                      <i />
                      <i />
                      <i />
                      <span>taxibbessen.de</span>
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
                    <Image
                      src="/studio/evidence/taxi-desktop-20261016-v9.webp"
                      alt={VISUAL_COPY[lang].taxiDesktopAlt}
                      width={1440}
                      height={940}
                      sizes="(max-width: 800px) 72vw, 48vw"
                      className="project-screenshot"
                    />
                  </span>
                  <span className="project-mobile-view">
                    <Image
                      src="/studio/evidence/taxi-mobile-20261016-v9.webp"
                      alt={VISUAL_COPY[lang].taxiMobileAlt}
                      width={390}
                      height={844}
                      sizes="(max-width: 800px) 24vw, 16vw"
                    />
                  </span>
                </span>
                <span className="project-visual-label">
                  B&B <span>ESSEN</span>
                </span>
                <span className="project-open" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
              <div className="project-story">
                <span className="eyebrow">{t.caseTitle.replace(/\n/g, ' ')}</span>
                <p>{t.caseText}</p>
                <ul className="tag-list">
                  {t.caseTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a data-track-id="hd-landing-a-2" href="https://www.taxibbessen.de/" className="text-link">
                  {t.caseLink}
                  <ArrowUpRight size={17} aria-hidden />
                </a>
                {lang === 'de' && <Link data-track-id="hd-landing-link-3" className="text-link" href="/projekte/taxi-bb-essen/">Umsetzung und Messziele ansehen ↗</Link>}
              </div>
            </article>
            <div className="secondary-work" data-reveal>
              <div className="secondary-image">
                <Image
                  src="/projekte/guardiangrid-login.jpg"
                  alt={original.arbeiten.projekte[0].alt}
                  width={1280}
                  height={800}
                  sizes="(max-width: 650px) 92vw, 30vw"
                />
              </div>
              <div>
                <span className="eyebrow">{t.moreWork}</span>
                <h3>GuardianGrid</h3>
                <p className="project-production-status">{lang === 'de' ? 'In Produktion · Zusammenarbeit mit Bungie' : lang === 'en' ? 'In production · Collaboration with Bungie' : 'En producción · Colaboración con Bungie'}</p>
                <p>{original.arbeiten.projekte[0].text}</p>
              </div>

            </div>
          </div>
        </section>
        {lang === 'de' && <IntroOffer />}
        <section
          id="leistungen"
          className="services-section wrap section-space"
          aria-labelledby="services-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-label">
                <span className="small-index">03 /</span>
                <span className="eyebrow">{t.nav[1]}</span>
              </div>
              <h2 id="services-title">
                <Lines text={t.servicesTitle} />
              </h2>
            </div>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="service-list">
            {original.leistungen.punkte.map((service, i) => (
              <article
                key={service.slug}
                className="service-row"
                data-reveal
              >
                <div className="service-thumbnail">
                  <ServiceVisual index={i} lang={lang} />
                </div>
                <div className="service-summary">
                  <h3><Link className="service-link" href={localizedPath(lang, `/leistungen/${service.slug}/`)}>{t.serviceNames[i]}</Link></h3>
                  <p>{t.serviceTags[i]}</p>
                </div>
                <span className="service-description">{service.detail.vorspann}</span>
                <span className="service-arrow">
                  <ArrowUpRight aria-hidden />
                </span>
              </article>
            ))}
          </div>
          {lang === 'de' && <div className="service-detail-grid">{ADDITIONAL_SERVICES.map(service => <section data-track-section="hd-landing-section-4" key={service.slug}><h3>{service.title}</h3><p>{service.description}</p><Link data-track-id="hd-landing-link-5" className="text-link" href={`/leistungen/${service.slug}/`}>{service.title} ansehen ↗</Link></section>)}</div>}
          {lang === 'de' && <LocalServices />}
          <AiDiscovery lang={lang} />
        </section>
        <WebsiteShowcase lang={lang} />
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
      </main>
      <SiteFooter lang={lang} />
      <StudioSchema lang={lang} />
      <EditorialMotion />
    </>
  )
}

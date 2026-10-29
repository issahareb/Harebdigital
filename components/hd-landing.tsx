import { HomeMore } from './home-more'
import { TensaCase } from './tensa-case'
import { PricingSummary } from './pricing-summary'
import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { AiDiscovery } from './ai-discovery'
import { IntroOffer } from './intro-offer'
import { VoiceOffer } from './voice-offer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { CinematicHero } from './cinematic-hero'
import { StudioSchema } from './studio-schema'
import { EditorialMotion } from './editorial-motion'
import { ScrollAccent } from './scroll-accent'
import { VISUAL_COPY } from '@/lib/service-visuals'
import { ServiceVisual } from './service-visual'
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
      <main id="main" className="home-compact">
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
              <p>{lang === 'de' ? 'Zeig, was dich ausmacht. Schaffe Vertrauen. Mach den nächsten Schritt einfach. Genau dafür entwickle ich deine Website.' : t.approachText}</p>
            </div>
          </div>
        </section>
        <VoiceOffer lang={lang} compact />
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
                <p>{lang === 'de' ? 'Vom Fahrtwunsch zur geordneten Anfrage: Website, Buchung und Verwaltung greifen ineinander.' : t.caseText}</p>
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
            <TensaCase lang={lang} />
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
                <p className="project-production-status">{lang === 'de' ? 'Eigenes Produkt · In Entwicklung' : lang === 'en' ? 'Own product · In development' : 'Producto propio · En desarrollo'}</p>
                <p>{original.arbeiten.projekte[0].text}</p>
              </div>

            </div>
          </div>
        </section>
        {lang === 'de' && <div id="preise"><IntroOffer /><div className="wrap"><Link className="text-link" href="/zusammenarbeit/#preise">Preise & Leistungsumfang im Detail ↗</Link></div></div>}
        {lang !== 'de' && <PricingSummary lang={lang} />}
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
                <Link className="text-link service-more" href={localizedPath(lang, `/leistungen/${service.slug}/`)}>{lang === 'de' ? 'Mehr erfahren' : lang === 'en' ? 'Learn more' : 'Saber más'}</Link>
                <span className="service-arrow">
                  <ArrowUpRight aria-hidden />
                </span>
              </article>
            ))}
          </div>
          {lang === 'de' && <div className="service-detail-grid">{ADDITIONAL_SERVICES.map(service => <section data-track-section="hd-landing-section-4" key={service.slug}><h3>{service.title}</h3><p>{service.description}</p><Link data-track-id="hd-landing-link-5" className="text-link" href={`/leistungen/${service.slug}/`}>{lang === 'de' ? 'Mehr erfahren' : service.title} ↗</Link></section>)}</div>}
          <AiDiscovery lang={lang} />
        </section>
        <WebsiteShowcase lang={lang} compact />
        <HomeMore lang={lang} />
      </main>
      <SiteFooter lang={lang} />
      <StudioSchema lang={lang} />
      <EditorialMotion />
    </>
  )
}

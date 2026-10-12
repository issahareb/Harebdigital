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
import { ServiceVisual } from './service-visual'
import { REFINEMENT } from '@/lib/refinement-copy'
import { MotionShowcase } from './motion-showcase'

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
  const r = REFINEMENT[lang]
  return (
    <>
      <SiteHeader lang={lang} />
      <main id="main">
        <CinematicHero
          lang={lang}
          copy={{
            headline: t.headline,
            intro: t.intro,
            project: t.project,
            workLink: t.workLink,
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
        <section
          id="arbeiten"
          className="work-section section-space"
          aria-labelledby="work-title"
        >
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
            <article className="featured-work" data-reveal>
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
                      src="/studio/evidence/taxi-desktop-20261009.webp"
                      alt={VISUAL_COPY[lang].taxiDesktopAlt}
                      width={1440}
                      height={940}
                      sizes="(max-width: 800px) 72vw, 48vw"
                      className="project-screenshot"
                    />
                  </span>
                  <span className="project-mobile-view">
                    <Image
                      src="/studio/evidence/taxi-mobile-20261009.webp"
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
                <span className="eyebrow">{t.caseType}</span>
                <h3>
                  <Lines text={r.caseTitle} />
                </h3>
                <p>{r.caseIntro}</p>
                <ul className="tag-list">
                  {t.caseTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href="https://www.taxibbessen.de/" className="text-link">
                  {t.caseLink}
                  <ArrowUpRight size={17} aria-hidden />
                </a>
              </div>
            </article>
            <div className="case-breakdown" data-reveal>
              {r.caseSteps.map(([label, text], i) => (
                <div key={label}>
                  <span className="case-step-index">0{i + 1}</span>
                  <h4>{label}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <Link
              href={`${localizedPath(lang, '/kontakt/')}?leistung=neue-website`}
              className="text-link case-cta"
            >
              {r.caseLink}
              <ArrowUpRight size={17} aria-hidden />
            </Link>
            <div className="secondary-work" data-reveal>
              <a
                className="secondary-image"
                href="https://www.guardiangrid.io/"
                aria-label="GuardianGrid"
              >
                <Image
                  src="/projekte/guardiangrid-login.jpg"
                  alt={original.arbeiten.projekte[0].alt}
                  width={1280}
                  height={800}
                  sizes="(max-width: 650px) 92vw, 30vw"
                />
              </a>
              <div>
                <span className="eyebrow">{t.moreWork}</span>
                <h3>GuardianGrid</h3>
                <p>{r.productText}</p>
                <ul className="tag-list">
                  {r.productTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <a
                href="https://www.guardiangrid.io/"
                className="round-link"
                aria-label={`${original.arbeiten.ansehen}: GuardianGrid`}
              >
                <ArrowUpRight aria-hidden />
              </a>
            </div>
          </div>
        </section>
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
            {original.leistungen.punkte.slice(0, 4).map((service, i) => (
              <Link
                href={localizedPath(lang, `/leistungen/${service.slug}/`)}
                key={service.slug}
                className="service-row"
                data-reveal
              >
                <div className="service-summary">
                  <h3>{t.serviceNames[i]}</h3>
                  <p>{t.serviceTags[i]}</p>
                </div>
                <span className="service-description">{r.serviceLead[i]}</span>
                <div className="service-thumbnail">
                  <ServiceVisual index={i} lang={lang} decorative />
                </div>
                <span className="service-arrow">
                  <ArrowUpRight aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section
          id="social"
          className="social-section section-space"
          aria-labelledby="social-title"
        >
          <div className="wrap">
            <div className="social-heading" data-reveal>
              <div>
                <div className="section-label">
                  <span className="small-index">04 /</span>
                  <span className="eyebrow">{r.socialLabel}</span>
                </div>
                <h2 id="social-title">
                  <Lines text={r.socialTitle} />
                </h2>
              </div>
              <p>{r.socialIntro}</p>
            </div>
            <MotionShowcase lang={lang} />
            <div className="social-offer" data-reveal>
              {r.socialItems.map(([title, text], i) => (
                <div key={title}>
                  <span className="eyebrow">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="social-actions">
              <Link
                href={`${localizedPath(lang, '/kontakt/')}?leistung=social-media-ads`}
                className="button button-accent"
              >
                {r.socialCta}
                <ArrowUpRight size={18} aria-hidden />
              </Link>
              <Link
                href={localizedPath(lang, '/leistungen/social-media-ads/')}
                className="text-link"
              >
                {r.socialDetails}
                <ArrowUpRight size={17} aria-hidden />
              </Link>
            </div>
            <div className="reach-evidence" data-reveal>
              <div className="reach-number">
                <strong>
                  {lang === 'en' ? '1.3' : '1,3'}
                  <span>M</span>
                </strong>
                <span>{t.reach}</span>
              </div>
              <div className="reach-context">
                <span className="eyebrow">{r.proofTitle}</span>
                <p>{r.proofText}</p>
                <a
                  className="text-link"
                  href="/social/drh-beitrag.webp"
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.proofOpen}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
              <div className="reach-budget">
                <strong>0 €</strong>
                <span>{r.proofBudget}</span>
                <a
                  href="https://www.tiktok.com/@issa3701"
                  className="creator-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok · @issa3701
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="studio"
          className="studio-section wrap section-space"
          aria-labelledby="studio-title"
        >
          <div className="studio-identity" data-reveal>
            <span className="eyebrow">HAREB DIGITAL / INDEPENDENT STUDIO</span>
            <div className="studio-monogram" aria-hidden="true">
              ih<span>.</span>
            </div>
            <div className="studio-identity-bottom">
              <strong>Issa Hareb</strong>
              <span>DESIGN · DEVELOPMENT · CONTENT</span>
            </div>
          </div>
          <div className="studio-copy" data-reveal>
            <div className="section-label">
              <span className="small-index">05 /</span>
              <span className="eyebrow">{t.nav[2]}</span>
            </div>
            <h2 id="studio-title">
              <Lines text={r.studioTitle} />
            </h2>
            <p>{r.studioText}</p>
            <ul className="studio-principles">
              {r.studioPrinciples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href={PORTFOLIO} className="text-link" rel="me">
              {t.studioLink}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <div className="studio-signature">
              <span>Issa Hareb</span>
              <span>{r.studioLocation}</span>
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
            <ArrowDown
              className="section-arrow"
              size={54}
              strokeWidth={1}
              aria-hidden
            />
          </div>
          <ol className="process-list">
            {original.ablauf.schritte.map((step) => (
              <li key={step.n} data-reveal>
                <span>{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.b}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          id="faq"
          className="faq-section wrap section-space"
          aria-labelledby="faq-title"
        >
          <div>
            <div className="section-label">
              <span className="small-index">07 /</span>
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
                  <h3>{item.question}</h3>
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

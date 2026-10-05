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
            eyebrow: t.eyebrow,
            headline: t.headline,
            intro: t.intro,
            project: t.project,
            workLink: t.workLink,
            scroll: t.scroll,
            motionOff: t.motionOff,
            motionOn: t.motionOn,
            heroAlt: t.heroAlt,
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
              <span>{t.approach[1]}</span>
            </h2>
            <div className="approach-bottom">
              <span className="asterisk" aria-hidden="true">
                ✳
              </span>
              <p>{t.approachText}</p>
            </div>
          </div>
        </section>
        <section id="arbeiten" className="work-section section-space" aria-labelledby="work-title">
          <div className="wrap">
            <div className="section-heading">
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
              <a href="https://www.taxibbessen.de/" className="project-visual">
                <span className="project-browserbar">
                  <i />
                  <i />
                  <i />
                  <span>taxibbessen.de </span>
                  <ArrowUpRight size={16} aria-hidden />
                </span>
                <Image
                  src="/studio/taxi-bb-v1.webp"
                  alt={original.arbeiten.belegAlt}
                  width={1320}
                  height={808}
                  sizes="(max-width: 800px) 92vw, 64vw"
                  className="project-screenshot"
                />
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
                  <Lines text={t.caseTitle} />
                </h3>
                <p>{t.caseText}</p>
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
            <div className="secondary-work">
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
                <p>{original.arbeiten.projekte[0].text}</p>
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
          <div className="section-heading">
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
              <Link
                href={localizedPath(lang, `/leistungen/${service.slug}/`)}
                key={service.slug}
                className="service-row"
              >
                <span className="service-number">{service.n}</span>
                <div>
                  <h3>{t.serviceNames[i]}</h3>
                  <p>{t.serviceTags[i]}</p>
                </div>
                <span className="service-description">{service.detail.vorspann}</span>
                <span className="service-arrow">
                  <ArrowUpRight aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="social-section section-space" aria-labelledby="social-title">
          <div className="wrap social-grid">
            <div>
              <div className="section-label">
                <span className="small-index">04 /</span>
                <span className="eyebrow">Social & Content</span>
              </div>
              <h2 id="social-title">
                <Lines text={t.socialTitle} />
              </h2>
              <p>{t.socialText}</p>
              <a href="https://www.instagram.com/dailyraphood/" className="text-link">
                @dailyraphood
                <ArrowUpRight size={17} aria-hidden />
              </a>
            </div>
            <div className="social-proof">
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
        </section>
        <section
          id="studio"
          className="studio-section wrap section-space"
          aria-labelledby="studio-title"
        >
          <div className="studio-image">
            <Image
              src="/studio/h-detail-v1.webp"
              alt={t.studioAlt}
              width={900}
              height={1117}
              sizes="(max-width: 700px) 92vw, 43vw"
            />
            <span className="image-caption" aria-hidden="true">
              HAREB DIGITAL — STUDY IN FORM
            </span>
          </div>
          <div className="studio-copy">
            <div className="section-label">
              <span className="small-index">05 /</span>
              <span className="eyebrow">{t.nav[2]}</span>
            </div>
            <h2 id="studio-title">
              <Lines text={t.studioTitle} />
            </h2>
            <p>{t.studioText}</p>
            <a href={PORTFOLIO} className="text-link" rel="me">
              {t.studioLink}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <div className="studio-signature">
              <span>Issa Hareb</span>
              <span>
                DESIGN & DEVELOPMENT
                <br />
                ESSEN, DE
              </span>
            </div>
          </div>
        </section>
        <section
          id="ablauf"
          className="process-section wrap section-space"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
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
              <li key={step.n}>
                <span>{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.b}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="faq" className="faq-section wrap section-space" aria-labelledby="faq-title">
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
          <div className="faq-list">
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
    </>
  )
}

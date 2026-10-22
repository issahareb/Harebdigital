import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { AiDiscovery } from './ai-discovery'
import { HostingCare } from './hosting-care'
import { MotionFeature } from './motion-feature'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Plus, Phone } from 'lucide-react'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { PORTFOLIO, marke } from '@/lib/marke'
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
            project: t.project,
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
        <section id="arbeiten" className="work-section section-space" aria-labelledby="work-title">
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
                <span className="eyebrow">{t.caseTitle.replace(/\n/g, ' ')}</span>
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
                {lang === 'de' && <Link className="text-link" href="/projekte/taxi-bb-essen/">Umsetzung und Messziele ansehen ↗</Link>}
              </div>
            </article>
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
        <WebsiteShowcase lang={lang} />
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
              <Link
                href={localizedPath(lang, `/leistungen/${service.slug}/`)}
                key={service.slug}
                className="service-row"
                data-reveal
              >
                <div className="service-thumbnail">
                  <ServiceVisual index={i} lang={lang} decorative />
                </div>
                <div className="service-summary">
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
          {lang === 'de' && <div className="service-detail-grid">{ADDITIONAL_SERVICES.map(service => <section key={service.slug}><h3>{service.title}</h3><p>{service.description}</p><Link className="text-link" href={`/leistungen/${service.slug}/`}>{service.title} ansehen ↗</Link></section>)}</div>}
          <AiDiscovery lang={lang} />
        </section>
        <section id="ki-telefonie" className="wrap section-space" aria-labelledby="ki-telefonie-title">
          <div className="grid gap-10 rounded-3xl bg-[#20211e] p-6 text-[#f3f1eb] sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <span className="eyebrow text-[#d4ed8a]">{lang === 'de' ? 'LUKAS · KI am Telefon' : lang === 'en' ? 'LUKAS · AI on the phone' : 'LUKAS · IA al teléfono'}</span>
              <h2 id="ki-telefonie-title" className="mt-5 text-4xl leading-tight sm:text-5xl">{lang === 'de' ? 'Du arbeitest. Deine KI nimmt ab.' : lang === 'en' ? 'You work. Your AI answers.' : 'Tú trabajas. Tu IA responde.'}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d3d3c9]">{lang === 'de' ? 'Ein Anruf kann der nächste Auftrag sein. Mit KI-Telefonassistenz lassen sich Fragen beantworten, Anliegen aufnehmen und Rückrufwünsche erfassen. Ich entwickle die passende Lösung für deinen Betrieb. Wie sich das anhört? Ruf meinen eigenen Agenten LUKAS an.' : lang === 'en' ? 'A phone call could be your next project. AI phone assistance can answer questions, capture enquiries and record callback requests. I build a solution for your business. Hear it for yourself by calling my own agent, LUKAS.' : 'Una llamada puede ser tu próximo proyecto. Un asistente telefónico de IA puede responder preguntas, recoger consultas y registrar solicitudes de devolución de llamada. Desarrollo la solución para tu negocio. Pruébala llamando a mi agente LUKAS.'}</p>
              <Link className="text-link mt-6" href={localizedPath(lang, '/kontakt/')}>{lang === 'de' ? 'KI-Telefonassistenz für meinen Betrieb anfragen' : lang === 'en' ? 'Enquire about AI phone assistance' : 'Consultar sobre asistencia telefónica con IA'}<ArrowUpRight size={17} aria-hidden /></Link>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-[#62645c] p-6 sm:p-8">
              <Phone size={32} strokeWidth={1.5} className="mb-6 text-[#d4ed8a]" aria-hidden />
              <h3 className="text-2xl leading-snug">{lang === 'de' ? 'Probiere es aus, telefoniere mit meinem KI-Agenten' : lang === 'en' ? 'Try it out. Talk to my AI agent.' : 'Pruébalo. Habla con mi agente de IA.'}</h3>
              <p className="mt-4 text-[#d3d3c9]">{lang === 'de' ? 'Frag zum Beispiel: „Was kann Hareb Digital für mein Unternehmen tun?“' : lang === 'en' ? 'Try asking: “What can Hareb Digital do for my business?”' : 'Pregunta, por ejemplo: «¿Qué puede hacer Hareb Digital por mi negocio?»'}</p>
              <a href={`tel:${marke.telefon.replace(/\s/g, '')}`} className="button button-accent mt-7 w-full flex-wrap text-center" id="lukas-demo-anrufen" data-track="lukas-demo-call">
                <Phone size={19} aria-hidden />
                <span>{lang === 'de' ? 'LUKAS jetzt anrufen' : lang === 'en' ? 'Call LUKAS now' : 'Llamar a LUKAS'}<span className="mt-1 block text-sm font-normal">{marke.telefon}</span></span>
              </a>
              <p className="mt-4 text-sm text-[#d3d3c9]">{lang === 'de' ? 'Du sprichst mit einer KI. Es gelten die Telefonkosten deines Tarifs.' : lang === 'en' ? 'You will be speaking with AI. Your usual call charges apply.' : 'Hablarás con una IA. Se aplican las tarifas habituales de tu operador.'}</p>
            </div>
          </div>
        </section>
        <MotionFeature lang={lang} />
        <section id="social" className="social-section section-space" aria-labelledby="social-title">
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
              {lang === 'de' && <Link className="text-link" href="/leistungen/social-media-marketing/">Social Media für dein Unternehmen ↗</Link>}
              <span className="social-profile-label">TikTok · @issa3701</span>
              <a href="https://www.tiktok.com/@issa3701" className="text-link">
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
            <a href={PORTFOLIO} className="text-link" rel="me">
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
                <h3>{step.t}</h3>
                <p>{step.b}</p>
              </li>
            ))}
          </ol>
        </section>
        <HostingCare lang={lang} />
        <section id="faq" className="faq-section wrap section-space" aria-labelledby="faq-title">
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

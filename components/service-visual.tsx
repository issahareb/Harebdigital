import Image from 'next/image'
import { ArrowDown, ArrowRight, CalendarCheck, FileInput, MailCheck, UserCheck } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { VISUAL_COPY } from '@/lib/service-visuals'
import { localizedPath } from '@/lib/locale'

function BrowserBar({ address }: { address: string }) {
  return (
    <div className="evidence-browserbar">
      <span className="evidence-browser-dots">
        <i />
        <i />
        <i />
      </span>
      <span>{address}</span>
    </div>
  )
}

/** Real screenshots and readable, native diagrams replace material metaphors. */
export function ServiceVisual({
  index,
  lang,
  decorative = false,
}: {
  index: number
  lang: HdLang
  decorative?: boolean
}) {
  const t = VISUAL_COPY[lang]
  const page = STUDIO_COPY[lang]
  const icons = [FileInput, UserCheck, CalendarCheck, MailCheck]
  return (
    <div
      className={`service-visual service-visual--${index}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : t.descriptions[index]}
      aria-hidden={decorative || undefined}
    >
      <div className="service-visual-inner" aria-hidden={decorative ? undefined : true}>
        <div className="visual-kicker">
          <span>0{index + 1}</span>
          <span>{t.labels[index]}</span>
        </div>
        {index === 0 && (
          <div className="responsive-evidence">
            <div className="evidence-desktop">
              <BrowserBar address="taxibbessen.de" />
              <Image
                src="/studio/evidence/taxi-desktop-20261009.webp"
                alt=""
                width={1440}
                height={940}
                sizes="(max-width: 600px) 72vw, 600px"
              />
            </div>
            <div className="evidence-phone">
              <Image
                src="/studio/evidence/taxi-mobile-20261009.webp"
                alt=""
                width={390}
                height={844}
                sizes="(max-width: 600px) 24vw, 190px"
              />
            </div>
          </div>
        )}
        {index === 1 && (
          <div className="relaunch-evidence">
            {(['before', 'after'] as const).map((state) => (
              <div className={`relaunch-version relaunch-version--${state}`} key={state}>
                <span className="relaunch-label">{t[state]}</span>
                <div className="relaunch-browser">
                  <BrowserBar address="hareb.digital" />
                  <Image
                    src={`/studio/evidence/hareb-${state}-20261009.webp`}
                    alt=""
                    width={1440}
                    height={1000}
                    sizes="(max-width: 600px) 52vw, 480px"
                  />
                </div>
              </div>
            ))}
            <ArrowRight className="relaunch-direction" aria-hidden />
          </div>
        )}
        {index === 2 && (
          <div className="workflow-evidence">
            {t.flow.map(([title, detail], i) => {
              const Icon = icons[i]
              return (
                <div className="workflow-step" key={title}>
                  <span className="workflow-icon">
                    <Icon aria-hidden />
                  </span>
                  <span className="workflow-text">
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </span>
                  <span className="workflow-index">0{i + 1}</span>
                  {i < 3 && <ArrowDown className="workflow-connector" aria-hidden />}
                </div>
              )
            })}
          </div>
        )}
        {index === 3 && (
          <div className="search-evidence">
            <div className="search-result-preview">
              <span className="search-site">
                <span className="search-monogram">h.</span>
                <span>
                  Hareb Digital<span>hareb.digital{localizedPath(lang)}</span>
                </span>
              </span>
              <strong className="search-result-title">{page.title}</strong>
              <span className="search-result-description">{page.description}</span>
            </div>
            <div className="answer-preview">
              <span className="answer-label">{t.faqLabel}</span>
              <strong>{page.faq[1].question}</strong>
              <span>{page.faq[1].answer}</span>
            </div>
          </div>
        )}
        <div className="visual-caption">{t.captions[index]}</div>
      </div>
    </div>
  )
}

export function StudioEvidence({ lang }: { lang: HdLang }) {
  const t = VISUAL_COPY[lang]
  return (
    <figure className="studio-evidence" data-reveal>
      <div className="studio-evidence-screen">
        <BrowserBar address="hareb.digital" />
        <Image
          src="/studio/evidence/hareb-after-20261009.webp"
          alt={STUDIO_COPY[lang].studioAlt}
          width={1440}
          height={1000}
          sizes="(max-width: 700px) 90vw, 550px"
        />
      </div>
      <div className="studio-code">
        <span className="studio-code-file">scroll-accent.tsx</span>
        <span className="studio-code-description">{t.codeLabel}</span>
        <pre>
          <code>
            <span className="code-keyword">const</span>
            {' amount = clamp(\n  progress * words.length - index\n)\n'}
            <span className="code-keyword">const</span>
            {' eased =\n  amount * amount * (3 - 2 * amount)\n\nword.style.setProperty(\n  '}
            <span className="code-string">{"'--word-reveal'"}</span>
            {', String(eased)\n)'}
          </code>
        </pre>
      </div>
      <figcaption>{t.studioLabel}</figcaption>
    </figure>
  )
}

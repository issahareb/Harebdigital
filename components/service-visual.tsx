import Image from 'next/image'
import {
  ArrowRight,
  Check,
  Code2,
  FileText,
  Mail,
  Search,
  CalendarDays,
  UserCheck,
  Menu,
  ArrowUpRight,
} from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { REFINEMENT } from '@/lib/refinement-copy'

const WORDS = {
  de: {
    concept: 'KONZEPT',
    build: 'Von der Idee zum Auftritt.',
    offer: 'Dein Angebot.',
    fit: 'Klar. Eigenständig. Für dich.',
    discover: 'Entdecken',
    request: 'Anfrage',
    approval: 'Freigabe',
    calendar: 'Termin',
    confirmation: 'Bestätigung',
    search: 'Suche',
    answer: 'Antwort',
    query: 'Was bietet dein Unternehmen?',
    result: 'Dein Unternehmen',
    resultText: 'Dein Angebot. Verständlich erklärt.',
    answerText: 'Die passende Antwort beginnt mit klaren Inhalten.',
    source: 'Quelle: deine Website',
    structure: ['Titel', 'Inhalt', 'FAQ'],
    descriptions: [
      'Konzept einer responsiven Website mit Desktop- und Mobilansicht.',
      'Vorher und heute: zwei echte Ansichten der eigenen Website.',
      'Beispielablauf: Anfrage, Freigabe, Termin und Bestätigung.',
      'Konzept: strukturierte Website-Inhalte unterstützen Suche und nachvollziehbare Antworten.',
    ],
  },
  en: {
    concept: 'CONCEPT',
    build: 'From idea to presence.',
    offer: 'Your offer.',
    fit: 'Clear. Individual. Made for you.',
    discover: 'Explore',
    request: 'Enquiry',
    approval: 'Approval',
    calendar: 'Calendar',
    confirmation: 'Confirmation',
    search: 'Search',
    answer: 'Answer',
    query: 'What does your business offer?',
    result: 'Your business',
    resultText: 'Your offer. Clearly explained.',
    answerText: 'A useful answer starts with clear content.',
    source: 'Source: your website',
    structure: ['Title', 'Content', 'FAQ'],
    descriptions: [
      'Responsive website concept with desktop and mobile views.',
      'Before and today: two actual views of our own website.',
      'Example workflow: enquiry, approval, calendar and confirmation.',
      'Concept: structured website content supports search and sourced answers.',
    ],
  },
  es: {
    concept: 'CONCEPTO',
    build: 'De la idea a la presencia.',
    offer: 'Tu propuesta.',
    fit: 'Clara. Propia. Para ti.',
    discover: 'Descubrir',
    request: 'Solicitud',
    approval: 'Aprobación',
    calendar: 'Cita',
    confirmation: 'Confirmación',
    search: 'Búsqueda',
    answer: 'Respuesta',
    query: '¿Qué ofrece tu empresa?',
    result: 'Tu empresa',
    resultText: 'Tu propuesta. Bien explicada.',
    answerText: 'Una respuesta útil empieza con contenidos claros.',
    source: 'Fuente: tu web',
    structure: ['Título', 'Contenido', 'FAQ'],
    descriptions: [
      'Concepto de una web adaptable con vistas de escritorio y móvil.',
      'Antes y hoy: dos vistas reales de nuestra propia web.',
      'Proceso de ejemplo: solicitud, aprobación, cita y confirmación.',
      'Concepto: contenidos estructurados para búsqueda y respuestas con fuentes.',
    ],
  },
}

export function ServiceVisual({
  index,
  lang,
  decorative = false,
}: {
  index: number
  lang: HdLang
  decorative?: boolean
}) {
  const t = WORDS[lang]
  const r = REFINEMENT[lang]
  const nodes = [
    { label: t.request, Icon: FileText },
    { label: t.approval, Icon: UserCheck },
    { label: t.calendar, Icon: CalendarDays },
    { label: t.confirmation, Icon: Mail },
  ]
  return (
    <div
      className={`service-visual service-visual--${index}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : t.descriptions[index]}
      aria-hidden={decorative || undefined}
    >
      <div className="native-art" aria-hidden="true">
        <div className="art-topline">
          <span>
            0{index + 1} / {index === 1 ? r.comparison : t.concept}
          </span>
          <span>HAREB DIGITAL</span>
        </div>
        {index === 0 && (
          <div className="responsive-art">
            <div className="art-browser">
              <div className="art-browser-chrome">
                <i />
                <i />
                <i />
                <span>your-brand.com</span>
                <Code2 size={13} />
              </div>
              <div className="art-website">
                <div className="art-site-nav">
                  <b>
                    FORM<span>.</span>
                  </b>
                  <Menu size={14} />
                </div>
                <div className="art-site-hero">
                  <small>DESIGN / DEVELOPMENT</small>
                  <strong>{t.offer}</strong>
                  <span>{t.fit}</span>
                  <div className="art-fake-button">
                    {t.discover}
                    <ArrowUpRight size={12} />
                  </div>
                </div>
                <div className="art-content-grid">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className="art-phone">
              <div className="art-phone-speaker" />
              <b>FORM.</b>
              <strong>{t.offer}</strong>
              <span>{t.fit}</span>
              <div className="art-fake-button">{t.discover}</div>
              <div className="art-phone-card" />
            </div>
          </div>
        )}
        {index === 1 && (
          <div className="relaunch-pair">
            <div>
              <span>{r.before}</span>
              <Image
                src="/studio/evidence/hareb-before-20261009.webp"
                width={1440}
                height={1000}
                alt=""
                sizes="(max-width: 600px) 43vw, 400px"
              />
            </div>
            <div>
              <span>{r.after}</span>
              <Image
                src="/studio/evidence/hareb-after-20261009.webp"
                width={1440}
                height={940}
                alt=""
                sizes="(max-width: 600px) 43vw, 400px"
              />
            </div>
          </div>
        )}
        {index === 2 && (
          <div className="automation-art">
            <div className="flow-caption">
              {lang === 'de'
                ? 'Ein Ablauf. Alles verbunden.'
                : lang === 'en'
                  ? 'One flow. Everything connected.'
                  : 'Un proceso. Todo conectado.'}
            </div>
            <div className="flow-nodes">
              {nodes.map(({ label, Icon }, i) => (
                <div className="flow-node" key={label}>
                  <span className="flow-step">0{i + 1}</span>
                  <Icon strokeWidth={1.3} />
                  <strong>{label}</strong>
                  {i < 3 && <ArrowRight className="flow-connector" size={16} />}
                </div>
              ))}
            </div>
            <div className="flow-complete">
              <Check size={14} />
              {lang === 'de'
                ? 'Für die nächste Anfrage bereit.'
                : lang === 'en'
                  ? 'Ready for the next enquiry.'
                  : 'Listo para la siguiente solicitud.'}
            </div>
          </div>
        )}
        {index === 3 && (
          <div className="search-art">
            <div className="search-panels">
              <div className="search-panel">
                <span className="search-panel-label">
                  <Search size={13} />
                  {t.search}
                </span>
                <div className="search-input">
                  {t.result}
                  <Search size={12} />
                </div>
                <strong>{t.result}</strong>
                <small>your-brand.com</small>
                <p>{t.resultText}</p>
                <div className="search-placeholder" />
                <div className="search-placeholder short" />
              </div>
              <div className="answer-panel">
                <span className="search-panel-label">
                  {t.answer}
                  <span className="answer-spark">✳</span>
                </span>
                <strong>{t.query}</strong>
                <p>{t.answerText}</p>
                <span className="answer-source">
                  {t.source}
                  <ArrowUpRight size={10} />
                </span>
              </div>
            </div>
            <div className="search-structure">
              {t.structure.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

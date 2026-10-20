import type { HdLang } from '@/lib/hd-texte'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type CaseCopy = {
  overline: string
  title: string
  lead: string
  ideaLabel: string
  ideaTitle: string
  ideaText: string
  steps: [string, string, string, string]
  videoAlt: string
  campaignType: string
  featured: string
  visit: string
  proof: string
  ratioExplanation: string
  metrics: [string, string, string, string]
  note: string
}

const COPY: Record<HdLang, CaseCopy> = {
  de: {
    overline: '01 / EIGENE MARKETINGKAMPAGNE',
    title: '3 Sekunden.\\nEine Entscheidung.',
    lead: 'Menschen öffnen TikTok nicht, um Werbung zu sehen. Deshalb beginnt diese Kampagne nicht mit einem Verkaufsgespräch, sondern mit einer Geschichte, bei der man kurz hängen bleibt.',
    ideaLabel: 'DIE KREATIVE STRATEGIE',
    ideaTitle: 'Erst überraschen. Dann überzeugen.',
    ideaText: 'Ein scheinbar gewöhnliches Tesla-POV-Meme kippt in einen überzeichneten Raketenmoment. Der harte Schnitt zur Botschaft über langsame Websites bricht die Erwartung. Erst nach diesem Perspektivwechsel kommen Problem, Lösung, eigene Arbeit und Handlungsaufforderung. Aufmerksamkeit wird so zum Einstieg in eine relevante Botschaft.',
    steps: ['POV-Hook', 'Unerwarteter Twist', 'Markenbotschaft', 'Klare Handlungsaufforderung'],
    videoAlt: 'Kreativer Tesla-POV-Werbespot: vom überraschenden Auto-Moment zur Hareb-Digital-Botschaft',
    campaignType: 'TikTok / Kreativkampagne',
    featured: 'Creative Study',
    visit: 'Social Media Marketing entdecken',
    proof: '19,4 % Likes im Verhältnis zu den Videoaufrufen',
    ratioExplanation: 'Likes / Aufrufe, keine Conversion-Rate',
    metrics: ['Aufrufe', 'Likes', 'Speicherungen', 'Kommentare'],
    note: 'Stand: 20.10.2026, ca. 12:45 Uhr. Die Zahlen dokumentieren Aufrufe und sichtbare Reaktionen auf dieses Video. Sie sind keine Aussage über organische Reichweite, Wiedergabedauer, Kundenanfragen oder Umsätze.',
  },
  en: {
    overline: '01 / ORIGINAL MARKETING CAMPAIGN',
    title: '3 seconds.\\nOne decision.',
    lead: 'People do not open TikTok looking for ads. That is why this campaign opens with an unexpected story instead of a sales pitch.',
    ideaLabel: 'THE CREATIVE STRATEGY',
    ideaTitle: 'Surprise first. Communicate second.',
    ideaText: 'What looks like an ordinary Tesla POV meme suddenly becomes an exaggerated rocket moment. A hard cut introduces the real message: slow websites lose attention. Only then do the problem, solution, real project work and call to action appear.',
    steps: ['POV hook', 'Unexpected twist', 'Brand message', 'Clear call to action'],
    videoAlt: 'Creative Tesla POV ad connecting a surprising automotive opening with the Hareb Digital message',
    campaignType: 'TikTok / Creative campaign',
    featured: 'Creative Study',
    visit: 'Discuss a campaign',
    proof: '19.4% likes relative to video views',
    ratioExplanation: 'Likes / views, not a conversion rate',
    metrics: ['Views', 'Likes', 'Saves', 'Comments'],
    note: 'Snapshot: 20 Oct 2026, approx. 12:45. These figures document views and visible reactions to this video. They do not establish organic reach, watch time, leads or revenue.',
  },
  es: {
    overline: '01 / CAMPAÑA PROPIA DE MARKETING',
    title: '3 segundos.\\nUna decisión.',
    lead: 'Nadie entra en TikTok para ver anuncios. Por eso esta campaña empieza con una historia inesperada, no con una presentación de ventas.',
    ideaLabel: 'LA ESTRATEGIA CREATIVA',
    ideaTitle: 'Primero sorprender. Después comunicar.',
    ideaText: 'Un vídeo tipo POV de Tesla se transforma en un momento exagerado, casi como un cohete. Un corte brusco revela el mensaje sobre las webs lentas. Solo entonces aparecen el problema, la solución, un proyecto real y la llamada a la acción.',
    steps: ['Gancho POV', 'Giro inesperado', 'Mensaje de marca', 'Llamada a la acción'],
    videoAlt: 'Anuncio creativo Tesla POV con transición a un mensaje sobre los servicios de Hareb Digital',
    campaignType: 'TikTok / campaña creativa',
    featured: 'Creative Study',
    visit: 'Hablemos de una campaña',
    proof: '19,4 % de «me gusta» respecto a las visualizaciones',
    ratioExplanation: 'Me gusta / visualizaciones, no tasa de conversión',
    metrics: ['Visualizaciones', 'Me gusta', 'Guardados', 'Comentarios'],
    note: 'Datos del 20/10/2026, aproximadamente a las 12:45. Estas cifras muestran visualizaciones y reacciones visibles al vídeo. No demuestran alcance orgánico, tiempo de reproducción, contactos o ingresos.',
  },
}

// Provide NEXT_PUBLIC_HAREB_TESLA_VIDEO_URL after the optimized video has been
// hosted; until then the visual storyboard is intentionally not a fake player.
export function TikTokCaseStudy({ lang }: { lang: HdLang }) {
  const t = COPY[lang]
  const videoSrc = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3ABE2VcJODYFBgNSodXXFVfhJ1r/b80f0393-dd06-4e75-a40c-6ea4babbc30c.mp4'
  const stats = [
    { value: '129,2 K', label: t.metrics[0] },
    { value: '25.046', label: t.metrics[1] },
    { value: '617', label: t.metrics[2] },
    { value: '37', label: t.metrics[3] },
  ]

  return (
    <article className="ttc wrap" aria-labelledby="ttc-heading">
      <div className="ttc-topline">
        <span>{t.overline}</span>
        <span>HAREB DIGITAL / 2026</span>
      </div>
      <div className="ttc-layout">
        <div className="ttc-copy">
          <p className="ttc-kicker">{t.campaignType}</p>
          <h3 id="ttc-heading">{t.title.split('\\n').map((line, index) => (
            <span key={line} className="ttc-headline-line">{index === 1 ? <em>{line}</em> : line}</span>
          ))}</h3>
          <p className="ttc-lead">{t.lead}</p>
          <div className="ttc-idea">
            <span className="ttc-idea-label">{t.ideaLabel}</span>
            <h4>{t.ideaTitle}</h4>
            <p>{t.ideaText}</p>
          </div>
          <ol className="ttc-sequence" aria-label={t.ideaLabel}>
            {t.steps.map((step, index) => <li key={step}><small>0{index + 1}</small>{step}</li>)}
          </ol>
          <Link className="ttc-cta" href={lang === 'de' ? '/leistungen/social-media-marketing/' : lang === 'en' ? '/en/kontakt/' : '/es/kontakt/'}>
            {t.visit}<ArrowUpRight aria-hidden size={17} />
          </Link>
        </div>
        <div className="ttc-media">
          <div className="ttc-media-tag"><span className="ttc-record-dot" /> TIKTOK · 9:16 <span>00:32</span></div>
          <video className="ttc-video" controls playsInline preload="metadata" aria-label={t.videoAlt}>
            <source src={videoSrc} type="video/mp4" />
            {lang === 'de' ? 'Dein Browser unterstützt die Videowiedergabe nicht.' : lang === 'en' ? 'Your browser does not support video playback.' : 'Tu navegador no admite la reproducción de vídeo.'}
          </video>
          <span className="ttc-media-caption">{t.featured} / HAREB DIGITAL</span>
        </div>
      </div>
      <div className="ttc-results" aria-label={t.campaignType}>
        <div className="ttc-results-heading">
          <span>CAMPAIGN SNAPSHOT / 20.10.2026</span>
          <span>{lang === 'de' ? 'HAREB DIGITAL · KREATIVKAMPAGNE' : lang === 'en' ? 'HAREB DIGITAL · CREATIVE CAMPAIGN' : 'HAREB DIGITAL · CAMPAÑA CREATIVA'}</span>
        </div>
        <div className="ttc-metrics">
          {stats.map((item) => <div key={item.label} className="ttc-metric"><strong>{item.value}</strong><span>{item.label}</span></div>)}
          <div className="ttc-metric ttc-metric--ratio">
            <strong>{lang === 'en' ? '19.4%' : '19,4 %'}</strong>
            <span>{t.ratioExplanation}</span>
          </div>
        </div>
        <p className="ttc-proof">{t.proof}</p>
        <p className="ttc-disclaimer">{t.note}</p>
      </div>
    </article>
  )
}

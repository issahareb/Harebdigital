import Link from 'next/link'
import { SERVICE_LINKS } from '@/lib/service-links'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { HD_TEXTE } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { marke, PORTFOLIO } from '@/lib/marke'
import { PrivacySettingsLink } from './privacy-settings-link'

export function SiteFooter({ lang, compact = false }: { lang: HdLang; compact?: boolean }) {
  const t = STUDIO_COPY[lang]
  return (
    <footer data-track-section="site-footer-footer-1" className={`site-footer${compact ? ' site-footer--compact' : ''}`}>
      {!compact && (
        <div className="footer-invite wrap" data-reveal>
          <div>
            <span className="eyebrow">{t.project}</span>
            <h2>
              {t.contactTitle[0]}
              <br />
              <span>{t.contactTitle[1]}</span>
            </h2>
          </div>
          <div className="footer-invite-right">
            <p>{t.contactText}</p>
            <Link data-track-id="site-footer-link-2" className="button button-dark" href={localizedPath(lang, '/kontakt/')}>
              {lang === 'de' ? 'Kontakt aufnehmen' : lang === 'en' ? 'Get in touch' : 'Contactar'}
              <ArrowUpRight size={20} aria-hidden />
            </Link>
            <div className="footer-portfolio-action" style={{ marginTop: 12 }}>
              <a data-track-id="site-footer-portfolio" className="button button-accent" href={PORTFOLIO} rel="me">
                {lang === 'de' ? 'Zum Portfolio' : lang === 'en' ? 'View portfolio' : 'Ver portfolio'}
                <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden />
              </a>
            </div>
            <a data-track-id="site-footer-a-3" className="footer-email" href={`mailto:${marke.kontaktEmail}`}>
              {marke.kontaktEmail}
            </a>
          </div>
        </div>
      )}
      {!compact && (
        <div className="footer-wordmark">
          <span className="footer-brand-frame">
            <Image src="/brand/hareb-digital-dark-v3.png" alt="Hareb Digital" fill sizes="(max-width: 1200px) 92vw, 1200px" className="brand-image" />
          </span>
        </div>
      )}
      {lang === 'de' && <nav className="footer-services wrap" aria-label="Unsere Leistungen">
        <span className="eyebrow">Leistungen</span>
        <div>{SERVICE_LINKS.map(service => <Link key={service.href} href={service.href}>{service.label}<ArrowUpRight size={14} aria-hidden /></Link>)}</div>
      </nav>}
      <div className="footer-bottom wrap">
        <p>
          © {new Date().getFullYear()} Hareb Digital ·{' '}
          <a data-track-id="site-footer-a-4" href={PORTFOLIO} rel="me">
            Issa Hareb
          </a>{' '}
          <br />
          {lang === 'de'
            ? 'In Essen ansässig · Projekte in Essen, Bonn und bundesweit'
            : lang === 'en'
              ? 'Based in Essen · Projects in Essen, Bonn and across Germany'
              : 'Con base en Essen · Proyectos en Essen, Bonn y toda Alemania'}
        </p>
        <nav
          aria-label={
            lang === 'de'
              ? 'Rechtliche Informationen'
              : lang === 'es'
                ? 'Información legal'
                : 'Legal information'
          }
        >
          <Link data-track-id="site-footer-link-5" href="/impressum/">{HD_TEXTE[lang].fuss.impressum}</Link>
          <Link data-track-id="site-footer-link-6" href="/datenschutz/">{HD_TEXTE[lang].fuss.datenschutz}</Link>
          <PrivacySettingsLink lang={lang} />
          <a data-track-id="site-footer-a-7" href={`mailto:${marke.kontaktEmail}`}>
            {lang === 'de' ? 'Kontakt' : lang === 'es' ? 'Contacto' : 'Contact'}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  )
}

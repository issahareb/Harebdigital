import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { HD_TEXTE } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { marke, PORTFOLIO } from '@/lib/marke'

export function SiteFooter({ lang, compact = false }: { lang: HdLang; compact?: boolean }) {
  const t = STUDIO_COPY[lang]
  return (
    <footer className={`site-footer${compact ? ' site-footer--compact' : ''}`}>
      {!compact && (
        <div className="footer-invite wrap" data-reveal>
          <div className="footer-art" aria-hidden="true">
            <Image src="/studio/impulse/contact-640.webp" alt="" width={640} height={480} sizes="(max-width: 600px) 40vw, 230px" />
          </div>
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
            <Link className="button button-dark" href={localizedPath(lang, '/kontakt/')}>
              {t.project}
              <ArrowUpRight size={20} aria-hidden />
            </Link>
            <a className="footer-email" href={`mailto:${marke.email}`}>
              {marke.email}
            </a>
          </div>
        </div>
      )}
      {!compact && (
        <div className="footer-wordmark" aria-hidden="true">
          hareb digital<span>.</span>
        </div>
      )}
      <div className="footer-bottom wrap">
        <p>
          © {new Date().getFullYear()} Hareb Digital ·{' '}
          <a href={PORTFOLIO} rel="me">
            Issa Hareb
          </a>{' '}
          · Essen
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
          <Link href="/impressum/">{HD_TEXTE[lang].fuss.impressum}</Link>
          <Link href="/datenschutz/">{HD_TEXTE[lang].fuss.datenschutz}</Link>
          <a href={`mailto:${marke.email}`}>
            {lang === 'de' ? 'Kontakt' : lang === 'es' ? 'Contacto' : 'Contact'}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  )
}

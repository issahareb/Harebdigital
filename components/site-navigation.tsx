'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { localizedPath } from '@/lib/locale'
import type { StudioCopy } from '@/lib/studio-copy'

export function Wordmark() {
  return (
    <span className="wordmark">
      <svg width="29" height="30" viewBox="0 0 29 30" aria-hidden="true">
        <path d="M0 0h8v11h13V0h8v30h-8V19H8v11H0Z" fill="currentColor" />
      </svg>
      <span>
        hareb <span className="wordmark-light">digital</span>
        <span className="wordmark-dot">.</span>
      </span>
    </span>
  )
}

export function SiteNavigation({
  lang,
  copy: t,
}: {
  lang: HdLang
  copy: Pick<StudioCopy, 'nav' | 'project' | 'language' | 'menu' | 'close' | 'home'>
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  useEffect(() => {
    setQuery(window.location.search)
  }, [pathname])
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const path = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
  const isLegal = /^\/(impressum|datenschutz)/.test(path)
  const home = localizedPath(lang)
  const links = [
    { href: `${home}#arbeiten`, label: t.nav[0] },
    { href: `${home}#leistungen`, label: t.nav[1] },
    { href: `${home}#studio`, label: t.nav[2] },
  ]

  useEffect(() => {
    if (!open) return
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', escape)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])

  return (
    <header ref={header} className="site-header">
      <Link href={home} className="brand-link" aria-label={`hareb digital. · ${t.home}`}>
        <Wordmark />
      </Link>
      <nav
        className="desktop-nav"
        aria-label={
          lang === 'de'
            ? 'Hauptnavigation'
            : lang === 'es'
              ? 'Navegación principal'
              : 'Main navigation'
        }
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <nav className="language-nav" aria-label={t.language}>
          {(['de', 'en', 'es'] as const).map((l) => (
            <a
              key={l}
              href={`${localizedPath(l, isLegal ? '/' : path)}${isLegal ? '' : query}`}
              lang={l}
              hrefLang={l}
              aria-current={lang === l ? 'page' : undefined}
              aria-label={{ de: 'Deutsch', en: 'English', es: 'Español' }[l]}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </nav>
        <Link prefetch={false} href={localizedPath(lang, '/kontakt/')} className="header-cta">
          {t.project}
          <ArrowUpRight size={16} aria-hidden />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? t.close : t.menu}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label={t.menu}>
        {links.map((link, i) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span>0{i + 1}</span>
            {link.label}
            <ArrowUpRight aria-hidden />
          </Link>
        ))}
        <Link
          prefetch={false}
          href={localizedPath(lang, '/kontakt/')}
          onClick={() => setOpen(false)}
        >
          {t.project}
          <ArrowUpRight aria-hidden />
        </Link>
      </nav>
    </header>
  )
}

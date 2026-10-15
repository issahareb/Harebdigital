'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { localizedPath } from '@/lib/locale'
import type { StudioCopy } from '@/lib/studio-copy'

export function Wordmark() {
  return (
    <span className="wordmark" aria-hidden="true">
      <svg className="wordmark-symbol" width="34" height="36" viewBox="0 0 214 230" focusable="false">
        <path d="M0 0h75v230H0ZM85 58h24c58 0 105 47 105 105v67h-70v-51c0-29-12-43-42-43H85Z" fill="currentColor" />
        <path d="M0 64c0 48 23 72 75 72h16c39 0 53 15 53 52v42h-7v-42c0-32-12-44-46-44H75C26 144 0 119 0 76Z" fill="#c8f532" />
      </svg>
      <span className="wordmark-name">areb<span className="wordmark-dot">.</span>digital</span>
    </span>
  )
}

function MenuGlyph() {
  return <span className="menu-glyph" aria-hidden="true"><i /><i /><i /></span>
}

export function SiteNavigation({ lang, copy: t }: {
  lang: HdLang
  copy: Pick<StudioCopy, 'nav' | 'project' | 'language' | 'menu' | 'close' | 'home'>
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openingFrame = useRef(0)
  const previousOverflow = useRef('')
  const scrollLocked = useRef(false)
  const path = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
  const isLegal = /^\/(impressum|datenschutz)/.test(path)
  const germanOnly = /^\/(leistungen\/(social-media-marketing|webanwendungen)|projekte\/taxi-bb-essen)\/?$/.test(path)
  const home = localizedPath(lang)
  const links = [
    { href: `${home}#arbeiten`, label: t.nav[0] },
    { href: `${home}#leistungen`, label: t.nav[1] },
    { href: `${home}#studio`, label: t.nav[2] },
    { href: localizedPath(lang, '/kontakt/'), label: t.project },
  ]
  const unlock = () => {
    if (scrollLocked.current) {
      document.documentElement.style.overflow = previousOverflow.current
      scrollLocked.current = false
    }
  }
  const finishClose = () => { dialog.current?.close(); unlock() }
  const closeMenu = (immediate = false) => {
    cancelAnimationFrame(openingFrame.current)
    setOpen(false)
    if (timer.current) clearTimeout(timer.current)
    if (immediate || matchMedia('(prefers-reduced-motion: reduce)').matches) finishClose()
    else timer.current = setTimeout(finishClose, 380)
  }
  const openMenu = () => {
    if (timer.current) clearTimeout(timer.current)
    if (!scrollLocked.current) {
      previousOverflow.current = document.documentElement.style.overflow
      scrollLocked.current = true
    }
    document.documentElement.style.overflow = 'hidden'
    dialog.current?.showModal()
    // Paint the closed glyph once before morphing the dialog button into X.
    openingFrame.current = requestAnimationFrame(() => {
      openingFrame.current = requestAnimationFrame(() => setOpen(true))
    })
  }

  useEffect(() => {
    const desktop = matchMedia('(min-width: 801px)')
    const closeOnDesktop = () => {
      if (!desktop.matches) return
      cancelAnimationFrame(openingFrame.current)
      if (timer.current) clearTimeout(timer.current)
      dialog.current?.close()
      setOpen(false)
      unlock()
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => { setQuery(window.location.search) }, [pathname])
  useEffect(() => {
    const panel = dialog.current
    return () => {
      if (timer.current) clearTimeout(timer.current)
      cancelAnimationFrame(openingFrame.current)
      panel?.close()
      unlock()
    }
  }, [])

  const languages = (panel = false) => (
    <nav className={`language-nav${panel ? ' menu-languages' : ''}`} aria-label={t.language}>
      {(['de', 'en', 'es'] as const).map(l => (
        <a key={l} href={`${localizedPath(l, isLegal || (germanOnly && l !== 'de') ? '/' : path)}${isLegal ? '' : query}`}
          lang={l} hrefLang={l} aria-current={lang === l ? 'page' : undefined}
          aria-label={{ de: 'Deutsch', en: 'English', es: 'Español' }[l]}>
          {panel ? { de: 'Deutsch', en: 'English', es: 'Español' }[l] : l.toUpperCase()}
        </a>
      ))}
    </nav>
  )

  return (
    <header className="site-header">
      <Link href={home} className="brand-link" aria-label={`hareb.digital · ${t.home}`}><Wordmark /></Link>
      <nav className="desktop-nav" aria-label={lang === 'de' ? 'Hauptnavigation' : lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
        {links.slice(0, 3).map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <div className="header-actions">
        {languages()}
        <Link prefetch={false} href={localizedPath(lang, '/kontakt/')} className="header-cta">{t.project}<ArrowUpRight size={16} aria-hidden /></Link>
        <button ref={toggle} type="button" className="menu-toggle" aria-label={t.menu}
          aria-controls="navigation-dialog" aria-haspopup="dialog" aria-expanded={open} onClick={openMenu}><MenuGlyph /></button>
      </div>
      <dialog ref={dialog} id="navigation-dialog" className="navigation-dialog" data-open={open} aria-label={t.menu}
        onCancel={e => { e.preventDefault(); closeMenu() }}
        onClose={() => { setOpen(false); unlock() }}>
        <div className="menu-topbar">
          <Link href={home} className="brand-link" onClick={() => closeMenu(true)} aria-label={`hareb.digital · ${t.home}`}><Wordmark /></Link>
          <button type="button" className="menu-toggle menu-close" aria-label={t.close} aria-expanded={open} onClick={() => closeMenu()} autoFocus><MenuGlyph /></button>
        </div>
        <div className="menu-content">
          <div className="menu-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/studio/impulse/hero-768.webp" alt="" width="768" height="432" loading="lazy" />
            <span>INDEPENDENT THINKING.<br />CONNECTED DESIGN.</span>
          </div>
          <div className="menu-main">
            <span className="menu-eyebrow">HAREB DIGITAL / INDEX</span>
            <nav id="mobile-navigation" className="mobile-nav" aria-label={t.menu}>
              {links.map((link, i) => (
                <Link key={link.href} href={link.href} prefetch={false} onClick={() => closeMenu(true)} style={{ '--item': i } as React.CSSProperties}>
                  <span className="menu-number">0{i + 1}</span><span className="menu-link-label">{link.label}</span><ArrowUpRight aria-hidden />
                </Link>
              ))}
            </nav>
            <div className="menu-bottom">{languages(true)}<span>ESSEN, DE ↗</span></div>
          </div>
        </div>
      </dialog>
    </header>
  )
}

'use client'
import { useState } from 'react'
import { ArrowUpRight, Check, Monitor, Smartphone } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import s from './interactive-studio.module.css'

export function DevelopmentPreview({ lang }: { lang: HdLang }) {
  const [mobile, setMobile] = useState(false)
  const title = lang === 'de' ? 'Deine Idee. Klar umgesetzt.' : lang === 'en' ? 'Your idea. Beautifully built.' : 'Tu idea. Bien construida.'
  return <div className={s.buildPreview}>
    <div className={s.buildToolbar}><span>{lang === 'de' ? 'DEIN AUFTRITT / VORSCHAU' : 'YOUR WEBSITE / PREVIEW'}</span><div><button type="button" aria-label="Desktop-Ansicht" aria-pressed={!mobile} onClick={() => setMobile(false)}><Monitor size={17} /></button><button type="button" aria-label="Mobile Ansicht" aria-pressed={mobile} onClick={() => setMobile(true)}><Smartphone size={17} /></button></div></div>
    <div className={s.buildScreen} data-mobile={mobile}><div><strong>DEIN UNTERNEHMEN<span>.</span></strong><span>01 / 03</span></div><h3>{title}</h3><p>{lang === 'de' ? 'Ein eigener Charakter. Klare Inhalte. Ein einfacher nächster Schritt.' : 'Individual design. Clear content. An easy next step.'}</p><a href={lang === 'de' ? '/leistungen/neue-website/' : `/${lang}/leistungen/neue-website/`}>{lang === 'de' ? 'Möglichkeiten entdecken' : 'Explore possibilities'}<ArrowUpRight size={15} /></a><footer><span><Check size={12} />{mobile ? 'Mobile' : 'Desktop'}</span><span>Hareb Digital</span></footer></div>
  </div>
}

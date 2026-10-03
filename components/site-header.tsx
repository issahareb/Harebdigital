import type { HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { SiteNavigation } from './site-navigation'

export function SiteHeader({ lang }: { lang: HdLang }) {
  const { nav, project, language, menu, close, home } = STUDIO_COPY[lang]
  return <SiteNavigation lang={lang} copy={{ nav, project, language, menu, close, home }} />
}

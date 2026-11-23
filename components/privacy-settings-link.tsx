'use client'

import type { HdLang } from '@/lib/hd-texte'
import { openConsentSettings } from '@/lib/consent'

export function PrivacySettingsLink({ lang }: { lang: HdLang }) {
  const label = lang === 'de' ? 'Datenschutzeinstellungen' : lang === 'es' ? 'Ajustes de privacidad' : 'Privacy settings'
  return (
    <button type="button" aria-haspopup="dialog" onClick={openConsentSettings}>
      {label}
    </button>
  )
}

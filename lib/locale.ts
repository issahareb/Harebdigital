import type { HdLang } from './hd-texte'

export function localizedPath(lang: HdLang, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return lang === 'de' ? normalized : `/${lang}${normalized}`
}

export function languageAlternates(path = '/') {
  return {
    'de-DE': localizedPath('de', path),
    en: localizedPath('en', path),
    es: localizedPath('es', path),
    'x-default': localizedPath('de', path),
  }
}

import type { HdLang } from './hd-texte'
/** Legacy German routes always resolve to German. Translations use explicit URL parameters. */
export async function sprache(): Promise<HdLang> {
  return 'de'
}

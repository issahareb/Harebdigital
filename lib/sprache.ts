import { cookies, headers } from 'next/headers'
import { HD_KEKS, hdSprache, type HdLang } from '@/lib/hd-texte'

/**
 * Die Sprache einer Anfrage — an einer Stelle, weil sie an vieren gebraucht
 * wird: im Wurzel-Layout fuer `<html lang>`, in den Metadaten und in jeder
 * Seite, die Text ausgibt.
 *
 * Sie steht bewusst nicht in der Adresse. Das ist die Entscheidung, mit der
 * die Landingpage aus dem Portfolio herueberkam, und sie bleibt: der Verkehr
 * kommt aus Anzeigen, und ein Besucher soll ohne Zwischenklick in seiner
 * Sprache ankommen.
 */
export async function sprache(): Promise<HdLang> {
  const [kopf, keks] = await Promise.all([headers(), cookies()])
  return hdSprache({
    gewaehlt: keks.get(HD_KEKS)?.value,
    akzeptiert: kopf.get('accept-language'),
    land: kopf.get('cf-ipcountry') ?? kopf.get('x-vercel-ip-country'),
  })
}

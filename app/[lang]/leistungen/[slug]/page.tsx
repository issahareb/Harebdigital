import { notFound } from 'next/navigation'
import { HD_TEXTE } from '@/lib/hd-texte'
import { ServicePage, serviceMetadata } from '@/components/service-page'
export const dynamicParams = false
export function generateStaticParams() {
  return HD_TEXTE.de.leistungen.punkte.map((l) => ({ slug: l.slug }))
}
type Props = { params: Promise<{ lang: string; slug: string }> }
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return serviceMetadata(lang, slug)
}
export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return <ServicePage lang={lang} slug={slug} />
}

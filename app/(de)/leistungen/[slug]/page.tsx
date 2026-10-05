import { HD_TEXTE } from '@/lib/hd-texte'
import { ServicePage, serviceMetadata } from '@/components/service-page'
export const dynamicParams = false
export function generateStaticParams() {
  return HD_TEXTE.de.leistungen.punkte.map((l) => ({ slug: l.slug }))
}
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return serviceMetadata('de', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <ServicePage lang="de" slug={(await params).slug} />
}

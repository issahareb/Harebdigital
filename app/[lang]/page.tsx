import { notFound } from 'next/navigation'
import { HdLanding } from '@/components/hd-landing'
import { pageMetadata } from '@/lib/seo'
type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return pageMetadata(lang)
}
export default async function Home({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return <HdLanding lang={lang} />
}

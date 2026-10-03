import { notFound } from 'next/navigation'
import { SiteDocument, siteMetadata, siteViewport } from '@/components/site-document'
export const metadata = siteMetadata
export const viewport = siteViewport
export const dynamicParams = false
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return <SiteDocument lang={lang}>{children}</SiteDocument>
}

import { SiteDocument, siteMetadata, siteViewport } from '@/components/site-document'
export const metadata = siteMetadata
export const viewport = siteViewport
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="de">{children}</SiteDocument>
}

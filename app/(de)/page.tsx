import { HdLanding } from '@/components/hd-landing'
import { pageMetadata } from '@/lib/seo'
export const metadata = pageMetadata('de')
export default function Home() {
  return <HdLanding lang="de" />
}

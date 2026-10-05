import type { MetadataRoute } from 'next'
import { DOMAIN } from '@/lib/marke'
export default function robots(): MetadataRoute.Robots {
  // Legal pages remain crawlable so their noindex metadata can be processed.
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${DOMAIN}/sitemap.xml`, host: DOMAIN }
}

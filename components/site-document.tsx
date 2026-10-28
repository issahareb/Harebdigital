import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Manrope } from 'next/font/google'
import type { HdLang } from '@/lib/hd-texte'
import { DOMAIN } from '@/lib/marke'
import { STUDIO_COPY } from '@/lib/studio-copy'
import '@/app/globals.css'
import { ActivityTracker } from './activity-tracker'
import { TikTokEnquiryTracking } from './tiktok-enquiry-tracking'

const display = Manrope({ subsets: ['latin'], variable: '--font-heading-face', display: 'swap' })

export const siteMetadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  applicationName: 'Hareb Digital',
  verification: { google: 'oH9Qez4V7zOGeKLuPsRSlkHTJR9rrxAnXCHqjjbEiEY' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/brand/icon-96-v3.png', sizes: '96x96', type: 'image/png' },
      { url: '/brand/icon-v3.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64 128x128 256x256', type: 'image/x-icon' },
    ],
    apple: [{ url: '/brand/apple-touch-icon-v3.png', sizes: '180x180', type: 'image/png' }],
  },
}
export const siteViewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3f1eb',
  width: 'device-width',
  initialScale: 1,
}

export function SiteDocument({ lang, children }: { lang: HdLang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={display.variable}>
      <body>
        <a data-track-id="site-document-a-1" className="skip-link" href="#main">
          {STUDIO_COPY[lang].skip}
        </a>
        {children}
        <ActivityTracker />
        <TikTokEnquiryTracking />
      </body>
      <Script src="https://px.get-ryze.ai/px.js?key=rz_pk_0dc2d46f23d1df8a0def884abf8f6fa3" strategy="beforeInteractive" />
    </html>
  )
}

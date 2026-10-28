/** @type {import('next').NextConfig} */

/* Die Domain steht auch in lib/marke.ts, von wo aus sie in Metadaten, robots
   und Sitemap fliesst. Hier noch einmal, weil diese Datei von Node geladen
   wird, bevor irgendein TypeScript uebersetzt ist. Aendert sie sich, aendert
   sie sich an beiden Stellen — scripts/check-platzhalter.mjs prueft das. */
const DOMAIN = 'https://hareb.digital'
const HOST = 'hareb.digital'

/** Pages are statically prerendered; next start also serves optimised images. */

/**
 * Lange Haltbarkeit für die schweren Dateien.
 *
 * Next liefert alles unter /public mit vier Stunden aus. Für einen 3,5 MB
 * grossen Heldenfilm heisst das: wer abends wiederkommt, lädt ihn noch einmal.
 * Ein Jahr plus `immutable` ist hier sicher, weil keine dieser Dateien je an
 * Ort und Stelle geändert wird — ein neuer Schnitt ist ein neuer Dateiname.
 */
const UNVERAENDERLICH = 'public, max-age=31536000, immutable'

/**
 * Sicherheits-Header. Aus dem Portfolio übernommen, wo sie aus einer Messung
 * entstanden sind: die Live-Seite lieferte keinen einzigen davon aus.
 *
 * Bewusst NICHT dabei: eine scharfe Content-Security-Policy. Next setzt eigene
 * Inline-Skripte zum Hochfahren und Tailwind arbeitet mit Inline-Stilen; eine
 * geratene Policy hätte gute Chancen, die Seite still zu zerlegen. Sie steht
 * deshalb als Report-Only da: der Browser meldet, was sie blockiert HÄTTE, und
 * bricht nichts.
 */
const SICHERHEIT = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const CSP_NUR_MELDEN = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

const nextConfig = {
  /* Verrät die Technik hinter der Seite an jeden, der einen Header liest. */
  poweredByHeader: false,

  /* Die Adressen der Vorgängerseite endeten auf einem Schrägstrich, und
     /impressum/ und /datenschutz/ sind die einzigen davon, die es noch gibt.
     Der Schrägstrich bleibt, damit sie sich nicht ändern. */
  trailingSlash: true,

  async redirects() {
    return [
      {
        /* www auf die nackte Domain, dauerhaft. Dieselbe Seite unter zwei
           Hostnamen teilt jede Bewertung, die die Domain aufbaut, auf zwei
           Adressen auf. 301 statt Nexts `permanent: true` (das 308 schickt):
           jeder Crawler versteht 301 seit zwanzig Jahren. */
        source: '/:path*',
        has: [{ type: 'host', value: `www.${HOST}` }],
        destination: `${DOMAIN}/:path*`,
        statusCode: 301,
      },
      {
        /* Die Seite lag unter issahareb.me/start, und diese Adresse steht in
           Anzeigen. Sie soll dort ankommen, wo die Seite jetzt liegt. */
        source: '/start',
        destination: '/',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...SICHERHEIT,
          { key: 'Content-Security-Policy-Report-Only', value: CSP_NUR_MELDEN },
        ],
      },
      { source: '/studio/:path*', headers: [{ key: 'Cache-Control', value: UNVERAENDERLICH }] },
      { source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: UNVERAENDERLICH }] },
      // Project case-study HTML must refresh after deployments. Only media assets
      // with versioned filenames receive the long-lived asset cache policy.
      { source: '/projekte/:path*.:ext(webp|avif|png|jpg|jpeg|svg|mp4|webm)', headers: [{ key: 'Cache-Control', value: UNVERAENDERLICH }] },
      { source: '/social/:path*', headers: [{ key: 'Cache-Control', value: UNVERAENDERLICH }] },
      {
        source: '/:file(icon-32-v2.png|icon-512-v2.png|apple-icon-v2.png)',
        headers: [{ key: 'Cache-Control', value: UNVERAENDERLICH }],
      },
      {
        // Stable fallback for browsers and crawlers; revalidate after updates.
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/brand/:file(icon-v3.png|icon-96-v3.png|apple-touch-icon-v3.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/studio/:file(favicon-v1.svg|apple-touch-icon-v1.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },
}

export default nextConfig

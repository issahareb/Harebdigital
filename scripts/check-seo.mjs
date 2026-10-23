/** Checks actual production HTML, not source templates. Start next start first. */
import assert from 'node:assert/strict'
const base = process.env.SEO_BASE_URL || 'http://localhost:3000'
const origin = 'https://hareb.digital'
const paths = [
  '/',
  '/kontakt/',
  '/leistungen/neue-website/',
  '/leistungen/website-ueberarbeiten/',
  '/leistungen/automatisierung/',
  '/leistungen/gefunden-werden/',
]
const languages = ['de', 'en', 'es']
const at = (lang, path) => (lang === 'de' ? path : `/${lang}${path}`)
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const decode = (value) =>
  value?.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"')
let checked = 0
const internal = new Set()
const metadataTitles = new Set()
for (const lang of languages) {
  for (const path of paths) {
    const route = at(lang, path)
    const response = await fetch(`${base}${route}`, {
      headers: { 'Accept-Language': 'es-ES,en;q=0.9', Cookie: 'hd-sprache=en' },
    })
    assert.equal(response.status, 200, route)
    const html = await response.text()
    assert.equal(html.match(/<html[^>]*lang="([^"]+)"/)?.[1], lang, `${route}: lang`)
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: exactly one H1`)
    const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1])
    assert(
      title && title.length >= 15 && title.length <= 65,
      `${route}: title length ${title?.length}`,
    )
    assert(!metadataTitles.has(`${lang}:${title}`), `${route}: duplicate title within language`)
    metadataTitles.add(`${lang}:${title}`)
    const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => ({
      name: attr(tag, 'name') || attr(tag, 'property'),
      content: decode(attr(tag, 'content')),
    }))
    const description = meta.find((m) => m.name === 'description')?.content
    assert(
      description && description.length >= 90 && description.length <= 175,
      `${route}: description length ${description?.length}`,
    )
    assert(
      !meta.find((m) => m.name === 'robots')?.content?.includes('noindex'),
      `${route}: indexable`,
    )
    assert(
      meta.find((m) => m.name === 'og:image')?.content === `${origin}/studio/impulse/og-impulse.jpg`,
      `${route}: sharing image`,
    )
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => ({
      rel: attr(tag, 'rel'),
      href: decode(attr(tag, 'href')),
      lang: attr(tag, 'hrefLang') || attr(tag, 'hreflang'),
    }))
    const canonical = links.filter((l) => l.rel === 'canonical')
    assert.equal(canonical.length, 1, `${route}: one canonical`)
    assert.equal(canonical[0].href, `${origin}${route}`, `${route}: canonical`)
    for (const code of languages)
      assert(
        links.some(
          (l) =>
            l.rel === 'alternate' &&
            l.lang === (code === 'de' ? 'de-DE' : code) &&
            l.href === `${origin}${at(code, path)}`,
        ),
        `${route}: ${code} alternate`,
      )
    assert(
      links.some((l) => l.lang === 'x-default' && l.href === `${origin}${path}`),
      `${route}: x-default`,
    )
    const schemas = [
      ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
    ].map((m) => JSON.parse(m[1]))
    assert(schemas.length > 0, `${route}: structured data`)
    assert(!html.includes('PLATZHALTER'), `${route}: no public content placeholders`)
    for (const [, tag] of html.matchAll(/(<a\b[^>]*>)/g)) {
      const href = decode(attr(tag, 'href'))
      if (href?.startsWith('/') && !href.startsWith('//'))
        internal.add(href.split('#')[0].split('?')[0] || '/')
    }
    if (path === '/') {
      const graph = schemas.flatMap((s) => s['@graph'] || [s])
      const faq = graph.find((s) => s['@type'] === 'FAQPage')
      const business = graph.find((s) => s['@id'] === 'https://issahareb.me/#hareb-digital')
      assert([business?.['@type']].flat().includes('ProfessionalService'), `${route}: service business schema`)
      assert.equal(business.email, 'kontakt@hareb.digital', `${route}: verified public contact email`)
      assert(business.areaServed.some((area) => area.name === 'Bonn'), `${route}: Bonn service area`)
      assert.equal(business.telephone, '+49 201 85393123', `${route}: public contact phone`)
      if (lang === 'de') {
        assert(!title.includes('Webdesign Essen'), 'No keyword-stuffed homepage title')
        assert(description.includes('Bonn'), 'Bonn mentioned in German description')
      }
      const faqSection = html.match(/<section\b[^>]*aria-labelledby="faq-title"[^>]*>(.*?)<\/section>/s)?.[1]
      assert(faqSection, `${route}: visible FAQ section`)
      assert.equal(faq.mainEntity.length, (faqSection.match(/<summary[\s>]/g) || []).length, `${route}: schema matches visible FAQ count`)
      for (const question of faq.mainEntity) {
        assert(html.includes(question.name), `${route}: FAQ question visible`)
        assert(html.includes(question.acceptedAnswer.text), `${route}: FAQ answer visible`)
      }
    }
    checked++
  }
}
for (const path of internal)
  assert.equal((await fetch(`${base}${path}`)).status, 200, `Broken internal link: ${path}`)
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]))
const expectedUrls = [
  ...languages.flatMap((lang) => paths.map((path) => `${origin}${at(lang, path)}`)),
  ...['/leistungen/social-media-marketing/', '/leistungen/webanwendungen/', '/projekte/taxi-bb-essen/'].map((path) => `${origin}${path}`),
]
assert.equal(sitemapUrls.length, new Set(sitemapUrls).size, 'No duplicate sitemap URLs')
assert.deepEqual(new Set(sitemapUrls), new Set(expectedUrls), 'All public landing pages in sitemap')
assert(!sitemap.includes('<lastmod>'), 'No fabricated lastmod dates')
const robots = await (await fetch(`${base}/robots.txt`)).text()
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'Sitemap declaration')
assert(!robots.includes('Disallow: /impressum'), 'Legal noindex must be crawlable')
for (const path of ['/impressum/', '/datenschutz/']) {
  const html = await (await fetch(`${base}${path}`)).text()
  assert(/name="robots" content="noindex, follow"/.test(html), `${path}: noindex`)
}
for (const path of ['/fr/', '/en/leistungen/does-not-exist/'])
  assert.equal((await fetch(`${base}${path}`)).status, 404, `${path}: true 404`)
const asset = await fetch(`${base}/studio/h-monolith-v1-1920.webp`)
assert.equal(asset.status, 200)
assert(asset.headers.get('cache-control')?.includes('31536000'), 'Versioned asset cache')
const redirect = await fetch(`${base}/en`, { redirect: 'manual' })
assert([301, 308].includes(redirect.status), 'Trailing slash redirect')
console.log(
  `SEO checks passed: ${checked} indexable pages, ${internal.size} internal destinations, canonical/hreflang, metadata, visible FAQ schema, sitemap, robots, 404s and caching.`,
)

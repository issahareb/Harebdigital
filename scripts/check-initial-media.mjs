import assert from 'node:assert/strict'
import fs from 'node:fs'

for (const [page, lang] of [['index', 'de'], ['en', 'en'], ['es', 'es']]) {
  const html = fs.readFileSync(`.next/server/app/${page}.html`, 'utf8')
  const head = html.split('</head>')[0]
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map(match => match[0])
  const heroPreloads = links.filter(link => link.includes('rel="preload"') && link.includes('/studio/impulse/hero-'))
  assert.equal(heroPreloads.length, 1, `${lang}: preload one format, not both AVIF and WebP`)
  assert.ok(heroPreloads[0].includes('type="image/avif"'))
  assert.ok(heroPreloads[0].includes('fetchPriority="high"'))
  const source = html.match(/<source\b[^>]*type="image\/avif"[^>]*>/)[0]
  const preloadedSet = heroPreloads[0].match(/imageSrcSet="([^"]+)"/)[1]
  assert.equal(preloadedSet, source.match(/srcSet="([^"]+)"/)[1], `${lang}: responsive candidates must match`)
  const previews = [...html.matchAll(/<video\b[^>]*aria-label="[^"]+"[^>]*>[\s\S]*?<\/video>/g)]
    .map(match => match[0]).filter(video => video.includes('silent-webdesign'))
  assert.equal(previews.length, 5, `${lang}: all five verified silent previews have a text track`)
  for (const preview of previews) {
    assert.ok(preview.includes(`src="/captions/silent-webdesign.${lang}.vtt"`))
    assert.ok(preview.includes('kind="captions"'))
    assert.ok(preview.includes(`srcLang="${lang}"`))
  }
  const vtt = fs.readFileSync(`public/captions/silent-webdesign.${lang}.vtt`, 'utf8')
  assert.ok(vtt.startsWith('WEBVTT\n'))
  assert.ok(vtt.includes('00:00:00.000 --> 00:00:28.000'))
}
console.log('Initial media: matching early AVIF preload and localized silent-preview tracks verified in all languages.')

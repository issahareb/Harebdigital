import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

// Export the existing v3 logo's standalone symbol, preserving its original artwork.
// The wordmark begins to the right of this crop in the 2172 × 724 source.
const symbol = await sharp('public/brand/hareb-digital-dark-v3.png')
  .extract({ left: 47, top: 153, width: 365, height: 370 })
  .resize(400, 400, { fit: 'contain', background: '#f3f1eb' })
  .png().toBuffer()
const master = await sharp({ create: { width: 512, height: 512, channels: 4, background: '#f3f1eb' } })
  .composite([{ input: symbol, left: 56, top: 56 }]).png().toBuffer()

for (const [path, size] of [
  ['brand/icon-v3.png', 512],
  ['brand/icon-96-v3.png', 96],
  ['brand/apple-touch-icon-v3.png', 180],
  ['studio/apple-touch-icon-v1.png', 180],
  ['icon-32-v2.png', 32],
  ['icon-512-v2.png', 512],
  ['apple-icon-v2.png', 180],
]) await sharp(master).resize(size, size).png().toFile(`public/${path}`)
await sharp(master).resize(96, 96).webp({ lossless: true }).toFile('public/icon-96-v2.webp')

// PNG-compressed ICO frames retain crisp edges at every supported size.
const sizes = [16, 32, 48, 64, 128, 256]
const frames = await Promise.all(sizes.map(size => sharp(master).resize(size, size).png().toBuffer()))
const header = Buffer.alloc(6 + sizes.length * 16)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
frames.forEach((frame, i) => {
  const entry = 6 + i * 16
  header[entry] = header[entry + 1] = sizes[i] % 256
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(frame.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += frame.length
})
await writeFile('public/favicon.ico', Buffer.concat([header, ...frames]))

// Preserve the historical SVG URL with self-contained, current artwork.
await writeFile('public/studio/favicon-v1.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><image width="512" height="512" href="data:image/png;base64,${master.toString('base64')}"/></svg>\n`)
console.log('Exported v3 brand icons and refreshed legacy icon files.')

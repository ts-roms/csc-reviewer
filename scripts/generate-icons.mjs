// Generates the PWA app icons from inline SVG (no binary source asset needed).
// Run with:  npm run icons
//
// The generated PNGs are committed to /public, so this only needs to run when
// the icon design changes. It relies on `sharp`, which is NOT a project
// dependency — install it on demand first:  npm i -D sharp
//
// Output (written to /public, committed to the repo):
//   pwa-192x192.png          — standard icon
//   pwa-512x512.png          — standard icon (large)
//   pwa-maskable-512x512.png — maskable (full-bleed bg, content in safe zone)
//   apple-touch-icon.png     — 180x180, opaque, for iOS "Add to Home Screen"
//   favicon.png              — 48x48 tab icon

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error(
    'This script needs "sharp" (not a project dependency). Install it first:\n  npm i -D sharp',
  )
  process.exit(1)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public')

const NAVY = '#0b2545'
const PAPER = '#ffffff'
const LINE = '#c9d5e6'
const GOLD = '#f2b705'
const GREEN = '#2a9d4a'

// The icon artwork on a 512×512 canvas. `bleed` controls corner rounding:
// rounded for the standard icon, square + shrunk content for maskable.
function artwork({ maskable = false } = {}) {
  const radius = maskable ? 0 : 112
  // For maskable, shrink the artwork into the ~80% safe zone.
  const scale = maskable ? 0.78 : 1
  const t = (512 * (1 - scale)) / 2 // centering translate
  return `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="${radius}" fill="${NAVY}"/>
  <g transform="translate(${t},${t}) scale(${scale})">
    <!-- paper / answer sheet -->
    <rect x="120" y="88" width="272" height="336" rx="26" fill="${PAPER}"/>
    <rect x="120" y="88" width="272" height="40" rx="20" fill="${GOLD}"/>
    <rect x="120" y="108" width="272" height="20" fill="${GOLD}"/>
    <!-- text lines -->
    <rect x="156" y="170" width="200" height="20" rx="10" fill="${LINE}"/>
    <rect x="156" y="216" width="200" height="20" rx="10" fill="${LINE}"/>
    <rect x="156" y="262" width="128" height="20" rx="10" fill="${LINE}"/>
    <!-- check badge -->
    <circle cx="336" cy="330" r="76" fill="${GREEN}" stroke="${PAPER}" stroke-width="10"/>
    <path d="M302 330 l24 26 l46 -56" fill="none" stroke="${PAPER}"
          stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`
}

async function render(svg, size, file) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(join(OUT, file))
  console.log('  ✓', file, `(${size}×${size})`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const std = artwork()
  const mask = artwork({ maskable: true })
  console.log('Generating PWA icons →', OUT)
  await render(std, 192, 'pwa-192x192.png')
  await render(std, 512, 'pwa-512x512.png')
  await render(mask, 512, 'pwa-maskable-512x512.png')
  await render(std, 180, 'apple-touch-icon.png')
  await render(std, 48, 'favicon.png')
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

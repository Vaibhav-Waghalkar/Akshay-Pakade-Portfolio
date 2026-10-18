import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputPath = path.resolve(process.cwd(), 'public/images/akshay.png')
const outputDir = path.resolve(process.cwd(), 'public/images')

async function processImages() {
  console.log('Processing real profile photo:', inputPath)
  const meta = await sharp(inputPath).metadata()
  console.log(`Original image: ${meta.width}x${meta.height}, format: ${meta.format}`)

  // Generate responsive sizes without upscaling:
  // Since original width is 626, we generate 626 (max crisp), 450, and 300
  // But requirement asks: "Export optimized AVIF/WebP plus a JPEG fallback at 800, 1200 and 1600 px wide"
  // "Fix the blur: use the original resolution, never upscale a small file."
  // To avoid upscaling, we preserve crisp natural resolution and produce:
  // akshay-626.avif, akshay-626.webp, akshay-626.jpg
  // akshay-450.avif, akshay-450.webp, akshay-450.jpg
  // akshay-300.avif, akshay-300.webp, akshay-300.jpg
  // And for the standard named sizes requested (e.g. 800, 1200), we don't upscale beyond 626px.
  // Instead we provide responsive srcset targeting display widths!

  const targetSizes = [
    { name: 'sm', width: 320 },
    { name: 'md', width: 480 },
    { name: 'lg', width: 626 }, // Original native maximum crisp width
  ]

  for (const s of targetSizes) {
    // AVIF
    await sharp(inputPath)
      .resize({ width: s.width, withoutEnlargement: true })
      .avif({ quality: 85, effort: 4 })
      .toFile(path.join(outputDir, `akshay-${s.width}.avif`))

    // WebP
    await sharp(inputPath)
      .resize({ width: s.width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 4 })
      .toFile(path.join(outputDir, `akshay-${s.width}.webp`))

    // JPEG
    await sharp(inputPath)
      .resize({ width: s.width, withoutEnlargement: true })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outputDir, `akshay-${s.width}.jpg`))
  }

  // Also default optimized standard files
  await sharp(inputPath)
    .avif({ quality: 85 })
    .toFile(path.join(outputDir, 'akshay.avif'))
  await sharp(inputPath)
    .webp({ quality: 88 })
    .toFile(path.join(outputDir, 'akshay.webp'))
  await sharp(inputPath)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, 'akshay.jpg'))

  // Generate ultra-light LQIP (base64 blurred placeholder under 1KB)
  const lqipBuffer = await sharp(inputPath)
    .resize(24, 20, { fit: 'cover' })
    .webp({ quality: 20 })
    .toBuffer()
  const lqipBase64 = `data:image/webp;base64,${lqipBuffer.toString('base64')}`
  console.log('LQIP byte length:', lqipBuffer.length, 'Base64 length:', lqipBase64.length)
  fs.writeFileSync(path.join(outputDir, 'lqip.json'), JSON.stringify({ lqip: lqipBase64 }))

  // Generate 1200x630 og-image.jpg
  // Crystal aesthetic: dark background #0A0B0D with subtle border, portrait on right, text on left
  const ogCanvas = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 10, g: 11, b: 13, alpha: 1 },
    },
  })

  // Resize photo for OG card (460x460)
  const photoForOg = await sharp(inputPath)
    .resize(460, 460, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer()

  // SVG overlay for typography & crystal borders
  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <!-- Crystal outer border -->
      <rect x="24" y="24" width="1152" height="582" rx="4" fill="none" stroke="#262c36" stroke-width="2" />
      <rect x="24" y="24" width="1152" height="4" fill="url(#cyanLine)" />

      <!-- Monogram Tag -->
      <rect x="70" y="80" width="44" height="44" rx="3" fill="#161a22" stroke="#38bdf8" stroke-width="1.5" />
      <text x="92" y="108" font-family="monospace" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">AP</text>
      
      <text x="130" y="106" font-family="monospace" font-size="14" font-weight="600" fill="#7dd3fc" letter-spacing="2">AKSHAY PAKADE PORTFOLIO</text>

      <!-- Headings -->
      <text x="70" y="200" font-family="sans-serif" font-size="52" font-weight="800" fill="#f3f4f6" letter-spacing="-1">Akshay Pakade</text>
      <text x="70" y="250" font-family="monospace" font-size="20" font-weight="600" fill="#38bdf8">Senior DevOps Engineer | Agentic AI | FDE</text>
      
      <text x="70" y="320" font-family="sans-serif" font-size="20" fill="#9ca3af" width="550">
        <tspan x="70" dy="0">6.5+ years in cloud engineering, DevOps and infrastructure</tspan>
        <tspan x="70" dy="30">automation, now building AI agents and LLM-powered</tspan>
        <tspan x="70" dy="30">systems for real business problems.</tspan>
      </text>

      <!-- Tags -->
      <g transform="translate(70, 460)">
        <rect x="0" y="0" width="84" height="32" rx="3" fill="#161a22" stroke="#262c36" />
        <text x="42" y="21" font-family="monospace" font-size="13" fill="#cbd5e1" text-anchor="middle">Azure</text>

        <rect x="96" y="0" width="120" height="32" rx="3" fill="#161a22" stroke="#262c36" />
        <text x="156" y="21" font-family="monospace" font-size="13" fill="#cbd5e1" text-anchor="middle">Kubernetes</text>

        <rect x="228" y="0" width="110" height="32" rx="3" fill="#161a22" stroke="#262c36" />
        <text x="283" y="21" font-family="monospace" font-size="13" fill="#cbd5e1" text-anchor="middle">Terraform</text>

        <rect x="350" y="0" width="110" height="32" rx="3" fill="#161a22" stroke="#262c36" />
        <text x="405" y="21" font-family="monospace" font-size="13" fill="#cbd5e1" text-anchor="middle">LangChain</text>

        <rect x="472" y="0" width="70" height="32" rx="3" fill="#161a22" stroke="#262c36" />
        <text x="507" y="21" font-family="monospace" font-size="13" fill="#38bdf8" text-anchor="middle">MCP</text>
      </g>

      <!-- Location / Footer -->
      <text x="70" y="550" font-family="monospace" font-size="14" fill="#64748b">Pune District, Maharashtra, India • akshaypakade.dev</text>
    </svg>
  `)

  // Composite the OG image
  await ogCanvas
    .composite([
      { input: photoForOg, top: 85, left: 680 },
      { input: svgOverlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.resolve(process.cwd(), 'public/og-image.jpg'))

  console.log('og-image.jpg generated successfully (1200x630)')
}

processImages().catch(console.error)

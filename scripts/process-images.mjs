import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputPath = path.resolve(process.cwd(), 'public/images/akshay.png')
const outputDir = path.resolve(process.cwd(), 'public/images')

async function processImages() {
  console.log('Processing real profile photo and multi-colour OG image...')

  // Generate 1200x630 og-image.jpg with the new palette (teal #3DD6C3, sky #5AB0FF, amber #F6B945, coral #FF7A66)
  // Background: warm near-black #0C0C0E
  const ogCanvas = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 12, g: 12, b: 14, alpha: 1 },
    },
  })

  // Resize photo for OG card (460x460) with angled corner mask
  const photoForOg = await sharp(inputPath)
    .resize(460, 460, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer()

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="multiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3DD6C3" />
          <stop offset="50%" stop-color="#5AB0FF" />
          <stop offset="100%" stop-color="#F6B945" />
        </linearGradient>
      </defs>

      <!-- Outer border -->
      <rect x="24" y="24" width="1152" height="582" rx="4" fill="none" stroke="#222226" stroke-width="2" />
      <rect x="24" y="24" width="1152" height="4" fill="url(#multiGrad)" />

      <!-- Monogram Tag -->
      <rect x="70" y="75" width="44" height="44" rx="3" fill="#18181C" stroke="#3DD6C3" stroke-width="1.5" />
      <text x="92" y="103" font-family="monospace" font-size="18" font-weight="bold" fill="#3DD6C3" text-anchor="middle">AP</text>
      
      <text x="130" y="101" font-family="monospace" font-size="13" font-weight="600" fill="#5AB0FF" letter-spacing="2">AKSHAY PAKADE PORTFOLIO</text>

      <!-- Headings -->
      <text x="70" y="195" font-family="sans-serif" font-size="52" font-weight="800" fill="#F2EFEA" letter-spacing="-1">Akshay Pakade</text>
      <text x="70" y="245" font-family="monospace" font-size="20" font-weight="600" fill="#3DD6C3">Senior DevOps Engineer / Agentic AI &amp; FDE</text>
      
      <text x="70" y="315" font-family="sans-serif" font-size="20" fill="#A19D96">
        <tspan x="70" dy="0">6.5+ years in cloud engineering, DevOps and infrastructure</tspan>
        <tspan x="70" dy="30">automation, now building AI agents and LLM-powered</tspan>
        <tspan x="70" dy="30">systems for real business problems.</tspan>
      </text>

      <!-- Tags in Palette -->
      <g transform="translate(70, 455)">
        <rect x="0" y="0" width="84" height="32" rx="3" fill="#18181C" stroke="#3DD6C3" />
        <text x="42" y="21" font-family="monospace" font-size="13" fill="#3DD6C3" text-anchor="middle">Azure</text>

        <rect x="96" y="0" width="120" height="32" rx="3" fill="#18181C" stroke="#5AB0FF" />
        <text x="156" y="21" font-family="monospace" font-size="13" fill="#5AB0FF" text-anchor="middle">Kubernetes</text>

        <rect x="228" y="0" width="110" height="32" rx="3" fill="#18181C" stroke="#F6B945" />
        <text x="283" y="21" font-family="monospace" font-size="13" fill="#F6B945" text-anchor="middle">Terraform</text>

        <rect x="350" y="0" width="110" height="32" rx="3" fill="#18181C" stroke="#3DD6C3" />
        <text x="405" y="21" font-family="monospace" font-size="13" fill="#3DD6C3" text-anchor="middle">LangChain</text>

        <rect x="472" y="0" width="70" height="32" rx="3" fill="#18181C" stroke="#FF7A66" />
        <text x="507" y="21" font-family="monospace" font-size="13" fill="#FF7A66" text-anchor="middle">MCP</text>
      </g>

      <!-- Location / URL -->
      <text x="70" y="550" font-family="monospace" font-size="14" fill="#736F68">Pune District, Maharashtra, India • akshaypakade.dev</text>
    </svg>
  `)

  await ogCanvas
    .composite([
      { input: photoForOg, top: 85, left: 680 },
      { input: svgOverlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.resolve(process.cwd(), 'public/og-image.jpg'))

  console.log('✓ Multi-colour og-image.jpg generated (1200x630)')
}

processImages().catch(console.error)

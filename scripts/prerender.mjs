import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer-core'

const routes = [
  { urlPath: '/', outFile: 'index.html' },
  { urlPath: '/resume', outFile: 'resume/index.html' },
  { urlPath: '/privacy', outFile: 'privacy/index.html' },
  { urlPath: '/terms', outFile: 'terms/index.html' },
  { urlPath: '/404', outFile: '404.html' },
]

const paths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const exe = paths.find((p) => fs.existsSync(p))

if (!exe) {
  console.warn('[PRERENDER] No Chrome/Edge binary found, skipping static HTML snapshot step.')
  process.exit(0)
}

const distDir = path.join(process.cwd(), 'dist')
if (!fs.existsSync(distDir)) {
  console.error('[PRERENDER] dist folder does not exist! Run vite build first.')
  process.exit(1)
}

// Start a lightweight http-server or preview
import http from 'http'

// Simple static server for dist folder
function createStaticServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.xml': 'application/xml',
  }

  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0]
    let filePath = path.join(distDir, reqUrl)

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }

    if (!fs.existsSync(filePath)) {
      // SPA fallback
      filePath = path.join(distDir, 'index.html')
    }

    const ext = path.extname(filePath)
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    try {
      const data = fs.readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })

  return server
}

async function prerender() {
  const server = createStaticServer()
  await new Promise((resolve) => server.listen(4174, resolve))
  console.log('[PRERENDER] Local static snapshot server listening on http://localhost:4174')

  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const route of routes) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })

    const targetUrl = `http://localhost:4174${route.urlPath}`
    console.log(`[PRERENDER] Capturing ${targetUrl} -> dist/${route.outFile}`)

    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 400))

    const html = await page.content()
    const outFilePath = path.join(distDir, route.outFile)
    const outDir = path.dirname(outFilePath)

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }

    fs.writeFileSync(outFilePath, html, 'utf-8')
    await page.close()
  }

  await browser.close()
  server.close()
  console.log('[PRERENDER] All static routes prerendered successfully!')
}

prerender().catch((err) => {
  console.error('[PRERENDER ERROR]:', err)
  process.exit(1)
})

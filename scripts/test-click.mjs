import puppeteer from 'puppeteer-core'
import fs from 'fs'

const paths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
]
const exe = paths.find(p => fs.existsSync(p))

async function run() {
  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })

  const tests = [
    { name: 'nav-about', sel: 'nav a[href="#about"]' },
    { name: 'nav-resume-btn', sel: '#nav-resume-btn' },
    { name: 'theme-toggle-btn', sel: '#theme-toggle-btn' },
    { name: 'hero-view-projects', sel: '#hero a[href="#projects"]' },
    { name: 'hero-download-resume', sel: '#hero-download-resume' },
    { name: 'filter-tabs', sel: '#projects button' },
    { name: 'project-card', sel: '[data-cursor-project="true"]' },
    { name: 'contact-submit-btn', sel: '#contact-submit-btn' },
    { name: 'footer-back-to-top', sel: 'footer button[aria-label="Back to top"]' }
  ]

  const results = []
  for (const t of tests) {
    const res = await page.evaluate(async (sel, name) => {
      const el = document.querySelector(sel)
      if (!el) return { name, status: 'NOT FOUND' }
      el.scrollIntoView({ behavior: 'instant', block: 'center' })
      await new Promise(r => setTimeout(r, 50))
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const topEl = document.elementFromPoint(cx, cy)
      return {
        name,
        targetMatches: el.contains(topEl) || topEl === el,
        topElTag: topEl ? topEl.tagName : null,
        topElClass: topEl ? topEl.className : null,
        topElOuter: topEl ? topEl.outerHTML.substring(0, 100) : null
      }
    }, t.sel, t.name)
    results.push(res)
  }

  console.log('ALL RESULTS:', JSON.stringify(results, null, 2))
  await browser.close()
}

run()

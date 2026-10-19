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

  // Test anchor scroll
  const scrollResult = await page.evaluate(async () => {
    const aboutLink = document.querySelector('nav a[href="#about"]')
    if (aboutLink) aboutLink.click()
    await new Promise(r => setTimeout(r, 600))
    const aboutEl = document.querySelector('#about')
    const aboutRect = aboutEl.getBoundingClientRect()
    return {
      scrollY: window.scrollY,
      aboutTop: aboutRect.top
    }
  })

  console.log('SCROLL RESULT ON ANCHOR CLICK:', scrollResult)
  await browser.close()
}

run()

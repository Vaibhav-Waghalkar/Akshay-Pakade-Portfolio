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

  const info = await page.evaluate(() => {
    const el = document.querySelector('#projects button')
    if (!el) return { found: false }
    const rectBefore = {
      top: el.getBoundingClientRect().top,
      bottom: el.getBoundingClientRect().bottom,
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().right
    }
    el.scrollIntoView()
    const rectAfter = {
      top: el.getBoundingClientRect().top,
      bottom: el.getBoundingClientRect().bottom,
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().right
    }
    return {
      found: true,
      rectBefore,
      rectAfter,
      scrollY: window.scrollY
    }
  })

  console.log('INFO:', JSON.stringify(info, null, 2))
  await browser.close()
}

run()

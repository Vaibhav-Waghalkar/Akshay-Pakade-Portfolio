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

  const details = await page.evaluate(() => {
    const root = document.getElementById('root')
    const wrapper = root ? root.firstElementChild : null
    const computedRoot = root ? window.getComputedStyle(root).pointerEvents : null
    const computedWrapper = wrapper ? window.getComputedStyle(wrapper).pointerEvents : null
    const navBtn = document.querySelector('#theme-toggle-btn')
    const rect = navBtn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const topEl = document.elementFromPoint(cx, cy)
    const elementsAtPoint = document.elementsFromPoint(cx, cy)

    return {
      computedRoot,
      computedWrapper,
      wrapperClasses: wrapper ? wrapper.className : null,
      topEl: topEl ? { tag: topEl.tagName, id: topEl.id, class: topEl.className } : null,
      stack: elementsAtPoint.map(el => ({ tag: el.tagName, id: el.id, class: el.className, pointerEvents: window.getComputedStyle(el).pointerEvents }))
    }
  })

  console.log('DETAILS:', JSON.stringify(details, null, 2))
  await browser.close()
}

run()

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
  const navPage = await browser.newPage()
  await navPage.setViewport({ width: 1280, height: 800 })

  await navPage.goto('http://localhost:5173/privacy', { waitUntil: 'networkidle0' })
  await navPage.goto('http://localhost:5173/#projects', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1200))

  const debug = await navPage.evaluate(() => {
    const proj = document.querySelector('#projects')
    return {
      scrollY: window.scrollY,
      hash: window.location.hash,
      pathname: window.location.pathname,
      projTop: proj ? proj.getBoundingClientRect().top : null,
      offset: proj ? proj.offsetTop : null
    }
  })

  console.log('DEBUG HASH SCROLL:', debug)
  await browser.close()
}

run()

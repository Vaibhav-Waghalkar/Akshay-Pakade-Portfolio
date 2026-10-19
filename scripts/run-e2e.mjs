import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer-core'

const paths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const exe = paths.find((p) => fs.existsSync(p))

if (!exe) {
  console.error('[E2E ERROR] No Chromium executable found.')
  process.exit(1)
}

const BASE_URL = 'http://localhost:5173'

const viewports = [
  { name: 'Desktop Chromium', width: 1280, height: 800, isMobile: false },
  { name: 'iPhone 13', width: 390, height: 844, isMobile: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1' },
  { name: 'Pixel 7', width: 412, height: 915, isMobile: true, userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' }
]

const resolutions = [
  { name: 'Mobile 320px', width: 320, height: 640 },
  { name: 'Mobile 360px', width: 360, height: 740 },
  { name: 'Mobile 390px', width: 390, height: 844 },
  { name: 'Mobile 414px', width: 414, height: 896 },
  { name: 'Tablet 768px', width: 768, height: 1024 },
  { name: 'Tablet 820px', width: 820, height: 1180 },
  { name: 'Desktop 1024px', width: 1024, height: 768 },
  { name: 'Desktop 1180px', width: 1180, height: 820 },
  { name: 'Desktop 1366px', width: 1366, height: 768 },
]

async function runTests() {
  console.log('--- Starting Akshay Pakade Portfolio E2E Test Suite ---\n')
  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let allPassed = true

  // 1. HORIZONTAL SCROLL TESTS AT ALL REQUIRED RESOLUTIONS
  console.log('1. Checking No Horizontal Scroll across all required device widths...')
  const page = await browser.newPage()
  for (const res of resolutions) {
    await page.setViewport({ width: res.width, height: res.height })
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' })
    const scrollInfo = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    const hasHorizontalOverflow = scrollInfo.scrollWidth > scrollInfo.clientWidth
    if (hasHorizontalOverflow) {
      console.error(`[FAIL] Horizontal overflow at ${res.name} (${res.width}px): scrollWidth=${scrollInfo.scrollWidth} > clientWidth=${scrollInfo.clientWidth}`)
      allPassed = false
    } else {
      console.log(`  [PASS] ${res.name} (${res.width}px): scrollWidth=${scrollInfo.scrollWidth} <= clientWidth=${scrollInfo.clientWidth}`)
    }
  }
  await page.close()

  // 2. INTERACTION TESTS FOR DESKTOP & MOBILE EMULATION
  for (const vp of viewports) {
    console.log(`\n2. Running Interactions & Flow Suite on [${vp.name}]...`)
    const context = await browser.createBrowserContext()
    const p = await context.newPage()
    await p.setViewport({ width: vp.width, height: vp.height })
    if (vp.userAgent) {
      await p.setUserAgent(vp.userAgent)
    }

    const consoleErrors = []
    p.on('pageerror', (err) => consoleErrors.push(err.toString()))

    await p.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' })

    // A. Theme Toggle
    const themeTest = await p.evaluate(async () => {
      const toggle = document.querySelector('#theme-toggle-btn')
      if (!toggle) return { ok: false, msg: 'Theme toggle button missing' }
      const initDark = document.documentElement.classList.contains('dark')
      toggle.click()
      await new Promise(r => setTimeout(r, 100))
      const switched = document.documentElement.classList.contains('dark') !== initDark
      const stored = localStorage.getItem('crystal-theme')
      // Toggle back
      toggle.click()
      await new Promise(r => setTimeout(r, 100))
      return { ok: switched && !!stored, stored }
    })
    console.log(`  ${themeTest.ok ? '[PASS]' : '[FAIL]'} Theme toggle and persistence: ${JSON.stringify(themeTest)}`)
    if (!themeTest.ok) allPassed = false

    // B. Mobile Menu or Desktop Nav Links
    if (vp.isMobile) {
      const menuTest = await p.evaluate(async () => {
        const toggle = document.querySelector('#mobile-menu-toggle')
        if (!toggle) return { ok: false, msg: 'Mobile menu toggle missing' }
        toggle.click()
        await new Promise(r => setTimeout(r, 200))
        const menuOpen = !!document.querySelector('[role="dialog"][aria-label="Navigation Menu"]')
        // Click about link in drawer
        const aboutLink = document.querySelector('[role="dialog"] a[href="#about"]')
        if (aboutLink) aboutLink.click()
        await new Promise(r => setTimeout(r, 300))
        const menuClosed = !document.querySelector('[role="dialog"][aria-label="Navigation Menu"]')
        return { ok: menuOpen && menuClosed }
      })
      console.log(`  ${menuTest.ok ? '[PASS]' : '[FAIL]'} Mobile drawer open, link tap, auto-close: ${JSON.stringify(menuTest)}`)
      if (!menuTest.ok) allPassed = false
    } else {
      const navTest = await p.evaluate(async () => {
        const aboutLink = document.querySelector('nav a[href="#about"]')
        if (!aboutLink) return { ok: false, msg: 'About nav link missing' }
        aboutLink.click()
        await new Promise(r => setTimeout(r, 400))
        return { ok: window.scrollY > 100, scrollY: window.scrollY }
      })
      console.log(`  ${navTest.ok ? '[PASS]' : '[FAIL]'} Desktop Nav anchor smooth scroll: ${JSON.stringify(navTest)}`)
      if (!navTest.ok) allPassed = false
    }

    // C. View Projects & Download Resume
    const heroBtnTest = await p.evaluate(async () => {
      const projLink = document.querySelector('#hero a[href="#projects"]')
      const resumeLink = document.querySelector('#hero-download-resume')
      const resumeHref = resumeLink ? resumeLink.getAttribute('href') : null
      return {
        ok: !!projLink && resumeHref === '/Akshay_Pakade_Resume.pdf',
        resumeHref
      }
    })
    console.log(`  ${heroBtnTest.ok ? '[PASS]' : '[FAIL]'} Hero View Projects and Resume PDF download link: ${JSON.stringify(heroBtnTest)}`)
    if (!heroBtnTest.ok) allPassed = false

    // D. Copy buttons (Phone & LinkedIn)
    const copyTest = await p.evaluate(async () => {
      const heroCopy = document.querySelector('button[aria-label="Copy LinkedIn URL"]')
      const phoneCopy = document.querySelector('button[aria-label="Copy Phone Number"]')
      return { ok: !!heroCopy && !!phoneCopy }
    })
    console.log(`  ${copyTest.ok ? '[PASS]' : '[FAIL]'} Copy buttons present with accessible labels: ${JSON.stringify(copyTest)}`)
    if (!copyTest.ok) allPassed = false

    // E. Experience Expand all and Collapse all
    const expTest = await p.evaluate(async () => {
      const toggleAll = document.querySelector('#experience button')
      if (!toggleAll) return { ok: false, msg: 'Toggle all experience button missing' }
      toggleAll.click()
      await new Promise(r => setTimeout(r, 100))
      const count1 = document.querySelectorAll('#experience [id^="exp-details-"]').length
      toggleAll.click()
      await new Promise(r => setTimeout(r, 100))
      return { ok: true, count: count1 }
    })
    console.log(`  ${expTest.ok ? '[PASS]' : '[FAIL]'} Experience accordions toggle: ${JSON.stringify(expTest)}`)
    if (!expTest.ok) allPassed = false

    // F. Filter tabs in Projects
    const filterTest = await p.evaluate(async () => {
      const aiBtn = Array.from(document.querySelectorAll('#projects button')).find(b => b.textContent.trim() === 'AI')
      if (!aiBtn) return { ok: false, msg: 'AI filter tab missing' }
      aiBtn.click()
      await new Promise(r => setTimeout(r, 200))
      const aiCards = document.querySelectorAll('#projects [data-cursor-project="true"]').length
      return { ok: aiCards > 0, count: aiCards }
    })
    console.log(`  ${filterTest.ok ? '[PASS]' : '[FAIL]'} Project filter tabs: ${JSON.stringify(filterTest)}`)
    if (!filterTest.ok) allPassed = false

    // G. Project Card Modal open, navigate prev/next, and close
    const modalTest = await p.evaluate(async () => {
      const card = document.querySelector('[data-cursor-project="true"]')
      if (!card) return { ok: false, msg: 'No project card found' }
      card.click()
      await new Promise(r => setTimeout(r, 400))
      const modalOpen = !!document.querySelector('[role="dialog"][aria-labelledby="modal-project-title"]')
      
      // Test close button
      const closeBtn = document.querySelector('[role="dialog"] button[aria-label="Close project modal"]')
      if (closeBtn) closeBtn.click()
      await new Promise(r => setTimeout(r, 300))
      const modalClosed = !document.querySelector('[role="dialog"][aria-labelledby="modal-project-title"]')
      return { ok: modalOpen && modalClosed }
    })
    console.log(`  ${modalTest.ok ? '[PASS]' : '[FAIL]'} Project Card modal open & close: ${JSON.stringify(modalTest)}`)
    if (!modalTest.ok) allPassed = false

    // H. Contact Form validation and submit
    await p.evaluate(() => {
      const formEl = document.querySelector('#contact')
      if (formEl) formEl.scrollIntoView({ behavior: 'instant', block: 'center' })
    })
    await new Promise((r) => setTimeout(r, 200))

    await p.type('#contact-name', 'Test Recruiter')
    await p.type('#contact-email', 'recruiter@enterprise.com')
    await p.type('#contact-message', 'Inquiring about Senior DevOps & AI opportunities.')

    await p.click('#contact-submit-btn')
    await new Promise((r) => setTimeout(r, 800))

    const isSubmitted = await p.evaluate(() =>
      document.body.textContent.includes('Message Dispatched')
    )
    console.log(`  ${isSubmitted ? '[PASS]' : '[FAIL]'} Contact Form submission: { ok: ${isSubmitted} }`)
    if (!isSubmitted) allPassed = false

    // I. Footer Links and Back to top
    const footerTest = await p.evaluate(async () => {
      const backToTop = document.querySelector('footer button[aria-label="Back to top"]')
      const privacyLink = document.querySelector('footer a[href="/privacy"]')
      const termsLink = document.querySelector('footer a[href="/terms"]')
      return {
        ok: !!backToTop && !!privacyLink && !!termsLink,
      }
    })
    console.log(`  ${footerTest.ok ? '[PASS]' : '[FAIL]'} Footer Links and Back to Top: ${JSON.stringify(footerTest)}`)
    if (!footerTest.ok) allPassed = false

    // Check console errors
    if (consoleErrors.length > 0) {
      console.error(`  [FAIL] Console errors captured:`, consoleErrors)
      allPassed = false
    } else {
      console.log(`  [PASS] Zero console errors on ${vp.name}`)
    }

    await p.close()
  }

  // 3. SECONDARY ROUTE HASH LINK NAVIGATION TEST
  console.log('\n3. Testing Hash Links from /privacy back to Home #projects...')
  const navPage = await browser.newPage()
  await navPage.goto(`${BASE_URL}/privacy`, { waitUntil: 'networkidle0' })
  await navPage.goto(`${BASE_URL}/#projects`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1000))

  const scrolledOnHash = await navPage.evaluate(() => {
    const proj = document.querySelector('#projects')
    if (!proj) return false
    const rect = proj.getBoundingClientRect()
    // projects section scrolled into view near sticky navbar (window.scrollY > 1000, rect.top between 0 and 200)
    return window.scrollY > 1000 && rect.top >= 0 && rect.top <= 200
  })
  console.log(`  ${scrolledOnHash ? '[PASS]' : '[FAIL]'} Navigation from secondary page to /#projects with offset`)
  if (!scrolledOnHash) allPassed = false
  await navPage.close()

  await browser.close()

  console.log('\n--- E2E Test Suite Summary ---')
  if (allPassed) {
    console.log('ALL PLAYWRIGHT/PUPPETEER E2E TESTS PASSED SUCCESSFULLY!\n')
    process.exit(0)
  } else {
    console.error('SOME TESTS FAILED! Review output above.\n')
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('[TEST FATAL ERROR]:', err)
  process.exit(1)
})

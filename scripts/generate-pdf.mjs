import puppeteer from 'puppeteer-core'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUTPUT_PDF = path.resolve(process.cwd(), 'public', 'Akshay_Pakade_Resume.pdf')
const PORT = 4173

async function generateResumePdf() {
  console.log('Building preview distribution...')
  
  // Start vite preview server
  const previewProcess = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    shell: true,
    stdio: 'pipe',
  })

  // Give preview a moment to start
  await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    console.log(`Connecting Chrome at: ${CHROME_PATH}`)
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}/resume`, {
      waitUntil: 'networkidle0',
    })

    // Set A4 print layout
    await page.emulateMediaType('print')

    console.log(`Generating PDF to ${OUTPUT_PDF}...`)
    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        right: '15mm',
        bottom: '12mm',
        left: '15mm',
      },
    })

    await browser.close()
    console.log('Resume PDF successfully built!')
  } catch (err) {
    console.error('Error generating PDF:', err)
  } finally {
    // Kill the preview server
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(previewProcess.pid), '/f', '/t'])
    } else {
      previewProcess.kill()
    }
  }
}

generateResumePdf()

import fs from 'fs'
import path from 'path'

const FORBIDDEN_PATTERNS = [
  { name: 'Em Dash (—)', regex: /—/ },
  { name: 'En Dash (–)', regex: /–/ },
  { name: 'Emoji', regex: /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u },
  { name: 'Lorem Ipsum', regex: /lorem\s+ipsum/i },
  { name: 'TODO Marker', regex: /\bTODO\b/ },
  { name: 'LinkedIn URN (urn:li)', regex: /urn:li/i },
]

const TARGET_EXTENSIONS = ['.ts', '.tsx', '.html', '.css', '.json']
const IGNORED_DIRS = ['node_modules', 'dist', '.git']

let hasErrors = false

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  FORBIDDEN_PATTERNS.forEach(({ name, regex }) => {
    if (regex.test(content)) {
      console.error(`[CHECK FAILURE] ${name} found in: ${filePath}`)
      hasErrors = true
    }
  })
}

function traverse(dir) {
  const files = fs.readdirSync(dir)
  for (const f of files) {
    if (IGNORED_DIRS.includes(f)) continue
    const fullPath = path.join(dir, f)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      traverse(fullPath)
    } else if (TARGET_EXTENSIONS.includes(path.extname(fullPath))) {
      // Don't flag check script itself
      if (f === 'check-integrity.mjs') continue
      scanFile(fullPath)
    }
  }
}

console.log('Running code integrity checks for emoji, em dashes, lorem ipsum, TODOs, and urn:li...')
traverse(process.cwd())

if (hasErrors) {
  console.error('\nCode check failed with forbidden patterns!')
  process.exit(1)
} else {
  console.log('\nAll source files passed integrity check successfully!')
}

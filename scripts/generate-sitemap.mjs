import fs from 'fs'
import path from 'path'

const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://akshaypakade.dev'
const TODAY = new Date().toISOString().split('T')[0]

const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/resume', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapXml)
fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robotsTxt)

// Also ensure dist gets updated if dist exists
const distDir = path.join(process.cwd(), 'dist')
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml)
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt)
}

console.log(`Generated sitemap.xml and robots.txt using SITE_URL: ${SITE_URL}`)

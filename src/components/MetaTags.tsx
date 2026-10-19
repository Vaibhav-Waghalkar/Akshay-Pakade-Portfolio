import { useEffect } from 'react'
import { SITE_URL } from '../config/site'

interface MetaTagsProps {
  title: string
  description: string
  canonicalPath?: string
  noindex?: boolean
  ogType?: 'website' | 'profile' | 'article'
}

export function MetaTags({
  title,
  description,
  canonicalPath = '',
  noindex = false,
  ogType = 'website',
}: MetaTagsProps) {
  useEffect(() => {
    // Title
    document.title = title

    // Update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')

    // OpenGraph
    const canonicalUrl = `${SITE_URL}${canonicalPath}`
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:type', ogType, true)
    setMeta('og:url', canonicalUrl, true)
    setMeta('og:site_name', 'Akshay Pakade Portfolio', true)
    setMeta('og:locale', 'en_IN', true)
    setMeta('og:image', `${SITE_URL}/og-image.jpg`, true)
    setMeta('og:image:width', '1200', true)
    setMeta('og:image:height', '630', true)
    setMeta('og:image:alt', 'Akshay Pakade - Senior DevOps Engineer and Agentic AI Specialist in Pune', true)

    // Twitter
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', `${SITE_URL}/og-image.jpg`)
    setMeta('twitter:image:alt', 'Akshay Pakade - Senior DevOps Engineer and Agentic AI Specialist in Pune')

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [title, description, canonicalPath, noindex, ogType])

  return null
}

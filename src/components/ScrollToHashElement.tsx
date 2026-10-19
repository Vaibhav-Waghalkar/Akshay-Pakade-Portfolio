import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from './LenisContext'

export function ScrollToHashElement() {
  const location = useLocation()
  const { scrollTo } = useLenis()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      let attempts = 0
      const maxAttempts = 15

      const tryScroll = () => {
        const element = document.getElementById(id)
        if (element) {
          scrollTo(element, -80)
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(tryScroll, 60)
        }
      }

      // Small initial delay for route change
      const timer = setTimeout(tryScroll, 120)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash, scrollTo])

  return null
}

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { HomePage } from './pages/HomePage'
import { ResumePage } from './pages/ResumePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  const location = useLocation()
  const isResume = location.pathname === '/resume'

  // Initialize Lenis Smooth Scroll (disabled on reduced motion)
  useEffect(() => {
    if (isResume) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [isResume])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen grain-overlay">
      {/* Interactive Custom Cursor */}
      {!isResume && <CustomCursor />}

      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-teal)] focus:text-black focus:font-mono focus:text-xs focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {!isResume && <Navbar />}

      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isResume && <Footer />}
    </div>
  )
}

export default App

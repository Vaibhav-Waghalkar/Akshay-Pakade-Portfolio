import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ResumePage } from './pages/ResumePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  const location = useLocation()
  const isResume = location.pathname === '/resume'

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:font-mono focus:text-xs focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Navbar rendered on all pages except print-focused resume */}
      {!isResume && <Navbar />}

      {/* Main Landmark with semantic ID */}
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer rendered on all pages except print-focused resume */}
      {!isResume && <Footer />}
    </div>
  )
}

export default App

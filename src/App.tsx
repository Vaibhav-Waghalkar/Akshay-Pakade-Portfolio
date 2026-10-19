import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { LenisProvider } from './components/LenisContext'
import { ScrollToHashElement } from './components/ScrollToHashElement'
import { HomePage } from './pages/HomePage'
import { ResumePage } from './pages/ResumePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  const location = useLocation()
  const isResume = location.pathname === '/resume'

  return (
    <LenisProvider>
      <ScrollToHashElement />
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
    </LenisProvider>
  )
}

export default App

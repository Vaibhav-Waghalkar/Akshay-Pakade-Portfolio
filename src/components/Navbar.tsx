import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import { useLenis } from './LenisContext'
import { Moon, Sun, Menu, X, FileText } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { scrollTo, stop, start } = useLenis()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { name: 'About', id: 'about', href: isHomePage ? '#about' : '/#about' },
    { name: 'Experience', id: 'experience', href: isHomePage ? '#experience' : '/#experience' },
    { name: 'Projects', id: 'projects', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'Skills', id: 'skills', href: isHomePage ? '#skills' : '/#skills' },
    { name: 'Education', id: 'education', href: isHomePage ? '#education' : '/#education' },
    { name: 'Contact', id: 'contact', href: isHomePage ? '#contact' : '/#contact' },
  ]

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section highlight
  useEffect(() => {
    if (!isHomePage) return

    const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact']
    const observers: IntersectionObserver[] = []

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        const obs = new IntersectionObserver(observerCallback, {
          rootMargin: '-20% 0px -60% 0px',
        })
        obs.observe(el)
        observers.push(obs)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [isHomePage])

  // Mobile menu scroll lock and Lenis pause
  useEffect(() => {
    if (mobileMenuOpen) {
      stop()
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
        start()
      }
    }
  }, [mobileMenuOpen, stop, start])

  // Escape to close mobile menu & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        scrollTo(targetEl, -80)
      }
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[var(--border-line)] bg-[var(--nav-bg)] transition-colors duration-200">
      {/* Hairline Scroll Progress Bar with multi-colour gradient */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[var(--color-teal)] via-[var(--color-sky)] to-[var(--color-coral)] transition-all duration-75 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="content-container h-16 flex items-center justify-between">
        {/* Monogram Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[var(--color-sky)] min-h-[44px] py-1"
          aria-label="Akshay Pakade Portfolio Home"
        >
          <div className="w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-card)] flex items-center justify-center font-mono font-bold text-xs tracking-wider text-[var(--color-teal)] group-hover:border-[var(--color-teal)] transition-colors">
            AP
          </div>
          <span className="font-display font-bold text-base tracking-tight text-[var(--text-primary)]">
            Akshay Pakade
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav
          className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wide text-[var(--text-secondary)]"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors py-2 relative min-h-[44px] inline-flex items-center ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-sky)] rounded-full" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-mono font-medium border border-[var(--border-crystal)] hover:border-[var(--color-sky)] rounded-[3px] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all"
            id="nav-resume-btn"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--color-teal)]" />
            <span>Resume</span>
          </Link>

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'white' : 'dark'} theme`}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-[3px] border border-[var(--border-crystal)] hover:border-[var(--color-sky)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--color-amber)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--color-sky)]" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-10 h-10 min-w-[44px] min-h-[44px] rounded-[3px] border border-[var(--border-crystal)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-height glass sheet mobile drawer with focus management */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 top-16 z-50 bg-[var(--bg-primary)]/98 backdrop-blur-xl border-t border-[var(--border-line)] p-6 flex flex-col justify-between font-mono text-sm md:hidden animate-in fade-in duration-200 overflow-y-auto"
        >
          <div className="space-y-4">
            <div className="text-[11px] text-[var(--color-teal)] tracking-wider border-b border-[var(--border-line)] pb-2 font-semibold">
              NAVIGATION
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-3 px-1 text-base min-h-[44px] flex items-center transition-colors ${
                  activeSection === link.id
                    ? 'text-[var(--color-teal)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border-line)] space-y-3 pb-8">
            <Link
              to="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full min-h-[44px] text-xs font-mono"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary w-full min-h-[44px] text-xs font-mono cursor-pointer"
            >
              <span>Close Menu</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

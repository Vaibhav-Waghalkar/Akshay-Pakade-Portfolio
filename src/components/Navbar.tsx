import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import { Moon, Sun, Menu, X, FileText } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
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

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[var(--border-line)] bg-[var(--nav-bg)] transition-colors duration-200">
      {/* Hairline Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-steel)] transition-all duration-75 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="content-container h-16 flex items-center justify-between">
        {/* Monogram Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          aria-label="Akshay Pakade Portfolio Home"
        >
          <div className="w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-card)] flex items-center justify-center font-mono font-bold text-xs tracking-wider text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            AP
          </div>
          <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">
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
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)] rounded-full" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium border border-[var(--border-crystal)] hover:border-[var(--accent)] rounded-[3px] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all"
            id="nav-resume-btn"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Resume</span>
          </Link>

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'white' : 'dark'} theme`}
            className="w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] hover:border-[var(--accent)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent)]" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] flex items-center justify-center text-[var(--text-primary)]"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
          className="fixed inset-0 top-16 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border-line)] p-6 flex flex-col justify-between font-mono text-sm md:hidden animate-in fade-in duration-200"
        >
          <div className="space-y-4">
            <div className="text-[11px] text-[var(--accent)] tracking-wider border-b border-[var(--border-line)] pb-2">
              NAVIGATION
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base transition-colors ${
                  activeSection === link.id
                    ? 'text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border-line)] space-y-3">
            <Link
              to="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-xs font-mono"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary w-full text-xs font-mono"
            >
              <span>Close Menu</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

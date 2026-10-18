import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import { Moon, Sun, Menu, X, FileText } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const navLinks = [
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Experience', href: isHomePage ? '#experience' : '/#experience' },
    { name: 'Projects', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'Skills', href: isHomePage ? '#skills' : '/#skills' },
    { name: 'Education', href: isHomePage ? '#education' : '/#education' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[var(--border-line)] bg-[var(--nav-bg)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Monogram / Brand */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Akshay Pakade Home">
          <div className="w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-card)] flex items-center justify-center font-mono font-bold text-xs tracking-wider text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            AP
          </div>
          <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">
            Akshay Pakade
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wide text-[var(--text-secondary)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[var(--border-crystal)] hover:border-[var(--accent)] rounded-[3px] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all"
            id="nav-resume-btn"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Resume</span>
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] hover:border-[var(--accent)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent)]" />
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-8 h-8 rounded-[3px] border border-[var(--border-crystal)] flex items-center justify-center text-[var(--text-primary)]"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-line)] bg-[var(--nav-bg)] px-5 py-4 space-y-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[var(--border-line)]">
            <Link
              to="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 py-1.5 text-[var(--accent)] font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume Page</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

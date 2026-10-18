import React from 'react'
import { Link } from 'react-router-dom'
import { LinkedInIcon } from './LinkedInIcon'
import { ArrowUp, Download } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border-line)] py-12 bg-[var(--bg-primary)] transition-colors duration-200">
      <div className="content-container flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-muted)] font-mono">
        <div>
          <span>© {currentYear} Akshay Pakade. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://www.linkedin.com/in/akshay-pakade-8a34b0349/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            aria-label="Akshay Pakade LinkedIn"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="/Akshay_Pakade_Resume.pdf"
            download="Akshay_Pakade_Resume.pdf"
            className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </a>

          <Link to="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-[var(--text-primary)] transition-colors">
            Terms
          </Link>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

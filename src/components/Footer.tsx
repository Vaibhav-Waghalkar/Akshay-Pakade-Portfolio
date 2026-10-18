import React from 'react'
import { Link } from 'react-router-dom'
import { LinkedInIcon } from './LinkedInIcon'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-line)] py-12 bg-[var(--bg-primary)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-muted)] font-mono">
        <div>
          <span>© {currentYear} Akshay Pakade. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
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
          <Link to="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-[var(--text-primary)] transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}

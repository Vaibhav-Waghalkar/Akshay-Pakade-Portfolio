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
    <footer className="border-t border-[var(--border-line)] py-16 bg-[var(--bg-primary)] transition-colors duration-200">
      <div className="content-container space-y-10">
        {/* Large "Akshay Pakade" wordmark picking up gradient on hover */}
        <div className="border-b border-[var(--border-line)] pb-8">
          <Link
            to="/"
            className="group inline-block"
            aria-label="Akshay Pakade Home"
          >
            <span className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-[var(--text-primary)] transition-colors duration-300 group-hover:text-grad-tricolor">
              Akshay Pakade
            </span>
          </Link>
          <p className="text-xs sm:text-sm font-mono text-[var(--text-muted)] mt-2">
            Senior DevOps Engineer / Forward Deployed AI Systems
          </p>
        </div>

        {/* Bottom row links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[var(--text-muted)] font-mono">
          <div>
            <span>© {currentYear} Akshay Pakade. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.linkedin.com/in/akshay-pakade-8a34b0349/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--color-sky)] transition-colors"
              aria-label="Akshay Pakade LinkedIn"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="/Akshay_Pakade_Resume.pdf"
              download="Akshay_Pakade_Resume.pdf"
              className="flex items-center gap-1.5 hover:text-[var(--color-teal)] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume (PDF)</span>
            </a>

            <Link to="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[var(--text-primary)] transition-colors">
              Terms
            </Link>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[var(--color-sky)] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-sky)]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

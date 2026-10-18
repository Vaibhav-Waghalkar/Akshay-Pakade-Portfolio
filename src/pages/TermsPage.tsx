import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Scale } from 'lucide-react'

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      <div className="content-container space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent)]">
            <Scale className="w-4 h-4" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Last updated: October 2026
          </p>
        </div>

        <div className="crystal-card p-8 rounded-[3px] space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed max-w-[85ch]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">1. Purpose & Scope</h2>
            <p>
              This website serves as the professional portfolio of Akshay Pakade for presenting technical background, work experience, and engineering projects in Cloud Engineering, DevOps, and Agentic AI.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">2. Intellectual Property</h2>
            <p>
              The design, source code structure, and written content authored on this site are protected by applicable intellectual property rights. All company names, trademarks, and logos mentioned remain the property of their respective owners and are referenced solely for descriptive and historical career verification purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">3. Inquiries & Professional Contact</h2>
            <p>
              For recruitment, professional contracting, or engineering discussions, inquiries may be routed through the telephone line (+91 91728 15355) or via{' '}
              <a
                href="https://www.linkedin.com/in/akshay-pakade-8a34b0349/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                LinkedIn
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

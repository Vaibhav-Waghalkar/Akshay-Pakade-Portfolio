import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent)]">
            <Shield className="w-4 h-4" />
            <span>PRIVACY POLICY</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Last updated: October 2026
          </p>
        </div>

        <div className="crystal-card p-8 rounded-[3px] space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">1. Data Collection</h2>
            <p>
              This website is a static professional portfolio. We do not use tracking cookies, analytics trackers, or fingerprinting scripts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">2. Contact Form</h2>
            <p>
              If you submit the contact form, the details you enter (name, email, and message) are used solely to reply to your inquiry. We do not sell, rent, or distribute contact submissions to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">3. Local Storage</h2>
            <p>
              The site stores a single preference in your browser's local storage: <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 py-0.5 rounded border border-[var(--border-crystal)]">crystal-theme</code> (value: "dark" or "white"), used exclusively to persist your selected theme across reloads.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">4. Direct Contact</h2>
            <p>
              For any questions regarding privacy or data processing, please contact Akshay Pakade directly via{' '}
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

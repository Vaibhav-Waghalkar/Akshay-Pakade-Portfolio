import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

export const PrivacyPage: React.FC = () => {
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
            <Shield className="w-4 h-4" />
            <span>PRIVACY POLICY</span>
          </div>
          <h1 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Last updated: October 2026
          </p>
        </div>

        <div className="crystal-card p-8 rounded-[3px] space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed max-w-[85ch]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">1. Data Collection & Analytics</h2>
            <p>
              This website is a static professional portfolio. We do not use tracking cookies, analytics trackers, advertising beacons, or device fingerprinting scripts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">2. Public Contact Information</h2>
            <p>
              The direct telephone number (+91 91728 15355) and professional LinkedIn profile are displayed publicly on this website for employment, contracting, and technical networking inquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">3. Contact Inquiries</h2>
            <p>
              If a contact form endpoint is activated and you choose to submit information (such as your name, email, and message), that information is processed solely to respond to your direct inquiry. Contact details are never sold, rented, or distributed to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">4. Local Browser Storage</h2>
            <p>
              The site stores a single preference in your browser's local storage: <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 py-0.5 rounded border border-[var(--border-crystal)]">crystal-theme</code> (value: "dark" or "white"), used exclusively to persist your selected crystal theme across sessions without page flash.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">5. Communication</h2>
            <p>
              For any questions regarding privacy or data handling, you may connect with Akshay Pakade via phone (+91 91728 15355) or through{' '}
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

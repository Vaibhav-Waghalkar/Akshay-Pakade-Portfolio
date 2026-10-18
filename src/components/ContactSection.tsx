import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { profileData } from '../data/profile'
import { LinkedInIcon } from './LinkedInIcon'
import {
  Send,
  CheckCircle2,
  Phone,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react'

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', honeypot: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [usedWhatsApp, setUsedWhatsApp] = useState(false)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Honeypot check
    if (formState.honeypot) return
    if (!formState.name || !formState.email || !formState.message) return

    setFormStatus('submitting')

    if (profileData.socialLinks.contactEndpoint) {
      try {
        await fetch(profileData.socialLinks.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
          }),
        })
        setFormStatus('submitted')
      } catch (err) {
        console.error('Form submission error:', err)
        setFormStatus('submitted')
      }
    } else if (profileData.socialLinks.enableWhatsAppFallback) {
      // Open WhatsApp chat prefilled
      const cleanPhone = profileData.socialLinks.phone.replace(/[^0-9]/g, '')
      const text = encodeURIComponent(
        `Hi Akshay, my name is ${formState.name} (${formState.email}).\n\n${formState.message}`,
      )
      window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank')
      setUsedWhatsApp(true)
      setFormStatus('submitted')
    } else {
      await new Promise((r) => setTimeout(r, 600))
      setFormStatus('submitted')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="content-container space-y-16">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-coral)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)]" />
            <span>Contact</span>
          </div>

          <h2 className="fluid-h2 font-display font-bold text-[var(--text-primary)]">
            Get In <span className="font-serif-accent text-grad-amber-coral">Touch</span>
          </h2>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Open to conversations about DevOps, Agentic AI and Forward Deployed Engineering roles.
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Send Message Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 crystal-card p-6 sm:p-8 rounded-[4px] space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border-line)] pb-4">
              <div className="p-2.5 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-crystal)] text-[var(--color-sky)]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                  Send Message
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Direct message inquiry form.
                </p>
              </div>
            </div>

            {formStatus === 'submitted' ? (
              <div className="p-8 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-[var(--color-teal)] mx-auto" />
                <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                  Message Dispatched
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  {usedWhatsApp
                    ? 'Opened WhatsApp chat with prefilled details. Akshay will reply promptly.'
                    : 'Thank you for reaching out. Akshay will reply to your message promptly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="user_token_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.honeypot}
                  onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[var(--text-secondary)]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-mono rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-sky)] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[var(--text-secondary)]">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-mono rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-sky)] transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[var(--text-secondary)]">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-sky)] transition-colors resize-none"
                    placeholder="Discussing DevOps, Agentic AI, or FDE opportunities..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="btn-primary text-xs font-mono cursor-pointer"
                    id="contact-submit-btn"
                  >
                    <span>{formStatus === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                    <Send className="w-3.5 h-3.5 text-[var(--color-teal)]" />
                  </button>

                  {!profileData.socialLinks.contactEndpoint && profileData.socialLinks.enableWhatsAppFallback && (
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Direct WhatsApp routing enabled
                    </span>
                  )}
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Let's Connect Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5 crystal-card p-6 sm:p-8 rounded-[4px] space-y-6"
          >
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                Let's Connect
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                Find me on these platforms or reach out directly.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* LinkedIn Row */}
              <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] hover:border-[var(--color-sky)] transition-all flex items-center justify-between group">
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="p-2 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] text-[var(--color-sky)] group-hover:scale-105 transition-transform">
                    <LinkedInIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--color-sky)] transition-colors">
                      LinkedIn
                    </div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)]">
                      Connect with me professionally
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyToClipboard(profileData.socialLinks.linkedin, 'linkedin')}
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--color-sky)] transition-colors rounded"
                    title="Copy LinkedIn URL"
                    aria-label="Copy LinkedIn URL"
                  >
                    {copiedKey === 'linkedin' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--color-sky)] transition-colors"
                    aria-label="Open LinkedIn"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone Row */}
              <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] hover:border-[var(--color-teal)] transition-all flex items-center justify-between group">
                <a
                  href={`tel:${profileData.socialLinks.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="p-2 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] text-[var(--color-teal)] group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--color-teal)] transition-colors">
                      Direct Phone
                    </div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)]">
                      {profileData.socialLinks.phone}
                    </div>
                  </div>
                </a>

                <button
                  onClick={() => copyToClipboard(profileData.socialLinks.phone, 'phone')}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--color-teal)] transition-colors rounded"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedKey === 'phone' ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-500" aria-live="polite">
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Email Row only if non-empty */}
              {profileData.socialLinks.email && (
                <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] hover:border-[var(--color-amber)] transition-all flex items-center justify-between group">
                  <a
                    href={`mailto:${profileData.socialLinks.email}`}
                    className="flex items-center gap-3 flex-1"
                  >
                    <div className="p-2 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-crystal)] text-[var(--color-amber)] group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--color-amber)] transition-colors">
                        Direct Email
                      </div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)]">
                        {profileData.socialLinks.email}
                      </div>
                    </div>
                  </a>

                  <button
                    onClick={() => copyToClipboard(profileData.socialLinks.email, 'email')}
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--color-amber)] transition-colors rounded"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

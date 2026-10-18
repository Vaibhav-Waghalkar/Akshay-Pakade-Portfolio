import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { profileData } from '../data/profile'
import { ProjectDiagram } from '../components/ProjectDiagram'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Download,
  MapPin,
  Send,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  Workflow,
  Server,
  Activity,
  Award,
  Phone,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react'
import { LinkedInIcon } from '../components/LinkedInIcon'

// Subtle fade-up reveal configuration (max 280ms, once)
const revealMotion = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.28 },
}

// Low Quality Image Placeholder base64 for smooth hero image load
const LQIP_HERO =
  'data:image/webp;base64,UklGRmYAAABXRUJQVlA4TFkAAAAvCYAFAEbA/2/b9v3t/g/w3b//h//v/v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v//v8='

export const HomePage: React.FC = () => {
  // Experience timeline expand/collapse states
  const [expandedExperience, setExpandedExperience] = useState<Record<string, boolean>>({
    wipro: true, // First entry open by default
  })

  // Projects flow diagram toggle states
  const [openDiagrams, setOpenDiagrams] = useState<Record<string, boolean>>({})

  // Copy-to-clipboard state for phone and LinkedIn
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Contact form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')

  const toggleExperience = (id: string) => {
    setExpandedExperience((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleAllExperience = (expand: boolean) => {
    const next: Record<string, boolean> = {}
    profileData.experiences.forEach((exp) => {
      next[exp.id] = expand
    })
    setExpandedExperience(next)
  }

  const toggleDiagram = (id: string) => {
    setOpenDiagrams((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
    if (!formState.name || !formState.email || !formState.message) return
    setFormStatus('submitting')

    if (profileData.socialLinks.contactEndpoint) {
      try {
        await fetch(profileData.socialLinks.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        })
      } catch (err) {
        console.error('Contact error:', err)
      }
    } else {
      await new Promise((r) => setTimeout(r, 600))
    }
    setFormStatus('submitted')
  }

  const allExpanded = profileData.experiences.every((exp) => expandedExperience[exp.id])

  // Filter projects
  const aiProjects = profileData.projects.filter((p) => !p.isInfrastructure)
  const infraProjects = profileData.projects.filter((p) => p.isInfrastructure)

  return (
    <div className="min-h-screen relative">
      {/* Crystal Vertical Hairlines running page height on 1024px+ screens */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 pointer-events-none z-0"
        style={{
          left: 'max(20px, calc((100vw - 1680px) / 2 + 5vw))',
          width: '1px',
          background: 'var(--grid-line)',
        }}
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute top-0 bottom-0 pointer-events-none z-0"
        style={{
          right: 'max(20px, calc((100vw - 1680px) / 2 + 5vw))',
          width: '1px',
          background: 'var(--grid-line)',
        }}
        aria-hidden="true"
      />

      {/* 1. HERO SECTION (min-height 100svh minus nav, 12 col grid) */}
      <section
        id="hero"
        className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-center border-b border-[var(--border-line)] overflow-hidden py-12 md:py-16"
      >
        {/* Static faceted crystal pattern background (SVG, very low opacity) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150 L600 0 L1200 200 L1600 50" stroke="currentColor" strokeWidth="1" />
            <path d="M200 900 L800 650 L1400 850 L1600 600" stroke="currentColor" strokeWidth="1" />
            <path d="M600 0 L800 650" stroke="currentColor" strokeWidth="1" />
            <path d="M1200 200 L800 650" stroke="currentColor" strokeWidth="1" />
            <path d="M0 600 L400 400 L800 650 L1200 350 L1600 500" stroke="currentColor" strokeWidth="1" />
            <polygon points="400,400 800,650 1200,350" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </div>

        <div className="content-container relative z-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: 7 cols */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div {...revealMotion} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  FORWARD DEPLOYED AI & DEVOPS
                </div>

                <div className="pt-1">
                  <h1 className="fluid-h1 font-bold text-[var(--text-primary)] tracking-tight">
                    {profileData.name}
                  </h1>
                </div>

                <div className="pt-1">
                  <p className="text-base sm:text-lg font-mono text-[var(--accent-steel)] font-medium tracking-tight">
                    {profileData.titleLine}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              </motion.div>

              <motion.p
                {...revealMotion}
                className="fluid-body text-[var(--text-secondary)] leading-relaxed max-w-[70ch]"
              >
                {profileData.heroStatement}
              </motion.p>

              {/* Action Buttons */}
              <motion.div {...revealMotion} className="flex flex-wrap items-center gap-3 pt-2">
                <a href="#projects" className="btn-primary text-xs font-mono">
                  <span>View Projects</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="/Akshay_Pakade_Resume.pdf"
                  download="Akshay_Pakade_Resume.pdf"
                  className="btn-secondary text-xs font-mono"
                  id="hero-download-resume"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Download Resume</span>
                </a>

                <div className="flex items-center gap-1">
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[var(--accent)]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => copyToClipboard(profileData.socialLinks.linkedin, 'linkedin-hero')}
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] rounded transition-colors"
                    title="Copy LinkedIn URL"
                    aria-label="Copy LinkedIn URL"
                  >
                    {copiedKey === 'linkedin-hero' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Single Merged Compact Hero Tags Row */}
              <motion.div {...revealMotion} className="pt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[var(--text-muted)] mr-1">Focus:</span>
                {profileData.heroTags.map((tag) => (
                  <span key={tag} className="crystal-pill text-xs">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right Column: 5 cols (crisp real photo with srcset & picture element) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                {...revealMotion}
                className="relative p-2.5 rounded-[3px] bg-[var(--bg-card)] border border-[var(--border-crystal)] backdrop-blur-md shadow-2xl max-w-full"
              >
                {/* Thin light-catching edge highlight */}
                <div
                  className="absolute -top-[1px] -left-[1px] right-8 h-[2px] bg-gradient-to-r from-[var(--accent)] to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-[1px] -left-[1px] bottom-8 w-[2px] bg-gradient-to-b from-[var(--accent)] to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Faceted crop container - high resolution real photo, no upscale, centered */}
                <div
                  className="relative w-72 sm:w-88 md:w-96 lg:w-[460px] xl:w-[500px] aspect-[626/538] overflow-hidden bg-[var(--bg-surface)] crystal-facet-photo border border-[var(--border-crystal-highlight)]"
                  style={{
                    backgroundImage: `url(${LQIP_HERO})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/akshay-320.avif 320w, /images/akshay-480.avif 480w, /images/akshay-626.avif 626w"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 500px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/akshay-320.webp 320w, /images/akshay-480.webp 480w, /images/akshay-626.webp 626w"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 500px"
                    />
                    <img
                      src="/images/akshay-626.jpg"
                      srcSet="/images/akshay-320.jpg 320w, /images/akshay-480.jpg 480w, /images/akshay-626.jpg 626w"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 500px"
                      alt="Akshay Pakade - Senior DevOps Engineer and Agentic AI Specialist"
                      width={626}
                      height={538}
                      fetchPriority="high"
                      decoding="sync"
                      className="w-full h-full object-cover object-[50%_35%] transition-opacity duration-200"
                    />
                  </picture>
                </div>

                {/* Accurate updated caption */}
                <div className="mt-2.5 px-2 flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
                  <span>PUNE DISTRICT, MAHARASHTRA</span>
                  <span className="text-[var(--accent)] font-medium">6.5+ years experience</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-20 md:py-28 border-b border-[var(--border-line)] section-alt">
        <div className="content-container space-y-14">
          {/* Section Header with Refraction Hairline */}
          <motion.div {...revealMotion} className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider">01 / ABOUT</span>
              <div className="flex-1 crystal-divider" />
            </div>
            <h2 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
              Bridging Cloud Platforms with Production Agentic Systems
            </h2>
          </motion.div>

          {/* Left 7 cols: Intro paragraphs | Right 5 cols: At a glance panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div {...revealMotion} className="lg:col-span-7 space-y-4">
              {profileData.about.intro.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[70ch]">
                  {p}
                </p>
              ))}

              <div className="pt-4">
                <div className="p-5 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)]">
                  <p className="text-sm sm:text-base font-mono font-medium text-[var(--text-primary)]">
                    "{profileData.about.quote}"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right 5 cols: At a glance panel strictly from facts */}
            <motion.div {...revealMotion} className="lg:col-span-5 crystal-card p-6 rounded-[3px] space-y-4">
              <div className="text-xs font-mono text-[var(--accent)] border-b border-[var(--border-line)] pb-2 font-semibold">
                PROFILE AT A GLANCE
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Location:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{profileData.about.atAGlance.location}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Current Role:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{profileData.about.atAGlance.currentRole}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Experience:</span>
                  <span className="text-[var(--accent)] font-semibold">{profileData.about.atAGlance.experience}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Core Focus:</span>
                  <span className="text-[var(--text-primary)]">{profileData.about.atAGlance.focus}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Education:</span>
                  <span className="text-[var(--text-primary)]">{profileData.about.atAGlance.education}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Focus Blocks: 4 column grid on >=1280px, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
            {profileData.about.focusBlocks.map((block, idx) => {
              const icons = [
                <Cpu className="w-5 h-5 text-[var(--accent)]" />,
                <Workflow className="w-5 h-5 text-[var(--accent)]" />,
                <Layers className="w-5 h-5 text-[var(--accent)]" />,
                <Activity className="w-5 h-5 text-[var(--accent)]" />,
              ]
              return (
                <motion.div
                  key={block.id}
                  {...revealMotion}
                  className="crystal-card p-6 rounded-[3px] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="p-2.5 w-fit rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-crystal)]">
                      {icons[idx % icons.length]}
                    </div>
                    <h3 className="font-semibold text-base text-[var(--text-primary)]">
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {block.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION (2 column layout on 1024px+: 3 cols sticky left, 9 cols right) */}
      <section id="experience" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="content-container space-y-12">
          {/* Section Header with Refraction Hairline & Expand/Collapse All */}
          <motion.div {...revealMotion} className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider">02 / EXPERIENCE</span>
              <div className="flex-1 crystal-divider" />
              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  onClick={() => toggleAllExperience(!allExpanded)}
                  className="text-[var(--accent)] hover:underline cursor-pointer"
                  aria-label={allExpanded ? 'Collapse all experiences' : 'Expand all experiences'}
                >
                  {allExpanded ? 'Collapse all' : 'Expand all'}
                </button>
              </div>
            </div>
            <h2 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
              Professional Trajectory
            </h2>
          </motion.div>

          {/* Experience entries */}
          <div className="space-y-10">
            {profileData.experiences.map((exp) => {
              const isExpanded = !!expandedExperience[exp.id]
              return (
                <motion.div
                  key={exp.id}
                  {...revealMotion}
                  className="crystal-card p-6 sm:p-8 rounded-[3px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Sticky left 3 cols on desktop */}
                    <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-2">
                      <div className="text-xs font-mono text-[var(--accent)] font-semibold">
                        @{exp.company}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>{exp.period}</span>
                      </div>
                      {exp.duration && (
                        <div className="text-[11px] font-mono text-[var(--text-muted)]">
                          Duration: {exp.duration}
                        </div>
                      )}
                      <div className="text-xs font-mono text-[var(--text-secondary)]">
                        {exp.location}
                      </div>
                      <div className="inline-block px-2 py-0.5 text-[10px] font-mono rounded border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
                        {exp.workplaceType} • {exp.employmentType}
                      </div>
                    </div>

                    {/* Right 9 cols */}
                    <div className="lg:col-span-9 space-y-4">
                      <div
                        className="flex items-center justify-between gap-4 cursor-pointer select-none"
                        onClick={() => toggleExperience(exp.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleExperience(exp.id)
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-expanded={isExpanded}
                        aria-controls={`exp-details-${exp.id}`}
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                          {exp.role}
                        </h3>

                        <button
                          type="button"
                          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded"
                          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[var(--accent)]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div
                          id={`exp-details-${exp.id}`}
                          className="pt-2 border-t border-[var(--border-line)] space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed animate-in fade-in duration-200"
                        >
                          <p>{exp.description}</p>

                          <div className="pt-2">
                            <span className="text-xs font-mono text-[var(--text-muted)] block mb-2">
                              Technologies & Practices:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.stack.map((item) => (
                                <span key={item} className="crystal-pill text-[11px]">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION (12 col asymmetric grid: 7/5, 5/7, then 3 col infra cards) */}
      <section id="projects" className="py-20 md:py-28 border-b border-[var(--border-line)] section-alt">
        <div className="content-container space-y-14">
          <motion.div {...revealMotion} className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider">
                03 / FEATURED PROJECTS
              </span>
              <div className="flex-1 crystal-divider" />
            </div>
            <h2 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
              Agentic Systems & Platform Architectures
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-[70ch]">
              Production systems combining LLM reasoning, Model Context Protocol, and cloud infrastructure.
            </p>
          </motion.div>

          {/* 4 AI Project Cards in Alternating 7/5 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {aiProjects.map((proj, idx) => {
              // Alternating spans: 7/5, 5/7
              const colSpan =
                idx === 0
                  ? 'lg:col-span-7'
                  : idx === 1
                  ? 'lg:col-span-5'
                  : idx === 2
                  ? 'lg:col-span-5'
                  : 'lg:col-span-7'

              const isDiagramOpen = !!openDiagrams[proj.id]

              return (
                <motion.div
                  key={proj.id}
                  {...revealMotion}
                  className={`crystal-card p-6 sm:p-7 rounded-[3px] flex flex-col justify-between space-y-5 ${colSpan}`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-[var(--accent)] tracking-wider font-semibold">
                        {proj.association || 'ENGINEERING INITIATIVE'}
                      </span>
                      {proj.period && (
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">
                          {proj.period}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] font-medium">
                      {proj.summary}
                    </p>

                    <ul className="space-y-1.5 pt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      {proj.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Area: Diagram toggle + Tech tags */}
                  <div className="space-y-3 pt-3 border-t border-[var(--border-line)]">
                    {/* Collapsible Flow Diagram Button */}
                    <button
                      type="button"
                      onClick={() => toggleDiagram(proj.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline cursor-pointer"
                      aria-expanded={isDiagramOpen}
                    >
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isDiagramOpen ? 'rotate-90' : ''
                        }`}
                      />
                      <span>{isDiagramOpen ? 'Hide flow diagram' : 'View flow diagram'}</span>
                    </button>

                    {isDiagramOpen && <ProjectDiagram projectId={proj.id} />}

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.stack.map((tech) => (
                        <span key={tech} className="crystal-pill text-[11px]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Render repo/live links only if non-empty */}
                    {(proj.repoUrl || proj.liveUrl) && (
                      <div className="flex items-center gap-3 pt-2">
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs font-mono py-1 px-3"
                          >
                            <span>Repository</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs font-mono py-1 px-3"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Sub-label: Infrastructure Work */}
          <div className="pt-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
                INFRASTRUCTURE WORK
              </span>
              <div className="flex-1 h-[1px] bg-[var(--border-line)]" />
            </div>

            {/* 3 Infrastructure Cards in a 3 Column Row on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infraProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  {...revealMotion}
                  className="crystal-card p-6 rounded-[3px] flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-[var(--accent)] tracking-wider font-semibold block">
                      {proj.association}
                    </span>

                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      {proj.summary}
                    </p>

                    <ul className="space-y-1.5 pt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      {proj.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[var(--border-line)]">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((tech) => (
                        <span key={tech} className="crystal-pill text-[11px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKILLS SECTION (2 column grid of category rows on 1280px+) */}
      <section id="skills" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="content-container space-y-12">
          <motion.div {...revealMotion} className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider">04 / SKILLS</span>
              <div className="flex-1 crystal-divider" />
            </div>
            <h2 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
              Core Competencies & Toolchain
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-mono">
              Grouped technical capabilities without arbitrary percentages or progress bars.
            </p>
          </motion.div>

          {/* 2-column grid of category rows on 1280px+ */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {profileData.skills.map((group) => (
              <motion.div
                key={group.category}
                {...revealMotion}
                className="crystal-card p-6 rounded-[3px] flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
              >
                {/* Left aligned category label column with hairline divider */}
                <div className="sm:w-52 shrink-0 space-y-1 sm:border-r sm:border-[var(--border-line)] sm:pr-6">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--text-primary)] font-mono">
                      {group.category}
                    </h3>
                  </div>
                </div>

                {/* Right chips */}
                <div className="flex-1 flex flex-wrap gap-2 pt-1">
                  {group.skills.map((skill) => (
                    <span key={skill} className="crystal-pill text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EDUCATION & CREDENTIALS */}
      <section id="education" className="py-20 md:py-28 border-b border-[var(--border-line)] section-alt">
        <div className="content-container space-y-10">
          <motion.div {...revealMotion} className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider">
                05 / EDUCATION & CREDENTIALS
              </span>
              <div className="flex-1 crystal-divider" />
            </div>
            <h2 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
              Academic Background
            </h2>
          </motion.div>

          <motion.div {...revealMotion} className="crystal-card p-6 sm:p-8 rounded-[3px] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[var(--accent)] font-semibold">
                  UNDERGRADUATE DEGREE
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {profileData.education.degree}, {profileData.education.field}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {profileData.education.institution}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-line)] flex items-start gap-3">
              <Award className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
              <div className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
                <span className="font-semibold text-[var(--text-primary)]">Training: </span>
                {profileData.education.certificationNote}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-28">
        <div className="content-container space-y-12">
          <motion.div {...revealMotion} className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider">
                06 / GET IN TOUCH
              </span>
              <div className="flex-1 crystal-divider" />
            </div>
            <h2 className="fluid-h2 font-bold tracking-tight text-[var(--text-primary)]">
              Initiate a Conversation
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-[70ch]">
              Open to conversations about DevOps, Agentic AI and Forward Deployed Engineering roles.
            </p>
          </motion.div>

          {/* Contact layout: Clean direct rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div
              {...revealMotion}
              className={`${
                profileData.socialLinks.contactEndpoint ? 'lg:col-span-5' : 'lg:col-span-8'
              } crystal-card p-6 sm:p-8 rounded-[3px] space-y-6`}
            >
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Direct Channels</h3>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  Connect professionally or reach out directly.
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone row with tel: link and copy button */}
                <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] flex items-center justify-between group hover:border-[var(--accent)] transition-all">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[var(--accent)]" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Direct Phone</div>
                      <a
                        href={`tel:${profileData.socialLinks.phone.replace(/\s+/g, '')}`}
                        className="text-xs font-mono text-[var(--accent)] hover:underline"
                      >
                        {profileData.socialLinks.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(profileData.socialLinks.phone, 'phone')}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] rounded transition-colors"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedKey === 'phone' ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-500" aria-live="polite">
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn row with link and copy button */}
                <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] flex items-center justify-between group hover:border-[var(--accent)] transition-all">
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-5 h-5 text-[var(--accent)]" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">LinkedIn Profile</div>
                      <a
                        href={profileData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] hover:underline"
                      >
                        linkedin.com/in/akshay-pakade-8a34b0349
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard(profileData.socialLinks.linkedin, 'linkedin')}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] rounded transition-colors"
                      title="Copy LinkedIn URL"
                      aria-label="Copy LinkedIn URL"
                    >
                      {copiedKey === 'linkedin' ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-500" aria-live="polite">
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={profileData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                      aria-label="Open LinkedIn"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Email row rendered ONLY if non-empty */}
                {profileData.socialLinks.email && (
                  <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Email</div>
                      <a
                        href={`mailto:${profileData.socialLinks.email}`}
                        className="text-xs font-mono text-[var(--accent)] hover:underline"
                      >
                        {profileData.socialLinks.email}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(profileData.socialLinks.email, 'email')}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] rounded transition-colors"
                      aria-label="Copy Email"
                    >
                      {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Form rendered ONLY if contactEndpoint configured */}
            {profileData.socialLinks.contactEndpoint && (
              <motion.div
                {...revealMotion}
                className="lg:col-span-7 crystal-card p-6 sm:p-8 rounded-[3px] space-y-6"
              >
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">Send a Message</h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                    Direct inquiry form.
                  </p>
                </div>

                {formStatus === 'submitted' ? (
                  <div className="p-6 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] space-y-2 text-center">
                    <CheckCircle2 className="w-8 h-8 text-[var(--accent)] mx-auto" />
                    <h4 className="font-semibold text-sm text-[var(--text-primary)]">Message Received</h4>
                    <p className="text-xs text-[var(--text-secondary)] font-mono">
                      Thank you for reaching out. Akshay will reply shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-xs font-mono text-[var(--text-secondary)]">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs font-mono rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-mono text-[var(--text-secondary)]">
                          Work Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-3 py-2 text-xs font-mono rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-mono text-[var(--text-secondary)]">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        placeholder="Discussing DevOps, Agentic AI, or FDE opportunities..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="btn-primary text-xs font-mono w-full sm:w-auto"
                      id="contact-submit-btn"
                    >
                      <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

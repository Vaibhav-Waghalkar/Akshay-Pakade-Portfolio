import React, { useState } from 'react'
import { profileData } from '../data/profile'
import { FloatingCodeCards } from '../components/FloatingCodeCards'
import { ProjectsSection } from '../components/ProjectsSection'
import { ContactSection } from '../components/ContactSection'
import { MetaTags } from '../components/MetaTags'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Download,
  MapPin,
  Calendar,
  Layers,
  Cpu,
  Workflow,
  Server,
  Activity,
  Award,
  Copy,
  Check,
} from 'lucide-react'
import { LinkedInIcon } from '../components/LinkedInIcon'

// Slow tech marquee items
const MARQUEE_ITEMS = [
  'Microsoft Azure',
  'Kubernetes / AKS',
  'Terraform & IaC',
  'Model Context Protocol (MCP)',
  'LangChain & LangGraph',
  'FastAPI & Python',
  'Argo CD & GitOps',
  'Apache Kafka',
  'Qdrant Vector DB',
  'Prometheus & Grafana',
  'Docker & Helm',
  'CI/CD Pipelines',
]

export const HomePage: React.FC = () => {
  const [expandedExperience, setExpandedExperience] = useState<Record<string, boolean>>({
    wipro: true,
  })
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

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

  const allExpanded = profileData.experiences.every((exp) => expandedExperience[exp.id])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MetaTags
        title="Akshay Pakade | Senior DevOps Engineer, Agentic AI and FDE in Pune"
        description="Senior DevOps Engineer in Pune with 6.5+ years experience moving into Agentic AI, MCP and Forward Deployed Engineering. Wipro engineer building scalable systems."
        canonicalPath="/"
        ogType="profile"
      />
      {/* Background soft drifting light fields (3 large blurred colour fields, optimized for mobile) */}
      <div
        className="absolute top-10 left-[-10%] w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full bg-[var(--color-teal)] opacity-[0.06] dark:opacity-[0.09] blur-[60px] sm:blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 right-[-5%] w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-[var(--color-sky)] opacity-[0.06] dark:opacity-[0.09] blur-[70px] sm:blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[2000px] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[var(--color-amber)] opacity-[0.04] dark:opacity-[0.07] blur-[75px] sm:blur-[150px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-center border-b border-[var(--border-line)] py-12 md:py-20"
      >
        <div className="content-container relative z-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: 7 cols */}
            <div className="lg:col-span-7 space-y-6 flex flex-col">
              <div className="space-y-4 order-1">
                {/* Coloured dot + Plain text label */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-teal)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)]" />
                  <span>DevOps & Agentic AI Specialist</span>
                </div>

                <div className="space-y-2">
                  <h1 className="fluid-h1 font-display font-extrabold text-[var(--text-primary)] tracking-tight">
                    {profileData.name}
                  </h1>

                  {/* Headline split into two lines with gradient */}
                  <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-snug">
                    <span className="text-[var(--text-primary)]">Senior DevOps Engineer</span>
                    <span className="text-[var(--text-muted)] font-normal"> / </span>
                    <span className="text-grad-teal-sky">Agentic AI and FDE</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-sky)] shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[68ch] order-2">
                {profileData.heroStatement}
              </p>

              {/* Mobile photo placeholder (order-3 on mobile, hidden on lg where desktop right column shows it) */}
              <div className="lg:hidden order-3 py-2 flex justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 -m-4 rounded-[30px] bg-gradient-to-tr from-[var(--color-teal)]/20 via-[var(--color-sky)]/20 to-[var(--color-coral)]/20 blur-xl pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 w-64 sm:w-80 aspect-[626/538] overflow-hidden bg-[var(--bg-surface)] portrait-crop border border-white/20 shadow-xl">
                    <picture>
                      <source
                        type="image/avif"
                        srcSet="/images/akshay-320.avif 320w, /images/akshay-480.avif 480w, /images/akshay-626.avif 626w"
                        sizes="(max-width: 640px) 256px, 320px"
                      />
                      <source
                        type="image/webp"
                        srcSet="/images/akshay-320.webp 320w, /images/akshay-480.webp 480w, /images/akshay-626.webp 626w"
                        sizes="(max-width: 640px) 256px, 320px"
                      />
                      <img
                        src="/images/akshay-626.jpg"
                        srcSet="/images/akshay-320.jpg 320w, /images/akshay-480.jpg 480w, /images/akshay-626.jpg 626w"
                        sizes="(max-width: 640px) 256px, 320px"
                        alt="Akshay Pakade - Senior DevOps Engineer and Agentic AI Specialist"
                        width={626}
                        height={538}
                        fetchPriority="high"
                        decoding="sync"
                        className="w-full h-full object-cover object-[50%_35%]"
                      />
                    </picture>
                  </div>
                  <div className="mt-2 px-1 flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
                    <span>PUNE DISTRICT, MAHARASHTRA</span>
                    <span className="text-[var(--color-teal)] font-medium">6.5+ years exp</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (order-4 on mobile) */}
              <div className="flex flex-wrap items-center gap-3 pt-2 order-4">
                <a href="#projects" className="btn-primary text-xs font-mono min-h-[44px]">
                  <span>View Projects</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="/Akshay_Pakade_Resume.pdf"
                  download="Akshay_Pakade_Resume.pdf"
                  className="btn-secondary text-xs font-mono min-h-[44px]"
                  id="hero-download-resume"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                  <span>Download Resume</span>
                </a>

                <div className="flex items-center gap-1">
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[var(--color-sky)]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => copyToClipboard(profileData.socialLinks.linkedin, 'linkedin-hero')}
                    className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-sky)] rounded transition-colors cursor-pointer"
                    title="Copy LinkedIn URL"
                    aria-label="Copy LinkedIn URL"
                  >
                    {copiedKey === 'linkedin-hero' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tag Row (order-5 on mobile) */}
              <div className="pt-3 flex flex-wrap items-center gap-2 order-5">
                <span className="text-xs font-mono text-[var(--text-muted)] mr-1">Focus:</span>
                {profileData.heroTags.map((tag) => (
                  <span key={tag} className="crystal-pill text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: 5 cols with angled portrait & overlapping floating code cards (Desktop only, hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="relative">
                {/* Soft multi-colour glow behind portrait */}
                <div
                  className="absolute inset-0 -m-6 rounded-[40px] bg-gradient-to-tr from-[var(--color-teal)]/20 via-[var(--color-sky)]/20 to-[var(--color-coral)]/20 blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating Code Cards overlapping edges */}
                <FloatingCodeCards />

                {/* Single portrait shape with angled top-right & bottom-left corners */}
                <div className="relative z-10 w-72 sm:w-88 md:w-96 lg:w-[450px] aspect-[626/538] overflow-hidden bg-[var(--bg-surface)] portrait-crop border border-white/20 shadow-2xl">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/akshay-320.avif 320w, /images/akshay-480.avif 480w, /images/akshay-626.avif 626w"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 450px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/akshay-320.webp 320w, /images/akshay-480.webp 480w, /images/akshay-626.webp 626w"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 450px"
                    />
                    <img
                      src="/images/akshay-626.jpg"
                      srcSet="/images/akshay-320.jpg 320w, /images/akshay-480.jpg 480w, /images/akshay-626.jpg 626w"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 450px"
                      alt="Akshay Pakade - Senior DevOps Engineer and Agentic AI Specialist"
                      width={626}
                      height={538}
                      fetchPriority="high"
                      decoding="sync"
                      className="w-full h-full object-cover object-[50%_35%]"
                    />
                  </picture>
                </div>

                <div className="mt-3 px-2 flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
                  <span>PUNE DISTRICT, MAHARASHTRA</span>
                  <span className="text-[var(--color-teal)] font-medium">6.5+ years experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slow Marquee under hero (pauses on hover) */}
        <div className="w-full border-t border-[var(--border-line)] mt-12 pt-3 pb-3 overflow-hidden bg-[var(--bg-surface)]/60">
          <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-3"
              >
                <span>{item}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-sky)] opacity-50" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 border-b border-[var(--border-line)]">
        <div className="content-container space-y-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-teal)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)]" />
              <span>About</span>
            </div>

            <h2 className="fluid-h2 font-display font-bold text-[var(--text-primary)]">
              Cloud engineer, now building <span className="font-serif-accent text-grad-teal-sky">AI agents</span>
            </h2>
          </div>

          {/* Left 7 cols: Intro paragraphs | Right 5 cols: At a glance panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              {profileData.about.intro.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[70ch]">
                  {p}
                </p>
              ))}

              <div className="pt-4">
                <div className="p-5 rounded-[4px] border border-[var(--border-crystal)] bg-[var(--bg-surface)]">
                  <p className="text-sm sm:text-base font-mono font-medium text-[var(--text-primary)]">
                    "{profileData.about.quote}"
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 crystal-card p-6 sm:p-7 rounded-[4px] space-y-4">
              <div className="text-xs font-mono text-[var(--color-teal)] border-b border-[var(--border-line)] pb-2 font-semibold">
                Profile at a glance
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Location:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{profileData.about.atAGlance.location}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Current role:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{profileData.about.atAGlance.currentRole}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Experience:</span>
                  <span className="text-[var(--color-teal)] font-semibold">{profileData.about.atAGlance.experience}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Focus:</span>
                  <span className="text-[var(--text-primary)]">{profileData.about.atAGlance.focus}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[var(--text-muted)]">Education:</span>
                  <span className="text-[var(--text-primary)]">{profileData.about.atAGlance.education}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Focus Blocks with distinct token hues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
            {profileData.about.focusBlocks.map((block, idx) => {
              const cardThemes = [
                { color: 'var(--color-teal)', icon: <Cpu className="w-5 h-5 text-[var(--color-teal)]" /> },
                { color: 'var(--color-sky)', icon: <Workflow className="w-5 h-5 text-[var(--color-sky)]" /> },
                { color: 'var(--color-amber)', icon: <Layers className="w-5 h-5 text-[var(--color-amber)]" /> },
                { color: 'var(--color-coral)', icon: <Activity className="w-5 h-5 text-[var(--color-coral)]" /> },
              ]
              const theme = cardThemes[idx % cardThemes.length]

              return (
                <div
                  key={block.id}
                  className="crystal-card p-6 rounded-[4px] flex flex-col justify-between space-y-4 hover:border-[var(--color-teal)]"
                  style={{ borderTopColor: theme.color, borderTopWidth: '2px' }}
                >
                  <div className="space-y-3">
                    <div className="p-2.5 w-fit rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-crystal)]">
                      {theme.icon}
                    </div>
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {block.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section id="experience" className="py-24 md:py-32 border-b border-[var(--border-line)]">
        <div className="content-container space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-amber)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)]" />
                <span>Experience</span>
              </div>
              <h2 className="fluid-h2 font-display font-bold text-[var(--text-primary)]">
                Where I have <span className="font-serif-accent text-grad-amber-coral">worked</span>
              </h2>
            </div>

            <button
              onClick={() => toggleAllExperience(!allExpanded)}
              className="text-xs font-mono text-[var(--color-sky)] hover:underline cursor-pointer self-start sm:self-auto"
              aria-label={allExpanded ? 'Collapse all experiences' : 'Expand all experiences'}
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          {/* Experience entries with per-company colours */}
          <div className="space-y-8">
            {profileData.experiences.map((exp, idx) => {
              const companyColors = [
                'var(--color-teal)',
                'var(--color-sky)',
                'var(--color-amber)',
                'var(--color-coral)',
              ]
              const companyColor = companyColors[idx % companyColors.length]
              const isExpanded = !!expandedExperience[exp.id]

              return (
                <div
                  key={exp.id}
                  className="crystal-card p-6 sm:p-8 rounded-[4px]"
                  style={{ borderLeftColor: companyColor, borderLeftWidth: '3px' }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Sticky left 3 cols */}
                    <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-2">
                      <div
                        className="text-xs font-mono font-bold tracking-wide"
                        style={{ color: companyColor }}
                      >
                        @{exp.company}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                        <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: companyColor }} />
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
                        <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)]">
                          {exp.role}
                        </h3>

                        <button
                          type="button"
                          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded cursor-pointer"
                          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[var(--color-sky)]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div
                          id={`exp-details-${exp.id}`}
                          className="pt-2 border-t border-[var(--border-line)] space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          <p>{exp.description}</p>

                          <div className="pt-2">
                            <span className="text-xs font-mono text-[var(--text-muted)] block mb-2">
                              Technologies:
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
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <ProjectsSection />

      {/* 5. SKILLS SECTION */}
      <section id="skills" className="py-24 md:py-32 border-b border-[var(--border-line)]">
        <div className="content-container space-y-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-coral)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)]" />
              <span>Skills</span>
            </div>
            <h2 className="fluid-h2 font-display font-bold text-[var(--text-primary)]">
              Tools I work <span className="font-serif-accent text-grad-amber-coral">with</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-mono">
              Grouped technical capabilities across AI systems, cloud platforms, and DevOps automation.
            </p>
          </div>

          {/* 2-column grid with per-category hues */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {profileData.skills.map((group, idx) => {
              const catHues = [
                'var(--color-teal)',
                'var(--color-sky)',
                'var(--color-amber)',
                'var(--color-coral)',
                'var(--color-teal)',
                'var(--color-sky)',
                'var(--color-amber)',
              ]
              const catHue = catHues[idx % catHues.length]

              return (
                <div
                  key={group.category}
                  className="crystal-card p-6 rounded-[4px] flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
                >
                  <div className="sm:w-52 shrink-0 space-y-1 sm:border-r sm:border-[var(--border-line)] sm:pr-6">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 shrink-0" style={{ color: catHue }} />
                      <h3
                        className="text-xs sm:text-sm font-display font-bold tracking-wide"
                        style={{ color: catHue }}
                      >
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-wrap gap-2 pt-1">
                    {group.skills.map((skill) => (
                      <span key={skill} className="crystal-pill text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. EDUCATION SECTION */}
      <section id="education" className="py-24 md:py-32 border-b border-[var(--border-line)]">
        <div className="content-container space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-teal)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)]" />
              <span>Credentials</span>
            </div>
            <h2 className="fluid-h2 font-display font-bold text-[var(--text-primary)]">
              Education & <span className="font-serif-accent text-grad-teal-sky">Background</span>
            </h2>
          </div>

          <div className="space-y-4">
            {profileData.education.entries.map((edu, index) => {
              const yearsText = [edu.startYear, edu.endYear].filter(Boolean).join(' - ')
              const gradeText = edu.grade
                ? edu.gradeScale
                  ? `${edu.grade}/${edu.gradeScale}`
                  : edu.grade
                : null

              return (
                <div key={index} className="crystal-card p-6 sm:p-8 rounded-[4px] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                        {edu.degree}
                        {edu.field ? `, ${edu.field}` : ''}
                      </h3>
                      {edu.institution && (
                        <p className="text-sm text-[var(--text-secondary)]">
                          {edu.institution}
                        </p>
                      )}
                      {edu.board && (
                        <p className="text-xs text-[var(--text-muted)] font-mono">
                          Board: {edu.board}
                        </p>
                      )}
                    </div>

                    {gradeText && (
                      <div className="inline-flex items-center self-start px-2.5 py-1 text-xs font-mono rounded border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-[var(--color-teal)] font-semibold shrink-0">
                        {gradeText}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-line)]">
                    {edu.location && <span>{edu.location}</span>}
                    {yearsText && <span>{yearsText}</span>}
                  </div>
                </div>
              )
            })}

            <div className="crystal-card p-6 sm:p-8 rounded-[4px]">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[var(--color-amber)] shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--text-primary)]">Training: </span>
                  {profileData.education.certificationNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <ContactSection />
    </div>
  )
}

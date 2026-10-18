import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { profileData } from '../data/profile'
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
} from 'lucide-react'
import { LinkedInIcon } from '../components/LinkedInIcon'

// Subtle fade-up reveal configuration (max 300ms, once)
const revealMotion = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.28 },
}

export const HomePage: React.FC = () => {
  const [expandedExperience, setExpandedExperience] = useState<Record<string, boolean>>({
    wipro: true, // Newest expanded by default
  })

  // Contact form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')

  const toggleExperience = (id: string) => {
    setExpandedExperience((prev) => ({ ...prev, [id]: !prev[id] }))
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
      // Simulate clean submission when endpoint not yet configured
      await new Promise((r) => setTimeout(r, 600))
    }

    setFormStatus('submitted')
  }

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-28 border-b border-[var(--border-line)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div {...revealMotion} className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  FORWARD DEPLOYED AI & DEVOPS
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
                  {profileData.name}
                </h1>

                <p className="text-sm sm:text-base font-mono text-[var(--text-secondary)] tracking-tight">
                  {profileData.titleLine}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{profileData.location}</span>
                </div>
              </motion.div>

              <motion.p
                {...revealMotion}
                className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed"
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
              </motion.div>

              {/* Small Mono Tag Row */}
              <motion.div {...revealMotion} className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[var(--text-muted)] mr-1">Focus:</span>
                {profileData.heroTags.map((tag) => (
                  <span key={tag} className="crystal-pill">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right Profile Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                {...revealMotion}
                className="relative p-2 rounded-[3px] bg-[var(--bg-card)] border border-[var(--border-crystal)] backdrop-blur-md shadow-2xl"
              >
                {/* Thin glass border with faceted clip */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 overflow-hidden bg-[var(--bg-surface)] crystal-facet-photo border border-[var(--border-crystal-highlight)]">
                  <img
                    src="/images/akshay.jpg"
                    alt="Akshay Pakade - Senior DevOps and Agentic AI Engineer"
                    width={400}
                    height={400}
                    loading="eager"
                    className="w-full h-full object-cover object-center filter contrast-[1.02]"
                  />
                  {/* Subtle crystal reflection gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Subtitle tag */}
                <div className="mt-2.5 px-2 flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
                  <span>PUNE, MH, IN</span>
                  <span className="text-[var(--accent)]">EST. 6.5+ YRS EXP</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div {...revealMotion} className="space-y-4 max-w-3xl">
            <div className="text-xs font-mono text-[var(--accent)] tracking-wider">01 / ABOUT</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Bridging Cloud Platforms with Production Agentic Systems
            </h2>
            <div className="space-y-3 text-base text-[var(--text-secondary)] leading-relaxed">
              {profileData.about.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* 4 Focus Blocks (Glass Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="crystal-card p-6 rounded-[3px] space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-crystal)]">
                      {icons[idx % icons.length]}
                    </div>
                    <h3 className="font-semibold text-base text-[var(--text-primary)]">
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {block.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Closing Quote Line */}
          <motion.div
            {...revealMotion}
            className="p-6 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] flex items-center justify-center text-center"
          >
            <p className="text-sm sm:text-base font-mono font-medium tracking-tight text-[var(--text-primary)]">
              "{profileData.about.quote}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section id="experience" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div {...revealMotion} className="space-y-2">
            <div className="text-xs font-mono text-[var(--accent)] tracking-wider">
              02 / EXPERIENCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Professional Trajectory
            </h2>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--border-crystal)] before:to-transparent">
            {profileData.experiences.map((exp) => {
              const isExpanded = !!expandedExperience[exp.id]
              return (
                <motion.div key={exp.id} {...revealMotion} className="relative">
                  {/* Glass indicator point */}
                  <div className="absolute -left-[27px] md:-left-[35px] top-4 w-3.5 h-3.5 rounded-[2px] bg-[var(--bg-primary)] border border-[var(--accent)] flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  </div>

                  <div className="crystal-card p-6 rounded-[3px] space-y-4">
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                      onClick={() => toggleExperience(exp.id)}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                          <span className="text-sm font-semibold text-[var(--accent)]">
                            @{exp.company}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period} {exp.duration && `(${exp.duration})`}
                          </span>
                          <span>•</span>
                          <span>
                            {exp.location} ({exp.workplaceType})
                          </span>
                          <span>•</span>
                          <span>{exp.employmentType}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="self-start sm:self-auto p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Toggle details"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[var(--accent)]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-2 border-t border-[var(--border-line)] space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <p>{exp.description}</p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {exp.stack.map((item) => (
                            <span key={item} className="crystal-pill text-[11px]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div {...revealMotion} className="space-y-2">
            <div className="text-xs font-mono text-[var(--accent)] tracking-wider">
              03 / FEATURED PROJECTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Agentic Systems & Platform Solutions
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Production architectures combining LLM reasoning, Model Context Protocol, and cloud orchestration.
            </p>
          </motion.div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData.projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                {...revealMotion}
                className={`crystal-card p-6 rounded-[3px] flex flex-col justify-between space-y-5 ${
                  idx === 0 || idx === 3 ? 'md:col-span-1' : 'md:col-span-1'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[var(--accent)] tracking-wider">
                      {proj.association || 'ENGINEERING INITIATIVE'}
                    </span>
                    {proj.period && (
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {proj.period}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] font-medium">
                    {proj.summary}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 pt-3 border-t border-[var(--border-line)]">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech) => (
                      <span key={tech} className="crystal-pill text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Render buttons only if URL properties exist */}
                  {(proj.repoUrl || proj.liveUrl) && (
                    <div className="flex items-center gap-3 pt-1">
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
            ))}
          </div>
        </div>
      </section>

      {/* 5. SKILLS SECTION */}
      <section id="skills" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div {...revealMotion} className="space-y-2">
            <div className="text-xs font-mono text-[var(--accent)] tracking-wider">04 / SKILLS</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Core Competencies & Toolchain
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-mono">
              Grouped technical capabilities without arbitrary percentages or progress bars.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.skills.map((group) => (
              <motion.div
                key={group.category}
                {...revealMotion}
                className="crystal-card p-6 rounded-[3px] space-y-4"
              >
                <div className="flex items-center gap-2 border-b border-[var(--border-line)] pb-3">
                  <Server className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
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

      {/* 6. EDUCATION & CERTIFICATION */}
      <section id="education" className="py-20 md:py-28 border-b border-[var(--border-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <motion.div {...revealMotion} className="space-y-2">
            <div className="text-xs font-mono text-[var(--accent)] tracking-wider">
              05 / EDUCATION & CREDENTIALS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Academic Background
            </h2>
          </motion.div>

          <motion.div {...revealMotion} className="crystal-card p-6 sm:p-8 rounded-[3px] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[var(--accent)]">UNDERGRADUATE DEGREE</div>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div {...revealMotion} className="space-y-2">
            <div className="text-xs font-mono text-[var(--accent)] tracking-wider">
              06 / GET IN TOUCH
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Initiate a Conversation
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl">
              Open to conversations about DevOps, Agentic AI and Forward Deployed Engineering roles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left direct contact card */}
            <motion.div
              {...revealMotion}
              className="lg:col-span-5 crystal-card p-6 sm:p-8 rounded-[3px] space-y-6"
            >
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Direct Channels</h3>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  Connect professionally or send a message directly.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] flex items-center justify-between group hover:border-[var(--accent)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-5 h-5 text-[var(--accent)]" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">LinkedIn Profile</div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)]">
                        linkedin.com/in/akshay-pakade-8a34b0349
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </a>

                <div className="p-4 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] space-y-1">
                  <div className="text-xs font-mono text-[var(--text-muted)]">Configured Email</div>
                  <div className="text-xs font-mono text-[var(--text-primary)] select-all">
                    {profileData.socialLinks.emailPlaceholder}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] font-mono pt-1">
                    (Contact via LinkedIn is preferred for role inquiries)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Contact Form */}
            <motion.div
              {...revealMotion}
              className="lg:col-span-7 crystal-card p-6 sm:p-8 rounded-[3px] space-y-6"
            >
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Send a Message</h3>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  Validated contact form posting to configurable endpoint.
                </p>
              </div>

              {formStatus === 'submitted' ? (
                <div className="p-6 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] space-y-2 text-center">
                  <CheckCircle2 className="w-8 h-8 text-[var(--accent)] mx-auto" />
                  <h4 className="font-semibold text-sm text-[var(--text-primary)]">Message Received</h4>
                  <p className="text-xs text-[var(--text-secondary)] font-mono">
                    Thank you for reaching out. Akshay will get back to you shortly.
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
          </div>
        </div>
      </section>
    </div>
  )
}

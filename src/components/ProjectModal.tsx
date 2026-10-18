import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectItem } from '../data/profile'
import { ProjectDiagram } from './ProjectDiagram'
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

interface ProjectModalProps {
  project: ProjectItem | null
  allProjects: ProjectItem[]
  onClose: () => void
  onSelectProject: (proj: ProjectItem) => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation & escape to close
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    // Body scroll lock
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project])

  if (!project) return null

  const currentIndex = allProjects.findIndex((p) => p.id === project.id)

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length
    onSelectProject(allProjects[prevIndex])
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allProjects.length
    onSelectProject(allProjects[nextIndex])
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window with shared layout animation */}
        <motion.div
          ref={modalRef}
          layoutId={`project-card-${project.id}`}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-surface-elevated)] border border-[var(--border-crystal)] rounded-[4px] shadow-2xl overflow-y-auto z-10 flex flex-col focus:outline-none"
          tabIndex={-1}
        >
          {/* Top Bar with Navigation Controls & Close Button */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-[var(--bg-surface-elevated)]/95 backdrop-blur-md border-b border-[var(--border-line)]">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-[3px] border border-[var(--border-crystal)] hover:border-[var(--color-sky)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Previous project (Arrow Left)"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-[3px] border border-[var(--border-crystal)] hover:border-[var(--color-sky)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Next project (Arrow Right)"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[var(--text-muted)] ml-2">
                {currentIndex + 1} of {allProjects.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-[3px] border border-[var(--border-crystal)] hover:border-[var(--color-coral)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Close modal (Escape)"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Large Cover Image (16:10) */}
            <div className="relative aspect-[16/10] w-full rounded-[3px] overflow-hidden border border-[var(--border-crystal)] bg-black/40">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`/projects/${project.id}-800.avif 800w, /projects/${project.id}-1600.avif 1600w`}
                  sizes="(max-width: 768px) 100vw, 860px"
                />
                <source
                  type="image/webp"
                  srcSet={`/projects/${project.id}-800.webp 800w, /projects/${project.id}-1600.webp 1600w`}
                  sizes="(max-width: 768px) 100vw, 860px"
                />
                <img
                  src={`/projects/${project.id}-1600.jpg`}
                  alt={`${project.title} architectural overview`}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>

            {/* Header info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[var(--color-teal)] font-semibold tracking-wide">
                  {project.association || 'ENGINEERING INITIATIVE'}
                </span>
                {project.period && (
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {project.period}
                  </span>
                )}
              </div>

              <h2
                id="modal-project-title"
                className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]"
              >
                {project.title}
              </h2>

              <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Infrastructure Role Responsibility Note */}
            {project.isInfrastructure && (
              <div className="p-3 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-primary)] text-xs font-mono text-[var(--text-muted)]">
                Note: Summarizes responsibilities from these roles.
              </div>
            )}

            {/* Key Points List */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-[var(--text-primary)] font-bold tracking-wider uppercase border-b border-[var(--border-line)] pb-1.5">
                Key Technical Details
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sky)] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inline Architecture SVG Diagram */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-[var(--text-primary)] font-bold tracking-wider uppercase border-b border-[var(--border-line)] pb-1.5">
                Architecture Flow
              </h3>
              <ProjectDiagram projectId={project.id} />
            </div>

            {/* Full Tech Stack Chips */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono text-[var(--text-primary)] font-bold tracking-wider uppercase border-b border-[var(--border-line)] pb-1.5">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="crystal-pill text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Optional Links */}
            {(project.repoUrl || project.liveUrl) && (
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-line)]">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs font-mono"
                  >
                    <span>Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs font-mono"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

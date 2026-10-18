import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { profileData, type ProjectItem } from '../data/profile'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI' | 'Infrastructure'>('All')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const allProjects = profileData.projects

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === 'AI') return !p.isInfrastructure
    if (activeFilter === 'Infrastructure') return p.isInfrastructure
    return true
  })

  return (
    <section id="projects" className="py-24 md:py-32 border-b border-[var(--border-line)] relative">
      <div className="content-container space-y-12">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[var(--border-crystal)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--color-sky)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sky)]" />
              <span>Projects</span>
            </div>

            <h2 className="fluid-h2 font-display font-bold text-[var(--text-primary)]">
              Things I have <span className="font-serif-accent text-grad-teal-sky">built</span>
            </h2>

            <p className="text-sm text-[var(--text-secondary)] max-w-[70ch]">
              Production systems across Agentic AI orchestration, Model Context Protocol, and cloud infrastructure delivery.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-[var(--bg-surface)] p-1 rounded-[4px] border border-[var(--border-crystal)] self-start md:self-auto">
            {(['All', 'AI', 'Infrastructure'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-[3px] transition-all cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns Grid on desktop, 2 on tablet, 1 on mobile */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onClick={() => setSelectedProject(proj)}
            />
          ))}
        </motion.div>
      </div>

      {/* Shared Layout Modal */}
      <ProjectModal
        project={selectedProject}
        allProjects={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />
    </section>
  )
}

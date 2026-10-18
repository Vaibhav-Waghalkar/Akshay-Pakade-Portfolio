import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ProjectItem } from '../data/profile'

interface ProjectCardProps {
  project: ProjectItem
  onClick: () => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if mouse/pointer fine
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 6deg tilt
    const rX = ((y - centerY) / centerY) * -5
    const rY = ((x - centerX) / centerX) * 5

    setRotateX(rX)
    setRotateY(rY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  // Max 4 stack tags plus "+N"
  const visibleTags = project.stack.slice(0, 4)
  const remainingCount = project.stack.length - visibleTags.length

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${project.id}`}
      data-cursor-project="true"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="crystal-card p-5 rounded-[4px] flex flex-col justify-between space-y-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-sky)] group select-none relative overflow-hidden transition-transform duration-200"
    >
      {/* Soft light glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
          opacity: glarePos.opacity,
        }}
        aria-hidden="true"
      />

      {/* Cover image 16:10 with slow zoom on hover */}
      <div className="relative aspect-[16/10] w-full rounded-[3px] overflow-hidden border border-[var(--border-crystal)] bg-black/30">
        <picture>
          <source
            type="image/avif"
            srcSet={`/projects/${project.id}-800.avif`}
          />
          <source
            type="image/webp"
            srcSet={`/projects/${project.id}-800.webp`}
          />
          <img
            src={`/projects/${project.id}-800.jpg`}
            alt={`${project.title} cover`}
            width={800}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </picture>
      </div>

      {/* Card Info */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-[var(--color-teal)] font-semibold tracking-wide">
            {project.association || 'ENGINEERING INITIATIVE'}
          </div>
          <h3 className="text-lg font-display font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--color-sky)] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Stack Tags (up to 4 plus +N) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--border-line)]">
          {visibleTags.map((tech) => (
            <span key={tech} className="crystal-pill text-[10px]">
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="crystal-pill text-[10px] text-[var(--color-amber)] font-semibold">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

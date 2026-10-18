import React, { useEffect, useState } from 'react'

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'project'>('default')
  const [isPointerFine, setIsPointerFine] = useState(false)

  useEffect(() => {
    // Only enable on fine pointer (mouse)
    const media = window.matchMedia('(pointer: fine)')
    setIsPointerFine(media.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches)
    }
    media.addEventListener('change', handleMediaChange)

    if (!media.matches) return

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      // Check if hovering over links, buttons, or project cards
      const target = e.target as HTMLElement | null
      if (!target) return

      const projectCard = target.closest('[data-cursor-project="true"]')
      if (projectCard) {
        setHoverState('project')
        return
      }

      const interactive = target.closest('a, button, [role="button"], input, textarea, select')
      if (interactive) {
        setHoverState('hover')
        return
      }

      setHoverState('default')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Trailing spring loop for ring
    let animationFrameId: number
    const updateRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }))
      animationFrameId = requestAnimationFrame(updateRing)
    }
    animationFrameId = requestAnimationFrame(updateRing)

    return () => {
      media.removeEventListener('change', handleMediaChange)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [pos.x, pos.y])

  if (!isPointerFine) return null

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className={`custom-cursor-ring ${
          hoverState === 'hover'
            ? 'cursor-hover'
            : hoverState === 'project'
            ? 'cursor-project'
            : ''
        }`}
        style={{ transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)` }}
        aria-hidden="true"
      >
        {hoverState === 'project' && (
          <span className="text-[9px] font-mono font-bold tracking-wider text-[var(--color-amber)] uppercase select-none">
            View
          </span>
        )}
      </div>
    </>
  )
}

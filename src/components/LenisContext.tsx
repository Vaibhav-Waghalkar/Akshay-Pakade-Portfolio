import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void
  stop: () => void
  start: () => void
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Disable on reduced motion or touch devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window

    if (prefersReducedMotion || isTouch) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [])

  const scrollTo = (target: string | HTMLElement | number, offset: number = -80) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset })
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY + offset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        const y = target.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop()
    }
  }

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start()
    }
  }

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenis = () => useContext(LenisContext)

import { useEffect, useRef } from 'react'

export default function AnimatedGridBackground() {
  const bgRef = useRef(null)

  useEffect(() => {
    // Respect reduced motion settings
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let frame = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight * 0.35

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          if (bgRef.current) {
            bgRef.current.style.setProperty('--cursor-x', `${mouseX}px`)
            bgRef.current.style.setProperty('--cursor-y', `${mouseY}px`)
          }
          frame = 0
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={bgRef} className="animated-grid-bg" aria-hidden="true">
      {/* Base Grid Layer */}
      <div className="animated-grid-bg__grid" />
      {/* Dot Matrix Layer */}
      <div className="animated-grid-bg__dots" />
      {/* Drifting Ambient Light Beam */}
      <div className="animated-grid-bg__beam" />
      {/* Mouse Reactive Spotlight */}
      <div className="animated-grid-bg__spotlight" />
      {/* Vignette Edge Fade */}
      <div className="animated-grid-bg__vignette" />
    </div>
  )
}

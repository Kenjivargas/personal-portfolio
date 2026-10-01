import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winHeight > 0 ? (scrollPx / winHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, scrolled)))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: `${scrollProgress}%` }}
    />
  )
}

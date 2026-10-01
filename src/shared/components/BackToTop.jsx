import { useEffect, useState } from 'react'
import Icon from './ui/Icon.jsx'

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Floating button that appears after the first screen, with a ring showing page progress.
export default function BackToTop() {
  const [state, setState] = useState({ visible: false, progress: 0 })

  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setState({
        visible: window.scrollY > window.innerHeight * 0.9,
        progress: max > 0 ? Math.min(1, window.scrollY / max) : 0,
      })
      frame = 0
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <a
      href="#home"
      className="back-to-top"
      data-visible={state.visible}
      aria-label="Back to top"
      tabIndex={state.visible ? 0 : -1}
      aria-hidden={!state.visible}
    >
      <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="back-to-top__track" cx="24" cy="24" r={RADIUS} />
        <circle
          className="back-to-top__progress"
          cx="24"
          cy="24"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - state.progress)}
        />
      </svg>
      <Icon name="arrowUp" size={16} />
    </a>
  )
}

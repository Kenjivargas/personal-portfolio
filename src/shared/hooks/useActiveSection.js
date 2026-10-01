import { useEffect, useState } from 'react'

const sectionIds = ['home', 'projects', 'about', 'contact']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let frame = 0
    const update = () => {
      let current = 'home'
      const activationLine = Math.max(180, window.innerHeight * 0.35)
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= activationLine) current = id
      }
      setActiveSection(current)
      frame = 0
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return activeSection
}

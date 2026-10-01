import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const storageKey = 'portfolio-theme'
const themeColors = { light: '#f7f7f5', dark: '#0b0b0c' }

function savedTheme() {
  try {
    const saved = window.localStorage.getItem(storageKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
}

// Origin of the circular "fill" reveal: the clicked control, or the top-right corner.
function revealOrigin(event) {
  const target = event?.currentTarget
  if (target?.getBoundingClientRect) {
    const rect = target.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }
  return { x: window.innerWidth - 48, y: 32 }
}

export function useTheme() {
  const [preference, setPreference] = useState(savedTheme)
  const [system, setSystem] = useState(systemTheme)
  const theme = preference ?? system

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setSystem(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const commit = () => {
      flushSync(() => setPreference(next))
      applyTheme(next)
    }

    try {
      window.localStorage.setItem(storageKey, next)
    } catch {
      // Theme remains usable when storage is unavailable.
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reducedMotion) {
      commit()
      return
    }

    const { x, y } = revealOrigin(event)
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(commit)

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 1200, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    }).catch(() => {})
  }

  return { theme, toggleTheme }
}

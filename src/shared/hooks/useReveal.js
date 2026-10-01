import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.dataset.reveal = 'visible'
      return
    }

    const bounds = element.getBoundingClientRect()
    if (bounds.top < window.innerHeight - 32) {
      element.dataset.reveal = 'visible'
      return
    }

    element.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.dataset.reveal = 'visible'
      observer.disconnect()
    }, { rootMargin: '0px 0px -32px 0px', threshold: 0.01 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}

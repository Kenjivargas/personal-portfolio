import { useEffect, useRef, useState } from 'react'

// Rail fills as the list scrolls past the middle of the viewport; entries above that line are marked as passed.
function useScrollRail(count) {
  const listRef = useRef(null)
  const [rail, setRail] = useState({ progress: 0, passed: 0 })

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    let frame = 0
    const update = () => {
      const line = window.innerHeight * 0.6
      const rect = list.getBoundingClientRect()
      const progress = rect.height > 0 ? Math.min(1, Math.max(0, (line - rect.top) / rect.height)) : 0
      const passed = [...list.children].filter((item) => item.getBoundingClientRect().top < line).length
      setRail({ progress, passed })
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
  }, [count])

  return { listRef, ...rail }
}

export default function Timeline({ label, entries, emptyText }) {
  const { listRef, progress, passed } = useScrollRail(entries.length)

  return (
    <div className="timeline">
      <h3 className="timeline__label">{label}</h3>
      {entries.length ? (
        <ol ref={listRef} className="timeline__list" style={{ '--rail': progress }}>
          {entries.map((entry, i) => (
            <li key={entry.id} className="timeline__item" data-passed={i < passed}>
              <p className="timeline__period">{entry.period}</p>
              <div className="timeline__main">
                <h4>{entry.title}</h4>
                <p className="timeline__subtitle">{entry.subtitle}</p>
              </div>
              {entry.description && <p className="timeline__description">{entry.description}</p>}
            </li>
          ))}
        </ol>
      ) : (
        <p className="state-note">{emptyText}</p>
      )}
    </div>
  )
}

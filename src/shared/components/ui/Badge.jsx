export default function Badge({ tone = 'neutral', children }) {
  return (
    <span className={`badge badge--${tone}`}>
      {(tone === 'success' || tone === 'progress') && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}

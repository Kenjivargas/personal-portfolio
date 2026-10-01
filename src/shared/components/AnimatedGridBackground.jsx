export default function AnimatedGridBackground() {
  return (
    <div className="animated-grid-bg" aria-hidden="true">
      {/* Base Blueprint Grid Layer */}
      <div className="animated-grid-bg__grid" />
      {/* Dot Matrix Layer */}
      <div className="animated-grid-bg__dots" />
      {/* Slowly Drifting Ambient Light Beam */}
      <div className="animated-grid-bg__beam" />
      {/* Vignette Edge Fade */}
      <div className="animated-grid-bg__vignette" />
    </div>
  )
}

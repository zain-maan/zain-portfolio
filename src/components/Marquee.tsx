const WORDS = ['Websites', 'Booking systems', 'Dashboards', 'Motion & 3D', 'Fast on phones', 'Built to convert']

// A tilted band of words that scrolls forever, crossed by a second band going the other way.
export default function Marquee() {
  const row = (reverse = false) => (
    <div className={`flex w-max ${reverse ? '[animation-direction:reverse]' : ''} animate-marquee`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {WORDS.map((w) => (
            <span key={w} className="flex items-center gap-8 px-8 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
              {w}
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
                <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <section aria-label="What I do" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-ink-3 py-5 text-cream/30">{row(true)}</div>
      <div className="relative -rotate-[2deg] bg-ember py-5 text-ink shadow-[0_30px_60px_-30px_rgba(255,90,31,0.7)]">{row()}</div>
    </section>
  )
}

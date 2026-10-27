const WORDS = ['Websites', 'Mobile apps', 'AI agents', 'Automation', 'Dashboards', 'Voice AI']

// A dark band of words that scrolls forever.
export default function Marquee() {
  return (
    <section aria-label="What I build" className="overflow-hidden border-y border-ink bg-ink py-5 text-paper">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {WORDS.map((w) => (
              <span key={w} className="flex items-center gap-8 px-8 font-display text-3xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
                {w}
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-sand">
                  <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

const TEXT =
  'I build websites, apps and AI agents for businesses that want to grow without hiring a bigger team. Clean design, solid engineering, and automation that actually saves hours.'
// Words that stay in the accent colour once lit.
const ACCENT = new Set(['websites,', 'apps', 'AI', 'agents'])


// The statement's words darken one by one as the section scrolls through. Even the lightest grey keeps
// about 5:1 contrast on the paper background, so nothing is ever hard to read.
export default function Statement() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]:not([data-accent])',
        { color: '#6e6b66' },
        { color: '#0a0909', stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '[data-statement]', start: 'top 85%', end: 'bottom 65%', scrub: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about" className="px-4 pb-10 pt-16 sm:px-8 sm:py-24 lg:py-36">
      <div className="mx-auto max-w-[90rem]">
        <span className="slash" data-reveal>
          About
        </span>
        <p data-statement className="mt-8 max-w-6xl font-display text-[clamp(1.9rem,4.6vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
          {TEXT.split(' ').map((w, i) => (
            <span key={i} data-word data-accent={ACCENT.has(w) || undefined} className={ACCENT.has(w) ? 'text-clay' : ''}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

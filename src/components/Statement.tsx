import { useLayoutEffect, useRef } from 'react'
import { PROJECTS } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'

const TEXT =
  'I build websites, apps and AI agents for businesses that want to grow without hiring a bigger team. Clean design, solid engineering, and automation that actually saves hours.'
// Words that stay in the accent colour once lit.
const ACCENT = new Set(['websites,', 'apps', 'AI', 'agents'])

const STATS = [
  { value: String(PROJECTS.length).padStart(2, '0'), label: 'Featured projects' },
  { value: String(PROJECTS.filter((p) => p.live).length).padStart(2, '0'), label: 'Live sites to try' },
  { value: '03', label: 'Web · App · AI' },
]

// The statement's words light up one by one as the section scrolls through.
export default function Statement() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about" className="px-4 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[90rem]">
        <span className="slash" data-reveal>
          About
        </span>
        <p data-statement className="mt-8 max-w-6xl font-display text-[clamp(1.9rem,4.6vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
          {TEXT.split(' ').map((w, i) => (
            <span key={i} data-word className={ACCENT.has(w) ? 'text-clay' : ''}>
              {w}{' '}
            </span>
          ))}
        </p>
        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-8">
          {STATS.map((s, i) => (
            <div key={s.label} data-reveal={i * 0.08}>
              <dd className="font-display text-5xl font-bold tracking-[-0.05em] sm:text-7xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-grey">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

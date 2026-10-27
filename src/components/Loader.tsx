import { useLayoutEffect, useRef, useState } from 'react'
import { ME } from '../data'
import { gsap, holdForIntro, prefersReducedMotion, setScrollLocked } from '../lib/motion'

const SEEN = 'portfolio-intro'

// First visit in a session: a counter runs to 100, the name rises in, then the panel lifts away.
export default function Loader() {
  const [done, setDone] = useState(() => {
    try {
      return prefersReducedMotion() || sessionStorage.getItem(SEEN) === '1'
    } catch {
      return prefersReducedMotion()
    }
  })
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (done || !root.current) return
    holdForIntro(2400)
    setScrollLocked(true)
    const n = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN, '1')
          } catch {
            /* private mode: the intro simply plays again next time */
          }
          setScrollLocked(false)
          setDone(true)
        },
      })
      tl.from('[data-intro-letter]', { yPercent: 110, duration: 0.9, stagger: 0.035, ease: 'power4.out' }, 0.1)
        .to(n, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, '0')
        } }, 0)
        .to('[data-intro-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to('[data-intro-letter]', { yPercent: -110, duration: 0.6, stagger: 0.02, ease: 'power3.in' }, 1.6)
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, 1.85)
    }, root)
    return () => ctx.revert()
  }, [done])

  if (done) return null
  return (
    <div ref={root} className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink-2 p-6 sm:p-10" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <span className="eyebrow">Portfolio · {new Date().getFullYear()}</span>
      <p className="flex overflow-hidden font-display text-[16vw] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[11vw]" aria-label={ME.name}>
        {ME.first.split('').map((l, i) => (
          <span key={i} data-intro-letter className="inline-block">
            {l}
          </span>
        ))}
        <span data-intro-letter className="inline-block text-ember">.</span>
      </p>
      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-white/10">
          <div data-intro-bar className="h-full origin-left scale-x-0 bg-ember" />
        </div>
        <span ref={count} className="font-display text-5xl font-medium tabular-nums sm:text-7xl">
          000
        </span>
      </div>
    </div>
  )
}

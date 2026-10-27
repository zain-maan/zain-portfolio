import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { PROCESS, SKILLS } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Dark block: the tools grouped by area, each group pointing at the projects that prove it, then the process.
// Phones: the skill groups stack like cards and the process becomes a swipe carousel.
export default function Skills() {
  const root = useRef<HTMLElement>(null)
  const steps = useRef<HTMLOListElement>(null)
  const [step, setStep] = useState(0)

  // Process carousel (phones): the centred card faces you, the others shrink and dim.
  useEffect(() => {
    const el = steps.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const items = Array.from(el.children) as HTMLElement[]
      if (el.scrollWidth <= el.clientWidth + 1) {
        items.forEach((c) => (c.style.transform = c.style.opacity = ''))
        return
      }
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      items.forEach((c, i) => {
        const d = (c.offsetLeft + c.offsetWidth / 2 - mid) / c.offsetWidth
        if (Math.abs(d) < 0.5) best = i
        if (prefersReducedMotion()) return
        const a = Math.min(1, Math.abs(d))
        c.style.transform = `perspective(900px) rotateY(${Math.max(-1, Math.min(1, d)) * -14}deg) scale(${1 - a * 0.1})`
        c.style.opacity = String(1 - a * 0.45)
      })
      setStep(best)
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    el.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      // Phones: as the next skill card rides up, the one underneath sinks back and dims.
      gsap.matchMedia().add('(max-width: 1023px)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-skill-row]')
        rows.forEach((row, i) => {
          const next = rows[i + 1]
          if (!next) return
          gsap.to(row, { scale: 0.92, filter: 'brightness(0.6)', ease: 'none', scrollTrigger: { trigger: next, start: 'top 42%', end: 'top 14%', scrub: true } })
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-skill-row]').forEach((row, i) => {
        gsap.from(row.querySelectorAll('[data-chip]'), {
          x: i % 2 ? 80 : -80,
          opacity: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%', once: true },
        })
      })
      gsap.fromTo(
        '[data-process-line]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '[data-process]', start: 'top 80%', end: 'bottom 55%', scrub: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="skills" className="mx-2 rounded-[2rem] bg-ink px-4 py-24 text-paper sm:mx-4 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="slash !text-paper" data-reveal>
              Skills
            </span>
            <h2 data-split className="mt-5 font-display text-[clamp(2.6rem,7vw,7rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em]">
              Tools I <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-sand">ship</span> with
            </h2>
          </div>
          <p className="max-w-sm text-paper/55" data-reveal="0.1">
            The tools I use day to day, with the projects that show them.
          </p>
        </div>

        <ul className="mt-14">
          {SKILLS.map((g, i) => (
            <li
              key={g.group}
              data-skill-row
              className="grid origin-top gap-4 border-paper/10 py-7 max-lg:sticky max-lg:top-[var(--stack-top)] max-lg:mb-4 max-lg:rounded-[1.75rem] max-lg:border max-lg:bg-ink-3 max-lg:p-6 max-lg:shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.8)] lg:grid-cols-[16rem_1fr] lg:gap-10 lg:border-t"
              style={{ '--stack-top': `calc(5.5rem + ${i * 12}px)` } as CSSProperties}
            >
              <div>
                <h3 className="flex items-baseline justify-between font-display text-2xl font-bold uppercase tracking-[-0.03em]">
                  {g.group}
                  <span className="text-sm font-medium tracking-normal text-paper/35 lg:hidden">{String(i + 1).padStart(2, '0')}</span>
                </h3>
                <p className="mt-1 text-sm text-paper/45">Used in {g.usedIn.join(', ')}</p>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {g.items.map((s) => (
                  <span key={s} data-chip className="chip chip-dark !text-sm transition-colors hover:border-sand hover:text-sand">
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Process */}
        <div data-process className="mt-24 border-t border-paper/10 pt-10">
          <span className="slash !text-paper" data-reveal>
            Process
          </span>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-paper/10 lg:block">
              <div data-process-line className="h-full origin-left bg-sand" />
            </div>
            <ol
              ref={steps}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12%] pb-2 sm:-mx-8 sm:px-[20%] lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:p-0"
              aria-label="How a project runs"
              data-reveal
            >
              {PROCESS.map((p) => (
                <li
                  key={p.step}
                  className="relative w-[76%] shrink-0 snap-center rounded-3xl border border-paper/10 bg-ink-3 p-6 will-change-transform sm:w-[60%] lg:w-auto lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <span className="relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-full border border-paper/20 bg-ink font-display text-xl font-semibold">
                    {p.step}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-bold uppercase tracking-[-0.035em]">{p.title}</h3>
                  <p className="mt-3 max-w-xs text-paper/55">{p.text}</p>
                </li>
              ))}
            </ol>
            {/* Phone: which step is centred */}
            <div className="mt-6 flex justify-center gap-2 lg:hidden" aria-hidden="true">
              {PROCESS.map((p, i) => (
                <span key={p.step} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-sand' : 'w-1.5 bg-paper/25'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

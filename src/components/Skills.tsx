import { useLayoutEffect, useRef } from 'react'
import { PROCESS, SKILLS } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Dark block: the tools grouped by area, each group pointing at the projects that prove it, then the process.
export default function Skills() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
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
            Every tool here is used in a real project on this page or on my GitHub.
          </p>
        </div>

        <ul className="mt-14">
          {SKILLS.map((g) => (
            <li key={g.group} data-skill-row className="grid gap-4 border-t border-paper/10 py-7 lg:grid-cols-[16rem_1fr] lg:gap-10">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.03em]">{g.group}</h3>
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
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {PROCESS.map((p, i) => (
                <li key={p.step} className="relative rounded-3xl border border-paper/10 p-6 lg:border-0 lg:p-0" data-reveal={i * 0.08}>
                  <span className="relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-full border border-paper/20 bg-ink font-display text-xl font-semibold">
                    {p.step}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-bold uppercase tracking-[-0.035em]">{p.title}</h3>
                  <p className="mt-3 max-w-xs text-paper/55">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

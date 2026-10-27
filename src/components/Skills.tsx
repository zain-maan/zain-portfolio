import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PROCESS, SKILLS } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'

const AUTOPLAY = 1300

// Dark block: the tools grouped by area, each group pointing at the projects that prove it, then the process.
// Phones: the skill groups are cards that rise in, and the process becomes a self-playing swipe carousel.
export default function Skills() {
  const root = useRef<HTMLElement>(null)
  const steps = useRef<HTMLOListElement>(null)
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(false)
  const [held, setHeld] = useState(false)
  const resume = useRef(0)

  const goTo = (i: number) => {
    const el = steps.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  // The carousel plays itself while it is on screen. Touching it pauses, and play resumes 4s after the last touch.
  useEffect(() => {
    const el = steps.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const el = steps.current
    if (!el || !inView || held || prefersReducedMotion() || el.scrollWidth <= el.clientWidth + 1) return
    const id = window.setTimeout(() => goTo((step + 1) % PROCESS.length), AUTOPLAY)
    return () => window.clearTimeout(id)
  }, [step, inView, held])
  const hold = () => {
    setHeld(true)
    window.clearTimeout(resume.current)
    resume.current = window.setTimeout(() => setHeld(false), 4000)
  }
  useEffect(() => () => window.clearTimeout(resume.current), [])

  // Each time a step becomes active (phones): the number flips in, the title rises, the text fades up and a
  // shine sweeps across the card.
  useEffect(() => {
    const el = steps.current
    const card = el?.children[step] as HTMLElement | undefined
    if (!el || !card || prefersReducedMotion() || el.scrollWidth <= el.clientWidth + 1) return
    const tl = gsap.timeline()
    tl.fromTo(card.querySelector('[data-step-num]'), { rotateY: -180, scale: 0.6 }, { rotateY: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)' })
      .fromTo(card.querySelector('[data-step-title]'), { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'power4.out' }, 0.08)
      .fromTo(card.querySelector('[data-step-text]'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.16)
      .fromTo(card.querySelector('[data-step-shine]'), { xPercent: -120 }, { xPercent: 220, duration: 0.8, ease: 'power2.inOut' }, 0)
    return () => void tl.progress(1).kill()
  }, [step])

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
      const rows = gsap.utils.toArray<HTMLElement>('[data-skill-row]')
      // Phones: each card swings in from alternating sides in 3D, tied to the scroll.
      gsap.matchMedia().add('(max-width: 1023px)', () => {
        rows.forEach((row, i) => {
          const side = i % 2 ? 1 : -1
          gsap.fromTo(
            row,
            { xPercent: side * 45, rotateY: side * -28, rotate: side * 4, opacity: 0.15, transformPerspective: 900, transformOrigin: side < 0 ? '0% 50%' : '100% 50%' },
            { xPercent: 0, rotateY: 0, rotate: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: row, start: 'top bottom', end: 'top 62%', scrub: 0.6 } },
          )
        })
      })
      // Then the chips pop in one after another.
      rows.forEach((row) => {
        gsap.from(row.querySelectorAll('[data-chip]'), {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          stagger: 0.035,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
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
    <section ref={root} id="skills" className="mx-2 overflow-hidden rounded-[2rem] bg-ink px-4 py-24 text-paper sm:mx-4 sm:px-8 lg:py-32">
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
              className="grid gap-4 border-paper/10 py-7 max-lg:mb-4 max-lg:rounded-[1.75rem] max-lg:border max-lg:bg-ink-3 max-lg:p-6 lg:grid-cols-[16rem_1fr] lg:gap-10 lg:border-t"
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
              onTouchStart={hold}
              onPointerDown={hold}
              onWheel={hold}
            >
              {PROCESS.map((p, i) => (
                <li
                  key={p.step}
                  className={`relative w-[76%] shrink-0 snap-center rounded-3xl border bg-ink-3 p-6 transition-[border-color,box-shadow] duration-700 will-change-transform sm:w-[60%] lg:w-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
                    i === step ? 'border-sand/50 shadow-[0_0_50px_-12px_rgba(206,179,166,0.55)]' : 'border-paper/10'
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-full border font-display text-xl font-semibold transition-colors duration-700 lg:border-paper/20 lg:bg-ink lg:text-paper ${
                      i === step ? 'border-sand bg-sand text-ink' : 'border-paper/20 bg-ink'
                    }`}
                    data-step-num
                  >
                    {p.step}
                  </span>
                  <h3 className="mt-6 overflow-hidden font-display text-3xl font-bold uppercase tracking-[-0.035em]">
                    <span data-step-title className="block">
                      {p.title}
                    </span>
                  </h3>
                  <p data-step-text className="mt-3 max-w-xs text-paper/55">
                    {p.text}
                  </p>
                  {/* Light sweep (phones) */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl lg:hidden">
                    <span data-step-shine className="absolute inset-y-0 left-0 w-1/2 -translate-x-[120%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-sand/15 to-transparent" />
                  </span>
                </li>
              ))}
            </ol>
            {/* Phone: story-style progress. The active bar fills while the carousel waits to move on. */}
            <div className="mt-6 flex justify-center gap-2 lg:hidden">
              {PROCESS.map((p, i) => (
                <button
                  key={p.step}
                  onClick={() => {
                    hold()
                    goTo(i)
                  }}
                  aria-label={`Show step ${i + 1}: ${p.title}`}
                  className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-paper/20' : i < step ? 'w-4 bg-sand/70' : 'w-4 bg-paper/20'}`}
                >
                  {i === step && (
                    <span
                      key={`${step}-${held}-${inView}`}
                      className="absolute inset-y-0 left-0 bg-sand"
                      style={{ width: held || !inView ? '100%' : undefined, animation: held || !inView ? undefined : `fill ${AUTOPLAY}ms linear forwards` }}
                    />
                  )}
                </button>
              ))}
            </div>
            <style>{'@keyframes fill { from { width: 0 } to { width: 100% } }'}</style>
          </div>
        </div>
      </div>
    </section>
  )
}

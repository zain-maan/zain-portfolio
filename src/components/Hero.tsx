import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ME, PROJECTS } from '../data'
import { gsap, introDelay, prefersReducedMotion, scrollToElement } from '../lib/motion'
import { ArrowDown, ArrowUpRight, Shot } from './ui'

// Screens from the projects, shown one after another inside the headline pill.
const PILL = PROJECTS.flatMap((p) => p.shots.slice(0, 2))

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const [shot, setShot] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setShot((s) => (s + 1) % PILL.length), 2200)
    return () => window.clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: introDelay(0.1) })
      tl.from('[data-hero-line]', { yPercent: 115, duration: 1.3, ease: 'power4.out', stagger: 0.1 })
        .from('[data-hero-pill]', { scale: 0, rotate: -12, duration: 1.1, ease: 'back.out(1.6)' }, 0.35)
        .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }, 0.6)
      // The headline drifts up and fades a little as the page scrolls on.
      gsap.to('[data-hero-title]', { yPercent: -18, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pt-32">
      {/* Slow glowing orbs behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-orb absolute -right-[10%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-ember/25 blur-[120px]" />
        <div className="animate-orb absolute -left-[15%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#6d5dfc]/15 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col">
        <div className="flex items-center justify-between" data-hero-fade>
          <span className="eyebrow">{ME.role}</span>
          <span className="hidden text-sm text-muted sm:block">Selected work 2026</span>
        </div>

        <h1 data-hero-title className="mt-10 font-display text-[clamp(3.1rem,15.5vw,6rem)] sm:text-[clamp(3.1rem,10.2vw,11.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] sm:mt-14 lg:mt-16">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              I design
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="flex flex-wrap items-center gap-x-[0.18em]">
              <span className="font-serif font-normal italic tracking-[-0.02em] text-ember-soft">websites</span>
              <span
                data-hero-pill
                className="relative inline-block h-[0.72em] w-[1.55em] overflow-hidden rounded-full border border-white/15 align-middle shadow-[0_20px_50px_-15px_rgba(255,90,31,0.55)]"
                aria-hidden="true"
              >
                {PILL.map((name, i) => (
                  <Shot
                    key={name}
                    name={name}
                    sizes="320px"
                    loading="eager"
                    className={`absolute inset-0 h-full w-full object-cover object-left-top transition-all duration-700 ${i === shot ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                  />
                ))}
              </span>
              <span>that</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              book clients<span className="text-ember">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-auto grid items-end gap-8 pt-14 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
          <p className="max-w-md text-lg leading-relaxed text-cream/70" data-hero-fade>
            Hi, I'm {ME.first}. I build fast, good-looking websites with real booking systems and dashboards, for businesses
            that want to look as good online as they are in person.
          </p>
          <div className="flex flex-wrap gap-3" data-hero-fade>
            <button onClick={() => scrollToElement('#work')} className="btn btn-ember" data-magnetic>
              See my work <ArrowDown size={18} />
            </button>
            <button onClick={() => scrollToElement('#contact')} className="btn btn-line" data-magnetic>
              Start a project <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted lg:flex" data-hero-fade>
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-ember" />
            </span>
            Scroll
          </div>
        </div>
      </div>
      <style>{'@keyframes scrollcue { 0% { transform: translateY(-100%) } 100% { transform: translateY(200%) } }'}</style>
    </section>
  )
}

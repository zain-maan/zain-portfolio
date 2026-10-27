import { useLayoutEffect, useRef } from 'react'
import { PROCESS, SERVICES } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { ArrowUpRight } from './ui'

export default function Services() {
  const steps = useRef<HTMLDivElement>(null)

  // The line under the process steps draws itself as you scroll past.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !steps.current) return
    const tween = gsap.fromTo(
      steps.current.querySelector('[data-line]'),
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: steps.current, start: 'top 80%', end: 'bottom 50%', scrub: true } },
    )
    return () => void tween.scrollTrigger?.kill()
  }, [])

  return (
    <section id="services" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow" data-reveal>
              What I do
            </span>
            <h2 data-split className="mt-6 font-display text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              Everything a small business needs to <span className="font-serif font-normal italic tracking-[-0.02em] text-ember-soft">win online.</span>
            </h2>
          </div>
          <p className="max-w-md text-cream/65 lg:justify-self-end" data-reveal="0.1">
            Design, development and the details in between. One person from the first call to launch, so nothing gets lost on the way.
          </p>
        </div>

        {/* Services: an editorial list that fills with colour on hover */}
        <ul className="mt-16 border-b border-white/10">
          {SERVICES.map((s, i) => (
            <li key={s.title} className="group relative overflow-hidden border-t border-white/10" data-reveal={i * 0.05}>
              <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
              <div className="relative grid gap-3 py-8 transition-colors duration-500 group-hover:text-ink sm:grid-cols-[4rem_1fr] lg:grid-cols-[5rem_1.1fr_1.3fr_auto] lg:items-center lg:gap-8 lg:py-10 lg:pl-4 lg:pr-6">
                <span className="text-sm font-medium text-muted transition-colors group-hover:text-ink/60">0{i + 1}</span>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">{s.title}</h3>
                <div className="sm:col-start-2 lg:col-start-auto">
                  <p className="max-w-lg text-cream/65 transition-colors group-hover:text-ink/75">{s.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-cream/60 transition-colors group-hover:text-ink/70">
                    {s.tags.map((t) => (
                      <span key={t} className="chip !border-current/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-ember lg:flex">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Process */}
        <div ref={steps} className="relative mt-28 lg:mt-36">
          <span className="eyebrow" data-reveal>
            How we'll work
          </span>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-white/10 lg:block">
              <div data-line className="h-full origin-left bg-ember" />
            </div>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {PROCESS.map((p, i) => (
                <li key={p.step} className="relative rounded-3xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur lg:border-0 lg:bg-transparent lg:p-0" data-reveal={i * 0.08}>
                  <span className="relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-full border border-white/15 bg-ink font-display text-xl font-semibold">
                    {p.step}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.035em]">{p.title}</h3>
                  <p className="mt-3 max-w-xs text-cream/60">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

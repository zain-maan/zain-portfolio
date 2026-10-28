import { useLayoutEffect, useRef } from 'react'
import { ME } from '../data'
import { gsap, prefersReducedMotion, scrollToTop } from '../lib/motion'
import { SOCIALS } from './Hero'
import { Available } from './Nav'
import { ArrowUpRight, Chat } from './ui'

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  // The two big buttons spring up, then the chips drop in from above and bounce into place.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-cta]', {
        scale: 0,
        rotate: (i) => (i ? 10 : -10),
        duration: 1.2,
        stagger: 0.12,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '[data-cta-row]', start: 'top 90%', once: true },
      })
      gsap.from('[data-drop]', {
        y: -90,
        rotate: () => gsap.utils.random(-18, 18),
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '[data-drop-row]', start: 'top 92%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="contact" className="relative overflow-hidden px-4 pb-6 pt-28 sm:px-8 lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sand/40 blur-[120px]" />

      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center text-center">
        <span className="chip" data-reveal>
          <Available />
        </span>
        <h2 data-split className="mt-8 max-w-6xl font-display text-[clamp(2.8rem,9vw,9rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em]">
          Have a project <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-clay sm:block">in mind?</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg text-ink/60" data-reveal="0.1">
          A website, an app or an AI agent: tell me what you need and I will come back with ideas and a clear plan.
        </p>

        {/* Layers: the outer span springs in, the link inside follows the pointer (magnetic). */}
        <div data-cta-row className="mt-10 flex flex-wrap justify-center gap-3">
          <span data-cta className="inline-block">
            <a href={`mailto:${ME.email}?subject=New%20project`} className="btn btn-ink group !px-8 !py-4 text-base active:scale-95" data-magnetic>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span className="animate-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </span>
              Contact me
              <span className="relative inline-flex overflow-hidden">
                <ArrowUpRight size={18} className="animate-launch" />
              </span>
            </a>
          </span>
          <span data-cta className="relative inline-block">
            <span aria-hidden="true" className="animate-ring pointer-events-none absolute inset-0 rounded-full border-2 border-emerald-500" />
            <a href={`https://wa.me/${ME.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-line group !px-8 !py-4 text-base active:scale-95" data-magnetic>
              <Chat size={18} className="text-emerald-600 transition-colors group-hover:animate-wiggle group-hover:text-paper" />
              WhatsApp me
            </a>
          </span>
        </div>

        {/* Layers: li drops in, the span bobs gently, the link lifts on hover. */}
        <ul data-drop-row className="mt-14 flex flex-wrap justify-center gap-2">
          <li data-drop>
            <span className="animate-bob inline-flex">
              <span className="chip !bg-ink !py-1.5 !pl-1.5 !text-paper">
                <picture>
                  <source type="image/avif" srcSet={`/${ME.photo}-640.avif`} />
                  <img src={`/${ME.photo}-640.webp`} alt="" className="h-7 w-7 rounded-full object-cover" loading="lazy" />
                </picture>
                {ME.name}
              </span>
            </span>
          </li>
          {SOCIALS.map((s, i) => (
            <li key={s.label} data-drop>
              <span className="animate-bob inline-flex" style={{ animationDelay: `${(i + 1) * -0.6}s` }}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="chip group !py-2 transition-[transform,background-color,color,border-color] duration-300 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-paper active:scale-95"
                >
                  <s.icon size={15} className="group-hover:animate-wiggle" /> {s.label === 'Email' ? ME.email : s.label}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Giant name: each word set apart, with a slow colour gradient flowing through the letters */}
      <p aria-hidden="true" className="relative mt-16 flex select-none justify-center gap-x-[0.22em] whitespace-nowrap font-display text-[10.5vw] font-bold uppercase leading-[0.85] tracking-[-0.05em] sm:mt-24">
        {ME.name.split(' ').map((w) => (
          <span key={w} className="text-flow pb-[0.06em]">
            {w}
          </span>
        ))}
      </p>

      <footer className="relative mx-auto mt-8 flex max-w-[90rem] flex-col gap-4 border-t border-line pt-6 text-sm text-grey sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {ME.name}. Designed and built by hand.
        </p>
        <button onClick={() => scrollToTop()} className="self-start text-ink transition-colors hover:text-clay sm:self-auto">
          Back to top ↑
        </button>
      </footer>
    </section>
  )
}

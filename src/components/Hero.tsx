import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react'
import { ME } from '../data'
import { finePointer, gsap, introDelay, prefersReducedMotion, scrollToElement } from '../lib/motion'
import { ArrowDown, ArrowUpRight, Chat, GitHub, LinkedIn, Mail } from './ui'

const cut = (variant: string, ext: string) => `/${ME.cutout}${variant}-720.${ext} 720w, /${ME.cutout}${variant}-1254.${ext} 1254w`

function Cutout({ variant = '', className = '' }: { variant?: string; className?: string }) {
  return (
    <picture className="flex h-full justify-center">
      <source type="image/avif" srcSet={cut(variant, 'avif')} sizes="(min-width: 1024px) 50vw, 100vw" />
      <img src={`/${ME.cutout}${variant}-720.webp`} srcSet={cut(variant, 'webp')} sizes="(min-width: 1024px) 50vw, 100vw" alt="" fetchPriority="high" className={className} />
    </picture>
  )
}

// Each letter in its own mask so the name can rise in one character at a time.
const Letters = ({ text }: { text: string }) => (
  <>
    {text.split('').map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
        <span data-hero-letter className="inline-block">
          {ch === ' ' ? ' ' : ch}
        </span>
      </span>
    ))}
  </>
)

export const SOCIALS = [
  { href: `mailto:${ME.email}`, label: 'Email', icon: Mail },
  { href: `https://wa.me/${ME.whatsapp}`, label: 'WhatsApp', icon: Chat },
  { href: ME.linkedin, label: 'LinkedIn', icon: LinkedIn },
  { href: ME.github, label: 'GitHub', icon: GitHub },
]

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const photoIn = useRef<HTMLDivElement>(null)

  // Desktop: a circle of colour follows the pointer over the greyscale portrait.
  useEffect(() => {
    const el = photo.current
    if (!el || !finePointer() || prefersReducedMotion()) return
    const state = { x: 50, y: 40, r: 0 }
    const apply = () => {
      el.style.setProperty('--x', `${state.x}%`)
      el.style.setProperty('--y', `${state.y}%`)
      el.style.setProperty('--r', `${state.r}px`)
    }
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      const inside = e.clientX > b.left && e.clientX < b.right && e.clientY > b.top && e.clientY < b.bottom
      gsap.to(state, {
        x: ((e.clientX - b.left) / b.width) * 100,
        y: ((e.clientY - b.top) / b.height) * 100,
        r: inside ? 190 : 0,
        duration: 0.6,
        ease: 'power3.out',
        onUpdate: apply,
        overwrite: true,
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: introDelay(0.05) })
      tl.from('[data-hero-letter]', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.035 })
        .from(photoIn.current, { yPercent: 18, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0.25)
        .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }, 0.7)

      // Scrolling away: the two name lines slide apart, the outline fills in and the photo drifts up.
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('[data-name-a]', { xPercent: -14, ease: 'none', scrollTrigger: st })
      gsap.to('[data-name-b]', { xPercent: 14, ease: 'none', scrollTrigger: st })
      gsap.to('[data-name-a]', { color: '#0a0909', ease: 'none', scrollTrigger: { ...st, end: '40% top' } })
      gsap.to(photo.current, { yPercent: -10, scale: 1.04, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative mx-auto flex h-[100svh] max-h-[72rem] min-h-[620px] w-full max-w-[120rem] flex-col overflow-hidden bg-paper pt-24">
      {/* Soft warm light behind the portrait */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[30%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-sand/45 blur-[110px]" />

      {/* The name sits in front of the portrait, so it can always be read in full */}
      <h1 className="pointer-events-none relative z-20 px-4 font-display font-bold uppercase leading-[0.82] tracking-[-0.055em] sm:px-8" aria-label={ME.name}>
        <span data-name-a className="text-outline-ink block text-[clamp(4.5rem,23vw,9rem)] sm:text-[clamp(4rem,min(17vw,24svh),19rem)]" aria-hidden="true">
          <Letters text={ME.first} />
        </span>
        <span data-name-b className="text-halo block text-right text-[clamp(3rem,15.5vw,6rem)] sm:text-[clamp(3rem,min(12.5vw,17.5svh),14rem)]" aria-hidden="true">
          <Letters text={ME.last} />
        </span>
      </h1>

      {/* Portrait: greyscale, with a colour reveal under the pointer */}
      <div
        ref={photo}
        className="pointer-events-none relative z-10 -mt-6 min-h-0 w-full flex-1 overflow-hidden lg:-mt-[5svh]"
        style={{ '--x': '50%', '--y': '40%', '--r': '0px' } as CSSProperties}
      >
        {/* The entrance animates this inner layer; the scroll drift moves the outer one, so they never fight. */}
        <div ref={photoIn} className="relative h-full">
          <Cutout variant="-grey" className="mx-auto block h-full w-auto max-w-none object-contain object-bottom" />
          <div className="absolute inset-0 [clip-path:circle(var(--r)_at_var(--x)_var(--y))]">
            <Cutout className="mx-auto block h-full w-auto max-w-none object-contain object-bottom" />
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-px h-1/4 bg-gradient-to-t from-paper via-paper/70 to-transparent" />
      </div>

      {/* Bottom row */}
      <div className="relative z-20 -mt-10 grid gap-6 bg-gradient-to-t from-paper via-paper to-transparent px-4 pb-6 pt-10 sm:px-8 sm:pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:grid-cols-[1fr_auto] lg:items-end lg:bg-none lg:pt-0">
        <div className="max-w-sm" data-hero-fade>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{ME.role}</h2>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">{ME.pitch}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => scrollToElement('#work')} className="btn btn-ink !py-3" data-magnetic>
              See my work <ArrowDown size={16} />
            </button>
            <button onClick={() => scrollToElement('#contact')} className="btn btn-line !py-3" data-magnetic>
              Let's talk <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
        <ul className="hidden flex-col items-end gap-2 lg:flex" data-hero-fade>
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="chip transition-colors hover:border-ink hover:bg-ink hover:text-paper" data-magnetic>
                <s.icon size={15} /> {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

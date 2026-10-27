import type { ReactNode } from 'react'
import { ME } from '../data'
import { scrollToTop } from '../lib/motion'
import { Logo } from './Nav'
import { ArrowUpRight, Chat, GitHub, LinkedIn, Mail } from './ui'

export default function Contact() {
  // The big button goes to the best channel that is filled in.
  const primary = ME.email ? `mailto:${ME.email}?subject=New%20website%20project` : ME.whatsapp ? `https://wa.me/${ME.whatsapp}` : ME.github
  const links = [
    ME.email && { href: `mailto:${ME.email}`, label: ME.email, icon: <Mail size={18} /> },
    ME.whatsapp && { href: `https://wa.me/${ME.whatsapp}`, label: 'WhatsApp', icon: <Chat size={18} /> },
    ME.linkedin && { href: ME.linkedin, label: 'LinkedIn', icon: <LinkedIn size={18} /> },
    { href: ME.github, label: 'GitHub', icon: <GitHub size={18} /> },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[]

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-36">
      <div aria-hidden="true" className="animate-orb pointer-events-none absolute -bottom-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-ember/25 blur-[140px]" />

      <div className="relative mx-auto max-w-[90rem]">
        <span className="eyebrow" data-reveal>
          Have a project in mind?
        </span>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <h2 data-split className="font-display text-[clamp(3rem,9.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
            Let's make yours the site they <span className="font-serif font-normal italic tracking-[-0.02em] text-ember-soft">book from.</span>
          </h2>
          <a
            href={primary}
            target={primary.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="group relative flex h-40 w-40 shrink-0 items-center justify-center justify-self-start overflow-hidden rounded-full bg-ember text-ink sm:h-52 sm:w-52 lg:justify-self-end"
            data-magnetic
            data-reveal="0.2"
          >
            <span aria-hidden="true" className="absolute inset-0 scale-0 rounded-full bg-cream transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
            <span className="relative flex flex-col items-center gap-1 text-center font-semibold">
              <ArrowUpRight size={30} className="transition-transform duration-500 group-hover:rotate-45" />
              Start a project
            </span>
          </a>
        </div>

        <div className="mt-20 flex flex-wrap gap-3" data-reveal>
          {links.map((l) => (
            <a key={l.href} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="btn btn-line" data-magnetic>
              {l.icon} {l.label}
            </a>
          ))}
        </div>

        <footer className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p>
            © {new Date().getFullYear()} {ME.name}. Designed and built by hand.
          </p>
          <button onClick={() => scrollToTop()} className="self-start text-cream/80 transition-colors hover:text-ember sm:self-auto">
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  )
}

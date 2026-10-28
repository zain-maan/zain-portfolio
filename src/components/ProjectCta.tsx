import { waLink, type Project } from '../data'
import { ArrowUpRight } from './ui'

// Small call to action under each demo: opens WhatsApp with a message about that project already typed.
export default function ProjectCta({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <a
      href={waLink(`Hi Zain, I saw your ${project.name} demo. I'd like something like this for my business.`)}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${className}`}
    >
      <span className="text-ink/70">Want something like this for your business?</span>
      <span className="inline-flex items-center gap-1 font-semibold text-clay underline decoration-clay/40 underline-offset-4 transition-colors group-hover:decoration-clay">
        Let's talk <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </a>
  )
}

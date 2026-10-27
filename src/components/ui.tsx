import type { ImgHTMLAttributes, SVGProps } from 'react'

// A screenshot from public/work: AVIF with a WebP fallback, at the two widths we export.
export function Shot({ name, mobile = false, sizes, ...rest }: { name: string; mobile?: boolean; sizes?: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const [a, b] = mobile ? [390, 780] : [1280, 1920]
  const set = (ext: string) => `/work/${name}-${a}.${ext} ${a}w, /work/${name}-${b}.${ext} ${b}w`
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img src={`/work/${name}-${a}.webp`} srcSet={set('webp')} sizes={sizes} loading="lazy" decoding="async" alt="" {...rest} />
    </picture>
  )
}

type IconProps = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 18) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true })

export const ArrowUpRight = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
export const ArrowDown = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)
export const GitHub = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)
export const Mail = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)
export const Chat = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5Z" />
  </svg>
)

import { useLayoutEffect, type RefObject } from 'react'
import { gsap, prefersReducedMotion, SplitText } from './motion'

// Scroll animations for everything inside `scope`, driven by data attributes:
//   data-reveal="0.1"   fade and lift in (value = delay in seconds)
//   data-split          heading rises in line by line from behind a mask
//   data-speed="0.15"   parallax drift while scrolling (positive = slower than the page)
//   data-clip           image box opens from the bottom like a curtain, photo settles from a zoom
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const once = (el: Element, start = 'top 88%') => ({ trigger: el, start, once: true })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', delay: Number(el.dataset.reveal) || 0, scrollTrigger: once(el) })
      })

      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              ease: 'power4.out',
              stagger: 0.08,
              delay: Number(el.dataset.split) || 0,
              scrollTrigger: once(el, 'top 90%'),
            }),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: once(el, 'top 85%') })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', duration: 1.3, ease: 'expo.inOut' })
        const img = el.querySelector('img')
        if (img) tl.from(img, { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0.2)
      })

      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = Number(el.dataset.speed)
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          { yPercent: speed * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    }, scope)
    return () => ctx.revert()
  }, [scope])
}

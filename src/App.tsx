import { useEffect, useRef } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Services from './components/Services'
import Work from './components/Work'
import { ScrollTrigger, startSmoothScroll } from './lib/motion'
import { useReveal } from './lib/useReveal'

export default function App() {
  const main = useRef<HTMLElement>(null)
  useEffect(() => startSmoothScroll(), [])

  // Fonts and screenshots change the page height after first paint, so re-measure scroll animations once they are in.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
  useReveal(main)

  return (
    <div className="grain">
      <Loader />
      <Cursor />
      <Nav />
      <main ref={main}>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
    </div>
  )
}

// Everything personal lives here, so the site can be updated without touching components.
export const ME = {
  name: 'Zain Ul Abideen',
  first: 'Zain',
  role: 'Web designer & developer',
  // Add an email or WhatsApp number (digits only, with country code) to show those buttons.
  email: 'cs.zainulabideen@gmail.com',
  whatsapp: '923474170955',
  github: 'https://github.com/zain-maan',
  linkedin: 'https://www.linkedin.com/in/zainulabideen113',
  // Name of the photo in public/, exported as <photo>-640 and <photo>-1200 in AVIF and WebP.
  photo: 'me',
}

export type Project = {
  id: string
  index: string
  name: string
  kind: string
  sector: string
  year: string
  summary: string
  problem: string
  features: string[]
  stack: string[]
  live: string
  code: string
  shots: string[] // desktop screenshots in public/work, cycled in the browser frame
  mobile: string
  theme: { bg: string; fg: string; muted: string; accent: string; line: string }
}

export const PROJECTS: Project[] = [
  {
    id: 'lumen',
    index: '01',
    name: 'Lumen Stay',
    kind: 'Resort website + direct booking',
    sector: 'Hospitality',
    year: '2026',
    summary: 'A boutique cliffside resort site that turns visitors into direct bookings instead of sending them to Booking.com.',
    problem:
      'Small hotels hand 15 to 25% of every booking to OTAs because their own sites feel dated and booking is hard. Lumen Stay feels as premium as the property, and a guest goes from the homepage to a confirmed stay in under two minutes.',
    features: [
      'Live availability calendar and a 4-step booking flow',
      'WebGL ocean hero and a scroll-driven villa tour',
      'Trip planner and an AI concierge chat',
      'AVIF photos and code-split pages, quick on any phone',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'Three.js', 'Tailwind'],
    live: 'https://lumen-stay.vercel.app',
    code: 'https://github.com/zain-maan/Lumen-Stay',
    shots: ['lumen-desk', 'lumen-villas', 'lumen-book'],
    mobile: 'lumen-mob',
    theme: { bg: '#0b3a40', fg: '#f8f2e9', muted: 'rgba(248,242,233,0.62)', accent: '#f6a45e', line: 'rgba(248,242,233,0.14)' },
  },
  {
    id: 'glow',
    index: '02',
    name: 'Glow Studio',
    kind: 'Salon booking + owner dashboard',
    sector: 'Beauty & wellness',
    year: '2026',
    summary: 'Online booking for a Dubai salon, with a dashboard where the owner runs the whole day.',
    problem:
      'Most salons still book over WhatsApp and phone calls: clients wait for replies and stylists get double-booked. Glow Studio lets clients pick a treatment, stylist and real free slot in under a minute, and shows the owner revenue, clients and the team at a glance.',
    features: [
      'Real-time slots per stylist, with no double bookings',
      'Owner dashboard: revenue, appointments, clients and team',
      '3D glow bubble and a physics treatment picker',
      'Built for phones, down to the dashboard tab bar',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'Three.js', 'Matter.js'],
    live: 'https://glow-studio-olive.vercel.app',
    code: 'https://github.com/zain-maan/Glow-Studio',
    shots: ['glow-desk', 'glow-services', 'glow-admin'],
    mobile: 'glow-mob',
    theme: { bg: '#f7e4ea', fg: '#2b1330', muted: 'rgba(43,19,48,0.62)', accent: '#e2487d', line: 'rgba(43,19,48,0.12)' },
  },
]

export const SERVICES = [
  {
    title: 'Business websites',
    text: 'Fast, premium sites for hotels, salons, clinics and shops. Designed to look expensive and turn visitors into customers.',
    tags: ['Design', 'Development', 'SEO basics'],
  },
  {
    title: 'Booking systems',
    text: 'Real availability, online booking and confirmations, so clients book themselves instead of waiting on WhatsApp.',
    tags: ['Calendars', 'Payments-ready', 'Notifications'],
  },
  {
    title: 'Dashboards',
    text: 'One clear screen for the owner: bookings, revenue, clients and the team, on desktop and on the phone.',
    tags: ['Admin panels', 'Charts', 'Reports'],
  },
  {
    title: 'Motion & 3D',
    text: 'Scroll animations, WebGL and micro-interactions that make a brand feel alive, without slowing the site down.',
    tags: ['GSAP', 'Three.js', 'Interactions'],
  },
]

export const PROCESS = [
  { step: '01', title: 'Talk', text: 'A short call about your business, your customers and what the site must do.' },
  { step: '02', title: 'Design', text: 'A clear plan and a look for the key pages, shaped together before any code.' },
  { step: '03', title: 'Build', text: 'Development with a live preview link, so you see progress every few days.' },
  { step: '04', title: 'Launch', text: 'Domain, speed checks and hand-over. Small fixes after launch are included.' },
]

export const STACK = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'Three.js', 'Node.js', 'Python', 'FastAPI', 'Vercel']

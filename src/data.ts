// Everything personal lives here, so the site can be updated without touching components.
export const ME = {
  name: 'Zain Ul Abideen',
  first: 'Zain',
  last: 'Ul Abideen',
  role: 'Web, App & AI Developer',
  pitch: 'I build fast websites, apps and AI agents that win clients and save hours, from the first sketch to launch.',
  email: 'cs.zainulabideen@gmail.com',
  whatsapp: '923474170955',
  github: 'https://github.com/zain-maan',
  linkedin: 'https://www.linkedin.com/in/zainulabideen113',
  // Name of the photo in public/, exported as <photo>-640 and <photo>-1200 in AVIF and WebP.
  photo: 'me',
  // Background-removed photo for the hero (<cutout>-720 / -1254, plus a -grey version).
  cutout: 'me-cut',
}

// WhatsApp chat link, optionally with a message already typed in.
export const waLink = (text?: string) => `https://wa.me/${ME.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export type Category = 'Web' | 'App' | 'AI'

export type Project = {
  id: string
  name: string
  category: Category
  // Every project is a self-built demo with sample data, not client work.
  status: 'Live demo' | 'Demo'
  year: string
  kind: string
  outcome: string
  problem: string
  solution: string
  features: string[]
  stack: string[]
  live?: string
  code?: string
  shots: string[] // desktop screenshots in public/work
  mobile?: string
  visual?: 'mindai' // a designed visual instead of screenshots
  team?: string // shown on the case study when the project was not built solo
  tone: string // card background behind the screens
}

export const PROJECTS: Project[] = [
  {
    id: 'glow',
    name: 'Glow Studio',
    category: 'Web',
    status: 'Live demo',
    year: '2026',
    kind: 'Salon booking + owner dashboard',
    outcome: 'Demo booking site + owner dashboard for salons.',
    problem: 'Most salons still book over WhatsApp and calls: clients wait for replies, stylists get double-booked and the owner has no clear numbers.',
    solution:
      'Clients pick a treatment, stylist and a real free slot in under a minute. The owner gets a dashboard for revenue, appointments, clients and team occupancy, on desktop and phone.',
    features: [
      'Real-time slots per stylist, no double bookings',
      'Owner dashboard: revenue, appointments, clients, team',
      '3D glow bubble and a physics treatment picker',
      'Phone-first, down to the dashboard tab bar',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'Three.js', 'Matter.js'],
    live: 'https://glow-studio-olive.vercel.app',
    code: 'https://github.com/zain-maan/Glow-Studio',
    shots: ['glow-desk', 'glow-services', 'glow-admin'],
    mobile: 'glow-mob',
    tone: '#f3dde5',
  },
  {
    id: 'lumen',
    name: 'Lumen Stay',
    category: 'Web',
    status: 'Live demo',
    year: '2026',
    kind: 'Resort website + direct booking',
    outcome: 'Demo resort website where guests can book direct in under two minutes.',
    problem:
      'Small hotels hand 15 to 25% of every booking to OTAs like Booking.com, because their own websites feel dated and booking is hard.',
    solution:
      'A site that feels as premium as the property: a WebGL ocean hero, a scroll-driven villa tour and a 4-step booking flow with live availability, so guests book with the hotel instead of an OTA.',
    features: [
      'Live availability calendar and 4-step booking',
      'WebGL ocean hero and scroll-driven villa tour',
      'Trip planner that recommends a villa',
      'AI concierge chat',
      'AVIF photos and code-split pages, fast on phones',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'Three.js', 'Tailwind'],
    live: 'https://lumen-stay.vercel.app',
    code: 'https://github.com/zain-maan/Lumen-Stay',
    shots: ['lumen-desk', 'lumen-villas', 'lumen-book'],
    mobile: 'lumen-mob',
    tone: '#0b3a40',
  },
  {
    id: 'ember',
    name: 'Ember',
    category: 'Web',
    status: 'Live demo',
    year: '2026',
    kind: 'Café & restaurant website + online ordering',
    outcome: 'Demo café-restaurant site where guests order ahead or book a table in under a minute.',
    problem:
      'Most cafés and restaurants have a menu PDF and a phone number for a website, so guests order through delivery apps that take 25 to 35% commission, or go elsewhere.',
    solution:
      'One site for a café by day and a fire-cooked kitchen by night: a day/night switch changes the whole look and menu, the menu adds straight to a pickup or delivery order, and a 3-step booking ends with a calendar invite. An AI host can start a booking from one sentence.',
    features: [
      'Day/night mood switch that re-themes the whole site',
      'Online ordering: filters, cart, checkout, live order tracker',
      'Table booking with live times and an Add to calendar ticket',
      'Drink builder with a realistic animated cup',
      'AI host that books "a table for 4 tomorrow at 7"',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'WebGL', 'Tailwind'],
    live: 'https://ember-cafe-one.vercel.app',
    code: 'https://github.com/zain-maan/Ember-Cafe',
    shots: ['ember-desk', 'ember-cup', 'ember-reserve'],
    mobile: 'ember-mob',
    tone: '#2a160b',
  },
  {
    id: 'corpmind',
    name: 'CorpMind',
    category: 'AI',
    status: 'Demo',
    year: '2026',
    kind: 'Multi-agent company knowledge assistant',
    outcome: 'Demo company assistant: staff ask one chat, the right department agent answers with sources.',
    problem: 'Staff waste hours searching emails, PDFs and policy documents, and sensitive answers must stay within the right roles and branches.',
    solution:
      'An orchestrator routes each question to an HR, Finance, IT or Legal agent, which answers only from approved company documents with citations. Role- and branch-based access keeps data where it belongs, and leave or expense requests are drafted automatically.',
    features: [
      'Orchestrator routing to HR, Finance, IT and Legal agents',
      'RAG over company documents with citations',
      'Role and branch based access control',
      'AI-drafted leave and expense requests with approvals',
      'Multi-company, multi-branch, private chat history',
    ],
    stack: ['FastAPI', 'Multi-agent', 'Groq (LLM)', 'Qdrant', 'FastEmbed', 'PostgreSQL', 'Docker'],
    team: 'Built with a small team',
    code: 'https://github.com/zain-maan/CorpMind',
    shots: ['corp-desk', 'corp-chat', 'corp-dash', 'corp-agents', 'corp-library'],
    tone: '#0c2b2a',
  },
  {
    id: 'mindai',
    name: 'MindAI',
    category: 'App',
    status: 'Demo',
    year: '2026',
    kind: 'AI study app · web + Android',
    outcome: 'Demo study app (web + Android) that turns any document into chat, quizzes and flashcards.',
    problem: 'Students jump between PDFs, notes, quiz apps and YouTube, and still do not know which topics they are weak at.',
    solution:
      'One app, on the web and as an Android app: upload notes or a lecture and MindAI answers with citations, builds adaptive quizzes and spaced-repetition flashcards, and tracks weak topics. Study rooms let classmates learn together in real time.',
    features: [
      'Chat with citations to the exact page or slide',
      'Adaptive quizzes and SM-2 flashcards',
      'Lecture-to-notes from audio, video or YouTube (Whisper)',
      'Real-time study rooms with an @MindAI moderator',
      'Android app (Capacitor) and installable PWA',
    ],
    stack: ['React 19', 'TypeScript', 'FastAPI', 'RAG', 'WebSockets', 'Capacitor'],
    code: 'https://github.com/zain-maan/MindAI',
    shots: [],
    visual: 'mindai',
    tone: '#1f1b3a',
  },
  {
    id: 'aria',
    name: 'Aria',
    category: 'AI',
    status: 'Demo',
    year: '2026',
    kind: 'AI voice receptionist for clinics',
    outcome: 'Demo AI voice receptionist for clinics: answers calls, books appointments and flags emergencies.',
    problem: 'Clinics miss calls during busy hours and after closing, and every missed call is a lost patient.',
    solution:
      'Aria answers in a natural voice, checks live availability, books, moves or cancels appointments, answers insurance and price questions, and sends red-flag symptoms to the team. Every call lands in a dashboard with a transcript.',
    features: [
      'Hands-free voice calls in the browser',
      'Books, reschedules and cancels in the real diary',
      'Guard rails in code: reads details back before booking',
      'Emergency detection with an urgent team alert',
      'Clinic dashboard with outcomes and transcripts',
    ],
    stack: ['FastAPI', 'Groq', 'Whisper', 'Tool calling', 'TTS', 'React'],
    live: 'https://aria-ai-receptionist-lake.vercel.app',
    code: 'https://github.com/zain-maan/Aria-AI-Receptionist',
    shots: ['aria-desk', 'aria-dash'],
    mobile: 'aria-mob',
    tone: '#0d1430',
  },
  {
    id: 'zarri',
    name: 'Zarri',
    category: 'AI',
    status: 'Demo',
    year: '2026',
    kind: 'WhatsApp AI sales agent',
    outcome: 'Demo WhatsApp sales agent that sells in Urdu, Roman Urdu and English.',
    problem: 'Small brands in Pakistan sell on WhatsApp, and messages that arrive at night or in an Eid rush wait hours, so customers buy elsewhere.',
    solution:
      'Zoya, the AI agent, replies in the customer’s own language, checks real stock and prices, builds the cart and places cash-on-delivery orders, and hands complaints to a person. The owner sees every chat and order live.',
    features: [
      'Replies in Urdu, Roman Urdu or English',
      'Real stock and prices via tool calls, never invented',
      'Cart, checkout and order tracking',
      'Human handoff for complaints and refunds',
      'Owner dashboard: sales, inbox, orders, stock',
    ],
    stack: ['FastAPI', 'Groq', 'WhatsApp Cloud API', 'Agents', 'React'],
    shots: ['zarri-desk', 'zarri-dash', 'zarri-inbox'],
    mobile: 'zarri-mob',
    tone: '#123528',
  },
]


export const SERVICES = [
  {
    title: 'Web Design & Development',
    text: 'Premium, fast websites for hotels, salons, clinics and shops, with booking flows that turn visitors into customers.',
    tags: ['React', 'Next.js', 'GSAP', 'Three.js', 'SEO basics'],
  },
  {
    title: 'Mobile Apps',
    text: 'Cross-platform apps in Flutter and Dart, plus installable web apps, so your product reaches every phone from one codebase.',
    tags: ['Flutter', 'Dart', 'Android', 'Capacitor', 'PWA'],
  },
  {
    title: 'AI Agents & Automation',
    text: 'Voice receptionists, WhatsApp sales agents and company assistants that answer, book and sell around the clock.',
    tags: ['LLM agents', 'RAG', 'Voice AI', 'n8n', 'WhatsApp'],
  },
  {
    title: 'Dashboards & Backends',
    text: 'Owner dashboards, admin panels and APIs: bookings, revenue, clients and the team on one clear screen.',
    tags: ['FastAPI', 'PostgreSQL', 'Auth', 'Charts'],
  },
]

export const SKILLS = [
  { group: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'Three.js', 'Matter.js', 'Lenis'], usedIn: ['Lumen Stay', 'Glow Studio', 'Aria'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'Alembic', 'JWT auth', 'WebSockets', 'Docker'], usedIn: ['CorpMind', 'MindAI', 'Zarri'] },
  { group: 'AI', items: ['LLM agents', 'Tool calling', 'Multi-agent', 'RAG', 'LangChain', 'LangGraph', 'Qdrant', 'FAISS', 'Groq', 'OpenAI', 'Whisper', 'Text-to-speech'], usedIn: ['Aria', 'Zarri', 'CorpMind', 'MindAI'] },
  { group: 'Automation', items: ['n8n', 'WhatsApp Cloud API', 'Google Workspace APIs', 'Webhooks'], usedIn: ['Zarri'] },
  { group: 'Mobile', items: ['Flutter', 'Dart', 'Capacitor', 'Android', 'PWA'], usedIn: ['MindAI'] },
  { group: 'Deploy', items: ['Vercel', 'Render', 'Hugging Face', 'Docker', 'Git', 'GitHub'], usedIn: ['Glow Studio', 'Lumen Stay', 'Aria'] },
]

export const PROCESS = [
  { step: '01', title: 'Talk', text: 'A short call about your business, your customers and what the product must do.' },
  { step: '02', title: 'Design', text: 'A clear plan and a look for the key screens, shaped together before any code.' },
  { step: '03', title: 'Build', text: 'Development with a live preview link, so you see progress every few days.' },
  { step: '04', title: 'Launch', text: 'Deploy, speed and mobile checks, and a clear hand-over so you can run it.' },
]

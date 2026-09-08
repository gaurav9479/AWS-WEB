import { useRef } from 'react'
import { motion } from 'framer-motion'
import Reveal from './common/Reveal'
import { staggerContainer, staggerItem } from './common/motion'

// Replace with real past-event data as it becomes available.
const EVENTS = [
  {
    name: 'Cloud Sprint 1.0',
    date: 'Feb 2025',
    stat: '120+ builders',
    body: 'Our first campus-wide build weekend — teams shipped 30 working prototypes in 24 hours.',
    gradient: 'from-pink-500/70 to-navy-900',
  },
  {
    name: 'Serverless Saturday',
    date: 'Apr 2025',
    stat: '18 workshops',
    body: 'A single-day deep dive into Lambda and API Gateway, capped with a mini build sprint.',
    gradient: 'from-navy-600 to-navy-900',
  },
  {
    name: 'Build Night: ML Edition',
    date: 'Aug 2025',
    stat: '40 teams',
    body: 'An evening hackathon focused on shipping small, useful ML-powered tools.',
    gradient: 'from-pink-400/60 to-navy-900',
  },
  {
    name: 'SBG Orientation Hack',
    date: 'Sep 2025',
    stat: '200+ attendees',
    body: 'First-years met the club and shipped their first project in a single afternoon.',
    gradient: 'from-navy-600 to-navy-900',
  },
  {
    name: 'Cloud Sprint 2.0',
    date: 'Jan 2026',
    stat: '150+ builders',
    body: 'Round two of our flagship build weekend, now with an alumni mentor track.',
    gradient: 'from-pink-500/70 to-navy-900',
  },
]

export default function PastEvents() {
  const scrollerRef = useRef(null)

  const scrollByCards = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal as="p" className="text-sm font-medium text-pink-500">
              Our past events
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl"
            >
              A few builds we're proud of
            </Reveal>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Scroll past events left"
              onClick={() => scrollByCards(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition hover:border-pink-500 hover:text-pink-500"
            >
              <ArrowIcon flip />
            </button>
            <button
              type="button"
              aria-label="Scroll past events right"
              onClick={() => scrollByCards(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition hover:border-pink-500 hover:text-pink-500"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollerRef}
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {EVENTS.map((ev) => (
            <motion.article
              key={ev.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="w-[78%] flex-none snap-start overflow-hidden rounded-3xl border border-navy-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-[45%] lg:w-[31%]"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${ev.gradient} p-5`}>
                <div className="absolute inset-0 bg-grid opacity-20" />
                <span className="relative rounded-full bg-navy-900/40 px-3 py-1 text-xs text-white backdrop-blur">
                  {ev.date}
                </span>
              </div>
              <div className="p-6">
                <p className="font-display text-lg font-semibold text-navy-900">{ev.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{ev.body}</p>
                <p className="mt-4 text-xs font-medium text-pink-500">{ev.stat}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ArrowIcon({ flip = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${flip ? 'rotate-180' : ''}`}
    >
      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
    </svg>
  )
}
import { motion } from 'framer-motion'
import Reveal from './common/Reveal'
import { staggerContainer, staggerItem } from './common/motion'

const CARDS = [
  {
    title: 'Weekly build sessions',
    body: 'Drop-in evenings where members work on cloud projects side by side and trade notes.',
    icon: (
      <path d="m9 18-6-6 6-6m6 12 6-6-6-6" />
    ),
    span: 'sm:col-span-2',
  },
  {
    title: 'AWS mentorship',
    body: 'Direct access to student leads certified across AWS core services.',
    icon: <path d="M7 17a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 8.06 4.5 4.5 0 0 1 17.5 17H7Z" />,
  },
  {
    title: 'Credits & labs',
    body: 'Sandboxed AWS accounts so members can experiment without a billing worry.',
    icon: <path d="M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 0v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />,
  },
  {
    title: 'Talks & workshops',
    body: 'Short sessions on serverless, ML, and infra run by seniors and alumni.',
    icon: <path d="M12 2v6m0 0-5 4m5-4 5 4M5 12v6l7 4 7-4v-6" />,
  },
  {
    title: 'Hackathons together',
    body: 'The club fields teams for SBG Hackfest and outside hackathons alike.',
    icon: <path d="M12 2 4 13h6l-1 9 9-13h-6l1-7Z" />,
    span: 'sm:col-span-2',
  },
]

function CardIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      {children}
    </svg>
  )
}

export default function AboutClub() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-navy-600/40 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal as="p" className="text-sm font-medium text-pink-400">
            About the club
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            AWS Student Builder Group, MNNIT Allahabad
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 text-base leading-relaxed text-navy-200 sm:text-lg">
            We're a student community for anyone curious about cloud and
            building in public — workshops, mentorship, and a standing
            excuse to ship something new most weeks.
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              className={`group rounded-2xl border border-navy-700 bg-navy-800/60 p-6 transition hover:border-pink-500/40 hover:bg-navy-800 ${c.span ?? ''}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-pink-300 transition group-hover:bg-pink-500/15">
                <CardIcon>{c.icon}</CardIcon>
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-white">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
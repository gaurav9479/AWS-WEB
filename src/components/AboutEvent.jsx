import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SplitText from './common/SplitText'
import Reveal from './common/Reveal'
import { staggerContainer, staggerItem } from './common/motion'
import { useRef } from 'react'

const HIGHLIGHTS = [
  {
    title: 'Trial Arch-Mages (AWS SBG Mentors)',
    body: 'Get direct guidance from senior builder wizards to transform raw concepts into magical cloud applications.',
    icon: '🔮',
  },
  {
    title: 'Open to All Hogwarts Houses',
    body: 'Wizards from every department and year can unite, combine skills, and enter the competition.',
    icon: '🏰',
  },
  {
    title: 'Bounties & Recognition',
    body: 'Compete for championship honors, house points, AWS credits, swag, and career glory.',
    icon: '🏆',
  },
  {
    title: 'A Working Spell, Not a Report',
    body: 'Build a functioning live prototype over 24 hours and present your spellcraft directly to the judges.',
    icon: '⚡',
  },
]

function TiltCard() {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
      className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-gradient-to-b from-[#24170f] via-[#10182b] to-[#080b16] shadow-[0_0_35px_rgba(212,175,55,0.35)] sm:aspect-[5/4] lg:aspect-[4/5]"
    >
      <div
        style={{ transform: 'translateZ(30px)' }}
        className="pointer-events-none absolute inset-0 bg-hogwarts-grid opacity-30"
      />
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#5c3b80]/50 blur-[80px]"
      />
      <div
        style={{ transform: 'translateZ(60px)' }}
        className="relative flex h-full flex-col justify-between p-8 text-center sm:text-left"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[#d4af37]/60 bg-[#10182b]/80 px-4 py-1 text-xs font-bold text-[#d4af37] uppercase tracking-widest backdrop-blur">
            ROUND 1 • ONLINE TRIAL
          </span>
          <span className="text-xl animate-candle">🦉</span>
        </div>

        <div>
          <p className="font-harry text-6xl font-bold text-[#f4e8c1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            THE OWL TRIALS
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-[#d4af37]">
            Online Qualifier for All Registered Teams
          </p>
          <div className="mt-5 h-0.5 w-full bg-gradient-to-r from-[#d4af37] via-[#5c3b80] to-transparent" />
          <p className="mt-5 font-harry text-4xl font-bold text-[#f4e8c1]">
            TOP 15 TEAMS QUALIFY
          </p>
          <p className="mt-1 text-xs font-medium text-[#e8d7b5]/80 font-sans">
            Only 15 teams earn the invitation to the Great Hall Championship.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutEvent() {
  return (
    <section id="trials" className="relative bg-[#080b16] py-24 sm:py-32 border-t border-[#d4af37]/20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <Reveal as="div" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            <span>⚡</span>
            <span>ROUND 1 • ONLINE COMPETITION</span>
          </Reveal>

          <SplitText
            text="THE OWL TRIALS: Where the magical journey begins."
            className="mt-3 font-harry text-4xl font-bold text-[#f4e8c1] sm:text-6xl text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Trial Emblem Card */}
          <Reveal className="perspective-[1000px] flex w-full justify-center">
            <TiltCard />
          </Reveal>

          {/* Trial Description & Highlights */}
          <div>
            <Reveal
              as="p"
              className="text-base sm:text-lg leading-relaxed text-[#e8d7b5]/90 font-serif"
            >
              The first trial begins online. Every registered team, regardless of house assignment, competes in the initial trial sprint. Only the top 15 highest-scoring teams will unlock passage to Round 2 in the Great Hall.
            </Reveal>

            {/* Highlights Grid */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.title}
                  variants={staggerItem}
                  className="rounded-xl border border-[#d4af37]/30 bg-gradient-to-br from-[#10182b] to-[#080b16] p-4 transition hover:border-[#d4af37]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{h.icon}</span>
                    <p className="font-display text-sm font-bold text-[#d4af37]">
                      {h.title}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#e8d7b5]/80 font-sans">
                    {h.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Timeline Flow Bar */}
            <div className="mt-10 rounded-xl border border-[#d4af37]/40 bg-[#10182b]/80 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37] text-center mb-3">
                THE TRIAL PROGRESSION
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#f4e8c1]">
                <span className="rounded bg-[#24170f] px-2.5 py-1 border border-[#d4af37]/30">REGISTRATION</span>
                <span className="text-[#d4af37]">→</span>
                <span className="rounded bg-[#24170f] px-2.5 py-1 border border-[#d4af37]/30">SORTING</span>
                <span className="text-[#d4af37]">→</span>
                <span className="rounded bg-[#5c3b80]/40 px-2.5 py-1 border border-[#9d4edf]">OWL TRIALS</span>
                <span className="text-[#d4af37]">→</span>
                <span className="rounded bg-[#d4af37]/20 px-2.5 py-1 border border-[#d4af37] text-[#d4af37]">TOP 15 QUALIFY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
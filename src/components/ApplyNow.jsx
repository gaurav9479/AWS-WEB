import { motion } from 'framer-motion'
import Reveal from './common/Reveal'
import { staggerContainer, staggerItem } from './common/motion'
import { APPLY_URL } from '../config'

const DETAILS = [
  { label: 'Team size', value: '3–4 builders' },
  { label: 'Format', value: '24 hours, on campus' },
  { label: 'Cost', value: 'Free to enter' },
]

export default function ApplyNow() {
  return (
    <section id="apply-now" className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <motion.div 
        animate={{ scale: [1, 1.15, 0.9, 1], rotate: [0, 90, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/25 blur-[160px]" 
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal
          as="h2"
          className="text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
        >
          Bring your team. Build something real.
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          className="text-balance mx-auto mt-5 max-w-xl text-base text-navy-200 sm:text-lg"
        >
          Registration is open for SBG Hackfest. Save your team's spot before
          slots run out.
        </Reveal>

        <Reveal delay={0.16} className="mt-9">
          <motion.a
            href={APPLY_URL}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-full bg-pink-500 px-9 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(255,47,126,0.45)] transition hover:bg-pink-400 hover:shadow-[0_0_50px_rgba(255,47,126,0.6)]"
          >
            Apply now
          </motion.a>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {DETAILS.map((d) => (
            <motion.div
              key={d.label}
              variants={staggerItem}
              className="rounded-2xl border border-navy-700 bg-navy-800/60 px-4 py-5"
            >
              <p className="font-display text-base font-semibold text-white">{d.value}</p>
              <p className="mt-1 text-xs text-navy-200">{d.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
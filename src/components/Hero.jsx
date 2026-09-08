import { motion } from 'framer-motion'
import OrbitChip from './visuals/OrbitChip'
import { staggerContainer, staggerItem } from './common/motion'
import { APPLY_URL } from '../config'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* background treatment */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-pink-500/25 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 left-[-10%] h-[420px] w-[420px] rounded-full bg-navy-600/40 blur-[130px]" />

      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.div
          variants={staggerItem}
          className="inline-flex items-center gap-2 rounded-full border border-navy-600 bg-navy-800/70 px-4 py-1.5 text-sm text-navy-200 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
          Presented by AWS Student Builder Group, MNNIT Allahabad
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="text-balance mt-7 bg-gradient-to-b from-white to-navy-200 bg-clip-text font-display text-5xl font-semibold leading-[1.05] text-transparent sm:text-7xl"
        >
          SBG Hackfest
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-balance mt-6 max-w-xl text-base text-navy-200 sm:text-lg"
        >
          A weekend for MNNIT students to turn rough ideas into working
          builds — ship a project, learn from mentors, and meet the rest of
          the campus builder community.
        </motion.p>

        <motion.div variants={staggerItem} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={APPLY_URL}
            className="rounded-full bg-pink-500 px-7 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(255,47,126,0.4)] transition hover:bg-pink-400 hover:shadow-[0_0_40px_rgba(255,47,126,0.55)]"
          >
            Apply now
          </a>
          <a
            href="#about-event"
            className="rounded-full border border-navy-600 px-7 py-3 text-sm font-medium text-navy-200 transition hover:border-pink-400/60 hover:text-white"
          >
            What is Hackfest?
          </a>
        </motion.div>

        <motion.div variants={staggerItem} className="mt-16 w-full sm:mt-20">
          <OrbitChip />
        </motion.div>
      </motion.div>
    </section>
  )
}
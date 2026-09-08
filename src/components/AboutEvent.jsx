import { motion } from 'framer-motion'
import SplitText from './common/SplitText'
import Reveal from './common/Reveal'
import { staggerContainer, staggerItem } from './common/motion'

const HIGHLIGHTS = [
  {
    title: 'Mentors from AWS SBG',
    body: 'Get unstuck fast with builders who have shipped real cloud projects.',
  },
  {
    title: 'Open to every branch',
    body: 'No prior hackathon experience needed — first-years welcome.',
  },
  {
    title: 'Prizes that matter',
    body: 'Cash prizes, swag, and fast-tracked club membership for top teams.',
  },
  {
    title: 'A real demo, not a report',
    body: 'Pitch a working build to judges instead of submitting slides.',
  },
]

export default function AboutEvent() {
  return (
    <section id="about-event" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal as="p" className="text-sm font-medium text-pink-500">
            About the event
          </Reveal>
          <SplitText
            text="One weekend to take an idea from sketch to working demo."
            className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl"
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-navy-900 sm:aspect-[5/4] lg:aspect-[4/5]">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-pink-500/30 blur-[80px]" />
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-navy-600/60 blur-[70px]" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <span className="w-fit rounded-full border border-navy-600 px-3 py-1 text-xs text-navy-200">
                Hackfest 2026
              </span>
              <div>
                <p className="font-display text-4xl font-semibold text-white">24 hrs</p>
                <p className="mt-1 text-sm text-navy-200">of building, back to back</p>
                <div className="mt-6 h-px w-full bg-navy-700" />
                <p className="mt-6 font-display text-4xl font-semibold text-white">3–4</p>
                <p className="mt-1 text-sm text-navy-200">builders per team</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal as="p" className="text-base leading-relaxed text-navy-700 sm:text-lg">
              SBG Hackfest is a campus hackathon run by the AWS Student
              Builder Group at MNNIT Allahabad. Teams pick a problem, build a
              working prototype over the weekend, and pitch it to a panel of
              judges — no polished business plan required, just something
              that runs.
            </Reveal>

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-10 grid gap-5 sm:grid-cols-2"
            >
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-navy-900/10 bg-white/60 p-5"
                >
                  <p className="font-display text-sm font-semibold text-navy-900">{h.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700/80">{h.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
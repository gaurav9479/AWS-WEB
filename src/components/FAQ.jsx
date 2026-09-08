import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './common/Reveal'

const FAQS = [
  {
    q: 'What is SBG Hackfest?',
    a: 'A weekend hackathon run by the AWS Student Builder Group at MNNIT Allahabad, where teams build a working prototype and pitch it to judges.',
  },
  {
    q: 'Who can participate?',
    a: 'Any MNNIT student, from any branch or year. No prior hackathon or club experience is required.',
  },
  {
    q: 'How do I apply?',
    a: 'Use the Apply now button above to fill out the registration form with your team details.',
  },
  {
    q: 'Is participation free?',
    a: 'Yes — there is no entry fee. Meals and workspace are provided for the duration of the event.',
  },
  {
    q: 'What team size is allowed?',
    a: 'Teams of 3 to 4 builders. If you don\u2019t have a full team yet, we\u2019ll help you find teammates at kickoff.',
  },
  {
    q: 'What happens after I register?',
    a: 'You\u2019ll get a confirmation email with the schedule, venue details, and a short pre-event checklist.',
  },
  {
    q: 'Where does it take place?',
    a: 'On the MNNIT Allahabad campus. The exact venue is shared with confirmed teams closer to the date.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative bg-navy-900 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal as="p" className="text-center text-sm font-medium text-pink-400">
          FAQ
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="text-balance mt-4 text-center font-display text-3xl font-semibold text-white sm:text-4xl"
        >
          Frequently asked questions
        </Reveal>

        <div className="mt-12 divide-y divide-navy-700 border-t border-b border-navy-700">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-white sm:text-lg">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-navy-600 text-pink-300"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-14 text-sm leading-relaxed text-navy-200 sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
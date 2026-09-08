import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './common/Reveal'

const FAQS = [
  {
    q: 'What is Hogwarts SBG Hackfest?',
    a: 'A weekend hackathon run by the AWS Student Builder Group at MNNIT Allahabad, structured into Round 1 (Online Owl Trials) and Round 2 (Offline Great Hall Championship).',
  },
  {
    q: 'Who can participate in the Hogwarts Hackfest?',
    a: 'Any MNNIT student from any branch or year. No prior hackathon or Hogwarts house experience is required!',
  },
  {
    q: 'How do we register our team?',
    a: 'Use the Accept the Invitation button to open the official registration scroll and submit your team details.',
  },
  {
    q: 'Is participation free?',
    a: 'Yes — entry is completely free. Meals, workspace, mentor support, and cloud resources are provided throughout the Great Hall offline finals.',
  },
  {
    q: 'What team size is permitted?',
    a: 'Teams of 3 to 4 wizards. If you don’t have a full team yet, we will assist you in forming a squad during the Sorting Ceremony.',
  },
  {
    q: 'What happens after our team registers?',
    a: 'You will receive an official confirmation owl email containing the trial timeline, house assignment guidelines, and pre-event checklist.',
  },
  {
    q: 'Where does the Round 2 Offline Championship take place?',
    a: 'On the MNNIT Allahabad campus. The exact Great Hall venue details will be shared with the Top 15 qualifying teams.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative bg-[#080b16] py-24 sm:py-32 border-t border-[#d4af37]/20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Reveal as="div" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            <span>📜</span>
            <span>INQUIRIES & DECREES</span>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.05}
            className="mt-3 font-harry text-4xl font-bold text-[#f4e8c1] sm:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            FREQUENTLY ASKED PARCHMENTS
          </Reveal>
        </div>

        {/* Parchment Accordion List */}
        <div className="mt-12 divide-y divide-[#d4af37]/30 rounded-xl border border-[#d4af37]/40 bg-gradient-to-b from-[#10182b] via-[#24170f]/80 to-[#080b16] p-4 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 text-left focus:outline-none"
                >
                  <span className="font-harry text-2xl font-bold text-[#f4e8c1] hover:text-[#d4af37] transition">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#d4af37]/50 text-[#d4af37]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
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
                      <p className="pt-3 pb-2 pr-10 text-sm leading-relaxed text-[#e8d7b5]/90 font-sans">
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
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './common/Reveal'
import { APPLY_URL } from '../config'

// Custom Vector SVG Crest Icons for Houses & Hat
const HouseIcons = {
  Gryffindor: (
    <svg className="h-9 w-9 text-[#d3a625]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 7v6c0 5.25 3.5 10 8 11 4.5-1 8-5.75 8-11V7l-8-5z" />
      <path d="M12 6v12" />
      <path d="M8 10h8" />
    </svg>
  ),
  Slytherin: (
    <svg className="h-9 w-9 text-[#aaaaaa]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 7v6c0 5.25 3.5 10 8 11 4.5-1 8-5.75 8-11V7l-8-5z" />
      <path d="M8 14c2 2 6 2 8 0" />
      <path d="M12 8v4" />
    </svg>
  ),
  Ravenclaw: (
    <svg className="h-9 w-9 text-[#946b2d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 7v6c0 5.25 3.5 10 8 11 4.5-1 8-5.75 8-11V7l-8-5z" />
      <path d="M9 12l3-3 3 3" />
      <path d="M12 9v7" />
    </svg>
  ),
  Hufflepuff: (
    <svg className="h-9 w-9 text-[#ecb939]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 7v6c0 5.25 3.5 10 8 11 4.5-1 8-5.75 8-11V7l-8-5z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  SortingHat: (
    <svg className="h-10 w-10 text-[#d4af37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-7z" />
      <path d="M9 22V12h6v10" />
      <circle cx="12" cy="7" r="1.5" />
    </svg>
  ),
}

const HOUSES = [
  {
    id: 'gryffindor',
    name: 'GRYFFINDOR',
    icon: HouseIcons.Gryffindor,
    traits: 'Courage • Leadership • Innovation',
    color: 'from-[#740001]/90 to-[#3a0000]/90',
    borderColor: 'border-[#d3a625]',
    glowColor: 'shadow-[0_0_30px_rgba(211,166,37,0.4)]',
    accentColor: '#d3a625',
    desc: 'Brave builders who dare to tackle the boldest technical challenges and pioneer new cloud frontiers.',
  },
  {
    id: 'slytherin',
    name: 'SLYTHERIN',
    icon: HouseIcons.Slytherin,
    traits: 'Ambition • Strategy • Excellence',
    color: 'from-[#1a472a]/90 to-[#0d2415]/90',
    borderColor: 'border-[#aaaaaa]',
    glowColor: 'shadow-[0_0_30px_rgba(170,170,170,0.4)]',
    accentColor: '#aaaaaa',
    desc: 'Strategic architects focused on high performance, scalable system design, and competitive mastery.',
  },
  {
    id: 'ravenclaw',
    name: 'RAVENCLAW',
    icon: HouseIcons.Ravenclaw,
    traits: 'Knowledge • Creativity • Intelligence',
    color: 'from-[#0e1a40]/90 to-[#050b1e]/90',
    borderColor: 'border-[#946b2d]',
    glowColor: 'shadow-[0_0_30px_rgba(148,107,45,0.4)]',
    accentColor: '#946b2d',
    desc: 'Master coders driven by analytical wisdom, elegant algorithms, and innovative cloud intelligence.',
  },
  {
    id: 'hufflepuff',
    name: 'HUFFLEPUFF',
    icon: HouseIcons.Hufflepuff,
    traits: 'Teamwork • Loyalty • Dedication',
    color: 'from-[#372e29]/90 to-[#1c1714]/90',
    borderColor: 'border-[#ecb939]',
    glowColor: 'shadow-[0_0_30px_rgba(236,185,57,0.4)]',
    accentColor: '#ecb939',
    desc: 'Resilient build squads who construct rock-solid systems, support teammates, and never give up.',
  },
]

const QUESTIONS = [
  {
    q: 'When your cloud deployment encounters a critical anomaly, what is your team’s instinct?',
    options: [
      { text: 'Charge ahead and rewrite the core logic on the fly', house: 'gryffindor' },
      { text: 'Optimize the architecture to bypass bottlenecks efficiently', house: 'slytherin' },
      { text: 'Analyze the system logs and trace the root mathematical cause', house: 'ravenclaw' },
      { text: 'Rally the team together and debug synchronously line-by-line', house: 'hufflepuff' },
    ],
  },
  {
    q: 'What type of magical spellcraft excites your team the most?',
    options: [
      { text: 'Serverless lightning & autonomous AI agents', house: 'gryffindor' },
      { text: 'High-throughput quantum databases & strategic pipelines', house: 'slytherin' },
      { text: 'Intricate algorithmic models & novel cloud paradigms', house: 'ravenclaw' },
      { text: 'Reliable multi-region clusters & resilient fault tolerance', house: 'hufflepuff' },
    ],
  },
]

export default function SortingCeremony() {
  const [selectedHouse, setSelectedHouse] = useState(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 })
  const [sortedResult, setSortedResult] = useState(null)

  // Registration Form State
  const [showRegForm, setShowRegForm] = useState(false)
  const [regData, setRegData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    member2: '',
    member3: '',
    member4: '',
    track: 'Serverless & Cloud Computing',
  })
  const [regSuccess, setRegSuccess] = useState(false)

  const startQuiz = () => {
    setIsQuizOpen(true)
    setStep(0)
    setScores({ gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 })
    setSortedResult(null)
    setShowRegForm(false)
    setRegSuccess(false)
  }

  const handleOption = (houseKey) => {
    const updated = { ...scores, [houseKey]: scores[houseKey] + 1 }
    setScores(updated)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      let topHouse = 'gryffindor'
      let maxScore = -1
      Object.keys(updated).forEach((h) => {
        if (updated[h] > maxScore) {
          maxScore = updated[h]
          topHouse = h
        }
      })
      const houseObj = HOUSES.find((h) => h.id === topHouse)
      setSortedResult(houseObj)
      setSelectedHouse(houseObj)
    }
  }

  const handleRegSubmit = (e) => {
    e.preventDefault()
    if (!regData.teamName || !regData.leaderName || !regData.leaderEmail) return
    setRegSuccess(true)
  }

  return (
    <section id="sorting" className="relative overflow-hidden bg-[#080b16] py-24 sm:py-32 border-t border-[#d4af37]/20">
      {/* Real Vivid Sorting Chamber Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.88 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src="/images/sorting_hat_ceremony_bg.jpg"
          alt="Hogwarts Sorting Ceremony Chamber"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b16]/80 via-[#080b16]/65 to-[#080b16]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-hogwarts-grid opacity-20 z-0" />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal as="div" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/50 rounded-full px-4 py-1.5 bg-[#10182b]/80 backdrop-blur-md">
            {HouseIcons.SortingHat}
            <span>THE SORTING CEREMONY</span>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.05}
            className="mt-3 font-harry text-5xl font-bold text-[#f4e8c1] sm:text-7xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            The Sorting Hat Awaits...
          </Reveal>

          <Reveal
            as="p"
            delay={0.1}
            className="mt-4 text-base sm:text-lg text-[#f4e8c1] font-serif leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          >
            Every participating team is allocated to one of four legendary Hogwarts houses exclusively by the Sorting Hat. Click below to begin the Sorting Ceremony and register your team!
          </Reveal>

          <Reveal delay={0.15} className="mt-6">
            <button
              type="button"
              onClick={startQuiz}
              className="inline-flex items-center gap-2.5 rounded-md border-2 border-[#d4af37] bg-gradient-to-r from-[#24170f] via-[#5c3b80] to-[#24170f] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#f4e8c1] shadow-[0_0_30px_rgba(212,175,55,0.45)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(212,175,55,0.7)]"
            >
              {HouseIcons.SortingHat}
              <span>SORT MY TEAM & REGISTER</span>
            </button>
          </Reveal>
        </div>

        {/* Four House Cards (Display Only) */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSES.map((house) => {
            const isSelected = selectedHouse?.id === house.id
            return (
              <motion.div
                key={house.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative overflow-hidden rounded-xl border-2 bg-gradient-to-b ${house.color} p-6 transition-all duration-300 backdrop-blur-md ${house.borderColor} ${
                  isSelected ? house.glowColor : 'shadow-[0_0_20px_rgba(0,0,0,0.7)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>{house.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                    Hogwarts House
                  </span>
                </div>

                <h3 className="mt-4 font-harry text-3xl font-bold tracking-wider text-[#f4e8c1]">
                  {house.name}
                </h3>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] font-sans">
                  {house.traits}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-[#e8d7b5] font-sans">
                  {house.desc}
                </p>

                {isSelected && (
                  <div className="mt-4 rounded bg-[#080b16]/80 p-2 text-center text-[11px] font-bold text-[#d4af37] border border-[#d4af37]/40">
                    ✨ Your Allocated House
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Interactive Sorting Hat & Registration Modal */}
      <AnimatePresence>
        {isQuizOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080b16]/95 p-4 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl border-2 border-[#d4af37] bg-gradient-to-b from-[#10182b] via-[#24170f] to-[#080b16] p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.5)] my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsQuizOpen(false)}
                className="absolute top-4 right-4 text-sm font-bold text-[#e8d7b5] hover:text-[#d4af37]"
              >
                ✕
              </button>

              {/* STAGE 1: Sorting Questions */}
              {!sortedResult && !showRegForm && (
                <div className="text-center">
                  <div className="flex justify-center mb-2">{HouseIcons.SortingHat}</div>
                  <h3 className="font-harry text-3xl font-bold text-[#f4e8c1]">
                    THE SORTING HAT DECIDES...
                  </h3>
                  <p className="mt-1 text-xs text-[#d4af37] font-sans uppercase tracking-widest">
                    Question {step + 1} of {QUESTIONS.length}
                  </p>

                  <p className="mt-6 text-sm sm:text-base font-serif text-[#e8d7b5] leading-relaxed">
                    "{QUESTIONS[step].q}"
                  </p>

                  <div className="mt-6 grid gap-3">
                    {QUESTIONS[step].options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleOption(opt.house)}
                        className="w-full rounded-lg border border-[#d4af37]/40 bg-[#10182b] p-3.5 text-left text-xs font-semibold text-[#f4e8c1] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 2: House Revealed -> Trigger Registration */}
              {sortedResult && !showRegForm && (
                <div className="text-center">
                  <div className="flex justify-center mb-3">{sortedResult.icon}</div>
                  <h3 className="font-harry text-4xl font-bold text-[#f4e8c1]">
                    {sortedResult.name}!
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    {sortedResult.traits}
                  </p>

                  <p className="mt-4 text-sm text-[#e8d7b5]/90 font-serif leading-relaxed">
                    The Sorting Hat has officially allocated your team to <strong className="text-[#f4e8c1]">{sortedResult.name}</strong>. Complete your team registration below to receive your official Hogwarts Hackfest Pass!
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowRegForm(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-md border-2 border-[#d4af37] bg-gradient-to-r from-[#24170f] via-[#5c3b80] to-[#24170f] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#f4e8c1] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition hover:scale-105"
                  >
                    <span>PROCEED TO TEAM REGISTRATION</span>
                    <svg className="h-4 w-4 text-[#d4af37]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* STAGE 3: Team Registration Form */}
              {showRegForm && !regSuccess && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div>{sortedResult?.icon || HouseIcons.Gryffindor}</div>
                      <div>
                        <h3 className="font-harry text-3xl font-bold text-[#f4e8c1]">
                          TEAM REGISTRATION
                        </h3>
                        <p className="text-xs text-[#d4af37] font-sans font-bold">
                          Allocated House: {sortedResult?.name || 'Gryffindor'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleRegSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regData.teamName}
                        onChange={(e) => setRegData({ ...regData, teamName: e.target.value })}
                        placeholder="e.g. Phoenix Builders"
                        className="mt-1 w-full rounded-lg border border-[#d4af37]/40 bg-[#080b16] p-3 text-xs text-[#f4e8c1] focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                          Team Leader Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={regData.leaderName}
                          onChange={(e) => setRegData({ ...regData, leaderName: e.target.value })}
                          placeholder="Leader Full Name"
                          className="mt-1 w-full rounded-lg border border-[#d4af37]/40 bg-[#080b16] p-3 text-xs text-[#f4e8c1] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                          Leader Email (MNNIT) *
                        </label>
                        <input
                          type="email"
                          required
                          value={regData.leaderEmail}
                          onChange={(e) => setRegData({ ...regData, leaderEmail: e.target.value })}
                          placeholder="leader@mnnit.ac.in"
                          className="mt-1 w-full rounded-lg border border-[#d4af37]/40 bg-[#080b16] p-3 text-xs text-[#f4e8c1] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#e8d7b5]/80 font-sans">
                          Member 2 Name
                        </label>
                        <input
                          type="text"
                          value={regData.member2}
                          onChange={(e) => setRegData({ ...regData, member2: e.target.value })}
                          placeholder="Member 2"
                          className="mt-1 w-full rounded-lg border border-[#d4af37]/30 bg-[#080b16] p-2.5 text-xs text-[#f4e8c1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#e8d7b5]/80 font-sans">
                          Member 3 Name
                        </label>
                        <input
                          type="text"
                          value={regData.member3}
                          onChange={(e) => setRegData({ ...regData, member3: e.target.value })}
                          placeholder="Member 3"
                          className="mt-1 w-full rounded-lg border border-[#d4af37]/30 bg-[#080b16] p-2.5 text-xs text-[#f4e8c1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#e8d7b5]/80 font-sans">
                          Member 4 Name
                        </label>
                        <input
                          type="text"
                          value={regData.member4}
                          onChange={(e) => setRegData({ ...regData, member4: e.target.value })}
                          placeholder="Member 4"
                          className="mt-1 w-full rounded-lg border border-[#d4af37]/30 bg-[#080b16] p-2.5 text-xs text-[#f4e8c1]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                        Project Track Interest
                      </label>
                      <select
                        value={regData.track}
                        onChange={(e) => setRegData({ ...regData, track: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-[#d4af37]/40 bg-[#080b16] p-3 text-xs text-[#f4e8c1]"
                      >
                        <option value="Serverless & Cloud Computing">⚡ Serverless & Cloud Spells (AWS)</option>
                        <option value="AI / ML & Autonomous Agents">🔮 AI / ML & Autonomous Agents</option>
                        <option value="DevOps & System Architecture">🛠️ DevOps & Scalable Infrastructure</option>
                        <option value="Web3, Blockchain & Security">🛡️ Web3, Blockchain & Cyber Defense</option>
                      </select>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="submit"
                        className="rounded-md border-2 border-[#d4af37] bg-gradient-to-r from-[#24170f] via-[#5c3b80] to-[#24170f] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#f4e8c1] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      >
                        ⚡ CONFIRM TEAM REGISTRATION
                      </button>

                      <a
                        href={APPLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#d4af37] hover:underline font-sans"
                      >
                        Open External Google Form →
                      </a>
                    </div>
                  </form>
                </div>
              )}

              {/* STAGE 4: Official Acceptance Certificate Ticket */}
              {regSuccess && (
                <div className="text-center py-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#740001] shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                    <svg className="h-8 w-8 text-[#d3a625]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>

                  <span className="mt-3 block text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    REGISTRATION CONFIRMED • ID #HOG-2026-88
                  </span>

                  <h3 className="mt-1 font-harry text-4xl font-bold text-[#f4e8c1]">
                    PASSAGE GRANTED: {regData.teamName.toUpperCase()}
                  </h3>

                  <div className="mt-6 rounded-xl border border-[#d4af37]/50 bg-[#24170f]/90 p-5 text-left text-xs font-sans space-y-2">
                    <p className="text-[#f4e8c1]"><strong>Allocated House:</strong> {sortedResult?.name}</p>
                    <p className="text-[#f4e8c1]"><strong>Team Leader:</strong> {regData.leaderName} ({regData.leaderEmail})</p>
                    <p className="text-[#f4e8c1]"><strong>Track:</strong> {regData.track}</p>
                    <p className="text-[#d4af37] text-[11px] pt-2 border-t border-[#d4af37]/30">
                      ✨ Your team is now registered for Round 1 (The Owl Trials). Check your inbox for trial schedule details!
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsQuizOpen(false)}
                      className="rounded-md border border-[#d4af37] bg-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase text-[#080b16]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

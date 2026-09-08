import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SplitText from './common/SplitText'
import Reveal from './common/Reveal'
import { staggerContainer, staggerItem } from './common/motion'
import { useRef } from 'react'

const HIGHLIGHTS = [
  {
    title: 'Mentors from AWS SBG',
    body: 'Get guidance and support from builders who can help you turn your ideas into working projects.',
  },
  {
    title: 'Open to every branch',
    body: 'Students from different branches can come together, collaborate, and build something meaningful.',
  },
  {
    title: 'Prizes that matter',
    body: 'Compete with other teams, showcase your project, and get a chance to win prizes and recognition.',
  },
  {
    title: 'A real demo, not a report',
    body: 'Build a working prototype and present your project to judges instead of focusing only on slides or documentation.',
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
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
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
      className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-navy-900 shadow-2xl sm:aspect-[5/4] lg:aspect-[4/5]"
    >
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="pointer-events-none absolute inset-0 bg-grid opacity-30" 
      />
      <div 
        style={{ transform: 'translateZ(50px)' }}
        className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-pink-500/40 blur-[80px]" 
      />
      <div 
        style={{ transform: 'translateZ(40px)' }}
        className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-navy-600/60 blur-[70px]" 
      />
      <div 
        style={{ transform: 'translateZ(60px)' }}
        className="relative flex h-full flex-col justify-between p-8"
      >
        <span className="w-fit rounded-full border border-navy-600 bg-navy-800/80 px-4 py-1.5 text-xs text-navy-200 backdrop-blur">
          Hackfest 2026
        </span>
        <div>
          <p className="font-display text-5xl font-semibold text-white">24 hrs</p>
          <p className="mt-1 text-sm font-medium text-pink-300">of building, back to back</p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-navy-700 to-transparent" />
          <p className="mt-6 font-display text-4xl font-semibold text-white">3–4</p>
          <p className="mt-1 text-sm font-medium text-pink-300">builders per team</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutEvent() {
  return (
    <section id="about-event" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Heading */}
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

          {/* Event Information Card */}
          <Reveal className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-navy-900 sm:aspect-[5/4] lg:aspect-[4/5]">

            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-pink-500/30 blur-[80px]" />

            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-navy-600/60 blur-[70px]" />

            <div className="relative flex h-full flex-col justify-between p-8">

              {/* Event Label */}
              <span className="w-fit rounded-full border border-navy-600 px-3 py-1 text-xs text-navy-200">
                Hackfest 2026
              </span>

              {/* Main Event Details */}
              <div>

                {/* Duration */}
                <p className="font-display text-4xl font-semibold text-white">
                  24 hrs
                </p>

                <p className="mt-1 text-sm text-navy-200">
                  of building, back to back
                </p>

                <div className="mt-6 h-px w-full bg-navy-700" />

                {/* Team Size */}
                <p className="mt-6 font-display text-4xl font-semibold text-white">
                  3–4
                </p>

                <p className="mt-1 text-sm text-navy-200">
                  builders per team
                </p>

              </div>
            </div>
          <Reveal className="perspective-[1000px] w-full flex justify-center">
            <TiltCard />
          </Reveal>

          {/* Event Description */}
          <div>

            <Reveal
              as="p"
              className="text-base leading-relaxed text-navy-700 sm:text-lg"
            >
              SBG Hackfest is a campus hackathon run by the AWS Student
              Builder Group at MNNIT Allahabad. Teams pick a problem, build a
              working prototype over the weekend, and pitch their ideas and
              projects to a panel of judges.
            </Reveal>

            {/* Event Highlights */}
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
                  <p className="font-display text-sm font-semibold text-navy-900">
                    {h.title}
                  </p>

                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700/80">
                    {h.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Hackfest Journey */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-navy-700">
              <span>IDEA</span>

              <span className="text-pink-500">
                →
              </span>

              <span>BUILD</span>

              <span className="text-pink-500">
                →
              </span>

              <span>COLLABORATE</span>

              <span className="text-pink-500">
                →
              </span>

              <span>SHOWCASE</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
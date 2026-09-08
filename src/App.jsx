import Hero from './components/Hero'
import AboutEvent from './components/AboutEvent'
import AboutClub from './components/AboutClub'
import PastEvents from './components/PastEvents'
import ApplyNow from './components/ApplyNow'
import FAQ from './components/FAQ'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Wrapper for the "Layered/Stacked Cards" scroll effect
function PageSection({ children, index }) {
  const ref = useRef(null)
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Scale down and fade out the section as the next one scrolls over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  return (
    <motion.div 
      ref={ref} 
      className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy-900 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      style={{ zIndex: index }}
    >
      <motion.div style={{ scale, opacity }} className="h-full w-full overflow-y-auto no-scrollbar">
        {children}
      </motion.div>
    </motion.div>
  )
}

function App() {
  return (
    <main className="relative bg-navy-950">
      <PageSection index={1}><Hero /></PageSection>
      <PageSection index={2}><AboutEvent /></PageSection>
      <PageSection index={3}><AboutClub /></PageSection>
      <PageSection index={4}><PastEvents /></PageSection>
      <PageSection index={5}><ApplyNow /></PageSection>
      <PageSection index={6}><FAQ /></PageSection>
    </main>
  )
}

export default App
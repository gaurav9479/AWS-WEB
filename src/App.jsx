import Hero from './components/Hero'
import AboutEvent from './components/AboutEvent'
import AboutClub from './components/AboutClub'
import PastEvents from './components/PastEvents'
import ApplyNow from './components/ApplyNow'
import FAQ from './components/FAQ'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Wrapper for the "Layered Cards" scroll effect that supports tall content
function PageSection({ children, index }) {
  const ref = useRef(null)
  
  // Track scroll progress of this specific section from when its top hits the viewport
  // until its bottom leaves the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Parallax overlap: slow down its upward scroll (y) and shrink it
  // so the next section smoothly slides over it
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <motion.div 
      ref={ref} 
      className="relative w-full"
      style={{ zIndex: index }}
    >
      <motion.div 
        style={{ y, scale, opacity }} 
        className="w-full origin-top bg-navy-900 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function App() {
  return (
    <div className="relative min-h-screen bg-navy-950 text-cream">
      <Navbar />
      <main className="relative bg-navy-950 overflow-hidden">
        <PageSection index={1}><Hero /></PageSection>
        <PageSection index={2}><AboutEvent /></PageSection>
        <PageSection index={3}><AboutClub /></PageSection>
        <PageSection index={4}><PastEvents /></PageSection>
        <PageSection index={5}><ApplyNow /></PageSection>
        <PageSection index={6}><FAQ /></PageSection>
        <PageSection index={7}><Footer /></PageSection>
      </main>
    </div>
  )
}

export default App
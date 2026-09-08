import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPLY_URL } from '../config'

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About Event', href: '#about-event' },
  { name: 'About Club', href: '#about-club' },
  { name: 'Past Events', href: '#past-events' },
  { name: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }


      const scrollPos = window.scrollY + 120
      const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))

      if (window.scrollY < 100) {
        setActiveSection('hero')
        return
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          if (scrollPos >= top - 100) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (e, href) => {
    if (e) e.preventDefault()
    setMobileMenuOpen(false)
    const targetId = href.replace('#', '')
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(targetId)
    if (element) {
      const topPos = element.getBoundingClientRect().top + window.scrollY - 75
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-navy-950/85 backdrop-blur-md py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-navy-800/80'
          : 'bg-gradient-to-b from-navy-950/90 via-navy-950/40 to-transparent py-5'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        { }
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-3 transition"
        >
          { }
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-navy-800 p-0.5 shadow-[0_0_15px_rgba(255,47,126,0.3)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,47,126,0.5)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-navy-950 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-pink-400">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                SBG<span className="text-pink-400">.</span>
              </span>
              <span className="rounded-full bg-pink-500/15 px-2 py-0.5 text-[12px] font-semibold text-pink-400 border border-pink-500/30">
                MNNIT
              </span>
            </div>
            <span className="text-[13px] font-medium tracking-wider text-navy-200 uppercase">
              AWS Student Builder Group
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-white font-semibold'
                    : 'text-navy-200 hover:text-white'
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ff2f7e]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-pink-500 px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(255,47,126,0.4)] transition duration-300 hover:bg-pink-400 hover:shadow-[0_0_30px_rgba(255,47,126,0.6)] hover:scale-[1.02]"
          >
            <span>Apply Now</span>
            <svg
              className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy-700 bg-navy-900/80 text-navy-200 transition hover:border-pink-500/50 hover:text-white md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-navy-800 bg-navy-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-base font-medium transition-all ${isActive
                        ? 'text-pink-400 font-semibold pl-2 border-l-2 border-pink-500'
                        : 'text-navy-200 hover:text-pink-400'
                      }`}
                  >
                    {link.name}
                  </a>
                )
              })}
              <div className="pt-2">
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-pink-500 py-3 text-center text-sm font-medium text-white shadow-[0_0_20px_rgba(255,47,126,0.4)]"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


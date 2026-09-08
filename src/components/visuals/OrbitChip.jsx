import { motion } from 'framer-motion'

// Six nodes arranged in a hexagon around the centre, in percentage
// coordinates (viewBox is 0-100) so the whole thing scales fluidly.
const NODES = [
  { x: 50, y: 14, icon: 'bolt', label: 'Serverless' },
  { x: 81.2, y: 32, icon: 'cloud', label: 'Cloud' },
  { x: 81.2, y: 68, icon: 'db', label: 'Data' },
  { x: 50, y: 86, icon: 'code', label: 'Build' },
  { x: 18.8, y: 68, icon: 'network', label: 'Network' },
  { x: 18.8, y: 32, icon: 'terminal', label: 'Ship' },
]

const icons = {
  bolt: (
    <path d="M12 2 4 13h6l-1 9 9-13h-6l1-7Z" />
  ),
  cloud: (
    <path d="M7 17a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 8.06 4.5 4.5 0 0 1 17.5 17H7Z" />
  ),
  db: (
    <path d="M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 0v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  ),
  code: (
    <path d="m9 18-6-6 6-6m6 12 6-6-6-6" />
  ),
  network: (
    <path d="M12 2v6m0 0-5 4m5-4 5 4M5 12v6l7 4 7-4v-6" />
  ),
  terminal: (
    <path d="m5 7 5 5-5 5m6 0h8" />
  ),
}

function NodeIcon({ type }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
      {icons[type]}
    </svg>
  )
}

export default function OrbitChip() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden="true">
      {/* ambient glow behind everything */}
      <div className="absolute inset-[8%] rounded-full bg-pink-500/20 blur-[70px]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="orbit-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff2f7e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff2f7e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {NODES.map((n, i) => (
          <motion.line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="url(#orbit-line)"
            strokeWidth="0.4"
            strokeDasharray="4 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, strokeDashoffset: [0, -14] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 + i * 0.08 },
              strokeDashoffset: { duration: 3.2, repeat: Infinity, ease: 'linear' },
            }}
          />
        ))}
        {/* faint orbit ring */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="#5b6489" strokeOpacity="0.25" strokeWidth="0.3" />
      </svg>

      {/* orbiting nodes */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.label}
          className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-navy-600 bg-navy-800/90 text-pink-300 shadow-[0_0_18px_rgba(255,47,126,0.15)] backdrop-blur sm:h-14 sm:w-14"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <NodeIcon type={n.icon} />
        </motion.div>
      ))}

      {/* central node */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-pink-500/40 bg-navy-800 shadow-[0_0_50px_rgba(255,47,126,0.35)] sm:h-28 sm:w-28"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-display text-lg font-semibold text-white sm:text-xl">SBG</span>
        <span className="mt-0.5 text-[10px] tracking-wide text-navy-200 sm:text-xs">Hackfest</span>
      </motion.div>
    </div>
  )
}
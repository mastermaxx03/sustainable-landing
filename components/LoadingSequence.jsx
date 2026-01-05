'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAppState } from '@/context/AppStateContext'

export default function LoadingSequence() {
  const [phase, setPhase] = useState(0)
  const [counter, setCounter] = useState(0)
  const { setIsLoading } = useAppState()

  useEffect(() => {
    const timers = []

    // Phase 0: Initial text (0-1s)
    timers.push(setTimeout(() => setPhase(1), 1000))

    // Phase 1: Counter animation (1-2s)
    if (phase === 1) {
      const counterInterval = setInterval(() => {
        setCounter((prev) => {
          if (prev >= 15000) {
            clearInterval(counterInterval)
            return 15000
          }
          return prev + 500
        })
      }, 30)
      timers.push(counterInterval)
      timers.push(setTimeout(() => setPhase(2), 1000))
    }

    // Phase 2: Second text (2-3s)
    if (phase === 2) {
      timers.push(setTimeout(() => setPhase(3), 1000))
    }

    // Phase 3: Fade out text (3-4s)
    if (phase === 3) {
      timers.push(setTimeout(() => setPhase(4), 1000))
    }

    // Phase 4: Globe animation (4-5s)
    if (phase === 4) {
      timers.push(setTimeout(() => {
        setIsLoading(false)
      }, 1000))
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [phase, setIsLoading])

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] z-50 flex items-center justify-center">
      <div className="text-center">
        {phase < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {phase === 0 && (
              <div className="text-2xl font-light text-[var(--text-secondary)]">
                Every second, fashion emits...
              </div>
            )}

            {phase >= 1 && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-6xl font-bold text-[var(--mint-glow)]">
                    {counter.toLocaleString()}
                  </span>
                  <span className="text-2xl text-[var(--text-muted)]">kg CO₂</span>
                </div>
                {phase === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-light text-[var(--text-secondary)]"
                  >
                    That's 543 million kg daily
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-xl font-light text-[var(--text-secondary)]"
          >
            Loading visualization...
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[var(--mint-glow)]"
          >
            <div className="w-16 h-16 border-4 border-[var(--teal-primary)] border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

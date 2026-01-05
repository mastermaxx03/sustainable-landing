'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  useEffect(() => {
    // Show after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    // Track interactions
    const handleInteraction = () => {
      setInteractionCount((prev) => {
        const newCount = prev + 1
        if (newCount >= 3) {
          setIsVisible(true)
        }
        return newCount
      })
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed bottom-0 w-full py-4 text-center text-sm backdrop-blur-sm z-10"
          style={{
            background: 'linear-gradient(to top, var(--bg-primary), transparent)'
          }}
        >
          <div className="text-[var(--text-secondary)] mb-1">
            Built by{' '}
            <span className="font-medium">Animesh Srivastava</span>
          </div>
          <div className="mb-2">
            <a
              href="mailto:animesh.example@email.com"
              className="text-[var(--teal-primary)] hover:text-[var(--teal-bright)] transition-colors"
            >
              animesh.example@email.com
            </a>
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            Data sources: IEA, Higg MSI, GHG Protocol
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}

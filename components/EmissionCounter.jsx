'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/context/DataContext'

export default function EmissionCounter() {
  const { totalEmissions } = useData()
  const [currentCount, setCurrentCount] = useState(totalEmissions * 365)

  useEffect(() => {
    setCurrentCount(totalEmissions * 365)
  }, [totalEmissions])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCount((prev) => prev + 15)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num) => {
    return Math.floor(num).toLocaleString('en-US')
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 text-center">
      <div className="text-sm font-light tracking-wide text-[var(--text-secondary)] mb-2">
        Global Fashion Emissions Today
      </div>
      <div className="flex items-baseline justify-center gap-2">
        <span className="font-mono text-7xl font-bold text-[var(--mint-glow)] glow">
          {formatNumber(currentCount)}
        </span>
        <span className="text-2xl font-light text-[var(--text-muted)]">
          kg CO₂
        </span>
      </div>
    </div>
  )
}

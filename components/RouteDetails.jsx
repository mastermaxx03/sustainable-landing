'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '@/context/AppStateContext'
import { useData } from '@/context/DataContext'

const stepIcons = {
  farm: '🌾',
  mill: '🏭',
  factory: '🏭',
  port: '⚓',
  transport: '🚢',
  retail: '🏪'
}

export default function RouteDetails() {
  const { selectedRoute, setSelectedRoute } = useAppState()
  const { routes, countries } = useData()

  if (!selectedRoute) return null

  const route = routes.find((r) => r.id === selectedRoute)
  if (!route) return null

  const getEmissionColor = (emissions) => {
    if (emissions === 0) return 'var(--text-muted)'
    if (emissions < 100) return 'var(--green-sage)'
    if (emissions < 500) return 'var(--amber-warm)'
    return 'var(--red-earth)'
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 h-48 bg-[var(--bg-elevated)]/95 backdrop-blur-lg border-t border-[var(--teal-dark)] z-20 overflow-x-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              {countries[route.from]?.name} → {countries[route.to]?.name} Supply Chain
            </h3>
            <button
              onClick={() => setSelectedRoute(null)}
              className="text-[var(--text-secondary)] hover:text-[var(--teal-bright)] transition-colors text-xl"
            >
              ×
            </button>
          </div>

          {/* Timeline */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {route.steps.map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-[var(--bg-secondary)]/50 p-3 rounded-lg min-w-[200px]"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-2xl">{stepIcons[step.type]}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      {step.location}
                    </div>
                    {step.emissions > 0 && (
                      <div
                        className="text-xs font-mono font-bold"
                        style={{ color: getEmissionColor(step.emissions) }}
                      >
                        {step.emissions} kg CO₂
                      </div>
                    )}
                    {step.duration && (
                      <div className="text-xs text-[var(--text-muted)]">
                        {step.duration}
                      </div>
                    )}
                    {step.distance && (
                      <div className="text-xs text-[var(--text-muted)]">
                        {step.distance.toLocaleString()} km
                      </div>
                    )}
                  </div>
                </div>
                {index < route.steps.length - 1 && (
                  <div className="flex justify-center mt-2">
                    <div className="text-[var(--teal-primary)]">→</div>
                  </div>
                )}
              </div>
            ))}

            {/* Total */}
            <div className="flex-shrink-0 bg-[var(--teal-dark)]/30 p-3 rounded-lg min-w-[200px] border border-[var(--teal-primary)]">
              <div className="text-xs text-[var(--text-secondary)] mb-1">
                TOTAL EMISSIONS
              </div>
              <div className="text-2xl font-mono font-bold text-[var(--mint-glow)] mb-1">
                {route.totalEmissions.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                kg CO₂ per 1,000 units
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-2">
                {route.unitsPerYear.toLocaleString()} units/year
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

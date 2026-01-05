'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '@/context/AppStateContext'
import { useData } from '@/context/DataContext'
import { useCamera } from '@/context/CameraContext'

const countryFlags = {
  IN: '🇮🇳',
  BD: '🇧🇩',
  CN: '🇨🇳',
  VN: '🇻🇳',
  US: '🇺🇸',
  EU: '🇪🇺'
}

export default function Sidebar() {
  const { selectedCountry, setSelectedCountry, setSidebarOpen } = useAppState()
  const { countries, routes } = useData()
  const { resetCamera } = useCamera()

  if (!selectedCountry || !countries[selectedCountry]) return null

  const country = countries[selectedCountry]

  const handleClose = () => {
    setSelectedCountry(null)
    setSidebarOpen(false)
    resetCamera()
  }

  const relatedRoutes = routes.filter(
    (route) => route.from === selectedCountry || route.to === selectedCountry
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed right-0 top-0 h-full w-96 bg-[var(--bg-secondary)]/95 backdrop-blur-lg border-l border-[var(--teal-dark)] p-8 overflow-y-auto z-20"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-[var(--teal-bright)] transition-colors text-2xl"
        >
          ×
        </button>

        {/* Country header */}
        <div className="mb-8">
          <div className="text-6xl mb-4">{countryFlags[selectedCountry]}</div>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            {country.name}
          </h2>
        </div>

        {/* Emissions */}
        <div className="mb-8">
          <div className="text-sm font-light text-[var(--text-secondary)] mb-2">
            Annual Emissions
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono text-5xl font-bold text-[var(--mint-glow)]">
              {(country.emissions / 1000000).toFixed(1)}M
            </span>
            <span className="text-lg text-[var(--text-muted)]">tons CO₂</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[var(--bg-elevated)]/50 p-4 rounded-lg">
            <div className="text-xs text-[var(--text-muted)] mb-1">Factories</div>
            <div className="text-2xl font-bold text-[var(--teal-bright)]">
              {country.factories}
            </div>
          </div>
          <div className="bg-[var(--bg-elevated)]/50 p-4 rounded-lg">
            <div className="text-xs text-[var(--text-muted)] mb-1">Grid Intensity</div>
            <div className="text-2xl font-bold text-[var(--teal-bright)]">
              {country.gridIntensity}
            </div>
            <div className="text-xs text-[var(--text-muted)]">gCO₂/kWh</div>
          </div>
        </div>

        {/* Materials breakdown */}
        <div className="mb-8">
          <div className="text-sm font-light text-[var(--text-secondary)] mb-4">
            Materials Breakdown
          </div>
          <div className="space-y-3">
            {Object.entries(country.materials).map(([material, percentage]) => (
              <div key={material}>
                <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                  <span className="capitalize">{material}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--green-sage)] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export destinations */}
        <div className="mb-8">
          <div className="text-sm font-light text-[var(--text-secondary)] mb-4">
            Export Destinations
          </div>
          <div className="flex flex-wrap gap-2">
            {country.exports.map((destination) => (
              <span
                key={destination}
                className="px-3 py-1 bg-[var(--bg-elevated)]/50 rounded-full text-sm text-[var(--text-primary)]"
              >
                {destination}
              </span>
            ))}
          </div>
        </div>

        {/* Supply chains */}
        {relatedRoutes.length > 0 && (
          <div className="mb-8">
            <div className="text-sm font-light text-[var(--text-secondary)] mb-4">
              Supply Chain Routes
            </div>
            <div className="space-y-2">
              {relatedRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-[var(--bg-elevated)]/50 p-3 rounded-lg"
                >
                  <div className="text-sm text-[var(--text-primary)] mb-1">
                    {countries[route.from]?.name} → {countries[route.to]?.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {route.totalEmissions.toLocaleString()} kg CO₂ per 1,000 units
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View supply chains button */}
        <button className="w-full bg-[var(--teal-primary)] hover:bg-[var(--teal-bright)] text-white font-medium py-3 px-6 rounded-lg transition-colors">
          View Supply Chains →
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

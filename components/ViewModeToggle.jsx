'use client'

import { useAppState } from '@/context/AppStateContext'

const modes = [
  { id: 'supply-chain', label: '🗺️ Supply Chains' },
  { id: 'heatmap', label: '🔥 Heat Map' },
  { id: 'factory', label: '🏭 Factories' }
]

export default function ViewModeToggle() {
  const { viewMode, setViewMode } = useAppState()

  return (
    <div className="fixed bottom-4 left-4 z-10 flex gap-2">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setViewMode(mode.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            viewMode === mode.id
              ? 'bg-[var(--teal-primary)] text-white shadow-lg'
              : 'bg-[var(--bg-elevated)]/50 text-[var(--text-secondary)] hover:bg-[var(--teal-dark)]'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  )
}

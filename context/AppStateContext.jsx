'use client'

import { createContext, useContext, useState } from 'react'

const AppStateContext = createContext()

export function AppStateProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [viewMode, setViewMode] = useState('supply-chain')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredCountry, setFilteredCountry] = useState(null)

  const value = {
    selectedCountry,
    setSelectedCountry,
    selectedRoute,
    setSelectedRoute,
    viewMode,
    setViewMode,
    sidebarOpen,
    setSidebarOpen,
    isLoading,
    setIsLoading,
    filteredCountry,
    setFilteredCountry
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }
  return context
}

'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { fetchEmissionData } from '@/lib/api'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [countries, setCountries] = useState({})
  const [routes, setRoutes] = useState([])
  const [factories, setFactories] = useState({})
  const [totalEmissions, setTotalEmissions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const data = await fetchEmissionData()
        setCountries(data.countries)
        setRoutes(data.routes)
        setFactories(data.factories)
        setTotalEmissions(data.totalEmissions)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Failed to load emission data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const value = {
    countries,
    routes,
    factories,
    totalEmissions,
    loading,
    error
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

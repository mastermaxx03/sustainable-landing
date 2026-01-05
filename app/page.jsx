'use client'

import { useAppState } from '@/context/AppStateContext'
import dynamic from 'next/dynamic'
import EmissionCounter from '@/components/EmissionCounter'
import Sidebar from '@/components/Sidebar'
import RouteDetails from '@/components/RouteDetails'
import ViewModeToggle from '@/components/ViewModeToggle'
import LoadingSequence from '@/components/LoadingSequence'
import Footer from '@/components/Footer'

const Globe = dynamic(() => import('@/components/Globe'), { ssr: false })

export default function Home() {
  const { isLoading, selectedRoute } = useAppState()

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--bg-primary)] atmospheric-bg">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {isLoading ? (
        <LoadingSequence />
      ) : (
        <>
          <EmissionCounter />
          <Globe />
          <Sidebar />
          {selectedRoute && <RouteDetails />}
          <ViewModeToggle />
          <Footer />
        </>
      )}
    </main>
  )
}

'use client'

import { createContext, useContext, useRef } from 'react'

const CameraContext = createContext()

export function CameraProvider({ children }) {
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)

  const zoomToCountry = (countryCode, coordinates) => {
    if (!cameraRef.current || !controlsRef.current) return

    // Convert lat/lon to 3D coordinates
    const [lon, lat] = coordinates
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)

    const radius = 4 // Zoom distance
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    // Animate camera position
    const startPos = cameraRef.current.position.clone()
    const endPos = { x, y, z }
    const duration = 1200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (cubic-bezier approximation)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      cameraRef.current.position.x = startPos.x + (endPos.x - startPos.x) * eased
      cameraRef.current.position.y = startPos.y + (endPos.y - startPos.y) * eased
      cameraRef.current.position.z = startPos.z + (endPos.z - startPos.z) * eased

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const resetCamera = () => {
    if (!cameraRef.current) return

    const startPos = cameraRef.current.position.clone()
    const endPos = { x: 0, y: 0, z: 6 }
    const duration = 1200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      cameraRef.current.position.x = startPos.x + (endPos.x - startPos.x) * eased
      cameraRef.current.position.y = startPos.y + (endPos.y - startPos.y) * eased
      cameraRef.current.position.z = startPos.z + (endPos.z - startPos.z) * eased

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const value = {
    cameraRef,
    controlsRef,
    zoomToCountry,
    resetCamera
  }

  return (
    <CameraContext.Provider value={value}>
      {children}
    </CameraContext.Provider>
  )
}

export function useCamera() {
  const context = useContext(CameraContext)
  if (!context) {
    throw new Error('useCamera must be used within CameraProvider')
  }
  return context
}

"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Suspense, useRef, useEffect } from "react"
import { Earth } from "./earth-model"
import type { OrbitControls as OrbitControlsType } from "three-stdlib"
import type * as THREE from "three"

interface Earth3DProps {
  impactLat?: number
  impactLon?: number
  showImpact?: boolean
}

export function Earth3D({ impactLat = 0, impactLon = 0, showImpact = false }: Earth3DProps) {
  const controlsRef = useRef<OrbitControlsType>(null)
  const earthGroupRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    if (showImpact && earthGroupRef.current && controlsRef.current) {
      // Calculate rotation needed to face the impact point
      const phi = (90 - impactLat) * (Math.PI / 180)
      const theta = (impactLon + 180) * (Math.PI / 180)

      // Rotate Earth to show the impact location
      earthGroupRef.current.rotation.y = -theta
      earthGroupRef.current.rotation.x = phi - Math.PI / 2

      // Zoom in slightly
      controlsRef.current.minDistance = 2.5
      controlsRef.current.maxDistance = 2.5

      // Disable auto-rotate when showing impact
      controlsRef.current.autoRotate = false
    } else if (controlsRef.current) {
      // Reset zoom and enable auto-rotate when not showing impact
      controlsRef.current.minDistance = 2
      controlsRef.current.maxDistance = 5
      controlsRef.current.autoRotate = true
    }
  }, [showImpact, impactLat, impactLon])

  const handleEarthRef = (ref: THREE.Group) => {
    earthGroupRef.current = ref
  }

  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-black/50 border border-border/50">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Suspense fallback={null}>
          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          <Earth impactLat={impactLat} impactLon={impactLon} showImpact={showImpact} onEarthRef={handleEarthRef} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={5}
            autoRotate={!showImpact}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

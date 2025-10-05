"use client"

import { useRef, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"
import { Sphere } from "@react-three/drei"

interface EarthProps {
  impactLat: number
  impactLon: number
  showImpact: boolean
  onEarthRef?: (ref: THREE.Group) => void
}

export function Earth({ impactLat, impactLon, showImpact, onEarthRef }: EarthProps) {
  const earthGroupRef = useRef<THREE.Group>(null)
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const impactRef = useRef<THREE.Group>(null)

  // Load textures
  const [earthMap, earthNormal, earthSpecular, cloudsMap] = useLoader(TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
  ])

  useEffect(() => {
    if (earthGroupRef.current && onEarthRef) {
      onEarthRef(earthGroupRef.current)
    }
  }, [onEarthRef])

  useEffect(() => {
    if (impactRef.current && showImpact) {
      const position = getPositionFromLatLon(impactLat, impactLon, 1.02)
      impactRef.current.position.set(position[0], position[1], position[2])
    }
  }, [impactLat, impactLon, showImpact])

  useFrame((state, delta) => {
    if (earthGroupRef.current && !showImpact) {
      earthGroupRef.current.rotation.y += delta * 0.05
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.02
    }
  })

  // Convert lat/lon to 3D position on sphere
  const getPositionFromLatLon = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)

    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    return [x, y, z] as [number, number, number]
  }

  return (
    <group ref={earthGroupRef}>
      {/* Earth */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshPhongMaterial
          map={earthMap}
          normalMap={earthNormal}
          specularMap={earthSpecular}
          shininess={10}
          normalScale={new THREE.Vector2(0.85, 0.85)}
        />
      </Sphere>

      {/* Clouds */}
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
        <meshPhongMaterial map={cloudsMap} transparent opacity={0.4} depthWrite={false} />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[1.15, 64, 64]}>
        <meshBasicMaterial color="#4488ff" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {showImpact && (
        <group ref={impactRef}>
          <Sphere args={[0.03, 16, 16]}>
            <meshBasicMaterial color="#ff0000" />
          </Sphere>
          <Sphere args={[0.05, 16, 16]}>
            <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
          </Sphere>
          <Sphere args={[0.08, 16, 16]}>
            <meshBasicMaterial color="#ff0000" transparent opacity={0.1} />
          </Sphere>
        </group>
      )}
    </group>
  )
}

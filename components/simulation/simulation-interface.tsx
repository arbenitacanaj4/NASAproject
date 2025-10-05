"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { AsteroidSelector } from "./asteroid-selector"
import { ImpactParameters } from "./impact-parameters"
import { SimulationResults } from "./simulation-results"
import { Earth3D } from "../earth/earth-3d"

export interface AsteroidData {
  name: string
  diameter: number
  velocity: number
  distance: number
  composition: string
  status: string
}

export interface SimulationData {
  craterDiameter: number
  craterDepth: number
  impactEnergy: number
  blastRadius: number
  thermalRadius: number
  seismicMagnitude: number
  affectedPopulation: number
}

export function SimulationInterface() {
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData | null>(null)
  const [impactAngle, setImpactAngle] = useState(45)
  const [latitude, setLatitude] = useState(40.7128)
  const [longitude, setLongitude] = useState(-74.006)
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  const [showImpact, setShowImpact] = useState(false)

  const handleRunSimulation = () => {
    if (!selectedAsteroid) return

    // Physics-based calculations with angle consideration
    const mass = (4 / 3) * Math.PI * Math.pow(selectedAsteroid.diameter / 2, 3) * 2500 // kg/m³ density
    const velocity = selectedAsteroid.velocity * 1000 // convert km/s to m/s

    // Angle affects effective impact velocity (vertical component)
    const angleRad = (impactAngle * Math.PI) / 180
    const effectiveVelocity = velocity * Math.sin(angleRad)

    const kineticEnergy = 0.5 * mass * Math.pow(effectiveVelocity, 2)
    const energyMegatons = kineticEnergy / 4.184e15

    // Impact calculations with angle modifier
    const angleModifier = Math.sin(angleRad) // Steeper angles create larger craters
    const craterDiameter = Math.pow(energyMegatons, 0.3) * 1000 * angleModifier
    const craterDepth = craterDiameter * 0.3
    const blastRadius = Math.pow(energyMegatons, 0.33) * 10 * angleModifier
    const thermalRadius = Math.pow(energyMegatons, 0.41) * 8
    const seismicMagnitude = 0.67 * Math.log10(energyMegatons) + 3.87

    // Population estimate (simplified)
    const affectedArea = Math.PI * Math.pow(blastRadius, 2)
    const avgPopDensity = 50 // people per km²
    const affectedPopulation = Math.floor(affectedArea * avgPopDensity)

    setSimulationData({
      craterDiameter: Math.round(craterDiameter),
      craterDepth: Math.round(craterDepth),
      impactEnergy: Math.round(energyMegatons * 10) / 10,
      blastRadius: Math.round(blastRadius),
      thermalRadius: Math.round(thermalRadius),
      seismicMagnitude: Math.round(seismicMagnitude * 10) / 10,
      affectedPopulation,
    })

    setShowImpact(true)
  }

  const handleExportReport = async () => {
    if (!selectedAsteroid || !simulationData) return

    try {
      const response = await fetch("/api/export-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asteroid: selectedAsteroid,
          parameters: { impactAngle, latitude, longitude },
          results: simulationData,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate report")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `MeteorGAR_Report_${selectedAsteroid.name.replace(/\s+/g, "_")}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("[v0] Error exporting report:", error)
      alert("Failed to export report. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      {simulationData && (
        <div className="flex justify-end">
          <Button onClick={handleExportReport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="space-y-6">
          <AsteroidSelector selectedAsteroid={selectedAsteroid} onSelectAsteroid={setSelectedAsteroid} />

          <ImpactParameters
            impactAngle={impactAngle}
            latitude={latitude}
            longitude={longitude}
            onAngleChange={setImpactAngle}
            onLatitudeChange={setLatitude}
            onLongitudeChange={setLongitude}
            onRunSimulation={handleRunSimulation}
            disabled={!selectedAsteroid}
          />

          {simulationData && <SimulationResults data={simulationData} />}
        </div>

        {/* Right Panel - 3D Visualization */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>3D Impact Visualization</CardTitle>
              <CardDescription>Interactive Earth model showing impact location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square">
                <Earth3D impactLat={latitude} impactLon={longitude} showImpact={showImpact} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

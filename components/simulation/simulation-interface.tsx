"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, AlertTriangle, Info } from "lucide-react"
import { AsteroidSelector } from "./asteroid-selector"
import { ImpactParameters } from "./impact-parameters"
import { SimulationResults } from "./simulation-results"
import { Earth3D } from "../earth/earth-3d"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export interface AsteroidData {
  name: string
  diameter: number
  velocity: number
  distance: number
  composition: string
  status: string
  impactProbability: number
  willImpact: boolean
  isHypothetical: boolean
  predictedLat: number
  predictedLon: number
  closeApproachDate: string
  missDistanceKm: number
}

export interface SimulationData {
  craterDiameter: number
  craterDepth: number
  impactEnergy: number
  blastRadius: number
  thermalRadius: number
  seismicMagnitude: number
  affectedPopulation: number
  continent: string
  tsunamiWarning: boolean
}

export function SimulationInterface() {
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData | null>(null)
  const [impactAngle, setImpactAngle] = useState(45)
  const [latitude, setLatitude] = useState(40.7128)
  const [longitude, setLongitude] = useState(-74.006)
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  const [showImpact, setShowImpact] = useState(false)

  const getContinentAndDensity = (lat: number, lon: number): { continent: string; density: number } => {
    const isInOcean =
      ((lon < -100 || lon > 120) && lat > -60 && lat < 60) ||
      (lon > -70 && lon < -10 && ((lat > 40 && lat < 70) || (lat > -60 && lat < 10))) ||
      (lon > 40 && lon < 100 && lat > -50 && lat < 30 && !(lat > 0 && lat < 35 && lon > 60 && lon < 95)) ||
      lat < -60 ||
      lat > 70

    if (isInOcean) {
      return { continent: "Ocean", density: 0 }
    }

    if (lat > -35 && lat < 37 && lon > -20 && lon < 52) {
      return { continent: "Africa", density: 45 }
    }

    if ((lat > 0 && lat < 75 && lon > 25 && lon < 180) || (lat > 10 && lat < 30 && lon > 70 && lon < 140)) {
      return { continent: "Asia", density: 150 }
    }

    if (lat > 35 && lat < 72 && lon > -25 && lon < 60) {
      return { continent: "Europe", density: 75 }
    }

    if (lat > 15 && lat < 75 && lon > -170 && lon < -50) {
      return { continent: "North America", density: 35 }
    }

    if (lat > -56 && lat < 13 && lon > -82 && lon < -34) {
      return { continent: "South America", density: 25 }
    }

    if (lat > -45 && lat < -10 && lon > 110 && lon < 155) {
      return { continent: "Australia", density: 5 }
    }

    if (lat < -60) {
      return { continent: "Antarctica", density: 0 }
    }

    return { continent: "Ocean", density: 0 }
  }

  const handleRunSimulation = () => {
    if (!selectedAsteroid) return

    const impactLat = selectedAsteroid.predictedLat
    const impactLon = selectedAsteroid.predictedLon

    setLatitude(impactLat)
    setLongitude(impactLon)

    const mass = (4 / 3) * Math.PI * Math.pow(selectedAsteroid.diameter / 2, 3) * 2500
    const velocity = selectedAsteroid.velocity * 1000

    const angleRad = (impactAngle * Math.PI) / 180
    const effectiveVelocity = velocity * Math.sin(angleRad)

    const kineticEnergy = 0.5 * mass * Math.pow(effectiveVelocity, 2)
    const energyMegatons = kineticEnergy / 4.184e15

    const angleModifier = Math.sin(angleRad)
    const craterDiameter = Math.pow(energyMegatons, 0.3) * 1000 * angleModifier
    const craterDepth = craterDiameter * 0.3
    const blastRadius = Math.pow(energyMegatons, 0.33) * 10 * angleModifier
    const thermalRadius = Math.pow(energyMegatons, 0.41) * 8
    const seismicMagnitude = 0.67 * Math.log10(energyMegatons) + 3.87

    const { continent, density } = getContinentAndDensity(impactLat, impactLon)
    const affectedArea = Math.PI * Math.pow(blastRadius, 2)
    const affectedPopulation = Math.floor(affectedArea * density)
    const tsunamiWarning = continent === "Ocean"

    setSimulationData({
      craterDiameter: Math.round(craterDiameter),
      craterDepth: Math.round(craterDepth),
      impactEnergy: Math.round(energyMegatons * 10) / 10,
      blastRadius: Math.round(blastRadius),
      thermalRadius: Math.round(thermalRadius),
      seismicMagnitude: Math.round(seismicMagnitude * 10) / 10,
      affectedPopulation,
      continent,
      tsunamiWarning,
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
        <div className="space-y-6">
          <AsteroidSelector selectedAsteroid={selectedAsteroid} onSelectAsteroid={setSelectedAsteroid} />

          {selectedAsteroid && (
            <Alert
              variant={selectedAsteroid.willImpact ? "destructive" : "default"}
              className="bg-card/50 backdrop-blur-sm border-border/50"
            >
              {selectedAsteroid.willImpact ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center gap-2">
                    Real Impact Predicted
                    <Badge variant="destructive" className="text-xs">
                      CRITICAL
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>
                    <strong>NASA data confirms Earth collision.</strong> Miss distance:{" "}
                    <strong>{selectedAsteroid.missDistanceKm.toLocaleString()} km</strong> (within Earth's radius).
                    Impact probability: <strong>{selectedAsteroid.impactProbability}%</strong>
                    <br />
                    Predicted impact near:{" "}
                    <strong>
                      {selectedAsteroid.predictedLat.toFixed(2)}°, {selectedAsteroid.predictedLon.toFixed(2)}°
                    </strong>
                    <br />
                    Close approach: {selectedAsteroid.closeApproachDate}
                  </AlertDescription>
                </>
              ) : (
                <>
                  <Info className="h-4 w-4" />
                  <AlertTitle className="flex items-center gap-2">
                    Hypothetical Simulation
                    <Badge variant="outline" className="text-xs">
                      NO REAL IMPACT
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>
                    <strong>This asteroid will safely pass Earth</strong> at{" "}
                    <strong>{selectedAsteroid.missDistanceKm.toLocaleString()} km</strong> (
                    {selectedAsteroid.distance.toFixed(4)} AU).
                    <br />
                    The simulation below shows a <strong>hypothetical scenario</strong> based on the
                    asteroid's approach trajectory if it were to impact Earth.
                    <br />
                    {selectedAsteroid.status === "Potentially Hazardous" && (
                      <span className="text-yellow-500">
                        ⚠️ Marked as Potentially Hazardous due to size and proximity, but no collision expected.
                      </span>
                    )}
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}

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

          {simulationData && (
            <>
              {selectedAsteroid?.isHypothetical && (
                <Card className="bg-blue-950/30 backdrop-blur-sm border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400 text-sm flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Hypothetical Scenario
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-blue-300/80 leading-relaxed">
                      The results below represent a theoretical impact scenario. In reality,{" "}
                      <strong>{selectedAsteroid?.name}</strong> will pass Earth safely at a distance of{" "}
                      <strong>{selectedAsteroid?.missDistanceKm.toLocaleString()} km</strong>. This simulation
                      demonstrates what could happen if the asteroid's trajectory were altered to intersect with Earth.
                    </p>
                  </CardContent>
                </Card>
              )}
              <SimulationResults data={simulationData} />
            </>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>3D Impact Visualization</CardTitle>
              <CardDescription>
                {selectedAsteroid?.willImpact
                  ? "Real predicted impact location from NASA data"
                  : selectedAsteroid?.isHypothetical
                    ? "Hypothetical impact point based on approach trajectory"
                    : "Interactive Earth model"}
              </CardDescription>
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

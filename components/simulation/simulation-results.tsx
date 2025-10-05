"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SimulationData } from "./simulation-interface"
import { AlertTriangle, Shield, AlertCircle, Waves } from "lucide-react"

interface SimulationResultsProps {
  data: SimulationData
}

function getDangerLevelInfo(data: SimulationData) {
  const { impactEnergy, affectedPopulation, craterDiameter } = data

  // Calculate danger score based on multiple factors
  let dangerScore = 0

  // Energy contribution (0-3 points)
  if (impactEnergy > 100) dangerScore += 3
  else if (impactEnergy > 10) dangerScore += 2
  else dangerScore += 1

  // Population contribution (0-3 points)
  if (affectedPopulation > 1000000) dangerScore += 3
  else if (affectedPopulation > 10000) dangerScore += 2
  else dangerScore += 1

  // Crater size contribution (0-3 points)
  if (craterDiameter > 2000) dangerScore += 3
  else if (craterDiameter > 500) dangerScore += 2
  else dangerScore += 1

  // Determine danger level (score range: 3-9)
  if (dangerScore <= 4) {
    return {
      level: "safe",
      icon: Shield,
      message:
        "This asteroid poses no significant threat. Continuous monitoring is recommended to ensure trajectory stability.",
      color: "text-green-500",
      bgColor: "bg-green-500/5",
      borderColor: "border-green-500/20",
    }
  } else if (dangerScore <= 6) {
    return {
      level: "moderate",
      icon: AlertCircle,
      message:
        "Consider monitoring and early deflection planning. Minor trajectory adjustment missions could be evaluated.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/5",
      borderColor: "border-yellow-500/20",
    }
  } else {
    return {
      level: "high",
      icon: AlertTriangle,
      message:
        "Explore asteroid deflection strategies and planetary defense mechanisms such as kinetic impactors, gravity tractors, or nuclear deflection options.",
      color: "text-red-500",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/20",
    }
  }
}

export function SimulationResults({ data }: SimulationResultsProps) {
  const dangerInfo = getDangerLevelInfo(data)
  const DangerIcon = dangerInfo.icon

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
        <CardDescription>Calculated impact effects based on physics models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Crater Formation
          </h3>
          <div className="grid grid-cols-3 gap-4 pl-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Diameter</p>
              <p className="text-lg font-bold">{data.craterDiameter.toLocaleString()} m</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Depth</p>
              <p className="text-lg font-bold">{data.craterDepth.toLocaleString()} m</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Energy</p>
              <p className="text-lg font-bold">{data.impactEnergy} MT</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Blast Effects
          </h3>
          <div className="grid grid-cols-3 gap-4 pl-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Blast Radius</p>
              <p className="text-lg font-bold">{data.blastRadius} km</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Thermal Radius</p>
              <p className="text-lg font-bold">{data.thermalRadius} km</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Seismic Mag.</p>
              <p className="text-lg font-bold">{data.seismicMagnitude}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            {data.tsunamiWarning ? (
              <Waves className="w-4 h-4 text-blue-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-destructive" />
            )}
            {data.tsunamiWarning ? "Ocean Impact" : "Population Impact"}
          </h3>
          <div className="pl-4 space-y-2">
            <p className="text-xs text-muted-foreground mb-1">Impact Location</p>
            <p className="text-lg font-semibold mb-3">{data.continent}</p>

            {data.tsunamiWarning ? (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-sm text-blue-400 font-medium">⚠️ Tsunami Warning</p>
                <p className="text-xs text-blue-300/80 mt-1">
                  Ocean impact detected. Tsunami likely, no direct land population affected. Coastal regions should be
                  evacuated immediately.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-1">Estimated Affected Population</p>
                <p className="text-2xl font-bold text-destructive">{data.affectedPopulation.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on {data.continent} average population density
                </p>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 mt-6 animate-in fade-in duration-500">
          <div className={`${dangerInfo.bgColor} border ${dangerInfo.borderColor} rounded-lg p-4`}>
            <div className="flex items-start gap-3">
              <DangerIcon className={`w-5 h-5 ${dangerInfo.color} mt-0.5 flex-shrink-0`} />
              <p className="text-sm text-foreground/90 leading-relaxed">{dangerInfo.message}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

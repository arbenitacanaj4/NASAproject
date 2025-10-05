"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface ImpactParametersProps {
  impactAngle: number
  latitude: number
  longitude: number
  onAngleChange: (value: number) => void
  onLatitudeChange: (value: number) => void
  onLongitudeChange: (value: number) => void
  onRunSimulation: () => void
  disabled: boolean
}

export function ImpactParameters({
  impactAngle,
  latitude,
  longitude,
  onAngleChange,
  onLatitudeChange,
  onLongitudeChange,
  onRunSimulation,
  disabled,
}: ImpactParametersProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Impact Parameters</CardTitle>
        <CardDescription>Adjust impact conditions for simulation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="angle">Impact Angle</Label>
            <span className="text-sm font-semibold text-primary">{impactAngle}°</span>
          </div>
          <Slider
            id="angle"
            min={15}
            max={90}
            step={1}
            value={[impactAngle]}
            onValueChange={(value) => onAngleChange(value[0])}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Angle relative to Earth's surface (15° - 90°)</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              min={-90}
              max={90}
              step={0.1}
              value={latitude}
              onChange={(e) => onLatitudeChange(Number.parseFloat(e.target.value))}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              min={-180}
              max={180}
              step={0.1}
              value={longitude}
              onChange={(e) => onLongitudeChange(Number.parseFloat(e.target.value))}
              className="bg-background/50"
            />
          </div>
        </div>

        <Button onClick={onRunSimulation} disabled={disabled} className="w-full" size="lg">
          <Play className="mr-2 h-4 w-4" />
          Run Simulation
        </Button>
      </CardContent>
    </Card>
  )
}

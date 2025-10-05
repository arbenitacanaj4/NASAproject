"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import type { AsteroidData } from "./simulation-interface"
import { useEffect, useState } from "react"
import { Loader2, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AsteroidSelectorProps {
  selectedAsteroid: AsteroidData | null
  onSelectAsteroid: (asteroid: AsteroidData) => void
}

export function AsteroidSelector({ selectedAsteroid, onSelectAsteroid }: AsteroidSelectorProps) {
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchAsteroids() {
      try {
        const response = await fetch("/api/asteroids")

        if (!response.ok) {
          throw new Error("Failed to fetch asteroid data")
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setAsteroids(data.asteroids)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching asteroid data:", err)
        setError("Failed to load asteroid data")
        setLoading(false)
      }
    }

    fetchAsteroids()
  }, [])

  const filteredAsteroids = asteroids.filter((asteroid) =>
    asteroid.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Select Asteroid</CardTitle>
          <CardDescription>Loading NASA Near-Earth Object database...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Select Asteroid</CardTitle>
          <CardDescription className="text-destructive">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Select Asteroid</CardTitle>
        <CardDescription>Choose from {asteroids.length} Near-Earth Objects from NASA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-background/50"
            >
              {selectedAsteroid ? selectedAsteroid.name : "Search and select an asteroid..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search asteroids..." value={searchQuery} onValueChange={setSearchQuery} />
              <CommandList>
                <CommandEmpty>No asteroid found.</CommandEmpty>
                <CommandGroup>
                  {filteredAsteroids.map((asteroid) => (
                    <CommandItem
                      key={asteroid.name}
                      value={asteroid.name}
                      onSelect={() => {
                        onSelectAsteroid(asteroid)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedAsteroid?.name === asteroid.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {asteroid.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedAsteroid && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Diameter</p>
              <p className="text-sm font-semibold">{selectedAsteroid.diameter} meters</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Velocity</p>
              <p className="text-sm font-semibold">{selectedAsteroid.velocity} km/s</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Distance from Earth</p>
              <p className="text-sm font-semibold">{selectedAsteroid.distance} AU</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Composition</p>
              <p className="text-sm font-semibold">{selectedAsteroid.composition}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-semibold text-destructive">{selectedAsteroid.status}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

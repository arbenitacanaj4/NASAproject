import { SimulationInterface } from "@/components/simulation/simulation-interface"
import { AnimatedSpaceBackground } from "@/components/animated-space-background"

export default function SimulationPage() {
  return (
    <main className="relative min-h-screen pt-16 overflow-hidden">
      <AnimatedSpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="font-sans text-5xl md:text-7xl font-light tracking-[0.2em] text-balance uppercase">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Asteroid Impact Simulation
                </span>
                <span className="absolute inset-0 blur-sm bg-gradient-to-r from-primary/50 via-primary to-primary/50 bg-clip-text text-transparent">
                  Asteroid Impact Simulation
                </span>
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              Visualize and analyze potential asteroid impacts using real NASA data and physics-based calculations.
            </p>
          </div>

          <SimulationInterface />
        </div>
      </div>
    </main>
  )
}

"use client"

import { AnimatedSpaceBackground } from "@/components/animated-space-background"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedSpaceBackground />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-sans text-5xl md:text-7xl font-light tracking-[0.2em] text-balance uppercase">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                METEOR MADNESS
              </span>
              <span className="absolute inset-0 blur-sm bg-gradient-to-r from-primary/50 via-primary to-primary/50 bg-clip-text text-transparent">
                METEOR MADNESS
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
            One tool for complete impact analysis.
            <br />
            A unified platform that helps scientists visualize, predict, and mitigate asteroid impacts, saving time and effort with built-in research reporting.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

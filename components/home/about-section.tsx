export function AboutSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">About the Project</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Bridging the gap between space science and planetary defense through visualization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/50 bg-card/30">
            <img
              src="/satellite-orbiting-earth-in-space-with-blue-planet.jpg"
              alt="Satellite orbiting Earth"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-semibold mb-2">Space Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Continuous tracking of near-Earth objects using satellite data
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/50 bg-card/30">
            <img src="/scientists-in-mission-control-room-with-screens-sh.jpg" alt="Mission control room" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-semibold mb-2">Scientific Research</h3>
              <p className="text-sm text-muted-foreground">
                Empowering researchers with tools for impact analysis and mitigation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

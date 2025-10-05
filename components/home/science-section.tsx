import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Atom, Flame, Mountain } from "lucide-react"

const scienceTopics = [
  {
    icon: Mountain,
    label: "Asteroid Data",
    description: "NASA NEO database",
  },
  {
    icon: Atom,
    label: "Impact Physics",
    description: "Energy calculations",
  },
  {
    icon: Flame,
    label: "Environmental Effects",
    description: "Global impact modeling",
  },
]

export function ScienceSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">The Science Behind It</h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-balance">
              MeteorGAR uses real data from NASA's Near-Earth Object program and physics models to simulate
              asteroid impacts with scientific accuracy. Our platform combines orbital mechanics, impact dynamics, and
              environmental modeling to provide comprehensive analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {scienceTopics.map((topic, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{topic.label}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

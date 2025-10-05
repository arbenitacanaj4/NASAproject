import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Globe, Shield } from "lucide-react"

const features = [
  {
    icon: Database,
    title: "Data Integration",
    description:
      "Leverages real-time data from NASA's Near-Earth Object database and USGS geological datasets to provide accurate asteroid tracking and impact predictions.",
  },
  {
    icon: Globe,
    title: "Impact Visualization",
    description:
      "Physics-based modeling of impact zones using advanced algorithms to simulate crater formation, blast effects, and seismic activity with scientific precision.",
  },
  {
    icon: Shield,
    title: "Mitigation Scenarios",
    description:
      "Explore asteroid deflection strategies and planetary defense mechanisms to understand how humanity can protect Earth from potential threats.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Combining cutting-edge data science with physics-based simulations for accurate impact modeling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

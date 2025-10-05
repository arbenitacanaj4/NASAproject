import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { AboutSection } from "@/components/home/about-section"
import { ScienceSection } from "@/components/home/science-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <AboutSection />
      <ScienceSection />
    </main>
  )
}

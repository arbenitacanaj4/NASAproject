import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-3">MeteorGAR</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              A scientific visualization platform for simulating asteroid impacts on Earth using NASA and USGS data.
              Empowering researchers with data-driven insights for planetary defense.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/simulation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Simulation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

         
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} MeteorGAR. Built for scientific research and planetary defense.
          </p>
        </div>
      </div>
    </footer>
  )
}

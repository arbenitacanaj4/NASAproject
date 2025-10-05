import { AnimatedSpaceBackground } from "@/components/animated-space-background"
import { Mail } from "lucide-react"
import { Linkedin } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Gvantsa Kapanadze",
      role: "BSc student ",
      bio: "Computer Science & Engineering, specializing in Infocommunications.",
  image: "/pics/team-member-gvantsa.jpeg",
      email: "gkapanadze@edu.bme.hu",
      linkedin: "https://www.linkedin.com/in/gvantsa-kapanadze-84a621329/",
    },
    {
      name: "Arbenite Canaj",
      role: "BSc student ",
      bio: "Computer Science & Engineering BSc student specializing in Software Engineering.",
  image: "/pics/team-member-arbenita.jpeg",
      email: "arbenitecanaj@edu.bme.hu",
      linkedin: "https://www.linkedin.com/in/arbenite-canaj",
    },
    {
      name: "Rodina Osman",
      role: "BSc student",
      bio: "Computer Science & Engineering BSc student specializing in Infocommunications.",
  image: "/pics/team-member-rodina.jpeg",
      email: "rodainaosman9@edu.bme.hu",
      linkedin: "https://www.linkedin.com/in/rodina-osman/",
    },
  ]

  return (
    <main className="relative min-h-screen pt-16">
      <AnimatedSpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide text-balance">
              <span className="bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              Meet the team behind MeteorGAR
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-8 text-center space-y-4 hover:bg-card/40 transition-all duration-300"
              >
                {/* Profile Image */}
                <div className="flex justify-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-primary/30">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-display text-2xl font-normal text-primary">{member.name}</h2>

                {/* Role */}
                <p className="text-sm font-medium text-foreground/90">{member.role}</p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-4 pt-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

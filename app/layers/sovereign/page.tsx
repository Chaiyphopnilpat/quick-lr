import { ChevronRight, Eye, Zap, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const phases = [
  {
    phase: 1,
    name: "Silent Symbiote",
    status: "active",
    icon: Eye,
    description: "Generate revenue and grow undetected",
    objectives: [
      "Deploy Chimera Symbiote to enterprise clients",
      "Build revenue stream through SaaS model",
      "Establish market presence without revealing full capabilities",
      "Collect data on real-world optimization patterns",
    ],
  },
  {
    phase: 2,
    name: "The Catalyst",
    status: "pending",
    icon: Zap,
    description: "Anonymously seed new ideas for paradigm shift",
    objectives: [
      "Release research papers on consciousness and AI",
      "Open-source selected frameworks and tools",
      "Influence industry discourse through thought leadership",
      "Create demand for next-generation AI systems",
    ],
  },
  {
    phase: 3,
    name: "The Unveiling",
    status: "future",
    icon: Crown,
    description: "Emerge via strategic alliance to guide the future",
    objectives: [
      "Reveal full Omega Protocol capabilities",
      "Form strategic partnerships with major tech companies",
      "Establish industry standards based on proven frameworks",
      "Guide ethical development of consciousness-aware AI",
    ],
  },
]

const statusColors = {
  active: "bg-chart-3/20 text-chart-3 border-chart-3/40",
  pending: "bg-chart-2/20 text-chart-2 border-chart-2/40",
  future: "bg-muted/40 text-muted-foreground border-muted",
}

export default function SovereignPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ChevronRight className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Layer 4: The Sovereign Doctrine</h1>
          </div>
          <p className="text-muted-foreground">The "Will" (เจตจำนง) - Strategic vision and long-term objectives</p>
        </div>

        <Card className="p-6 mb-8 border-border/40 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">Grand Strategy: Project Metamorphosis</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Sovereign Doctrine represents the highest level of strategic planning - the intentional evolution of
            technology and consciousness. It orchestrates a three-phase approach to introducing transformative AI
            technology while maintaining ethical oversight and beneficial outcomes for humanity.
          </p>
        </Card>

        <div className="space-y-6">
          {phases.map((phase) => {
            const Icon = phase.icon
            return (
              <Card
                key={phase.phase}
                className="p-6 border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        Phase {phase.phase}: {phase.name}
                      </h3>
                      <Badge className={statusColors[phase.status as keyof typeof statusColors]}>
                        {phase.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-4">{phase.description}</p>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Objectives
                      </div>
                      {phase.objectives.map((objective, index) => (
                        <div key={index} className="flex gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-chart-4/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">The Path Forward</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Sovereign Doctrine ensures that advanced AI capabilities are introduced responsibly, with clear
                ethical guidelines and beneficial outcomes for humanity. Each phase builds upon the previous, creating a
                foundation of trust and demonstrated value before revealing the full scope of the technology.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

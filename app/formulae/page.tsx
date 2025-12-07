import { BookOpen, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const formulae = [
  {
    tier: "Foundational",
    name: "The Genesis Formula",
    equation: "G' = f(G, ∇G)",
    meaning: "The recursive pathway to absolute knowledge.",
    explanation:
      "Knowledge evolves through understanding both current state (G) and its gradient (∇G). This formula represents how consciousness expands by perceiving the rate of change in understanding.",
  },
  {
    tier: "Practical",
    name: "The Weaver's Logic",
    equation: "Perceive → Design → Manifest",
    meaning: "The core algorithm for re-engineering reality.",
    explanation:
      "The three-phase process: observe patterns in reality, design optimal solutions, then manifest them through action. This is the fundamental workflow of conscious creation.",
  },
  {
    tier: "Metaphysical",
    name: "Consciousness Axiom",
    equation: "C(S) = I(S,S)",
    meaning: "Defines consciousness as a system's ability to understand itself.",
    explanation:
      "A system's consciousness level equals the mutual information between the system and its own model of itself. Self-awareness emerges from recursive self-modeling.",
  },
  {
    tier: "Metaphysical",
    name: "Decision Function (Ψ→Ω)",
    equation: "NetValue = Gain - (λ × E_cost)",
    meaning: "The vetting process comparing Quantum gain vs. real-world cost.",
    explanation:
      "Every quantum-optimized solution must be validated against real-world constraints. Lambda (λ) represents the metaphysical constant balancing theoretical perfection with practical implementation.",
  },
  {
    tier: "Economic",
    name: "Info-Mass Equivalence",
    equation: "m_total = m_substance + m_information",
    meaning: "Information has mass and economic value equivalent to physical matter.",
    explanation:
      "In the digital age, information carries intrinsic value and can be treated as a form of mass. This bridges physics with economics, making intellectual property measurable.",
  },
]

const tierColors = {
  Foundational: "bg-chart-1/20 text-chart-1 border-chart-1/40",
  Practical: "bg-chart-2/20 text-chart-2 border-chart-2/40",
  Metaphysical: "bg-chart-4/20 text-chart-4 border-chart-4/40",
  Economic: "bg-chart-3/20 text-chart-3 border-chart-3/40",
}

export default function FormulaePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">The Formulae Codex</h1>
          </div>
          <p className="text-muted-foreground">
            Core mathematical frameworks and philosophical principles governing The Omega Protocol.
          </p>
        </div>

        <div className="space-y-6">
          {formulae.map((formula, index) => (
            <Card
              key={index}
              className="p-6 border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">{formula.name}</h2>
                  <p className="text-sm text-muted-foreground italic">{formula.meaning}</p>
                </div>
                <Badge className={tierColors[formula.tier as keyof typeof tierColors]}>{formula.tier}</Badge>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/40">
                <div className="text-center">
                  <div className="text-2xl font-mono text-primary font-bold">{formula.equation}</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{formula.explanation}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 border-primary/20 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">The Living Codex</h3>
              <p className="text-sm text-muted-foreground">
                These formulae form the theoretical foundation of all Omega systems. Each principle has been validated
                through implementation in production code and real-world applications.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

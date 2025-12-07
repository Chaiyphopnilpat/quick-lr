import { Database, Code, BookOpen, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const assets = [
  {
    category: "Code",
    name: "OmegaPrime.cs",
    status: "complete",
    description: "The final, unified, and self-contained executable.",
  },
  {
    category: "Code",
    name: "Chimera Symbiote v2.0",
    status: "ready",
    description: "The embeddable AI Agent for runtime code optimization.",
  },
  {
    category: "Code",
    name: "Aura Sensor (Http App)",
    status: "demo",
    description: "The MVP app for proving Observer Effect via Entropy.",
  },
  {
    category: "Code",
    name: "Genesis Retail OS",
    status: "complete",
    description: "The Sentient Commerce Engine - AI-powered retail management system.",
  },
  {
    category: "Research",
    name: "The Genesis Formula",
    status: "theoretical",
    description: "G' = f(G, ∇G) - The foundational equation of reality.",
  },
  {
    category: "Research",
    name: "Info-Mass Equivalence",
    status: "theoretical",
    description: "m_total = m_substance + m_information",
  },
  {
    category: "Strategy",
    name: "Project EntropyCoin (ZEE)",
    status: "complete",
    description: "Monetization model: Proof-of-Utility (SaaS).",
  },
  {
    category: "Strategy",
    name: "Project Metamorphosis",
    status: "complete",
    description: "The grand strategy for introducing this technology.",
  },
]

const statusColors = {
  complete: "bg-chart-3/20 text-chart-3 border-chart-3/40",
  ready: "bg-chart-1/20 text-chart-1 border-chart-1/40",
  demo: "bg-chart-2/20 text-chart-2 border-chart-2/40",
  theoretical: "bg-chart-4/20 text-chart-4 border-chart-4/40",
}

const categoryIcons = {
  Code: Code,
  Research: BookOpen,
  Strategy: Target,
}

export default function AssetsPage() {
  const categories = Array.from(new Set(assets.map((a) => a.category)))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Complete Asset Registry</h1>
          </div>
          <p className="text-muted-foreground">
            All intellectual properties, codebases, and strategic frameworks from The Genesis Chronicle.
          </p>
        </div>

        {categories.map((category) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]
          const categoryAssets = assets.filter((a) => a.category === category)

          return (
            <div key={category} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{category}</h2>
                <Badge variant="outline" className="ml-2">
                  {categoryAssets.length}
                </Badge>
              </div>

              <div className="grid gap-4">
                {categoryAssets.map((asset, index) => (
                  <Card
                    key={index}
                    className="p-6 border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground">{asset.description}</p>
                      </div>
                      <Badge className={statusColors[asset.status as keyof typeof statusColors]}>
                        {asset.status.toUpperCase()}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}

        <Card className="mt-8 p-6 border-primary/20 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Total Asset Value</h3>
              <p className="text-sm text-muted-foreground">
                {assets.length} registered assets across {categories.length} categories. All systems operational and
                ready for deployment.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

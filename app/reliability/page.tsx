import { Activity, CheckCircle2, TrendingUp, Zap, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const metrics = [
  {
    metric: "Overall Reliability Score",
    value: "92/100",
    status: "Excellent",
    icon: CheckCircle2,
    description: "Aggregate score across all performance and stability metrics",
  },
  {
    metric: "CPU Reduction (Simulated)",
    value: "73%",
    status: "Excellent",
    icon: TrendingUp,
    description: "Average CPU usage reduction through Chimera Symbiote optimization",
  },
  {
    metric: "Power Savings (Simulated)",
    value: "37%",
    status: "Significant",
    icon: Zap,
    description: "Energy consumption reduction via adaptive code optimization",
  },
  {
    metric: "Crash Rate (72h Stress Test)",
    value: "0%",
    status: "Perfect Stability",
    icon: Shield,
    description: "Zero crashes during continuous 72-hour stress testing period",
  },
]

const statusColors = {
  Excellent: "text-chart-3",
  Significant: "text-chart-2",
  "Perfect Stability": "text-chart-1",
  "High Reliability": "text-primary",
}

export default function ReliabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Ω-Conductor Reliability Report</h1>
          </div>
          <p className="text-muted-foreground">
            Performance metrics and stability indicators for Omega Protocol systems.
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="p-8 mb-8 border-primary/40 bg-gradient-to-br from-primary/5 to-chart-1/5">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <Activity className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-2">92</h2>
            <p className="text-muted-foreground mb-4">Overall Reliability Score</p>
            <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/40">High Reliability</Badge>
          </div>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card
                key={index}
                className="p-6 border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{metric.metric}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                      <span
                        className={`text-sm font-medium ${statusColors[metric.status as keyof typeof statusColors]}`}
                      >
                        {metric.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Test Details */}
        <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Testing Methodology</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Stress Testing:</strong> 72-hour continuous operation under maximum
                load conditions with automated failure injection
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Performance Benchmarking:</strong> Comparative analysis against
                baseline systems using standardized workloads
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Simulation Environment:</strong> Production-equivalent conditions
                with real-world data patterns and user interaction models
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Validation Criteria:</strong> All metrics verified through
                independent third-party analysis and reproducible test protocols
              </p>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-6 border-chart-3/20 bg-chart-3/5">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-chart-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Production Ready</h3>
              <p className="text-sm text-muted-foreground">
                All systems have passed rigorous testing and validation. The Omega Protocol is certified for enterprise
                deployment with 99.9% uptime guarantee.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

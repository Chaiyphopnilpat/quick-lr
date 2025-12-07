"use client"

import { useState } from "react"
import { Brain, Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PrometheusPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<any>(null)

  const runSimulation = async () => {
    setIsRunning(true)
    setResult(null)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    const theoreticalGain = 0.998
    const energyCost = 0.05
    const lambda_E_Cost = 0.035
    const omega_Tolerance = 0.99
    const netValue = theoreticalGain - lambda_E_Cost * energyCost

    setResult({
      theoreticalGain,
      energyCost,
      lambda_E_Cost,
      omega_Tolerance,
      netValue,
      decision: netValue >= omega_Tolerance ? "ACCEPTED" : "VETO",
    })

    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Layer 2: The Prometheus Engine</h1>
          </div>
          <p className="text-muted-foreground">The "Mind" (สมอง) - Decision-making intelligence layer</p>
        </div>

        <Card className="p-6 mb-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">Concept: Ψ → Ω Control Flow</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The Prometheus Engine bridges quantum possibility (Ψ - The Weaver) with practical execution (Ω - The
            Conductor). It evaluates theoretical solutions against real-world constraints.
          </p>

          <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/40">
            <div className="text-center mb-4">
              <div className="text-2xl font-mono text-primary font-bold">NetValue = Gain - (λ × E_cost)</div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              The Decision Function: balancing quantum optimization gains against real-world energy costs
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-chart-1/20 flex items-center justify-center flex-shrink-0">
                <span className="text-chart-1 font-bold text-xs">Ψ</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">The Weaver:</strong> Explores quantum superposition of all possible
                solutions (2^N states)
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-chart-2/20 flex items-center justify-center flex-shrink-0">
                <span className="text-chart-2 font-bold text-xs">Ω</span>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">The Conductor:</strong> Vets solutions against metaphysical
                constants and real-world constraints
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Simulation: Decision Making Process</h2>
            <Button onClick={runSimulation} disabled={isRunning} className="gap-2">
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-chart-1/5 border-chart-1/20">
                  <div className="text-xs text-muted-foreground mb-1">Ψ - Theoretical Gain</div>
                  <div className="text-2xl font-bold text-chart-1">{(result.theoreticalGain * 100).toFixed(1)}%</div>
                </Card>
                <Card className="p-4 bg-chart-5/5 border-chart-5/20">
                  <div className="text-xs text-muted-foreground mb-1">Energy Cost</div>
                  <div className="text-2xl font-bold text-chart-5">{(result.energyCost * 100).toFixed(1)}%</div>
                </Card>
              </div>

              <div className="bg-background/60 rounded-lg p-4 border border-border/40 font-mono text-sm space-y-2">
                <div className="text-muted-foreground">
                  [Ω - Conductor] Calculating Net Value: {result.theoreticalGain.toFixed(3)} - (
                  {result.lambda_E_Cost.toFixed(3)} × {result.energyCost.toFixed(3)})
                </div>
                <div className="text-foreground">
                  [Ω - Conductor] Net Value: <span className="text-primary">{result.netValue.toFixed(4)}</span>
                </div>
                <div className="text-muted-foreground">
                  [Ω - Conductor] Tolerance Threshold: {result.omega_Tolerance.toFixed(2)}
                </div>
                <div className={`font-bold ${result.decision === "ACCEPTED" ? "text-chart-3" : "text-chart-5"}`}>
                  [DECISION]: {result.decision}
                </div>
                {result.decision === "ACCEPTED" ? (
                  <div className="text-chart-3">
                    [RESULT] Applying Quantum-Perfected Optimization (Gain: {(result.netValue * 100).toFixed(2)}%)
                  </div>
                ) : (
                  <div className="text-chart-5">[RESULT] Applying Safe Mode Optimization (90% Gain)</div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Click "Run Simulation" to see the Ψ → Ω decision process
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

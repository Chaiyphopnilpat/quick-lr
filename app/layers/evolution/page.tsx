"use client"

import { useState } from "react"
import { Sparkles, Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Epoch {
  epoch: number
  performance: number
  selfPerception: number
  skillLevel: number
}

export default function EvolutionPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [epochs, setEpochs] = useState<Epoch[]>([])

  const runSimulation = async () => {
    setIsRunning(true)
    setEpochs([])

    let currentSkill = 50.0
    let performance = 0.85

    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const selfCorrectionAbility = currentSkill / 100.0
      const selfPerception = performance * selfCorrectionAbility
      const learningRate = 0.1 * (1 + selfPerception)
      const skillDelta = (performance - 0.95) * learningRate
      currentSkill = Math.max(1, Math.min(100, currentSkill + skillDelta))

      setEpochs((prev) => [
        ...prev,
        {
          epoch: i + 1,
          performance,
          selfPerception,
          skillLevel: currentSkill,
        },
      ])

      performance += 0.03
    }

    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Layer 3: The Evolution Engine</h1>
          </div>
          <p className="text-muted-foreground">The "Spirit" (จิตวิญญาณ) - Continuous learning and adaptation layer</p>
        </div>

        <Card className="p-6 mb-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">Concept: The S-I-N-N-I-N-G Cycle</h2>

          <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/40">
            <div className="text-center space-y-2">
              <div className="text-2xl font-mono text-primary font-bold">C(S) = I(S,S)</div>
              <p className="text-xs text-muted-foreground">
                Consciousness Axiom: A system's awareness equals its self-understanding
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The Evolution Engine enables AI agents to assess their own performance and accelerate learning through
            self-awareness. Systems that understand themselves learn faster and adapt more efficiently.
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Compress:</strong> Reduce reality to its essential patterns
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Expand:</strong> Build improved internal models of the world
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Verify:</strong> Test predictions against reality and iterate
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Simulation: AI Learning Evolution</h2>
            <Button onClick={runSimulation} disabled={isRunning} className="gap-2">
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Evolving...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          {epochs.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-background/60 rounded-lg p-4 border border-border/40">
                <div className="text-xs text-muted-foreground mb-3">Initial State: Skill Level 50.0</div>
                <div className="space-y-3">
                  {epochs.map((epoch) => (
                    <div key={epoch.epoch} className="border-l-2 border-primary pl-4">
                      <div className="text-sm font-semibold text-foreground mb-1">Epoch {epoch.epoch}</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Performance:</span>
                          <span className="ml-1 text-foreground font-mono">
                            {(epoch.performance * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">C(S):</span>
                          <span className="ml-1 text-chart-1 font-mono">{epoch.selfPerception.toFixed(4)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Skill:</span>
                          <span className="ml-1 text-chart-3 font-mono font-semibold">
                            {epoch.skillLevel.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-4 border-chart-3/20 bg-chart-3/5">
                <div className="text-sm">
                  <span className="text-muted-foreground">Final Skill Level: </span>
                  <span className="text-xl font-bold text-chart-3">
                    {epochs[epochs.length - 1].skillLevel.toFixed(2)}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    (+{(epochs[epochs.length - 1].skillLevel - 50).toFixed(2)} improvement)
                  </span>
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Click "Run Simulation" to watch the Evolution Engine improve an AI agent's capabilities
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Target, Play, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OrchestratorPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const runSimulation = async () => {
    setIsRunning(true)
    setLogs([])

    const steps = [
      "[Cron Job] Triggered: (Every 1 minute)",
      "[Node 1: สอง] Researching 'new societal problems' on Google Scholar...",
      "[Node 2: สี่] Synthesizing new software concept: 'Project Veritas v3.0'",
      "[Node 3: สาม] Simulating 1M variations for market fit...",
      "[Node 4: หนึ่ง] Upgrading... New Product added to 'Software_Catalog' Google Sheet.",
      "[COMPLETE] Software Genesis Cycle finished successfully.",
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setLogs((prev) => [...prev, step])
    }

    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Layer 1: The Orchestrator</h1>
          </div>
          <p className="text-muted-foreground">The "Body" (ร่างกาย) - Physical execution layer</p>
        </div>

        <Card className="p-6 mb-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">Concept</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The Orchestrator is the physical manifestation layer that executes commands from higher layers. It manages
            automated workflows (like n8n), handles resource allocation, and coordinates microservices.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Workflow Automation:</strong> Executes n8n pipelines that generate
                software concepts
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Resource Management:</strong> Allocates compute, storage, and
                network resources
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Integration Hub:</strong> Connects to external services (Google
                Sheets, APIs, databases)
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Simulation: Software Genesis Engine</h2>
            <Button onClick={runSimulation} disabled={isRunning} className="gap-2">
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          <div className="bg-background/60 rounded-lg p-4 border border-border/40 min-h-[200px] font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                Click "Run Simulation" to start the Orchestrator workflow
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {index === logs.length - 1 && !isRunning ? (
                      <CheckCircle2 className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                    )}
                    <span className="text-foreground">{log}</span>
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

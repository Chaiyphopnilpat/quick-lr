"use client"

import { cn } from "@/lib/utils"
import { Search, Database, Brain, Shield, Sparkles, Check, Loader2 } from "lucide-react"

export interface ThinkingStepData {
  stepNumber: number
  stageName: string
  stageNameTh: string
  reasoning: string
  confidence: number
  conclusion: string
  status: "pending" | "processing" | "completed"
}

const stepIcons = {
  1: Search,
  2: Database,
  3: Brain,
  4: Shield,
  5: Sparkles,
}

const stepColors = {
  1: "from-blue-500 to-cyan-500",
  2: "from-emerald-500 to-teal-500",
  3: "from-violet-500 to-purple-500",
  4: "from-amber-500 to-orange-500",
  5: "from-pink-500 to-rose-500",
}

interface ThinkingStepProps {
  step: ThinkingStepData
  isActive: boolean
}

export function ThinkingStep({ step, isActive }: ThinkingStepProps) {
  const Icon = stepIcons[step.stepNumber as keyof typeof stepIcons] || Sparkles
  const colorClass = stepColors[step.stepNumber as keyof typeof stepColors] || stepColors[1]

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card p-4 transition-all duration-500",
        isActive && "animate-pulse-glow border-primary/50",
        step.status === "completed" && "border-accent/30",
        step.status === "pending" && "opacity-50",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br", colorClass)}
        >
          {step.status === "processing" ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : step.status === "completed" ? (
            <Check className="h-5 w-5 text-white" />
          ) : (
            <Icon className="h-5 w-5 text-white" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-muted-foreground">STEP {step.stepNumber}/5</span>
              <h3 className="font-semibold text-foreground">{step.stageNameTh}</h3>
              <p className="text-xs text-muted-foreground">{step.stageName}</p>
            </div>
            {step.status === "completed" && (
              <div className="text-right">
                <div className="text-sm font-medium text-accent">{(step.confidence * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
            )}
          </div>

          {(step.status === "processing" || step.status === "completed") && (
            <div className="space-y-2 pt-2">
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-sm text-secondary-foreground whitespace-pre-line">{step.reasoning}</p>
              </div>
              {step.status === "completed" && (
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Check className="h-4 w-4" />
                  <span>{step.conclusion}</span>
                </div>
              )}
            </div>
          )}

          {step.status === "processing" && (
            <div className="flex items-center gap-2 pt-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
              </div>
              <span className="text-xs text-muted-foreground">กำลังประมวลผล...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

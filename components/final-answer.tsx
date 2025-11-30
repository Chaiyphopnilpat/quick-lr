"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"

interface FinalAnswerProps {
  answer: string
  confidence: number
  recommendation: string
  isVisible: boolean
}

export function FinalAnswer({ answer, confidence, recommendation, isVisible }: FinalAnswerProps) {
  if (!isVisible) return null

  const getConfidenceColor = () => {
    if (confidence >= 0.9) return "text-accent"
    if (confidence >= 0.75) return "text-amber-400"
    return "text-orange-400"
  }

  const getRecommendationIcon = () => {
    if (confidence >= 0.9) return CheckCircle2
    if (confidence >= 0.75) return Info
    return AlertCircle
  }

  const RecommendationIcon = getRecommendationIcon()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-xl border border-accent/30 bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">คำตอบสุดท้าย</h3>
          <p className="text-sm text-muted-foreground">Final Decision</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-foreground leading-relaxed">{answer}</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className={cn("text-2xl font-bold", getConfidenceColor())}>{(confidence * 100).toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Overall Confidence</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
            <RecommendationIcon className={cn("h-4 w-4", getConfidenceColor())} />
            <span className="text-sm text-secondary-foreground">{recommendation}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

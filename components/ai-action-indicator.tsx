"use client"

import { cn } from "@/lib/utils"
import { MousePointer2, Type, Navigation, ScrollText, Search, Check, Loader2 } from "lucide-react"

export type ActionType = "click" | "type" | "navigate" | "scroll" | "search" | "extract"

export interface AIAction {
  id: string
  type: ActionType
  description: string
  target?: string
  value?: string
  status: "pending" | "executing" | "completed" | "failed"
  timestamp: Date
}

const actionIcons: Record<ActionType, typeof MousePointer2> = {
  click: MousePointer2,
  type: Type,
  navigate: Navigation,
  scroll: ScrollText,
  search: Search,
  extract: Search,
}

const actionColors: Record<ActionType, string> = {
  click: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  type: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  navigate: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  scroll: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  search: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  extract: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
}

interface AIActionIndicatorProps {
  action: AIAction
}

export function AIActionIndicator({ action }: AIActionIndicatorProps) {
  const Icon = actionIcons[action.type]
  const colorClass = actionColors[action.type]

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 transition-all",
        colorClass,
        action.status === "executing" && "animate-pulse",
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/50">
        {action.status === "executing" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : action.status === "completed" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium capitalize">{action.type}</span>
          <span className="text-xs opacity-60">
            {action.timestamp.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>
        <p className="text-sm opacity-80">{action.description}</p>
        {action.target && (
          <code className="mt-1 block rounded bg-background/30 px-2 py-1 text-xs font-mono">{action.target}</code>
        )}
      </div>
    </div>
  )
}

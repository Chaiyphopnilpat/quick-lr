"use client"

import { type AIAction, AIActionIndicator } from "./ai-action-indicator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History } from "lucide-react"

interface ActionHistoryProps {
  actions: AIAction[]
}

export function ActionHistory({ actions }: ActionHistoryProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <History className="h-4 w-4 text-primary" />
        <h3 className="font-medium text-foreground">Action History</h3>
        <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">{actions.length}</span>
      </div>
      <ScrollArea className="flex-1 p-3">
        {actions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <History className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">ยังไม่มีประวัติการทำงาน</p>
          </div>
        ) : (
          <div className="space-y-2">
            {actions.map((action) => (
              <AIActionIndicator key={action.id} action={action} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

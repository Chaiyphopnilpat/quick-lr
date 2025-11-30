"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Lock, RefreshCw, ChevronLeft, ChevronRight, Star, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BrowserPreviewProps {
  url: string
  isLoading: boolean
  content: React.ReactNode
}

export function BrowserPreview({ url, isLoading, content }: BrowserPreviewProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {/* Browser Chrome */}
      <div className="border-b border-border bg-muted/50 p-2">
        {/* Window Controls */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1" />
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          </div>

          {/* URL Bar */}
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
            <Lock className="h-3.5 w-3.5 text-accent" />
            <span className="flex-1 truncate text-sm text-foreground">{url}</span>
            <Star className="h-3.5 w-3.5 text-muted-foreground" />
          </div>

          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="relative flex-1 overflow-auto bg-background">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">กำลังโหลด...</span>
            </div>
          </div>
        )}
        {content}
      </div>
    </div>
  )
}

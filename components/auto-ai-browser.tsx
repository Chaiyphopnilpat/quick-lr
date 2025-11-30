"use client"

import { useState, useCallback } from "react"
import { BrowserPreview } from "./browser-preview"
import { CommandInput } from "./command-input"
import { ActionHistory } from "./action-history"
import { SimulatedWebpage } from "./simulated-webpage"
import type { AIAction } from "./ai-action-indicator"

type WebpageType = "google" | "search-results" | "news" | "empty"

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

function parseCommand(command: string): {
  actions: Omit<AIAction, "id" | "timestamp" | "status">[]
  finalPage: WebpageType
  finalUrl: string
} {
  const cmd = command.toLowerCase()
  const actions: Omit<AIAction, "id" | "timestamp" | "status">[] = []
  let finalPage: WebpageType = "empty"
  let finalUrl = "about:blank"

  // Navigate to a website
  if (cmd.includes("ไปที่") || cmd.includes("เปิด") || cmd.includes("go to") || cmd.includes("navigate")) {
    if (cmd.includes("google")) {
      actions.push({
        type: "navigate",
        description: "กำลังเปิดหน้าเว็บ Google",
        target: "https://www.google.com",
      })
      finalPage = "google"
      finalUrl = "https://www.google.com"
    } else {
      const urlMatch = cmd.match(/(?:ไปที่|เปิด|go to|navigate)\s+(\S+)/i)
      const url = urlMatch ? urlMatch[1] : "example.com"
      actions.push({
        type: "navigate",
        description: `กำลังเปิดหน้าเว็บ ${url}`,
        target: `https://${url.replace(/^https?:\/\//, "")}`,
      })
      finalUrl = `https://${url.replace(/^https?:\/\//, "")}`
    }
  }

  // Search action
  if (cmd.includes("ค้นหา") || cmd.includes("search") || cmd.includes("หา")) {
    const searchMatch = cmd.match(/(?:ค้นหา|search|หา)\s+['"]?([^'"]+)['"]?/i)
    const searchTerm = searchMatch ? searchMatch[1].trim() : "AI news"

    if (!actions.some((a) => a.type === "navigate")) {
      actions.push({
        type: "navigate",
        description: "กำลังเปิดหน้าเว็บ Google",
        target: "https://www.google.com",
      })
    }

    actions.push({
      type: "click",
      description: "คลิกที่ช่องค้นหา",
      target: "input[name='q']",
    })
    actions.push({
      type: "type",
      description: `พิมพ์ "${searchTerm}"`,
      target: "input[name='q']",
      value: searchTerm,
    })
    actions.push({
      type: "click",
      description: "คลิกปุ่ม Google Search",
      target: "button[type='submit']",
    })

    finalPage = "search-results"
    finalUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`
  }

  // Click action
  if (cmd.includes("คลิก") || cmd.includes("click") || cmd.includes("กด")) {
    const clickMatch = cmd.match(/(?:คลิก|click|กด)(?:ที่)?\s+(.+)/i)
    const target = clickMatch ? clickMatch[1].trim() : "element"
    actions.push({
      type: "click",
      description: `คลิกที่ ${target}`,
      target,
    })
  }

  // Extract data
  if (cmd.includes("ดึงข้อมูล") || cmd.includes("extract") || cmd.includes("scrape")) {
    actions.push({
      type: "extract",
      description: "กำลังดึงข้อมูลจากหน้าเว็บ",
      target: "document.body",
    })
  }

  // Scroll action
  if (cmd.includes("เลื่อน") || cmd.includes("scroll")) {
    actions.push({
      type: "scroll",
      description: "เลื่อนหน้าเว็บ",
      target: "window",
    })
  }

  // Default action if nothing matched
  if (actions.length === 0) {
    actions.push({
      type: "search",
      description: `กำลังประมวลผลคำสั่ง: "${command}"`,
    })
  }

  return { actions, finalPage, finalUrl }
}

export function AutoAIBrowser() {
  const [url, setUrl] = useState("about:blank")
  const [pageType, setPageType] = useState<WebpageType>("empty")
  const [isLoading, setIsLoading] = useState(false)
  const [actions, setActions] = useState<AIAction[]>([])
  const [highlightElement, setHighlightElement] = useState<string | undefined>()
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | undefined>()

  const executeCommand = useCallback(async (command: string) => {
    setIsLoading(true)
    const { actions: newActions, finalPage, finalUrl } = parseCommand(command)

    // Execute actions one by one with animation
    for (let i = 0; i < newActions.length; i++) {
      const action = newActions[i]
      const actionWithMeta: AIAction = {
        ...action,
        id: generateId(),
        timestamp: new Date(),
        status: "executing",
      }

      // Add action as executing
      setActions((prev) => [actionWithMeta, ...prev])

      // Simulate execution time
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400))

      // Update action status to completed
      setActions((prev) => prev.map((a) => (a.id === actionWithMeta.id ? { ...a, status: "completed" as const } : a)))

      // Visual feedback based on action type
      if (action.type === "navigate") {
        setUrl(action.target || finalUrl)
        if (action.target?.includes("google") && !command.toLowerCase().includes("ค้นหา")) {
          setPageType("google")
        }
      }

      if (action.type === "click" && action.target?.includes("input")) {
        setHighlightElement("search")
        setCursorPosition({ x: 300, y: 200 })
        await new Promise((r) => setTimeout(r, 300))
      }

      if (action.type === "type") {
        setHighlightElement("search")
      }

      if (action.type === "click" && action.target?.includes("submit")) {
        setHighlightElement("search-button")
        await new Promise((r) => setTimeout(r, 300))
      }
    }

    // Final state
    setUrl(finalUrl)
    setPageType(finalPage)
    setHighlightElement(undefined)
    setCursorPosition(undefined)
    setIsLoading(false)
  }, [])

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Main Content */}
      <div className="flex flex-1 gap-4 overflow-hidden p-4">
        {/* Browser Preview */}
        <div className="flex-1">
          <BrowserPreview
            url={url}
            isLoading={isLoading}
            content={
              <SimulatedWebpage type={pageType} highlightElement={highlightElement} cursorPosition={cursorPosition} />
            }
          />
        </div>

        {/* Sidebar - Action History */}
        <div className="w-80 shrink-0">
          <ActionHistory actions={actions} />
        </div>
      </div>

      {/* Command Input */}
      <div className="border-t border-border bg-card/80 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <CommandInput onSubmit={executeCommand} isProcessing={isLoading} />
        </div>
      </div>
    </div>
  )
}

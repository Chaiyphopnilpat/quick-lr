"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Terminal, TrendingUp, Package, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { NavigationSidebar } from "@/components/navigation-sidebar"

interface Message {
  id: string
  sender: "architect" | "omegaprime"
  text: string
  data?: any
  timestamp: Date
}

export default function GenesisRetailOS() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [intent, setIntent] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      sender: "omegaprime",
      text: 'ระบบ Genesis Retail OS พร้อมให้บริการแล้วครับ Architect. กรุณาป้อน "เจตจำนง" ของคุณเพื่อเริ่มต้น...',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!intent.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "architect",
      text: intent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIntent("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/prometheus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent_text: intent }),
      })

      const data = await response.json()

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "omegaprime",
        text: data.response,
        data: data.data,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, systemMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "omegaprime",
        text: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อกับ Prometheus Engine",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    { icon: TrendingUp, label: "ยอดขายวันนี้", intent: "ยอดขายวันนี้" },
    { icon: Package, label: "ของใกล้หมด", intent: "ของใกล้หมด" },
    { icon: Zap, label: "ยิงโปร", intent: "ยิงโปร SKU-A ลด 20%" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-chart-1 to-chart-2 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Genesis Retail OS</h1>
              <p className="text-xs text-muted-foreground">The Sentient Commerce Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-chart-1/10 border border-chart-1/20">
              <div className="w-2 h-2 rounded-full bg-chart-1 animate-pulse" />
              <span className="text-xs font-mono text-chart-1">ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Console */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <NavigationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Console */}
        <main className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-4 overflow-hidden">
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-4 hover:bg-accent/50 cursor-pointer transition-all hover:scale-105 active:scale-95 border-border/40"
                onClick={() => setIntent(action.intent)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <action.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Messages Window */}
          <Card className="flex-1 overflow-hidden flex flex-col border-border/40 bg-card/50 backdrop-blur-sm">
            <div className="border-b border-border/40 px-4 py-3 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-foreground">The Console</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "architect" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "architect"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold">
                        {message.sender === "architect" ? "Architect" : "ΩmegaPrime"}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-pretty">{message.text}</p>

                    {/* Data Display */}
                    {message.data && (
                      <div className="mt-3 p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-border/40">
                        <pre className="text-xs font-mono overflow-x-auto">{JSON.stringify(message.data, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground border border-border/40 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm">ΩmegaPrime กำลังประมวลผล...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </Card>

          {/* Command Input */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2 p-3">
              <input
                type="text"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="พิมพ์เจตจำนงของคุณ (เช่น 'ยอดขายวันนี้')..."
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !intent.trim()} className="rounded-xl px-6">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          <p className="text-xs text-center text-muted-foreground font-mono">
            Project Genesis Retail OS • Powered by Ψ-Fusion • MVP Tier 1
          </p>
        </div>
      </footer>
    </div>
  )
}

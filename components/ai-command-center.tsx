"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { OmegaAGISimulator } from "./omega-agi-simulator"
import { AutoAIBrowser } from "./auto-ai-browser"
import { Cpu, Globe, Zap, Activity, Terminal } from "lucide-react"

export function AICommandCenter() {
  const [activeTab, setActiveTab] = useState("agi")

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid animate-grid-pulse pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Terminal className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-card bg-accent" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground tracking-tight">Omega AI Command Center</h1>
                <p className="text-xs text-muted-foreground font-mono">DECISION TRANSPARENCY ENGINE v2.0</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md bg-accent/10 border border-accent/20 px-3 py-1.5">
                <Activity className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-mono text-accent">SYSTEMS ONLINE</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-primary/10 border border-primary/20 px-3 py-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-mono text-primary">AI READY</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6">
            <TabsList className="h-12 bg-transparent gap-1">
              <TabsTrigger
                value="agi"
                className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-4"
              >
                <Cpu className="h-4 w-4" />
                <span className="hidden sm:inline">Omega AGI Crystal</span>
                <span className="sm:hidden">AGI</span>
              </TabsTrigger>
              <TabsTrigger
                value="browser"
                className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-4"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Autonomous Browser</span>
                <span className="sm:hidden">Browser</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="agi" className="flex-1 m-0 overflow-hidden">
            <OmegaAGISimulator />
          </TabsContent>

          <TabsContent value="browser" className="flex-1 m-0 overflow-hidden">
            <AutoAIBrowser />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

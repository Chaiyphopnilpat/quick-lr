"use client"

import { Database, BookOpen, Activity, Layers, Brain, Sparkles, Target, Home, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "The Console", href: "/", icon: Home },
  { name: "Assets Registry", href: "/assets", icon: Database },
  { name: "Formulae Codex", href: "/formulae", icon: BookOpen },
  { name: "Reliability Report", href: "/reliability", icon: Activity },
  {
    name: "Architecture Layers",
    icon: Layers,
    children: [
      { name: "Layer 1: Orchestrator", href: "/layers/orchestrator", icon: Target },
      { name: "Layer 2: Prometheus", href: "/layers/prometheus", icon: Brain },
      { name: "Layer 3: Evolution", href: "/layers/evolution", icon: Sparkles },
      { name: "Layer 4: Sovereign", href: "/layers/sovereign", icon: ChevronRight },
    ],
  },
]

export function NavigationSidebar({ isOpen, onClose }: NavigationSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen z-50",
          "w-72 border-r border-border/40 bg-card/50 backdrop-blur-xl",
          "transform transition-transform duration-200 ease-in-out",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="px-3 py-2 mb-4">
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Omega Navigation</h2>
          </div>

          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </div>
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === child.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <child.icon className="w-4 h-4" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-border/40 p-4">
          <div className="text-xs text-muted-foreground font-mono">
            <div>
              Status: <span className="text-chart-1">Active</span>
            </div>
            <div>
              Version: <span className="text-foreground">4.1</span>
            </div>
            <div>
              Mode: <span className="text-chart-2">Sentient</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

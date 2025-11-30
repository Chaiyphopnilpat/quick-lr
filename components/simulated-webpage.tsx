"use client"

import { cn } from "@/lib/utils"

interface SimulatedWebpageProps {
  type: "google" | "search-results" | "news" | "empty"
  highlightElement?: string
  cursorPosition?: { x: number; y: number }
}

export function SimulatedWebpage({ type, highlightElement, cursorPosition }: SimulatedWebpageProps) {
  if (type === "empty") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">🌐</div>
          <p className="text-lg text-muted-foreground">พร้อมท่องเว็บอัตโนมัติ</p>
          <p className="text-sm text-muted-foreground">สั่งการด้านล่างเพื่อเริ่มต้น</p>
        </div>
      </div>
    )
  }

  if (type === "google") {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4">
        {/* Cursor indicator */}
        {cursorPosition && (
          <div
            className="pointer-events-none absolute z-50 transition-all duration-300"
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
          >
            <div className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary drop-shadow-lg">
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
                  fill="currentColor"
                />
              </svg>
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-primary" />
            </div>
          </div>
        )}

        {/* Google Logo */}
        <div className="mb-8 text-5xl font-bold">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>

        {/* Search Box */}
        <div
          className={cn(
            "w-full max-w-xl rounded-full border bg-background px-5 py-3 shadow-sm transition-all",
            highlightElement === "search" && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          )}
        >
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-muted-foreground">Search Google or type a URL</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            className={cn(
              "rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground transition-all hover:shadow",
              highlightElement === "search-button" && "ring-2 ring-primary",
            )}
          >
            Google Search
          </button>
          <button className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground hover:shadow">
            I&apos;m Feeling Lucky
          </button>
        </div>
      </div>
    )
  }

  if (type === "search-results") {
    return (
      <div className="h-full overflow-auto p-4">
        {/* Search Header */}
        <div className="mb-4 flex items-center gap-4">
          <span className="text-2xl font-bold">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </span>
          <div className="flex-1 rounded-full border bg-background px-4 py-2 text-sm">AI news 2024</div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">About 1,230,000,000 results (0.42 seconds)</p>

        {/* Search Results */}
        <div className="space-y-6">
          {[
            {
              title: "Latest AI News and Developments",
              url: "ainews.com",
              desc: "Breaking news about artificial intelligence, machine learning, and robotics...",
            },
            {
              title: "AI Technology Trends 2024",
              url: "techcrunch.com",
              desc: "The biggest AI trends that are shaping the future of technology...",
            },
            {
              title: "OpenAI Announces New Model",
              url: "openai.com",
              desc: "OpenAI has released their latest AI model with improved capabilities...",
            },
          ].map((result, i) => (
            <div
              key={i}
              className={cn(
                "group cursor-pointer rounded-lg p-3 transition-all hover:bg-muted",
                highlightElement === `result-${i}` && "ring-2 ring-primary",
              )}
            >
              <div className="text-sm text-muted-foreground">{result.url}</div>
              <h3 className="text-lg text-blue-400 group-hover:underline">{result.title}</h3>
              <p className="text-sm text-muted-foreground">{result.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

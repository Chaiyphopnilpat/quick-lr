"use client"

import { useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2, Globe, MousePointer, Search, FileText } from "lucide-react"

interface CommandInputProps {
  onSubmit: (command: string) => void
  isProcessing: boolean
}

const quickCommands = [
  { icon: Globe, label: "เปิดเว็บ", command: "ไปที่เว็บ google.com" },
  { icon: Search, label: "ค้นหา", command: "ค้นหา 'AI news' ใน Google" },
  { icon: MousePointer, label: "คลิก", command: "คลิกที่ปุ่ม Search" },
  { icon: FileText, label: "ดึงข้อมูล", command: "ดึงข้อมูลทั้งหมดจากหน้านี้" },
]

export function CommandInput({ onSubmit, isProcessing }: CommandInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input.trim() && !isProcessing) {
      onSubmit(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      {/* Quick Commands */}
      <div className="flex flex-wrap gap-2">
        {quickCommands.map((cmd) => (
          <Button
            key={cmd.label}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setInput(cmd.command)}
            disabled={isProcessing}
          >
            <cmd.icon className="h-3.5 w-3.5" />
            {cmd.label}
          </Button>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="สั่งการ AI เช่น: 'ไปที่ google.com แล้วค้นหา AI news'"
          disabled={isProcessing}
          className="min-h-[80px] resize-none rounded-xl border-border bg-secondary pr-14 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          rows={3}
        />
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || isProcessing}
          size="icon"
          className="absolute bottom-3 right-3 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90"
        >
          {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
          <span className="sr-only">ส่งคำสั่ง</span>
        </Button>
      </div>
    </div>
  )
}

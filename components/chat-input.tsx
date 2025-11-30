"use client"

import { useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  onSubmit: (query: string) => void
  isProcessing: boolean
}

export function ChatInput({ onSubmit, isProcessing }: ChatInputProps) {
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
    <div className="relative">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="พิมพ์คำถามของคุณที่นี่..."
        disabled={isProcessing}
        className="min-h-[60px] resize-none rounded-2xl border-border bg-secondary pr-14 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
        rows={2}
      />
      <Button
        onClick={handleSubmit}
        disabled={!input.trim() || isProcessing}
        size="icon"
        className="absolute bottom-2 right-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90"
      >
        {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        <span className="sr-only">ส่งคำถาม</span>
      </Button>
    </div>
  )
}

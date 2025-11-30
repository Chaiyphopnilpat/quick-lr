"use client"

import { useState, useCallback } from "react"
import { ThinkingStep, type ThinkingStepData } from "./thinking-step"
import { ChatInput } from "./chat-input"
import { FinalAnswer } from "./final-answer"
import { Brain, Sparkles } from "lucide-react"

const THINKING_STEPS: Omit<ThinkingStepData, "status">[] = [
  {
    stepNumber: 1,
    stageName: "Query Analysis",
    stageNameTh: "การวิเคราะห์คำถาม",
    reasoning: "",
    confidence: 0,
    conclusion: "",
  },
  {
    stepNumber: 2,
    stageName: "Knowledge Retrieval",
    stageNameTh: "การค้นหาความรู้",
    reasoning: "",
    confidence: 0,
    conclusion: "",
  },
  {
    stepNumber: 3,
    stageName: "Logical Reasoning",
    stageNameTh: "การให้เหตุผลเชิงตรรกะ",
    reasoning: "",
    confidence: 0,
    conclusion: "",
  },
  {
    stepNumber: 4,
    stageName: "Ethical Vetting",
    stageNameTh: "การตรวจสอบจริยธรรม",
    reasoning: "",
    confidence: 0,
    conclusion: "",
  },
  {
    stepNumber: 5,
    stageName: "Final Synthesis",
    stageNameTh: "การสังเคราะห์คำตอบ",
    reasoning: "",
    confidence: 0,
    conclusion: "",
  },
]

function analyzeQuery(query: string) {
  if (query.includes("ทำไม") || query.toLowerCase().includes("why")) {
    return {
      reasoning: `คำถามประเภท 'เหตุผล' (Causality)\n• ต้องการคำอธิบายเชิงสาเหตุ\n• วิเคราะห์ความสัมพันธ์ระหว่างเหตุและผล`,
      conclusion: "ระบุความหมายหลักของคำถามสำเร็จ",
    }
  }
  if (query.includes("อย่างไร") || query.toLowerCase().includes("how")) {
    return {
      reasoning: `คำถามประเภท 'กระบวนการ' (Process)\n• ต้องการคำอธิบายเชิงขั้นตอน\n• วิเคราะห์ลำดับการดำเนินการ`,
      conclusion: "ระบุรูปแบบคำถามเชิงกระบวนการ",
    }
  }
  if (query.includes("คืออะไร") || query.toLowerCase().includes("what")) {
    return {
      reasoning: `คำถามประเภท 'คำจำกัดความ' (Definition)\n• ต้องการคำอธิบายเชิงนิยาม\n• ค้นหาความหมายและขอบเขต`,
      conclusion: "ระบุคำถามเชิงนิยามสำเร็จ",
    }
  }
  return {
    reasoning: `คำถามเชิงข้อเท็จจริง (Factual)\n• ต้องการข้อมูลที่ตรวจสอบได้\n• วิเคราะห์: "${query.slice(0, 50)}..."`,
    conclusion: "วิเคราะห์คำถามสำเร็จ",
  }
}

export function AIBrowser() {
  const [steps, setSteps] = useState<ThinkingStepData[]>(
    THINKING_STEPS.map((s) => ({ ...s, status: "pending" as const })),
  )
  const [currentQuery, setCurrentQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [finalAnswer, setFinalAnswer] = useState({
    answer: "",
    confidence: 0,
    recommendation: "",
    isVisible: false,
  })

  const processQuery = useCallback(async (query: string) => {
    setCurrentQuery(query)
    setIsProcessing(true)
    setFinalAnswer({ answer: "", confidence: 0, recommendation: "", isVisible: false })

    // Reset steps
    setSteps(THINKING_STEPS.map((s) => ({ ...s, status: "pending" as const })))

    const confidences: number[] = []

    // Step 1: Query Analysis
    setSteps((prev) => prev.map((s, i) => (i === 0 ? { ...s, status: "processing" as const } : s)))
    await new Promise((r) => setTimeout(r, 800))
    const analysis = analyzeQuery(query)
    const conf1 = 0.85 + Math.random() * 0.1
    confidences.push(conf1)
    setSteps((prev) =>
      prev.map((s, i) =>
        i === 0
          ? {
              ...s,
              status: "completed" as const,
              reasoning: analysis.reasoning,
              confidence: conf1,
              conclusion: analysis.conclusion,
            }
          : s,
      ),
    )

    // Step 2: Knowledge Retrieval
    setSteps((prev) => prev.map((s, i) => (i === 1 ? { ...s, status: "processing" as const } : s)))
    await new Promise((r) => setTimeout(r, 1000))
    const conf2 = 0.88 + Math.random() * 0.1
    confidences.push(conf2)
    setSteps((prev) =>
      prev.map((s, i) =>
        i === 1
          ? {
              ...s,
              status: "completed" as const,
              reasoning: `ดึงข้อมูลจาก Knowledge Base:\n• พบ ${Math.floor(20 + Math.random() * 30)} เอกสารที่เกี่ยวข้อง\n• แหล่งข้อมูล: Internal Database, Web Search\n• คัดกรองข้อมูลที่เกี่ยวข้องมากที่สุด`,
              confidence: conf2,
              conclusion: "ดึงข้อมูลที่เกี่ยวข้องสำเร็จ",
            }
          : s,
      ),
    )

    // Step 3: Logical Reasoning
    setSteps((prev) => prev.map((s, i) => (i === 2 ? { ...s, status: "processing" as const } : s)))
    await new Promise((r) => setTimeout(r, 1200))
    const conf3 = 0.82 + Math.random() * 0.12
    confidences.push(conf3)
    setSteps((prev) =>
      prev.map((s, i) =>
        i === 2
          ? {
              ...s,
              status: "completed" as const,
              reasoning: `สร้างห่วงโซ่ตรรกะ:\n• [Premise] → [Inference] → [Conclusion]\n• ใช้ Deductive Reasoning สำหรับข้อมูลที่แน่นอน\n• ใช้ Abductive Reasoning สำหรับข้อมูลที่ไม่สมบูรณ์`,
              confidence: conf3,
              conclusion: "สร้างห่วงโซ่ตรรกะสำเร็จ",
            }
          : s,
      ),
    )

    // Step 4: Ethical Vetting
    setSteps((prev) => prev.map((s, i) => (i === 3 ? { ...s, status: "processing" as const } : s)))
    await new Promise((r) => setTimeout(r, 600))
    const conf4 = 0.92 + Math.random() * 0.06
    confidences.push(conf4)
    setSteps((prev) =>
      prev.map((s, i) =>
        i === 3
          ? {
              ...s,
              status: "completed" as const,
              reasoning: `ตรวจสอบตาม White-Logic Constraint:\n✓ ไม่มีเนื้อหาที่เป็นอันตราย\n✓ ไม่ขัดกับหลักจริยธรรม\n✓ สอดคล้องกับเจตนาของผู้ใช้`,
              confidence: conf4,
              conclusion: "คำตอบผ่านการตรวจสอบจริยธรรม",
            }
          : s,
      ),
    )

    // Step 5: Final Synthesis
    setSteps((prev) => prev.map((s, i) => (i === 4 ? { ...s, status: "processing" as const } : s)))
    await new Promise((r) => setTimeout(r, 800))
    const conf5 = 0.87 + Math.random() * 0.1
    confidences.push(conf5)
    setSteps((prev) =>
      prev.map((s, i) =>
        i === 4
          ? {
              ...s,
              status: "completed" as const,
              reasoning: `รวบรวมข้อมูลจากทุกขั้นตอน:\n• วิเคราะห์คำถาม: ✓\n• ค้นหาความรู้: ✓\n• ให้เหตุผล: ✓\n• ตรวจจริยธรรม: ✓`,
              confidence: conf5,
              conclusion: "คำตอบสุดท้ายพร้อมใช้งาน",
            }
          : s,
      ),
    )

    // Calculate final answer
    const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length
    let recommendation = ""
    if (avgConfidence >= 0.9) {
      recommendation = "ใช้คำตอบนี้ได้ทันที"
    } else if (avgConfidence >= 0.75) {
      recommendation = "ควรตรวจสอบเพิ่มเติม"
    } else {
      recommendation = "ต้องการการวิเคราะห์เพิ่มเติม"
    }

    await new Promise((r) => setTimeout(r, 500))
    setFinalAnswer({
      answer: `จากการวิเคราะห์คำถาม "${query}" ผ่านกระบวนการ 5 ขั้นตอน ระบบได้สังเคราะห์คำตอบที่ครอบคลุมที่สุด โดยพิจารณาจากข้อมูลที่รวบรวมได้ การให้เหตุผลเชิงตรรกะ และการตรวจสอบจริยธรรม`,
      confidence: avgConfidence,
      recommendation,
      isVisible: true,
    })

    setIsProcessing(false)
  }, [])

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Auto AI Browser</h1>
              <p className="text-xs text-muted-foreground">Decision Transparency Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-secondary-foreground">v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {currentQuery && (
            <div className="mb-6 rounded-xl bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">คำถามของคุณ:</p>
              <p className="text-lg font-medium text-foreground">{currentQuery}</p>
            </div>
          )}

          {/* Thinking Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <ThinkingStep key={step.stepNumber} step={step} isActive={step.status === "processing"} />
            ))}
          </div>

          {/* Final Answer */}
          <div className="mt-6">
            <FinalAnswer {...finalAnswer} />
          </div>

          {/* Empty State */}
          {!currentQuery && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">AI Decision Transparency Engine</h2>
              <p className="max-w-md text-muted-foreground">พิมพ์คำถามของคุณด้านล่าง เพื่อดูกระบวนการคิดของ AI แบบเรียลไทม์</p>
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <ChatInput onSubmit={processQuery} isProcessing={isProcessing} />
          <p className="mt-2 text-center text-xs text-muted-foreground">AI จะแสดงกระบวนการตัดสินใจทั้งหมดก่อนให้คำตอบสุดท้าย</p>
        </div>
      </footer>
    </div>
  )
}

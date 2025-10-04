import { Card } from "@/components/ui/card"
import type { BitstreamEntry } from "./surveillance-dashboard"

interface BitstreamLogProps {
  entries: BitstreamEntry[]
}

export default function BitstreamLog({ entries }: BitstreamLogProps) {
  return (
    <Card className="glass-panel p-4 flex-grow flex flex-col min-h-0">
      <h2 className="text-lg font-semibold text-surveillance-cyan mb-3">บันทึกข้อมูลดิบ (Bitstream)</h2>
      <div className="overflow-y-auto flex-grow pr-2 bitstream-font text-muted-foreground">
        {entries.length === 0 ? (
          <p>กำลังรอสัญญาณ...</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="mb-1">
              <span className="text-muted-foreground">
                {entry.timestamp.toLocaleTimeString("th-TH", { hour12: false })}
              </span>
              <span className="ml-1">{entry.source.padEnd(7)}</span>
              <span className={`ml-2 ${entry.isAnomaly ? "text-surveillance-yellow" : "text-muted-foreground"}`}>
                {"-> FLAG:" + (entry.isAnomaly ? "1" : "0")}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

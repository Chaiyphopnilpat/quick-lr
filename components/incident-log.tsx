import { Card } from "@/components/ui/card"
import type { Incident } from "./surveillance-dashboard"

interface IncidentLogProps {
  incidents: Incident[]
}

export default function IncidentLog({ incidents }: IncidentLogProps) {
  const sortedIncidents = [...incidents].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return (
    <Card className="glass-panel p-4 flex-grow min-h-0 flex flex-col">
      <h2 className="text-lg font-semibold text-surveillance-cyan mb-3">รายการเหตุการณ์ที่ต้องตรวจสอบ</h2>
      <div className="space-y-2 overflow-y-auto flex-grow pr-2">
        {sortedIncidents.length === 0 ? (
          <p className="text-center text-muted-foreground pt-8">ยังไม่พบเหตุการณ์ที่น่าสงสัย</p>
        ) : (
          sortedIncidents.slice(0, 20).map((incident) => (
            <div
              key={incident.id}
              className="p-2 rounded-lg border border-border bg-card/50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{incident.type.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: incident.type.color }}>
                    {incident.message}
                  </p>
                  <p className="text-xs text-muted-foreground">ระยะประมาณ: {incident.distance} ม. จากศูนย์กลาง</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {incident.timestamp.toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

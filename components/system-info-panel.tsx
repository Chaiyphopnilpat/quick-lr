"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QuantumAnalysis } from "@/lib/real-time-service"

interface SystemInfoPanelProps {
  connectedDevices: number
  visibleTypes: Record<string, boolean>
  onToggleFilter: (type: string) => void
  quantumAnalysis?: QuantumAnalysis | null
  gpsEnabled?: boolean
  currentLocation?: { lat: number; lng: number } | null
}

export default function SystemInfoPanel({
  connectedDevices,
  visibleTypes,
  onToggleFilter,
  quantumAnalysis,
  gpsEnabled,
  currentLocation,
}: SystemInfoPanelProps) {
  const filterButtons = [
    { type: "GPS", icon: "🚓" },
    { type: "RADIO", icon: "📻" },
    { type: "REPORT", icon: "👥" },
    { type: "PERSON", icon: "🚶‍♂️" },
  ]

  return (
    <>
      <Card className="glass-panel p-4">
        <h2 className="text-lg font-semibold text-surveillance-cyan mb-2">หลักการทำงานของระบบ</h2>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>1. เครือข่ายอุปกรณ์ (รัศมี 1 กม.):</strong>
            <br />
            ระบบ "แตกเซลล์" เข้าเชื่อมต่อกับอุปกรณ์นับพันชิ้นในพื้นที่ เพื่อสร้างเครือข่ายการรวบรวมข้อมูลที่หนาแน่น
          </p>
          <p>
            <strong>2. การวิเคราะห์พฤติกรรมบุคคล:</strong>
            <br />
            AI ตรวจสอบภาพจากกล้องเพื่อวิเคราะห์พฤติกรรม, การรวมกลุ่ม, และการใช้โทรศัพท์มือถือของบุคคลเป้าหมาย
          </p>
          <p>
            <strong>3. กลไกเชื่อมโยงเหตุการณ์ (AI Core):</strong>
            <br />
            AI วิเคราะห์และ <strong>เชื่อมโยงข้อมูล</strong> ที่เกิดในเวลาและสถานที่ใกล้กัน เพื่อระบุ "เหตุการณ์" ที่มีความสำคัญจริงๆ
          </p>
        </div>
      </Card>

      <Card className="glass-panel p-4">
        <h2 className="text-lg font-semibold text-surveillance-cyan mb-3">สถานะและส่วนควบคุม</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">AI Core Status:</span>
            <div className="flex items-center gap-2">
              <div className="status-dot bg-surveillance-green"></div>
              <span className="font-semibold text-surveillance-green">NOMINAL</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Behavioral Scan:</span>
            <div className="flex items-center gap-2">
              <div className="status-dot bg-surveillance-purple"></div>
              <span className="font-semibold text-surveillance-purple">ACTIVE</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">GPS Tracking:</span>
            <div className="flex items-center gap-2">
              <div className={`status-dot ${gpsEnabled ? "bg-surveillance-green" : "bg-surveillance-red"}`}></div>
              <span className={`font-semibold ${gpsEnabled ? "text-surveillance-green" : "text-surveillance-red"}`}>
                {gpsEnabled ? "ACTIVE" : "OFFLINE"}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">อุปกรณ์ในเครือข่าย (1 กม.):</span>
            <span className="font-semibold text-foreground font-mono transition-all duration-300">
              {connectedDevices.toLocaleString("en-US")}
            </span>
          </div>
          {currentLocation && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">ตำแหน่งปัจจุบัน:</span>
              <span className="font-mono text-surveillance-cyan">
                {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </span>
            </div>
          )}
        </div>

        {quantumAnalysis && (
          <>
            <hr className="border-border my-4" />
            <div className="space-y-2 text-xs">
              <h3 className="text-sm font-semibold text-surveillance-purple">Quantum AI Analysis</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Threat Level:</span>
                <span
                  className={`font-semibold ${
                    quantumAnalysis.threatLevel > 0.8
                      ? "text-surveillance-red"
                      : quantumAnalysis.threatLevel > 0.6
                        ? "text-surveillance-yellow"
                        : "text-surveillance-green"
                  }`}
                >
                  {(quantumAnalysis.threatLevel * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="font-semibold text-surveillance-cyan">
                  {(quantumAnalysis.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Anomalies:</span>
                <span className="font-semibold text-foreground">{quantumAnalysis.anomaliesDetected}</span>
              </div>
              <div className="mt-2 p-2 bg-background/50 rounded text-xs font-mono text-surveillance-purple">
                {quantumAnalysis.quantumState}
              </div>
            </div>
          </>
        )}

        <hr className="border-border my-4" />

        <p className="text-sm text-muted-foreground mb-2">ตัวกรองประเภทเหตุการณ์:</p>
        <div className="grid grid-cols-4 gap-2 text-center text-xl">
          {filterButtons.map(({ type, icon }) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              className={`filter-btn glass-panel p-2 h-auto ${visibleTypes[type] ? "active" : ""}`}
              onClick={() => onToggleFilter(type)}
            >
              {icon}
            </Button>
          ))}
        </div>
      </Card>
    </>
  )
}

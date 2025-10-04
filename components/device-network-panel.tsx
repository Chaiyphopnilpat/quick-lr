"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { NetworkDevice } from "@/lib/device-scanner"

interface DeviceNetworkPanelProps {
  devices: NetworkDevice[]
  visibleDeviceTypes: Record<string, boolean>
  onToggleDeviceType: (type: string) => void
}

export default function DeviceNetworkPanel({
  devices,
  visibleDeviceTypes,
  onToggleDeviceType,
}: DeviceNetworkPanelProps) {
  const deviceTypeInfo = {
    camera: { icon: "📹", label: "กล้อง CCTV", color: "text-red-400" },
    wifi: { icon: "📶", label: "WiFi", color: "text-blue-400" },
    bluetooth: { icon: "🔵", label: "Bluetooth", color: "text-cyan-400" },
    cellular: { icon: "📱", label: "Cellular", color: "text-green-400" },
    sensor: { icon: "🎯", label: "Sensor", color: "text-purple-400" },
  }

  const getDeviceCountByType = (type: string) => {
    return devices.filter((d) => d.type === type && d.status === "active").length
  }

  const totalActive = devices.filter((d) => d.status === "active").length

  return (
    <Card className="glass-panel p-4">
      <h2 className="text-lg font-semibold text-surveillance-cyan mb-3">เครือข่ายอุปกรณ์ (รัศมี 1 กม.)</h2>

      <div className="space-y-3 text-sm mb-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">อุปกรณ์ทั้งหมด:</span>
          <span className="font-bold text-foreground font-mono text-lg">{devices.length.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">ออนไลน์:</span>
          <span className="font-semibold text-surveillance-green font-mono">{totalActive.toLocaleString()}</span>
        </div>
      </div>

      <hr className="border-border my-4" />

      <p className="text-sm text-muted-foreground mb-2">ประเภทอุปกรณ์:</p>
      <div className="space-y-2">
        {Object.entries(deviceTypeInfo).map(([type, info]) => {
          const count = getDeviceCountByType(type)
          const isVisible = visibleDeviceTypes[type]

          return (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              className={`w-full justify-between glass-panel ${isVisible ? "active" : "opacity-50"}`}
              onClick={() => onToggleDeviceType(type)}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{info.icon}</span>
                <span className="text-xs">{info.label}</span>
              </span>
              <span className={`font-mono text-xs font-semibold ${info.color}`}>{count}</span>
            </Button>
          )
        })}
      </div>

      <div className="mt-4 p-2 bg-background/50 rounded text-xs text-muted-foreground">
        <p className="leading-relaxed">
          ระบบกำลังสแกนและเชื่อมต่อกับอุปกรณ์ทั้งหมดในรัศมี 1 กิโลเมตร รวมถึงกล้อง CCTV, อุปกรณ์ WiFi, Bluetooth, Cellular
          และเซ็นเซอร์ต่างๆ
        </p>
      </div>
    </Card>
  )
}

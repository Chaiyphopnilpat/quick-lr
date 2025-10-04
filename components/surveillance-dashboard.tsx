"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import MapRadarOverlay from "./map-radar-overlay"
import SystemInfoPanel from "./system-info-panel"
import IncidentLog from "./incident-log"
import BitstreamLog from "./bitstream-log"
import DeviceNetworkPanel from "./device-network-panel"
import { realTimeService } from "@/lib/real-time-service"
import { deviceScanner } from "@/lib/device-scanner"

export interface Incident {
  id: string
  x: number
  y: number
  type: any
  sourceType: string
  lifespan: number
  pingSize: number
  pingOpacity: number
  timestamp: Date
  message: string
  distance: number
}

export interface IncidentType {
  color: string
  icon: string
  messages: string[]
}

export interface ActiveEvent {
  type: string
  x: number
  y: number
  radius: number
  duration: number
  anomalyChance: number
  anomalyScore?: number
}

export interface BitstreamEntry {
  id: string
  timestamp: Date
  source: string
  isAnomaly: boolean
}

const INCIDENT_TYPES: Record<string, IncidentType> = {
  GPS: {
    color: "rgb(239, 68, 68)",
    icon: "🚓",
    messages: ["รถสายตรวจจอดนอกพื้นที่รับผิดชอบ", "ตรวจพบการเคลื่อนที่ด้วยความเร็วสูงผิดปกติ"],
  },
  RADIO: {
    color: "rgb(250, 204, 21)",
    icon: "📻",
    messages: ["ตรวจพบการใช้รหัสที่ไม่เป็นทางการ", "เสียงสนทนามีความตึงเครียดสูง"],
  },
  REPORT: {
    color: "rgb(34, 197, 94)",
    icon: "👥",
    messages: ["ได้รับรายงานการตั้งด่านไม่โปร่งใส", "มีรายงานการรวมกลุ่มผิดปกติ"],
  },
  PERSON: {
    color: "rgb(168, 85, 247)",
    icon: "🚶‍♂️",
    messages: ["ตรวจพบบุคคลมีพฤติกรรมน่าสงสัย", "พบการรวมกลุ่มสนทนานานผิดปกติ", "ตรวจพบบุคคลใช้โทรศัพท์ขณะปฏิบัติหน้าที่"],
  },
}

export default function SurveillanceDashboard() {
  const [incidents, setIncidents] = useState<any[]>([])
  const [activeEvents, setActiveEvents] = useState<any[]>([])
  const [bitstreamEntries, setBitstreamEntries] = useState<any[]>([])
  const [visibleTypes, setVisibleTypes] = useState({
    GPS: true,
    RADIO: true,
    REPORT: true,
    PERSON: true,
  })
  const [connectedDevices, setConnectedDevices] = useState(Math.floor(Math.random() * 200) + 1250)
  const [quantumAnalysis, setQuantumAnalysis] = useState<any | null>(null)
  const [gpsEnabled, setGpsEnabled] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [networkDevices, setNetworkDevices] = useState<any[]>([])
  const [visibleDeviceTypes, setVisibleDeviceTypes] = useState({
    camera: true,
    wifi: true,
    bluetooth: true,
    cellular: true,
    sensor: true,
  })

  const simulationRef = useRef<NodeJS.Timeout>()
  const deviceUpdateRef = useRef<NodeJS.Timeout>()
  const quantumAnalysisRef = useRef<NodeJS.Timeout>()

  const createIncident = (sourceType: string, x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    const type = INCIDENT_TYPES[sourceType]
    const realDistance = Math.floor(
      (Math.sqrt(Math.pow(x - canvasWidth / 2, 2) + Math.pow(y - canvasHeight / 2, 2)) / (canvasWidth / 2)) * 1000,
    )
    const message = type.messages[Math.floor(Math.random() * type.messages.length)]

    const newIncident: any = {
      id: Math.random().toString(36).substr(2, 9),
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      type,
      sourceType,
      lifespan: 500,
      pingSize: 30,
      pingOpacity: 1,
      timestamp: new Date(),
      message,
      distance: realDistance,
    }

    setIncidents((prev) => [...prev.filter((i) => i.lifespan > 0), newIncident])
  }

  const addBitstreamEntry = (source: string, isAnomaly: boolean) => {
    const entry: any = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      source,
      isAnomaly,
    }

    setBitstreamEntries((prev) => [entry, ...prev.slice(0, 149)])
  }

  const simulationLoop = () => {
    setActiveEvents((prev) =>
      prev.filter((event) => {
        event.duration--
        return event.duration > 0
      }),
    )

    setActiveEvents((prev) => {
      if (Math.random() < 0.02 && prev.length < 3) {
        const eventTypes = Object.keys(INCIDENT_TYPES)
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        return [
          ...prev,
          {
            type,
            x: Math.random() * 800,
            y: Math.random() * 600,
            radius: Math.random() * 50 + 50,
            duration: Math.random() * 300 + 200,
            anomalyChance: 0.6,
          },
        ]
      }
      return prev
    })

    const checkX = Math.random() * 800
    const checkY = Math.random() * 600
    let source = "SYSTEM"
    let isAnomaly = false
    let eventFound: any | null = null

    setActiveEvents((prev) => {
      for (const event of prev) {
        const distance = Math.sqrt(Math.pow(checkX - event.x, 2) + Math.pow(checkY - event.y, 2))
        if (distance < event.radius) {
          source = event.type
          if (Math.random() < event.anomalyChance) {
            isAnomaly = true
            eventFound = event
          }
          break
        }
      }

      if (isAnomaly && eventFound) {
        eventFound.anomalyScore = (eventFound.anomalyScore || 0) + 1
        if (eventFound.anomalyScore > 5) {
          createIncident(eventFound.type, eventFound.x, eventFound.y, 800, 600)
          eventFound.anomalyScore = 0
        }
      }

      return prev
    })

    addBitstreamEntry(source, isAnomaly)
  }

  const updateDeviceCount = async () => {
    try {
      const deviceData = await realTimeService.scanNearbyDevices()
      setConnectedDevices(deviceData.total)
      console.log("[v0] Device scan result:", deviceData)
    } catch (error) {
      const fluctuation = Math.floor(Math.random() * 7) - 3
      setConnectedDevices((prev) => prev + fluctuation)
    }
  }

  const runQuantumAnalysis = async () => {
    try {
      const dataPoints = Array.from({ length: 100 }, () => Math.random())
      const analysis = await realTimeService.analyzeWithQuantumAI(dataPoints)
      setQuantumAnalysis(analysis)
      console.log("[v0] Quantum analysis:", analysis)

      addBitstreamEntry("QUANTUM", analysis.threatLevel > 0.6)
    } catch (error) {
      console.error("[v0] Quantum analysis error:", error)
    }
  }

  const startGPSTracking = () => {
    realTimeService.startGPSTracking(
      async (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })
        setGpsEnabled(true)

        try {
          const tracking = await realTimeService.sendGPSData(latitude, longitude)
          console.log("[v0] GPS tracking:", tracking)

          if (tracking.riskAssessment === "elevated") {
            addBitstreamEntry("GPS", true)
          }
        } catch (error) {
          console.error("[v0] GPS tracking error:", error)
        }
      },
      (error) => {
        console.error("[v0] GPS error:", error)
        setGpsEnabled(false)
      },
    )
  }

  const monitorNetwork = () => {
    const networkInfo = realTimeService.getNetworkInfo()
    if (networkInfo) {
      console.log("[v0] Network info:", networkInfo)
    }
  }

  const toggleFilter = (type: string) => {
    setVisibleTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const toggleDeviceType = (type: string) => {
    setVisibleDeviceTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  useEffect(() => {
    simulationRef.current = setInterval(simulationLoop, 200)
    deviceUpdateRef.current = setInterval(updateDeviceCount, 2500)
    quantumAnalysisRef.current = setInterval(runQuantumAnalysis, 10000)

    startGPSTracking()
    monitorNetwork()

    deviceScanner.startScanning(400, 300, 800, 600)
    setNetworkDevices(deviceScanner.getDevices())

    const deviceUpdateInterval = setInterval(() => {
      setNetworkDevices([...deviceScanner.getDevices()])
      setConnectedDevices(deviceScanner.getActiveDeviceCount())
    }, 5000)

    return () => {
      if (simulationRef.current) clearInterval(simulationRef.current)
      if (deviceUpdateRef.current) clearInterval(deviceUpdateRef.current)
      if (quantumAnalysisRef.current) clearInterval(quantumAnalysisRef.current)
      clearInterval(deviceUpdateInterval)
      realTimeService.stopGPSTracking()
      deviceScanner.stopScanning()
    }
  }, [])

  return (
    <div className="p-4 md:p-6 h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-screen-2xl h-full flex flex-col">
        <header className="text-center mb-4 flex-shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-surveillance-cyan tracking-wide">ศูนย์เฝ้าระวังอัจฉริยะ v4</h1>
          <p className="text-muted-foreground mt-1">
            Device Network & Behavioral Analysis Engine
            {gpsEnabled && <span className="ml-2 text-surveillance-green">● GPS ACTIVE</span>}
            {quantumAnalysis && (
              <span className="ml-2 text-surveillance-purple">● QUANTUM AI: {quantumAnalysis.recommendation}</span>
            )}
            <span className="ml-2 text-surveillance-cyan">● {networkDevices.length.toLocaleString()} DEVICES</span>
          </p>
        </header>

        <main className="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
          <div className="lg:col-span-1 flex flex-col gap-6 min-h-0">
            <SystemInfoPanel
              connectedDevices={connectedDevices}
              visibleTypes={visibleTypes}
              onToggleFilter={toggleFilter}
              quantumAnalysis={quantumAnalysis}
              gpsEnabled={gpsEnabled}
              currentLocation={currentLocation}
            />
            <DeviceNetworkPanel
              devices={networkDevices}
              visibleDeviceTypes={visibleDeviceTypes}
              onToggleDeviceType={toggleDeviceType}
            />
            <BitstreamLog entries={bitstreamEntries} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">
            <Card className="glass-panel p-2 flex-grow-[3] min-h-0">
              <MapRadarOverlay
                incidents={incidents}
                visibleTypes={visibleTypes}
                onIncidentsUpdate={setIncidents}
                currentLocation={currentLocation}
                networkDevices={networkDevices}
                visibleDeviceTypes={visibleDeviceTypes}
              />
            </Card>

            <IncidentLog incidents={incidents} />
          </div>
        </main>
      </div>
    </div>
  )
}

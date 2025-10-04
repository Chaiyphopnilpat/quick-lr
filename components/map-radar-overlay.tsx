"use client"

import { useEffect, useRef, useState } from "react"
import type { Incident } from "./surveillance-dashboard"
import type { NetworkDevice } from "@/lib/device-scanner"

interface MapRadarOverlayProps {
  incidents: Incident[]
  visibleTypes: Record<string, boolean>
  onIncidentsUpdate: (incidents: Incident[]) => void
  currentLocation?: { lat: number; lng: number } | null
  networkDevices?: NetworkDevice[]
  visibleDeviceTypes?: Record<string, boolean>
}

export default function MapRadarOverlay({
  incidents,
  visibleTypes,
  onIncidentsUpdate,
  currentLocation,
  networkDevices = [],
  visibleDeviceTypes = {},
}: MapRadarOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number>()
  const [mapUrl, setMapUrl] = useState(
    "https://maps.google.com/maps?q=13.6726266,100.6630216&hl=th&z=17&output=embed&t=k&styles=featureType:all,elementType:all,stylers:[{invert_lightness:true},{saturation:-100},{lightness:30},{gamma:0.5},{hue:%23435158}]",
  )

  useEffect(() => {
    if (currentLocation) {
      const newUrl = `https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&hl=th&z=17&output=embed&t=k&styles=featureType:all,elementType:all,stylers:[{invert_lightness:true},{saturation:-100},{lightness:30},{gamma:0.5},{hue:%23435158}]`
      setMapUrl(newUrl)
      console.log("[v0] Map updated to GPS location:", currentLocation)
    }
  }, [currentLocation])

  const resizeCanvas = () => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
  }

  const drawOverlay = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const center = { x: canvas.width / 2, y: canvas.height / 2 }
    const radius = Math.min(center.x, center.y)

    // Draw radar sweep
    ctx.save()
    ctx.translate(center.x, center.y)
    ctx.rotate(rotation)

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
    gradient.addColorStop(0, "rgba(0, 255, 150, 0.3)")
    gradient.addColorStop(1, "rgba(0, 255, 150, 0)")

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, radius, -Math.PI / 2, 0)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.restore()

    // Draw network devices
    if (networkDevices && networkDevices.length > 0) {
      networkDevices.forEach((device) => {
        if (!visibleDeviceTypes?.[device.type]) return

        const deviceColors = {
          camera: "rgba(239, 68, 68, 0.8)",
          wifi: "rgba(59, 130, 246, 0.6)",
          bluetooth: "rgba(6, 182, 212, 0.6)",
          cellular: "rgba(34, 197, 94, 0.6)",
          sensor: "rgba(168, 85, 247, 0.6)",
        }

        const color = deviceColors[device.type]
        const size = device.type === "camera" ? 4 : 2

        // Draw device point
        ctx.beginPath()
        ctx.arc(device.x, device.y, size, 0, 2 * Math.PI)
        ctx.fillStyle = device.status === "active" ? color : "rgba(100, 100, 100, 0.3)"
        ctx.fill()

        // Draw circle around camera if active
        if (device.type === "camera" && device.status === "active") {
          ctx.beginPath()
          ctx.arc(device.x, device.y, 8, 0, 2 * Math.PI)
          ctx.strokeStyle = color
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
    }

    // Draw connections between nearby active devices
    if (networkDevices && networkDevices.length > 0) {
      const activeDevices = networkDevices.filter((d) => d.status === "active" && visibleDeviceTypes?.[d.type])

      ctx.strokeStyle = "rgba(0, 255, 150, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < activeDevices.length; i++) {
        const device1 = activeDevices[i]
        for (let j = i + 1; j < activeDevices.length; j++) {
          const device2 = activeDevices[j]
          const distance = Math.sqrt(Math.pow(device1.x - device2.x, 2) + Math.pow(device1.y - device2.y, 2))

          // Draw connection if close enough (< 100 pixels)
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(device1.x, device1.y)
            ctx.lineTo(device2.x, device2.y)
            ctx.stroke()
          }
        }
      }
    }

    if (currentLocation) {
      ctx.beginPath()
      ctx.arc(center.x, center.y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(0, 255, 150, 0.8)"
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 255, 150, 1)"
      ctx.lineWidth = 2
      ctx.stroke()

      const pulseRadius = 15 + Math.sin(rotation * 5) * 5
      ctx.beginPath()
      ctx.arc(center.x, center.y, pulseRadius, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(0, 255, 150, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw incidents
    const updatedIncidents = incidents.map((incident) => {
      if (!visibleTypes[incident.sourceType]) return incident

      if (incident.pingOpacity > 0) {
        ctx.beginPath()
        ctx.arc(incident.x, incident.y, incident.pingSize - incident.pingSize * incident.pingOpacity, 0, 2 * Math.PI)
        ctx.strokeStyle = incident.type.color.replace("rgb(", "rgba(").replace(")", `, ${incident.pingOpacity})`)
        ctx.lineWidth = 2
        ctx.stroke()
        incident.pingOpacity -= 0.02
      }

      ctx.beginPath()
      ctx.arc(incident.x, incident.y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = incident.type.color
      ctx.shadowColor = incident.type.color
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0

      return incident
    })

    onIncidentsUpdate(updatedIncidents)
    setRotation((prev) => prev + 0.01)
    animationRef.current = requestAnimationFrame(drawOverlay)
  }

  useEffect(() => {
    resizeCanvas()
    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    animationRef.current = requestAnimationFrame(drawOverlay)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(drawOverlay)
  }, [incidents, visibleTypes, currentLocation, networkDevices, visibleDeviceTypes])

  return (
    <div ref={containerRef} className="relative w-full h-full rounded-xl overflow-hidden bg-card">
      <iframe
        ref={iframeRef}
        src={mapUrl}
        className="absolute top-0 left-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </div>
  )
}

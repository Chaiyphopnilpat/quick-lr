import { NextResponse } from "next/server"

// Simulates nearby device scanning
export async function GET() {
  try {
    // Simulate device discovery
    const baseCount = 1250
    const fluctuation = Math.floor(Math.random() * 200)
    const deviceCount = baseCount + fluctuation

    // Generate device types distribution
    const devices = {
      total: deviceCount,
      byType: {
        mobile: Math.floor(deviceCount * 0.6),
        iot: Math.floor(deviceCount * 0.25),
        vehicle: Math.floor(deviceCount * 0.1),
        unknown: Math.floor(deviceCount * 0.05),
      },
      signalStrength: {
        strong: Math.floor(deviceCount * 0.4),
        medium: Math.floor(deviceCount * 0.4),
        weak: Math.floor(deviceCount * 0.2),
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(devices)
  } catch (error) {
    return NextResponse.json({ error: "Device scan failed" }, { status: 500 })
  }
}

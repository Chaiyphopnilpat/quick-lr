// Device Scanner - สแกนอุปกรณ์และกล้องในรัศมี 1 กม.
export interface NetworkDevice {
  id: string
  type: "camera" | "wifi" | "bluetooth" | "cellular" | "sensor"
  name: string
  x: number
  y: number
  distance: number // เมตร
  signalStrength: number // 0-100
  status: "active" | "idle" | "offline"
  lastSeen: Date
  metadata?: {
    manufacturer?: string
    model?: string
    ipAddress?: string
    macAddress?: string
  }
}

export interface CameraDevice extends NetworkDevice {
  type: "camera"
  resolution?: string
  fps?: number
  isRecording: boolean
  viewAngle?: number
}

class DeviceScanner {
  private devices: NetworkDevice[] = []
  private scanInterval: NodeJS.Timeout | null = null
  private readonly SCAN_RADIUS = 1000 // 1 กม. ในหน่วยเมตร

  // สร้างอุปกรณ์จำลองในรัศมี 1 กม.
  private generateDeviceNetwork(
    centerX: number,
    centerY: number,
    canvasWidth: number,
    canvasHeight: number,
  ): NetworkDevice[] {
    const devices: NetworkDevice[] = []
    const deviceTypes: NetworkDevice["type"][] = ["camera", "wifi", "bluetooth", "cellular", "sensor"]

    // สร้างกล้อง CCTV (50-100 ตัว)
    const cameraCount = Math.floor(Math.random() * 50) + 50
    for (let i = 0; i < cameraCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * this.SCAN_RADIUS
      const x = centerX + Math.cos(angle) * (distance / this.SCAN_RADIUS) * (canvasWidth / 2)
      const y = centerY + Math.sin(angle) * (distance / this.SCAN_RADIUS) * (canvasHeight / 2)

      devices.push({
        id: `CAM-${i.toString().padStart(4, "0")}`,
        type: "camera",
        name: `กล้อง CCTV ${i + 1}`,
        x,
        y,
        distance: Math.floor(distance),
        signalStrength: Math.max(20, 100 - (distance / this.SCAN_RADIUS) * 80),
        status: Math.random() > 0.05 ? "active" : "idle",
        lastSeen: new Date(),
        metadata: {
          manufacturer: ["Hikvision", "Dahua", "Axis", "Samsung"][Math.floor(Math.random() * 4)],
          model: `Model-${Math.floor(Math.random() * 1000)}`,
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        },
      })
    }

    // สร้างอุปกรณ์ WiFi (200-400 ตัว)
    const wifiCount = Math.floor(Math.random() * 200) + 200
    for (let i = 0; i < wifiCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * this.SCAN_RADIUS
      const x = centerX + Math.cos(angle) * (distance / this.SCAN_RADIUS) * (canvasWidth / 2)
      const y = centerY + Math.sin(angle) * (distance / this.SCAN_RADIUS) * (canvasHeight / 2)

      devices.push({
        id: `WIFI-${i.toString().padStart(4, "0")}`,
        type: "wifi",
        name: `WiFi Device ${i + 1}`,
        x,
        y,
        distance: Math.floor(distance),
        signalStrength: Math.max(10, 100 - (distance / this.SCAN_RADIUS) * 90),
        status: Math.random() > 0.1 ? "active" : "offline",
        lastSeen: new Date(),
      })
    }

    // สร้างอุปกรณ์ Bluetooth (300-600 ตัว)
    const bluetoothCount = Math.floor(Math.random() * 300) + 300
    for (let i = 0; i < bluetoothCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * this.SCAN_RADIUS
      const x = centerX + Math.cos(angle) * (distance / this.SCAN_RADIUS) * (canvasWidth / 2)
      const y = centerY + Math.sin(angle) * (distance / this.SCAN_RADIUS) * (canvasHeight / 2)

      devices.push({
        id: `BT-${i.toString().padStart(4, "0")}`,
        type: "bluetooth",
        name: `BT Device ${i + 1}`,
        x,
        y,
        distance: Math.floor(distance),
        signalStrength: Math.max(5, 100 - (distance / this.SCAN_RADIUS) * 95),
        status: Math.random() > 0.15 ? "active" : "offline",
        lastSeen: new Date(),
      })
    }

    // สร้างอุปกรณ์ Cellular (100-200 ตัว)
    const cellularCount = Math.floor(Math.random() * 100) + 100
    for (let i = 0; i < cellularCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * this.SCAN_RADIUS
      const x = centerX + Math.cos(angle) * (distance / this.SCAN_RADIUS) * (canvasWidth / 2)
      const y = centerY + Math.sin(angle) * (distance / this.SCAN_RADIUS) * (canvasHeight / 2)

      devices.push({
        id: `CELL-${i.toString().padStart(4, "0")}`,
        type: "cellular",
        name: `Cellular ${i + 1}`,
        x,
        y,
        distance: Math.floor(distance),
        signalStrength: Math.max(30, 100 - (distance / this.SCAN_RADIUS) * 70),
        status: "active",
        lastSeen: new Date(),
      })
    }

    // สร้างเซ็นเซอร์ (50-100 ตัว)
    const sensorCount = Math.floor(Math.random() * 50) + 50
    for (let i = 0; i < sensorCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * this.SCAN_RADIUS
      const x = centerX + Math.cos(angle) * (distance / this.SCAN_RADIUS) * (canvasWidth / 2)
      const y = centerY + Math.sin(angle) * (distance / this.SCAN_RADIUS) * (canvasHeight / 2)

      devices.push({
        id: `SENSOR-${i.toString().padStart(4, "0")}`,
        type: "sensor",
        name: `Sensor ${i + 1}`,
        x,
        y,
        distance: Math.floor(distance),
        signalStrength: Math.max(40, 100 - (distance / this.SCAN_RADIUS) * 60),
        status: Math.random() > 0.02 ? "active" : "offline",
        lastSeen: new Date(),
      })
    }

    return devices
  }

  startScanning(centerX: number, centerY: number, canvasWidth: number, canvasHeight: number) {
    // สร้างเครือข่ายอุปกรณ์ครั้งแรก
    this.devices = this.generateDeviceNetwork(centerX, centerY, canvasWidth, canvasHeight)
    console.log(`[Device Scanner] เริ่มสแกนอุปกรณ์ในรัศมี ${this.SCAN_RADIUS} เมตร`)
    console.log(`[Device Scanner] พบอุปกรณ์ทั้งหมด: ${this.devices.length} ชิ้น`)

    // อัพเดทสถานะอุปกรณ์ทุก 5 วินาที
    this.scanInterval = setInterval(() => {
      this.updateDeviceStatus()
    }, 5000)
  }

  private updateDeviceStatus() {
    this.devices.forEach((device) => {
      // สุ่มเปลี่ยนสถานะบางอุปกรณ์
      if (Math.random() < 0.05) {
        const statuses: NetworkDevice["status"][] = ["active", "idle", "offline"]
        device.status = statuses[Math.floor(Math.random() * statuses.length)]
        device.lastSeen = new Date()
      }

      // อัพเดทความแรงสัญญาณ
      if (device.status === "active") {
        device.signalStrength = Math.max(0, Math.min(100, device.signalStrength + (Math.random() - 0.5) * 10))
      }
    })
  }

  getDevices(): NetworkDevice[] {
    return this.devices
  }

  getDevicesByType(type: NetworkDevice["type"]): NetworkDevice[] {
    return this.devices.filter((d) => d.type === type)
  }

  getActiveDevices(): NetworkDevice[] {
    return this.devices.filter((d) => d.status === "active")
  }

  getDeviceCount(): number {
    return this.devices.length
  }

  getActiveDeviceCount(): number {
    return this.getActiveDevices().length
  }

  stopScanning() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval)
      this.scanInterval = null
    }
    console.log("[Device Scanner] หยุดการสแกน")
  }
}

export const deviceScanner = new DeviceScanner()

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  Activity,
  Cpu,
  Sparkles,
  TrendingUp,
  Target,
  Gauge,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

// Configuration constants
const DEFAULT_LAMBDA = 0.8
const DEFAULT_TARGET = 0.9999
const DEFAULT_PIEZO = 300.0
const ACOUSTIC_PRESSURE = 1.0
const CRYSTAL_SURFACE_AREA = 0.001
const TIME_INTERVAL = 1.0

interface SimulationState {
  iteration: number
  efficiency: number
  piezoCoef: number
  energyOutput: number
  rawEnergy: number
  action: string
  isConverged: boolean
}

interface LogEntry {
  id: string
  iteration: number
  action: string
  efficiency: number
  piezoCoef: number
  energyOutput: number
  timestamp: Date
}

function calculateEnergyHarvest(efficiency: number, piezoCoef: number) {
  const rawEnergy = ACOUSTIC_PRESSURE * piezoCoef * CRYSTAL_SURFACE_AREA * TIME_INTERVAL
  const energyOutput = efficiency * rawEnergy
  return { energyOutput: energyOutput * 1e9, rawEnergy: rawEnergy * 1e9 }
}

export function OmegaAGISimulator() {
  const [lambda, setLambda] = useState(DEFAULT_LAMBDA)
  const [targetEfficiency, setTargetEfficiency] = useState(DEFAULT_TARGET)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(100)

  const [state, setState] = useState<SimulationState>({
    iteration: 0,
    efficiency: 0.5 + Math.random() * 0.2,
    piezoCoef: DEFAULT_PIEZO,
    energyOutput: 0,
    rawEnergy: 0,
    action: "AWAITING INITIALIZATION",
    isConverged: false,
  })

  const [logs, setLogs] = useState<LogEntry[]>([])
  const [chartData, setChartData] = useState<
    Array<{
      iteration: number
      efficiency: number
      piezoCoef: number
      energyOutput: number
    }>
  >([])

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const simulateStep = useCallback(() => {
    setState((prev) => {
      if (prev.isConverged) return prev

      const newIteration = prev.iteration + 1
      const deltaEff = targetEfficiency - prev.efficiency

      // Base improvement (exploitation)
      const baseImprovement = deltaEff * (0.005 + Math.random() * 0.015)

      let newEfficiency: number
      let newPiezoCoef = prev.piezoCoef
      let action: string

      // Creative mutation when approaching target (exploration)
      if (deltaEff < (1.0 - targetEfficiency) * 0.1) {
        const curiosityFactor = (Math.random() - 0.5) * lambda * 0.2
        newEfficiency = prev.efficiency + baseImprovement + curiosityFactor
        action = "CREATIVE MUTATION"

        // AGI experiments with new materials
        newPiezoCoef += (Math.random() - 0.3) * 200 * lambda
        newPiezoCoef = Math.max(10.0, newPiezoCoef)
      } else {
        newEfficiency = prev.efficiency + baseImprovement
        action = "STABLE OPTIMIZATION"
      }

      // Clamp efficiency
      newEfficiency = Math.min(newEfficiency, targetEfficiency)
      const isConverged = newEfficiency >= targetEfficiency

      if (isConverged) {
        action = "CONVERGENCE ACHIEVED"
      }

      const { energyOutput, rawEnergy } = calculateEnergyHarvest(newEfficiency, newPiezoCoef)

      // Add log entry
      const logEntry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        iteration: newIteration,
        action,
        efficiency: newEfficiency,
        piezoCoef: newPiezoCoef,
        energyOutput,
        timestamp: new Date(),
      }

      setLogs((prevLogs) => [logEntry, ...prevLogs].slice(0, 100))
      setChartData((prevData) =>
        [
          ...prevData,
          {
            iteration: newIteration,
            efficiency: newEfficiency * 100,
            piezoCoef: newPiezoCoef,
            energyOutput,
          },
        ].slice(-50),
      )

      return {
        iteration: newIteration,
        efficiency: newEfficiency,
        piezoCoef: newPiezoCoef,
        energyOutput,
        rawEnergy,
        action,
        isConverged,
      }
    })
  }, [lambda, targetEfficiency])

  useEffect(() => {
    if (isRunning && !state.isConverged) {
      intervalRef.current = setInterval(simulateStep, 1100 - speed * 10)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, speed, state.isConverged, simulateStep])

  const handleReset = () => {
    setIsRunning(false)
    setState({
      iteration: 0,
      efficiency: 0.5 + Math.random() * 0.2,
      piezoCoef: DEFAULT_PIEZO,
      energyOutput: 0,
      rawEnergy: 0,
      action: "AWAITING INITIALIZATION",
      isConverged: false,
    })
    setLogs([])
    setChartData([])
  }

  const handleToggle = () => {
    if (state.isConverged) {
      handleReset()
    } else {
      setIsRunning(!isRunning)
    }
  }

  return (
    <div className="flex h-full flex-col lg:flex-row gap-4 p-4 overflow-hidden">
      {/* Left Panel - Controls & Metrics */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        {/* Control Panel */}
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-primary" />
              Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={handleToggle}
                className={cn(
                  "flex-1 gap-2",
                  isRunning ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
                )}
              >
                {state.isConverged ? (
                  <>
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </>
                ) : isRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Lambda (Curiosity)</label>
                <span className="text-xs font-mono text-primary">{lambda.toFixed(2)}</span>
              </div>
              <Slider
                value={[lambda]}
                onValueChange={([v]) => setLambda(v)}
                min={0}
                max={0.9}
                step={0.1}
                disabled={isRunning}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Speed</label>
                <span className="text-xs font-mono text-primary">{speed}%</span>
              </div>
              <Slider
                value={[speed]}
                onValueChange={([v]) => setSpeed(v)}
                min={10}
                max={100}
                step={10}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Gauge className="h-4 w-4 text-primary" />
              System Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MetricRow
              icon={Target}
              label="Efficiency"
              value={`${(state.efficiency * 100).toFixed(4)}%`}
              target={`${(targetEfficiency * 100).toFixed(2)}%`}
              progress={(state.efficiency / targetEfficiency) * 100}
              color="primary"
            />
            <MetricRow
              icon={Zap}
              label="Piezo Coefficient"
              value={`${state.piezoCoef.toFixed(2)}`}
              unit="nC/N"
              color="accent"
            />
            <MetricRow
              icon={Activity}
              label="Energy Output"
              value={`${state.energyOutput.toFixed(4)}`}
              unit="nJ"
              color="chart-3"
            />
            <MetricRow icon={TrendingUp} label="Iterations" value={state.iteration.toString()} color="chart-4" />
          </CardContent>
        </Card>

        {/* Status */}
        <Card
          className={cn(
            "bg-card/80 backdrop-blur-sm border-border overflow-hidden",
            state.isConverged && "border-accent animate-pulse-glow",
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  state.isConverged ? "bg-accent/20" : isRunning ? "bg-primary/20" : "bg-muted",
                )}
              >
                <Sparkles
                  className={cn(
                    "h-5 w-5",
                    state.isConverged ? "text-accent" : isRunning ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{state.action}</p>
                <p className="text-xs text-muted-foreground">
                  {state.isConverged ? "Optimal state reached" : isRunning ? "Processing..." : "Idle"}
                </p>
              </div>
              <Badge
                variant={state.isConverged ? "default" : isRunning ? "secondary" : "outline"}
                className={cn(state.isConverged && "bg-accent text-accent-foreground")}
              >
                {state.isConverged ? "DONE" : isRunning ? "RUN" : "IDLE"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center Panel - Charts */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Efficiency Chart */}
        <Card className="flex-1 bg-card/80 backdrop-blur-sm border-border min-h-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              Efficiency Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.72 0.19 180)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.72 0.19 180)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0.02 240)" />
                <XAxis dataKey="iteration" stroke="oklch(0.55 0.02 240)" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="oklch(0.55 0.02 240)"
                  fontSize={10}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.11 0.015 240)",
                    border: "1px solid oklch(0.18 0.02 240)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "oklch(0.95 0.01 240)" }}
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="oklch(0.72 0.19 180)"
                  fill="url(#efficiencyGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Energy & Piezo Chart */}
        <Card className="flex-1 bg-card/80 backdrop-blur-sm border-border min-h-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-accent" />
              Energy Harvest & Material Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0.02 240)" />
                <XAxis dataKey="iteration" stroke="oklch(0.55 0.02 240)" fontSize={10} tickLine={false} />
                <YAxis yAxisId="left" stroke="oklch(0.65 0.22 145)" fontSize={10} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="oklch(0.7 0.18 45)" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.11 0.015 240)",
                    border: "1px solid oklch(0.18 0.02 240)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "oklch(0.95 0.01 240)" }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="energyOutput"
                  stroke="oklch(0.65 0.22 145)"
                  strokeWidth={2}
                  dot={false}
                  name="Energy (nJ)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="piezoCoef"
                  stroke="oklch(0.7 0.18 45)"
                  strokeWidth={2}
                  dot={false}
                  name="Piezo Coef"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Logs */}
      <Card className="w-full lg:w-80 shrink-0 bg-card/80 backdrop-blur-sm border-border flex flex-col">
        <CardHeader className="pb-3 shrink-0">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Activity Log
            </div>
            <Badge variant="outline" className="font-mono">
              {logs.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="px-4 pb-4 space-y-2">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">No activity yet</p>
                <p className="text-xs text-muted-foreground">Start the simulation</p>
              </div>
            ) : (
              logs.map((log) => <LogItem key={log.id} log={log} />)
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}

function MetricRow({
  icon: Icon,
  label,
  value,
  unit,
  target,
  progress,
  color,
}: {
  icon: typeof Target
  label: string
  value: string
  unit?: string
  target?: string
  progress?: number
  color: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-3.5 w-3.5", `text-${color}`)} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-mono font-medium">{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
          {target && <span className="text-xs text-muted-foreground">/ {target}</span>}
        </div>
      </div>
      {progress !== undefined && <Progress value={Math.min(progress, 100)} className="h-1" />}
    </div>
  )
}

function LogItem({ log }: { log: LogEntry }) {
  const isCreative = log.action.includes("CREATIVE")
  const isConverged = log.action.includes("CONVERGENCE")

  return (
    <div
      className={cn(
        "rounded-lg border p-3 text-xs transition-all",
        isConverged
          ? "bg-accent/10 border-accent/30"
          : isCreative
            ? "bg-chart-3/10 border-chart-3/30"
            : "bg-secondary/50 border-border",
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[10px] px-1.5">
            #{log.iteration}
          </Badge>
          <ChevronRight
            className={cn("h-3 w-3", isConverged ? "text-accent" : isCreative ? "text-chart-3" : "text-primary")}
          />
          <span
            className={cn("font-medium", isConverged ? "text-accent" : isCreative ? "text-chart-3" : "text-foreground")}
          >
            {log.action}
          </span>
        </div>
        <span className="text-muted-foreground font-mono">
          {log.timestamp.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-muted-foreground">
        <div>
          <span className="text-[10px] uppercase">Efficiency</span>
          <p className="font-mono text-foreground">{(log.efficiency * 100).toFixed(3)}%</p>
        </div>
        <div>
          <span className="text-[10px] uppercase">Piezo</span>
          <p className="font-mono text-foreground">{log.piezoCoef.toFixed(1)}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase">Energy</span>
          <p className="font-mono text-foreground">{log.energyOutput.toFixed(2)} nJ</p>
        </div>
      </div>
    </div>
  )
}

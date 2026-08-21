"use client"

import React, { useState, useEffect } from "react"
import { Activity, Cpu, Network, ShieldCheck } from "lucide-react"

export default function TelemetryHUD() {
  const [latency, setLatency] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 10)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full border-y border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-950/60 backdrop-blur-md py-2 px-4 select-none font-mono text-[11px] text-zinc-600 dark:text-zinc-400 overflow-x-auto shadow-xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-6 whitespace-nowrap">
        {/* Metric 1: Live Status */}
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-foreground">SYSTEM: ALL NODES LIVE</span>
        </div>

        {/* Metric 2: Host Topology */}
        <div className="hidden sm:flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <Cpu className="size-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>HOST: Debian 12 (x86_64)</span>
        </div>

        {/* Metric 3: Ingress */}
        <div className="hidden md:flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <ShieldCheck className="size-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>INGRESS: Cloudflare Tunnel (Zero-Trust)</span>
        </div>

        {/* Metric 4: Protocol Broker */}
        <div className="hidden lg:flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <Network className="size-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>BROKER: EMQX / MQTTv5 (Port 1883)</span>
        </div>

        {/* Metric 5: Live Simulated RTT */}
        <div className="flex items-center gap-1.5 ml-auto">
          <Activity className="size-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>RTT:</span>
          <span className="font-bold text-foreground">{latency}ms</span>
        </div>
      </div>
    </div>
  )
}

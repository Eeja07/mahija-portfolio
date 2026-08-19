"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface PacketFlowProps {
  className?: string
  color?: "cyan" | "emerald" | "blue"
  speed?: "fast" | "normal" | "slow"
}

export function PacketFlow({
  className,
  color = "cyan",
  speed = "normal",
}: PacketFlowProps) {
  const gradient =
    color === "cyan"
      ? "from-transparent via-cyan-400 to-transparent"
      : color === "emerald"
      ? "from-transparent via-emerald-400 to-transparent"
      : "from-transparent via-blue-500 to-transparent"

  const speedClass =
    speed === "fast"
      ? "duration-1000"
      : speed === "slow"
      ? "duration-4000"
      : "duration-2500"

  return (
    <div
      className={cn(
        "relative w-full h-[2px] bg-zinc-200/60 dark:bg-zinc-800/60 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-y-0 w-1/3 bg-gradient-to-r animate-packet-stream",
          gradient,
          speedClass
        )}
      />
    </div>
  )
}

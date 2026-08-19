import React from "react"
import { cn } from "@/lib/utils"

interface FiberPulseLineProps {
  orientation?: "horizontal" | "vertical"
  className?: string
  color?: "cyan" | "emerald" | "blue" | "amber"
}

export function FiberPulseLine({
  orientation = "horizontal",
  className,
  color = "cyan",
}: FiberPulseLineProps) {
  const gradientColor =
    color === "cyan"
      ? "via-blue-500 dark:via-cyan-400"
      : color === "emerald"
      ? "via-emerald-500 dark:via-emerald-400"
      : color === "amber"
      ? "via-amber-500 dark:via-amber-400"
      : "via-blue-500 dark:via-blue-400"

  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "relative w-px h-full min-h-[60px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex flex-col items-center select-none",
          className
        )}
        aria-hidden="true"
      >
        <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400" />
        <div className={cn("absolute w-[2px] h-8 bg-gradient-to-b from-transparent to-transparent animate-laser-scan", gradientColor)} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full h-px bg-zinc-200 dark:bg-zinc-800 overflow-hidden select-none my-8",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 shadow-xs" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs" />
      <div className={cn("absolute h-[2px] w-24 bg-gradient-to-r from-transparent to-transparent animate-packet-stream", gradientColor)} />
    </div>
  )
}

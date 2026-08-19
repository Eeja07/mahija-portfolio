"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface NetworkConnectionProps {
  orientation?: "horizontal" | "vertical"
  className?: string
  status?: "active" | "transmitting" | "idle"
  label?: string
}

export function NetworkConnection({
  orientation = "horizontal",
  className,
  status = "active",
  label,
}: NetworkConnectionProps) {
  const pulseColor =
    status === "transmitting"
      ? "via-cyan-400 dark:via-cyan-300"
      : status === "active"
      ? "via-blue-500 dark:via-cyan-400"
      : "via-zinc-400 dark:via-zinc-600"

  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "relative w-px h-full min-h-[60px] bg-zinc-200/90 dark:bg-zinc-800/90 overflow-hidden flex flex-col items-center select-none",
          className
        )}
        aria-hidden="true"
      >
        <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400" />
        <div
          className={cn(
            "absolute w-[2px] h-10 bg-gradient-to-b from-transparent to-transparent animate-laser-scan",
            pulseColor
          )}
        />
        {label && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap rotate-90">
            {label}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full h-px bg-zinc-200/90 dark:bg-zinc-800/90 overflow-hidden select-none my-8",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 shadow-xs" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs" />
      <div
        className={cn(
          "absolute h-[2px] w-28 bg-gradient-to-r from-transparent to-transparent animate-packet-stream",
          pulseColor
        )}
      />
      {label && (
        <span className="absolute right-4 -top-3 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-background px-1.5">
          {label}
        </span>
      )}
    </div>
  )
}

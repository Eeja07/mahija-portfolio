"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SpatialCableBranchProps {
  className?: string
  direction?: "left-to-right" | "right-to-left" | "vertical-down"
  label?: string
  status?: "active" | "transmitting" | "standby"
}

export function SpatialCableBranch({
  className,
  direction = "left-to-right",
  label,
  status = "active",
}: SpatialCableBranchProps) {
  const pulseColor =
    status === "transmitting"
      ? "via-cyan-400 dark:via-cyan-300"
      : status === "active"
      ? "via-blue-500 dark:via-cyan-400"
      : "via-zinc-400 dark:via-zinc-600"

  if (direction === "vertical-down") {
    return (
      <div
        className={cn(
          "relative w-px h-16 bg-zinc-200/80 dark:bg-zinc-800/80 mx-auto overflow-hidden flex flex-col items-center select-none my-4",
          className
        )}
        aria-hidden="true"
      >
        <div className="absolute top-0 size-2 rounded-full bg-blue-500 dark:bg-cyan-400 shadow-xs" />
        <div
          className={cn(
            "absolute w-[2px] h-8 bg-gradient-to-b from-transparent to-transparent animate-laser-scan",
            pulseColor
          )}
        />
        <div className="absolute bottom-0 size-2 rounded-full bg-emerald-500 shadow-xs" />
        {label && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full h-px bg-zinc-200/80 dark:bg-zinc-800/80 overflow-hidden select-none my-6",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 shadow-xs" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-emerald-500 shadow-xs" />
      <div
        className={cn(
          "absolute h-[2px] w-24 bg-gradient-to-r from-transparent to-transparent animate-packet-stream",
          pulseColor
        )}
      />
      {label && (
        <span className="absolute right-2 sm:right-4 -top-2.5 font-mono text-[8px] sm:text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-background px-1.5 max-w-[70vw] truncate">
          {label}
        </span>
      )}
    </div>
  )
}

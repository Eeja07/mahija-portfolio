"use client"

import React, { useRef } from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

export interface NetworkNodeProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  nodeId?: string
  nodeType?: string
  status?: "healthy" | "transmitting" | "standby"
  spotlightColor?: string
}

export function NetworkNode({
  children,
  className,
  nodeId,
  nodeType = "NODE",
  status = "healthy",
  spotlightColor,
  style,
  ...props
}: NetworkNodeProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
    if (spotlightColor) {
      cardRef.current.style.setProperty("--spotlight-color", spotlightColor)
    }
  }

  const statusDotColor =
    status === "transmitting"
      ? "bg-cyan-400 dark:bg-cyan-300 animate-led-fast shadow-[0_0_8px_rgba(56,189,248,0.6)]"
      : status === "healthy"
      ? "bg-emerald-500 animate-led shadow-[0_0_8px_rgba(16,185,129,0.5)]"
      : "bg-amber-400"

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3, transition: { duration: 0.15, ease: "easeOut" } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
      style={style}
      className={cn(
        "spotlight-card circuit-card relative rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/85 dark:bg-zinc-950/75 backdrop-blur-[6px] p-6 transition-all duration-200 hover:border-blue-500/50 dark:hover:border-cyan-500/50 shadow-xs group",
        className
      )}
      {...props}
    >
      {/* Circuit Corner Brackets */}
      <span className="circuit-corner-tl" aria-hidden="true" />
      <span className="circuit-corner-br" aria-hidden="true" />

      {/* Node Registration Header */}
      {nodeId && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200/60 dark:border-zinc-800/60 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest select-none">
          <div className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full", statusDotColor)} />
            <span className="font-semibold text-foreground/90">{nodeId}</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-500 font-medium">
            {nodeType} &bull; RX/TX
          </span>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  )
}

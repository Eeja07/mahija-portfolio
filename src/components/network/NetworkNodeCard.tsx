"use client"

import React, { useRef } from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

interface NetworkNodeCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  nodeId?: string
  portStatus?: "active" | "standby" | "transmitting"
  spotlightColor?: string
}

export function NetworkNodeCard({
  children,
  className,
  nodeId,
  portStatus = "active",
  spotlightColor,
  style,
  ...props
}: NetworkNodeCardProps) {
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
    portStatus === "transmitting"
      ? "bg-zinc-400 dark:bg-zinc-300 shadow-[0_0_6px_rgba(255,255,255,0.2)]"
      : portStatus === "active"
      ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]"
      : "bg-zinc-400"

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3, transition: { duration: 0.15, ease: "easeOut" } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
      style={style}
      className={cn(
        "spotlight-card circuit-card relative rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/80 dark:bg-zinc-950/70 backdrop-blur-[4px] p-6 transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-xs group",
        className
      )}
      {...props}
    >
      {/* Circuit Corner Brackets */}
      <span className="circuit-corner-tl" aria-hidden="true" />
      <span className="circuit-corner-br" aria-hidden="true" />

      {/* Node Header Header Bar (Optional Node ID / Port Status) */}
      {nodeId && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200/60 dark:border-zinc-800/60 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest select-none">
          <div className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full", statusDotColor)} />
            <span className="font-semibold text-foreground/80">{nodeId}</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-500">RX/TX ONLINE</span>
        </div>
      )}

      {/* Main Content Body */}
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  )
}

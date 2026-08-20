"use client"

import React from "react"
import { motion } from "motion/react"

export default function HeroInitialSequence() {
  return (
    <div className="flex items-center justify-center gap-3 font-mono text-xs select-none mb-4">
      {/* Root Glowing Connection Point ● */}
      <div className="relative flex size-3 items-center justify-center">
        <span className="relative inline-flex size-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
      </div>

      {/* Connection Established Ticker */}
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-widest text-[11px]"
      >
        <span>CORE NODE // 0xEEJA</span>
        <span className="text-zinc-400 dark:text-zinc-600">&mdash;</span>
        <span className="text-emerald-600 dark:text-emerald-400">CONNECTION ESTABLISHED</span>
      </motion.div>
    </div>
  )
}

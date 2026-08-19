"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Compass, Lightbulb, ArrowDown } from "lucide-react"

interface NetworkStepGuideProps {
  step: string
  title: string
  description: string
  tip?: string
  className?: string
}

export function NetworkStepGuide({
  step,
  title,
  description,
  tip,
  className,
}: NetworkStepGuideProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-blue-500/30 dark:border-cyan-500/30 bg-blue-500/5 dark:bg-cyan-500/5 backdrop-blur-sm p-3 sm:p-4 mb-6 text-left shadow-xs transition-all duration-200 select-none group hover:border-blue-500/50 dark:hover:border-cyan-400/50",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-blue-500/20 dark:border-cyan-500/20">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
          <Compass className="size-3.5 animate-spin-slow" />
          <span>{step}</span>
          <span className="text-zinc-400 dark:text-zinc-600">&bull;</span>
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>ALUR SISTEM</span>
          <ArrowDown className="size-3 text-blue-500 dark:text-cyan-400 animate-bounce" />
        </div>
      </div>

      <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
        {description}
      </p>

      {tip && (
        <div className="mt-2.5 flex items-start gap-1.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
          <Lightbulb className="size-3.5 shrink-0 mt-0.5 text-emerald-500" />
          <span><strong className="font-semibold">Petunjuk:</strong> {tip}</span>
        </div>
      )}
    </div>
  )
}

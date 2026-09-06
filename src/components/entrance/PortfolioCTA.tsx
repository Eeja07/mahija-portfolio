"use client"

import React, { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { ArrowRight } from "lucide-react"

interface PortfolioCTAProps {
  onEnter: () => void
  disabled?: boolean
  className?: string
}

export default function PortfolioCTA({
  onEnter,
  disabled = false,
  className = "",
}: PortfolioCTAProps) {
  const { language } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  const label = language === "id" ? "Masuk Portofolio 3D" : "Enter 3D Portfolio"

  return (
    <div className={`relative flex items-center justify-center pt-2 ${className}`}>
      {/* Left Docking Cable Feeder */}
      <div className="hidden sm:flex items-center" aria-hidden="true">
        <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--fiber-base)] to-[var(--fiber-core)] opacity-60" />
        <div className="size-2 rounded-full border border-[var(--fiber-core)] bg-[var(--surface-primary)]" />
      </div>

      {/* Main Interactive CTA Button */}
      <button
        onClick={onEnter}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
        aria-label={`${label} — Interactive Network Infrastructure Experience`}
        className={`group relative flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-background/90 dark:bg-zinc-950/90 text-foreground font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fiber-active)] focus-visible:ring-offset-2 overflow-hidden ${
          disabled ? "opacity-60 cursor-not-allowed" : "hover:border-[var(--fiber-core)] hover:shadow-lg hover:shadow-cyan-500/10"
        }`}
      >
        {/* Animated Fiber Optic Perimeter Light Beam */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-xl overflow-visible"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="11"
            fill="none"
            stroke="var(--fiber-active)"
            strokeWidth="1.5"
            pathLength="100"
            strokeDasharray="18 82"
            className="animate-fiber-beam"
            opacity={isHovered ? 0.95 : 0.6}
          />
        </svg>

        {/* Ambient Glow Background on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent transition-opacity duration-300 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Button Label */}
        <span className="relative text-zinc-900 dark:text-zinc-100 tracking-widest font-bold">
          {label}
        </span>

        {/* Forward Arrow Indicator */}
        <ArrowRight className="relative size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-[var(--fiber-active)] group-hover:translate-x-1 transition-all duration-150 shrink-0" />
      </button>

      {/* Right Docking Cable Feeder */}
      <div className="hidden sm:flex items-center" aria-hidden="true">
        <div className="size-2 rounded-full border border-[var(--fiber-core)] bg-[var(--surface-primary)]" />
        <div className="w-8 h-[2px] bg-gradient-to-l from-transparent via-[var(--fiber-base)] to-[var(--fiber-core)] opacity-60" />
      </div>
    </div>
  )
}

"use client"

import React, { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { NetworkMonogramM } from "@/components/network/NetworkMonogramM"
import { Sun, Moon, Languages, FastForward } from "lucide-react"
import DigitalGateway from "./DigitalGateway"
import FiberTypography from "./FiberTypography"
import FiberName from "./FiberName"
import PortfolioCTA from "./PortfolioCTA"
import EntranceTransition from "./EntranceTransition"
import gsap from "gsap"

interface PortfolioEntranceProps {
  onEnter3D: () => void
}

export default function PortfolioEntrance({ onEnter3D }: PortfolioEntranceProps) {
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Entrance states:
  // 'initial-closed' -> 'doors-opening' -> 'hero-active' -> 'transitioning'
  const [stage, setStage] = useState<"closed" | "opening" | "active" | "transitioning">("closed")
  const heroContentRef = useRef<HTMLDivElement>(null)

  const t = translations[language].gateway

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setStage("active")
      return
    }

    // Automatically trigger door opening after brief infrastructure poise
    const openTimer = setTimeout(() => {
      setStage("opening")
    }, 450)

    return () => clearTimeout(openTimer)
  }, [])

  // Animate hero content into view as the doors open
  useEffect(() => {
    if (stage === "opening" && heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { scale: 0.92, opacity: 0.2 },
        { scale: 1, opacity: 1, duration: 1.4, delay: 0.3, ease: "power2.out" }
      )
    }
  }, [stage])

  const handleGatewayOpenComplete = () => {
    setStage("active")
  }

  const handleSkipIntro = () => {
    setStage("active")
    if (heroContentRef.current) {
      gsap.set(heroContentRef.current, { scale: 1, opacity: 1 })
    }
  }

  const handleEnterClick = () => {
    setStage("transitioning")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[var(--background-primary)] text-foreground overflow-hidden select-none">
      {/* 1. CLOSED DIGITAL GATEWAY & DOOR OPENING ANIMATION */}
      <DigitalGateway
        isOpen={stage === "opening" || stage === "active" || stage === "transitioning"}
        onOpenComplete={handleGatewayOpenComplete}
      />

      {/* 2. FORWARD WARP TRANSITION OVERLAY */}
      <EntranceTransition
        isTransitioning={stage === "transitioning"}
        onTransitionComplete={onEnter3D}
      />

      {/* 3. TOP CONTROL BAR (Monogram, Skip, Language, Theme) */}
      {mounted && (
        <header className="relative z-30 w-full flex items-center justify-between p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          {/* Brand Tag: Network Monogram & Identifier */}
          <div className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-xs">
            <div className="size-6 sm:size-7 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-1 text-foreground shrink-0">
              <NetworkMonogramM className="size-3.5 sm:size-4.5" />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-foreground truncate max-w-[40vw] sm:max-w-none">
              {t.tag}
            </span>
          </div>

          {/* Right Controls: Skip Intro (during animation), Language Toggle, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Skip Intro button for recruiter convenience */}
            {stage === "opening" && (
              <button
                onClick={handleSkipIntro}
                type="button"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/80 dark:bg-zinc-900/80 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors cursor-pointer"
                title="Skip Entrance Animation"
                aria-label="Skip Entrance Animation"
              >
                <FastForward className="size-3.5" />
                <span>SKIP</span>
              </button>
            )}

            {/* Language Mode Toggle (EN / ID) */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-xs font-mono font-bold text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 cursor-pointer shadow-xs"
              title="Switch Language (EN / ID)"
              aria-label="Switch Language"
            >
              <Languages className="size-3.5 sm:size-4 text-foreground" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 sm:p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 cursor-pointer shadow-xs"
              title="Toggle Light / Dark Mode"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="size-4 sm:size-4.5 text-foreground" />
              ) : (
                <Moon className="size-4 sm:size-4.5 text-foreground" />
              )}
            </button>
          </div>
        </header>
      )}

      {/* 4. MAIN FULL-SCREEN HERO SECTION (Centered Horizontally & Vertically) */}
      <main
        ref={heroContentRef}
        className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 max-w-5xl mx-auto -mt-6 sm:-mt-8"
      >
        {/* Subtle Converging Ambient Grid Lines */}
        <div className="absolute inset-0 bg-radial-gradient opacity-80 pointer-events-none" />

        <div className="relative w-full flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 text-center">
          {/* PRIMARY FOCUS: Fiber Optic Typography "PORTFOLIO" */}
          <FiberTypography
            isReady={stage === "opening" || stage === "active"}
            isTransitioning={stage === "transitioning"}
          />

          {/* SECONDARY FOCUS: Engineered Name "Mahija Ibad Pradipta" */}
          <FiberName
            isReady={stage === "opening" || stage === "active"}
          />

          {/* TERTIARY FOCUS: "[ Enter 3D Portfolio ]" CTA Button */}
          <PortfolioCTA
            onEnter={handleEnterClick}
            disabled={stage === "transitioning"}
          />
        </div>
      </main>

      {/* 5. BOTTOM MINIMAL INFRASTRUCTURE FOOTER TELEMETRY */}
      <footer className="relative z-20 w-full flex items-center justify-between px-6 py-4 max-w-7xl mx-auto text-[10px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 opacity-60 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--fiber-active)] animate-pulse" />
          <span>SYS.INFRASTRUCTURE // ONLINE</span>
        </div>
        <div className="hidden sm:block tracking-widest">
          DEBIAN 12 • DOCKER • CLOUDFLARE TUNNELS
        </div>
        <div>LATENCY &lt; 1ms</div>
      </footer>
    </div>
  )
}

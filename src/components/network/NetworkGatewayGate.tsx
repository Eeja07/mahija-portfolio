"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import NetworkCore3D from "@/components/network/NetworkCore3D"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { NetworkMonogramM } from "@/components/network/NetworkMonogramM"
import { Sun, Moon, Languages, ArrowRight, ShieldCheck } from "lucide-react"

interface NetworkGatewayGateProps {
  onEnter: (targetId?: string) => void
}

export default function NetworkGatewayGate({ onEnter }: NetworkGatewayGateProps) {
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const isEn = language === "en"
  const t = translations[language].gateway

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-background text-foreground overflow-hidden select-none"
    >
      {/* Top Header Bar: Clean Separation for Mobile & Desktop */}
      {mounted && (
        <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
          {/* Upgraded Brand Identifier */}
          <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md shadow-xs font-mono text-xs font-semibold text-foreground">
            <div className="size-5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-0.5 text-blue-600 dark:text-cyan-400">
              <NetworkMonogramM className="size-3.5" />
            </div>
            <span className="tracking-tight">{t.tag}</span>
            <span className="size-1.5 rounded-full bg-emerald-500 animate-led" />
          </div>

          {/* Theme & Language Controls */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
            {/* Language Mode Toggle (EN / ID) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md text-xs font-mono font-semibold text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 cursor-pointer shadow-xs"
              title="Switch Language (EN / ID)"
              aria-label="Switch Language"
            >
              <Languages className="size-3.5 text-blue-500 dark:text-cyan-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 cursor-pointer shadow-xs"
              title="Toggle Light / Dark Mode"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="size-4 text-amber-400" />
              ) : (
                <Moon className="size-4 text-blue-600" />
              )}
            </button>
          </div>
        </header>
      )}

      {/* Portfolio Identity Highlight Card (Top Center) */}
      {mounted && (
        <div className="absolute top-16 sm:top-20 inset-x-4 max-w-xl mx-auto z-20 pointer-events-none flex flex-col items-center text-center">
          <div className="pointer-events-auto bg-background/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col items-center gap-2 max-w-full">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-led" />
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                {t.badge} &bull; {t.title}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm font-medium text-foreground max-w-md leading-snug">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                onClick={() => onEnter("#hero")}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 font-mono text-[11px] font-bold tracking-tight flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>{t.enterButton}</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen 3D Server Chassis & Cable Hub Stage */}
      <div className="w-full h-full relative">
        <NetworkCore3D onNodeSelect={(id) => onEnter(id)} />
      </div>
    </motion.div>
  )
}

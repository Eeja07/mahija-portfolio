"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import NetworkCore3D from "@/components/network/NetworkCore3D"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { NetworkMonogramM } from "@/components/network/NetworkMonogramM"
import { Sun, Moon, Languages } from "lucide-react"

interface NetworkGatewayGateProps {
  onEnter: (targetId?: string) => void
}

export default function NetworkGatewayGate({ onEnter }: NetworkGatewayGateProps) {
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
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
      {/* Top Header Bar: Clean Minimalist Controls */}
      {mounted && (
        <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
          {/* Brand Tag: Clean Monogram and Typography (No blinking dot) */}
          <div className="pointer-events-auto flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md shadow-sm font-mono text-sm sm:text-base font-bold text-foreground">
            <div className="size-7 sm:size-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-1 text-blue-600 dark:text-cyan-400">
              <NetworkMonogramM className="size-4.5 sm:size-5.5" />
            </div>
            <span className="tracking-tight">{t.tag}</span>
          </div>

          {/* Theme & Language Controls: Scaled up buttons */}
          <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
            {/* Language Mode Toggle (EN / ID) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md text-xs sm:text-sm font-mono font-bold text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 cursor-pointer shadow-sm"
              title="Switch Language (EN / ID)"
              aria-label="Switch Language"
            >
              <Languages className="size-4 sm:size-4.5 text-blue-500 dark:text-cyan-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 sm:p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 cursor-pointer shadow-sm"
              title="Toggle Light / Dark Mode"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="size-5 text-amber-400" />
              ) : (
                <Moon className="size-5 text-blue-600" />
              )}
            </button>
          </div>
        </header>
      )}

      {/* Fullscreen 3D Portfolio Stage */}
      <div className="w-full h-full relative">
        <NetworkCore3D onNodeSelect={(id) => onEnter(id)} />
      </div>
    </motion.div>
  )
}

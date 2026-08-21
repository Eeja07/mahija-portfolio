"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Compass, ChevronDown, ChevronUp, X } from "lucide-react"

interface RoadmapStep {
  step: string
  label: string
  desc: string
  targetId: string
}

const roadmapSteps: RoadmapStep[] = [
  {
    step: "01",
    label: "Infrastructure",
    desc: "Server fisik Debian 12 & Docker container",
    targetId: "#infrastructure",
  },
  {
    step: "02",
    label: "Projects",
    desc: "CCTV IoT, Drone Otonom, dan Web UNTERN",
    targetId: "#featured-engineering",
  },
  {
    step: "03",
    label: "Experience",
    desc: "Riwayat industri, asisten lab, dan instruktur",
    targetId: "#experience",
  },
  {
    step: "04",
    label: "Skills",
    desc: "Matriks keahlian & filter 8 kelompok modul",
    targetId: "#skills",
  },
  {
    step: "05",
    label: "Organizations",
    desc: "Kepemimpinan laboratorium dan himpunan",
    targetId: "#organizations",
  },
  {
    step: "06",
    label: "Training",
    desc: "Sertifikasi manajerial & kepemimpinan",
    targetId: "#training",
  },
  {
    step: "07",
    label: "Awards",
    desc: "Kejuaraan nasional & robotika internasional",
    targetId: "#awards",
  },
  {
    step: "08",
    label: "Repositories",
    desc: "50 repositori kode sumber terbuka GitHub",
    targetId: "#repositories",
  },
  {
    step: "09",
    label: "Resume",
    desc: "Unduh resume PDF (Inggris / Indonesia)",
    targetId: "#resume",
  },
  {
    step: "10",
    label: "Contact",
    desc: "Socket komunikasi langsung & media sosial",
    targetId: "#contact",
  },
]

export default function InteractiveJourneyGuide() {
  const [isOpen, setIsOpen] = useState(false)

  const handleJumpTo = (targetId: string) => {
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none font-sans">
      {/* Collapsible Roadmap Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="mb-3 w-[320px] sm:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur-xl shadow-2xl p-4 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-foreground">
                  <Compass className="size-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-foreground">
                    ALUR JELAJAH SISTEM
                  </h4>
                  <span className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400">
                    10 Bagian Portofolio Terhubung
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-foreground transition-colors cursor-pointer"
                aria-label="Tutup panduan"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Steps List */}
            <div className="mt-3 flex flex-col gap-1.5 max-h-[340px] overflow-y-auto pr-1">
              {roadmapSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    handleJumpTo(s.targetId)
                    setIsOpen(false)
                  }}
                  className="flex items-start gap-3 p-2 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group cursor-pointer"
                >
                  <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 shrink-0">
                    {s.step}
                  </span>
                  <div className="flex-1">
                    <span className="font-sans text-xs font-bold text-foreground group-hover:text-foreground block transition-colors">
                      {s.label}
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 block leading-snug">
                      {s.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer status */}
            <div className="mt-3 pt-2.5 border-t border-zinc-200/70 dark:border-zinc-800/70 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Navigasi Jalur Fiber</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-semibold">ROUTING ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur-md shadow-lg text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 cursor-pointer group"
      >
        <span className="size-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
        <Compass className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:rotate-45 transition-transform duration-200" />
        <span className="font-mono text-xs font-bold">
          {isOpen ? "Tutup Alur" : "Alur Portofolio"}
        </span>
        {isOpen ? (
          <ChevronDown className="size-3.5 text-zinc-400" />
        ) : (
          <ChevronUp className="size-3.5 text-zinc-400" />
        )}
      </button>
    </div>
  )
}

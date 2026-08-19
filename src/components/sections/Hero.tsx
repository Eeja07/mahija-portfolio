"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { resumeVariants } from "@/data/resume"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const t = translations[language].hero

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.18,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="hero"
      aria-label="Network Gateway & Engineering Identity"
      className="relative flex flex-col items-center justify-start pt-16 pb-16 md:pt-24 md:pb-20 w-full select-none"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center"
        >
          {/* Left Column: Network Gateway Identity & Controls */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 text-left">
            
            {/* Name Title with Laser Subtitle */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground leading-[1.08]">
                {t.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
            </motion.div>

            {/* Network Protocol Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 select-none"
            >
              {[
                { name: "Debian 12", type: "HOST" },
                { name: "Docker", type: "ENGINE" },
                { name: "Cloudflare", type: "INGRESS" },
                { name: "MQTT", type: "BROKER" },
                { name: "YOLO", type: "VISION" },
                { name: "PX4", type: "AUTOPILOT" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-900/80 hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-150"
                >
                  <span className="size-1.5 rounded-full bg-blue-500 dark:bg-cyan-400" />
                  <span className="font-semibold">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="https://github.com/Eeja07"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "font-mono text-xs font-semibold border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-transform duration-150 rounded-xl h-10 px-5"
                )}
              >
                <GithubIcon className="size-4 mr-2" />
                {t.github}
              </a>

              {mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      buttonVariants({ variant: "outline", size: "default" }),
                      "font-mono text-xs font-semibold border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-transform duration-150 cursor-pointer flex items-center gap-1.5 rounded-xl h-10 px-5"
                    )}
                  >
                    <span>{t.downloadCv}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-zinc-500 dark:text-zinc-400">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="border border-zinc-200 dark:border-zinc-800 bg-background shadow-lg p-1.5 rounded-xl font-sans">
                    {resumeVariants.map((variant) => (
                      <DropdownMenuItem
                        key={variant.id}
                        nativeButton={false}
                        render={
                          <a
                            href={variant.href}
                            download={`Mahija_Resume_${variant.language}.pdf`}
                          />
                        }
                        className="flex items-center gap-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-sm text-foreground rounded-lg px-2.5 py-2"
                      >
                        <Download className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                        <span>{variant.label}</span>
                        <Badge variant="outline" className="ml-auto font-mono text-[9px] px-1.5 py-0 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900">
                          {variant.language}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </motion.div>

            {/* Bento Metrics Rack */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                {t.metrics.map((metric, idx) => (
                  <NetworkSubsystemNode
                    key={metric.label}
                    nodeId={`METRIC // 0${idx + 1}`}
                    subsystem="TELEMETRY"
                    className="p-4 sm:p-4"
                  >
                    <span className="font-mono text-base font-bold text-foreground tracking-tight">
                      {metric.label}
                    </span>
                    <span className="font-sans text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                      {metric.sub}
                    </span>
                  </NetworkSubsystemNode>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Image with Fiber Optic Laser Ring */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end select-none relative"
          >
            {/* Spinning Laser Halo SVG */}
            <div className="relative p-3 sm:p-4 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-2xl group">
              <span className="circuit-corner-tl" />
              <span className="circuit-corner-br" />
              
              {/* Rotating Fiber Ring Effect */}
              <div className="absolute -inset-1 rounded-3xl opacity-35 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 blur-sm animate-spin-slow" />

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] rounded-2xl overflow-hidden bg-background/80 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/50 z-10">
                <img
                  src="/profile.png"
                  alt="Mahija Ibad Pradipta"
                  className="w-full h-full object-contain filter drop-shadow-md dark:brightness-95 transition-transform duration-300 group-hover:scale-102"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl px-4 mt-12">
        <SpatialCableBranch direction="left-to-right" label={t.cableLabel} status="transmitting" />
      </div>
    </section>
  )
}

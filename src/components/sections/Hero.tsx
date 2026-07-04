"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { resumeVariants } from "@/data/resume"
import { cn } from "@/lib/utils"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function Hero() {
  const [mounted, setMounted] = useState(false)

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
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  const handleScrollToWork = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const targetElement = document.querySelector("#featured-engineering")
    if (targetElement) {
      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <section 
      id="hero"
      aria-label="Introduction and Career Summary"
      className="relative w-full min-h-[75vh] pt-24 pb-12 flex items-center justify-center bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col gap-6 text-left"
        >
          {/* Subtitle Badge */}
          <motion.div variants={itemVariants}>
            <Badge 
              variant="outline" 
              className="gap-1.5 border-zinc-800 py-1.5 px-3 bg-zinc-950/40 text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
            >
              <span className="size-1.5 rounded-full bg-zinc-400" />
              Computer Engineering ITS
            </Badge>
          </motion.div>

          {/* Name Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-7xl font-sans font-semibold tracking-tight text-zinc-50 leading-[1.05]"
          >
            Mahija Ibad Pradipta
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-zinc-400 font-sans font-normal leading-8"
          >
            Building self-hosted systems, IoT platforms, autonomous robotics, and infrastructure.
          </motion.p>

          {/* Tech Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2 select-none"
          >
            {["Debian", "Docker", "Cloudflare", "MQTT", "YOLO", "PX4"].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-3 py-1.5 border border-zinc-800 font-mono text-sm text-zinc-400 bg-zinc-950/40"
              >
                {tech}
              </Badge>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 mt-2"
          >
            <Button
              onClick={handleScrollToWork}
              className="font-medium bg-zinc-200 text-zinc-800 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 transition-transform duration-150 cursor-pointer"
            >
              View Work
            </Button>

            <a
              href="https://github.com/Eeja07"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "font-medium border-zinc-800 text-zinc-200 bg-zinc-950/40 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800 transition-transform duration-150"
              )}
            >
              <GithubIcon className="size-4 mr-2" />
              GitHub
            </a>

            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "font-medium border-zinc-800 text-zinc-200 bg-zinc-950/40 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800 transition-transform duration-150 cursor-pointer flex items-center gap-1.5"
                  )}
                >
                  <span>Resume</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-zinc-400">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="border border-zinc-800 bg-zinc-950 shadow-md">
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
                      className="flex items-center gap-2 cursor-pointer hover:bg-zinc-800 text-sm font-sans text-zinc-200"
                    >
                      <span>{variant.label}</span>
                      <Badge variant="outline" className="ml-auto font-mono text-[9px] px-1 py-0 border-zinc-800 text-zinc-400 bg-zinc-950/40">
                        {variant.language}
                      </Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </motion.div>

          {/* Simplified Metrics Block */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 border border-zinc-800 bg-zinc-950/40 rounded-2xl p-5 mt-4 max-w-xl text-left"
          >
            {[
              { label: "40+ Repositories", sub: "Source control" },
              { label: "6 Active Services", sub: "Production hosting" },
              { label: "2.5M Stored Images", sub: "CCTV database files" },
            ].map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <span className="font-mono text-base font-semibold text-zinc-200 leading-none">{metric.label}</span>
                <span className="font-sans text-xs text-zinc-500">{metric.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

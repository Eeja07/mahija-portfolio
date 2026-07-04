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
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.15,
      },
    },
  }

  const handleScrollToWork = () => {
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
      aria-label="Introduction Summary"
      className="relative flex items-center justify-start py-24 md:py-32 w-full select-none"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          {/* Left Column: Text & Metrics */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 text-left">
            {/* Label Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="w-fit border-zinc-200 dark:border-zinc-800 py-1.5 px-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-widest select-none"
              >
                Engineering Showcase & Career Archive
              </Badge>
            </motion.div>

            {/* Name Title */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl font-sans font-semibold tracking-tight text-foreground leading-[1.05]"
            >
              Mahija Ibad Pradipta
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base text-zinc-500 dark:text-zinc-400 font-sans font-normal leading-8"
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
                  className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 font-mono text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900"
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
                className="font-medium bg-foreground text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-transform duration-150 cursor-pointer"
              >
                View Work
              </Button>

              <a
                href="https://github.com/Eeja07"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "font-medium border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-transform duration-150"
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
                      "font-medium border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-transform duration-150 cursor-pointer flex items-center gap-1.5"
                    )}
                  >
                    <span>Resume</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-zinc-500 dark:text-zinc-400 animate-none">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md">
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
                        className="flex items-center gap-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 text-sm font-sans text-foreground"
                      >
                        <span>{variant.label}</span>
                        <Badge variant="outline" className="ml-auto font-mono text-[9px] px-1 py-0 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900">
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
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 mt-4 max-w-xl text-left"
            >
              {[
                { label: "2 Internships", sub: "Work history" },
                { label: <>3<br />Awards</>, sub: "Competitions" },
                { label: "46 Repositories", sub: "Open source" },
                { label: "4 Years Building", sub: "Active experience" },
              ].map((metric) => (
                <div key={metric.sub} className="flex flex-col gap-1">
                  <span className="font-mono text-base font-semibold text-foreground leading-none">{metric.label}</span>
                  <span className="font-sans text-xs text-zinc-500 dark:text-zinc-400">{metric.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end select-none"
          >
            <div className="relative w-72 h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
              <img
                src="/profile.png"
                alt="Mahija Ibad Pradipta"
                className="w-full h-full object-contain filter drop-shadow-sm dark:brightness-95 transition-all"
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

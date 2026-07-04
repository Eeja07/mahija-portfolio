"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface JourneyMilestone {
  year: string
  focus: string
  details: string
}

const journey: JourneyMilestone[] = [
  { year: "2022", focus: "Algorithms", details: "Computing foundations, NASM Assembly, SFML graphics solvers." },
  { year: "2023", focus: "Systems", details: "Compilers construction, database engines, hardware protocols." },
  { year: "2024", focus: "Drone", details: "ROS2 navigation, YOLOv8 edge inference payloads, PX4 autopilot." },
  { year: "2025", focus: "IoT", details: "Proxmox VE virtualization, ESP32 FreeRTOS sensor networks, MQTT." },
  { year: "2026", focus: "Homelab", details: "Debian server management, cloudflared egress tunnels, backup redundancy." },
]

export default function EngineeringJourney() {
  const [isExpanded, setIsExpanded] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.12,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="engineering-journey"
      aria-labelledby="journey-heading"
      className="w-full py-10 bg-background/50 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Button / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div className="text-left">
            <h2 
              id="journey-heading"
              className="text-lg font-mono font-bold tracking-tight text-muted-foreground flex items-center gap-2"
            >
              <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-pulse" />
              Engineering Journey Archive
            </h2>
            <p className="text-xs text-muted-foreground/75 font-sans mt-0.5">
              Historical progression and developmental focus areas from 2022 to 2026.
            </p>
          </div>

          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-mono text-xs cursor-pointer w-fit self-start sm:self-center"
          >
            {isExpanded ? "Collapse Timeline" : "Expand Journey Timeline"}
          </Button>
        </div>

        {/* Compressed Timeline Box */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="overflow-hidden mt-6"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-left"
              >
                {journey.map((milestone) => (
                  <motion.div 
                    key={milestone.year} 
                    variants={itemVariants}
                    className="border-t border-border/60 pt-4 flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs font-bold text-primary">{milestone.year}</span>
                      <span className="text-[10px] text-foreground font-semibold uppercase">{milestone.focus}</span>
                    </div>
                    <p className="font-sans text-xs text-muted-foreground leading-normal mt-0.5">
                      {milestone.details}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

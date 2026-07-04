"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"

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
      className="w-full py-16 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10 text-left max-w-xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-0.5 px-2.5 bg-muted/30 text-muted-foreground font-mono font-medium text-[10px] uppercase tracking-wider select-none"
          >
            Progression
          </Badge>
          <h2 
            id="journey-heading"
            className="text-2xl font-sans font-bold tracking-tight text-foreground"
          >
            Engineering Journey
          </h2>
        </div>

        {/* Compressed high-density horizontal list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-5 gap-4 select-none"
        >
          {journey.map((milestone) => (
            <motion.div 
              key={milestone.year} 
              variants={itemVariants}
              className="border-t border-border/80 pt-4 text-left flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 font-mono">
                <span className="text-sm font-bold text-primary">{milestone.year}</span>
                <span className="text-[10px] text-foreground font-semibold uppercase">{milestone.focus}</span>
              </div>
              <p className="font-sans text-[11px] text-muted-foreground leading-normal mt-0.5">
                {milestone.details}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

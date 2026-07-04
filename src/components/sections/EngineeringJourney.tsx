"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface JourneyMilestone {
  year: string
  focus: string
  items: string[]
}

const journey: JourneyMilestone[] = [
  {
    year: "2022",
    focus: "Computing Foundations",
    items: ["Algorithms & Structures", "Basic Programming", "NASM Assembly", "SFML Graphics"],
  },
  {
    year: "2023",
    focus: "Systems & Security",
    items: ["Compilers Construction", "Information Security", "Relational Databases", "Hardware Interfaces"],
  },
  {
    year: "2024",
    focus: "Drones & Machine Learning",
    items: ["Autonomous UAV Search", "NVIDIA Jetson Nano", "YOLOv8 Edge Inference", "ROS2 & PX4 MAVLink"],
  },
  {
    year: "2025",
    focus: "Virtualization & IoT",
    items: ["Proxmox VE virtualization", "Docker VM Orchestration", "ESP32 Firmware Development", "MQTT Telemetry Ingress"],
  },
  {
    year: "2026",
    focus: "Homelab & Resiliency",
    items: ["Debian Server Management", "Cloudflare Secure Ingress", "Distributed backups / MinIO", "High Uptime Architectures"],
  },
]

export default function EngineeringJourney() {
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
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="engineering-journey"
      aria-labelledby="journey-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Evolution
          </Badge>
          <h2 
            id="journey-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Engineering Journey
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            A high-density timeline of technical progression, core capabilities development, and academic focus milestones.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 select-none"
        >
          {journey.map((milestone) => (
            <motion.div key={milestone.year} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/30 transition-colors duration-150 h-full p-4 flex flex-col gap-3 justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-primary">{milestone.year}</span>
                    <span className="size-1.5 rounded-full bg-border" />
                  </div>
                  <h3 className="font-sans text-xs font-bold text-foreground mt-2 leading-tight">
                    {milestone.focus}
                  </h3>
                </div>

                <div className="flex flex-col gap-1.5 mt-3">
                  {milestone.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[10px] text-muted-foreground leading-normal">
                      <span className="text-primary mt-0.5">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

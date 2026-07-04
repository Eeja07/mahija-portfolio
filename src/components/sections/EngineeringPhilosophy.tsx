"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface PhilosophyItem {
  title: string
  description: string
}

const philosophyItems: PhilosophyItem[] = [
  {
    title: "Automation over repetition",
    description: "Write declarative configurations (Docker Compose, Ansible) instead of manual setup execution."
  },
  {
    title: "Observability first",
    description: "Unmonitored systems do not exist. Centralize system telemetry, logs, and thermals."
  },
  {
    title: "Deployability matters",
    description: "Ensure configurations and services are readily reproducible with single-command executions."
  },
  {
    title: "Self-host when practical",
    description: "Retain data privacy and full control over database layers using local server networks."
  },
  {
    title: "Security by default",
    description: "Block all direct public ingress ports; use secure tunnels and reverse proxy rules."
  },
  {
    title: "Reliability over complexity",
    description: "Prefer simple, static, single-purpose architectures over bloated, fragile pipelines."
  }
]

export default function EngineeringPhilosophy() {
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
      id="engineering-philosophy"
      aria-labelledby="philosophy-heading"
      className="w-full py-16 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10 text-left max-w-xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-0.5 px-2.5 bg-muted/30 text-muted-foreground font-mono font-medium text-[10px] uppercase tracking-wider select-none"
          >
            Principles
          </Badge>
          <h2 
            id="philosophy-heading"
            className="text-2xl font-sans font-bold tracking-tight text-foreground"
          >
            Engineering Philosophy
          </h2>
        </div>

        {/* Philosophy Grid - 6 Columns on Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 select-none"
        >
          {philosophyItems.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/30 transition-colors duration-150 h-full p-3.5 flex flex-col justify-between text-left">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase font-bold">Rule 0{idx + 1}</span>
                    <span className="size-1 rounded-full bg-zinc-800" />
                  </div>
                  <h3 className="font-sans text-[11px] font-bold text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

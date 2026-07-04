"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface PhilosophyItem {
  title: string
  description: string
  subtext: string
}

const philosophyItems: PhilosophyItem[] = [
  {
    title: "Automation over Repetition",
    description: "Write declarative configurations (Docker Compose, Ansible playbooks) instead of manually executing package setups.",
    subtext: "If a system requires custom parameters twice, it belongs in source control."
  },
  {
    title: "Observability First",
    description: "Unmonitored hardware does not exist. Centralize system telemetry, logs, and thermal alerts to maintain visibility.",
    subtext: "Track storage usage, container network statistics, and sensor node connections in real-time."
  },
  {
    title: "Self-Hosting where Practical",
    description: "Own the software stack and database variables. Leverage local object storage networks instead of third-party cloud engines.",
    subtext: "Zero cloud pricing dependency, full data privacy, and robust offline execution."
  },
  {
    title: "Security by Default",
    description: "Employ egress-only networks and reverse proxy rules. Block direct IP inbound traffic and maintain strict firewall configurations.",
    subtext: "Establish isolated Docker networks and secure tunnels for system ingress."
  }
]

export default function EngineeringPhilosophy() {
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
      id="engineering-philosophy"
      aria-labelledby="philosophy-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Principles
          </Badge>
          <h2 
            id="philosophy-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Engineering Philosophy
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Core technical beliefs and operational guidelines informing infrastructure setups and code construction.
          </p>
        </div>

        {/* Philosophy Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none"
        >
          {philosophyItems.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/30 transition-colors duration-150 h-full p-4 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Rule 0{idx + 1}</span>
                    <span className="size-1.5 rounded-full bg-zinc-800" />
                  </div>
                  <h3 className="font-sans text-xs font-bold text-foreground mt-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-border/30 pt-3">
                  <p className="font-mono text-[9.5px] text-zinc-500 leading-normal italic text-left">
                    &ldquo;{item.subtext}&rdquo;
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

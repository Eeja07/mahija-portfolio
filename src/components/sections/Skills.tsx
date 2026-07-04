"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"

const coreTechnologies = [
  "Docker",
  "Linux",
  "Debian",
  "Cloudflare",
  "MQTT",
  "Laravel",
  "YOLO",
  "MAVSDK",
  "ROS",
  "Python",
  "TypeScript",
  "PostgreSQL"
]

export default function Skills() {
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
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Technical Stack
          </Badge>
          <h2 
            id="skills-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Core Technologies
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            The core set of systems, protocols, environments, and languages relied upon for construction and deployment.
          </p>
        </div>

        {/* 12 Core Technologies Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto select-none"
        >
          {coreTechnologies.map((tech) => (
            <motion.div key={tech} variants={itemVariants}>
              <div 
                className="border border-border/80 bg-card/45 hover:border-primary/50 hover:bg-card transition-all duration-150 rounded-xl px-5 py-3 flex items-center justify-center font-mono text-xs font-semibold text-foreground shadow-sm"
              >
                {tech}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

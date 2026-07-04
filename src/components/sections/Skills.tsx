"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface SkillGroup {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: "Infrastructure",
    items: ["Docker", "Docker Compose", "Linux (Debian)", "Proxmox VE", "Portainer", "Nginx", "Cloudflare Tunnel"]
  },
  {
    category: "Backend",
    items: ["Laravel", "PostgreSQL", "MySQL", "PHP", "Go", "REST APIs", "gRPC / Protobuf"]
  },
  {
    category: "Embedded",
    items: ["MQTT", "ROS2", "PX4 Autopilot", "MAVSDK / MAVLink", "Raspberry Pi", "ESP32", "C++ / Embedded C"]
  },
  {
    category: "AI",
    items: ["PyTorch", "YOLOv8", "OpenCV", "Computer Vision", "CNNs", "TensorRT"]
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Motion", "HTML5 / CSS3"]
  }
]

export default function Skills() {
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
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1.5 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Technical Stack
          </Badge>
          <h2 
            id="skills-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground md:text-4xl"
          >
            Core Technologies
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed md:leading-8">
            The core set of systems, protocols, environments, and languages relied upon for construction and deployment.
          </p>
        </div>

        {/* Grouped Slices */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 select-none"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm p-5 h-full flex flex-col gap-4 hover:border-primary/20 transition-colors duration-150 text-left">
                <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {group.items.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="border border-border/40 px-3 py-1.5 font-mono text-sm text-muted-foreground bg-muted/40"
                    >
                      {tech}
                    </Badge>
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

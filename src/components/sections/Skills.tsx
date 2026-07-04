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
      className="w-full py-20 bg-background border-t border-zinc-800"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-zinc-800 py-1.5 px-3 bg-zinc-950/40 text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Technical Stack
          </Badge>
          <h2 
            id="skills-heading"
            className="text-3xl font-sans font-semibold tracking-tight text-zinc-50"
          >
            Core Technologies
          </h2>
          <p className="text-base text-zinc-400 font-sans font-normal leading-8">
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
              <Card className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 h-full flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-150 text-left">
                <h3 className="font-mono text-sm font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {group.items.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="border border-zinc-800 px-3 py-1.5 font-mono text-sm text-zinc-400 bg-zinc-950/40"
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

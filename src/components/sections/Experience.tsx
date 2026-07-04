"use client"

import React from "react"
import { motion } from "motion/react"
import { experiences } from "@/data/experience"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
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

  const allowedRoles = ["m-iot-coordinator", "lintasarta-intern", "dsp-lab-assistant", "programming-lab-ta"]
  const snapshotExperiences = experiences.filter((exp) => allowedRoles.includes(exp.id))

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full py-16 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10 text-left max-w-xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-0.5 px-2.5 bg-muted/30 text-muted-foreground font-mono font-medium text-[10px] uppercase tracking-wider select-none"
          >
            History
          </Badge>
          <h2 
            id="experience-heading"
            className="text-2xl font-sans font-bold tracking-tight text-foreground"
          >
            Experience Snapshot
          </h2>
        </div>

        {/* Ultra-condensed horizontal grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {snapshotExperiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/30 transition-colors duration-150 h-full p-4 flex flex-col justify-between text-left">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500">
                    <span className="font-bold uppercase">{exp.category}</span>
                    <span>{exp.startDate.split(" ")[1] || exp.startDate} &mdash; {exp.endDate ? exp.endDate.split(" ")[1] || exp.endDate : "Present"}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xs font-bold text-foreground leading-tight">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-[10px] text-muted-foreground mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <p className="font-sans text-[11px] text-muted-foreground leading-relaxed mt-1">
                    {exp.achievements[0]?.split(",")[0] || exp.achievements[0]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-3 pt-3.5 border-t border-border/30 select-none">
                  {exp.technologies.slice(0, 3).map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="border border-border/20 px-1 py-0 font-mono text-[8.5px] text-zinc-400 bg-muted/20"
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

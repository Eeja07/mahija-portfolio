"use client"

import React from "react"
import { motion } from "motion/react"
import { experiences } from "@/data/experience"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
)

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export default function Experience() {
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

  // Filter for exactly 4 high-signal engineering/academic roles
  const allowedRoles = ["m-iot-coordinator", "lintasarta-intern", "dsp-lab-assistant", "programming-lab-ta"]
  const snapshotExperiences = experiences.filter((exp) => allowedRoles.includes(exp.id))

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            History
          </Badge>
          <h2 
            id="experience-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Experience Snapshot
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Condensed history of research assistantships, teaching coordinates, and network internships.
          </p>
        </div>

        {/* Condensed List View (Secondary Prominence) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {snapshotExperiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/30 transition-colors duration-150 h-full flex flex-col justify-between p-5">
                <div className="flex flex-col gap-3 text-left">
                  {/* Card Header metadata */}
                  <div className="flex items-center justify-between select-none">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-bold">
                      {exp.category}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="size-3 text-zinc-600" />
                      {exp.startDate} &mdash; {exp.endDate || "Present"}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="font-sans text-sm font-bold text-foreground leading-snug">
                      {exp.role}
                    </h3>
                    <div className="font-sans text-[11px] font-semibold text-muted-foreground mt-0.5 flex items-center gap-1.5 justify-start">
                      <span>{exp.company}</span>
                      <span className="text-zinc-700 select-none">&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="size-2.5 text-zinc-600" />
                        {exp.location.split(",")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Achievements condensed */}
                  <ul className="list-none text-xs text-muted-foreground flex flex-col gap-1.5 mt-2 leading-relaxed">
                    {exp.achievements.slice(0, 2).map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary mt-1">&bull;</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mt-4 select-none border-t border-border/30 pt-3">
                  {exp.technologies.slice(0, 4).map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="border border-border/20 px-1.5 py-0 font-mono text-[9px] text-zinc-400 bg-muted/20"
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

"use client"

import React from "react"
import { motion } from "motion/react"
import { experiences } from "@/data/experience"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Icon components for timeline nodes
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

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
            Career Roadmap
          </Badge>
          <h2 
            id="experience-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Experience
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Professional and Academic Background
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-8">
          
          {/* Vertical Line - Desktop */}
          <div className="absolute left-[16px] md:left-1/4 top-2 bottom-2 w-px bg-border/60" aria-hidden="true" />

          {/* List of Experiences */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative group"
              >
                
                {/* Timeline Dot - Mobile */}
                <div 
                  className="absolute left-[12px] top-6 size-2.5 rounded-full border border-border bg-background z-10 md:hidden flex items-center justify-center transition-colors duration-150 group-hover:border-primary"
                  aria-hidden="true"
                >
                  <div className="size-1 rounded-full bg-border group-hover:bg-primary transition-colors duration-150" />
                </div>

                {/* Left Rail: Dates & Category Badge - Desktop */}
                <div className="md:col-span-3 text-right hidden md:block pt-1 select-none">
                  <div className="flex flex-col items-end gap-1.5 pr-2">
                    <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5 justify-end">
                      <CalendarIcon className="size-3.5 text-muted-foreground" />
                      {exp.startDate} &mdash; {exp.endDate || "Present"}
                    </span>
                    <Badge 
                      variant="outline" 
                      className="border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-muted/20"
                    >
                      {exp.category}
                    </Badge>
                  </div>
                </div>

                {/* Center Node Rail - Desktop */}
                <div className="md:col-span-1 hidden md:flex justify-center relative select-none" aria-hidden="true">
                  <div className="size-3.5 rounded-full border border-border bg-background z-10 mt-2 flex items-center justify-center transition-colors duration-150 group-hover:border-primary">
                    <div className="size-1.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-150" />
                  </div>
                </div>

                {/* Right Rail: Card Content - Desktop & Mobile */}
                <div className="md:col-span-8 pl-8 md:pl-0">
                  <Card className="border border-border bg-card/40 shadow-sm transition-all duration-150 ease-in-out hover:border-primary/50">
                    
                    {/* Header Details */}
                    <CardHeader className="pb-3">
                      {/* Mobile Date & Category Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 md:hidden mb-2 select-none">
                        <span className="text-[10px] font-mono font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="size-3" />
                          {exp.startDate} &mdash; {exp.endDate || "Present"}
                        </span>
                        <Badge 
                          variant="outline" 
                          className="border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-muted/25"
                        >
                          {exp.category}
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <CardTitle className="font-sans text-base font-bold text-foreground leading-snug">
                            {exp.role}
                          </CardTitle>
                          <div className="font-sans text-sm font-semibold text-muted-foreground mt-0.5">
                            {exp.company}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground/80 font-sans flex items-center gap-1 mt-0.5 sm:mt-1 select-none">
                          <MapPinIcon className="size-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </CardHeader>

                    {/* Content Details */}
                    <CardContent className="flex flex-col gap-3 pt-0 pb-4">
                      {/* Achievements bullets */}
                      <div className="flex flex-col gap-1">
                        <ul className="text-xs text-muted-foreground list-disc list-outside pl-4 space-y-1.5 leading-relaxed">
                          {exp.achievements.slice(0, 3).map((ach, index) => {
                            const words = ach.split(" ");
                            const formatted = words.length > 18 ? words.slice(0, 18).join(" ") + "..." : ach;
                            return (
                              <li key={index}>
                                {formatted}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Technologies used */}
                      <div className="flex flex-wrap gap-1.5 pt-1 select-none">
                        {exp.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="border border-border/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground bg-muted/40"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                  </Card>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

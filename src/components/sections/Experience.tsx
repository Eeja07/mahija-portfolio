"use client"

import React from "react"
import { motion } from "motion/react"
import { experiences } from "@/data/experience"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  const allowedRoles = ["winnicode-intern", "lintasarta-intern", "programming-lab-ta", "robotics-instructor"]
  
  // Sort according to allowedRoles order
  const snapshotExperiences = allowedRoles
    .map((roleId) => experiences.find((exp) => exp.id === roleId))
    .filter((exp): exp is NonNullable<typeof exp> => !!exp)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1.5 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            History
          </Badge>
          <h2 
            id="experience-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground md:text-4xl"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {snapshotExperiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/30 transition-colors duration-150 h-full p-5 flex flex-col justify-between text-left">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-zinc-500">
                    <span className="font-bold uppercase">{exp.category}</span>
                    <span>{exp.startDate.split(" ")[1] || exp.startDate} &mdash; {exp.endDate ? exp.endDate.split(" ")[1] || exp.endDate : "Present"}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground leading-tight">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2">
                    {exp.achievements[0]?.split(",")[0] || exp.achievements[0]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/30 select-none">
                  {exp.technologies.slice(0, 3).map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="border border-border/20 px-3 py-1.5 font-mono text-sm text-zinc-400 bg-muted/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View Resume CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#resume"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-sans font-medium px-6 py-2 border-border hover:bg-muted transition-colors duration-150 flex items-center gap-2 cursor-pointer text-sm"
            )}
          >
            <span>View Resume</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

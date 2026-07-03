"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { skillGroups } from "@/data/skills"

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
    hidden: { opacity: 0, y: 12 },
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
            Skills & Core Capabilities
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Professional skill sets grouped by technical competencies and execution capabilities.
          </p>
        </div>

        {/* 3-Column Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={itemVariants}>
              <Card className="border border-border bg-card/40 shadow-sm transition-all duration-150 ease-in-out hover:border-primary/50 h-full flex flex-col justify-between">
                <div>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-sans text-base font-bold text-foreground leading-snug">
                      {group.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed mt-1">
                      {group.description}
                    </p>
                  </CardHeader>
                  <div className="px-6 pb-4">
                    <Separator className="bg-border/40" />
                  </div>
                </div>
                
                <CardContent className="pt-0 pb-6 flex-1 flex items-start">
                  <div className="flex flex-wrap gap-1.5 w-full select-none">
                    {group.items.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="border border-border/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground bg-muted/40"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

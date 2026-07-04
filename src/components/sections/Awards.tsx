"use client"

import React from "react"
import { motion } from "motion/react"
import { awards } from "@/data/career"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Awards() {
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
      id="awards"
      aria-labelledby="awards-heading"
      className="w-full py-20 bg-background border-t border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-zinc-200 dark:border-zinc-800 py-1.5 px-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Achievements
          </Badge>
          <h2 
            id="awards-heading"
            className="text-3xl font-sans font-semibold tracking-tight text-foreground"
          >
            Awards & Recognition
          </h2>
        </div>

        {/* Awards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {awards.map((award, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-sm hover:border-zinc-200/80 dark:hover:border-zinc-800/80 transition-colors duration-150 h-full p-6 flex flex-col justify-between text-left gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase">{award.competition}</span>
                    <span>{award.period}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl font-medium text-foreground leading-tight">
                      {award.title}
                    </h3>
                  </div>

                  <p className="font-sans text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                    {award.summary}
                  </p>

                  {award.bullets && award.bullets.length > 0 && (
                    <ul className="list-disc pl-4 text-sm text-zinc-500/80 dark:text-zinc-400/80 flex flex-col gap-1.5 leading-relaxed mt-1">
                      {award.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

"use client"

import React from "react"
import { motion } from "motion/react"
import { training } from "@/data/career"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function FeaturedTraining() {
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

  // Show only featured trainings on the homepage (LKMM TM, LKMM TD, PKTI)
  const featuredTraining = training.filter((t) => t.featured)

  return (
    <section
      id="training"
      aria-labelledby="training-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1.5 px-3 bg-card/40 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Development
          </Badge>
          <h2 
            id="training-heading"
            className="text-3xl font-sans font-semibold tracking-tight text-foreground"
          >
            Featured Training
          </h2>
        </div>

        {/* Training Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredTraining.map((t) => (
            <motion.div key={t.id} variants={itemVariants}>
              <Card className="border border-border bg-card/40 rounded-2xl shadow-sm hover:border-border/80 transition-colors duration-150 h-full p-6 flex flex-col justify-between text-left gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
                    <span className="font-semibold uppercase">{t.role}</span>
                    <span>{t.period}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl font-medium text-foreground leading-tight">
                      {t.title}
                    </h3>
                  </div>

                  <p className="font-sans text-base text-muted-foreground font-normal leading-relaxed">
                    {t.summary}
                  </p>

                  {t.bullets && t.bullets.length > 0 && (
                    <ul className="list-disc pl-4 text-sm text-muted-foreground/80 flex flex-col gap-1.5 leading-relaxed mt-1">
                      {t.bullets.slice(0, 3).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Training Link */}
        <div className="mt-10 flex justify-center">
          <a
            href="/training"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-sans font-medium px-6 py-2 border-border text-foreground bg-card/40 hover:bg-muted transition-colors duration-150 flex items-center gap-2 cursor-pointer text-sm"
            )}
          >
            <span>View All Training</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-muted-foreground">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

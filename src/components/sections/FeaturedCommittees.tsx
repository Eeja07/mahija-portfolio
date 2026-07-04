"use client"

import React from "react"
import { motion } from "motion/react"
import { committees } from "@/data/career"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function FeaturedCommittees() {
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

  // Show the 3 specified committees on the homepage
  const featuredComms = committees.filter((comm) => comm.featured)

  return (
    <section
      id="committees"
      aria-labelledby="committees-heading"
      className="w-full py-20 bg-background border-t border-zinc-800"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-zinc-800 py-1.5 px-3 bg-zinc-950/40 text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Involvement
          </Badge>
          <h2 
            id="committees-heading"
            className="text-3xl font-sans font-semibold tracking-tight text-zinc-50"
          >
            Featured Committees
          </h2>
        </div>

        {/* Committees Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredComms.map((comm) => (
            <motion.div key={comm.id} variants={itemVariants}>
              <Card className="border border-zinc-800 bg-zinc-950/40 rounded-2xl shadow-sm hover:border-zinc-700 transition-colors duration-150 h-full p-6 flex flex-col justify-between text-left gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-zinc-400">
                    <span className="font-semibold uppercase">Committee</span>
                    <span>{comm.period}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl font-medium text-zinc-50 leading-tight">
                      {comm.role}
                    </h3>
                    <p className="font-sans text-sm text-zinc-400 mt-1">
                      {comm.title}
                    </p>
                  </div>

                  <p className="font-sans text-base text-zinc-400 font-normal leading-relaxed">
                    {comm.summary}
                  </p>

                  {comm.bullets && comm.bullets.length > 0 && (
                    <ul className="list-disc pl-4 text-sm text-zinc-500 flex flex-col gap-1.5 leading-relaxed mt-1">
                      {comm.bullets.slice(0, 3).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Committees Link */}
        <div className="mt-10 flex justify-center">
          <a
            href="/committees"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-sans font-medium px-6 py-2 border-zinc-800 text-zinc-200 bg-zinc-950/40 hover:bg-zinc-800 transition-colors duration-150 flex items-center gap-2 cursor-pointer text-sm"
            )}
          >
            <span>View All Committees</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-zinc-400">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

"use client"

import React from "react"
import { motion } from "motion/react"
import { getAwards } from "@/data/career"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Trophy } from "lucide-react"

export default function Awards() {
  const { language } = useLanguage()
  const t = translations[language].awards
  const awardList = getAwards(language)

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
        duration: 0.16,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section 
      id="awards" 
      aria-label="Honors & Awards"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <Badge 
              variant="outline" 
              className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
            >
              {t.badge}
            </Badge>
          </div>
          <h2 
            id="awards-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Awards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {awardList.map((award, i) => (
            <motion.div key={i} variants={itemVariants} className="h-full">
              <NetworkSubsystemNode
                status="healthy"
                className="h-full flex flex-col justify-between text-left gap-6 border-zinc-200/90 dark:border-zinc-800/90 p-6"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {award.competition}
                    </span>
                    <span>{award.period}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug flex items-start gap-2">
                      <Trophy className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-1" />
                      <span>{award.title}</span>
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {award.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 font-mono text-[10px] text-zinc-400">
                  <span>{language === "id" ? "Distingsi Terverifikasi" : "Distinction Verified"}</span>
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

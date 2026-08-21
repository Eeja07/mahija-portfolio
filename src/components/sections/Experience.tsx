"use client"

import React from "react"
import { motion } from "motion/react"
import { getExperiences } from "@/data/experience"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Briefcase } from "lucide-react"

export default function Experience() {
  const { language } = useLanguage()
  const t = translations[language].experience

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

  // Showcase only the 3 specified roles on the homepage
  const allExperiences = getExperiences(language)
  const allowedRoles = ["winnicode-garuda-intern", "lintasarta-intern", "robotics-extracurricular-instructor"]
  const snapshotExperiences = allowedRoles
    .map((roleId) => allExperiences.find((exp) => exp.id === roleId))
    .filter((exp): exp is NonNullable<typeof exp> => !!exp)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
            id="experience-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 3-Column Grid layout with NetworkSubsystemNodes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {snapshotExperiences.map((exp, idx) => (
            <motion.div key={exp.id} variants={itemVariants} className="h-full">
              <NetworkSubsystemNode
                status={idx === 0 ? "transmitting" : "healthy"}
                className="h-full flex flex-col justify-between text-left gap-6 p-6"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                    </span>
                    <span className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-[10px] bg-background">
                      {exp.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      <Briefcase className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span>{exp.company}</span>
                      <span className="text-zinc-400">&bull;</span>
                      <span className="font-normal text-zinc-500">{exp.location}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 select-none">
                  {exp.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Experience Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/experience"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-mono text-xs font-semibold px-6 py-2.5 border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-xs rounded-xl"
            )}
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="size-4 text-zinc-500 dark:text-zinc-400" />
          </a>
        </div>
      </div>
    </section>
  )
}

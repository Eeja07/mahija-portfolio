"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, FileCode, ShieldCheck } from "lucide-react"
import { resumeMetadata } from "@/data/resume"

export default function Resume() {
  const { language } = useLanguage()
  const t = translations[language].resume

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
      id="resume"
      aria-labelledby="resume-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left max-w-2xl">
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
            id="resume-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Compact Resume CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <NetworkSubsystemNode
              className="p-6 sm:p-8 text-left"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Left Side: Title & Status */}
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3.5 bg-background border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 shadow-xs" aria-hidden="true">
                    <FileCode className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground tracking-tight leading-tight flex items-center gap-2">
                      <span>{t.title}</span>
                      <ShieldCheck className="size-4 text-zinc-400 dark:text-zinc-500" />
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                      {t.description}
                    </p>
                  </div>
                </div>

                {/* Right Side: Direct download links */}
                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto shrink-0 select-none">
                  {/* English Resume */}
                  <a
                    href={resumeMetadata.english.file}
                    download={`Mahija_Resume_${resumeMetadata.english.language}.pdf`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "w-full sm:w-auto bg-foreground text-background hover:opacity-90 font-mono text-xs font-semibold justify-center px-4 py-2.5 flex items-center gap-2 cursor-pointer shadow-xs rounded-xl"
                    )}
                  >
                    <Download className="size-3.5" />
                    <span>{t.englishResume}</span>
                  </a>

                  {/* Resume Indonesia */}
                  <a
                    href={resumeMetadata.indonesian.file}
                    download={`Mahija_Resume_${resumeMetadata.indonesian.language}.pdf`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full sm:w-auto border-zinc-200 dark:border-zinc-800 text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs font-semibold justify-center px-4 py-2.5 flex items-center gap-2 cursor-pointer rounded-xl"
                    )}
                  >
                    <Download className="size-3.5" />
                    <span>{t.indonesianResume}</span>
                  </a>
                </div>

              </div>
            </NetworkSubsystemNode>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import React from "react"
import { motion } from "motion/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getCommittees } from "@/data/career"
import { Badge } from "@/components/ui/badge"
import { NetworkNode } from "@/components/network/NetworkNode"
import TopologyBackground from "@/components/network/TopologyBackground"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Award } from "lucide-react"

export default function CommitteesArchive() {
  const { language } = useLanguage()
  const t = translations[language].archives
  const commList = getCommittees(language)

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
    <div className="relative min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200 overflow-x-hidden">
      <TopologyBackground />
      <header className="w-full">
        <Navbar />
      </header>

      <main className="relative z-10 flex-1 w-full py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-3 mb-12 text-left max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-cyan-400 animate-led" />
              <Badge 
                variant="outline" 
                className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
              >
                {t.committeeBadge}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground">
              {t.committeeTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
              {t.committeeSub}
            </p>
          </div>

          {/* Grid list of all committees */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {commList.map((comm, idx) => (
              <motion.div key={comm.id} variants={itemVariants} className="h-full">
                <NetworkNode 
                  nodeId={`TASK // COMM-0${idx + 1}`}
                  nodeType="COMMITTEE"
                  className="p-6 sm:p-7 flex flex-col justify-between text-left gap-6 h-full"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                        {language === "id" ? "Kepanitiaan" : "Committee"}
                      </span>
                      <span>{comm.period}</span>
                    </div>

                    <div>
                      <h2 className="font-sans text-xl font-bold text-foreground tracking-tight leading-tight">
                        {comm.role}
                      </h2>
                      <p className="font-sans text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                        <Award className="size-3.5 text-zinc-400" />
                        {comm.title}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                      {comm.summary}
                    </p>

                    {comm.bullets && comm.bullets.length > 0 && (
                      <ul className="list-disc pl-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex flex-col gap-1.5 leading-relaxed mt-2">
                        {comm.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </NetworkNode>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

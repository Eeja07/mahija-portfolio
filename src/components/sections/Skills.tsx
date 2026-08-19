"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { skillGroups } from "@/data/skills"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Server, Database, Code, Eye, Network as NetIcon, Wrench, Layers } from "lucide-react"

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language].skills

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

  const filteredGroups = selectedCategory
    ? skillGroups.filter((g) => g.title === selectedCategory)
    : skillGroups

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "infrastructure & devops":
        return <Server className="size-4 text-blue-500 dark:text-cyan-400" />
      case "backend & apis":
        return <Database className="size-4 text-cyan-400" />
      case "frontend & mobile":
        return <Code className="size-4 text-emerald-500" />
      case "ai & computer vision":
        return <Eye className="size-4 text-purple-400" />
      case "iot & robotics":
        return <NetIcon className="size-4 text-amber-400" />
      case "tools & workflows":
        return <Wrench className="size-4 text-pink-400" />
      default:
        return <Layers className="size-4 text-blue-400" />
    }
  }

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full py-20 bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-400 animate-led" />
            <Badge 
              variant="outline" 
              className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
            >
              {t.badge}
            </Badge>
          </div>
          <h2 
            id="skills-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-8 select-none">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium border transition-all duration-150 cursor-pointer ${
              selectedCategory === null
                ? "bg-foreground text-background border-foreground shadow-xs"
                : "bg-zinc-100/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
            }`}
          >
            {t.all} ({skillGroups.length})
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.title}
              onClick={() => setSelectedCategory(group.title === selectedCategory ? null : group.title)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium border transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === group.title
                  ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-zinc-950 border-transparent shadow-xs"
                  : "bg-zinc-100/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
              }`}
            >
              {getCategoryIcon(group.title)}
              <span>{group.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGroups.map((group) => {
            const originalIndex = skillGroups.findIndex((g) => g.title === group.title)
            return (
              <motion.div key={group.title} variants={itemVariants} className="h-full">
                <NetworkSubsystemNode
                  nodeId={`MODULE // 0${originalIndex + 1}`}
                  subsystem="CAPABILITY"
                  className="h-full flex flex-col justify-between text-left gap-6 p-6"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                        {getCategoryIcon(group.title)}
                        <span>{group.title}</span>
                      </h3>
                      <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-semibold">
                        {group.items.length} units
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70">
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {group.items.map((tech) => (
                        <span 
                          key={tech} 
                          className="border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-background/90 transition-all duration-150 hover:border-blue-500/50 dark:hover:border-cyan-500/50 hover:scale-103"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </NetworkSubsystemNode>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="w-full max-w-7xl px-4 mt-16">
        <SpatialCableBranch direction="left-to-right" label={t.cableLabel} status="transmitting" />
      </div>
    </section>
  )
}

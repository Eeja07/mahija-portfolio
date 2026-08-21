"use client"

import React from "react"
import { motion } from "motion/react"
import { getRepositories } from "@/data/repositories"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, FolderGit2, ExternalLink } from "lucide-react"

export default function FeaturedRepositories() {
  const { language } = useLanguage()
  const t = translations[language].repositories

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

  const allRepos = getRepositories(language)
  const featuredRepos = allRepos.filter((r) => r.featured).slice(0, 4)

  return (
    <section
      id="repositories"
      aria-labelledby="repositories-heading"
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
            id="repositories-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Repositories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featuredRepos.map((repo) => (
            <motion.div key={repo.slug} variants={itemVariants} className="h-full">
              <a 
                href={`https://github.com/Eeja07/${repo.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <NetworkSubsystemNode
                  className="h-full flex flex-col justify-between text-left gap-5 p-6"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-2 text-foreground font-sans">
                        <FolderGit2 className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground transition-colors duration-150 shrink-0" />
                        <h3 className="text-lg font-bold text-foreground tracking-tight line-clamp-1 group-hover:text-foreground transition-colors duration-150">
                          {repo.name}
                        </h3>
                      </div>
                      <ExternalLink className="size-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 ml-2" />
                    </div>

                    <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between select-none">
                    <span className="border border-zinc-200 dark:border-zinc-800 px-2.5 py-0.5 rounded font-mono text-xs text-zinc-600 dark:text-zinc-400 bg-background/80">
                      {repo.language}
                    </span>
                    <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-foreground flex items-center gap-1">
                      <span>{t.fetchRepo}</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </NetworkSubsystemNode>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Repositories Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/repositories"
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

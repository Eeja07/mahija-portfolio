"use client"

import React, { useState, useMemo } from "react"
import { motion } from "motion/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getRepositories } from "@/data/repositories"
import { Badge } from "@/components/ui/badge"
import { NetworkNode } from "@/components/network/NetworkNode"
import TopologyBackground from "@/components/network/TopologyBackground"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { FolderGit2, Search, ExternalLink } from "lucide-react"

export default function RepositoriesArchive() {
  const [searchQuery, setSearchQuery] = useState("")
  const { language } = useLanguage()
  const t = translations[language].archives
  const tRepo = translations[language].repositories
  const repoList = getRepositories(language)

  const filteredRepos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return repoList

    return repoList.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) ||
        repo.language.toLowerCase().includes(query) ||
        repo.description.toLowerCase().includes(query)
    )
  }, [searchQuery, repoList])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
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
          <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-cyan-400" />
              <Badge 
                variant="outline" 
                className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
              >
                {t.repoBadge}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground">
              {t.repoTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
              {t.repoSub}
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="relative max-w-md mb-10">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/80 backdrop-blur-md font-mono text-xs text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-cyan-400/50 shadow-xs"
            />
          </div>

          {/* Grid list of all repositories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRepos.map((repo, idx) => (
              <motion.div key={repo.slug || repo.name} variants={itemVariants} className="h-full">
                <NetworkNode 
                  className="p-6 sm:p-7 flex flex-col justify-between text-left gap-6 h-full"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                        {repo.language}
                      </span>
                      {repo.featured && (
                        <span className="px-2 py-0.5 rounded border border-blue-500/30 text-[10px] text-blue-500 bg-blue-500/5">
                          {language === "id" ? "Unggulan" : "Featured"}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="font-mono text-sm sm:text-base font-bold text-foreground tracking-tight break-all flex items-start gap-2">
                        <FolderGit2 className="size-4 text-blue-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{repo.name}</span>
                      </h2>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 select-none mt-auto">
                    <a
                      href={`https://github.com/Eeja07/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-600 dark:text-cyan-400 hover:underline font-medium"
                    >
                      <span>{tRepo.fetchRepo}</span>
                      <ExternalLink className="size-3" />
                    </a>
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

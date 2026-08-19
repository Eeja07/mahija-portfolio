"use client"

import React, { useState, useMemo } from "react"
import { motion } from "motion/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { repositories } from "@/data/repositories"
import { Badge } from "@/components/ui/badge"
import { NetworkNode } from "@/components/network/NetworkNode"
import TopologyBackground from "@/components/network/TopologyBackground"
import { FolderGit2, Search, ExternalLink } from "lucide-react"

export default function RepositoriesArchive() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRepos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return repositories

    return repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) ||
        repo.language.toLowerCase().includes(query) ||
        repo.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

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
              <span className="size-2 rounded-full bg-cyan-400 animate-led" />
              <Badge 
                variant="outline" 
                className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
              >
                Complete Packet Catalog
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground">
              GitHub Repositories Archive
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
              Explore the complete catalog of 46 source repositories containing academic platforms, embedded modules, and utility configurations.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-10 max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by repository name, language, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 rounded-xl pl-10 pr-4 py-2.5 font-mono text-xs text-foreground placeholder-zinc-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors duration-150 shadow-xs"
              />
            </div>
            {searchQuery && (
              <p className="font-mono text-xs text-blue-500 dark:text-cyan-400 mt-2">
                Found {filteredRepos.length} matching {filteredRepos.length === 1 ? "repository" : "repositories"}
              </p>
            )}
          </div>

          {/* Grid list of all repositories */}
          {filteredRepos.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRepos.map((repo, idx) => (
                <motion.div key={repo.slug} variants={itemVariants} className="h-full">
                  <a 
                    href={`https://github.com/Eeja07/${repo.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full group"
                  >
                    <NetworkNode 
                      nodeId={`REPO // 0x${(idx + 1).toString(16).padStart(2, "0").toUpperCase()}`}
                      nodeType="GIT REPO"
                      className="p-6 sm:p-7 flex flex-col justify-between text-left gap-5 h-full"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center gap-2 text-foreground font-sans">
                            <FolderGit2 className="size-4 text-blue-500 dark:text-cyan-400 group-hover:text-foreground transition-colors duration-150 shrink-0" />
                            <h2 className="text-lg font-bold text-foreground tracking-tight line-clamp-1 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors duration-150">
                              {repo.name}
                            </h2>
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
                        <span className="font-mono text-xs text-blue-500 dark:text-cyan-400">
                          GitHub &rarr;
                        </span>
                      </div>
                    </NetworkNode>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/30">
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                No repositories match query &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

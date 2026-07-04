"use client"

import React from "react"
import { motion } from "motion/react"
import { repositories } from "@/data/repositories"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

export default function FeaturedRepositories() {
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

  const featuredRepos = repositories.filter((repo) => repo.featured).slice(0, 10)

  return (
    <section
      id="repositories"
      aria-labelledby="repositories-heading"
      className="w-full py-20 bg-background border-t border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-zinc-200 dark:border-zinc-800 py-1.5 px-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Codebase
          </Badge>
          <h2 
            id="repositories-heading"
            className="text-3xl font-sans font-semibold tracking-tight text-foreground"
          >
            Featured Repositories
          </h2>
        </div>

        {/* Repositories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featuredRepos.map((repo) => (
            <motion.div key={repo.slug} variants={itemVariants}>
              <a 
                href={`https://github.com/Eeja07/${repo.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <Card className="border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-sm hover:border-zinc-200/80 dark:hover:border-zinc-800/80 transition-colors duration-150 h-full p-6 flex flex-col justify-start text-left gap-4">
                  <div className="flex items-center justify-between font-mono text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2 text-foreground">
                      <FolderIcon className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground transition-colors duration-150" />
                      <h3 className="font-sans text-xl font-medium text-foreground leading-tight">
                        {repo.name}
                      </h3>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 font-mono"
                    >
                      {repo.language}
                    </Badge>
                  </div>

                  <p className="font-sans text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                    {repo.description}
                  </p>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Repositories Link */}
        <div className="mt-10 flex justify-center">
          <a
            href="/repositories"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-sans font-medium px-6 py-2 border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-150 flex items-center gap-2 cursor-pointer text-sm"
            )}
          >
            <span>View All Repositories (46)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-zinc-500 dark:text-zinc-400">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

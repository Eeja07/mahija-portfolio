"use client"

import React, { useState, useMemo } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { repositories } from "@/data/repositories"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const ForkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
    <line x1="6" x2="6" y1="9" y2="15" />
  </svg>
)

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 w-full py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
            <Badge 
              variant="outline" 
              className="w-fit border-border py-1.5 px-3 bg-card/40 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
            >
              Complete Codebase
            </Badge>
            <h1 className="text-3xl font-sans font-semibold tracking-tight text-foreground">
              GitHub Repositories Archive
            </h1>
            <p className="text-base text-muted-foreground font-sans font-normal leading-8">
              Explore the complete catalog of 46 source repositories containing academic platforms, embedded modules, and utility configurations.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-8 max-w-md">
            <input
              type="text"
              placeholder="Search by repository name, language, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-border bg-card/40 rounded-xl px-4 py-2.5 font-sans text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-muted-foreground/50 transition-colors duration-150"
            />
            {searchQuery && (
              <p className="font-mono text-xs text-muted-foreground mt-2">
                Found {filteredRepos.length} matching {filteredRepos.length === 1 ? "repository" : "repositories"}
              </p>
            )}
          </div>

          {/* Grid list of all repositories */}
          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo) => (
                <a 
                  key={repo.name} 
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <Card 
                    className="border border-border bg-card/40 rounded-2xl p-6 flex flex-col justify-between text-left gap-4 h-full group-hover:border-border/80 transition-colors duration-150"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 text-foreground">
                          <FolderIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors duration-150" />
                          <h2 className="font-sans text-xl font-medium text-foreground leading-tight">
                            {repo.name}
                          </h2>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="border border-border px-3 py-1 text-sm text-muted-foreground bg-card/40 font-mono"
                        >
                          {repo.language}
                        </Badge>
                      </div>

                      <p className="font-sans text-base text-muted-foreground font-normal leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-border text-sm text-muted-foreground font-mono select-none">
                      <div className="flex items-center gap-1.5">
                        <StarIcon className="size-4 text-muted-foreground" />
                        <span>{repo.stars} stars</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ForkIcon className="size-4 text-muted-foreground" />
                        <span>{repo.forks} forks</span>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-border bg-muted/10 rounded-2xl">
              <p className="font-sans text-muted-foreground text-sm">No repositories found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
)

export default function ProjectLibrary() {
  const [libraryFilter, setLibraryFilter] = useState<string>("All")
  const [academicExpanded, setAcademicExpanded] = useState<boolean>(false)

  const libraryProjects = projects.filter((p) => {
    if (p.featured) return false
    if (p.category === "Academic") return false
    if (libraryFilter === "All") return true
    return p.category === libraryFilter
  })

  const academicProjects = projects.filter((p) => p.category === "Academic")

  const categories = ["All", "Infrastructure", "Robotics", "AI", "Fullstack", "Systems", "Security", "IoT", "Edge AI"]

  return (
    <section
      id="project-library"
      aria-labelledby="library-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div className="max-w-3xl">
            <Badge 
              variant="outline" 
              className="w-fit border-border py-1.5 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none mb-3"
            >
              Project Archive
            </Badge>
            <h2 
              id="library-heading"
              className="text-3xl font-sans font-bold tracking-tight text-foreground md:text-4xl"
            >
              Project Library
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-sans mt-1 leading-relaxed md:leading-8">
              A structured catalogue of secondary modules, system utilities, and coursework.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-1 bg-muted/30 border border-border/50 rounded-xl p-1 select-none">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={libraryFilter === cat ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setLibraryFilter(cat)}
                className="font-mono text-sm cursor-pointer"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Library Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {libraryProjects.map((p) => (
            <Card key={p.id} className="border border-border bg-card/25 shadow-sm flex flex-col justify-between p-5">
              <CardHeader className="pb-3 text-left p-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-primary uppercase font-bold">{p.category}</span>
                  <span className="font-mono text-sm text-muted-foreground">{p.year}</span>
                </div>
                <CardTitle className="font-sans text-xl font-bold text-foreground mt-2">{p.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                  {p.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 pt-0 text-left p-0 mt-3">
                <div className="flex flex-wrap gap-1.5 select-none">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="secondary" className="px-3 py-1.5 font-mono text-sm text-muted-foreground bg-muted/40 border border-border/20">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t border-border/30 flex justify-between select-none p-0 mt-4">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-150"
                  >
                    <GithubIcon className="size-4" />
                    Repository
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-150"
                  >
                    <ExternalLinkIcon className="size-4" />
                    Deployment
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Academic Projects Collapsible Box */}
        {academicProjects.length > 0 && (
          <div className="border border-border/60 rounded-2xl overflow-hidden bg-card/10 select-none">
            <Button
              variant="ghost"
              onClick={() => setAcademicExpanded(!academicExpanded)}
              className="w-full flex items-center justify-between p-4 font-mono text-sm text-muted-foreground hover:text-foreground cursor-pointer hover:bg-muted/20"
            >
              <span>Academic & Coursework Repositories ({academicProjects.length})</span>
              <div className="flex items-center gap-1">
                <span>{academicExpanded ? "Collapse" : "Expand"}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn("size-3 transition-transform duration-150", academicExpanded && "rotate-180")}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </Button>

            <AnimatePresence initial={false}>
              {academicExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-border/40 bg-zinc-950/10">
                    {academicProjects.map((p) => (
                      <div key={p.id} className="border border-border/40 rounded-xl p-4 bg-card/20 flex flex-col justify-between gap-3 text-left">
                        <div>
                          <div className="flex items-center justify-between font-mono text-sm text-zinc-500">
                            <span>Coursework</span>
                            <span>{p.year}</span>
                          </div>
                          <h4 className="font-sans text-base font-bold text-foreground mt-1.5">{p.title}</h4>
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-1">{p.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.stack.map((s) => (
                            <span key={s} className="font-mono text-sm text-zinc-500 bg-muted/40 border border-border/20 px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mt-2 transition-colors duration-150 self-start"
                          >
                            <GithubIcon className="size-3.5" />
                            View assignment
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  )
}

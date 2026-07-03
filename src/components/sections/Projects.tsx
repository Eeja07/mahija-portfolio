"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Inline SVGs for actions
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

const CpuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
)

export default function Projects() {
  const [activeArchId, setActiveArchId] = useState<string | null>(null)

  const toggleArchitecture = (id: string) => {
    setActiveArchId(activeArchId === id ? null : id)
  }

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
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Engineering Portfolio
          </Badge>
          
          <h2 
            id="projects-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Featured Projects
          </h2>
          
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            A selection of edge processing systems, self-hosted network orchestrations, and full-stack platforms constructed to satisfy real-world performance parameters.
          </p>
        </div>

        {/* Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              className="flex"
            >
              <Card 
                className="w-full flex flex-col border border-border bg-card/40 shadow-sm transition-all duration-150 ease-in-out hover:scale-[1.02] hover:border-primary/50 hover:shadow-md"
              >
                {/* Category & Title */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground font-medium">
                      {project.year}
                    </span>
                  </div>
                  <CardTitle className="font-sans text-lg font-semibold text-foreground mt-1.5 leading-tight">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-4">
                  <Separator />

                  {/* High Impact Metrics */}
                  <div className="flex flex-col gap-2 bg-muted/20 border border-border/40 rounded-xl p-3 select-none">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-medium">
                      Key Outcomes
                    </span>
                    <ul className="text-xs font-mono text-foreground flex flex-col gap-1.5">
                      {project.metrics.slice(0, 2).map((metric, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-normal">
                          <span className="text-primary mt-0.5">&bull;</span>
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-medium">
                      Implementation Highlights
                    </span>
                    <ul className="text-xs text-muted-foreground list-disc list-outside pl-4 space-y-2 leading-relaxed">
                      {project.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.stack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="border border-border/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground bg-muted/40 select-none"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Interactive Architecture Flow Panel */}
                  <AnimatePresence initial={false}>
                    {activeArchId === project.id && (
                      <motion.div
                        id={`arch-panel-${project.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2 bg-muted/15 rounded-xl p-3 border border-border/40 select-none">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1">
                            <CpuIcon className="size-3 text-primary" />
                            System Pipeline
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[11px] text-foreground mt-1">
                            {project.architecture?.map((node, index) => (
                              <React.Fragment key={node}>
                                {index > 0 && <span className="text-muted-foreground/40 font-sans">&rarr;</span>}
                                <span className="border border-border/60 bg-background rounded px-2 py-0.5 shadow-sm text-foreground">
                                  {node}
                                </span>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>

                <CardFooter className="pt-3 border-t border-border/30 gap-2 select-none">
                  {/* Action Buttons */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "border-border text-xs hover:bg-muted font-medium"
                    )}
                  >
                    <GithubIcon className="size-3.5 mr-1.5" />
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "border-border text-xs hover:bg-muted font-medium"
                    )}
                  >
                    <ExternalLinkIcon className="size-3.5 mr-1.5" />
                    Demo
                  </a>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleArchitecture(project.id)}
                    aria-expanded={activeArchId === project.id}
                    aria-controls={`arch-panel-${project.id}`}
                    className="text-xs text-muted-foreground hover:text-foreground font-medium ml-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center gap-1.5"
                  >
                    <span>Architecture</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`size-3 transition-transform duration-100 ease-out ${
                        activeArchId === project.id ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

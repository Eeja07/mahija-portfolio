"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Image as ImageIcon } from "lucide-react"

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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
)

export default function FeaturedEngineering() {
  const [activeArchId, setActiveArchId] = useState<string | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const toggleArchitecture = (id: string) => {
    setActiveArchId(activeArchId === id ? null : id)
  }

  const featuredProjects = projects.filter((p) => p.featured)

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

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }))
  }

  // Authentic preview image configurations
  const getProjectImagePath = (id: string) => {
    if (id === "smart-cctv") return "/images/featured/cctv/inference.webp"
    if (id === "human-search-drone") return "/images/featured/drone/flight.webp"
    if (id === "homelab-infra") return "/images/featured/homelab/portainer.webp"
    return "/images/featured/untern/home.webp"
  }

  const getProjectFallbackLabel = (id: string) => {
    if (id === "smart-cctv") return "featured/cctv/inference.webp"
    if (id === "human-search-drone") return "featured/drone/flight.webp"
    if (id === "homelab-infra") return "featured/homelab/portainer.webp"
    return "featured/untern/home.webp"
  }

  return (
    <section
      id="featured-engineering"
      aria-labelledby="projects-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1.5 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Engineering Exhibition
          </Badge>
          
          <h2 
            id="projects-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground md:text-4xl"
          >
            Featured Engineering
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed md:leading-8">
            Highly optimized hardware platforms and systems built to operate under strict constraints and trade-offs.
          </p>
        </div>

        {/* Featured Projects Grid/List */}
        <div className="flex flex-col gap-12">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-border bg-card/20 rounded-2xl overflow-hidden p-6 lg:p-8"
            >
              {/* Left Side: Photo/Video Showcase or Fallback */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden select-none flex items-center justify-center">
                  {failedImages[project.id] ? (
                    <div className="flex flex-col items-center gap-2 p-4 text-center">
                      <ImageIcon className="size-5 text-zinc-600" />
                      <span className="font-mono text-xs text-zinc-400">[{getProjectFallbackLabel(project.id)}]</span>
                      <span className="font-sans text-[9px] text-zinc-600">Save your screenshot to /public/images/ to load this layout</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={getProjectImagePath(project.id)}
                        alt={project.title}
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover"
                      />
                      {project.mediaUrl && (
                        <video
                          src={project.mediaUrl}
                          className="absolute inset-0 size-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-200"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Key Metrics Dashboard */}
                <div className="grid grid-cols-2 gap-2.5">
                  {project.metrics.slice(0, 2).map((metric, i) => {
                    const parts = metric.split(" ");
                    const val = parts[0];
                    const desc = parts.slice(1).join(" ");
                    return (
                      <div key={i} className="border border-border/40 bg-muted/20 rounded-xl p-3 flex flex-col justify-center">
                        <span className="font-mono text-sm font-bold text-foreground leading-none">{val}</span>
                        <span className="font-sans text-[10px] text-muted-foreground mt-1 leading-normal">{desc}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Action Links */}
                <div className="flex gap-2.5 select-none mt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1 border-border text-sm hover:bg-muted font-medium cursor-pointer"
                      )}
                    >
                      <GithubIcon className="size-3.5 mr-1.5" />
                      Source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1 border-border text-sm hover:bg-muted font-medium cursor-pointer"
                      )}
                    >
                      <ExternalLinkIcon className="size-3.5 mr-1.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Right Side: Engineering Storytelling & Rationale */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground font-medium">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-bold text-foreground mt-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-base text-muted-foreground font-sans mt-1.5 leading-7">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-5 mt-4">
                    {project.problem && (
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">The Problem</span>
                        <p className="font-sans text-base text-foreground mt-0.5 leading-7">{project.problem}</p>
                      </div>
                    )}
                    {project.approach && (
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Approach & Implementation</span>
                        <p className="font-sans text-base text-foreground mt-0.5 leading-7">{project.approach}</p>
                      </div>
                    )}
                    {project.tradeoffs && (
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Trade-offs & Constraints</span>
                        <p className="font-sans text-base text-foreground mt-0.5 leading-7">{project.tradeoffs}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 select-none mb-3">
                    {project.stack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="border border-border/40 px-3 py-1.5 font-mono text-sm text-muted-foreground bg-muted/40"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Architecture Snapshot Toggle */}
                  {project.architecture && (
                    <div className="border-t border-border/40 pt-3 select-none">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleArchitecture(project.id)}
                        aria-expanded={activeArchId === project.id}
                        className="text-sm text-muted-foreground hover:text-foreground font-medium p-0 h-auto flex items-center gap-1.5 cursor-pointer"
                      >
                        <CpuIcon className="size-3.5 text-primary" />
                        <span>Architecture Snapshot</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn("size-3 transition-transform duration-150", activeArchId === project.id && "rotate-180")}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </Button>

                      <AnimatePresence initial={false}>
                        {activeArchId === project.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-sm text-foreground bg-muted/15 rounded-xl p-2.5 border border-border/40">
                              {project.architecture.map((node, index) => (
                                <React.Fragment key={node}>
                                  {index > 0 && <span className="text-muted-foreground/40 font-sans">&rarr;</span>}
                                  <span className="border border-border/60 bg-background rounded px-3 py-1.5 shadow-sm text-foreground">
                                    {node}
                                  </span>
                                </React.Fragment>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

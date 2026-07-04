"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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

const CpuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
)

export default function Projects() {
  const [activeArchId, setActiveArchId] = useState<string | null>(null)
  const [libraryFilter, setLibraryFilter] = useState<string>("All")
  const [academicExpanded, setAcademicExpanded] = useState<boolean>(false)

  const toggleArchitecture = (id: string) => {
    setActiveArchId(activeArchId === id ? null : id)
  }

  // Filter projects for the primary Featured Showcase
  const featuredProjects = projects.filter((p) => p.featured)

  // Filter projects for the Project Library (excluding academic which are in their own collapsed drawer)
  const libraryProjects = projects.filter((p) => {
    if (p.featured) return false
    if (p.category === "Academic") return false
    if (libraryFilter === "All") return true
    return p.category === libraryFilter
  })

  // Count and gather academic/coursework projects
  const academicProjects = projects.filter((p) => p.category === "Academic")

  const categories = ["All", "Infrastructure", "Robotics", "AI", "Fullstack", "Systems", "Security"]

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
    hidden: { opacity: 0, y: 8 },
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
      id="featured-engineering"
      aria-labelledby="projects-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Engineering Showcase
          </Badge>
          
          <h2 
            id="projects-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Featured Engineering
          </h2>
          
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Production-grade systems, hardware platforms, and custom infrastructure built to operate under strict constraints and trade-offs.
          </p>
        </div>

        {/* Featured Projects Grid/List */}
        <div className="flex flex-col gap-12 mb-24">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-border bg-card/20 rounded-2xl overflow-hidden p-6 lg:p-8"
            >
              {/* Left Side: Mock Media Terminal / Metrics */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Visual Placeholder mimicking video / terminal output */}
                <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between p-3 font-mono select-none">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-zinc-800" />
                      <span className="size-2.5 rounded-full bg-zinc-800" />
                      <span className="size-2.5 rounded-full bg-zinc-800" />
                    </div>
                    <span className="text-[10px] text-zinc-600 font-semibold">{project.id}_diagnostic.sh</span>
                  </div>

                  {/* Terminal Output */}
                  <div className="flex-1 py-4 flex flex-col justify-center gap-1 text-[10px] text-zinc-500 leading-normal">
                    <div><span className="text-zinc-600">$</span> ./run_diagnostics --verbose</div>
                    <div><span className="text-emerald-500">✔</span> Ingress node connectivity verified</div>
                    <div><span className="text-emerald-500">✔</span> Pipeline latency: <span className="text-foreground">{project.metrics[1]?.split(" ")[1] || "120ms"}</span></div>
                    <div><span className="text-emerald-500">✔</span> Target metric: <span className="text-foreground">{project.metrics[0]}</span></div>
                    <div className="text-[9px] text-zinc-600 mt-2 font-sans italic border-t border-zinc-900 pt-2">
                      [Autoplay stream simulation active in production environments]
                    </div>
                  </div>

                  {/* Video Overlay Tag */}
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
                </div>

                {/* Key Metrics Dashboard */}
                <div className="grid grid-cols-2 gap-2.5">
                  {project.metrics.map((metric, i) => {
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
                <div className="flex gap-2.5 select-none mt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1 border-border text-xs hover:bg-muted font-medium cursor-pointer"
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
                        "flex-1 border-border text-xs hover:bg-muted font-medium cursor-pointer"
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
                    <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground font-medium">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-bold text-foreground mt-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-muted-foreground font-sans mt-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-6">
                    {project.problem && (
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">The Problem</span>
                        <p className="font-sans text-xs text-foreground mt-0.5 leading-relaxed">{project.problem}</p>
                      </div>
                    )}
                    {project.approach && (
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">Approach & Implementation</span>
                        <p className="font-sans text-xs text-foreground mt-0.5 leading-relaxed">{project.approach}</p>
                      </div>
                    )}
                    {project.tradeoffs && (
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">Trade-offs & Constraints</span>
                        <p className="font-sans text-xs text-foreground mt-0.5 leading-relaxed">{project.tradeoffs}</p>
                      </div>
                    )}
                    {project.challenges && (
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">Key Challenges Overcome</span>
                        <p className="font-sans text-xs text-foreground mt-0.5 leading-relaxed">{project.challenges}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 select-none mb-4">
                    {project.stack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="border border-border/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground bg-muted/40"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Architecture Snapshot Toggle */}
                  {project.architecture && (
                    <div className="border-t border-border/50 pt-4 select-none">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleArchitecture(project.id)}
                        aria-expanded={activeArchId === project.id}
                        className="text-xs text-muted-foreground hover:text-foreground font-medium p-0 h-auto flex items-center gap-1.5 cursor-pointer"
                      >
                        <CpuIcon className="size-3.5 text-primary" />
                        <span>How It Works (Architecture Snapshot)</span>
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
                            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[10px] text-foreground bg-muted/15 rounded-xl p-3 border border-border/40">
                              {project.architecture.map((node, index) => (
                                <React.Fragment key={node}>
                                  {index > 0 && <span className="text-muted-foreground/40 font-sans">&rarr;</span>}
                                  <span className="border border-border/60 bg-background rounded px-2 py-0.5 shadow-sm text-foreground">
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

        {/* Project Library Section */}
        <div id="project-library" className="border-t border-border/80 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <Badge 
                variant="outline" 
                className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none mb-3"
              >
                Project Archive
              </Badge>
              <h2 className="text-2xl font-sans font-bold tracking-tight text-foreground">
                Project Library
              </h2>
              <p className="text-xs text-muted-foreground font-sans mt-1">
                A structured catalogue of secondary modules, system utilities, and full-stack utilities.
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
                  className="font-mono text-[10px] cursor-pointer"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Library Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {libraryProjects.map((p) => (
              <Card key={p.id} className="border border-border bg-card/25 shadow-sm flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-primary uppercase font-bold">{p.category}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                  </div>
                  <CardTitle className="font-sans text-sm font-bold text-foreground mt-2">{p.title}</CardTitle>
                  <CardDescription className="text-[11px] text-muted-foreground leading-relaxed mt-1 line-clamp-3">
                    {p.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="flex flex-wrap gap-1 select-none">
                    {p.stack.map((s) => (
                      <Badge key={s} variant="secondary" className="px-1.5 py-0 font-mono text-[9px] text-muted-foreground bg-muted/40 border border-border/20">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t border-border/30 flex justify-between select-none">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-150"
                    >
                      <GithubIcon className="size-3" />
                      Repository
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-150"
                    >
                      <ExternalLinkIcon className="size-3" />
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
                className="w-full flex items-center justify-between p-4 font-mono text-xs text-muted-foreground hover:text-foreground cursor-pointer hover:bg-muted/20"
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
                        <div key={p.id} className="border border-border/40 rounded-xl p-3 bg-card/20 flex flex-col justify-between gap-3 text-left">
                          <div>
                            <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500">
                              <span>Coursework</span>
                              <span>{p.year}</span>
                            </div>
                            <h4 className="font-sans text-xs font-bold text-foreground mt-1.5">{p.title}</h4>
                            <p className="font-sans text-[11px] text-muted-foreground leading-normal mt-1">{p.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {p.stack.map((s) => (
                              <span key={s} className="font-mono text-[8px] text-zinc-500 bg-muted/40 border border-border/20 px-1 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[9px] text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1 transition-colors duration-150 self-start"
                            >
                              <GithubIcon className="size-2.5" />
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

      </div>
    </section>
  )
}

"use client"

import React, { useState } from "react"
import NextImage from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { getProjects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { cn } from "@/lib/utils"
import { Image as ImageIcon, Cpu, ExternalLink, Activity, Maximize2 } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import MediaAttachmentButton from "@/components/ui/MediaAttachmentButton"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function FeaturedEngineering() {
  const [activeArchId, setActiveArchId] = useState<string | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const { language } = useLanguage()
  const t = translations[language].projects

  const toggleArchitecture = (id: string) => {
    setActiveArchId(activeArchId === id ? null : id)
  }

  // Filter precisely to the 3 featured engineering projects
  const allProjects = getProjects(language)
  const allowedProjectIds = ["smart-cctv", "human-search-drone", "job-tracker"]
  const featuredProjects = allowedProjectIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.18,
        ease: "easeOut" as const,
      },
    },
  }

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }))
  }

  const getProjectImagePath = (id: string) => {
    if (id === "smart-cctv") return "/images/featured/cctv/inference.webp"
    if (id === "human-search-drone") return "/images/featured/drone/flight.webp"
    if (id === "job-tracker") return "/images/featured/jobtracker/dashboard.webp"
    if (id === "homelab-infra") return "/images/featured/homelab/portainer.webp"
    return "/images/featured/untern/home.webp"
  }

  const getProjectFallbackLabel = (id: string) => {
    if (id === "smart-cctv") return "featured/cctv/inference.webp"
    if (id === "human-search-drone") return "featured/drone/flight.webp"
    if (id === "job-tracker") return "featured/jobtracker/dashboard.webp"
    if (id === "homelab-infra") return "featured/homelab/portainer.webp"
    return "featured/untern/home.webp"
  }

  return (
    <section 
      id="featured-engineering" 
      aria-label="Featured Works"
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
            id="projects-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Featured Projects Network Cluster */}
        <div className="flex flex-col gap-12">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={itemVariants}
            >
              <NetworkSubsystemNode
                className="p-3.5 sm:p-5 lg:p-7 border-zinc-200/90 dark:border-zinc-800/90"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Side: Media Showcase, Telemetry Metrics, Action Links */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Media Container with Laser Scan Border - Click to preview */}
                    <div 
                      onClick={() => {
                        if (project.mediaUrl) {
                          setPreviewItem({
                            type: "video",
                            url: project.mediaUrl,
                            title: `${project.title} - Video Demo`,
                            caption: project.description,
                          })
                        } else {
                          setPreviewItem({
                            type: "image",
                            url: getProjectImagePath(project.id),
                            title: project.title,
                            caption: project.description,
                          })
                        }
                      }}
                      className="relative aspect-video rounded-xl bg-background border border-zinc-200 dark:border-zinc-800 overflow-hidden select-none flex items-center justify-center group shadow-xs cursor-pointer"
                      title="Click to preview full media"
                    >
                      {failedImages[project.id] ? (
                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                          <ImageIcon className="size-6 text-zinc-400 dark:text-zinc-500" />
                          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">[{getProjectFallbackLabel(project.id)}]</span>
                          <span className="font-sans text-[11px] text-zinc-400">Node Snapshot</span>
                        </div>
                      ) : (
                        <>
                          <NextImage
                            src={getProjectImagePath(project.id)}
                            alt={project.title}
                            width={600}
                            height={338}
                            onError={() => handleImageError(project.id)}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                          />
                          {project.mediaUrl && (
                            <video
                              src={project.mediaUrl}
                              className="absolute inset-0 size-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          )}
                        </>
                      )}
                      
                      {/* Port LED pill overlay */}
                      <div className="absolute top-3 left-3 z-10 font-mono text-[9px] bg-background/90 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span>LIVE PREVIEW</span>
                      </div>

                      {/* Expand indicator on hover */}
                      <div className="absolute bottom-3 right-3 z-10 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="size-3.5" />
                      </div>
                    </div>

                    {/* Project Photo / Screenshot Placeholder */}
                    <MediaAttachmentButton
                      photoTitle={`${project.title} — Foto / Screenshot`}
                      photoCaption={project.description}
                      showCertificate={false}
                      contextTitle={project.category}
                      onSelectMedia={(selected) => setPreviewItem(selected)}
                      className="pt-1 border-none"
                    />

                    {/* Key Metrics Dashboard */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {project.metrics.slice(0, 2).map((metric, i) => {
                        const parts = metric.split(" ")
                        const val = parts[0]
                        const desc = parts.slice(1).join(" ")
                        return (
                          <div
                            key={i}
                            className="border border-zinc-200/90 dark:border-zinc-800/90 bg-background/80 dark:bg-zinc-900/60 rounded-xl p-3 flex flex-col justify-center shadow-xs"
                          >
                            <span className="font-mono text-xs font-bold text-foreground leading-none flex items-center gap-1.5">
                              <Activity className="size-3 text-zinc-500 dark:text-zinc-400" />
                              {val}
                            </span>
                            <span className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                              {desc}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-2.5 select-none pt-1">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "flex-1 border-zinc-200 dark:border-zinc-800 font-mono text-xs text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium cursor-pointer flex items-center justify-center gap-1.5 rounded-lg"
                          )}
                        >
                          <GithubIcon className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                          <span>{t.viewCode}</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "flex-1 border-zinc-200 dark:border-zinc-800 font-mono text-xs text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium cursor-pointer flex items-center justify-center gap-1.5 rounded-lg"
                          )}
                        >
                          <ExternalLink className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                          <span>{t.liveDemo}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Engineering Storytelling & Rationale */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-6 text-left">
                    <div className="flex flex-col gap-3.5">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="font-mono text-[11px] uppercase tracking-wider font-semibold border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300"
                        >
                          {project.category}
                        </Badge>
                        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="font-sans text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
                        {project.description}
                      </p>

                      {/* Problem, Tradeoffs, Outcome */}
                      <div className="flex flex-col gap-3.5 mt-2 pt-2 border-t border-zinc-200/70 dark:border-zinc-800/70">
                        {project.problem && (
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                              <span>&gt;</span> {t.theProblem}
                            </span>
                            <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                              {project.problem}
                            </p>
                          </div>
                        )}
                        {project.tradeoffs && (
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                              <span>&gt;</span> {t.tradeoffs}
                            </span>
                            <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                              {project.tradeoffs}
                            </p>
                          </div>
                        )}
                        {project.outcome && (
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                              <span>&gt;</span> {t.outcome}
                            </span>
                            <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                              {project.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stack & Architecture Snapshot */}
                    <div className="flex flex-col gap-4 pt-2">
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 select-none">
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="border border-zinc-200 dark:border-zinc-800 px-2.5 py-0.5 rounded font-mono text-xs text-zinc-600 dark:text-zinc-400 bg-background/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Architecture Drawer */}
                      {project.architecture && (
                        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 select-none">
                          <button
                            onClick={() => toggleArchitecture(project.id)}
                            aria-expanded={activeArchId === project.id}
                            className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-foreground font-medium p-0 h-auto flex items-center gap-2 cursor-pointer"
                          >
                            <Cpu className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                            <span>{activeArchId === project.id ? t.closeTopology : t.topology}</span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={cn(
                                "size-3 transition-transform duration-150 text-zinc-400",
                                activeArchId === project.id && "rotate-180"
                              )}
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>

                          <AnimatePresence initial={false}>
                            {activeArchId === project.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs sm:text-sm text-foreground bg-zinc-100/70 dark:bg-zinc-950/70 rounded-xl p-3.5 border border-zinc-200 dark:border-zinc-800">
                                  {project.architecture.map((node, index) => (
                                    <React.Fragment key={node}>
                                      {index > 0 && (
                                        <span className="text-zinc-400 dark:text-zinc-500 font-mono font-bold">
                                          &gt;&gt;
                                        </span>
                                      )}
                                      <span className="border border-zinc-200 dark:border-zinc-800 bg-background rounded-lg px-2.5 py-1 shadow-xs text-zinc-700 dark:text-zinc-300">
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
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Media & Document Preview Lightbox Modal */}
      <MediaPreviewModal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        item={previewItem}
      />
    </section>
  )
}

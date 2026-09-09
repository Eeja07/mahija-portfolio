"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { getProjects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { cn } from "@/lib/utils"
import { Cpu, ExternalLink } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function FeaturedEngineering() {
  const [activeArchId, setActiveArchId] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const { language } = useLanguage()
  const t = translations[language].projects

  const toggleArchitecture = (id: string) => {
    setActiveArchId(activeArchId === id ? null : id)
  }

  // Render all 11 engineering projects from the CV
  const allProjects = getProjects(language)
  const featuredProjects = allProjects

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

  return (
    <section 
      id="featured-engineering" 
      aria-label="Featured Works"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-center md:text-left items-center md:items-start max-w-3xl mx-auto md:mx-0">
          <h2 
            id="projects-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground text-center md:text-left"
          >
            {t.heading}
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
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
                  
                  {/* Left Side: Media Showcase & Action Links */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Direct Visual Preview Slot (Multi-photo slider enabled) */}
                    <CardMediaPreview
                      slides={[
                        {
                          type: "photo",
                          title: language === "en" ? `${project.title} — System Snapshot` : `${project.title} — Foto / Snapshot`,
                        },
                        {
                          type: "photo",
                          title: language === "en" ? `${project.title} — Architecture View` : `${project.title} — Tampilan Arsitektur`,
                        },
                      ]}
                      contextTitle={project.category}
                      onSelectMedia={(selected) => setPreviewItem(selected)}
                      className="border-none pt-0 mt-0"
                    />

                    {/* Action Links */}
                    <div className="flex gap-2.5 select-none pt-1">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-1 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 font-medium cursor-pointer flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 transition-all duration-150 active:scale-[0.98]"
                        >
                          <GithubIcon className="size-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground transition-colors" />
                          <span>{t.viewCode}</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-1 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 font-medium cursor-pointer flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 transition-all duration-150 active:scale-[0.98]"
                        >
                          <ExternalLink className="size-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
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

                      {/* Highlights / Activities from CV */}
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans list-disc list-outside ml-4">
                          {project.highlights.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
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

      {/* Animated Packet Stream Section Divider */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-12 sm:mt-16">
        <SpatialCableBranch direction="left-to-right" label={t.cableLabel} status="transmitting" />
      </div>
    </section>
  )
}

"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FileCode, ShieldCheck, FileText, ExternalLink, GraduationCap } from "lucide-react"
import { resumeMetadata } from "@/data/resume"
import { getAcademicCredentials } from "@/data/credentials"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"

export default function Resume() {
  const { language } = useLanguage()
  const t = translations[language].resume
  const credentials = getAcademicCredentials(language)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

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
        duration: 0.16,
        ease: "easeOut" as const,
      },
    },
  }

  const graduationCredential = credentials[0]

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left max-w-2xl">
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
            id="resume-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Resume and Credentials Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full max-w-4xl mx-auto flex flex-col gap-6"
        >
          {/* Main CV Download Card */}
          <motion.div variants={itemVariants}>
            <NetworkSubsystemNode
              className="p-6 sm:p-8 text-left"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Left Side: Title & Status */}
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3.5 bg-background border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 shadow-xs" aria-hidden="true">
                    <FileCode className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground tracking-tight leading-tight flex items-center gap-2">
                      <span>{t.title}</span>
                      <ShieldCheck className="size-4 text-zinc-400 dark:text-zinc-500" />
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                      {t.description}
                    </p>
                  </div>
                </div>

                {/* Right Side: Direct download links & Previews */}
                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto shrink-0 select-none">
                  {/* English Resume Preview / Download */}
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewItem({
                        type: "document",
                        url: resumeMetadata.english.href,
                        title: "Mahija Ibad Pradipta - English Resume",
                        caption: "ATS-Optimized English Resume",
                      })
                    }
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "w-full sm:w-auto bg-foreground text-background hover:opacity-90 font-mono text-xs font-semibold justify-center px-4 py-2.5 flex items-center gap-2 cursor-pointer shadow-xs rounded-xl"
                    )}
                  >
                    <ExternalLink className="size-3.5" />
                    <span>{t.englishResume}</span>
                  </button>

                  {/* Resume Indonesia */}
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewItem({
                        type: "document",
                        url: resumeMetadata.indonesian.href,
                        title: "Mahija Ibad Pradipta - Resume Indonesia",
                        caption: "Resume Bahasa Indonesia ATS-Friendly",
                      })
                    }
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full sm:w-auto border-zinc-200 dark:border-zinc-800 text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs font-semibold justify-center px-4 py-2.5 flex items-center gap-2 cursor-pointer rounded-xl"
                    )}
                  >
                    <ExternalLink className="size-3.5" />
                    <span>{t.indonesianResume}</span>
                  </button>
                </div>

              </div>
            </NetworkSubsystemNode>
          </motion.div>

          {/* Academic Graduation Statement Section (Single Clean Placeholder) */}
          {graduationCredential && (
            <motion.div variants={itemVariants}>
              <NetworkSubsystemNode className="p-6 sm:p-7 text-left border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <GraduationCap className="size-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                    {language === "id" ? "Surat Keterangan Kelulusan" : "Official Graduation Degree Statement"}
                  </h3>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/80 flex flex-col justify-between gap-3 shadow-2xs">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                      <span className="uppercase text-emerald-600 dark:text-emerald-400 font-semibold">{graduationCredential.category}</span>
                      <span>{graduationCredential.date}</span>
                    </div>
                    <h4 className="font-sans text-sm font-bold text-foreground leading-snug flex items-center gap-1.5">
                      <FileText className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <span>{graduationCredential.title}</span>
                    </h4>
                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {graduationCredential.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewItem({
                          type: "placeholder",
                          category: "document",
                          isPlaceholder: true,
                          title: graduationCredential.title,
                          caption: `${graduationCredential.issuer} • ${graduationCredential.date}`,
                          contextTitle: graduationCredential.category,
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 font-mono text-xs font-semibold text-foreground transition-colors cursor-pointer"
                    >
                      <ExternalLink className="size-3 text-zinc-500 dark:text-zinc-400" />
                      <span>{language === "id" ? "Pratinjau Surat Keterangan Lulus" : "Preview Graduation Statement"}</span>
                    </button>
                  </div>
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          )}
        </motion.div>
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

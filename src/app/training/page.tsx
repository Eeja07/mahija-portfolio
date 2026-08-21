"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getTraining } from "@/data/career"
import { getAcademicCredentials } from "@/data/credentials"
import { Badge } from "@/components/ui/badge"
import { NetworkNode } from "@/components/network/NetworkNode"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import TopologyBackground from "@/components/network/TopologyBackground"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { GraduationCap, Award, FileText, ExternalLink, ShieldCheck } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import MediaAttachmentButton from "@/components/ui/MediaAttachmentButton"

export default function TrainingArchive() {
  const { language } = useLanguage()
  const t = translations[language].archives
  const trainingList = getTraining(language)
  const credentials = getAcademicCredentials(language)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

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
    <div className="relative min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200 overflow-x-hidden">
      <TopologyBackground />
      <header className="w-full">
        <Navbar />
      </header>

      <main className="relative z-10 flex-1 w-full py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-3 mb-12 text-left max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <Badge 
                variant="outline" 
                className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
              >
                {t.trainingBadge}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground">
              {t.trainingTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
              {t.trainingSub}
            </p>
          </div>

          {/* Academic Graduation Statement Section (Single Clean Placeholder) */}
          {graduationCredential && (
            <div className="mb-14 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
                  {language === "id" ? "Surat Keterangan Kelulusan" : "Official Graduation Degree Statement"}
                </h2>
              </div>

              <NetworkSubsystemNode
                className="p-6 flex flex-col justify-between gap-4 text-left border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 rounded-2xl"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-background font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {graduationCredential.category}
                    </span>
                    <span>{graduationCredential.date}</span>
                  </div>

                  <h3 className="font-sans text-base font-bold text-foreground tracking-tight leading-snug flex items-center gap-2">
                    <FileText className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                    <span>{graduationCredential.title}</span>
                  </h3>

                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {graduationCredential.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 select-none">
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
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-foreground font-mono text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    <ExternalLink className="size-3.5 shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <span>{language === "id" ? "Pratinjau Surat Keterangan Lulus" : "Preview Graduation Statement"}</span>
                  </button>
                </div>
              </NetworkSubsystemNode>
            </div>
          )}

          {/* Section Divider / Title for Courses & Trainings */}
          <div className="flex items-center gap-2 mb-6">
            <Award className="size-4 text-blue-500" />
            <h2 className="font-sans text-xl font-bold tracking-tight text-foreground">
              {language === "id" ? "Pelatihan & Sertifikasi Kemahasiswaan" : "Certified Training & Leadership Programs"}
            </h2>
          </div>

          {/* Grid list of all training */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trainingList.map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="h-full">
                <NetworkNode 
                  className="p-6 sm:p-7 flex flex-col justify-between text-left gap-6 h-full"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{item.role}</span>
                      <span>{item.period}</span>
                    </div>

                    <div>
                      <h2 className="font-sans text-xl font-bold text-foreground tracking-tight leading-tight flex items-center gap-2">
                        <GraduationCap className="size-4 text-zinc-400 shrink-0" />
                        <span>{item.title}</span>
                      </h2>
                    </div>

                    <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                      {item.summary}
                    </p>

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc pl-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex flex-col gap-1.5 leading-relaxed mt-2">
                        {item.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Exactly 2 Placeholders: Foto & Sertifikat/Surat Keterangan */}
                  <MediaAttachmentButton
                    photoTitle={item.photoPlaceholder?.title || `${item.role} — Foto Pelatihan`}
                    photoCaption={item.photoPlaceholder?.caption}
                    certificateTitle={item.certificatePlaceholder?.title || `${item.role} — Sertifikat Kelulusan`}
                    certificateCaption={item.certificatePlaceholder?.caption}
                    contextTitle={`${item.title} • ${item.period}`}
                    onSelectMedia={(selected) => setPreviewItem(selected)}
                  />
                </NetworkNode>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </main>

      <Footer />

      {/* Interactive Media & Document Preview Lightbox Modal */}
      <MediaPreviewModal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        item={previewItem}
      />
    </div>
  )
}

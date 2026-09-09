"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getCommittees } from "@/data/career"
import { NetworkNode } from "@/components/network/NetworkNode"
import TopologyBackground from "@/components/network/TopologyBackground"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Award } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import MediaAttachmentButton from "@/components/ui/MediaAttachmentButton"

export default function CommitteesArchive() {
  const { language } = useLanguage()
  const t = translations[language].archives
  const commList = getCommittees(language)
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

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200 overflow-x-hidden">
      <TopologyBackground />
      <header className="w-full">
        <Navbar />
      </header>

      <main className="relative z-10 flex-1 w-full py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-3 mb-12 text-center md:text-left items-center md:items-start max-w-3xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-foreground text-center md:text-left">
              {t.committeeTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
              {t.committeeSub}
            </p>
          </div>

          {/* Grid list of all committees */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {commList.map((comm) => (
              <motion.div key={comm.id} variants={itemVariants} className="h-full">
                <NetworkNode 
                  className="p-6 sm:p-7 flex flex-col justify-between text-left gap-6 h-full"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                        {language === "id" ? "Kepanitiaan" : "Committee"}
                      </span>
                      <span>{comm.period}</span>
                    </div>

                    <div>
                      <h2 className="font-sans text-xl font-bold text-foreground tracking-tight leading-tight">
                        {comm.role}
                      </h2>
                      <p className="font-sans text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                        <Award className="size-3.5 text-zinc-400" />
                        {comm.title}
                      </p>
                    </div>

                    {/* Activities from CV */}
                    {comm.bullets && comm.bullets.length > 0 && (
                      <ul className="space-y-1.5 pt-2 text-xs text-zinc-600 dark:text-zinc-400 font-sans list-disc list-outside ml-4">
                        {comm.bullets.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Exactly 2 Placeholders: Foto & Sertifikat/Surat Keterangan */}
                  <MediaAttachmentButton
                    photoTitle={comm.photoPlaceholder?.title || (language === "en" ? `${comm.role} — Event Photo` : `${comm.role} — Foto Kegiatan`)}
                    photoCaption={comm.photoPlaceholder?.caption}
                    certificateTitle={comm.certificatePlaceholder?.title || (language === "en" ? `${comm.role} — Committee Certificate` : `${comm.role} — Sertifikat Kepanitiaan`)}
                    certificateCaption={comm.certificatePlaceholder?.caption}
                    contextTitle={`${comm.title} • ${comm.period}`}
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

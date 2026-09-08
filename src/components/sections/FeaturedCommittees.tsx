"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getCommittees } from "@/data/career"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { ArrowRight, Calendar } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function FeaturedCommittees() {
  const { language } = useLanguage()
  const t = translations[language].committees
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const allComms = getCommittees(language)

  const getCommSlides = (comm: (typeof allComms)[0]) => {
    return [
      {
        type: "photo" as const,
        title: comm.photoPlaceholder?.title || `${comm.role} — Foto Kegiatan`,
        caption: comm.photoPlaceholder?.caption || "Dokumentasi kegiatan dan pelaksanaan acara.",
      },
      {
        type: "certificate" as const,
        title: comm.certificatePlaceholder?.title || `${comm.role} — Sertifikat Panitia`,
        caption: comm.certificatePlaceholder?.caption || "Sertifikat resmi pengakuan kontribusi kepanitiaan.",
      },
    ]
  }

  return (
    <section
      id="committees"
      aria-labelledby="committees-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-center md:text-left items-center md:items-start max-w-3xl mx-auto md:mx-0">
          <h2 
            id="committees-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground text-center md:text-left"
          >
            {t.heading}
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
            {t.subheading}
          </p>
        </div>

        {/* Horizontal Slider: Exactly 3 cards visible on desktop */}
        <SectionCardSlider>
          {allComms.map((comm) => (
            <motion.div
              key={comm.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.16 }}
              className="flex-1 w-full flex flex-col self-stretch h-full"
            >
              <NetworkSubsystemNode
                className="flex-1 w-full flex flex-col justify-between text-left gap-4 sm:gap-5 p-5 sm:p-6 h-[400px] sm:h-[410px] self-stretch"
              >
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {comm.period}
                    </span>
                  </div>

                  <div className="min-h-[3.25rem] flex flex-col justify-start">
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug line-clamp-2">
                      {comm.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      <Calendar className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <span className="line-clamp-1">{comm.title}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Visual Preview Slot (Multi-photo slider enabled) */}
                <CardMediaPreview
                  slides={getCommSlides(comm)}
                  contextTitle={`${comm.title} • ${comm.period}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>

        {/* View All Committees Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/committees"
            className="group inline-flex items-center gap-2.5 font-mono text-xs font-semibold px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-foreground group-hover:scale-125 transition-all" />
            <span>{t.viewAll}</span>
            <ArrowRight className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </a>
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

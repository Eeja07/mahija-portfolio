"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getAwards } from "@/data/career"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Trophy, ExternalLink } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function Awards() {
  const { language } = useLanguage()
  const t = translations[language].awards
  const awardList = getAwards(language)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const getAwardSlides = (award: (typeof awardList)[0]) => {
    if (award.title.toLowerCase().includes("sauvc") || award.competition.toLowerCase().includes("sauvc")) {
      return [
        {
          type: "photo" as const,
          title: "Uji Kolam Robot AUV di SAUVC Singapura",
          caption: "Dokumentasi peluncuran dan pengujian manuver robot bawah air di arena kompetisi Singapura.",
          image: "/images/activities/robot-assembly-1.png",
        },
        {
          type: "photo" as const,
          title: "Sesi Presentasi Teknis & Tim Banyubramanta",
          caption: "Pemaparan sistem kendali otonom dan arsitektur penglihatan komputer pada dewan juri internasional.",
          image: "/images/activities/robot-assembly-2.png",
        },
        {
          type: "certificate" as const,
          title: award.certificatePlaceholder?.title || "Sertifikat 5th Place SAUVC 2025",
          caption: award.certificatePlaceholder?.caption || "Sertifikat penghargaan resmi Singapore Autonomous Underwater Vehicle Challenge 2025.",
        },
      ]
    }
    if (award.title.toLowerCase().includes("nasional") || award.competition.toLowerCase().includes("nasional")) {
      return [
        {
          type: "photo" as const,
          title: "Podium Juara 1 Nasional KRI 2024",
          caption: "Penganugerahan Juara 1 Kontes Robot Indonesia Tingkat Nasional Kategori Bawah Air.",
          image: "/images/activities/robot-assembly-1.png",
        },
        {
          type: "photo" as const,
          title: "Uji Misi Lapangan Robot Bawah Air",
          caption: "Eksekusi misi otonom identifikasi target dan navigasi bawah air di kolam kompetisi nasional.",
          image: "/images/activities/robot-assembly-2.png",
        },
        {
          type: "certificate" as const,
          title: award.certificatePlaceholder?.title || "Sertifikat Juara 1 Nasional KRI",
          caption: award.certificatePlaceholder?.caption || "Sertifikat penghargaan resmi dari Balai Pengembangan Talenta Indonesia (BPTI / Kemendikbudristek).",
        },
      ]
    }
    return [
      {
        type: "photo" as const,
        title: award.photoPlaceholder?.title || `${award.title} — Foto Lomba`,
        caption: award.photoPlaceholder?.caption || "Dokumentasi sesi pengujian wahana dan kejuaraan kompetisi.",
        image: "/images/activities/robot-assembly-2.png",
      },
      {
        type: "photo" as const,
        title: `${award.title} — Dokumentasi Tim`,
        caption: "Dokumentasi persiapan teknis tim dan kalibrasi sensor sebelum pertandingan.",
      },
      {
        type: "certificate" as const,
        title: award.certificatePlaceholder?.title || `${award.title} — Sertifikat Juara`,
        caption: award.certificatePlaceholder?.caption || "Sertifikat resmi penghargaan juara kejuaraan robotika.",
      },
    ]
  }

  return (
    <section 
      id="awards" 
      aria-label="Honors & Awards"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-center md:text-left items-center md:items-start max-w-3xl mx-auto md:mx-0">
          <h2 
            id="awards-heading"
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
          {awardList.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.16 }}
              className="flex-1 w-full flex flex-col self-stretch h-full"
            >
              <NetworkSubsystemNode
                status="healthy"
                className="flex-1 w-full flex flex-col justify-between text-left gap-4 sm:gap-5 p-5 sm:p-6 h-[570px] sm:h-[580px] max-h-[570px] sm:max-h-[580px] overflow-hidden self-stretch"
              >
                <div className="flex-1 flex flex-col gap-3 min-h-0">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400 h-5 shrink-0">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 truncate">
                      {award.competition}
                    </span>
                    <span className="shrink-0">{award.period}</span>
                  </div>

                  <div className="min-h-[3.25rem] max-h-[3.25rem] flex flex-col justify-start overflow-hidden">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug flex items-start gap-2 line-clamp-2">
                      <Trophy className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-1" />
                      <span>{award.title}</span>
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 min-h-[2.5rem] max-h-[2.5rem] overflow-hidden">
                    {award.summary}
                  </p>

                  {award.bullets && (
                    <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 flex flex-col gap-1 leading-relaxed mt-1 min-h-[2.5rem] max-h-[2.5rem] overflow-hidden">
                      {award.bullets.slice(0, 2).map((bullet, idx) => (
                        <li key={idx} className="line-clamp-1">{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Instagram Post Link if provided */}
                  <div className="min-h-[1.75rem] max-h-[1.75rem] flex items-center">
                    {award.instagramUrl ? (
                      <a
                        href={award.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 text-foreground font-mono text-[11px] font-medium transition-all duration-150 cursor-pointer w-fit shadow-2xs group"
                      >
                        <span>Dokumentasi Instagram</span>
                        <ExternalLink className="size-3 text-zinc-500 group-hover:text-foreground group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Direct Visual Preview Slot (Multi-photo slider enabled) */}
                <CardMediaPreview
                  slides={getAwardSlides(award)}
                  contextTitle={`${award.competition} • ${award.period}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>
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

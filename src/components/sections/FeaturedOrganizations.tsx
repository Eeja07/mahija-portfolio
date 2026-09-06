"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getOrganizations } from "@/data/career"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { ArrowRight, Users } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function FeaturedOrganizations() {
  const { language } = useLanguage()
  const t = translations[language].organizations
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const allOrgs = getOrganizations(language)

  const getOrgSlides = (org: (typeof allOrgs)[0]) => {
    if (org.id.includes("banyubramanta")) {
      return [
        {
          type: "photo" as const,
          title: "Tim Robotika Banyubramanta ITS",
          caption: "Dokumentasi perakitan dan pengujian wahana robot bawah air (AUV) bersama divisi teknis.",
          image: "/images/activities/robot-assembly-1.png",
        },
        {
          type: "photo" as const,
          title: "Uji Kolam & Navigasi Banyubramanta",
          caption: "Pengujian sensor kedalaman, manuver otonom, dan kestabilan wahana robot.",
          image: "/images/activities/robot-assembly-2.png",
        },
        {
          type: "certificate" as const,
          title: org.certificatePlaceholder?.title || "Sertifikat Anggota / Pengurus Banyubramanta",
          caption: org.certificatePlaceholder?.caption || "Sertifikat resmi pengabdian dari Tim Robotika Banyubramanta ITS.",
        },
      ]
    }
    if (org.id.includes("m-iot")) {
      return [
        {
          type: "photo" as const,
          title: "Laboratorium M-IOT FTEIC ITS",
          caption: "Fasilitas pengembangan sistem tertanam, IoT, dan riset komputasi bergerak.",
          image: "/images/activities/iot-dashboard-screenshot.png",
        },
        {
          type: "photo" as const,
          title: "Rapat Kerja & Koordinasi Lab M-IOT",
          caption: "Dokumentasi evaluasi lini masa proyek riset dan pengembangan asisten laboratorium.",
        },
        {
          type: "certificate" as const,
          title: org.certificatePlaceholder?.title || "SK Koordinator / Asisten Lab M-IOT",
          caption: org.certificatePlaceholder?.caption || "Surat keputusan resmi penugasan pimpinan laboratorium dari pimpinan departemen.",
        },
      ]
    }
    return [
      {
        type: "photo" as const,
        title: org.photoPlaceholder?.title || `${org.role} — Foto Forum & Rapat`,
        caption: org.photoPlaceholder?.caption || "Dokumentasi pelaksanaan rapat kerja, forum musyawarah, atau kegiatan divisi.",
      },
      {
        type: "photo" as const,
        title: `${org.role} — Kegiatan Lapangan & Evaluasi`,
        caption: "Dokumentasi pelaksanaan program kerja dan sesi monitoring anggota.",
      },
      {
        type: "certificate" as const,
        title: org.certificatePlaceholder?.title || `${org.role} — SK Kepengurusan`,
        caption: org.certificatePlaceholder?.caption || "Surat keputusan resmi kepengurusan organisasi mahasiswa.",
      },
    ]
  }

  return (
    <section 
      id="organizations" 
      aria-label="Organizational Experience"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
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
            id="organizations-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Horizontal Slider: Exactly 3 cards visible on desktop */}
        <SectionCardSlider>
          {allOrgs.map((org) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.16 }}
              className="h-full flex flex-col"
            >
              <NetworkSubsystemNode
                className="h-full flex flex-col justify-between text-left gap-5 p-5 sm:p-6"
              >
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {org.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug line-clamp-2">
                      {org.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      <Users className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <span className="line-clamp-1">{org.title}</span>
                    </div>
                  </div>

                  {org.bullets && (
                    <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 flex flex-col gap-1 leading-relaxed mt-1 line-clamp-3">
                      {org.bullets.slice(0, 2).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Direct Visual Preview Slot (Multi-photo slider enabled) */}
                <CardMediaPreview
                  slides={getOrgSlides(org)}
                  contextTitle={`${org.title} • ${org.period}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>

        {/* View All Organizations Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/organizations"
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
    </section>
  )
}

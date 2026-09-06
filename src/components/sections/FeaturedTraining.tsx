"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getTraining } from "@/data/career"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { ArrowRight } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function FeaturedTraining() {
  const { language } = useLanguage()
  const t = translations[language].training
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const allTraining = getTraining(language)

  const getTrainingSlides = (tr: (typeof allTraining)[0]) => {
    if (tr.id === "mtcna-training") {
      return [
        {
          type: "photo" as const,
          title: "Praktik Konfigurasi RouterOS MikroTik",
          caption: "Dokumentasi konfigurasi static/dynamic routing, QoS bandwidth management, dan firewall filter.",
          image: "/images/activities/iot-dashboard-screenshot.png",
        },
        {
          type: "photo" as const,
          title: "Hands-on Lab Jaringan MikroTik",
          caption: "Simulasi implementasi bridging, wireless security, dan secure VPN tunneling (PPTP/SSTP).",
        },
        {
          type: "certificate" as const,
          title: tr.certificatePlaceholder?.title || "Sertifikat Pelatihan MTCNA",
          caption: tr.certificatePlaceholder?.caption || "Sertifikat resmi kelulusan pelatihan MTCNA dari ID-Networkers.",
        },
      ]
    }
    if (tr.id === "ccna-training") {
      return [
        {
          type: "photo" as const,
          title: "Topologi Jaringan Enterprise Cisco",
          caption: "Konfigurasi switch dan router enterprise mencakup VLAN, 802.1Q trunking, dan inter-VLAN routing.",
          image: "/images/evidence/tunnel.webp",
        },
        {
          type: "photo" as const,
          title: "Hands-on Lab OSPF & Network Security",
          caption: "Penerapan protokol dynamic routing OSPFv2, NAT/PAT, ACL, dan Spanning Tree Protocol (STP).",
        },
        {
          type: "certificate" as const,
          title: tr.certificatePlaceholder?.title || "Sertifikat Pelatihan CCNA",
          caption: tr.certificatePlaceholder?.caption || "Sertifikat resmi kelulusan pelatihan CCNA dari ID-Networkers.",
        },
      ]
    }
    return [
      {
        type: "photo" as const,
        title: tr.photoPlaceholder?.title || `${tr.role} — Foto Pelatihan`,
        caption: tr.photoPlaceholder?.caption || "Dokumentasi pelaksanaan modul pelatihan dan studi kasus manajemen.",
      },
      {
        type: "photo" as const,
        title: `${tr.role} — Sesi Praktik & Diskusi`,
        caption: "Dokumentasi sesi pemecahan masalah teknis dan perumusan strategi kebijakan.",
      },
      {
        type: "certificate" as const,
        title: tr.certificatePlaceholder?.title || `${tr.role} — Sertifikat Kelulusan`,
        caption: tr.certificatePlaceholder?.caption || "Sertifikat resmi kelulusan program pelatihan terverifikasi.",
      },
    ]
  }

  return (
    <section
      id="training"
      aria-labelledby="training-heading"
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
            id="training-heading"
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
          {allTraining.map((tr) => (
            <motion.div
              key={tr.id}
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
                      {tr.role}
                    </span>
                    <span>{tr.period}</span>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug line-clamp-2">
                      {tr.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {tr.summary}
                  </p>

                  {tr.bullets && (
                    <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 flex flex-col gap-1 leading-relaxed mt-1 line-clamp-2">
                      {tr.bullets.slice(0, 2).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Direct Visual Preview Slot (Multi-photo slider enabled) */}
                <CardMediaPreview
                  slides={getTrainingSlides(tr)}
                  contextTitle={`${tr.title} • ${tr.period}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>

        {/* View All Training Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/training"
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

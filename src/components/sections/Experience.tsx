"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getExperiences } from "@/data/experience"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { ArrowRight, Briefcase } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function Experience() {
  const { language } = useLanguage()
  const t = translations[language].experience
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const allExperiences = getExperiences(language)

  const getExperienceSlides = (exp: (typeof allExperiences)[0]) => {
    if (exp.id === "robotics-extracurricular-instructor") {
      return [
        {
          type: "photo" as const,
          title: "Perakitan Robot & Pembelajaran Modul",
          caption: "Dokumentasi perakitan modul 4-Wheel Obstacle Avoidance Robot bersama siswa.",
          image: "/images/activities/robot-assembly-1.png",
        },
        {
          type: "photo" as const,
          title: "Uji Coba Navigasi Robot Lapangan",
          caption: "Pengujian sensor ultrasonik dan manuver halangan robot di arena praktik.",
          image: "/images/activities/robot-assembly-2.png",
        },
        {
          type: "certificate" as const,
          title: exp.certificatePlaceholder?.title || "Sertifikat Pengajar Robotika",
          caption: exp.certificatePlaceholder?.caption || "Sertifikat resmi pengajar ekstrakurikuler robotika.",
        },
      ]
    }
    if (exp.id === "winnicode-garuda-intern") {
      return [
        {
          type: "photo" as const,
          title: "UNTERN Web Application Dashboard",
          caption: "Antarmuka platform penghubung pencari magang dengan perusahaan mitra.",
          image: "/images/featured/untern/home.webp",
        },
        {
          type: "photo" as const,
          title: "Workflow & Recruitment Pipeline",
          caption: "Alur verifikasi pelamar kerja dan manajemen rekrutmen magang.",
          image: "/images/featured/untern/workflow.webp",
        },
        {
          type: "photo" as const,
          title: "Analytics & Monitoring Panel",
          caption: "Panel analitik interaksi pengguna dan status aplikasi magang.",
          image: "/images/featured/untern/analytics.webp",
        },
        {
          type: "certificate" as const,
          title: exp.certificatePlaceholder?.title || "Surat Keterangan Magang Winnicode",
          caption: exp.certificatePlaceholder?.caption || "Surat keterangan resmi magang Full-Stack Developer PT Winnicode Garuda Indonesia.",
        },
      ]
    }
    if (exp.id === "lintasarta-intern") {
      return [
        {
          type: "photo" as const,
          title: "Infrastruktur Jaringan & Server Gateway",
          caption: "Dokumentasi konfigurasi gateway jaringan dan tunnel komunikasi aman.",
          image: "/images/evidence/tunnel.webp",
        },
        {
          type: "photo" as const,
          title: "Penyimpanan & Manajemen Node Server",
          caption: "Pengelolaan storage cluster dan integrasi layanan infrastruktur IT.",
          image: "/images/evidence/storage.webp",
        },
        {
          type: "certificate" as const,
          title: exp.certificatePlaceholder?.title || "Surat Keterangan Magang PT Lintasarta",
          caption: exp.certificatePlaceholder?.caption || "Surat keterangan resmi magang IT Services Management Lintasarta.",
        },
      ]
    }
    if (exp.id === "dsp-lab-course-ta") {
      return [
        {
          type: "photo" as const,
          title: "Visualisasi & Pengolahan Sinyal Digital",
          caption: "Dashboard pemantauan spektrum frekuensi sinyal dan simulasi data lab.",
          image: "/images/activities/iot-dashboard-screenshot.png",
        },
        {
          type: "photo" as const,
          title: "Sesi Praktikum Pengolahan Sinyal Digital",
          caption: "Dokumentasi bimbingan praktikum sinyal dan evaluasi laporan mahasiswa.",
        },
        {
          type: "certificate" as const,
          title: exp.certificatePlaceholder?.title || "Surat Tugas Asisten Lab DSP",
          caption: exp.certificatePlaceholder?.caption || "Surat tugas resmi Asisten Laboratorium DSP M-IOT FTEIC ITS.",
        },
      ]
    }
    return [
      {
        type: "photo" as const,
        title: exp.photoPlaceholder?.title || `${exp.role} — Foto Dokumentasi`,
        caption: exp.photoPlaceholder?.caption || "Dokumentasi pelaksanaan tugas, praktikum, atau kegiatan profesional.",
      },
      {
        type: "photo" as const,
        title: `${exp.role} — Evaluasi & Bimbingan`,
        caption: "Sesi evaluasi proyek, asistensi modul, dan bimbingan teknis mahasiswa.",
      },
      {
        type: "certificate" as const,
        title: exp.certificatePlaceholder?.title || `${exp.role} — Sertifikat / Surat Tugas`,
        caption: exp.certificatePlaceholder?.caption || "Dokumen resmi penugasan atau surat keputusan pengajaran.",
      },
    ]
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-center md:text-left items-center md:items-start max-w-3xl mx-auto md:mx-0">
          <h2 
            id="experience-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground text-center md:text-left"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
            {t.subheading}
          </p>
        </div>

        {/* Horizontal Slider: Exactly 3 cards visible on desktop, swipeable to reveal the rest */}
        <SectionCardSlider>
          {allExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.16 }}
              className="flex-1 w-full flex flex-col self-stretch h-full"
            >
              <NetworkSubsystemNode
                status={idx === 0 ? "transmitting" : "healthy"}
                className="flex-1 w-full flex flex-col justify-between text-left gap-4 sm:gap-5 p-5 sm:p-6 h-[570px] sm:h-[580px] self-stretch"
              >
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                    </span>
                    <span className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-[10px] bg-background">
                      {exp.category}
                    </span>
                  </div>

                  <div className="min-h-[3.25rem] flex flex-col justify-start">
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug line-clamp-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      <Briefcase className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <span className="truncate">{exp.company}</span>
                      <span className="text-zinc-400 shrink-0">&bull;</span>
                      <span className="font-normal text-zinc-500 shrink-0">{exp.location}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 min-h-[3.75rem]">
                    {exp.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1 select-none min-h-[1.75rem]">
                    {exp.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Visual Preview Slot (Multi-photo slider enabled) */}
                <CardMediaPreview
                  slides={getExperienceSlides(exp)}
                  contextTitle={`${exp.company} • ${exp.startDate} - ${exp.endDate || (language === "id" ? "Sekarang" : "Present")}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>

        {/* View All Experience Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/experience"
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

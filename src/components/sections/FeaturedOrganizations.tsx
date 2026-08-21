"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getOrganizations } from "@/data/career"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Users } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import MediaAttachmentButton from "@/components/ui/MediaAttachmentButton"

export default function FeaturedOrganizations() {
  const { language } = useLanguage()
  const t = translations[language].organizations
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

  const allOrgs = getOrganizations(language)
  const featuredOrgs = allOrgs.filter((org) => org.featured)

  return (
    <section 
      id="organizations" 
      aria-label="Organizational Experience"
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
            id="organizations-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Organizations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredOrgs.map((org) => (
            <motion.div key={org.id} variants={itemVariants} className="h-full">
              <NetworkSubsystemNode
                className="h-full flex flex-col justify-between text-left gap-6 p-6"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {org.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug">
                      {org.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      <Users className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span>{org.title}</span>
                    </div>
                  </div>

                  {org.bullets && (
                    <ul className="list-disc pl-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex flex-col gap-1.5 leading-relaxed mt-1">
                      {org.bullets.slice(0, 3).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <MediaAttachmentButton
                  media={org.media}
                  certificateUrl={org.certificateUrl}
                  certificateLabel={org.certificateLabel || (language === "id" ? "Sertifikat SKEM" : "SKEM Certificate")}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Organizations Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/organizations"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-mono text-xs font-semibold px-6 py-2.5 border-zinc-200 dark:border-zinc-800 text-foreground bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-xs rounded-xl"
            )}
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="size-4 text-zinc-500 dark:text-zinc-400" />
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

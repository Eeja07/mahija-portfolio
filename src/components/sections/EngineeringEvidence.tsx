"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Image as ImageIcon } from "lucide-react"

interface EvidenceItem {
  id: string
  title: string
  category: "Robotics" | "IoT" | "Systems" | "Virtualization" | "Network" | "AI"
  description: string
  details: string
  imagePath: string
  fallbackLabel: string
}

export default function EngineeringEvidence() {
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const items: EvidenceItem[] = [
    {
      id: "drone-flight",
      title: "Autonomous Search Mission Trajectory",
      category: "Robotics",
      description: "Flight testing photo showing physical UAV drone hovering during autonomous grid traversal.",
      details: "Fuses downward-facing optical flow sensor packets with LiDAR distance estimators to maintain drift-free position holds in GPS-denied environments.",
      imagePath: "/images/evidence/drone-field.webp",
      fallbackLabel: "evidence/drone-field.webp"
    },
    {
      id: "esp32-enclosure",
      title: "ESP32 Sensor Core Node Assembly",
      category: "IoT",
      description: "Macro photo of physical custom-wired ESP32 microcontroller and sensor breakout boards in plastic protective casing.",
      details: "Wired with a DHT22 ambient temperature module and powered by a rechargeable LiPo battery. Operates under strict deep-sleep cycles (25mA idle current).",
      imagePath: "/images/evidence/esp32-node.webp",
      fallbackLabel: "evidence/esp32-node.webp"
    },
    {
      id: "nuc-server",
      title: "Intel NUC Virtualization Node Setup",
      category: "Systems",
      description: "Physical photograph of the self-hosted Intel NUC hardware gateway running inside the homelab server cluster cabinet.",
      details: "Provides the primary virtual computing workspace. Running Proxmox VE hypervisor executing multiple Debian Docker hosts.",
      imagePath: "/images/evidence/storage.webp",
      fallbackLabel: "evidence/storage.webp"
    },
    {
      id: "yolo-detection",
      title: "YOLOv8 Computer Vision Target Frame",
      category: "AI",
      description: "Active screenshot of local YOLOv8 inference stream overlaying real-time person bounding boxes and confidence indexes.",
      details: "Compiled into TensorRT execution engines to run directly on local GPU nodes, optimizing object recognition latency down to 12ms per frame.",
      imagePath: "/images/evidence/yolo.webp",
      fallbackLabel: "evidence/yolo.webp"
    },
    {
      id: "cloudflare-ingress",
      title: "Cloudflare Ingress Tunnel Configuration",
      category: "Network",
      description: "Screenshot of the active Zero Trust dashboard monitoring local egress tunnel routing rules.",
      details: "Establishes egress-only secure connections, mapping local domain names (e.g. status.eeja.fun) dynamically without opening incoming firewall ports.",
      imagePath: "/images/evidence/tunnel.webp",
      fallbackLabel: "evidence/tunnel.webp"
    }
  ]

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }))
  }

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
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="engineering-evidence"
      aria-labelledby="evidence-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Exhibition
          </Badge>
          <h2 
            id="evidence-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Engineering Evidence
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Authentic screenshots, hardware installation photos, and active dashboard captures taken from live deployments.
          </p>
        </div>

        {/* Curation Exhibition Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer group"
            >
              <Card className="border border-border bg-card/25 shadow-sm overflow-hidden hover:border-primary/50 transition-colors duration-150 p-4 h-full flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex justify-between items-center select-none">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-bold">
                      {item.category}
                    </span>
                    <Badge variant="outline" className="text-[9px] font-mono px-1.5 py-0.5 opacity-65 group-hover:opacity-100 transition-opacity">
                      Inspect
                    </Badge>
                  </div>
                  
                  <h3 className="font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Photo / Screenshot Wrapper with Fallback */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-zinc-950/40 border border-border/60 flex items-center justify-center">
                  {failedImages[item.id] ? (
                    <div className="flex flex-col items-center gap-1.5 p-3 text-center">
                      <ImageIcon className="size-4 text-zinc-600" />
                      <span className="font-mono text-[9px] text-zinc-500">[{item.fallbackLabel}]</span>
                    </div>
                  ) : (
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Inspector Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="border border-border bg-zinc-950 text-foreground max-w-xl p-6 font-sans">
            <DialogHeader className="text-left border-b border-border/40 pb-4">
              <div className="flex justify-between items-center pr-6 select-none">
                <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                  {selectedItem?.category} Asset
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  REF_0{selectedItem ? items.findIndex((i) => i.id === selectedItem.id) + 1 : 1}
                </span>
              </div>
              <DialogTitle className="font-sans text-base font-bold mt-2">
                {selectedItem?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1 leading-normal">
                {selectedItem?.description}
              </DialogDescription>
            </DialogHeader>

            {/* Media view Inside Dialog */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="w-full aspect-video flex items-center justify-center bg-black/30 border border-border/40 rounded-2xl overflow-hidden">
                {selectedItem && failedImages[selectedItem.id] ? (
                  <div className="flex flex-col items-center gap-2 p-4 text-center">
                    <ImageIcon className="size-6 text-zinc-600 animate-pulse" />
                    <span className="font-mono text-xs text-zinc-400">[{selectedItem.fallbackLabel}]</span>
                    <span className="font-sans text-[10px] text-zinc-600">Drop your file in /public/images/ to load this asset</span>
                  </div>
                ) : (
                  selectedItem && (
                    <img
                      src={selectedItem.imagePath}
                      alt={selectedItem.title}
                      onError={() => handleImageError(selectedItem.id)}
                      className="w-full h-full object-cover select-none"
                    />
                  )
                )}
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-2 select-none">Technical Specifications</span>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed text-left">
                  {selectedItem?.details}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 border-t border-border/30 pt-4 flex items-center justify-between font-mono text-[9.5px] text-zinc-500 select-none">
              <span>Status: Physical Evidence Verified</span>
              <span>Node ID: {selectedItem?.id}</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

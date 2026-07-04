"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface EvidenceItem {
  id: string
  title: string
  category: "Robotics" | "IoT" | "Systems" | "Virtualization" | "Network" | "AI"
  description: string
  details: string
  schematic: React.ReactNode
}

export default function EngineeringEvidence() {
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null)

  const items: EvidenceItem[] = [
    {
      id: "drone-flight",
      title: "Autonomous Search Mission Trajectory",
      category: "Robotics",
      description: "Visual flight plan showing lawnmower search patterns and subject localization coordinates.",
      details: "The navigation path integrates optical flow feedback with PX4 guidance nodes to maintain absolute grid coverage under GPS-denied canopies. Fuses altitude lasers to dynamically adapt to varying terrain elevation.",
      schematic: (
        <svg viewBox="0 0 240 120" className="w-full h-32 bg-zinc-950/40 rounded-xl border border-border/60 p-2 text-muted-foreground select-none" aria-hidden="true">
          <rect width="240" height="120" rx="8" fill="none" />
          {/* Grid lines */}
          <line x1="20" y1="20" x2="220" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="50" x2="220" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="80" x2="220" y2="80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
          {/* Waypoints trajectory path */}
          <path d="M 30 90 L 30 30 L 70 30 L 70 90 L 110 90 L 110 30 L 150 30 L 150 90 L 190 90 L 190 30" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Drone indicator */}
          <circle cx="150" cy="60" r="4" fill="var(--foreground)" />
          <circle cx="150" cy="60" r="8" fill="none" stroke="var(--primary)" strokeWidth="1" className="animate-pulse" />
          {/* Target found coordinate marker */}
          <path d="M 110 50 L 115 55 M 110 50 L 105 45 M 110 50 L 115 45 M 110 50 L 105 55" stroke="var(--destructive)" strokeWidth="1.5" />
          <circle cx="110" cy="50" r="6" fill="none" stroke="var(--destructive)" strokeWidth="0.5" />
          {/* Labels */}
          <text x="35" y="102" fill="var(--muted-foreground)" className="font-mono text-[7px]">START</text>
          <text x="175" y="24" fill="var(--muted-foreground)" className="font-mono text-[7px]">SEARCH GRID</text>
          <text x="118" y="52" fill="var(--destructive)" className="font-mono text-[7.5px] font-bold">TARGET_ACQUIRED</text>
        </svg>
      )
    },
    {
      id: "esp32-enclosure",
      title: "ESP32 Sensor Core Node Layout",
      category: "IoT",
      description: "Wiring schematic showing battery management, temperature sensor, and serial transceivers.",
      details: "Engineered on standard ESP32 development boards using ESP-IDF. The system incorporates deep-sleep modules to draw only 25mA in idle state, waking up on hardware timers to publish local metrics via MQTT.",
      schematic: (
        <svg viewBox="0 0 240 120" className="w-full h-32 bg-zinc-950/40 rounded-xl border border-border/60 p-2 text-muted-foreground select-none" aria-hidden="true">
          <rect width="240" height="120" rx="8" fill="none" />
          {/* ESP32 Core block */}
          <rect x="25" y="30" width="60" height="60" rx="3" fill="none" stroke="var(--border)" strokeWidth="1.2" />
          <text x="55" y="63" fill="var(--foreground)" className="font-mono text-[9px] font-bold" textAnchor="middle">ESP32</text>
          {/* Antenna trace */}
          <path d="M 25 40 L 15 40 L 15 35 L 10 35 L 10 45 L 5 45" fill="none" stroke="var(--border)" strokeWidth="1" />
          {/* DHT Sensor block */}
          <rect x="145" y="20" width="50" height="30" rx="2" fill="none" stroke="var(--border)" strokeWidth="1.2" />
          <text x="170" y="37" fill="var(--muted-foreground)" className="font-mono text-[8px]" textAnchor="middle">DHT22</text>
          {/* LiPo Battery block */}
          <rect x="145" y="70" width="50" height="30" rx="2" fill="none" stroke="var(--border)" strokeWidth="1.2" />
          <text x="170" y="87" fill="var(--muted-foreground)" className="font-mono text-[8px]" textAnchor="middle">LiPo 3.7V</text>
          {/* Connecting traces */}
          <path d="M 85 45 L 145 35" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 85 75 L 145 85" fill="none" stroke="var(--primary)" strokeWidth="1" />
          <text x="115" y="36" fill="var(--primary)" className="font-mono text-[7px]" textAnchor="middle">GPIO_4</text>
          <text x="115" y="76" fill="var(--primary)" className="font-mono text-[7px]" textAnchor="middle">3.3V BUS</text>
        </svg>
      )
    },
    {
      id: "nuc-server",
      title: "Intel NUC Host Node Architecture",
      category: "Systems",
      description: "Host virtualization layout showing Proxmox hypervisor mapping to Debian virtual instances.",
      details: "Runs on bare-metal hardware virtualizing compute resources. Features isolated LXC containers and Docker instances bound to separate vlan subnets to maximize network resource security.",
      schematic: (
        <svg viewBox="0 0 240 120" className="w-full h-32 bg-zinc-950/40 rounded-xl border border-border/60 p-2 text-muted-foreground select-none" aria-hidden="true">
          <rect width="240" height="120" rx="8" fill="none" />
          {/* Bare Metal Frame */}
          <rect x="15" y="15" width="210" height="90" rx="4" fill="none" stroke="var(--border)" strokeWidth="1" />
          <text x="25" y="27" fill="var(--muted-foreground)" className="font-mono text-[7px] uppercase font-bold">Intel NUC Host</text>
          {/* Hypervisor layer */}
          <rect x="25" y="35" width="190" height="18" rx="2" fill="none" stroke="var(--primary)" strokeWidth="1.2" />
          <text x="120" y="47" fill="var(--primary)" className="font-mono text-[8px] font-bold" textAnchor="middle">PROXMOX VE HYPERVISOR</text>
          {/* VM 1 */}
          <rect x="25" y="65" width="85" height="30" rx="2" fill="none" stroke="var(--border)" strokeWidth="1" />
          <text x="67" y="78" fill="var(--foreground)" className="font-mono text-[8px]" textAnchor="middle">Debian VM</text>
          <text x="67" y="88" fill="var(--muted-foreground)" className="font-mono text-[7px]" textAnchor="middle">Docker Engines</text>
          {/* VM 2 */}
          <rect x="130" y="65" width="85" height="30" rx="2" fill="none" stroke="var(--border)" strokeWidth="1" />
          <text x="172" y="78" fill="var(--foreground)" className="font-mono text-[8px]" textAnchor="middle">LXC Services</text>
          <text x="172" y="88" fill="var(--muted-foreground)" className="font-mono text-[7px]" textAnchor="middle">DNS / Database</text>
        </svg>
      )
    },
    {
      id: "yolo-detection",
      title: "YOLOv8 Computer Vision Target Frame",
      category: "AI",
      description: "Visual inference representation demonstrating targeted classification overlays and target boundaries.",
      details: "Compiled to TensorRT execution formats to fully utilize edge GPUs, accelerating frame evaluations by 400% compared to typical runtime environments.",
      schematic: (
        <svg viewBox="0 0 240 120" className="w-full h-32 bg-zinc-950/40 rounded-xl border border-border/60 p-2 text-muted-foreground select-none" aria-hidden="true">
          <rect width="240" height="120" rx="8" fill="none" />
          {/* Target bounds */}
          <rect x="50" y="25" width="55" height="75" rx="1" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
          <text x="50" y="20" fill="var(--primary)" className="font-mono text-[7.5px] font-bold">person (93%)</text>
          
          <rect x="135" y="45" width="70" height="40" rx="1" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
          <text x="135" y="40" fill="var(--primary)" className="font-mono text-[7.5px] font-bold">drone (88%)</text>
          
          {/* Crosshairs */}
          <circle cx="120" cy="60" r="15" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="120" y1="40" x2="120" y2="80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="100" y1="60" x2="140" y2="60" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: "cloudflare-ingress",
      title: "Cloudflare Ingress Routing Gateway",
      category: "Network",
      description: "Edge protection tunnel routing client queries directly to hosting virtual systems.",
      details: "Leverages cloudflared egress tunnels to map subdomains dynamically without routing any incoming ports. Requests are screened at the WAF before landing on localized proxies.",
      schematic: (
        <svg viewBox="0 0 240 120" className="w-full h-32 bg-zinc-950/40 rounded-xl border border-border/60 p-2 text-muted-foreground select-none" aria-hidden="true">
          <rect width="240" height="120" rx="8" fill="none" />
          {/* Client node */}
          <circle cx="30" cy="60" r="12" fill="none" stroke="var(--border)" strokeWidth="1" />
          <text x="30" y="63" fill="var(--muted-foreground)" className="font-mono text-[7px]" textAnchor="middle">Client</text>
          {/* Cloudflare Edge Cloud */}
          <path d="M 100 65 A 12 12 0 0 1 110 50 A 18 18 0 0 1 135 48 A 12 12 0 0 1 145 60 A 10 10 0 0 1 140 70 L 105 70 A 10 10 0 0 1 100 65 Z" fill="none" stroke="var(--primary)" strokeWidth="1.2" />
          <text x="123" y="63" fill="var(--primary)" className="font-mono text-[8px] font-bold" textAnchor="middle">CLOUDFLARE</text>
          {/* Local VM node */}
          <circle cx="210" cy="60" r="12" fill="none" stroke="var(--border)" strokeWidth="1" />
          <text x="210" y="63" fill="var(--muted-foreground)" className="font-mono text-[7px]" textAnchor="middle">Proxy</text>
          {/* Route arrows */}
          <path d="M 45 60 L 90 60" fill="none" stroke="var(--border)" strokeWidth="1" markerEnd="url(#arrow-head)" />
          <path d="M 152 60 L 195 60" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="173" y="52" fill="var(--primary)" className="font-mono text-[7px]" textAnchor="middle">Tunnel</text>
        </svg>
      )
    }
  ]

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
            Architectural layouts, hardware schematics, and functional diagrams mapped from deployed clusters.
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

                {/* Vector Layout */}
                {item.schematic}
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
                  {selectedItem?.category} Schematic
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  SCH_0{selectedItem ? items.findIndex((i) => i.id === selectedItem.id) + 1 : 1}
                </span>
              </div>
              <DialogTitle className="font-sans text-base font-bold mt-2">
                {selectedItem?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1 leading-normal">
                {selectedItem?.description}
              </DialogDescription>
            </DialogHeader>

            {/* Schematic View Inside Dialog */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="w-full flex justify-center bg-black/30 border border-border/40 p-4 rounded-2xl">
                <div className="w-full max-w-[360px]">
                  {selectedItem?.schematic}
                </div>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-2 select-none">Architectural Details</span>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed text-left">
                  {selectedItem?.details}
                </p>
              </div>
            </div>

            {/* Schematic Footer */}
            <div className="mt-6 border-t border-border/30 pt-4 flex items-center justify-between font-mono text-[9.5px] text-zinc-500 select-none">
              <span>Status: System Layout Confirmed</span>
              <span>Node ID: {selectedItem?.id}</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

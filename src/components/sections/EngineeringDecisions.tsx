"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DecisionItem {
  decision: string
  alternatives: string[]
  tradeoffs: string
  pros: string[]
  cons: string[]
  outcome: string
}

const decisions: DecisionItem[] = [
  {
    decision: "Why Cloudflare Tunnel",
    alternatives: ["Standard Port Forwarding + Dynamic DNS", "Tailscale / WireGuard Overlay Mesh"],
    tradeoffs: "Accepts dependence on third-party proxy edge nodes in exchange for absolute zero open incoming ports in home network firewalls.",
    pros: ["Secures host network against direct IP port scanner sweep attacks", "Automates SSL/TLS certificate handshakes", "Built-in edge WAF rules"],
    cons: ["Subjects bandwidth limits to Cloudflare's tunnel policies", "Requires persistent cloudflared daemon execution"],
    outcome: "Deployed cloudflared client daemon in a Docker container routing all public ingress securely to local Nginx reverse proxies.",
  },
  {
    decision: "Why Docker Virtualization",
    alternatives: ["Proxmox LXC containers directly", "Bare-metal OS service binaries"],
    tradeoffs: "Introduces minor container networking latency overhead to achieve environment parity and clean container storage separation.",
    pros: ["Ensures reproducible application configurations via declarative YAMLs", "Simplifies multi-container networks", "Isolates project dependencies"],
    cons: ["Consumes more runtime disk space", "Requires management of Docker network bridges"],
    outcome: "Encapsulated all homelab services into isolated docker-compose networks managed on Debian 12 virtual instances.",
  },
  {
    decision: "Why MQTT Protocol",
    alternatives: ["HTTP REST APIs polling", "WebSockets continuous pipeline"],
    tradeoffs: "Limits payload structures to raw lightweight strings/JSON packets in return for battery-efficient, pub/sub telemetry streams.",
    pros: ["Sub-50ms message propagation", "Extremely low overhead suitable for ESP32 battery nodes", "Decouples sensor nodes from backend consumers"],
    cons: ["Lacks built-in request-response acknowledgement workflows", "Requires running a centralized message broker"],
    outcome: "Utilized Mosquitto MQTT broker for all smart home sensor nodes and real-time edge alert distribution networks.",
  },
  {
    decision: "Why MinIO Object Storage",
    alternatives: ["Local Host File System storage", "Managed AWS S3 buckets"],
    tradeoffs: "Accepts responsibility for hosting storage nodes and managing disk RAID configurations locally in exchange for zero egress fees and full offline independence.",
    pros: ["Compatible with standard S3 SDKs", "Provides local console dashboards for asset browsing", "Performs fast localized read/write operations"],
    cons: ["Requires monitoring hard drive life cycles and raid pools", "High RAM consumption under bulk uploads"],
    outcome: "Deployed self-hosted MinIO object cluster backing the CCTV platform to store over 2.5 million processed images locally.",
  },
  {
    decision: "Why Debian OS (stable)",
    alternatives: ["Ubuntu Server LTS", "Alpine Linux (for hosts)"],
    tradeoffs: "Lacks the newest cutting-edge package updates (stable branch freeze) in return for bulletproof stability and continuous security patches.",
    pros: ["Very low memory footprint", "Extremely predictable update pathways", "Vast package index support"],
    cons: ["Some software tools require compiling from source for latest version"],
    outcome: "Standardized Debian 12 (stable) as the underlying virtual machine OS for all Docker hosts and edge servers.",
  },
  {
    decision: "Why YOLOv8nano (TensorRT)",
    alternatives: ["YOLOv8medium", "Standard TensorFlow Lite CPU"],
    tradeoffs: "Reduces accuracy on small objects by ~3% to maintain real-time frame evaluation loops on edge accelerator hardware.",
    pros: ["Maintains 10Hz detection rate on NVIDIA Jetson Nano", "Optimized with TensorRT FP16 quantization", "Runs offline without cloud API latency"],
    cons: ["Inferior detection precision for subjects far away from camera view"],
    outcome: "Compiled YOLOv8n models into TensorRT engines for the drone companion computer search platform.",
  },
]

export default function EngineeringDecisions() {
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
      id="engineering-decisions"
      aria-labelledby="decisions-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            System Rationale
          </Badge>
          <h2 
            id="decisions-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Engineering Decisions
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Evaluation metrics, architectural trade-offs, and design selections made during system construction.
          </p>
        </div>

        {/* Decisions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {decisions.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="border border-border bg-card/25 shadow-sm hover:border-primary/40 transition-colors duration-150 h-full flex flex-col justify-between p-6">
                <div className="flex flex-col gap-4">
                  {/* Decision Title */}
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-sans text-base font-bold text-foreground leading-tight">
                      {item.decision}
                    </CardTitle>
                    <span className="font-mono text-[9px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded select-none">
                      DEC_0{idx + 1}
                    </span>
                  </div>

                  {/* Alternatives */}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground font-bold">Alternatives Evaluated</span>
                    <div className="flex flex-wrap gap-1.5 mt-0.5 select-none">
                      {item.alternatives.map((alt) => (
                        <Badge 
                          key={alt} 
                          variant="secondary" 
                          className="border border-border/20 px-1.5 py-0 font-mono text-[9px] text-zinc-400 bg-muted/20"
                        >
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tradeoffs */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground font-bold">The Core Trade-off</span>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.tradeoffs}
                    </p>
                  </div>

                  {/* Pros & Cons Columns */}
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-500 font-bold">Pros (+)</span>
                      <ul className="list-none text-[11px] text-muted-foreground flex flex-col gap-1.5 mt-1 leading-normal">
                        {item.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-emerald-500 mt-0.5">&bull;</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-rose-500 font-bold">Cons (-)</span>
                      <ul className="list-none text-[11px] text-muted-foreground flex flex-col gap-1.5 mt-1 leading-normal">
                        {item.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-rose-500 mt-0.5">&bull;</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Outcome */}
                <div className="border-t border-border/30 pt-4 mt-6">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-primary font-bold">Surgical Outcome</span>
                  <p className="font-mono text-[11px] text-foreground mt-0.5 leading-relaxed">
                    {item.outcome}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

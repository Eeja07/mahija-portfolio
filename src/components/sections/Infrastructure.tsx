"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Infrastructure() {
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
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  // Linear SVG topology configurations
  const nodes = [
    { label: "Browser", color: "var(--foreground)", fill: "var(--card)" },
    { label: "Cloudflare", color: "var(--foreground)", fill: "var(--card)" },
    { label: "Cloudflared Tunnel", color: "var(--foreground)", fill: "var(--card)" },
    { label: "Debian 12", color: "var(--foreground)", fill: "var(--card)" },
    { label: "Docker Compose", color: "var(--foreground)", fill: "var(--card)" },
    { label: "Portfolio", color: "var(--primary)", fill: "var(--card)", isPrimary: true },
    { label: "EMQX", color: "var(--foreground)", fill: "var(--card)" },
    { label: "MySQL", color: "var(--foreground)", fill: "var(--card)" },
    { label: "MinIO", color: "var(--foreground)", fill: "var(--card)" },
    { label: "Laravel", color: "var(--foreground)", fill: "var(--card)" },
  ]

  return (
    <section
      id="infrastructure"
      aria-labelledby="infrastructure-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Host Telemetry
          </Badge>
          <h2 
            id="infrastructure-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Infrastructure Showcase
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Deployment routing flow and server specifications for self-hosted services.
          </p>
        </div>

        {/* 2-Column Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          
          {/* Left Column: Vertical SVG Architecture */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center bg-muted/10 border border-border/40 rounded-2xl p-6 shadow-inner select-none"
          >
            <svg
              className="w-full max-w-[320px] h-auto text-foreground"
              viewBox="0 0 320 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Linear infrastructure architecture flow diagram: Client Browser to Cloudflare WAF, through Cloudflared Tunnel, to Debian 12 Docker Compose environment, serving Portfolio, EMQX, MySQL, MinIO, and Laravel API."
            >
              <title>Linear System Topology Pipeline</title>
              <desc>Continuous flow diagram visualizing: Browser client, Cloudflare edge, Cloudflared tunnel, Debian host system, Docker Compose network stack, Next.js Portfolio application, and support services Laravel API, EMQX MQTT, MinIO Object storage, and MySQL Database.</desc>
              
              <defs>
                <marker
                  id="arrow-down"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="currentColor" className="text-border" />
                </marker>
              </defs>

              {nodes.map((node, i) => {
                const yPos = 10 + i * 50
                const isLast = i === nodes.length - 1

                return (
                  <g key={node.label}>
                    {/* Rounded Rectangle Node Container */}
                    <rect 
                      x="85" 
                      y={yPos} 
                      width="150" 
                      height="28" 
                      rx="4" 
                      fill={node.fill} 
                      stroke={node.isPrimary ? "var(--primary)" : "var(--border)"} 
                      strokeWidth={node.isPrimary ? "1.5" : "1"} 
                    />
                    {/* Node Text Label */}
                    <text 
                      x="160" 
                      y={yPos + 17} 
                      fill={node.isPrimary ? "var(--primary)" : "currentColor"} 
                      className="font-mono text-[9.5px] font-bold" 
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>

                    {/* Connecting arrow if not the last node */}
                    {!isLast && (
                      <line 
                        x1="160" 
                        y1={yPos + 28} 
                        x2="160" 
                        y2={yPos + 50} 
                        stroke="currentColor" 
                        className="text-border" 
                        strokeWidth="1.2" 
                        markerEnd="url(#arrow-down)" 
                      />
                    )}
                  </g>
                )
              })}
            </svg>
          </motion.div>

          {/* Right Column: Infrastructure Specifications Card */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Card className="border border-border bg-card/40 shadow-sm w-full">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-bold font-sans text-foreground uppercase tracking-wider font-mono">
                  Specification Details
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground font-sans">
                  System telemetry metrics for the hosting environment.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <span className="text-xs text-muted-foreground font-sans font-medium">Domain</span>
                  <a 
                    href="https://eeja.fun" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-mono font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                  >
                    eeja.fun
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <span className="text-xs text-muted-foreground font-sans font-medium">OS</span>
                  <span className="text-xs font-mono font-semibold text-foreground">Debian 12</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <span className="text-xs text-muted-foreground font-sans font-medium">Host</span>
                  <span className="text-xs font-mono font-semibold text-foreground">Intel NUC</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <span className="text-xs text-muted-foreground font-sans font-medium">Runtime</span>
                  <span className="text-xs font-mono font-semibold text-foreground">Docker Compose</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <span className="text-xs text-muted-foreground font-sans font-medium">Tunnel</span>
                  <span className="text-xs font-mono font-semibold text-foreground">Cloudflared</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-sans font-medium">Deployment</span>
                  <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Self Hosted
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

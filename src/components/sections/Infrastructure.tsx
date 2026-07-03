"use client"

import React from "react"
import { motion } from "motion/react"
import { infrastructureData } from "@/data/infrastructure"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
            System Topology
          </Badge>
          <h2 
            id="infrastructure-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Infrastructure
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Homelab server network and host execution environment metrics.
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
          
          {/* Left Column: SVG Diagram */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center bg-muted/10 border border-border/40 rounded-2xl p-6 shadow-inner select-none"
          >
            <svg
              className="w-full max-w-[400px] h-auto text-foreground"
              viewBox="0 0 400 580"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Infrastructure deployment flowchart from client browser to supporting databases"
            >
              <title>System Deployment Topology</title>
              <desc>Flow diagram showing connection routing: Client Browser to Cloudflare Edge CDN, through Cloudflared Tunnel to Debian host running Docker Compose. Docker Compose directs traffic to Next.js Portfolio app and supporting services (Laravel API, EMQX MQTT, MinIO Object Storage, MySQL Database).</desc>
              
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="currentColor" className="text-border" />
                </marker>
                <marker
                  id="arrow-bidirectional"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="currentColor" className="text-primary/70" />
                </marker>
              </defs>

              {/* Client Browser Node */}
              <rect x="130" y="10" width="140" height="34" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="200" y="31" fill="currentColor" className="font-mono text-[10px] font-bold" textAnchor="middle">Browser Client</text>

              {/* Link 1 */}
              <line x1="200" y1="44" x2="200" y2="70" stroke="currentColor" className="text-border" strokeWidth="1.2" markerEnd="url(#arrow)" />

              {/* Cloudflare CDN Node */}
              <rect x="130" y="76" width="140" height="34" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="200" y="97" fill="currentColor" className="font-mono text-[10px] font-bold" textAnchor="middle">Cloudflare (WAF/CDN)</text>

              {/* Link 2 */}
              <line x1="200" y1="110" x2="200" y2="136" stroke="currentColor" className="text-border" strokeWidth="1.2" markerEnd="url(#arrow)" />

              {/* Cloudflared Tunnel Node */}
              <rect x="130" y="142" width="140" height="34" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="200" y="163" fill="currentColor" className="font-mono text-[10px] font-bold" textAnchor="middle">Cloudflared (Tunnel)</text>

              {/* Link 3 */}
              <line x1="200" y1="176" x2="200" y2="202" stroke="currentColor" className="text-border" strokeWidth="1.2" markerEnd="url(#arrow)" />

              {/* Debian Host OS Node */}
              <rect x="110" y="208" width="180" height="34" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1.2" />
              <text x="200" y="229" fill="currentColor" className="font-mono text-[10px] font-bold" textAnchor="middle">Debian 12 (Intel NUC)</text>

              {/* Link 4 */}
              <line x1="200" y1="242" x2="200" y2="268" stroke="currentColor" className="text-border" strokeWidth="1.2" markerEnd="url(#arrow)" />

              {/* Docker Compose Runtime Node */}
              <rect x="110" y="274" width="180" height="34" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1.2" />
              <text x="200" y="295" fill="currentColor" className="font-mono text-[10px] font-bold" textAnchor="middle">Docker Compose Runtime</text>

              {/* Link 5 (Left to Portfolio) */}
              <path d="M 160 308 L 160 324 L 90 324 L 90 348" stroke="currentColor" className="text-border" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" />

              {/* Link 6 (Right to Supporting Services) */}
              <path d="M 240 308 L 240 324 L 305 324 L 305 348" stroke="currentColor" className="text-border" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" />

              {/* Portfolio Node */}
              <rect x="20" y="354" width="140" height="34" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="90" y="375" fill="currentColor" className="font-mono text-[10px] font-bold text-primary" textAnchor="middle">Portfolio (Next.js)</text>

              {/* Supporting Services Group Block */}
              <rect x="210" y="354" width="170" height="212" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="295" y="372" fill="currentColor" className="font-mono text-[9px] font-bold text-muted-foreground" textAnchor="middle">SUPPORTING POD</text>

              {/* Sub-Node: Laravel */}
              <rect x="225" y="386" width="140" height="26" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
              <text x="295" y="402" fill="currentColor" className="font-mono text-[9px] font-medium" textAnchor="middle">Laravel Backend API</text>

              {/* Sub-Node: EMQX */}
              <rect x="225" y="420" width="140" height="26" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
              <text x="295" y="436" fill="currentColor" className="font-mono text-[9px] font-medium" textAnchor="middle">EMQX MQTT Broker</text>

              {/* Sub-Node: MinIO */}
              <rect x="225" y="454" width="140" height="26" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
              <text x="295" y="470" fill="currentColor" className="font-mono text-[9px] font-medium" textAnchor="middle">MinIO Object Store</text>

              {/* Sub-Node: MySQL */}
              <rect x="225" y="488" width="140" height="26" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
              <text x="295" y="504" fill="currentColor" className="font-mono text-[9px] font-medium" textAnchor="middle">MySQL Database</text>

              {/* Inter-container communication link */}
              <path d="M 160 371 L 202 371" stroke="var(--primary)" strokeWidth="1.2" fill="none" markerEnd="url(#arrow-bidirectional)" />
              <text x="181" y="365" fill="var(--primary)" className="font-mono text-[8px] font-bold" textAnchor="middle">API</text>
            </svg>
          </motion.div>

          {/* Right Column: Server Specifications & Services */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Host Details Card */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card/40 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-bold font-sans text-foreground">
                    Host Node Configurations
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground font-sans">Domain</span>
                    <a href={`https://${infrastructureData.domain}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-medium text-primary hover:underline">
                      {infrastructureData.domain}
                    </a>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground font-sans">Host Hardware</span>
                    <span className="text-xs font-mono font-medium text-foreground">{infrastructureData.host}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground font-sans">CPU Architecture</span>
                    <span className="text-xs font-mono font-medium text-foreground">{infrastructureData.cpu}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground font-sans">Operating System</span>
                    <span className="text-xs font-mono font-medium text-foreground">{infrastructureData.os}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground font-sans">Container Runtime</span>
                    <span className="text-xs font-mono font-medium text-foreground">{infrastructureData.container_runtime}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground font-sans">Reverse Proxy</span>
                    <span className="text-xs font-mono font-medium text-foreground">{infrastructureData.reverse_proxy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-sans">Ingress Tunnel</span>
                    <span className="text-xs font-mono font-medium text-foreground">{infrastructureData.tunnel}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Container Services Stack */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card/40 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-bold font-sans text-foreground">
                    Active Stack Containers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex flex-col gap-4">
                  {infrastructureData.services.map((service, index) => (
                    <div 
                      key={service.name}
                      className="flex flex-col gap-1.5 pb-3 last:pb-0 border-b border-border/30 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground font-sans">{service.name}</span>
                          <span className="text-[10px] font-mono text-muted-foreground font-medium uppercase tracking-wider">
                            {service.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-wider">
                            {service.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  )
}

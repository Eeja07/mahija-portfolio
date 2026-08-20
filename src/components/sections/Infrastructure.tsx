"use client"

import React from "react"
import { motion } from "motion/react"
import { getInfrastructure } from "@/data/infrastructure"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { Server, Cpu, ShieldCheck, Database, Layers, Radio, HardDrive, Terminal } from "lucide-react"

export default function Infrastructure() {
  const { language } = useLanguage()
  const data = getInfrastructure(language)
  const isEn = language === "en"
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

  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "portfolio":
        return <Layers className="size-4 text-blue-500 dark:text-cyan-400" />
      case "laravel":
        return <Terminal className="size-4 text-rose-500" />
      case "emqx":
        return <Radio className="size-4 text-emerald-500" />
      case "mysql":
        return <Database className="size-4 text-amber-500" />
      case "minio":
        return <HardDrive className="size-4 text-purple-500" />
      default:
        return <Server className="size-4 text-blue-500 dark:text-cyan-400" />
    }
  }

  return (
    <section
      id="infrastructure"
      aria-labelledby="infrastructure-heading"
      className="w-full py-20 bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <Badge 
              variant="outline" 
              className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
            >
              {isEn ? "Self-Hosted Bare-Metal Topology" : "Topologi Bare-Metal Mandiri"}
            </Badge>
          </div>
          <h2 
            id="infrastructure-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {isEn ? "Live Cluster Infrastructure" : "Infrastruktur Klaster Aktif"}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {isEn
              ? "Real production node architecture running continuously on self-hosted Debian 12 hardware via zero-trust ingress tunnels."
              : "Arsitektur node produksi nyata yang berjalan terus menerus pada perangkat keras Debian 12 mandiri via zero-trust ingress tunnel."}
          </p>
        </div>

        {/* Master Host Node Specification Rack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={itemVariants}
          className="mb-8"
        >
          <NetworkSubsystemNode
            status="healthy"
            className="p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Host Machine */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="size-3.5 text-blue-500 dark:text-cyan-400" />
                  {isEn ? "Host Platform" : "Platform Host"}
                </span>
                <span className="font-sans text-base font-bold text-foreground">
                  {data.host}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {data.os}
                </span>
              </div>

              {/* Compute Engine */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="size-3.5 text-emerald-500" />
                  {isEn ? "Processor Architecture" : "Arsitektur Prosesor"}
                </span>
                <span className="font-sans text-base font-bold text-foreground">
                  {data.cpu}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  Runtime: {data.container_runtime}
                </span>
              </div>

              {/* Ingress Security */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  {isEn ? "Ingress & Routing" : "Ingress & Routing"}
                </span>
                <span className="font-sans text-base font-bold text-foreground">
                  {data.tunnel} Tunnel
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  Proxy: {data.reverse_proxy}
                </span>
              </div>

              {/* Apex Domain */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="size-3.5 text-cyan-500" />
                  {isEn ? "Production Domain" : "Domain Produksi"}
                </span>
                <a
                  href={`https://${data.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-base font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>{data.domain}</span>
                  <span>&nearr;</span>
                </a>
                <span className="font-mono text-xs text-emerald-500 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>TLS 1.3 / E2EE Encrypted</span>
                </span>
              </div>
            </div>
          </NetworkSubsystemNode>
        </motion.div>

        {/* Running Service Container Nodes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.services.map((service) => (
            <motion.div key={service.name} variants={itemVariants} className="h-full">
              <NetworkSubsystemNode
                status={service.status === "active" ? "healthy" : "standby"}
                className="h-full flex flex-col justify-between text-left gap-4 p-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                        {getServiceIcon(service.name)}
                      </div>
                      <div>
                        <h3 className="font-sans text-lg font-bold text-foreground tracking-tight">
                          {service.name}
                        </h3>
                        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          {service.role}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    >
                      {service.status}
                    </Badge>
                  </div>

                  <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed mt-1">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                  <span>DOCKER CONTAINER</span>
                  <span className="text-emerald-500 font-semibold">ONLINE</span>
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

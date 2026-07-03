"use client"

import React from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Bulletproof inline SVGs matching Linear's design system
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const ServerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="8" x="2" y="3" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="13" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="7" y2="7" />
    <line x1="6" x2="6.01" y1="17" y2="17" />
  </svg>
)

const CpuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
)

const NetworkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M12 8v8M12 16H5M12 16h7" />
  </svg>
)

const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c4 0 7-2 7-2s3 2 7 2a1 1 0 0 1 1 1v7z" />
  </svg>
)

const HardDriveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="8" x="2" y="3" rx="2" />
    <rect width="20" height="8" x="2" y="13" rx="2" />
    <line x1="6" x2="6.01" y1="7" y2="7" />
    <line x1="6" x2="6.01" y1="17" y2="17" />
  </svg>
)

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
  </svg>
)

export default function Hero() {
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
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <section 
      aria-label="Introduction and Infrastructure Diagnostics"
      className="relative w-full min-h-screen pt-24 pb-16 flex items-center justify-center bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div variants={itemVariants}>
              <Badge 
                variant="outline" 
                className="gap-1.5 border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                Computer Engineering ITS
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground leading-[1.05]"
            >
              Infrastructure
              <br />
              Fullstack
              <br />
              IoT & Edge AI
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground max-w-xl font-sans leading-relaxed"
            >
              Building end-to-end systems from embedded devices to self-hosted infrastructure and production-ready applications.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mt-4"
            >
              <Button
                variant="default"
                size="default"
                className="font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-150"
                render={<a href="#resume">Resume</a>}
              />
              <Button
                variant="outline"
                size="default"
                className="font-medium border-border hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-150"
                render={
                  <a href="https://github.com/Eeja07" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="size-4 mr-2" />
                    GitHub
                  </a>
                }
              />
              <Button
                variant="outline"
                size="default"
                className="font-medium border-border hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-150"
                render={
                  <a href="https://linkedin.com/in/mahija-ibad-pradipta" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="size-4 mr-2" />
                    LinkedIn
                  </a>
                }
              />
            </motion.div>
          </div>

          {/* Right Column: Infrastructure Telemetry Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <Card className="w-full max-w-md border border-border bg-card/60 shadow-sm transition-all duration-150 select-none">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold font-sans tracking-tight text-foreground flex items-center gap-2">
                    <ServerIcon className="size-4 text-primary" />
                    Node Information
                  </CardTitle>
                  <div className="flex items-center gap-1.5" aria-label="System status online">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-mono font-medium text-emerald-500 uppercase tracking-wider">Active</span>
                  </div>
                </div>
                <CardDescription className="text-xs font-sans text-muted-foreground mt-1">
                  Self-hosted environment parameters and cluster diagnostic variables.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GlobeIcon className="size-3.5" />
                    <span className="text-xs font-sans">Hosted on</span>
                  </div>
                  <a 
                    href="https://eeja.fun" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-mono font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    eeja.fun
                  </a>
                </div>

                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HardDriveIcon className="size-3.5" />
                    <span className="text-xs font-sans">Host OS</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">Debian 12 (Stable)</span>
                </div>

                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CpuIcon className="size-3.5" />
                    <span className="text-xs font-sans">Hardware</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">Intel NUC (x86_64)</span>
                </div>

                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShieldIcon className="size-3.5" />
                    <span className="text-xs font-sans">Containers</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">Docker Compose</span>
                </div>

                <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <NetworkIcon className="size-3.5" />
                    <span className="text-xs font-sans">Tunneling</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">Cloudflare Tunnel</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ServerIcon className="size-3.5" />
                    <span className="text-xs font-sans">Deployment</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">Self Hosted</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

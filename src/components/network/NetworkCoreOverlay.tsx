"use client"

import React from "react"
import { 
  Server, 
  Terminal, 
  Activity, 
  Layers, 
  Users, 
  GraduationCap, 
  Trophy, 
  FolderGit2, 
  FileCode, 
  Mail 
} from "lucide-react"

interface NodeSelector {
  label: string
  targetId: string
  sub: string
  icon: React.ReactNode
}

interface NetworkCoreOverlayProps {
  onNodeSelect?: (targetId: string) => void
}

const nodeSelectors: NodeSelector[] = [
  {
    label: "Infrastructure",
    targetId: "#infrastructure",
    sub: "Debian 12 Host",
    icon: <Server className="size-3.5 text-blue-500 dark:text-cyan-400" />,
  },
  {
    label: "Projects",
    targetId: "#featured-engineering",
    sub: "IoT & Drone Systems",
    icon: <Terminal className="size-3.5 text-cyan-400" />,
  },
  {
    label: "Experience",
    targetId: "#experience",
    sub: "Routing Hops",
    icon: <Activity className="size-3.5 text-emerald-500" />,
  },
  {
    label: "Skills",
    targetId: "#skills",
    sub: "Stack Topology",
    icon: <Layers className="size-3.5 text-blue-400" />,
  },
  {
    label: "Organizations",
    targetId: "#organizations",
    sub: "Leadership Clusters",
    icon: <Users className="size-3.5 text-indigo-400" />,
  },
  {
    label: "Training",
    targetId: "#training",
    sub: "Certified Protocols",
    icon: <GraduationCap className="size-3.5 text-emerald-400" />,
  },
  {
    label: "Awards",
    targetId: "#awards",
    sub: "National Accolades",
    icon: <Trophy className="size-3.5 text-amber-400" />,
  },
  {
    label: "Repositories",
    targetId: "#repositories",
    sub: "46 Open Source Repos",
    icon: <FolderGit2 className="size-3.5 text-blue-400" />,
  },
  {
    label: "Resume",
    targetId: "#resume",
    sub: "PDF Payload (EN/ID)",
    icon: <FileCode className="size-3.5 text-cyan-400" />,
  },
  {
    label: "Contact",
    targetId: "#contact",
    sub: "Socket Endpoints",
    icon: <Mail className="size-3.5 text-emerald-400" />,
  },
]

export default function NetworkCoreOverlay({ onNodeSelect }: NetworkCoreOverlayProps) {
  const handleSelect = (targetId: string) => {
    if (onNodeSelect) {
      onNodeSelect(targetId)
      return
    }
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 select-none">
      {nodeSelectors.map((item) => (
        <button
          key={item.label}
          onClick={() => handleSelect(item.targetId)}
          className="p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-900/70 backdrop-blur-md hover:border-blue-500/50 dark:hover:border-cyan-400/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-all duration-150 text-left flex flex-col justify-between gap-1 shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-1 rounded-md bg-background border border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40">
              {item.icon}
            </div>
            <span className="font-mono text-[9px] text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-cyan-400">
              JUMP &rarr;
            </span>
          </div>
          <div>
            <span className="font-sans text-[11px] font-bold text-foreground block group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              {item.label}
            </span>
            <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 block truncate">
              {item.sub}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

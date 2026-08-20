import React from "react"
import { cn } from "@/lib/utils"

interface NetworkMonogramMProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  animated?: boolean
}

export function NetworkMonogramM({
  className,
  animated = false,
  ...props
}: NetworkMonogramMProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5 select-none", className)}
      aria-label="Mahija Network Monogram M"
      {...props}
    >
      <defs>
        <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" className="text-blue-500 dark:text-cyan-400" />
          <stop offset="50%" stopColor="currentColor" className="text-blue-600 dark:text-sky-400" />
          <stop offset="100%" stopColor="currentColor" className="text-emerald-500 dark:text-emerald-400" />
        </linearGradient>
      </defs>

      {/* Network Circuit Traces / Sub-Buses */}
      <path
        d="M 3 16 L 7 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-zinc-300 dark:text-zinc-700"
      />
      <path
        d="M 25 16 L 29 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-zinc-300 dark:text-zinc-700"
      />
      <path
        d="M 16 3 L 16 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-zinc-300 dark:text-zinc-700"
      />

      {/* Primary Network Monogram 'M' Backbone */}
      <path
        d="M 7 24 L 7 8 L 16 16.5 L 25 8 L 25 24"
        stroke="url(#monogramGrad)"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(animated && "animate-pulse")}
      />

      {/* Outer Glow Line for Dark Mode High Visibility */}
      <path
        d="M 7 24 L 7 8 L 16 16.5 L 25 8 L 25 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white/30 dark:text-cyan-300/40"
      />

      {/* Network Junction Solder Nodes */}
      <circle cx="7" cy="24" r="1.8" fill="#3b82f6" className="dark:fill-cyan-400" />
      <circle cx="7" cy="8" r="1.8" fill="#38bdf8" className="dark:fill-sky-400" />
      <circle cx="16" cy="16.5" r="2.2" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" className="dark:fill-zinc-950 dark:stroke-cyan-300" />
      <circle cx="25" cy="8" r="1.8" fill="#38bdf8" className="dark:fill-sky-400" />
      <circle cx="25" cy="24" r="1.8" fill="#10b981" className="dark:fill-emerald-400" />
    </svg>
  )
}

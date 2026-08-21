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
      {/* Network Circuit Traces / Sub-Buses */}
      <path
        d="M 3 16 L 7 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="opacity-40"
      />
      <path
        d="M 25 16 L 29 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="opacity-40"
      />
      <path
        d="M 16 3 L 16 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="opacity-40"
      />

      {/* Primary Network Monogram 'M' Backbone */}
      <path
        d="M 7 24 L 7 8 L 16 16.5 L 25 8 L 25 24"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(animated && "animate-pulse")}
      />

      {/* Network Junction Solder Nodes */}
      <circle cx="7" cy="24" r="1.8" fill="currentColor" />
      <circle cx="7" cy="8" r="1.8" fill="currentColor" />
      <circle cx="16" cy="16.5" r="2.2" fill="currentColor" />
      <circle cx="25" cy="8" r="1.8" fill="currentColor" />
      <circle cx="25" cy="24" r="1.8" fill="currentColor" />
    </svg>
  )
}

import React from "react"
import { cn } from "@/lib/utils"

interface BadgePulseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  variant?: "success" | "neutral" | "brand"
  className?: string
}

export function BadgePulse({
  children,
  variant = "success",
  className,
  ...props
}: BadgePulseProps) {
  const dotColor =
    variant === "success"
      ? "bg-emerald-500"
      : variant === "brand"
      ? "bg-blue-500"
      : "bg-zinc-400"

  const pingColor =
    variant === "success"
      ? "bg-emerald-500"
      : variant === "brand"
      ? "bg-blue-500"
      : "bg-zinc-400"

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-900/90 px-3 py-1 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 select-none shadow-xs transition-colors duration-150",
        className
      )}
      {...props}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping-slow rounded-full opacity-75",
            pingColor
          )}
        />
        <span
          className={cn("relative inline-flex size-2 rounded-full", dotColor)}
        />
      </span>
      <span>{children}</span>
    </div>
  )
}

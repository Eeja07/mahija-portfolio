export const colors = {
  light: {
    background: "#ffffff",
    surface: "#fafafa",
    border: "#e5e7eb",
    primary: "#2563eb",
    foreground: "#111827",
    muted: "#6b7280",
  },
  dark: {
    background: "#09090b",
    surface: "#18181b",
    border: "#27272a",
    primary: "#3b82f6",
    foreground: "#f4f4f5",
    muted: "#a1a1aa",
  },
} as const;

export const motionConfig = {
  duration: 0.18, // Under 200ms constraint
  ease: [0.16, 1, 0.3, 1], // Custom snappy easing
} as const;

export const theme = {
  colors,
  motion: motionConfig,
} as const;
export interface MediaItem {
  type: "image" | "certificate" | "document" | "video" | "placeholder"
  url?: string
  title: string
  caption?: string
  thumbnail?: string
  isPlaceholder?: boolean
  category?: "photo" | "certificate" | "document" | "instagram"
  instagramUrl?: string
  contextTitle?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate?: string
  current?: boolean
  category: string
  description: string
  achievements: string[]
  technologies: string[]
  photoPlaceholder?: {
    title: string
    caption: string
  }
  certificatePlaceholder?: {
    title: string
    caption: string
  }
  media?: MediaItem[]
}

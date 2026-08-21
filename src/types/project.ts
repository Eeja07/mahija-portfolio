import { MediaItem } from "./experience";

export type ProjectCategory =
  | "Infrastructure"
  | "IoT"
  | "Fullstack"
  | "Computer Vision"
  | "Edge AI"
  | "Robotics"
  | "AI"
  | "Systems"
  | "Security"
  | "Academic"
  | "Infrastruktur"
  | "Aplikasi Web"
  | "Embedded System"
  | string;

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: number;
  category: ProjectCategory;
  stack: string[];
  metrics: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  architecture?: string[];
  image?: string;
  featured: boolean;
  
  // Engineering Showcase specifics
  problem?: string;
  approach?: string;
  tradeoffs?: string;
  challenges?: string;
  outcome?: string;
  mediaType?: "video" | "image";
  mediaUrl?: string;
  mediaGallery?: MediaItem[];
  certificateUrl?: string;
}

export type ExperienceCategory =
  | "Internship"
  | "Teaching Assistant"
  | "Leadership"
  | "Research"
  | "Magang"
  | "Magang Industri"
  | "Asisten Pengajar"
  | "Instruktur"
  | "Kepemimpinan"
  | "Riset"
  | string;

export interface MediaItem {
  type: "image" | "video" | "document";
  url: string;
  title?: string;
  caption?: string;
  thumbnail?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  category: ExperienceCategory;
  media?: MediaItem[];
  certificateUrl?: string;
}

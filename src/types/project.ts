export type ProjectCategory =
  | "Infrastructure"
  | "IoT"
  | "Fullstack"
  | "Computer Vision"
  | "Edge AI";

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
}

export type ExperienceCategory =
  | "Internship"
  | "Teaching Assistant"
  | "Leadership"
  | "Research";

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
}

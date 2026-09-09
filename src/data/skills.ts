export interface SkillCategory {
  title: string
  items: string[]
}

export const skillGroups: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: ["JavaScript", "Python", "C++", "Dart", "SQL"],
  },
  {
    title: "Web Development",
    items: ["Laravel", "Vite", "REST API", "PostgreSQL", "MySQL", "React"],
  },
  {
    title: "Mobile Development",
    items: ["Flutter"],
  },
  {
    title: "Infrastructure & DevOps",
    items: ["Linux (Debian & Ubuntu)", "Docker", "Cloudflare Tunnel", "Webmin", "MinIO", "EMQX"],
  },
  {
    title: "Networking",
    items: ["TCP/IP", "MQTT", "Network Troubleshooting", "WebSocket"],
  },
  {
    title: "AI & Computer Vision",
    items: ["YOLO", "ONNX", "TensorFlow Lite", "OpenCV"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "phpMyAdmin"],
  },
  {
    title: "Languages",
    items: ["Indonesian (Native)", "Javanese (Conversational)", "English (Professional Working Proficiency)"],
  },
]

export function getSkillGroups(_lang: "en" | "id" = "en"): SkillCategory[] {
  return skillGroups
}

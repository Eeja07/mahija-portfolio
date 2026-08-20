export interface SkillCategory {
  title: string
  description: string
  items: string[]
}

export const skillGroups: SkillCategory[] = [
  {
    title: "Infrastructure",
    description: "Virtualization, container orchestrations, and homelab environments.",
    items: ["Docker", "Docker Compose", "Linux (Debian)", "Proxmox VE", "Portainer", "Nginx", "Systemd"],
  },
  {
    title: "Backend",
    description: "Server architecture, API endpoints development, and relational datastores.",
    items: ["Laravel", "PHP", "Node.js", "Express", "REST APIs", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Frontend",
    description: "Responsive layouts, dynamic client states, and interactive animations.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML5", "CSS3", "Motion"],
  },
  {
    title: "AI",
    description: "Computer vision models execution, dataset processing, and neural engines.",
    items: ["PyTorch", "TensorFlow", "OpenCV", "CNNs", "Computer Vision", "NumPy", "Pandas"],
  },
  {
    title: "Networking",
    description: "Network routing, edge ingress configuration, and client-broker protocols.",
    items: ["VLANs", "Subnetting", "Cloudflare Tunnels", "MQTT Protocol", "Firewalls", "DHCP / DNS"],
  },
  {
    title: "Tools",
    description: "Development environments, CLI execution systems, and design workflow platforms.",
    items: ["Git / GitHub", "VS Code", "Postman", "Bash Scripting", "MinIO", "Figma", "Linux CLI"],
  },
]

export const skillGroupsId: SkillCategory[] = [
  {
    title: "Infrastruktur",
    description: "Virtualisasi, orkestrasi kontainer Docker, dan lingkungan homelab.",
    items: ["Docker", "Docker Compose", "Linux (Debian)", "Proxmox VE", "Portainer", "Nginx", "Systemd"],
  },
  {
    title: "Backend",
    description: "Arsitektur server, pengembangan API endpoint, dan penyimpanan data relasional.",
    items: ["Laravel", "PHP", "Node.js", "Express", "REST APIs", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Frontend",
    description: "Tata letak responsif, manajemen state dinamis, dan animasi interaktif.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML5", "CSS3", "Motion"],
  },
  {
    title: "AI & Computer Vision",
    description: "Eksekusi model penglihatan komputer, pemrosesan dataset, dan neural engine.",
    items: ["PyTorch", "TensorFlow", "OpenCV", "CNNs", "Computer Vision", "NumPy", "Pandas"],
  },
  {
    title: "Jaringan (Networking)",
    description: "Routing jaringan, konfigurasi ingress edge, dan protokol komunikasi IoT.",
    items: ["VLANs", "Subnetting", "Cloudflare Tunnels", "MQTT Protocol", "Firewalls", "DHCP / DNS"],
  },
  {
    title: "Perkakas & Tools",
    description: "Lingkungan pengembangan, eksekusi baris perintah CLI, dan alur kerja desain.",
    items: ["Git / GitHub", "VS Code", "Postman", "Bash Scripting", "MinIO", "Figma", "Linux CLI"],
  },
]

export function getSkillGroups(lang: "en" | "id" = "en"): SkillCategory[] {
  return lang === "id" ? skillGroupsId : skillGroups
}

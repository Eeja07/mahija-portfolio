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

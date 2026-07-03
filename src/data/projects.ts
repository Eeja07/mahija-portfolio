import { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "smart-cctv",
    slug: "diy-smart-cctv-platform",
    title: "DIY Smart CCTV Platform",
    description:
      "Self-hosted edge computer vision platform for real-time video stream processing and offline object detection using low-power devices.",
    year: 2024,
    category: "IoT",
    stack: ["Python", "OpenCV", "PyTorch", "Docker", "Raspberry Pi 4", "MQTT", "Go"],
    metrics: [
      "98% object detection accuracy at the edge",
      "Under 120ms local processing latency",
      "Reduced bandwidth consumption by 85%",
    ],
    highlights: [
      "Designed a lightweight edge inference pipeline utilizing pruned MobileNetV3 models to run on resource-constrained hardware",
      "Built automated alerting systems triggered by MQTT brokers forwarding frames to custom Discord/Telegram webhook integrations",
      "Orchestrated multi-camera deployment configurations via Docker Compose and remote Ansible playbook executions",
    ],
    github: "https://github.com/Eeja07/smart-cctv-edge",
    demo: "https://cctv.eeja.fun",
    architecture: [
      "RTSP IP Camera Input Stream",
      "Raspberry Pi 4 Edge Gateway",
      "TensorFlow Lite Inference Runner",
      "Mosquitto MQTT Message Broker",
      "Telegram Notification Engine",
    ],
    featured: true,
  },
  {
    id: "human-search-drone",
    slug: "autonomous-human-search",
    title: "Autonomous Human Search Drone",
    description:
      "Search-and-rescue UAV localization platform that performs autonomous pathing and onboard human detection in GPS-denied environments.",
    year: 2025,
    category: "Edge AI",
    stack: ["C++", "Python", "ROS2", "YOLOv8", "NVIDIA Jetson Nano", "PX4 Autopilot"],
    metrics: [
      "10Hz onboard detection rate on NVIDIA Jetson Nano",
      "Located subjects within a 5-meter radius accuracy",
      "Operates fully offline with zero remote server dependency",
    ],
    highlights: [
      "Integrated ROS2 navigation stack with custom optical flow sensor feedback for drift-free flight stability",
      "Optimized YOLOv8 weights to run on TensorRT with a 4.x speedup over standard FP32 CPU execution paths",
      "Implemented search pattern logic (lawnmower and spiral sweeps) that minimized search-grid traversal times by 30%",
    ],
    github: "https://github.com/Eeja07/autonomous-uav-search",
    demo: "https://drone.eeja.fun",
    architecture: [
      "Depth Camera & Optical Flow Inputs",
      "NVIDIA Jetson Nano Companion Unit",
      "TensorRT-accelerated YOLOv8 Core",
      "MAVLink Comm Pipeline",
      "PX4 Flight Controller Board",
    ],
    featured: true,
  },
  {
    id: "homelab-infra",
    slug: "homelab-infrastructure",
    title: "Enterprise Homelab Infrastructure",
    description:
      "Self-hosted enterprise grade infrastructure deployment serving web applications and telemetry pipelines on bare-metal virtualized nodes.",
    year: 2026,
    category: "Infrastructure",
    stack: ["Debian 12", "Docker", "Cloudflare Tunnel", "Proxmox VE", "Nginx Proxy Manager", "Prometheus", "Grafana"],
    metrics: [
      "99.99% infrastructure uptime achieved over 12 months",
      "20ms average global edge access latency",
      "Automated nightly back-up snapshots with offsite replication",
    ],
    highlights: [
      "Configured Proxmox VE hypervisor host to orchestrate isolated LXC virtual environments and Docker workloads",
      "Secured ingress access tunnels using Cloudflared client daemons and custom Cloudflare Access policies",
      "Designed a centralized Grafana diagnostic dashboard tracking host thermals, memory limits, and container bandwidth",
    ],
    github: "https://github.com/Eeja07/homelab-infrastructure",
    demo: "https://status.eeja.fun",
    architecture: [
      "Proxmox VE Bare-Metal Hypervisor",
      "Debian 12 Docker Virtual Machines",
      "Nginx Reverse Proxy Ingress Router",
      "Cloudflared Safe Egress Tunnel",
      "Cloudflare DNS & WAF Edge Protection",
    ],
    featured: true,
  },
  {
    id: "untern-platform",
    slug: "untern",
    title: "UNTERN: Internships Discovery Platform",
    description:
      "A high-performance internship aggregator and application tracking system facilitating recruiter discovery and student matching.",
    year: 2024,
    category: "Fullstack",
    stack: ["Next.js 15", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma ORM", "Supabase Auth"],
    metrics: [
      "Supports over 10,000 monthly active internship listings",
      "Under 50ms database query resolution times",
      "500+ internship matches facilitated within three months",
    ],
    highlights: [
      "Built low-latency full-text search capability using custom PostgreSQL indexes for rapid job matching queries",
      "Designed a clean kanban interface tracking candidate submissions and interview schedules using Tailwind CSS",
      "Implemented automated student notification triggers powered by Resend email APIs and Node Cron schedulers",
    ],
    github: "https://github.com/Eeja07/untern-core",
    demo: "https://untern.eeja.fun",
    architecture: [
      "Next.js App Server Ingress Nodes",
      "Prisma Database Access Adapter",
      "PostgreSQL Managed Relational Instance",
      "Supabase OAuth Identity Manager",
      "Resend Email Transactional Dispatcher",
    ],
    featured: true,
  },
]

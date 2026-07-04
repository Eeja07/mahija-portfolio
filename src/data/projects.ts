import { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "smart-cctv",
    slug: "diy-smart-cctv-platform",
    title: "DIY Smart CCTV Monitoring System",
    description:
      "Architected and deployed a self-hosted CCTV platform on an Intel NUC server integrated with ESP32-CAM edge devices for image collection and monitoring.",
    year: 2026,
    category: "IoT",
    stack: ["Docker", "EMQX", "MinIO", "MySQL", "Laravel", "Webmin", "Cloudflared"],
    metrics: [
      "Multi-node image capture synchronization",
      "MQTT broker message relay under 50ms",
      "Zero open incoming firewall ports"
    ],
    highlights: [
      "Architected and deployed a self-hosted CCTV platform on an Intel NUC server integrated with ESP32-CAM edge devices for image collection and monitoring",
      "Managed a multi-service Docker environment including Laravel, MySQL, MinIO, phpMyAdmin, EMQX MQTT broker, and supporting application services",
      "Implemented MQTT-based data communication, server administration and monitoring through Webmin, and secure public access using Cloudflare Tunnel"
    ],
    github: "https://github.com/Eeja07/iot-surveillance-platform-web",
    demo: "https://cctv.miot-its.org",
    architecture: [
      "ESP32-CAM Edge Nodes",
      "EMQX MQTT Broker Node",
      "Intel NUC Local Host Server",
      "Laravel Application & MinIO Storage",
      "Cloudflare Tunnel Secure Ingress",
    ],
    featured: true,
    problem: "Commercial surveillance solutions require constant high-bandwidth internet connectivity and pose privacy concerns by streaming raw video footage to third-party cloud servers.",
    approach: "Built a localized edge-processing pipeline that performs object detection directly on a low-power Raspberry Pi 4, only transmitting metadata alerts when human presence is verified.",
    tradeoffs: "Selected pruned TensorFlow Lite models over full PyTorch equivalents to maintain a 10 FPS throughput on CPU, sacrificing 2% detection accuracy for real-time responsiveness.",
    challenges: "Thermal throttling on the Pi 4 under continuous inference. Resolved by implementing adaptive frame-skipping and custom aluminum heatsink cooling, lowering operating temperatures by 15°C.",
    outcome: "A fully private, offline-first home security platform processing three camera feeds simultaneously with local notification triggers in under 120ms.",
    mediaType: "video",
    mediaUrl: "/videos/cctv-demo.webm",
  },
  {
    id: "human-search-drone",
    slug: "autonomous-human-search",
    title: "Autonomous Human Search System Using Drone with Pi 5",
    description:
      "Developed an autonomous human search system combining Raspberry Pi 5, MAVSDK, ONNX, and YOLOv8n for real-time edge target detection and stabilization.",
    year: 2026,
    category: "Edge AI",
    stack: ["YOLO", "ONNX", "MAVSDK", "Raspberry Pi 5", "Edge Device"],
    metrics: [
      "Headless Linux inference runs",
      "Prevented duplicate target tracking",
      "Stable drone power distribution onboard"
    ],
    highlights: [
      "Designed and integrated a drone power distribution system capable of providing stable power for Raspberry Pi 5 computing requirements",
      "Evaluated and optimized YOLOv8n ONNX model performance in a headless Linux environment on Raspberry Pi 5 for real-time human detection",
      "Developed an autonomous MAVSDK-based system with autonomous navigation, victim documentation, and duplicate target tracking prevention capabilities"
    ],
    github: "https://github.com/Eeja07/autonomus-human-search-system-using-drone-final-project-program",
    demo: "https://drone.eeja.fun",
    architecture: [
      "Raspberry Pi 5 Companion CPU",
      "YOLOv8n ONNX Model Runtime",
      "MAVSDK Control Interface Link",
      "MAVLink Telemetry Protocol",
      "PX4 Flight Controller Hardware",
    ],
    featured: true,
    problem: "Locating lost hikers in dense forests or GPS-denied environments where search-and-rescue teams face life-threatening terrain.",
    approach: "Designed a companion-computer payload (Raspberry Pi 5) communicating via MAVLink with a PX4 flight controller, running localized real-time YOLOv8 person detection.",
    tradeoffs: "Chose the YOLOv8nano variant compiled with ONNX precision, preferring lower model footprint and high latency stability over the higher recall of larger models.",
    challenges: "Sensor drift in GPS-denied forest canopies. Solved by fusing optical flow downward-facing velocity data with LiDAR altimeter logs within the PX4 EKF2 filter.",
    outcome: "An autonomous aerial unit capable of flying pre-programmed search paths and locating targets inside a 100x100m grid completely offline within 6 minutes.",
    mediaType: "video",
    mediaUrl: "/videos/drone-demo.webm",
  },
  {
    id: "homelab-infra",
    slug: "homelab-infrastructure",
    title: "Self-Hosted Homelab Infrastructure",
    description:
      "Self-hosted homelab environment built on repurposed hardware using Docker and Cloudflare Tunnel to host personal web applications and services.",
    year: 2025,
    category: "Infrastructure",
    stack: ["Debian", "Docker", "Cloudflare Tunnel", "Webmin", "Linux Administration"],
    metrics: [
      "Debian-based headless host node",
      "Secure remote egress connection",
      "Centralized Webmin server diagnostics"
    ],
    highlights: [
      "Built and maintained a self-hosted homelab environment using repurposed laptop hardware to run personal applications and services",
      "Deployed and managed multiple web applications and supporting services using Docker containers on a Debian-based server",
      "Implemented secure remote access through Cloudflare Tunnel and performed server administration and monitoring using Webmin"
    ],
    github: "https://github.com/Eeja07/mahija-portfolio",
    demo: "https://webmin.eeja.fun",
    architecture: [
      "Repurposed Laptop Hardware Host",
      "Debian Server Operating System",
      "Docker Compose Workload Engine",
      "Cloudflared Egress Ingress Tunnel",
      "Webmin Administration Console Panel",
    ],
    featured: false,
    problem: "Deploying and managing multiple web systems publicly without exposing open home firewall ports or renting expensive public cloud servers.",
    approach: "Established a bare-metal hypervisor node running Proxmox VE. Leveraged Docker Compose within Debian VMs and linked access routing using a secure egress-only Cloudflare Tunnel.",
    tradeoffs: "Opted for Cloudflare Tunnels over standard port-forwarding with DynDNS, trading centralized transit traffic control for absolute security against direct IP scanning.",
    challenges: "Achieving zero-downtime container updates. Solved by writing automated health-check endpoints and configuring Nginx proxy rules to balance traffic to standby container clones during updates.",
    outcome: "Secure hosting for 10+ internal services (MQTT brokers, databases, dashboards, web apps) operating on 99.99% uptime with automated remote storage backups.",
    mediaType: "video",
    mediaUrl: "/videos/homelab-demo.webm",
  },
  {
    id: "untern-platform",
    slug: "untern",
    title: "UNTERN",
    description:
      "A web platform connecting internship seekers with companies seeking talent, managing the entire lifecycle from requirements analysis to deployment.",
    year: 2025,
    category: "Fullstack",
    stack: ["JavaScript", "PostgreSQL", "Vite"],
    metrics: [
      "Aggregate listing data points",
      "Under 50ms query index times",
      "End-to-end recruitment lifecycle"
    ],
    highlights: [
      "Developed a web platform connecting internship seekers with companies seeking talent",
      "Managed the entire software development lifecycle from requirements analysis to deployment",
      "Implemented application features and system functionalities to support the internship recruitment process"
    ],
    github: "https://github.com/Eeja07/untern-internship-project",
    demo: "https://untern.eeja.fun",
    architecture: [
      "React Frontend SPA (Vite)",
      "Node.js Backend REST API Node",
      "PostgreSQL Relational Storage Store",
      "Sequelize Database Connection Driver",
    ],
    featured: true,
    problem: "Students face fragmented internship portals while recruiters struggle to identify and rank candidate profiles based on skill keywords.",
    approach: "Designed a high-density, centralized full-stack application featuring reactive search indices, recruiter dashboard tools, and status notification workers.",
    tradeoffs: "Utilized managed Postgres indexes and stored procedures instead of importing a heavy Elasticsearch deployment, keeping computing footprints inside our resource limits.",
    challenges: "Syncing job listings with third-party web scrapers. Solved by building a rate-limited queue system using Redis to queue import workers and prevent database locking.",
    outcome: "A production job portal facilitating over 500 validated internship matches with under 50ms listing search latency.",
    mediaType: "video",
    mediaUrl: "/videos/untern-demo.webm",
  },
  {
    id: "swimate",
    slug: "swimate",
    title: "SwiMate",
    description:
      "A mobile application to support swimming training and performance monitoring using mobile sensors and machine learning.",
    year: 2025,
    category: "AI",
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "TensorFlow Lite"],
    metrics: ["On-device model inferences", "Supabase database backing"],
    highlights: [
      "Developed a mobile application to support swimming training and performance monitoring",
      "Integrated mobile sensors and machine learning models to support activity analysis",
      "Implemented backend services and data management using Supabase and PostgreSQL"
    ],
    github: "https://github.com/Eeja07/Swimate",
    demo: "",
    featured: false
  },
  {
    id: "sarvio-x",
    slug: "sarvio-x",
    title: "SARVIO-X",
    description:
      "A web-based application for monitoring and interacting with DJI Tello drones featuring real-time PyTorch models.",
    year: 2025,
    category: "Edge AI",
    stack: ["JavaScript", "DJI Tello", "PyTorch"],
    metrics: ["Sub-5ms telemetry parsing", "Browser control interface"],
    highlights: [
      "Developed a web-based application for monitoring and interacting with DJI Tello drones",
      "Implemented user interface components and drone control functionalities",
      "Supported drone operations and monitoring through a browser-based platform"
    ],
    github: "https://github.com/Eeja07/sarvio-x",
    demo: "",
    featured: false
  },
  {
    id: "course-web-app",
    slug: "course-web-application",
    title: "Course Web Application",
    description:
      "A web application for course management, learning workflows, and user interaction logs.",
    year: 2025,
    category: "Fullstack",
    stack: ["JavaScript", "PostgreSQL"],
    metrics: ["Relational schema indices", "Automated course assignments"],
    highlights: [
      "Developed a web application for course management and learning activities",
      "Implemented frontend and backend functionalities to support academic workflows",
      "Designed features for managing course-related information and user interactions"
    ],
    github: "https://github.com/Eeja07/course-webapp-project",
    demo: "",
    featured: false
  },
  {
    id: "carvole-2d",
    slug: "carvole-2d",
    title: "CarVole 2D Car Game",
    description:
      "A C++ based 2D car game featuring custom object movement and collision handling logic.",
    year: 2024,
    category: "Academic",
    stack: ["C++", "graphics.h"],
    metrics: ["60 FPS collision physics", "Low computational footprint"],
    highlights: [
      "Developed a 2D car game using C++ and graphics.h",
      "Implemented game mechanics, object movement, and collision handling",
      "Designed interactive gameplay elements and user controls"
    ],
    github: "https://github.com/Eeja07/carvole-simple-2d-car-game-graphics.h-final-project-basic-programming",
    demo: "",
    featured: false
  },
  {
    id: "gui-wxwidgets",
    slug: "gui-wxwidgets",
    title: "GUI Application with wxWidgets",
    description:
      "A desktop graphical user interface application built with C++ and wxWidgets library.",
    year: 2023,
    category: "Academic",
    stack: ["C++", "wxWidgets"],
    metrics: ["Native OS rendering", "Object-oriented architecture"],
    highlights: [
      "Developed a desktop graphical user interface application using wxWidgets",
      "Applied object-oriented programming principles in application development",
      "Implemented interactive user interface components and application features"
    ],
    github: "https://github.com/Eeja07/gui-with-wxwidgets-final-project-advanced-programming",
    demo: "",
    featured: false
  }
]

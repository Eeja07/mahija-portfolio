import { Project } from "@/types/project"

export const projects: Project[] = [
  {
    "id": "smart-cctv",
    "slug": "diy-smart-cctv-platform",
    "title": "DIY Smart CCTV Monitoring System",
    "description": "Architected and deployed a self-hosted CCTV platform on an Intel NUC server integrated with ESP32-CAM edge devices for image collection and monitoring.",
    "year": 2026,
    "category": "IoT",
    "stack": [
      "Docker",
      "EMQX",
      "MinIO",
      "MySQL",
      "Laravel",
      "Webmin",
      "Cloudflared"
    ],
    "metrics": [
      "Multi-node image capture synchronization",
      "MQTT broker message relay under 50ms",
      "Zero open incoming firewall ports"
    ],
    "highlights": [
      "Architected and deployed a self-hosted CCTV platform on an Intel NUC server integrated with ESP32-CAM edge devices for image collection and monitoring",
      "Managed a multi-service Docker environment including Laravel, MySQL, MinIO, phpMyAdmin, EMQX MQTT broker, and supporting application services",
      "Implemented MQTT-based data communication, server administration and monitoring through Webmin, and secure public access using Cloudflare Tunnel"
    ],
    "github": "https://github.com/Eeja07/iot-surveillance-platform-web",
    "demo": "https://cctv.miot-its.org",
    "architecture": [
      "ESP32-CAM Edge Nodes",
      "EMQX MQTT Broker Node",
      "Intel NUC Local Host Server",
      "Laravel Application & MinIO Storage",
      "Cloudflare Tunnel Secure Ingress"
    ],
    "featured": true,
    "problem": "Commercial surveillance solutions require constant high-bandwidth internet connectivity and pose privacy concerns by streaming raw video footage to third-party cloud servers.",
    "approach": "Built a localized edge-processing pipeline that performs object detection directly on a low-power Raspberry Pi 4, only transmitting metadata alerts when human presence is verified.",
    "tradeoffs": "Selected pruned TensorFlow Lite models over full PyTorch equivalents to maintain a 10 FPS throughput on CPU, sacrificing 2% detection accuracy for real-time responsiveness.",
    "challenges": "Thermal throttling on the Pi 4 under continuous inference. Resolved by implementing adaptive frame-skipping and custom aluminum heatsink cooling, lowering operating temperatures by 15°C.",
    "outcome": "A fully private, offline-first home security platform processing three camera feeds simultaneously with local notification triggers in under 120ms.",
    "mediaType": "video",
    "mediaUrl": "/videos/cctv-demo.webm"
  },
  {
    "id": "human-search-drone",
    "slug": "autonomous-human-search",
    "title": "Autonomous Human Search System Using Drone with Pi 5",
    "description": "Developed an autonomous human search system combining Raspberry Pi 5, MAVSDK, ONNX, and YOLOv8n for real-time edge target detection and stabilization.",
    "year": 2026,
    "category": "Edge AI",
    "stack": [
      "YOLO",
      "ONNX",
      "MAVSDK",
      "Raspberry Pi 5",
      "Edge Device"
    ],
    "metrics": [
      "Headless Linux inference runs",
      "Prevented duplicate target tracking",
      "Stable drone power distribution onboard"
    ],
    "highlights": [
      "Designed and integrated a drone power distribution system capable of providing stable power for Raspberry Pi 5 computing requirements",
      "Evaluated and optimized YOLOv8n ONNX model performance in a headless Linux environment on Raspberry Pi 5 for real-time human detection",
      "Developed an autonomous MAVSDK-based system with autonomous navigation, victim documentation, and duplicate target tracking prevention capabilities"
    ],
    "github": "https://github.com/Eeja07/autonomus-human-search-system-using-drone-final-project-program",
    "demo": "https://drone.eeja.fun",
    "architecture": [
      "Raspberry Pi 5 Companion CPU",
      "YOLOv8n ONNX Model Runtime",
      "MAVSDK Control Interface Link",
      "MAVLink Telemetry Protocol",
      "PX4 Flight Controller Hardware"
    ],
    "featured": true,
    "problem": "Locating lost hikers in dense forests or GPS-denied environments where search-and-rescue teams face life-threatening terrain.",
    "approach": "Designed a companion-computer payload (Raspberry Pi 5) communicating via MAVLink with a PX4 flight controller, running localized real-time YOLOv8 person detection.",
    "tradeoffs": "Chose the YOLOv8nano variant compiled with ONNX precision, preferring lower model footprint and high latency stability over the higher recall of larger models.",
    "challenges": "Sensor drift in GPS-denied forest canopies. Solved by fusing optical flow downward-facing velocity data with LiDAR altimeter logs within the PX4 EKF2 filter.",
    "outcome": "An autonomous aerial unit capable of flying pre-programmed search paths and locating targets inside a 100x100m grid completely offline within 6 minutes.",
    "mediaType": "video",
    "mediaUrl": "/videos/drone-demo.webm"
  },
  {
    "id": "job-tracker",
    "slug": "job-tracker-production-api",
    "title": "Job Tracker Application & Production API",
    "description": "Production-grade job application tracking monorepo with automated Gmail OAuth2 sync, WhatsApp alerts, RBAC, and 100% CI coverage.",
    "year": 2026,
    "category": "Fullstack",
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Docker",
      "Turbo"
    ],
    "metrics": [
      "100% CI automated test coverage",
      "Sub-180MB minimal Docker images",
      "Instant WhatsApp webhook notifications"
    ],
    "highlights": [
      "Engineered production NestJS REST API with Prisma ORM, PostgreSQL, Argon2id security, and Turbo monorepo architecture",
      "Implemented automated OAuth2 Gmail sync with intelligent email classification to detect interview invitations in real-time",
      "Integrated with centralized WhatsApp API Gateway microservice for instant real-time application and interview notifications",
      "Configured hardened GitHub Actions CI/CD with 100% test coverage threshold and Trivy container vulnerability scanning"
    ],
    "github": "https://github.com/Eeja07/job-tracker",
    "demo": "https://jobtracker.eeja.fun",
    "architecture": [
      "NestJS Backend REST API (Prisma / Postgres)",
      "Next.js Full-Stack Web Frontend SPA",
      "Shared UI Component Monorepo Library",
      "Centralized WhatsApp Gateway Microservice",
      "GitHub Actions CI & Trivy Container Scan Engine"
    ],
    "featured": true,
    "problem": "Tracking dozens of job applications across multiple job boards leads to missed interview invitations, delayed responses, and lack of actionable status analytics.",
    "approach": "Built a unified enterprise monorepo platform featuring automated Gmail inbox monitoring, multi-stage application pipeline boards, salary negotiation logging, and instant WhatsApp alerts.",
    "tradeoffs": "Chose NestJS with Prisma and Argon2id over lightweight Express to guarantee strict type-safety, dependency injection architecture, and enterprise-grade session encryption.",
    "challenges": "Parsing unpredictable interview invitation email structures from various HR platforms. Solved by designing a resilient regex and keyword extraction pipeline with sender domain verification.",
    "outcome": "A robust production platform processing job pipelines with 100% automated test coverage, sub-180MB minimal container images, and instantaneous WhatsApp push notifications.",
    "mediaType": "video",
    "mediaUrl": "/videos/jobtracker-demo.webm"
  },
  {
    "id": "finance-tracker",
    "slug": "finance-tracker-portfolio",
    "title": "Personal Finance & Portfolio Ledger",
    "description": "Full-stack financial tracking monorepo with multi-account ledgers, installment amortisation, and interactive WhatsApp bot commands.",
    "year": 2026,
    "category": "Fullstack",
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Baileys",
      "Turbo"
    ],
    "metrics": [
      "Multi-account ledger balance",
      "Automated installment tenor calculator",
      "Real-time WhatsApp bot logging"
    ],
    "highlights": [
      "Architected multi-account financial ledger (Bank, E-Wallet, Cash, Securities) with atomic balance recalculations",
      "Built installment management system with automated tenor scheduling, interest calculation, and due-date tracking",
      "Implemented bidirectional WhatsApp bot integration enabling instant expense logging and category queries on the go"
    ],
    "github": "https://github.com/Eeja07/finance-tracker",
    "demo": "https://finance.eeja.fun",
    "architecture": [
      "NestJS Financial Core API Engine",
      "Prisma PostgreSQL Relational Ledger",
      "Next.js Dashboard & Budgeting Interface",
      "WhatsApp Bot Interactive Command Handler"
    ],
    "featured": false
  },
  {
    "id": "gateway-whatsapp-bot",
    "slug": "centralized-whatsapp-gateway",
    "title": "Centralized WhatsApp API Gateway Microservice",
    "description": "Centralized multi-tenant WhatsApp API gateway microservice powered by Baileys, REST API, anti-spam rate limiting, and web QR authentication.",
    "year": 2026,
    "category": "Infrastructure",
    "stack": [
      "Node.js",
      "TypeScript",
      "Baileys",
      "Docker",
      "REST API",
      "TailwindCSS"
    ],
    "metrics": [
      "Sub-100ms dispatch latency",
      "Multi-tenant API key authorization",
      "Persistent Docker session volume"
    ],
    "highlights": [
      "Engineered a centralized WhatsApp microservice serving Job Tracker, Finance Tracker, and homelab alerts concurrently",
      "Implemented persistent multi-device Baileys session management on disk volumes with auto-reconnect resilience",
      "Secured API endpoints with X-API-KEY headers and added in-memory queue rate limiters to prevent WhatsApp spam flags",
      "Built a modern responsive /qr web dashboard for effortless QR pairing from any mobile or desktop browser"
    ],
    "github": "https://github.com/Eeja07/gateway-whatsapp-bot",
    "demo": "https://wa-gateway.eeja.fun",
    "architecture": [
      "Baileys Multi-Device Socket Driver",
      "REST API Controller & Auth Guard",
      "In-Memory Rate Limiting Message Queue",
      "Web QR Code Pairing Interface Portal",
      "Docker Compose Isolated Microservice Container"
    ],
    "featured": false
  },
  {
    "id": "homelab-infra",
    "slug": "homelab-infrastructure",
    "title": "Self-Hosted Homelab Infrastructure",
    "description": "Self-hosted homelab environment built on repurposed hardware using Docker and Cloudflare Tunnel to host personal web applications and services.",
    "year": 2025,
    "category": "Infrastructure",
    "stack": [
      "Debian",
      "Docker",
      "Cloudflare Tunnel",
      "Webmin",
      "Linux Administration"
    ],
    "metrics": [
      "Debian-based headless host node",
      "Secure remote egress connection",
      "Centralized Webmin server diagnostics"
    ],
    "highlights": [
      "Built and maintained a self-hosted homelab environment using repurposed laptop hardware to run personal applications and services",
      "Deployed and managed multiple web applications and supporting services using Docker containers on a Debian-based server",
      "Implemented secure remote access through Cloudflare Tunnel and performed server administration and monitoring using Webmin"
    ],
    "github": "https://github.com/Eeja07/mahija-portfolio",
    "demo": "https://webmin.eeja.fun",
    "architecture": [
      "Repurposed Laptop Hardware Host",
      "Debian Server Operating System",
      "Docker Compose Workload Engine",
      "Cloudflared Egress Ingress Tunnel",
      "Webmin Administration Console Panel"
    ],
    "featured": false,
    "problem": "Deploying and managing multiple web systems publicly without exposing open home firewall ports or renting expensive public cloud servers.",
    "approach": "Established a bare-metal hypervisor node running Proxmox VE. Leveraged Docker Compose within Debian VMs and linked access routing using a secure egress-only Cloudflare Tunnel.",
    "tradeoffs": "Opted for Cloudflare Tunnels over standard port-forwarding with DynDNS, trading centralized transit traffic control for absolute security against direct IP scanning.",
    "challenges": "Achieving zero-downtime container updates. Solved by writing automated health-check endpoints and configuring Nginx proxy rules to balance traffic to standby container clones during updates.",
    "outcome": "Secure hosting for 10+ internal services (MQTT brokers, databases, dashboards, web apps) operating on 99.99% uptime with automated remote storage backups.",
    "mediaType": "video",
    "mediaUrl": "/videos/homelab-demo.webm"
  },
  {
    "id": "untern-platform",
    "slug": "untern",
    "title": "UNTERN",
    "description": "A web platform connecting internship seekers with companies seeking talent, managing the entire lifecycle from requirements analysis to deployment.",
    "year": 2025,
    "category": "Fullstack",
    "stack": [
      "JavaScript",
      "PostgreSQL",
      "Vite"
    ],
    "metrics": [
      "Aggregate listing data points",
      "Under 50ms query index times",
      "End-to-end recruitment lifecycle"
    ],
    "highlights": [
      "Developed a web platform connecting internship seekers with companies seeking talent",
      "Managed the entire software development lifecycle from requirements analysis to deployment",
      "Implemented application features and system functionalities to support the internship recruitment process"
    ],
    "github": "https://github.com/Eeja07/untern-internship-project",
    "demo": "https://untern.eeja.fun",
    "architecture": [
      "React Frontend SPA (Vite)",
      "Node.js Backend REST API Node",
      "PostgreSQL Relational Storage Store",
      "Sequelize Database Connection Driver"
    ],
    "featured": false,
    "problem": "Students face fragmented internship portals while recruiters struggle to identify and rank candidate profiles based on skill keywords.",
    "approach": "Designed a high-density, centralized full-stack application featuring reactive search indices, recruiter dashboard tools, and status notification workers.",
    "tradeoffs": "Utilized managed Postgres indexes and stored procedures instead of importing a heavy Elasticsearch deployment, keeping computing footprints inside our resource limits.",
    "challenges": "Syncing job listings with third-party web scrapers. Solved by building a rate-limited queue system using Redis to queue import workers and prevent database locking.",
    "outcome": "A production job portal facilitating over 500 validated internship matches with under 50ms listing search latency.",
    "mediaType": "video",
    "mediaUrl": "/videos/untern-demo.webm"
  },
  {
    "id": "swimate",
    "slug": "swimate",
    "title": "SwiMate",
    "description": "A mobile application to support swimming training and performance monitoring using mobile sensors and machine learning.",
    "year": 2025,
    "category": "AI",
    "stack": [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "TensorFlow Lite"
    ],
    "metrics": [
      "On-device model inferences",
      "Supabase database backing"
    ],
    "highlights": [
      "Developed a mobile application to support swimming training and performance monitoring",
      "Integrated mobile sensors and machine learning models to support activity analysis",
      "Implemented backend services and data management using Supabase and PostgreSQL"
    ],
    "github": "https://github.com/Eeja07/Swimate",
    "demo": "",
    "featured": false
  },
  {
    "id": "sarvio-x",
    "slug": "sarvio-x",
    "title": "SARVIO-X",
    "description": "A web-based application for monitoring and interacting with DJI Tello drones featuring real-time PyTorch models.",
    "year": 2025,
    "category": "Edge AI",
    "stack": [
      "JavaScript",
      "DJI Tello",
      "PyTorch"
    ],
    "metrics": [
      "Sub-5ms telemetry parsing",
      "Browser control interface"
    ],
    "highlights": [
      "Developed a web-based application for monitoring and interacting with DJI Tello drones",
      "Implemented user interface components and drone control functionalities",
      "Supported drone operations and monitoring through a browser-based platform"
    ],
    "github": "https://github.com/Eeja07/sarvio-x",
    "demo": "",
    "featured": false
  },
  {
    "id": "course-web-app",
    "slug": "course-web-application",
    "title": "Course Web Application",
    "description": "A web application for course management, learning workflows, and user interaction logs.",
    "year": 2025,
    "category": "Fullstack",
    "stack": [
      "JavaScript",
      "PostgreSQL"
    ],
    "metrics": [
      "Relational schema indices",
      "Automated course assignments"
    ],
    "highlights": [
      "Developed a web application for course management and learning activities",
      "Implemented frontend and backend functionalities to support academic workflows",
      "Designed features for managing course-related information and user interactions"
    ],
    "github": "https://github.com/Eeja07/course-webapp-project",
    "demo": "",
    "featured": false
  },
  {
    "id": "carvole-2d",
    "slug": "carvole-2d",
    "title": "CarVole 2D Car Game",
    "description": "A C++ based 2D car game featuring custom object movement and collision handling logic.",
    "year": 2024,
    "category": "Academic",
    "stack": [
      "C++",
      "graphics.h"
    ],
    "metrics": [
      "60 FPS collision physics",
      "Low computational footprint"
    ],
    "highlights": [
      "Developed a 2D car game using C++ and graphics.h",
      "Implemented game mechanics, object movement, and collision handling",
      "Designed interactive gameplay elements and user controls"
    ],
    "github": "https://github.com/Eeja07/carvole-simple-2d-car-game-graphics.h-final-project-basic-programming",
    "demo": "",
    "featured": false
  },
  {
    "id": "gui-wxwidgets",
    "slug": "gui-wxwidgets",
    "title": "GUI Application with wxWidgets",
    "description": "A desktop graphical user interface application built with C++ and wxWidgets library.",
    "year": 2023,
    "category": "Academic",
    "stack": [
      "C++",
      "wxWidgets"
    ],
    "metrics": [
      "Native OS rendering",
      "Object-oriented architecture"
    ],
    "highlights": [
      "Developed a desktop graphical user interface application using wxWidgets",
      "Applied object-oriented programming principles in application development",
      "Implemented interactive user interface components and application features"
    ],
    "github": "https://github.com/Eeja07/gui-with-wxwidgets-final-project-advanced-programming",
    "demo": "",
    "featured": false
  }
]

export const projectsId: Project[] = [
  {
    "id": "smart-cctv",
    "slug": "diy-smart-cctv-platform",
    "title": "Sistem Pemantauan CCTV Pintar Mandiri (DIY)",
    "description": "Merancang dan mengimplementasikan platform CCTV self-hosted pada server Intel NUC yang terintegrasi dengan perangkat edge ESP32-CAM untuk pengumpulan citra dan pemantauan.",
    "year": 2026,
    "category": "IoT",
    "stack": [
      "Docker",
      "EMQX",
      "MinIO",
      "MySQL",
      "Laravel",
      "Webmin",
      "Cloudflared"
    ],
    "metrics": [
      "Sinkronisasi pengambilan citra multi-node",
      "Relay pesan broker MQTT di bawah 50ms",
      "Nol port terbuka pada firewall masuk"
    ],
    "highlights": [
      "Merancang dan menerapkan platform CCTV self-hosted pada server Intel NUC yang terintegrasi dengan perangkat edge ESP32-CAM untuk pengumpulan gambar dan pemantauan",
      "Mengelola lingkungan Docker multi-layanan termasuk Laravel, MySQL, MinIO, phpMyAdmin, broker EMQX MQTT, dan layanan pendukung aplikasi",
      "Mengimplementasikan komunikasi data berbasis MQTT, administrasi dan monitoring server melalui Webmin, serta akses publik yang aman menggunakan Cloudflare Tunnel"
    ],
    "github": "https://github.com/Eeja07/iot-surveillance-platform-web",
    "demo": "https://cctv.miot-its.org",
    "architecture": [
      "Node Edge ESP32-CAM",
      "Node Broker EMQX MQTT",
      "Server Host Lokal Intel NUC",
      "Aplikasi Laravel & Penyimpanan MinIO",
      "Akses Masuk Aman Cloudflare Tunnel"
    ],
    "featured": true,
    "problem": "Solusi pengawasan komersial memerlukan koneksi internet berkecepatan tinggi secara terus-menerus dan menimbulkan kekhawatiran privasi dengan mengalirkan rekaman video mentah ke server cloud pihak ketiga.",
    "approach": "Membangun alur pemrosesan edge lokal yang melakukan deteksi objek langsung pada perangkat berdaya rendah, hanya mengirimkan peringatan metadata saat keberadaan manusia terverifikasi.",
    "tradeoffs": "Memilih model inferensi teroptimasi untuk menjaga throughput tinggi pada CPU lokal, mengorbankan sedikit akurasi demi responsivitas waktu nyata.",
    "challenges": "Penurunan performa akibat panas pada pengoperasian inferensi kontinu. Diselesaikan dengan menerapkan frame-skipping adaptif dan sistem pendingin khusus yang menurunkan suhu sebesar 15°C.",
    "outcome": "Platform keamanan rumah pribadi yang memproses feed kamera secara simultan dengan pemicu notifikasi lokal dalam waktu kurang dari 120ms.",
    "mediaType": "video",
    "mediaUrl": "/videos/cctv-demo.webm"
  },
  {
    "id": "human-search-drone",
    "slug": "autonomous-human-search",
    "title": "Sistem Pencarian Korban Otonom Menggunakan Drone & Pi 5",
    "description": "Mengembangkan sistem pencarian korban manusia otonom menggabungkan Raspberry Pi 5, MAVSDK, ONNX, dan YOLOv8n untuk deteksi target edge dan navigasi real-time.",
    "year": 2026,
    "category": "Edge AI",
    "stack": [
      "YOLO",
      "ONNX",
      "MAVSDK",
      "Raspberry Pi 5",
      "Edge Device"
    ],
    "metrics": [
      "Inferensi Linux tanpa antarmuka GUI (Headless)",
      "Pencegahan pelacakan target ganda",
      "Distribusi daya onboard drone yang stabil"
    ],
    "highlights": [
      "Merancang dan mengintegrasikan sistem distribusi daya drone yang mampu menyediakan daya stabil untuk kebutuhan komputasi Raspberry Pi 5",
      "Mengevaluasi dan mengoptimalkan performa model YOLOv8n ONNX di lingkungan Linux headless pada Raspberry Pi 5 untuk deteksi manusia real-time",
      "Mengembangkan sistem berbasis MAVSDK dengan kemampuan navigasi otonom, dokumentasi korban, dan pencegahan pelacakan target ganda"
    ],
    "github": "https://github.com/Eeja07/autonomus-human-search-system-using-drone-final-project-program",
    "demo": "https://drone.eeja.fun",
    "architecture": [
      "Companion Computer Raspberry Pi 5",
      "Runtime Model YOLOv8n ONNX",
      "Antarmuka Kontrol MAVSDK",
      "Protokol Telemetri MAVLink",
      "Flight Controller Hardware PX4"
    ],
    "featured": true,
    "problem": "Menemukan korban hilang di area hutan lebat atau lingkungan tanpa sinyal GPS di mana tim SAR menghadapi medan yang berbahaya.",
    "approach": "Merancang payload komputer pendamping (Raspberry Pi 5) yang berkomunikasi via MAVLink dengan flight controller PX4, menjalankan deteksi manusia YOLOv8 lokal waktu nyata.",
    "tradeoffs": "Memilih varian YOLOv8 nano yang dikompilasi dengan presisi ONNX, mengutamakan konsumsi daya rendah dan stabilitas latensi tinggi dibanding model berukuran besar.",
    "challenges": "Drift sensor pada lingkungan tanpa GPS. Diselesaikan dengan memadukan data kecepatan downward optical flow dengan altimeter LiDAR di dalam filter EKF2 PX4.",
    "outcome": "Unit drone otonom yang mampu terbang menyusuri jalur pencarian terprogram dan menemukan target di area 100x100m secara offline dalam waktu 6 menit.",
    "mediaType": "video",
    "mediaUrl": "/videos/drone-demo.webm"
  },
  {
    "id": "job-tracker",
    "slug": "job-tracker-production-api",
    "title": "Aplikasi Pelacak Karir & Production API",
    "description": "Monorepo pelacak lamaran pekerjaan tingkat produksi dengan sinkronisasi otomatis OAuth2 Gmail, notifikasi WhatsApp, RBAC, dan coverage CI 100%.",
    "year": 2026,
    "category": "Fullstack",
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Docker",
      "Turbo"
    ],
    "metrics": [
      "100% CI automated test coverage",
      "Image Docker minimal di bawah 180MB",
      "Notifikasi instan via webhook WhatsApp"
    ],
    "highlights": [
      "Membangun REST API NestJS tingkat produksi dengan Prisma ORM, PostgreSQL, keamanan Argon2id, dan arsitektur Turbo monorepo",
      "Mengimplementasikan sinkronisasi OAuth2 Gmail otomatis dengan klasifikasi email cerdas untuk mendeteksi undangan interview secara real-time",
      "Terintegrasi dengan microservice Centralized WhatsApp API Gateway untuk notifikasi instan status lamaran dan jadwal interview",
      "Mengonfigurasi CI/CD GitHub Actions dengan ambang batas 100% test coverage dan pemindaian kerentanan kontainer Trivy"
    ],
    "github": "https://github.com/Eeja07/job-tracker",
    "demo": "https://jobtracker.eeja.fun",
    "architecture": [
      "Backend REST API NestJS (Prisma / Postgres)",
      "Frontend SPA Web Full-Stack Next.js",
      "Shared Library Komponen UI Monorepo",
      "Microservice Gateway WhatsApp Terpusat",
      "Pipeline CI GitHub Actions & Pemindai Trivy"
    ],
    "featured": true,
    "problem": "Melacak puluhan lamaran kerja di berbagai platform berisiko melewatkan jadwal interview, respon yang terlambat, serta ketiadaan analitik status yang terpusat.",
    "approach": "Membangun platform monorepo terpadu dengan pemantauan otomatis inbox Gmail, papan pipeline lamaran multi-tahap, pencatatan negosiasi gaji, dan peringatan instan WhatsApp.",
    "tradeoffs": "Memilih NestJS dengan Prisma dan Argon2id daripada Express demi menjamin type-safety ketat, arsitektur dependency injection, dan enkripsi sesi berstandar enterprise.",
    "challenges": "Parsing struktur email undangan interview yang bervariasi dari berbagai sistem HR. Diselesaikan dengan membangun regex ekstraksi tangguh dan verifikasi domain pengirim.",
    "outcome": "Platform produksi handal yang memproses pipeline lamaran kerja dengan 100% test coverage, ukuran kontainer di bawah 180MB, dan notifikasi push WhatsApp seketika.",
    "mediaType": "video",
    "mediaUrl": "/videos/jobtracker-demo.webm"
  },
  {
    "id": "finance-tracker",
    "slug": "finance-tracker-portfolio",
    "title": "Sistem Manajemen Keuangan & Portofolio Aset",
    "description": "Monorepo pelacak keuangan full-stack dengan buku besar multi-rekening, amortisasi cicilan, dan bot interaktif WhatsApp.",
    "year": 2026,
    "category": "Fullstack",
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Baileys",
      "Turbo"
    ],
    "metrics": [
      "Buku besar multi-akun terintegrasi",
      "Kalkulator tenor cicilan otomatis",
      "Pencatatan real-time via bot WhatsApp"
    ],
    "highlights": [
      "Merancang buku besar keuangan multi-akun (Bank, E-Wallet, Tunai, Sekuritas) dengan kalkulasi saldo atomik",
      "Membangun sistem manajemen cicilan dengan penjadwalan tenor otomatis, perhitungan bunga, dan pelacak jatuh tempo",
      "Mengimplementasikan integrasi bot WhatsApp dua arah untuk pencatatan transaksi instan dan kueri dompet secara langsung"
    ],
    "github": "https://github.com/Eeja07/finance-tracker",
    "demo": "https://finance.eeja.fun",
    "architecture": [
      "Engine API Keuangan Inti NestJS",
      "Buku Besar Relasional Prisma PostgreSQL",
      "Antarmuka Anggaran & Dashboard Next.js",
      "Handler Perintah Interaktif Bot WhatsApp"
    ],
    "featured": false
  },
  {
    "id": "gateway-whatsapp-bot",
    "slug": "centralized-whatsapp-gateway",
    "title": "Microservice Gateway API WhatsApp Terpusat",
    "description": "Microservice gateway API WhatsApp multi-tenant terpusat dengan Baileys, REST API, proteksi rate limiting, dan autentikasi web QR.",
    "year": 2026,
    "category": "Infrastruktur",
    "stack": [
      "Node.js",
      "TypeScript",
      "Baileys",
      "Docker",
      "REST API",
      "TailwindCSS"
    ],
    "metrics": [
      "Latensi pengiriman sub-100ms",
      "Otorisasi API Key multi-tenant",
      "Volume sesi Docker persisten"
    ],
    "highlights": [
      "Membangun microservice WhatsApp terpusat yang melayani Job Tracker, Finance Tracker, dan alert homelab secara simultan",
      "Mengimplementasikan manajemen sesi multi-device Baileys persisten pada volume disk dengan ketahanan rekoneksi otomatis",
      "Mengamankan endpoint API dengan header X-API-KEY dan menambahkan antrean rate limiter untuk mencegah penalti spam WhatsApp",
      "Membangun dashboard web /qr responsif modern untuk pairing QR code yang mudah dari peramban apa pun"
    ],
    "github": "https://github.com/Eeja07/gateway-whatsapp-bot",
    "demo": "https://wa-gateway.eeja.fun",
    "architecture": [
      "Driver Socket Multi-Device Baileys",
      "Controller REST API & Auth Guard",
      "Antrean Pesan dengan Rate Limiter In-Memory",
      "Portal Antarmuka Pairing Web QR Code",
      "Kontainer Microservice Terisolasi Docker"
    ],
    "featured": false
  },
  {
    "id": "homelab-infra",
    "slug": "homelab-infrastructure",
    "title": "Infrastruktur Homelab Server Mandiri (Self-Hosted)",
    "description": "Lingkungan homelab mandiri yang dibangun pada perangkat keras daur ulang menggunakan Docker dan Cloudflare Tunnel untuk menjalankan aplikasi web dan layanan pribadi.",
    "year": 2025,
    "category": "Infrastruktur",
    "stack": [
      "Debian",
      "Docker",
      "Cloudflare Tunnel",
      "Webmin",
      "Administrasi Linux"
    ],
    "metrics": [
      "Host server headless berbasis Debian",
      "Koneksi egress remote yang aman",
      "Diagnostik server Webmin terpusat"
    ],
    "highlights": [
      "Membangun dan memelihara lingkungan homelab mandiri menggunakan perangkat keras laptop daur ulang untuk menjalankan aplikasi dan layanan pribadi",
      "Menerapkan dan mengelola beberapa aplikasi web serta layanan pendukung menggunakan kontainer Docker pada server berbasis Debian",
      "Mengimplementasikan akses jarak jauh yang aman melalui Cloudflare Tunnel serta melakukan administrasi dan monitoring server menggunakan Webmin"
    ],
    "github": "https://github.com/Eeja07/mahija-portfolio",
    "demo": "https://webmin.eeja.fun",
    "architecture": [
      "Host Perangkat Keras Laptop Daur Ulang",
      "Sistem Operasi Server Debian",
      "Mesin Orkestrasi Docker Compose",
      "Terowongan Ingress Egress Cloudflared",
      "Panel Konsol Administrasi Webmin"
    ],
    "featured": false,
    "problem": "Menyebarkan dan mengelola beberapa sistem web secara publik tanpa membuka port firewall rumah atau menyewa server cloud publik yang mahal.",
    "approach": "Membangun node hypervisor fisik, memanfaatkan Docker Compose di dalam VM Debian, dan menghubungkan rute akses menggunakan Cloudflare Tunnel yang aman.",
    "tradeoffs": "Memilih Cloudflare Tunnel daripada port-forwarding biasa dengan DynDNS untuk keamanan mutlak dari pemindaian IP langsung.",
    "challenges": "Mencapai pembaruan kontainer tanpa downtime. Diselesaikan dengan konfigurasi health-check otomatis dan aturan proksi Nginx.",
    "outcome": "Hosting aman untuk 10+ layanan internal (broker MQTT, basis data, dashboard, aplikasi web) beroperasi dengan ketersediaan tinggi dan pencadangan otomatis.",
    "mediaType": "video",
    "mediaUrl": "/videos/homelab-demo.webm"
  },
  {
    "id": "untern-platform",
    "slug": "untern",
    "title": "UNTERN",
    "description": "Platform web yang menghubungkan pencari magang dengan perusahaan yang membutuhkan talenta, mengelola seluruh siklus dari analisis kebutuhan hingga deployment.",
    "year": 2025,
    "category": "Fullstack",
    "stack": [
      "JavaScript",
      "PostgreSQL",
      "Vite"
    ],
    "metrics": [
      "Agregasi poin data lowongan",
      "Waktu indeks query di bawah 50ms",
      "Siklus perekrutan end-to-end"
    ],
    "highlights": [
      "Mengembangkan platform web yang menghubungkan pencari magang dengan perusahaan yang mencari talenta",
      "Mengelola seluruh siklus hidup pengembangan perangkat lunak dari analisis kebutuhan hingga penerapan sistem",
      "Mengimplementasikan fitur aplikasi dan fungsionalitas sistem untuk mendukung proses perekrutan magang"
    ],
    "github": "https://github.com/Eeja07/untern-internship-project",
    "demo": "https://untern.eeja.fun",
    "architecture": [
      "Frontend SPA React (Vite)",
      "Node Backend REST API Node.js",
      "Penyimpanan Relasional PostgreSQL",
      "Driver Koneksi Basis Data Sequelize"
    ],
    "featured": false,
    "problem": "Mahasiswa menghadapi portal magang yang terfragmentasi sementara perekrut kesulitan menyaring profil kandidat berdasarkan kata kunci keahlian.",
    "approach": "Merancang aplikasi full-stack terpusat dengan indeks pencarian reaktif, alat dashboard perekrut, dan notifikasi otomatis.",
    "tradeoffs": "Memanfaatkan indeks terkelola PostgreSQL dan prosedur tersimpan dibanding Elasticsearch besar, menjaga konsumsi sumber daya tetap hemat.",
    "challenges": "Sinkronisasi data lowongan kerja. Diselesaikan dengan membangun antrean berbatas laju menggunakan Redis untuk mencegah penguncian basis data.",
    "outcome": "Portal kerja produksi yang memfasilitasi pencocokan magang terverifikasi dengan latensi pencarian di bawah 50ms.",
    "mediaType": "video",
    "mediaUrl": "/videos/untern-demo.webm"
  },
  {
    "id": "swimate",
    "slug": "swimate",
    "title": "SwiMate",
    "description": "Aplikasi seluler untuk mendukung pelatihan renang dan pemantauan performa menggunakan sensor ponsel dan machine learning.",
    "year": 2025,
    "category": "AI",
    "stack": [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "TensorFlow Lite"
    ],
    "metrics": [
      "Inferensi model langsung pada perangkat",
      "Dukungan basis data Supabase"
    ],
    "highlights": [
      "Mengembangkan aplikasi seluler untuk mendukung pelatihan renang dan pemantauan kinerja atlet",
      "Mengintegrasikan sensor seluler dan model machine learning untuk mendukung analisis aktivitas",
      "Mengimplementasikan layanan backend dan manajemen data menggunakan Supabase dan PostgreSQL"
    ],
    "github": "https://github.com/Eeja07/Swimate",
    "demo": "",
    "featured": false
  },
  {
    "id": "sarvio-x",
    "slug": "sarvio-x",
    "title": "SARVIO-X",
    "description": "Aplikasi berbasis web untuk memantau dan berinteraksi dengan drone DJI Tello yang dilengkapi model PyTorch real-time.",
    "year": 2025,
    "category": "Edge AI",
    "stack": [
      "JavaScript",
      "DJI Tello",
      "PyTorch"
    ],
    "metrics": [
      "Parsing telemetri sub-5ms",
      "Antarmuka kendali peramban web"
    ],
    "highlights": [
      "Mengembangkan aplikasi berbasis web untuk memantau dan berinteraksi dengan drone DJI Tello",
      "Mengimplementasikan komponen antarmuka pengguna dan fungsionalitas kontrol drone",
      "Mendukung operasi dan pemantauan drone melalui platform berbasis browser"
    ],
    "github": "https://github.com/Eeja07/sarvio-x",
    "demo": "",
    "featured": false
  },
  {
    "id": "course-web-app",
    "slug": "course-web-application",
    "title": "Aplikasi Web Kursus & Akademik",
    "description": "Aplikasi web untuk manajemen mata kuliah, alur pembelajaran, dan pencatatan interaksi pengguna.",
    "year": 2025,
    "category": "Fullstack",
    "stack": [
      "JavaScript",
      "PostgreSQL"
    ],
    "metrics": [
      "Indeks skema relasional",
      "Tugas mata kuliah otomatis"
    ],
    "highlights": [
      "Mengembangkan aplikasi web untuk manajemen kursus dan kegiatan pembelajaran",
      "Mengimplementasikan fungsionalitas frontend dan backend untuk mendukung alur kerja akademik",
      "Merancang fitur untuk mengelola informasi terkait kursus dan interaksi pengguna"
    ],
    "github": "https://github.com/Eeja07/course-webapp-project",
    "demo": "",
    "featured": false
  },
  {
    "id": "carvole-2d",
    "slug": "carvole-2d",
    "title": "Game Mobil 2D CarVole",
    "description": "Game mobil 2D berbasis C++ dengan logika pergerakan objek dan penanganan tabrakan khusus.",
    "year": 2024,
    "category": "Akademik",
    "stack": [
      "C++",
      "graphics.h"
    ],
    "metrics": [
      "Fisika tabrakan 60 FPS",
      "Jejak komputasi sangat ringan"
    ],
    "highlights": [
      "Mengembangkan game mobil 2D menggunakan C++ dan pustaka graphics.h",
      "Mengimplementasikan mekanik game, pergerakan objek, dan penanganan tabrakan",
      "Merancang elemen gameplay interaktif dan kontrol pengguna"
    ],
    "github": "https://github.com/Eeja07/carvole-simple-2d-car-game-graphics.h-final-project-basic-programming",
    "demo": "",
    "featured": false
  },
  {
    "id": "gui-wxwidgets",
    "slug": "gui-wxwidgets",
    "title": "Aplikasi GUI Desktop wxWidgets",
    "description": "Aplikasi antarmuka pengguna grafis desktop yang dibangun dengan C++ dan pustaka wxWidgets.",
    "year": 2023,
    "category": "Akademik",
    "stack": [
      "C++",
      "wxWidgets"
    ],
    "metrics": [
      "Rendering native sistem operasi",
      "Arsitektur berorientasi objek (OOP)"
    ],
    "highlights": [
      "Mengembangkan aplikasi graphical user interface desktop menggunakan wxWidgets",
      "Menerapkan prinsip pemrograman berorientasi objek dalam pengembangan aplikasi",
      "Mengimplementasikan komponen antarmuka pengguna interaktif dan fitur aplikasi"
    ],
    "github": "https://github.com/Eeja07/gui-with-wxwidgets-final-project-advanced-programming",
    "demo": "",
    "featured": false
  }
]

export function getProjects(lang: "en" | "id" = "en"): Project[] {
  return lang === "id" ? projectsId : projects
}

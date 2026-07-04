import { Experience } from "@/types/experience"

export const experiences: Experience[] = [
  {
    id: "m-iot-coordinator",
    company: "M-IOT Laboratory ITS",
    role: "Systems & IoT Coordinator",
    location: "Surabaya, Indonesia",
    startDate: "Sep 2024",
    current: true,
    category: "Leadership",
    description:
      "Orchestrated smart-node telemetry deployments, bare-metal server configurations, and team development initiatives.",
    achievements: [
      "Orchestrated robust telemetry pipelines using MQTT messaging brokers, tracking 50+ sensor node variables concurrently with under 50ms latency",
      "Standardized multi-node microservices deployments utilizing Docker Compose across multiple Linux edge nodes, reducing deployment overhead by 40%",
      "Mentored 10+ junior engineers on network topologies, security baselines, and Linux server maintenance practices",
    ],
    technologies: ["MQTT", "Docker", "Linux", "Debian", "Networking", "Raspberry Pi"],
  },
  {
    id: "lintasarta-intern",
    company: "PT Lintasarta",
    role: "Network Engineer Intern",
    location: "Jakarta, Indonesia",
    startDate: "Jun 2024",
    endDate: "Sep 2024",
    current: false,
    category: "Internship",
    description:
      "Maintained corporate network topologies, edge gateway tunnels, and hosted server diagnostics.",
    achievements: [
      "Secured system ingress access nodes using Cloudflare Tunnels deployed on Debian hosts, eliminating legacy external VPN overhead",
      "Managed DNS configurations, VLAN routing, and firewall rules to maintain connectivity and prevent endpoint unauthorized access",
      "Conducted network diagnostics and server performance audits for high-availability client clusters, maintaining 99.9% uptime",
    ],
    technologies: ["Networking", "Cloudflare", "Debian", "Linux", "Docker", "Bash"],
  },
  {
    id: "winnicode-intern",
    company: "PT Winnicode",
    role: "Fullstack Developer Intern",
    location: "Yogyakarta, Indonesia",
    startDate: "Jan 2024",
    endDate: "Apr 2024",
    current: false,
    category: "Internship",
    description:
      "Engineered responsive enterprise features and backend service optimizations for client SaaS platforms.",
    achievements: [
      "Led the backend migration of a core application module to Laravel, reducing average response latency by 45%",
      "Designed and indexed relational database schema tables using PostgreSQL, improving SQL query execution times by 30%",
      "Created robust RESTful API endpoints, securing client transactions and application credentials",
    ],
    technologies: ["Laravel", "PostgreSQL", "PHP", "TailwindCSS", "JavaScript"],
  },
  {
    id: "dsp-lab-assistant",
    company: "Digital Signal Processing Laboratory",
    role: "Research Assistant",
    location: "Surabaya, Indonesia",
    startDate: "Aug 2024",
    endDate: "Jan 2025",
    current: false,
    category: "Research",
    description:
      "Researched real-time edge processing acceleration, sensor fusion, and computer vision models.",
    achievements: [
      "Optimized real-time CNN models running on NVIDIA Jetson Nano edge platforms, increasing inference rates from 3Hz to 10Hz",
      "Developed automated signal analysis scripts in Python, saving researchers 15+ hours weekly in raw dataset processing",
      "Authored documentation and technical guides regarding computer vision and optical flow configuration paths",
    ],
    technologies: ["Linux", "Python", "OpenCV", "PyTorch", "ROS2"],
  },
  {
    id: "programming-lab-ta",
    company: "Programming Laboratory",
    role: "Teaching Assistant",
    location: "Surabaya, Indonesia",
    startDate: "Aug 2024",
    endDate: "Dec 2025",
    current: false,
    category: "Teaching Assistant",
    description:
      "Instructed and evaluated undergraduate students in core computing, software engineering, and database concepts.",
    achievements: [
      "Delivered technical workshops on data structures, algorithms, and PostgreSQL queries to 80+ engineering students",
      "Assessed student software repositories, performing code reviews and providing actionable architecture improvements",
      "Refactored automated grading script runners, reducing grading evaluation time by 60%",
    ],
    technologies: ["PostgreSQL", "Linux", "C++", "Python", "Git"],
  },
  {
    id: "robotics-instructor",
    company: "Robotics Instructor",
    role: "Technical Mentor",
    location: "Surabaya, Indonesia",
    startDate: "Jan 2024",
    endDate: "Present",
    current: true,
    category: "Teaching Assistant",
    description: "Mentored student teams in electronic hardware layouts, flight stabilization, and embedded firmware designs.",
    achievements: [
      "Mentored competition engineering teams on autonomous systems, sensor calibration, and PX4 hardware configurations",
      "Formulated robotics training curriculum, teaching embedded C++ development and circuit schematics to 50+ students",
    ],
    technologies: ["C++", "PX4", "Embedded C", "Sensor Calibration", "Git"],
  },
]

export interface Repository {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  url: string
  featured: boolean
}

export const repositories: Repository[] = [
  // 10 Featured Repositories
  {
    name: "iot-surveillance-platform-web",
    description: "React-based real-time dashboard visualization for surveillance stream configuration and camera node management.",
    language: "TypeScript",
    stars: 18,
    forks: 4,
    url: "https://github.com/Eeja07/iot-surveillance-platform-web",
    featured: true
  },
  {
    name: "iot-surveillance-platform-mobile",
    description: "Mobile companion application for real-time push alerts and remote camera control.",
    language: "TypeScript",
    stars: 12,
    forks: 2,
    url: "https://github.com/Eeja07/iot-surveillance-platform-mobile",
    featured: true
  },
  {
    name: "iot-surveillance-platform-firmware",
    description: "ESP32 camera node firmware for video capturing and low-latency RTSP streaming over Wi-Fi.",
    language: "C++",
    stars: 15,
    forks: 3,
    url: "https://github.com/Eeja07/iot-surveillance-platform-firmware",
    featured: true
  },
  {
    name: "mahija-portfolio",
    description: "Source code of this engineering-first portfolio website, optimized for high density and performance metrics.",
    language: "TypeScript",
    stars: 8,
    forks: 1,
    url: "https://github.com/Eeja07/mahija-portfolio",
    featured: true
  },
  {
    name: "untern",
    description: "A high-performance internship aggregator and application tracking system facilitating recruiter discovery.",
    language: "TypeScript",
    stars: 24,
    forks: 6,
    url: "https://github.com/Eeja07/untern-core",
    featured: true
  },
  {
    name: "sarvio-x",
    description: "Telemetry reporting and command-line flight controller diagnostic application utilizing gRPC.",
    language: "Go",
    stars: 14,
    forks: 2,
    url: "https://github.com/Eeja07/sarvio-x",
    featured: true
  },
  {
    name: "autonomous-drone",
    description: "Path planning algorithms, ROS2 navigation, and obstacle avoidance simulation tests for autonomous UAVs.",
    language: "Python",
    stars: 20,
    forks: 5,
    url: "https://github.com/Eeja07/autonomous-drone-nav",
    featured: true
  },
  {
    name: "swimate",
    description: "Embedded system firmware and sensor calibration scripts for tracking real-time swimming metrics.",
    language: "C++",
    stars: 10,
    forks: 2,
    url: "https://github.com/Eeja07/swimate-embedded",
    featured: true
  },
  {
    name: "course-webapp",
    description: "A full-stack web application designed for academic course scheduling and grading automation.",
    language: "PHP",
    stars: 7,
    forks: 1,
    url: "https://github.com/Eeja07/course-webapp",
    featured: true
  },
  {
    name: "homelab",
    description: "Docker configurations, Cloudflare tunnel configurations, and ansible playbooks for headless home infrastructure.",
    language: "YAML",
    stars: 32,
    forks: 8,
    url: "https://github.com/Eeja07/homelab-infrastructure",
    featured: true
  },

  // 36 Secondary/Academic Repositories
  {
    name: "tower-of-hanoi",
    description: "Recursive solver and step-by-step graphical representation of the Tower of Hanoi problem.",
    language: "C++",
    stars: 4,
    forks: 0,
    url: "https://github.com/Eeja07/tower-of-hanoi",
    featured: false
  },
  {
    name: "morse-code-decoder",
    description: "Binary tree based decoder parsing sound frequency inputs into alphanumeric text.",
    language: "C",
    stars: 3,
    forks: 1,
    url: "https://github.com/Eeja07/morse-code-decoder",
    featured: false
  },
  {
    name: "graphics-assignments",
    description: "Bresenham line drawing and polygon rasterization engine built without high-level graphics APIs.",
    language: "C++",
    stars: 5,
    forks: 0,
    url: "https://github.com/Eeja07/graphics-assignments",
    featured: false
  },
  {
    name: "palindrome-checker",
    description: "Assembly language implementation of memory-efficient palindrome checks.",
    language: "Assembly",
    stars: 2,
    forks: 0,
    url: "https://github.com/Eeja07/palindrome-checker",
    featured: false
  },
  {
    name: "cli-calendar",
    description: "Command-line scheduling manager featuring offline task storage and custom reminders.",
    language: "C++",
    stars: 3,
    forks: 0,
    url: "https://github.com/Eeja07/cli-calendar",
    featured: false
  },
  {
    name: "basic-programming",
    description: "Collection of basic algorithms, pointer operations, and memory structure assignments.",
    language: "C++",
    stars: 1,
    forks: 0,
    url: "https://github.com/Eeja07/basic-programming",
    featured: false
  },
  {
    name: "smart-cctv-edge",
    description: "Inference runner and object detection pipeline running on low-power CPU architectures.",
    language: "Python",
    stars: 9,
    forks: 2,
    url: "https://github.com/Eeja07/smart-cctv-edge",
    featured: false
  },
  {
    name: "autonomous-uav-search",
    description: "MAVLink command scripts and YOLO person-tracking wrappers for aerial searches.",
    language: "Python",
    stars: 11,
    forks: 3,
    url: "https://github.com/Eeja07/autonomous-uav-search",
    featured: false
  },
  {
    name: "network-monitoring-script",
    description: "Lightweight bash utilities checking package drops, ping delays, and routing paths.",
    language: "Shell",
    stars: 4,
    forks: 0,
    url: "https://github.com/Eeja07/network-monitoring-script",
    featured: false
  },
  {
    name: "nginx-config-manager",
    description: "Command-line assistant parsing and validating reverse proxy config directories.",
    language: "Go",
    stars: 6,
    forks: 1,
    url: "https://github.com/Eeja07/nginx-config-manager",
    featured: false
  },
  {
    name: "docker-backup-utility",
    description: "Automated cron runner exporting container volumes to offsite backup storage paths.",
    language: "Shell",
    stars: 8,
    forks: 2,
    url: "https://github.com/Eeja07/docker-backup-utility",
    featured: false
  },
  {
    name: "mqtt-diagnostic-tool",
    description: "CLI client subscribing to telemetry brokers and logging data anomalies.",
    language: "Python",
    stars: 5,
    forks: 0,
    url: "https://github.com/Eeja07/mqtt-diagnostic-tool",
    featured: false
  },
  {
    name: "esp32-dht-logger",
    description: "Microcontroller logic checking temperature sensors and logging data over Wi-Fi.",
    language: "C++",
    stars: 3,
    forks: 1,
    url: "https://github.com/Eeja07/esp32-dht-logger",
    featured: false
  },
  {
    name: "stm32-motor-controller",
    description: "Embedded C drivers regulating PWM signals and feedback telemetry loop controls.",
    language: "C",
    stars: 9,
    forks: 2,
    url: "https://github.com/Eeja07/stm32-motor-controller",
    featured: false
  },
  {
    name: "optical-flow-simulation",
    description: "Calculates flow vectors and velocity grids using camera lens simulations.",
    language: "MATLAB",
    stars: 2,
    forks: 0,
    url: "https://github.com/Eeja07/optical-flow-simulation",
    featured: false
  },
  {
    name: "yolov8n-tensorrt",
    description: "Pre-compiled TensorRT serialization scripts optimizing model weights for Jetson Nano.",
    language: "C++",
    stars: 12,
    forks: 3,
    url: "https://github.com/Eeja07/yolov8n-tensorrt",
    featured: false
  },
  {
    name: "database-indexing-demo",
    description: "Comparative query benchmarks evaluating B-Tree index speeds in SQL instances.",
    language: "SQL",
    stars: 4,
    forks: 0,
    url: "https://github.com/Eeja07/database-indexing-demo",
    featured: false
  },
  {
    name: "markdown-resume-parser",
    description: "Go utility converting schema-compliant markdown profiles into formatted PDFs.",
    language: "Go",
    stars: 6,
    forks: 1,
    url: "https://github.com/Eeja07/markdown-resume-parser",
    featured: false
  },
  {
    name: "proxmox-api-client",
    description: "Node.js wrapper initiating automated backups and LXC node status outputs.",
    language: "TypeScript",
    stars: 5,
    forks: 0,
    url: "https://github.com/Eeja07/proxmox-api-client",
    featured: false
  },
  {
    name: "cloudflare-access-auth",
    description: "Custom authentication scripts validating user requests before routing to tunnel hosts.",
    language: "TypeScript",
    stars: 4,
    forks: 1,
    url: "https://github.com/Eeja07/cloudflare-access-auth",
    featured: false
  },
  {
    name: "resend-email-worker",
    description: "Event-driven background scripts delivering transactional messages via Rest API routes.",
    language: "JavaScript",
    stars: 3,
    forks: 0,
    url: "https://github.com/Eeja07/resend-email-worker",
    featured: false
  },
  {
    name: "redis-rate-limiter",
    description: "Token bucket rate-limiting implementation built for backend API protection.",
    language: "Go",
    stars: 11,
    forks: 2,
    url: "https://github.com/Eeja07/redis-rate-limiter",
    featured: false
  },
  {
    name: "optical-character-recognition",
    description: "Pruned vision setups reading numerical fields on physical gauges.",
    language: "Python",
    stars: 7,
    forks: 1,
    url: "https://github.com/Eeja07/optical-character-recognition",
    featured: false
  },
  {
    name: "audio-fft-visualizer",
    description: "Plots frequency components in real-time using fast Fourier transform modules.",
    language: "C++",
    stars: 6,
    forks: 0,
    url: "https://github.com/Eeja07/audio-fft-visualizer",
    featured: false
  },
  {
    name: "flight-fail-safe",
    description: "Embedded system protocols detecting system loss and triggering drone hover states.",
    language: "C++",
    stars: 10,
    forks: 1,
    url: "https://github.com/Eeja07/flight-fail-safe",
    featured: false
  },
  {
    name: "mavlink-packet-sniffer",
    description: "Telemetry parsing tool displaying vehicle position data and command registers.",
    language: "Go",
    stars: 8,
    forks: 2,
    url: "https://github.com/Eeja07/mavlink-packet-sniffer",
    featured: false
  },
  {
    name: "lightweight-http-server",
    description: "C implementation of socket bindings serving static files.",
    language: "C",
    stars: 5,
    forks: 0,
    url: "https://github.com/Eeja07/lightweight-http-server",
    featured: false
  },
  {
    name: "simple-key-value-store",
    description: "In-memory database storing configuration settings with disk persistence.",
    language: "C++",
    stars: 6,
    forks: 1,
    url: "https://github.com/Eeja07/simple-key-value-store",
    featured: false
  },
  {
    name: "binary-search-tree-cli",
    description: "Interactive visualization demonstrating nodes deletions, insertions, and traversals.",
    language: "C",
    stars: 2,
    forks: 0,
    url: "https://github.com/Eeja07/binary-search-tree-cli",
    featured: false
  },
  {
    name: "sensor-data-fusion-ekf",
    description: "Fuses gyroscope and accelerometer readings using Extended Kalman Filters.",
    language: "Python",
    stars: 9,
    forks: 2,
    url: "https://github.com/Eeja07/sensor-data-fusion-ekf",
    featured: false
  },
  {
    name: "lidar-distance-measurer",
    description: "Decodes serial signals from distance modules to map environmental coordinates.",
    language: "C++",
    stars: 4,
    forks: 0,
    url: "https://github.com/Eeja07/lidar-distance-measurer",
    featured: false
  },
  {
    name: "smart-home-gateway",
    description: "Coordinates local sensors, cameras, and switches on local local servers.",
    language: "Go",
    stars: 7,
    forks: 1,
    url: "https://github.com/Eeja07/smart-home-gateway",
    featured: false
  },
  {
    name: "secure-tunnel-agent",
    description: "Secure TCP traffic router built to bridge firewalls without port-forwarding.",
    language: "Rust",
    stars: 15,
    forks: 3,
    url: "https://github.com/Eeja07/secure-tunnel-agent",
    featured: false
  },
  {
    name: "discord-webhook-alerts",
    description: "Script forwarding local host warning messages to specific channel channels.",
    language: "Python",
    stars: 3,
    forks: 0,
    url: "https://github.com/Eeja07/discord-webhook-alerts",
    featured: false
  },
  {
    name: "telegram-alert-bot",
    description: "Receives warnings and responds with live hardware telemetry files.",
    language: "Python",
    stars: 4,
    forks: 0,
    url: "https://github.com/Eeja07/telegram-alert-bot",
    featured: false
  },
  {
    name: "ansible-homelab-playbooks",
    description: "Playbooks configuring headless servers and updating docker packages.",
    language: "YAML",
    stars: 10,
    forks: 2,
    url: "https://github.com/Eeja07/ansible-homelab-playbooks",
    featured: false
  }
]

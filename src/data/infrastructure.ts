export interface InfrastructureService {
  name: string;
  role: string;
  status: "active" | "maintenance";
  description: string;
}

export interface Infrastructure {
  domain: string;
  host: string;
  cpu: string;
  os: string;
  container_runtime: string;
  reverse_proxy: string;
  tunnel: string;
  services: InfrastructureService[];
}

export const infrastructureData: Infrastructure = {
  domain: "eeja.fun",
  host: "Intel NUC Box (x86_64)",
  cpu: "Intel Core i5-8259U (4C/8T @ 3.80GHz)",
  os: "Debian 12 (Bookworm)",
  container_runtime: "Docker Compose",
  reverse_proxy: "Nginx Proxy Manager",
  tunnel: "Cloudflared",
  services: [
    {
      name: "Portfolio",
      role: "Web Application",
      status: "active",
      description: "Recruiter-optimized Next.js portfolio serving layout components.",
    },
    {
      name: "Laravel",
      role: "Backend API Router",
      status: "active",
      description: "Core RESTful framework handling data serialization and client requests.",
    },
    {
      name: "EMQX",
      role: "MQTT Broker",
      status: "active",
      description: "High-throughput MQTT broker ingesting telemetry streams from edge IoT nodes.",
    },
    {
      name: "MySQL",
      role: "Relational Database",
      status: "active",
      description: "Relational storage engine preserving user profiles and system settings.",
    },
    {
      name: "MinIO",
      role: "Object Storage",
      status: "active",
      description: "S3-compatible object storage repository handling file uploads and system backups.",
    },
  ],
}

export const infrastructureDataId: Infrastructure = {
  domain: "eeja.fun",
  host: "Intel NUC Box (x86_64)",
  cpu: "Intel Core i5-8259U (4C/8T @ 3.80GHz)",
  os: "Debian 12 (Bookworm)",
  container_runtime: "Docker Compose",
  reverse_proxy: "Nginx Proxy Manager",
  tunnel: "Cloudflared",
  services: [
    {
      name: "Portfolio",
      role: "Aplikasi Web",
      status: "active",
      description: "Portofolio Next.js teroptimasi yang menyajikan komponen interaktif.",
    },
    {
      name: "Laravel",
      role: "Router API Backend",
      status: "active",
      description: "Framework RESTful inti yang menangani serialisasi data dan permintaan klien.",
    },
    {
      name: "EMQX",
      role: "Broker MQTT",
      status: "active",
      description: "Broker MQTT throughput tinggi yang menerima stream telemetri dari node edge IoT.",
    },
    {
      name: "MySQL",
      role: "Basis Data Relasional",
      status: "active",
      description: "Mesin penyimpanan relasional yang memelihara data pengguna dan pengaturan sistem.",
    },
    {
      name: "MinIO",
      role: "Penyimpanan Objek S3",
      status: "active",
      description: "Repositori penyimpanan objek kompatibel S3 untuk unggahan berkas dan pencadangan sistem.",
    },
  ],
}

export function getInfrastructure(lang: "en" | "id" = "en"): Infrastructure {
  return lang === "id" ? infrastructureDataId : infrastructureData
}

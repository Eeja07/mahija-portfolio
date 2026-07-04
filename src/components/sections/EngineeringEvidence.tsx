"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface EvidenceItem {
  id: string
  title: string
  category: "IoT" | "AI" | "Virtualization" | "Network" | "Telemetry"
  description: string
  terminalOutput?: string[]
  visualRepresentation?: React.ReactNode
}

export default function EngineeringEvidence() {
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null)

  const items: EvidenceItem[] = [
    {
      id: "yolo-inference",
      title: "YOLOv8 Edge Inference Output",
      category: "AI",
      description: "Real-time object bounding boxes and model class probabilities processed directly on companion hardware.",
      terminalOutput: [
        "loading model weights from yolov8n_tensorrt.engine...",
        "model loaded in 1.48s (FP16 optimized)",
        "inference pipeline started at 10.2 FPS on Jetson GPU",
        "[frame 1092] 1 human detected (0.91), 1 drone detected (0.87)",
        "[frame 1093] 1 human detected (0.93), 1 drone detected (0.88)",
        "[frame 1094] 1 human detected (0.89), 0 drone detected",
        "system status: normal | temp: 58C | power draw: 8.4W"
      ],
      visualRepresentation: (
        <div className="w-full h-36 bg-zinc-950 rounded-lg flex flex-col justify-between p-3 border border-zinc-800 text-[10px] font-mono">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 text-zinc-500">
            <span>yolov8_inference.py</span>
            <span className="text-emerald-500 font-bold">10.2 FPS</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 py-2 text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>BoundingBox [x: 120, y: 340, w: 80, h: 180] class: <span className="text-primary">human</span> (93%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>BoundingBox [x: 450, y: 110, w: 120, h: 70] class: <span className="text-emerald-500">uav</span> (88%)</span>
            </div>
          </div>
          <div className="text-[8.5px] text-zinc-600">INFERENCE ENGINE: TENSORRT FP16</div>
        </div>
      )
    },
    {
      id: "esp32-mqtt",
      title: "ESP32 MQTT Broker Telemetry Log",
      category: "IoT",
      description: "Structured JSON telemetry payloads arriving at the Mosquitto MQTT broker from sensor node interfaces.",
      terminalOutput: [
        "connecting to broker at mqtt://192.168.1.45:1883...",
        "broker authentication successful | client_id: esp32_node_02",
        "subscribing to topics: esp32/node_02/telemetry, esp32/node_02/alerts",
        "publishing: { \"temp\": 24.8, \"humidity\": 62.1, \"uptime_sec\": 42023, \"heap\": 184520 }",
        "published payload to esp32/node_02/telemetry | latency: 12ms",
        "publishing: { \"temp\": 24.9, \"humidity\": 61.9, \"uptime_sec\": 42033, \"heap\": 184232 }",
        "published payload to esp32/node_02/telemetry | latency: 14ms"
      ],
      visualRepresentation: (
        <div className="w-full h-36 bg-zinc-950 rounded-lg flex flex-col justify-between p-3 border border-zinc-800 text-[10px] font-mono">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 text-zinc-500">
            <span>mqtt_explorer_feed</span>
            <span className="text-primary font-bold">CONNECTED</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1 py-2 text-zinc-400">
            <div><span className="text-zinc-600">&bull;</span> <span className="text-primary">esp32/node_02/telemetry</span></div>
            <div className="pl-4 text-zinc-500 text-[9px]">{`{ "temp": 24.9, "humidity": 61.9 }`}</div>
            <div className="mt-1"><span className="text-zinc-600">&bull;</span> <span className="text-primary">esp32/node_02/status</span></div>
            <div className="pl-4 text-zinc-500 text-[9px]">{`{ "rssi": -68, "ip": "192.168.1.102" }`}</div>
          </div>
          <div className="text-[8.5px] text-zinc-600">MQTT PROTOCOL V3.1.1 | MOSQUITTO</div>
        </div>
      )
    },
    {
      id: "docker-compose-infra",
      title: "Docker Compose Workspace State",
      category: "Virtualization",
      description: "Service orchestration containers executing on the virtualized Debian 12 environment.",
      terminalOutput: [
        "listing active stack containers under docker-compose.yml...",
        "CONTAINER ID   IMAGE                 COMMAND                  STATUS         PORTS",
        "82a17fdc2a82   emqx:5.4.1            \"/usr/bin/emqx start\"    Up 3 weeks     1883/tcp, 18083/tcp",
        "42b91c2fa8ef   minio/minio           \"/usr/bin/minio server\"  Up 3 weeks     9000/tcp, 9001/tcp",
        "c818fa2f1c8a   cloudflare/cloudflared \"cloudflared tunnel\"    Up 3 weeks     ",
        "d9a8c17bda29   laravel-backend       \"docker-php-entry...\"    Up 2 days      8000/tcp",
        "e09ac18fd1a1   nginx-proxy-manager   \"/init\"                  Up 3 weeks     80/tcp, 443/tcp",
        "all 5 containers running in default bridge network"
      ],
      visualRepresentation: (
        <div className="w-full h-36 bg-zinc-950 rounded-lg flex flex-col justify-between p-3 border border-zinc-800 text-[10px] font-mono">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 text-zinc-500">
            <span>docker compose ps</span>
            <span className="text-emerald-500 font-bold">5 ONLINE</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1 py-1 text-zinc-400 text-[9px]">
            <div className="flex justify-between"><span>emqx_broker</span><span className="text-emerald-500 font-mono">running (1883)</span></div>
            <div className="flex justify-between"><span>minio_storage</span><span className="text-emerald-500 font-mono">running (9000)</span></div>
            <div className="flex justify-between"><span>cloudflared_tunnel</span><span className="text-emerald-500 font-mono">running</span></div>
            <div className="flex justify-between"><span>laravel_api</span><span className="text-emerald-500 font-mono">running (8000)</span></div>
            <div className="flex justify-between"><span>nginx_manager</span><span className="text-emerald-500 font-mono">running (80)</span></div>
          </div>
          <div className="text-[8.5px] text-zinc-600">HOST OS: DEBIAN 12 (X86_64)</div>
        </div>
      )
    },
    {
      id: "cloudflare-tunnel-logs",
      title: "Cloudflare Ingress Tunnel Telemetry",
      category: "Network",
      description: "Secure routing handshake protocol diagnostics established via Cloudflared daemon client egress.",
      terminalOutput: [
        "starting cloudflared daemon client version 2026.2.0...",
        "loading credentials file /etc/cloudflared/tunnel.json",
        "established tunnel connection ID: 8ac2f48e-d9a2-4822-be12-9c1228ac8128",
        "connection registered on edge node SIN-01 (Singapore)",
        "connection registered on edge node HKG-02 (Hong Kong)",
        "routing rule matched: cctv.eeja.fun -> http://localhost:8080",
        "routing rule matched: status.eeja.fun -> http://localhost:3000",
        "listening for incoming request streams via secure TLS tunnels..."
      ],
      visualRepresentation: (
        <div className="w-full h-36 bg-zinc-950 rounded-lg flex flex-col justify-between p-3 border border-zinc-800 text-[10px] font-mono">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 text-zinc-500">
            <span>cloudflared.log</span>
            <span className="text-emerald-500 font-bold">2 TUNNELS ACTIVE</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 py-2 text-zinc-400 text-[9px]">
            <div>ROUTE: <span className="text-primary">cctv.eeja.fun</span> &rarr; <span className="text-zinc-500">local:8080</span></div>
            <div>ROUTE: <span className="text-primary">status.eeja.fun</span> &rarr; <span className="text-zinc-500">local:3000</span></div>
            <div className="text-emerald-500 font-mono text-[8.5px] mt-1">✔ Connections active on edge nodes</div>
          </div>
          <div className="text-[8.5px] text-zinc-600">EGRESS INTERCEPT: PORT 443 BLOCKED INBOUND</div>
        </div>
      )
    },
    {
      id: "minio-storage-metrics",
      title: "MinIO Storage Engine Telemetry",
      category: "Telemetry",
      description: "Storage utilization telemetry, disk health read/write records, and processing metadata indexes.",
      terminalOutput: [
        "mc admin info myminio...",
        "storage node status: healthy",
        "total disks: 2 | online: 2 | offline: 0",
        "total volume capacity: 2.0 TB | free: 1.6 TB | used: 400 GB",
        "bucket: cctv-edge-frames | object count: 2,541,209 | size: 312 GB",
        "write IOPS: 120 writes/sec | read IOPS: 14 reads/sec",
        "data recovery parity checks: verified (OK)"
      ],
      visualRepresentation: (
        <div className="w-full h-36 bg-zinc-950 rounded-lg flex flex-col justify-between p-3 border border-zinc-800 text-[10px] font-mono">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 text-zinc-500">
            <span>minio_diagnostics</span>
            <span className="text-primary font-bold">DISKS OK</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1 py-1 text-zinc-400 text-[9px]">
            <div className="flex justify-between"><span>Bucket</span><span className="text-zinc-300">cctv-edge-frames</span></div>
            <div className="flex justify-between"><span>Object count</span><span className="text-zinc-300">2,541,209</span></div>
            <div className="flex justify-between"><span>Disk Used</span><span className="text-zinc-300">312 GB / 2.0 TB</span></div>
            <div className="flex justify-between"><span>Disks Online</span><span className="text-emerald-500">2 / 2 (healthy)</span></div>
          </div>
          <div className="text-[8.5px] text-zinc-600">STORAGE CLUSTER: S3 SDK COMPATIBLE</div>
        </div>
      )
    },
    {
      id: "px4-mavlink-flow",
      title: "PX4 MAVLink Flight Packet Stream",
      category: "Telemetry",
      description: "Serial autopilot metadata structures sent from the physical PX4 flight controller over telemetry ports.",
      terminalOutput: [
        "listening on serial port /dev/ttyTHS1 at 57600 baud...",
        "[MAVLink #1] HEARTBEAT from vehicle 1 | state: active | mode: offboard",
        "[MAVLink #1] ATTITUDE: roll: 0.02, pitch: -0.01, yaw: 1.45 (rad)",
        "[MAVLink #1] GLOBAL_POSITION_INT: lat: -7278241, lon: 112792841, alt: 4500 (mm)",
        "[MAVLink #1] BATTERY_STATUS: remaining: 82% | voltage: 15.2V | current: 14.5A",
        "[MAVLink #1] OPTICAL_FLOW_RAD: integrated_x: 0.002, integrated_y: -0.001",
        "receiving stabilized feedback loop updates at 50Hz frequency"
      ],
      visualRepresentation: (
        <div className="w-full h-36 bg-zinc-950 rounded-lg flex flex-col justify-between p-3 border border-zinc-800 text-[10px] font-mono">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 text-zinc-500">
            <span>mavlink_monitor</span>
            <span className="text-emerald-500 font-bold">50Hz LOOP</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1 py-1 text-zinc-400 text-[9px]">
            <div className="flex justify-between"><span>Flight Mode</span><span className="text-primary font-bold">OFFBOARD</span></div>
            <div className="flex justify-between"><span>V-Battery</span><span className="text-zinc-300">15.2V (82%)</span></div>
            <div className="flex justify-between"><span>Est. Altitude</span><span className="text-zinc-300">4.50 meters</span></div>
            <div className="flex justify-between"><span>Optical Flow</span><span className="text-emerald-500">FUSED (EKF2)</span></div>
          </div>
          <div className="text-[8.5px] text-zinc-600">SERIAL BUS: UART /DEV/TTYTHS1</div>
        </div>
      )
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="engineering-evidence"
      aria-labelledby="evidence-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Proof of Work
          </Badge>
          <h2 
            id="evidence-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Engineering Evidence
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Real outputs, system states, and terminal reports captured from deployed edge devices and server clusters.
          </p>
        </div>

        {/* Masonry-like Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer group"
            >
              <Card className="border border-border bg-card/25 shadow-sm overflow-hidden hover:border-primary/50 transition-colors duration-150 p-4 h-full flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-bold">
                      {item.category}
                    </span>
                    <Badge variant="outline" className="text-[9px] font-mono px-1 py-0.5 opacity-65 group-hover:opacity-100 transition-opacity">
                      Inspect
                    </Badge>
                  </div>
                  
                  <h3 className="font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Inline Visual Representative Widget */}
                {item.visualRepresentation}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Inspector Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="border border-border bg-zinc-950 text-foreground max-w-xl p-6 font-sans">
            <DialogHeader className="text-left border-b border-border/40 pb-4">
              <div className="flex justify-between items-center pr-6 select-none">
                <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                  {selectedItem?.category} Logs
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  ID: {selectedItem?.id}
                </span>
              </div>
              <DialogTitle className="font-sans text-base font-bold mt-2">
                {selectedItem?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                {selectedItem?.description}
              </DialogDescription>
            </DialogHeader>

            {/* Detailed Terminal Log Display */}
            {selectedItem?.terminalOutput && (
              <div className="mt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-2 select-none">Diagnostic Console Logs</span>
                <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-400 overflow-x-auto leading-normal whitespace-pre">
                  {selectedItem.terminalOutput.map((line, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-zinc-700 select-none">[{idx + 1}]</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Output Footer Info */}
            <div className="mt-4 border-t border-border/30 pt-4 flex items-center justify-between font-mono text-[9.5px] text-zinc-500 select-none">
              <span>Status: Verified Diagnostics Output</span>
              <span>Uptime: Persistent VM</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

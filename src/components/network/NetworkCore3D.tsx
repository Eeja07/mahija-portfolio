"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

interface SubsystemNodeData {
  id: string
  name: string
  deviceType: string
  targetId: string
  position: THREE.Vector3
  cableColor: number
  role: string
  portIndex: number
  mesh?: THREE.Group
}

interface NetworkCore3DProps {
  onNodeSelect?: (targetId: string) => void
}

export default function NetworkCore3D({ onNodeSelect }: NetworkCore3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const [hoveredNode, setHoveredNode] = useState<{
    name: string
    deviceType: string
    role: string
    targetId: string
  } | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const isDark = resolvedTheme !== "light"
  const isEn = language === "en"
  const t = translations[language].gateway

  const handleNodeClick = useCallback(
    (targetId: string) => {
      if (onNodeSelect) {
        onNodeSelect(targetId)
        return
      }
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = 70
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    },
    [onNodeSelect]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const initialAspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(
      42,
      initialAspect,
      0.1,
      1000
    )

    // Dynamic camera distance for mobile & desktop fitting
    const calculateCameraZ = (aspect: number) => {
      if (aspect < 0.5) return 44
      if (aspect < 0.7) return 38
      if (aspect < 1.0) return 31
      if (aspect < 1.3) return 27
      return 23
    }
    camera.position.set(0, 0.3, calculateCameraZ(initialAspect))

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = isDark ? 1.7 : 1.2
    container.appendChild(renderer.domElement)

    // --- LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x475569 : 0xffffff,
      isDark ? 4.0 : 2.5
    )
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xbae6fd : 0x2563eb,
      isDark ? 6.5 : 3.8
    )
    keyLight.position.set(2, 8, 15)
    scene.add(keyLight)

    const centerPointLight = new THREE.PointLight(
      isDark ? 0x00f0ff : 0x38bdf8,
      isDark ? 7.5 : 4.2,
      35
    )
    centerPointLight.position.set(0, 0, 9)
    scene.add(centerPointLight)

    const leftClusterLight = new THREE.PointLight(
      isDark ? 0x38bdf8 : 0x0284c7,
      isDark ? 6.5 : 3.8,
      25
    )
    leftClusterLight.position.set(-8.5, 0, 6)
    scene.add(leftClusterLight)

    const rightClusterLight = new THREE.PointLight(
      isDark ? 0x10b981 : 0x059669,
      isDark ? 6.5 : 3.8,
      25
    )
    rightClusterLight.position.set(8.5, 0, 6)
    scene.add(rightClusterLight)

    const rimLightLeft = new THREE.DirectionalLight(
      isDark ? 0x67e8f9 : 0x0284c7,
      isDark ? 4.5 : 2.2
    )
    rimLightLeft.position.set(-10, 5, -8)
    scene.add(rimLightLeft)

    const rimLightRight = new THREE.DirectionalLight(
      isDark ? 0x34d399 : 0x059669,
      isDark ? 4.5 : 2.2
    )
    rimLightRight.position.set(10, 5, -8)
    scene.add(rimLightRight)

    // --- 3D NETWORK INFRASTRUCTURE GROUP ---
    const networkCoreGroup = new THREE.Group()
    scene.add(networkCoreGroup)

    const raycastableMeshes: THREE.Mesh[] = []

    // 1. CENTRAL SERVER RACK CHASSIS (Stack of 3 Modular Blade Servers)
    const chassisGroup = new THREE.Group()
    networkCoreGroup.add(chassisGroup)

    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x475569 : 0xe2e8f0,
      metalness: 0.85,
      roughness: 0.25,
    })

    const frontPanelMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0x0f172a,
      metalness: 0.9,
      roughness: 0.15,
    })

    const portMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x00f0ff : 0x2563eb,
      emissive: isDark ? 0x00f0ff : 0x2563eb,
      emissiveIntensity: isDark ? 1.4 : 0.8,
      metalness: 0.7,
    })

    // 3 Stacked Server Blades
    const bladeYPositions = [-1.4, 0, 1.4]
    const ledMeshes: THREE.Mesh[] = []

    bladeYPositions.forEach((yPos) => {
      const bladeGeom = new THREE.BoxGeometry(4.6, 1.05, 3.4)
      const bladeMesh = new THREE.Mesh(bladeGeom, chassisMaterial)
      bladeMesh.position.set(0, yPos, 0)
      bladeMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Core Server Rack" : "Rak Server Utama",
        deviceType: isEn ? "Central Host Cluster" : "Klaster Server Host",
        role: isEn ? "Developer Identity & System Overview" : "Identitas Pengembang & Ringkasan Sistem",
      }
      chassisGroup.add(bladeMesh)
      raycastableMeshes.push(bladeMesh)

      const faceGeom = new THREE.BoxGeometry(4.5, 0.92, 0.12)
      const faceMesh = new THREE.Mesh(faceGeom, frontPanelMaterial)
      faceMesh.position.set(0, yPos, 1.72)
      faceMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Core Server Rack" : "Rak Server Utama",
        deviceType: isEn ? "Central Host Cluster" : "Klaster Server Host",
        role: isEn ? "Developer Identity & System Overview" : "Identitas Pengembang & Ringkasan Sistem",
      }
      chassisGroup.add(faceMesh)
      raycastableMeshes.push(faceMesh)

      // Rows of SFP+ Optical Ports
      for (let p = -1.8; p <= 1.8; p += 0.4) {
        const portGeom = new THREE.BoxGeometry(0.24, 0.16, 0.14)
        const portMesh = new THREE.Mesh(portGeom, portMaterial)
        portMesh.position.set(p, yPos - 0.12, 1.8)
        chassisGroup.add(portMesh)
      }

      // Status Activity LEDs
      for (let l = -1.9; l <= 1.9; l += 0.28) {
        const ledGeom = new THREE.SphereGeometry(0.05, 8, 8)
        const ledMat = new THREE.MeshBasicMaterial({
          color: isDark ? 0x10b981 : 0x059669,
        })
        const ledMesh = new THREE.Mesh(ledGeom, ledMat)
        ledMesh.position.set(l, yPos + 0.24, 1.8)
        chassisGroup.add(ledMesh)
        ledMeshes.push(ledMesh)
      }
    })

    // Server Rack Corner Frame Pillars
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x94a3b8 : 0x64748b,
      metalness: 0.95,
      roughness: 0.1,
    })

    const pillarGeom = new THREE.BoxGeometry(0.22, 4.4, 0.22)
    const pillarPositions = [
      [-2.4, 0, 1.75],
      [2.4, 0, 1.75],
      [-2.4, 0, -1.75],
      [2.4, 0, -1.75],
    ]
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeom, frameMaterial)
      pillar.position.set(x, y, z)
      chassisGroup.add(pillar)
    })

    // --- 2. SATELLITE SUBSYSTEM HARDWARE MODULES (9 Distinct Network Models) ---
    // Realistic Real-World Patch Cable Colors
    const colorCat6Blue = 0x2563eb       // Royal Cat6 Ethernet Blue
    const colorAquaOM3 = 0x06b6d4        // OM3 Multimode Aqua Cyan
    const colorSinglemodeYellow = 0xeab308 // OS2 Singlemode Fiber Yellow
    const colorSignalGreen = 0x10b981    // Management Green
    const colorOrangeOM2 = 0xea580c      // OM2 Fiber Optic Orange
    const colorPurple = 0x8b5cf6         // High-Flex Violet Patch
    const colorSlateGray = 0x64748b      // Industrial Shielded Gray
    const colorFireRed = 0xdc2626        // Firewall Red Uplink
    const colorTealONT = 0x0d9488        // Telecom Drop Teal

    const subsystemNodes: SubsystemNodeData[] = [
      // Left Side Nodes (4 Nodes)
      {
        id: "skills",
        name: isEn ? "Skills Matrix" : "Keahlian Teknis",
        deviceType: isEn ? "24-Port Patch Panel & Bus" : "Patch Panel 24-Port & Bus",
        role: isEn ? "Technical Capabilities & Stack Architecture" : "Kemampuan Teknis & Arsitektur Stack",
        targetId: "#skills",
        position: new THREE.Vector3(-8.2, 4.5, -1.2),
        cableColor: colorCat6Blue,
        portIndex: 0,
      },
      {
        id: "projects",
        name: isEn ? "Projects" : "Proyek Rekayasa",
        deviceType: isEn ? "1U Core Managed Switch" : "Switch Terkelola 1U",
        role: isEn ? "IoT Systems, Edge AI & Distributed Systems" : "Sistem IoT, Edge AI & Sistem Terdistribusi",
        targetId: "#featured-engineering",
        position: new THREE.Vector3(-8.8, 1.8, 0.8),
        cableColor: colorAquaOM3,
        portIndex: 1,
      },
      {
        id: "organizations",
        name: isEn ? "Organizations" : "Organisasi",
        deviceType: isEn ? "Dual-Band Wireless AP (WAP)" : "Access Point Nirkabel (WAP)",
        role: isEn ? "Leadership, Laboratory & Student Clusters" : "Kepemimpinan, Laboratorium & Himpunan",
        targetId: "#organizations",
        position: new THREE.Vector3(-9.0, -1.0, -0.5),
        cableColor: colorPurple,
        portIndex: 2,
      },
      {
        id: "training",
        name: isEn ? "Training & Certs" : "Pelatihan & Sertifikasi",
        deviceType: isEn ? "Industrial PoE+ Power Injector" : "Injektor Daya PoE+ Industri",
        role: isEn ? "Certified Management & Technical Workshops" : "Workshop Manajemen & Sertifikasi Teknis",
        targetId: "#training",
        position: new THREE.Vector3(-8.2, -4.2, 0.6),
        cableColor: colorSinglemodeYellow,
        portIndex: 3,
      },

      // Right Side Nodes (5 Nodes)
      {
        id: "experience",
        name: isEn ? "Experience" : "Pengalaman Kerja",
        deviceType: isEn ? "Multi-WAN Edge Gateway Router" : "Router Gateway Multi-WAN",
        role: isEn ? "Career Routing & Technical Internships" : "Riwayat Karier & Magang Industri",
        targetId: "#experience",
        position: new THREE.Vector3(8.2, 4.5, -1.2),
        cableColor: colorSignalGreen,
        portIndex: 4,
      },
      {
        id: "awards",
        name: isEn ? "Awards & Honors" : "Penghargaan & Prestasi",
        deviceType: isEn ? "Hardware Security Firewall" : "Firewall Keamanan Perangkat Keras",
        role: isEn ? "National Robotics & Engineering Championships" : "Kejuaraan Robotika & Prestasi Nasional",
        targetId: "#awards",
        position: new THREE.Vector3(8.8, 1.8, 0.8),
        cableColor: colorOrangeOM2,
        portIndex: 5,
      },
      {
        id: "repositories",
        name: isEn ? "Repositories" : "Repositori Kode",
        deviceType: isEn ? "NAS / SAN High-Density Storage" : "Storage Array NAS / SAN",
        role: isEn ? "46 Public Open-Source Codebases" : "46 Repositori Kode Terbuka",
        targetId: "#repositories",
        position: new THREE.Vector3(9.0, -1.0, -0.5),
        cableColor: colorSlateGray,
        portIndex: 6,
      },
      {
        id: "resume",
        name: isEn ? "Curriculum Vitae" : "Curriculum Vitae",
        deviceType: isEn ? "Console Access Terminal Server" : "Terminal Server Konsol Manajemen",
        role: isEn ? "Download Professional PDF (EN / ID)" : "Unduh PDF Profesional (EN / ID)",
        targetId: "#resume",
        position: new THREE.Vector3(8.2, -3.6, 0.6),
        cableColor: colorFireRed,
        portIndex: 7,
      },
      {
        id: "contact",
        name: isEn ? "Get in Touch" : "Hubungi Saya",
        deviceType: isEn ? "Fiber Optical Terminal (ONT)" : "Terminal Jaringan Optik (ONT)",
        role: isEn ? "Direct Communication Sockets & Socials" : "Kanal Komunikasi & Kontak Langsung",
        targetId: "#contact",
        position: new THREE.Vector3(7.4, -5.6, -1.0),
        cableColor: colorTealONT,
        portIndex: 8,
      },
    ]

    // Factory to build distinct procedural 3D network hardware models for each node
    const buildHardwareModel = (node: SubsystemNodeData): THREE.Group => {
      const g = new THREE.Group()

      const baseMetalMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x2a374a : 0xf1f5f9,
        metalness: 0.85,
        roughness: 0.25,
      })

      const darkPanelMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0x1e293b,
        metalness: 0.9,
        roughness: 0.2,
      })

      const accentMat = new THREE.MeshStandardMaterial({
        color: node.cableColor,
        emissive: node.cableColor,
        emissiveIntensity: isDark ? 1.1 : 0.6,
      })

      const rj45Mat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0x334155,
        metalness: 0.7,
        roughness: 0.3,
      })

      const ledGreenMat = new THREE.MeshBasicMaterial({ color: 0x10b981 })
      const ledAmberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      const ledCyanMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 })

      // Common Chassis
      const chassisGeom = new THREE.BoxGeometry(2.3, 0.95, 1.3)
      const chassisMesh = new THREE.Mesh(chassisGeom, baseMetalMat)
      chassisMesh.userData = { targetId: node.targetId, name: node.name, deviceType: node.deviceType, role: node.role }
      g.add(chassisMesh)
      raycastableMeshes.push(chassisMesh)

      // Faceplate Mesh
      const faceGeom = new THREE.BoxGeometry(2.2, 0.82, 0.08)
      const faceMesh = new THREE.Mesh(faceGeom, darkPanelMat)
      faceMesh.position.set(0, 0, 0.69)
      faceMesh.userData = { targetId: node.targetId, name: node.name, deviceType: node.deviceType, role: node.role }
      g.add(faceMesh)
      raycastableMeshes.push(faceMesh)

      // Top Bezel Accent Line
      const topBezel = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.06, 1.32), accentMat)
      topBezel.position.set(0, 0.49, 0)
      g.add(topBezel)

      // Bottom Bezel Accent Line
      const btmBezel = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.06, 1.32), accentMat)
      btmBezel.position.set(0, -0.49, 0)
      g.add(btmBezel)

      // Procedural Details depending on hardware device type:
      switch (node.id) {
        case "projects": {
          // 1U Managed Switch: Dense RJ45 port rows + SFP+ slots
          for (let row = -0.15; row <= 0.15; row += 0.3) {
            for (let col = -0.85; col <= 0.35; col += 0.22) {
              const port = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.14, 0.08), rj45Mat)
              port.position.set(col, row, 0.74)
              g.add(port)
              const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), ledGreenMat)
              led.position.set(col, row + 0.11, 0.74)
              g.add(led)
            }
          }
          // 2 SFP+ 10G cages
          for (let sfp = 0.65; sfp <= 0.9; sfp += 0.25) {
            const sfpCage = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.1), accentMat)
            sfpCage.position.set(sfp, 0, 0.74)
            g.add(sfpCage)
          }
          break
        }

        case "experience": {
          // Multi-WAN Router: WAN ports, LAN cluster, Dual Antennas
          const antGeom = new THREE.CylinderGeometry(0.04, 0.05, 0.9, 8)
          const antMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0x475569, metalness: 0.9 })
          const antLeft = new THREE.Mesh(antGeom, antMat)
          antLeft.position.set(-0.95, 0.75, -0.45)
          antLeft.rotation.z = -0.15
          g.add(antLeft)
          const antRight = new THREE.Mesh(antGeom, antMat)
          antRight.position.set(0.95, 0.75, -0.45)
          antRight.rotation.z = 0.15
          g.add(antRight)

          // WAN ports (Yellow/Blue)
          const wanPort = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.08), accentMat)
          wanPort.position.set(-0.7, 0, 0.74)
          g.add(wanPort)
          // LAN ports
          for (let col = -0.3; col <= 0.6; col += 0.25) {
            const port = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.08), rj45Mat)
            port.position.set(col, 0, 0.74)
            g.add(port)
          }
          break
        }

        case "skills": {
          // Patch Panel: 4 Blocks of 6 ports + label strips
          for (let blk = -0.75; blk <= 0.75; blk += 0.5) {
            const labelStrip = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.02), new THREE.MeshBasicMaterial({ color: 0xffffff }))
            labelStrip.position.set(blk, 0.22, 0.74)
            g.add(labelStrip)
            for (let p = -0.14; p <= 0.14; p += 0.14) {
              const keystone = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.06), rj45Mat)
              keystone.position.set(blk + p, -0.05, 0.74)
              g.add(keystone)
            }
          }
          break
        }

        case "organizations": {
          // Wireless AP: Circular central glowing RF beacon dome
          const domeGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24)
          const dome = new THREE.Mesh(domeGeom, accentMat)
          dome.rotation.x = Math.PI / 2
          dome.position.set(0, 0, 0.74)
          g.add(dome)

          const innerRing = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.25, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }))
          innerRing.position.set(0, 0, 0.79)
          g.add(innerRing)
          break
        }

        case "awards": {
          // Hardware Firewall: Security LCD telemetry display + red status matrix
          const lcdScreen = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.04), new THREE.MeshStandardMaterial({
            color: 0x991b1b,
            emissive: 0xdc2626,
            emissiveIntensity: isDark ? 1.5 : 0.8,
          }))
          lcdScreen.position.set(-0.45, 0, 0.74)
          g.add(lcdScreen)

          for (let p = 0.2; p <= 0.8; p += 0.2) {
            const eth = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.08), rj45Mat)
            eth.position.set(p, 0, 0.74)
            g.add(eth)
          }
          break
        }

        case "training": {
          // PoE+ Industrial Switch: Wattage LED meter + orange PoE ports
          const meterGeom = new THREE.BoxGeometry(0.5, 0.15, 0.04)
          const meter = new THREE.Mesh(meterGeom, new THREE.MeshBasicMaterial({ color: 0xf59e0b }))
          meter.position.set(-0.65, 0.15, 0.74)
          g.add(meter)

          for (let col = -0.15; col <= 0.75; col += 0.22) {
            const poePort = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.08), rj45Mat)
            poePort.position.set(col, -0.05, 0.74)
            g.add(poePort)
            const poeLed = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), ledAmberMat)
            poeLed.position.set(col, 0.12, 0.74)
            g.add(poeLed)
          }
          break
        }

        case "repositories": {
          // NAS Storage Array: 4 Hot-swappable HDD caddies with lever handles
          for (let bay = -0.75; bay <= 0.75; bay += 0.5) {
            const caddy = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.65, 0.08), new THREE.MeshStandardMaterial({
              color: isDark ? 0x1e293b : 0x94a3b8,
              metalness: 0.95,
              roughness: 0.1,
            }))
            caddy.position.set(bay, 0, 0.74)
            g.add(caddy)

            const handle = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: 0x0f172a }))
            handle.position.set(bay, -0.2, 0.79)
            g.add(handle)

            const activityLed = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), ledGreenMat)
            activityLed.position.set(bay, 0.22, 0.79)
            g.add(activityLed)
          }
          break
        }

        case "resume": {
          // Console Server: Serial ports + CLI display
          const termLcd = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.04), new THREE.MeshBasicMaterial({ color: 0x2563eb }))
          termLcd.position.set(-0.5, 0, 0.74)
          g.add(termLcd)

          for (let col = 0.15; col <= 0.75; col += 0.22) {
            const serial = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.08), rj45Mat)
            serial.position.set(col, 0, 0.74)
            g.add(serial)
          }
          break
        }

        case "contact": {
          // Fiber ONT: SC/APC fiber port + PON/LOS/LAN status LEDs
          const scPort = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.1), new THREE.MeshStandardMaterial({
            color: 0x10b981,
            emissive: 0x10b981,
            emissiveIntensity: 0.9,
          }))
          scPort.position.set(-0.65, 0, 0.74)
          g.add(scPort)

          // 4 Status LEDs (PON, LOS, LAN, TEL)
          for (let i = -0.1; i <= 0.65; i += 0.25) {
            const ontLed = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), i === 0.15 ? ledAmberMat : ledCyanMat)
            ontLed.position.set(i, 0, 0.74)
            g.add(ontLed)
          }
          break
        }
      }

      // Side Connector Boot Cap
      const capGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.35, 16)
      const capMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x94a3b8 : 0x475569,
        metalness: 0.9,
      })
      const cap = new THREE.Mesh(capGeom, capMat)
      cap.rotation.z = Math.PI / 2
      cap.position.set(node.position.x > 0 ? -1.25 : 1.25, 0, 0)
      g.add(cap)

      return g
    }

    subsystemNodes.forEach((node) => {
      const nodeModel = buildHardwareModel(node)
      nodeModel.position.copy(node.position)
      networkCoreGroup.add(nodeModel)
      node.mesh = nodeModel
    })

    // --- 3. HIGH-PRECISION REALISTIC PHYSICAL NETWORK CABLES ---
    const cableMeshes: { mesh: THREE.Mesh; pulseSpeed: number; pulseOffset: number }[] = []

    subsystemNodes.forEach((node, index) => {
      const isLeft = node.position.x < 0
      const portY = node.position.y > 2.5 ? 1.4 : node.position.y > -2.0 ? 0 : -1.4
      const portX = isLeft ? -1.0 - (index % 3) * 0.35 : 1.0 + (index % 3) * 0.35
      const portZ = 1.82

      const p0 = new THREE.Vector3(portX, portY - 0.12, portZ)
      const p1 = new THREE.Vector3(portX, portY - 0.12, 2.6)
      const p2 = new THREE.Vector3(
        portX + (isLeft ? -2.2 : 2.2),
        portY + (node.position.y - portY) * 0.25,
        2.8
      )
      const p3 = new THREE.Vector3(
        isLeft ? -5.2 : 5.2,
        portY + (node.position.y - portY) * 0.65,
        2.0
      )
      const p4 = new THREE.Vector3(
        node.position.x + (isLeft ? 2.6 : -2.6),
        node.position.y,
        node.position.z + 0.5
      )
      const p5 = new THREE.Vector3(
        node.position.x + (isLeft ? 1.25 : -1.25),
        node.position.y,
        node.position.z
      )

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4, p5])
      const tubeGeom = new THREE.TubeGeometry(curve, 44, 0.12, 10, false)
      // Realistic Physical Satin PVC Cable Material
      const tubeMat = new THREE.MeshStandardMaterial({
        color: node.cableColor,
        roughness: 0.35,
        metalness: 0.2,
        emissive: node.cableColor,
        emissiveIntensity: isDark ? 0.35 : 0.15,
      })
      const cableMesh = new THREE.Mesh(tubeGeom, tubeMat)
      networkCoreGroup.add(cableMesh)
      cableMeshes.push({
        mesh: cableMesh,
        pulseSpeed: 1.2 + index * 0.15,
        pulseOffset: index * 0.7,
      })

      // Molded Strain-Relief Connector Boot at faceplate port
      const bootGeom = new THREE.BoxGeometry(0.2, 0.15, 0.35)
      const bootMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x475569 : 0x94a3b8,
        metalness: 0.95,
      })
      const bootMesh = new THREE.Mesh(bootGeom, bootMat)
      bootMesh.position.set(portX, portY - 0.12, portZ + 0.175)
      networkCoreGroup.add(bootMesh)
    })

    // Heavy Master Uplink Conduit heading underneath the rack
    const masterConduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.9, 0),
      new THREE.Vector3(0, -4.5, 0.5),
      new THREE.Vector3(0, -8.0, 1.0),
      new THREE.Vector3(0, -12.0, 2.0),
    ])
    const masterConduitGeom = new THREE.TubeGeometry(masterConduitCurve, 32, 0.26, 12, false)
    const masterConduitMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.35,
      metalness: 0.3,
      emissive: 0x0284c7,
      emissiveIntensity: isDark ? 0.4 : 0.2,
    })
    const masterConduitMesh = new THREE.Mesh(masterConduitGeom, masterConduitMat)
    networkCoreGroup.add(masterConduitMesh)
    cableMeshes.push({
      mesh: masterConduitMesh,
      pulseSpeed: 1.5,
      pulseOffset: 0,
    })

    // --- 4. DRAG TO EXPLORE WITH INERTIA & INTERACTION CONTROLS ---
    const targetRotation = { x: 0.12, y: -0.15 }
    const currentRotation = { x: 0.12, y: -0.15 }
    const velocity = { x: 0, y: 0 }
    let isDragging = false
    let prevPointer = { x: 0, y: 0 }

    const raycaster = new THREE.Raycaster()
    const mouseCoord = new THREE.Vector2()

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      // Allow right-click or left-click drag
      isDragging = true
      setIsInteracting(true)
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      prevPointer = { x: clientX, y: clientY }
      velocity.x = 0
      velocity.y = 0
    }

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      const rect = container.getBoundingClientRect()
      mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1

      if (isDragging) {
        const deltaX = clientX - prevPointer.x
        const deltaY = clientY - prevPointer.y
        prevPointer = { x: clientX, y: clientY }

        const sensitivity = "touches" in e ? 0.005 : 0.0035
        velocity.x = deltaX * sensitivity
        velocity.y = deltaY * sensitivity

        targetRotation.y += velocity.x
        targetRotation.x += velocity.y
        targetRotation.x = Math.max(-0.5, Math.min(0.5, targetRotation.x))
      } else {
        raycaster.setFromCamera(mouseCoord, camera)
        const intersects = raycaster.intersectObjects(raycastableMeshes)
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh
          setHoveredNode({
            name: hit.userData.name,
            deviceType: hit.userData.deviceType,
            role: hit.userData.role,
            targetId: hit.userData.targetId,
          })
          container.style.cursor = "pointer"
        } else {
          setHoveredNode(null)
          container.style.cursor = "grab"
        }
      }
    }

    const onPointerUp = () => {
      isDragging = false
      setTimeout(() => setIsInteracting(false), 800)
    }

    // Trigger Node Selection on either Click or Right Click
    const handleNodeSelectionFromPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouseCoord, camera)
      const intersects = raycaster.intersectObjects(raycastableMeshes)
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh
        if (hit.userData.targetId) {
          handleNodeClick(hit.userData.targetId)
        }
      }
    }

    const onClick = (e: MouseEvent | TouchEvent) => {
      const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX
      const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY
      handleNodeSelectionFromPointer(clientX, clientY)
    }

    // Right Click to Enter Handler
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      handleNodeSelectionFromPointer(e.clientX, e.clientY)
    }

    container.addEventListener("mousedown", onPointerDown)
    window.addEventListener("mousemove", onPointerMove, { passive: true })
    window.addEventListener("mouseup", onPointerUp)
    container.addEventListener("click", onClick)
    container.addEventListener("contextmenu", onContextMenu)

    container.addEventListener("touchstart", onPointerDown, { passive: true })
    window.addEventListener("touchmove", onPointerMove, { passive: true })
    window.addEventListener("touchend", onPointerUp)

    const handleResize = () => {
      if (!container) return
      const aspect = container.clientWidth / container.clientHeight
      camera.aspect = aspect
      camera.position.set(0, 0.3, calculateCameraZ(aspect))
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // --- 5. ANIMATION LOOP ---
    let animationFrameId: number
    const startTime = performance.now()

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001

      if (!isDragging) {
        targetRotation.y += 0.0009
        velocity.x *= 0.95
        velocity.y *= 0.95
        targetRotation.y += velocity.x
        targetRotation.x += velocity.y
      }

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08

      networkCoreGroup.rotation.x = currentRotation.x
      networkCoreGroup.rotation.y = currentRotation.y

      // Realistic Status LED blink
      ledMeshes.forEach((led, i) => {
        const isBlinking = Math.sin(time * 7 + i * 1.8) > 0.4
        ;(led.material as THREE.MeshBasicMaterial).color.setHex(
          isBlinking ? (isDark ? 0x00f0ff : 0x2563eb) : isDark ? 0x10b981 : 0x059669
        )
      })

      // Subtle pulse on physical patch cables
      cableMeshes.forEach((cable) => {
        const mat = cable.mesh.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity =
          (isDark ? 0.3 : 0.12) + Math.sin(time * cable.pulseSpeed + cable.pulseOffset) * 0.2
      })

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener("mousedown", onPointerDown)
      window.removeEventListener("mousemove", onPointerMove)
      window.removeEventListener("mouseup", onPointerUp)
      container.removeEventListener("click", onClick)
      container.removeEventListener("contextmenu", onContextMenu)

      container.removeEventListener("touchstart", onPointerDown)
      window.removeEventListener("touchmove", onPointerMove)
      window.removeEventListener("touchend", onPointerUp)

      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isDark, language, isEn, handleNodeClick])

  return (
    <div className="relative size-full select-none touch-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="size-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Minimalist Technical Guidance HUD */}
      <div className="absolute bottom-16 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 font-mono text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-300 bg-background/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2 max-w-[92vw] truncate">
        <span className="size-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
        <span className="truncate">
          {t.hudGuide}
        </span>
      </div>

      {/* CENTERED POPUP on Hover or Selection */}
      {hoveredNode && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleNodeClick(hoveredNode.targetId)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleNodeClick(hoveredNode.targetId)
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-mono text-foreground bg-background/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border-2 border-blue-500/80 dark:border-cyan-400/80 shadow-[0_0_50px_rgba(0,240,255,0.28)] flex flex-col items-center text-center gap-3 cursor-pointer animate-in fade-in zoom-in-95 duration-150 max-w-[88vw] sm:max-w-sm w-full select-none"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <span className="size-2 rounded-full bg-emerald-500 animate-led" />
            <span>{t.nodeDetected} &bull; {hoveredNode.deviceType}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight">
              {hoveredNode.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans max-w-xs mx-auto">
              {hoveredNode.role}
            </p>
          </div>
          <div className="mt-1 px-4 py-2 rounded-xl bg-blue-600 dark:bg-cyan-400 text-white dark:text-zinc-950 font-mono text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
            <span>{t.rightClickToEnter}</span>
          </div>
        </div>
      )}

      {/* Minimal interaction state badge */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 items-center gap-1.5">
        <span className={isInteracting ? "text-cyan-500 dark:text-cyan-400 font-semibold" : "text-zinc-400"}>
          {isInteracting ? t.orbitActive : t.ready}
        </span>
      </div>
    </div>
  )
}

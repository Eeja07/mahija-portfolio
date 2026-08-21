"use client"

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

function subscribeTouch(callback: () => void) {
  window.addEventListener("resize", callback)
  return () => window.removeEventListener("resize", callback)
}

function getTouchSnapshot() {
  if (typeof window === "undefined") return false
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
}

function getTouchServerSnapshot() {
  return false
}

interface PortfolioNodeData {
  id: string
  name: string
  category: string
  deviceType: string
  targetId: string
  position: THREE.Vector3
  role: string
  portIndex: number
  portLocalOffset: THREE.Vector3
  portApproachVector: THREE.Vector3
  connectorType: "rj45" | "sfp"
  mesh?: THREE.Group
}

interface NetworkCore3DProps {
  onNodeSelect?: (targetId: string) => void
}

/**
 * Procedural texture generator for high-realism brushed metal
 */
function createBrushedMetalTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#808080"
  ctx.fillRect(0, 0, 256, 256)

  // Horizontal anisotropic grain
  for (let i = 0; i < 3500; i++) {
    const y = Math.random() * 256
    const x = Math.random() * 256
    const len = 25 + Math.random() * 55
    const brightness = Math.floor(105 + Math.random() * 85)
    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, 0.16)`
    ctx.fillRect(x, y, len, 1)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return texture
}

/**
 * Procedural texture generator for server ventilation grille (hex/slotted pattern)
 */
function createVentMeshTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#1e242d"
  ctx.fillRect(0, 0, 256, 128)

  // Perforated cooling mesh holes
  ctx.fillStyle = "#2c3442"
  for (let y = 8; y < 120; y += 8) {
    const offsetX = (y % 16 === 0) ? 0 : 4
    for (let x = 8 + offsetX; x < 248; x += 8) {
      ctx.beginPath()
      ctx.arc(x, y, 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#3f4b5e"
      ctx.lineWidth = 0.7
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

/**
 * Procedural texture generator for enterprise hot-swap drive bays
 */
function createDriveBayTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#222832"
  ctx.fillRect(0, 0, 256, 128)

  // 4 drive caddies
  for (let i = 0; i < 4; i++) {
    const x = 8 + i * 60
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 1.5
    ctx.strokeRect(x, 10, 54, 108)

    // Brushed metallic release latch
    ctx.fillStyle = "#64748b"
    ctx.fillRect(x + 6, 18, 42, 14)
    ctx.fillStyle = "#cbd5e1"
    ctx.fillRect(x + 8, 20, 38, 3)

    // Ventilation intake slots
    ctx.fillStyle = "#141920"
    for (let s = 40; s < 96; s += 8) {
      ctx.fillRect(x + 8, s, 38, 3.5)
    }

    // Silkscreen text
    ctx.fillStyle = "#94a3b8"
    ctx.font = "bold 7px monospace"
    ctx.fillText(`SAS-0${i + 1}`, x + 8, 110)
  }

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

/**
 * Procedural texture generator for 24-Port Managed Switch Faceplate
 */
function createSwitchFaceplateTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#29323f"
  ctx.fillRect(0, 0, 512, 128)

  // Subtle metallic horizontal bezel
  ctx.fillStyle = "#3b4759"
  ctx.fillRect(0, 0, 512, 6)
  ctx.fillRect(0, 122, 512, 6)

  // Switch Brand / Model silkscreen
  ctx.fillStyle = "#cbd5e1"
  ctx.font = "bold 13px monospace"
  ctx.fillText("GIGABIT 24-PORT MANAGED SWITCH", 16, 26)
  ctx.fillStyle = "#94a3b8"
  ctx.font = "10px monospace"
  ctx.fillText("LAYER-3 ENTERPRISE CORE • 10G SFP+ UPLINK", 16, 42)

  // 24 RJ45 Ports (2 stacked rows of 12)
  const portStartX = 180
  const portWidth = 18
  const portHeight = 24
  for (let row = 0; row < 2; row++) {
    const y = row === 0 ? 56 : 88
    for (let col = 0; col < 12; col++) {
      const x = portStartX + col * 22
      // Metal shielded socket
      ctx.fillStyle = "#d1d5db"
      ctx.fillRect(x, y, portWidth, portHeight)
      // Cavity
      ctx.fillStyle = "#181d24"
      ctx.fillRect(x + 2, y + 2, portWidth - 4, portHeight - 4)
      // Pin notch
      ctx.fillStyle = "#facc15"
      ctx.fillRect(x + 4, y + 3, portWidth - 8, 3)
      // Port number
      ctx.fillStyle = "#94a3b8"
      ctx.font = "bold 7px monospace"
      const portNum = row === 0 ? col * 2 + 1 : col * 2 + 2
      ctx.fillText(`${portNum}`, x + 3, row === 0 ? y - 3 : y + portHeight + 8)
    }
  }

  // 2x 10G SFP+ Optical Cages on the right
  ctx.strokeStyle = "#cbd5e1"
  ctx.lineWidth = 1.5
  ctx.strokeRect(450, 58, 22, 50)
  ctx.strokeRect(478, 58, 22, 50)
  ctx.fillStyle = "#181d24"
  ctx.fillRect(452, 60, 18, 46)
  ctx.fillRect(480, 60, 18, 46)

  ctx.fillStyle = "#38bdf8"
  ctx.font = "bold 8px monospace"
  ctx.fillText("SFP+ 1", 446, 50)
  ctx.fillText("SFP+ 2", 476, 50)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

/**
 * Procedural texture generator for Router OLED Status Screen
 */
function createRouterOLEDTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#090d14"
  ctx.fillRect(0, 0, 256, 128)

  // Border glow
  ctx.strokeStyle = "#38bdf8"
  ctx.lineWidth = 2
  ctx.strokeRect(4, 4, 248, 120)

  // Header telemetry
  ctx.fillStyle = "#38bdf8"
  ctx.font = "bold 11px monospace"
  ctx.fillText("EDGE CORE ROUTER • CCR2004", 12, 22)
  ctx.fillStyle = "#34d399"
  ctx.font = "bold 9px monospace"
  ctx.fillText("BGP UP • 10.0.0.1/24", 12, 38)

  // Telemetry Waveform Graph
  ctx.strokeStyle = "#38bdf8"
  ctx.lineWidth = 1.8
  ctx.beginPath()
  ctx.moveTo(12, 85)
  const points = [85, 78, 82, 65, 58, 72, 52, 68, 48, 62, 55, 75, 60, 45, 50, 40, 58, 70, 75, 80]
  points.forEach((py, idx) => {
    const px = 12 + idx * 11
    ctx.lineTo(px, py)
  })
  ctx.stroke()

  ctx.fillStyle = "#94a3b8"
  ctx.font = "9px monospace"
  ctx.fillText("RX: 9.84 Gbps  TX: 8.62 Gbps", 12, 112)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

/**
 * Procedural texture generator for Next-Gen Firewall Faceplate
 */
function createFirewallTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#222731"
  ctx.fillRect(0, 0, 512, 128)

  // Signature crimson security accent stripe
  ctx.fillStyle = "#ef4444"
  ctx.fillRect(0, 0, 512, 8)

  // Branding
  ctx.fillStyle = "#fca5a5"
  ctx.font = "bold 13px monospace"
  ctx.fillText("NEXT-GEN SECURITY GATEWAY • PA-440", 16, 30)
  ctx.fillStyle = "#cbd5e1"
  ctx.font = "10px monospace"
  ctx.fillText("HARDWARE CRYPTO ENGINE • ZERO-TRUST INGRESS", 16, 46)

  // Dedicated Interfaces
  const labels = ["WAN 1", "WAN 2", "LAN 1", "LAN 2", "DMZ", "MGMT", "HA 1", "HA 2"]
  labels.forEach((label, idx) => {
    const x = 16 + idx * 60
    const y = 64
    // Metal port
    ctx.fillStyle = "#d1d5db"
    ctx.fillRect(x, y, 36, 32)
    ctx.fillStyle = "#181d24"
    ctx.fillRect(x + 3, y + 3, 30, 26)
    ctx.fillStyle = "#facc15"
    ctx.fillRect(x + 6, y + 4, 24, 4)

    ctx.fillStyle = "#cbd5e1"
    ctx.font = "bold 8px monospace"
    ctx.fillText(label, x + 4, y + 45)
  })

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

/**
 * Procedural texture generator for SAN / NAS Storage Bay Faceplate
 */
function createStorageBayTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#20252e"
  ctx.fillRect(0, 0, 512, 128)

  // 6 Hot-Swap Drive Trays
  for (let i = 0; i < 6; i++) {
    const x = 12 + i * 80
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 1.5
    ctx.strokeRect(x, 8, 72, 112)

    // Brushed metal handle lever
    ctx.fillStyle = "#64748b"
    ctx.fillRect(x + 8, 16, 56, 18)
    ctx.fillStyle = "#cbd5e1"
    ctx.fillRect(x + 10, 18, 52, 4)

    // Airflow vents
    ctx.fillStyle = "#111418"
    for (let s = 42; s < 100; s += 8) {
      ctx.fillRect(x + 8, s, 56, 4)
    }

    // Numbering
    ctx.fillStyle = "#cbd5e1"
    ctx.font = "bold 8px monospace"
    ctx.fillText(`NVMe-${i + 1}`, x + 16, 114)
  }

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

export default function NetworkCore3D({ onNodeSelect }: NetworkCore3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const [hoveredNode, setHoveredNode] = useState<{
    name: string
    category: string
    deviceType: string
    role: string
    targetId: string
  } | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const isTouch = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getTouchServerSnapshot)
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
    const initialWidth = container.clientWidth
    const initialHeight = container.clientHeight
    const initialAspect = initialWidth / initialHeight
    const camera = new THREE.PerspectiveCamera(
      42,
      initialAspect,
      0.1,
      1000
    )

    // Dynamic camera distance for mobile & desktop fitting
    const calculateCameraZ = (aspect: number, width: number) => {
      if (width < 480) return 46
      if (width < 640) return 40
      if (aspect < 0.5) return 42
      if (aspect < 0.7) return 36
      if (aspect < 1.0) return 30
      if (aspect < 1.3) return 26
      return 23
    }
    const defaultInitZ = calculateCameraZ(initialAspect, initialWidth)
    let targetCameraZ = defaultInitZ
    let currentCameraZ = defaultInitZ
    const minCameraZ = 8.0
    const maxCameraZ = 48.0
    camera.position.set(0, 0.3, currentCameraZ)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(initialWidth, initialHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = isDark ? 2.15 : 1.3
    container.appendChild(renderer.domElement)

    // Generate Procedural Textures
    const brushedMetalTex = createBrushedMetalTexture()
    const ventMeshTex = createVentMeshTexture()
    const driveBayTex = createDriveBayTexture()
    const switchFaceTex = createSwitchFaceplateTexture()
    const routerOLEDTex = createRouterOLEDTexture()
    const firewallTex = createFirewallTexture()
    const storageBayTex = createStorageBayTexture()

    // --- REALISTIC LIGHTING RIG WITH METALLIC SPECULAR HIGHLIGHTS ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x475569 : 0xffffff,
      isDark ? 4.5 : 2.8
    )
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(
      isDark ? 0x60a5fa : 0xffffff,
      isDark ? 0x1e293b : 0x94a3b8,
      isDark ? 2.2 : 1.2
    )
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xbfdbfe : 0x3b82f6,
      isDark ? 7.5 : 4.2
    )
    keyLight.position.set(4, 9, 14)
    scene.add(keyLight)

    const backLight = new THREE.DirectionalLight(
      isDark ? 0x38bdf8 : 0x94a3b8,
      isDark ? 4.2 : 2.0
    )
    backLight.position.set(0, -6, -12)
    scene.add(backLight)

    const centerPointLight = new THREE.PointLight(
      isDark ? 0x60a5fa : 0x2563eb,
      isDark ? 8.0 : 4.0,
      35
    )
    centerPointLight.position.set(0, 0, 9)
    scene.add(centerPointLight)

    const leftClusterLight = new THREE.PointLight(
      isDark ? 0x3b82f6 : 0x2563eb,
      isDark ? 7.2 : 3.5,
      25
    )
    leftClusterLight.position.set(-8.5, 0, 6)
    scene.add(leftClusterLight)

    const rightClusterLight = new THREE.PointLight(
      isDark ? 0xf59e0b : 0xeab308,
      isDark ? 6.5 : 3.2,
      25
    )
    rightClusterLight.position.set(8.5, 0, 6)
    scene.add(rightClusterLight)

    // --- 3D SCENE GROUP ---
    const portfolioCoreGroup = new THREE.Group()
    
    // Mobile responsive 3D group scaling
    if (initialWidth < 480) {
      portfolioCoreGroup.scale.set(0.62, 0.62, 0.62)
    } else if (initialWidth < 640) {
      portfolioCoreGroup.scale.set(0.72, 0.72, 0.72)
    } else if (initialWidth < 768) {
      portfolioCoreGroup.scale.set(0.84, 0.84, 0.84)
    } else if (initialAspect < 1.0) {
      portfolioCoreGroup.scale.set(0.92, 0.92, 0.92)
    } else {
      portfolioCoreGroup.scale.set(1.0, 1.0, 1.0)
    }
    
    scene.add(portfolioCoreGroup)

    const raycastableMeshes: THREE.Mesh[] = []

    // --- AUTHENTIC HARDWARE MATERIALS ---
    // 1. Core Server Rack Chassis: Cold-rolled dark textured steel
    const chassisMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x2c3440 : 0xd2d9e0,
      metalness: isDark ? 0.72 : 0.85,
      roughness: isDark ? 0.28 : 0.26,
      bumpMap: brushedMetalTex || undefined,
      bumpScale: 0.012,
    })

    // 2. Bezel Vent Perforation
    const faceplateMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e232b : 0x2d3440,
      metalness: 0.5,
      roughness: 0.45,
      map: ventMeshTex || undefined,
    })

    // 3. Hot-Swap SAS/NVMe Drive Caddies
    const drivePanelMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x252b36 : 0xe2e8f0,
      metalness: 0.65,
      roughness: 0.35,
      map: driveBayTex || undefined,
    })

    // 4. Stainless Steel / Anodized Aluminum Trims & Rack Ears
    const metallicSilverMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xcbd5e1 : 0xf8fafc,
      metalness: 0.94,
      roughness: 0.16,
      bumpMap: brushedMetalTex || undefined,
      bumpScale: 0.008,
    })

    // 5. Rack Uprights / Posts
    const rackPillarMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x282f3a : 0x64748b,
      metalness: 0.88,
      roughness: 0.26,
    })

    // 6. Molded Cable Strain Relief Boots
    const bootMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x3d4756 : 0x475569,
      metalness: 0.35,
      roughness: 0.55,
    })

    // 7. RJ45 / SFP Port Metal Shielding
    const portMetalMat = new THREE.MeshStandardMaterial({
      color: 0xcfd6df,
      metalness: 0.92,
      roughness: 0.18,
    })

    // 8. Transparent Polycarbonate RJ45 Connector Plug Body
    const rj45PlugMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      transmission: 0.65,
      opacity: 0.85,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      ior: 1.5,
    })

    // 9. Hardware-specific materials
    const switchFaceMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x2d3542 : 0x3b4554,
      metalness: 0.6,
      roughness: 0.38,
      map: switchFaceTex || undefined,
    })

    const routerOLEDMat = new THREE.MeshStandardMaterial({
      color: 0x090d14,
      metalness: 0.2,
      roughness: 0.3,
      map: routerOLEDTex || undefined,
      emissive: 0x0284c7,
      emissiveIntensity: isDark ? 0.65 : 0.3,
    })

    const firewallFaceMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x282e38 : 0x38414e,
      metalness: 0.65,
      roughness: 0.35,
      map: firewallTex || undefined,
    })

    const storageBayMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x252b34 : 0x363e4b,
      metalness: 0.7,
      roughness: 0.35,
      map: storageBayTex || undefined,
    })

    const apBodyMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xf1f5f9 : 0xffffff,
      metalness: 0.12,
      roughness: 0.38,
    })

    const apHaloMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
    })

    const hubCasingMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x323a47 : 0x434c5b,
      metalness: 0.82,
      roughness: 0.3,
    })

    // =========================================================================
    // 1. CENTRAL OVERVIEW SERVER RACK (REALISTIC 3-BLADE 19" ENTERPRISE CHASSIS)
    // =========================================================================
    const centralHubGroup = new THREE.Group()
    portfolioCoreGroup.add(centralHubGroup)

    const bladeYPositions = [-1.4, 0, 1.4]
    
    // Core Server-only flickering activity LEDs
    const coreServerActivityLeds: {
      mesh: THREE.Mesh
      baseColor: number
      colorType: "green" | "cyan" | "amber"
      blinkPhase: number
      blinkRate: number
      burstGroup: number
    }[] = []

    bladeYPositions.forEach((yPos, bladeIndex) => {
      // Main 19" Chassis Box
      const bladeGeom = new THREE.BoxGeometry(4.6, 1.05, 3.4)
      const bladeMesh = new THREE.Mesh(bladeGeom, chassisMat)
      bladeMesh.position.set(0, yPos, 0)
      bladeMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Overview" : "Ringkasan Portofolio",
        category: isEn ? "Main Infrastructure" : "Infrastruktur Utama",
        deviceType: "3U Bare-Metal Cluster Chassis",
        role: isEn ? "Developer Profile & Key Highlights" : "Profil Pengembang & Sorotan Utama",
      }
      centralHubGroup.add(bladeMesh)
      raycastableMeshes.push(bladeMesh)

      // Left Front SAS Hot-Swap Bay Bezel
      const driveGeom = new THREE.BoxGeometry(2.1, 0.92, 0.12)
      const driveMesh = new THREE.Mesh(driveGeom, drivePanelMat)
      driveMesh.position.set(-1.15, yPos, 1.72)
      driveMesh.userData = bladeMesh.userData
      centralHubGroup.add(driveMesh)
      raycastableMeshes.push(driveMesh)

      // Right Front Honeycomb Airflow Bezel
      const faceGeom = new THREE.BoxGeometry(2.2, 0.92, 0.12)
      const faceMesh = new THREE.Mesh(faceGeom, faceplateMat)
      faceMesh.position.set(1.15, yPos, 1.72)
      faceMesh.userData = bladeMesh.userData
      centralHubGroup.add(faceMesh)
      raycastableMeshes.push(faceMesh)

      // 19" Rack Mounting Flange Ears (Stainless Silver)
      const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.08, 0.15), metallicSilverMat)
      leftEar.position.set(-2.42, yPos, 1.7)
      centralHubGroup.add(leftEar)

      const rightEar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.08, 0.15), metallicSilverMat)
      rightEar.position.set(2.42, yPos, 1.7)
      centralHubGroup.add(rightEar)

      // Cold-Rolled Philips Rack Mounting Screws
      const screwGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.05, 8)
      const screwMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.15 })
      ;[-0.38, 0.38].forEach((sy) => {
        const sL = new THREE.Mesh(screwGeom, screwMat)
        sL.rotation.x = Math.PI / 2
        sL.position.set(-2.42, yPos + sy, 1.78)
        centralHubGroup.add(sL)

        const sR = new THREE.Mesh(screwGeom, screwMat)
        sR.rotation.x = Math.PI / 2
        sR.position.set(2.42, yPos + sy, 1.78)
        centralHubGroup.add(sR)
      })

      // Front Industrial Handle Bars on Top and Bottom Blades
      if (bladeIndex !== 1) {
        const handleGeom = new THREE.BoxGeometry(0.08, 0.48, 0.32)
        const handleL = new THREE.Mesh(handleGeom, metallicSilverMat)
        handleL.position.set(-2.2, yPos, 1.85)
        centralHubGroup.add(handleL)

        const handleR = new THREE.Mesh(handleGeom, metallicSilverMat)
        handleR.position.set(2.2, yPos, 1.85)
        centralHubGroup.add(handleR)
      }

      // =======================================================================
      // CORE SERVER ONLY: REALISTIC CABLE-AWARE ACTIVITY & IDLE RED LEDS
      // (Flickers if a cable is connected below; stays solid IDLE RED if no cable)
      // =======================================================================
      
      // 1. Left Side: SAS Drive Activity Indicator Hubs
      const sasBayXPositions = [-1.65, -0.75]
      sasBayXPositions.forEach((bayX, bayIdx) => {
        // Metallic LED bezel housing
        const ledBezel = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.08, 0.025),
          portMetalMat
        )
        ledBezel.position.set(bayX, yPos + 0.38, 1.78)
        centralHubGroup.add(ledBezel)

        // Check if there is a cable connected beneath this slot
        const hasCable =
          (bladeIndex === 2 && bayIdx === 0) || // Top blade left: Skills cable
          (bladeIndex === 1 && (bayIdx === 0 || bayIdx === 1)) || // Middle blade left: Projects & Organizations cables
          (bladeIndex === 0 && bayIdx === 1) // Bottom blade left: Training cable

        const isAmber = bayIdx % 2 === 1
        const activeColorHex = isAmber ? 0xf59e0b : 0x10b981
        const idleRedHex = 0xef4444 // Idle RED for unconnected port

        const ledGeom = new THREE.SphereGeometry(0.032, 8, 8)
        const ledMat = new THREE.MeshBasicMaterial({
          color: hasCable ? activeColorHex : idleRedHex,
        })
        const ledMesh = new THREE.Mesh(ledGeom, ledMat)
        ledMesh.position.set(bayX, yPos + 0.38, 1.79)
        centralHubGroup.add(ledMesh)

        if (hasCable) {
          coreServerActivityLeds.push({
            mesh: ledMesh,
            baseColor: activeColorHex,
            colorType: isAmber ? "amber" : "green",
            blinkPhase: bayIdx * 2.5 + bladeIndex * 3.0,
            blinkRate: 11 + bayIdx * 4,
            burstGroup: bayIdx % 3,
          })
        }
      })

      // 2. Right Side: Telemetry & Network Activity Hubs
      const rightXPositions = [0.65, 1.25, 1.85]
      rightXPositions.forEach((rX, rIdx) => {
        const rBezel = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.08, 0.025),
          portMetalMat
        )
        rBezel.position.set(rX, yPos + 0.38, 1.78)
        centralHubGroup.add(rBezel)

        // Check if there is a cable connected beneath this slot
        const hasCable =
          (bladeIndex === 2 && (rIdx === 0 || rIdx === 2)) || // Top blade right: Experience & Awards cables
          (bladeIndex === 1 && rIdx === 1) || // Middle blade right: Repositories cable
          (bladeIndex === 0 && (rIdx === 0 || rIdx === 2)) // Bottom blade right: Resume & Contact cables

        const isCyan = rIdx === 1
        const isGreen = rIdx === 0
        const activeColorHex = isGreen ? 0x10b981 : isCyan ? 0x38bdf8 : 0xf59e0b
        const idleRedHex = 0xef4444 // Idle RED for unconnected port

        const ledGeom = new THREE.SphereGeometry(0.032, 8, 8)
        const ledMat = new THREE.MeshBasicMaterial({
          color: hasCable ? activeColorHex : idleRedHex,
        })
        const ledMesh = new THREE.Mesh(ledGeom, ledMat)
        ledMesh.position.set(rX, yPos + 0.38, 1.79)
        centralHubGroup.add(ledMesh)

        if (hasCable) {
          coreServerActivityLeds.push({
            mesh: ledMesh,
            baseColor: activeColorHex,
            colorType: isCyan ? "cyan" : isGreen ? "green" : "amber",
            blinkPhase: rIdx * 2.2 + bladeIndex * 3.5,
            blinkRate: 12 + rIdx * 3,
            burstGroup: (rIdx + 1) % 3,
          })
        }
      })
    })

    // Central Structural 19" Rack Posts (Uprights)
    const pillarGeom = new THREE.BoxGeometry(0.22, 4.5, 0.22)
    const pillarPositions = [
      [-2.42, 0, 1.72],
      [2.42, 0, 1.72],
      [-2.42, 0, -1.72],
      [2.42, 0, -1.72],
    ]
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeom, rackPillarMat)
      pillar.position.set(x, y, z)
      centralHubGroup.add(pillar)
    })

    // =========================================================================
    // 2. SURROUNDING NETWORK HARDWARE NODES (SWITCH, ROUTER, FIREWALL, AP, ETC.)
    // =========================================================================
    const portfolioNodes: PortfolioNodeData[] = [
      // LEFT SIDE (4 Nodes: Blue Patch Cables)
      {
        id: "skills",
        name: isEn ? "Skills" : "Keahlian",
        category: isEn ? "Network Switch" : "Switch Jaringan",
        deviceType: "24-Port L3 Managed Switch",
        role: isEn ? "Full-stack protocol matrix & engineering toolchains" : "Matriks protokol & alat pengembangan sistem",
        targetId: "#skills",
        position: new THREE.Vector3(-8.4, 4.5, -1.0),
        portIndex: 0,
        portLocalOffset: new THREE.Vector3(1.15, 0.05, 0.35),
        portApproachVector: new THREE.Vector3(1, 0, 0),
        connectorType: "rj45",
      },
      {
        id: "projects",
        name: isEn ? "Projects" : "Proyek",
        category: isEn ? "Core Edge Router" : "Router Edge Utama",
        deviceType: "High-Throughput Enterprise Router",
        role: isEn ? "Key systems, autonomous robotics & embedded platforms" : "Sistem utama, robotika otonom & platform embedded",
        targetId: "#featured-engineering",
        position: new THREE.Vector3(-9.0, 1.8, 0.8),
        portIndex: 1,
        portLocalOffset: new THREE.Vector3(1.15, 0.0, 0.25),
        portApproachVector: new THREE.Vector3(1, 0, 0),
        connectorType: "sfp",
      },
      {
        id: "organizations",
        name: isEn ? "Organizations" : "Organisasi",
        category: isEn ? "Wireless AP" : "Access Point Nirkabel",
        deviceType: "Enterprise Wi-Fi 6 Access Point",
        role: isEn ? "Student activities & laboratory engineering teams" : "Kegiatan mahasiswa & tim laboratorium",
        targetId: "#organizations",
        position: new THREE.Vector3(-9.2, -1.0, -0.4),
        portIndex: 2,
        portLocalOffset: new THREE.Vector3(0.9, -0.15, 0.0),
        portApproachVector: new THREE.Vector3(1, 0, 0),
        connectorType: "rj45",
      },
      {
        id: "training",
        name: isEn ? "Training" : "Pelatihan",
        category: isEn ? "Industrial Hub" : "Hub Industri",
        deviceType: "Rugged Gigabit Multi-Port Bridge",
        role: isEn ? "Technical certifications & specialized workshops" : "Sertifikasi teknis & lokakarya spesialis",
        targetId: "#training",
        position: new THREE.Vector3(-8.4, -4.2, 0.6),
        portIndex: 3,
        portLocalOffset: new THREE.Vector3(1.05, 0.0, 0.25),
        portApproachVector: new THREE.Vector3(1, 0, 0),
        connectorType: "rj45",
      },

      // RIGHT SIDE (5 Nodes: Yellow Warning Cables)
      {
        id: "experience",
        name: isEn ? "Experience" : "Pengalaman",
        category: isEn ? "Next-Gen Firewall" : "Firewall Next-Gen",
        deviceType: "Hardware Security Appliance",
        role: isEn ? "Professional internships & teaching appointments" : "Magang profesional & asisten laboratorium",
        targetId: "#experience",
        position: new THREE.Vector3(8.4, 4.5, -1.0),
        portIndex: 4,
        portLocalOffset: new THREE.Vector3(-1.15, 0.05, 0.35),
        portApproachVector: new THREE.Vector3(-1, 0, 0),
        connectorType: "rj45",
      },
      {
        id: "awards",
        name: isEn ? "Awards" : "Penghargaan",
        category: isEn ? "SAN Storage Array" : "Storage SAN / NAS",
        deviceType: "High-Density NVMe Storage Node",
        role: isEn ? "National championships & academic distinctions" : "Kejuaraan nasional & apresiasi akademik",
        targetId: "#awards",
        position: new THREE.Vector3(9.0, 1.8, 0.8),
        portIndex: 5,
        portLocalOffset: new THREE.Vector3(-1.15, 0.0, 0.25),
        portApproachVector: new THREE.Vector3(-1, 0, 0),
        connectorType: "sfp",
      },
      {
        id: "repositories",
        name: isEn ? "Repositories" : "Repositori",
        category: isEn ? "Blade Server Node" : "Server Komputasi 1U",
        deviceType: "Hypervisor Compute Blade",
        role: isEn ? "50 public repositories on GitHub" : "50 repositori publik di GitHub",
        targetId: "#repositories",
        position: new THREE.Vector3(9.2, -1.0, -0.4),
        portIndex: 6,
        portLocalOffset: new THREE.Vector3(-1.15, 0.0, 0.25),
        portApproachVector: new THREE.Vector3(-1, 0, 0),
        connectorType: "rj45",
      },
      {
        id: "resume",
        name: isEn ? "Resume / CV" : "Resume / CV",
        category: isEn ? "HSM Security Gateway" : "Modul Keamanan HSM",
        deviceType: "Hardware Security Module",
        role: isEn ? "Download PDF resume in English or Indonesian" : "Unduh berkas PDF dalam bahasa Inggris atau Indonesia",
        targetId: "#resume",
        position: new THREE.Vector3(8.4, -3.6, 0.6),
        portIndex: 7,
        portLocalOffset: new THREE.Vector3(-1.15, 0.0, 0.25),
        portApproachVector: new THREE.Vector3(-1, 0, 0),
        connectorType: "sfp",
      },
      {
        id: "contact",
        name: isEn ? "Get in Touch" : "Hubungi Saya",
        category: isEn ? "Telecom Gateway" : "Gateway Telekomunikasi",
        deviceType: "Optical Ingress Distribution Unit",
        role: isEn ? "Email, LinkedIn, GitHub, WhatsApp, and Social Networks" : "Email, LinkedIn, GitHub, WhatsApp, dan Media Sosial",
        targetId: "#contact",
        position: new THREE.Vector3(7.6, -5.6, -1.0),
        portIndex: 8,
        portLocalOffset: new THREE.Vector3(-1.15, 0.0, 0.25),
        portApproachVector: new THREE.Vector3(-1, 0, 0),
        connectorType: "rj45",
      },
    ]

    // Helper to construct highly detailed 3D models for each hardware type
    const buildSectionModule = (node: PortfolioNodeData): THREE.Group => {
      const g = new THREE.Group()
      const isLeft = node.position.x < 0

      switch (node.id) {
        // =====================================================================
        // 1. MANAGED 24-PORT SWITCH (SKILLS)
        // =====================================================================
        case "skills": {
          // Chassis: Dark slate gray steel
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.75, 1.4), switchFaceMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          // Front Bezel with 24-Port Silk Screen Texture
          const face = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.68, 0.06), switchFaceMat)
          face.position.set(0, 0, 0.73)
          face.userData = node
          g.add(face)
          raycastableMeshes.push(face)

          // Rack Ears (Stainless Silver)
          const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.08), metallicSilverMat)
          leftEar.position.set(-1.18, 0, 0.73)
          g.add(leftEar)
          const rightEar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.08), metallicSilverMat)
          rightEar.position.set(1.18, 0, 0.73)
          g.add(rightEar)

          // Steady Solid Green Link LEDs across switch ports
          for (let p = -0.7; p <= 0.7; p += 0.18) {
            const pLed = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), new THREE.MeshBasicMaterial({ color: 0x10b981 }))
            pLed.position.set(p, 0.22, 0.76)
            g.add(pLed)
          }
          break
        }

        // =====================================================================
        // 2. CORE EDGE ROUTER (PROJECTS)
        // =====================================================================
        case "projects": {
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 1.4), chassisMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          // OLED Telemetry Display on Left Front
          const oledScreen = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.62, 0.06), routerOLEDMat)
          oledScreen.position.set(-0.55, 0, 0.73)
          oledScreen.userData = node
          g.add(oledScreen)
          raycastableMeshes.push(oledScreen)

          // 4x SFP+ 10G Optical Fiber Transceiver Cages on Right Front
          for (let i = 0; i < 4; i++) {
            const sfpCage = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.12), portMetalMat)
            sfpCage.position.set(0.25 + i * 0.22, 0, 0.74)
            g.add(sfpCage)

            // Inner dark cavity
            const sfpHole = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.25, 0.04), faceplateMat)
            sfpHole.position.set(0.25 + i * 0.22, 0, 0.8)
            g.add(sfpHole)
          }

          // Steady Solid Cyan SFP Activity Status LEDs
          for (let i = 0; i < 4; i++) {
            const sLed = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }))
            sLed.position.set(0.25 + i * 0.22, 0.24, 0.77)
            g.add(sLed)
          }
          break
        }

        // =====================================================================
        // 3. ENTERPRISE WIRELESS ACCESS POINT (ORGANIZATIONS)
        // =====================================================================
        case "organizations": {
          // Sleek Saucer Dome Housing (Matte Clean Off-White)
          const apDisc = new THREE.Mesh(
            new THREE.CylinderGeometry(1.0, 1.15, 0.38, 32),
            apBodyMat
          )
          apDisc.rotation.x = Math.PI / 2
          apDisc.userData = node
          g.add(apDisc)
          raycastableMeshes.push(apDisc)

          // Front Convex Dome Cap
          const domeCap = new THREE.Mesh(
            new THREE.SphereGeometry(0.95, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3),
            apBodyMat
          )
          domeCap.position.set(0, 0, 0.12)
          domeCap.rotation.x = Math.PI / 2
          g.add(domeCap)

          // Glowing Subtle Cyan Halo Ring in Center
          const haloRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.42, 0.035, 16, 32),
            apHaloMat
          )
          haloRing.position.set(0, 0, 0.32)
          g.add(haloRing)

          // Wall/Ceiling Mounting Plate at Back
          const mountPlate = new THREE.Mesh(
            new THREE.CylinderGeometry(0.85, 0.85, 0.08, 24),
            metallicSilverMat
          )
          mountPlate.rotation.x = Math.PI / 2
          mountPlate.position.set(0, 0, -0.22)
          g.add(mountPlate)
          break
        }

        // =====================================================================
        // 4. INDUSTRIAL GIGABIT HUB (TRAINING)
        // =====================================================================
        case "training": {
          // Rugged Cast-Iron Dark Casing
          const hubChassis = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.9, 1.2), hubCasingMat)
          hubChassis.userData = node
          g.add(hubChassis)
          raycastableMeshes.push(hubChassis)

          // Extruded Aluminum Cooling Ribs along top & sides
          for (let r = -0.8; r <= 0.8; r += 0.22) {
            const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 1.22), metallicSilverMat)
            fin.position.set(r, 0, 0)
            g.add(fin)
          }

          // 8-Port RJ45 Block on Front Face
          const rj45Block = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.45, 0.12), portMetalMat)
          rj45Block.position.set(0, 0, 0.65)
          g.add(rj45Block)

          // Steady Solid Green Link LEDs
          for (let p = -0.6; p <= 0.6; p += 0.18) {
            const l = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), new THREE.MeshBasicMaterial({ color: 0x10b981 }))
            l.position.set(p, 0.28, 0.68)
            g.add(l)
          }
          break
        }

        // =====================================================================
        // 5. NEXT-GEN HARDWARE FIREWALL (EXPERIENCE)
        // =====================================================================
        case "experience": {
          // Stealth Dark Gunmetal Chassis with Crimson Stripe
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 1.4), chassisMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          // Front Faceplate with Firewall Graphics
          const face = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.78, 0.06), firewallFaceMat)
          face.position.set(0, 0, 0.73)
          face.userData = node
          g.add(face)
          raycastableMeshes.push(face)

          // Security Accent Line (Crimson Red)
          const crimsonBar = new THREE.Mesh(
            new THREE.BoxGeometry(2.22, 0.05, 0.08),
            new THREE.MeshBasicMaterial({ color: 0xdc2626 })
          )
          crimsonBar.position.set(0, 0.38, 0.73)
          g.add(crimsonBar)

          // Security Engine Status LEDs: SEC (Green), VPN (Cyan), THREAT (Amber)
          const ledSec = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0x10b981 }))
          ledSec.position.set(0.75, 0.22, 0.76)
          g.add(ledSec)

          const ledVpn = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }))
          ledVpn.position.set(0.88, 0.22, 0.76)
          g.add(ledVpn)
          break
        }

        // =====================================================================
        // 6. SAN / NAS STORAGE ARRAY (AWARDS)
        // =====================================================================
        case "awards": {
          // Anodized Black Chassis
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.95, 1.4), chassisMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          // 6 Hot-Swap Drive Bays Bezel
          const face = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.88, 0.06), storageBayMat)
          face.position.set(0, 0, 0.73)
          face.userData = node
          g.add(face)
          raycastableMeshes.push(face)

          // 6 Brushed Aluminum Drive Lever Handles
          for (let i = -0.75; i <= 0.75; i += 0.3) {
            const handle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.05), metallicSilverMat)
            handle.position.set(i, 0.22, 0.76)
            g.add(handle)

            // Steady Green Drive OK LED
            const dLed = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), new THREE.MeshBasicMaterial({ color: 0x10b981 }))
            dLed.position.set(i, -0.3, 0.76)
            g.add(dLed)
          }
          break
        }

        // =====================================================================
        // 7. BLADE COMPUTE SERVER / HYPERVISOR (REPOSITORIES)
        // =====================================================================
        case "repositories": {
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 1.4), chassisMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          // Honeycomb Mesh Faceplate
          const face = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.78, 0.06), faceplateMat)
          face.position.set(0, 0, 0.73)
          face.userData = node
          g.add(face)
          raycastableMeshes.push(face)

          // Dual NVMe SSD Trays on Left
          for (let d = -0.7; d <= -0.25; d += 0.45) {
            const tray = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.65, 0.08), drivePanelMat)
            tray.position.set(d, 0, 0.76)
            g.add(tray)
          }

          // Blue UID (Unit Identifier) Button & Solid Green Power Indicator
          const uidBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 12), new THREE.MeshBasicMaterial({ color: 0x2563eb }))
          uidBtn.rotation.x = Math.PI / 2
          uidBtn.position.set(0.65, 0.18, 0.76)
          g.add(uidBtn)

          const pwrLed = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0x10b981 }))
          pwrLed.position.set(0.82, 0.18, 0.76)
          g.add(pwrLed)
          break
        }

        // =====================================================================
        // 8. HARDWARE SECURITY MODULE / HSM (RESUME)
        // =====================================================================
        case "resume": {
          // Brushed Titanium / Aluminum Faceplate
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 1.4), chassisMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          const face = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.78, 0.06), metallicSilverMat)
          face.position.set(0, 0, 0.73)
          face.userData = node
          g.add(face)
          raycastableMeshes.push(face)

          // Keylock Cylinder Barrel
          const keyBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), portMetalMat)
          keyBarrel.rotation.x = Math.PI / 2
          keyBarrel.position.set(-0.65, 0, 0.76)
          g.add(keyBarrel)

          // Cryptographic Smartcard Slot
          const cardSlot = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.08), faceplateMat)
          cardSlot.position.set(0.2, 0.15, 0.76)
          g.add(cardSlot)

          // Secure Optical Fiber Port
          const fiberPort = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.28, 0.08), portMetalMat)
          fiberPort.position.set(0.2, -0.15, 0.76)
          g.add(fiberPort)
          break
        }

        // =====================================================================
        // 9. TELECOM INGRESS GATEWAY (CONTACT)
        // =====================================================================
        case "contact": {
          const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 1.4), hubCasingMat)
          chassis.userData = node
          g.add(chassis)
          raycastableMeshes.push(chassis)

          const face = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.78, 0.06), faceplateMat)
          face.position.set(0, 0, 0.73)
          face.userData = node
          g.add(face)
          raycastableMeshes.push(face)

          // Duplex Optical Couplers (Blue/Green Optical SC Barrels)
          const blueCoupler = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.12), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 }))
          blueCoupler.position.set(-0.55, 0, 0.76)
          g.add(blueCoupler)

          const greenCoupler = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.12), new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3 }))
          greenCoupler.position.set(-0.25, 0, 0.76)
          g.add(greenCoupler)

          // 5-Segment Signal dBm Meter (Solid Steady Bar)
          const signalColors = [0x10b981, 0x10b981, 0x10b981, 0x38bdf8, 0xf59e0b]
          signalColors.forEach((col, idx) => {
            const seg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.04), new THREE.MeshBasicMaterial({ color: col }))
            seg.position.set(0.25 + idx * 0.1, 0, 0.76)
            g.add(seg)
          })
          break
        }
      }

      // =======================================================================
      // REALISTIC RJ45 / SFP INGRESS PORT RECEPTACLE ON THE DEVICE
      // =======================================================================
      const portReceptacleGroup = new THREE.Group()
      portReceptacleGroup.position.copy(node.portLocalOffset)

      // Metal socket frame
      const socketFrame = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.18), portMetalMat)
      portReceptacleGroup.add(socketFrame)

      // Inner cavity
      const innerCavity = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.15, 0.06), faceplateMat)
      innerCavity.position.set(isLeft ? 0.07 : -0.07, 0, 0)
      portReceptacleGroup.add(innerCavity)

      g.add(portReceptacleGroup)

      return g
    }

    portfolioNodes.forEach((node) => {
      const nodeModel = buildSectionModule(node)
      nodeModel.position.copy(node.position)
      portfolioCoreGroup.add(nodeModel)
      node.mesh = nodeModel
    })

    // =========================================================================
    // 3. ZERO-COLLISION 3D SPATIAL ROUTING FOR ALL 9 CABLES WITH PRECISION MATING
    //    - Left cables: Datacenter Patch Blue (0x1d65ec)
    //    - Right cables: Industrial Warning Yellow (0xeab308)
    //    - Master cable: Industrial Matte Black (0x111215)
    // =========================================================================
    const centralPortPositions = [
      new THREE.Vector3(-1.35, 1.28, 1.82),  // 0: skills
      new THREE.Vector3(-1.55, -0.12, 1.82), // 1: projects
      new THREE.Vector3(-0.65, -0.12, 1.82), // 2: organizations
      new THREE.Vector3(-1.05, -1.52, 1.82), // 3: training
      new THREE.Vector3(0.65, 1.28, 1.82),   // 4: experience
      new THREE.Vector3(1.55, 1.28, 1.82),   // 5: awards
      new THREE.Vector3(1.10, -0.12, 1.82),  // 6: repositories
      new THREE.Vector3(0.65, -1.52, 1.82),  // 7: resume
      new THREE.Vector3(1.55, -1.52, 1.82),  // 8: contact
    ]

    // Render physical 3D port sockets on the central rack blades
    centralPortPositions.forEach((port) => {
      // Metallic port frame
      const portBezel = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.14), portMetalMat)
      portBezel.position.set(port.x, port.y, port.z - 0.04)
      centralHubGroup.add(portBezel)

      // Inner cavity
      const innerHole = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.04), faceplateMat)
      innerHole.position.set(port.x, port.y, port.z + 0.03)
      centralHubGroup.add(innerHole)

      // Molded strain relief boot pointing forward along +Z
      const bootMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, 0.22, 12), bootMat)
      bootMesh.rotation.x = Math.PI / 2
      bootMesh.position.set(port.x, port.y, port.z + 0.12)
      centralHubGroup.add(bootMesh)
    })

    const cableMeshes: {
      mesh: THREE.Mesh
      pulseSpeed: number
      pulseOffset: number
      baseEmissive: number
      type: "black" | "blue" | "yellow"
    }[] = []

    // Left Cable Material: Datacenter Patch Blue
    const leftCableMat = new THREE.MeshStandardMaterial({
      color: 0x1d65ec,
      roughness: 0.35,
      metalness: 0.25,
      emissive: 0x1d65ec,
      emissiveIntensity: isDark ? 0.28 : 0.12,
    })

    // Right Cable Material: Industrial Warning Yellow
    const rightCableMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.35,
      metalness: 0.25,
      emissive: 0xeab308,
      emissiveIntensity: isDark ? 0.28 : 0.12,
    })

    // Precise 3D Catmull-Rom Spline Generation for seamless port-to-port connection
    portfolioNodes.forEach((node) => {
      const isLeft = node.position.x < 0
      const originPort = centralPortPositions[node.portIndex]
      
      // Calculate exact world coordinate of the port on the destination node
      const destPort = node.position.clone().add(node.portLocalOffset)
      
      // Lead-in vector: 0.65 units directly in front of the device's port
      const leadInPoint = destPort.clone().add(node.portApproachVector.clone().multiplyScalar(0.65))

      // Intermediate sweeping arc control points
      let mid1: THREE.Vector3
      let mid2: THREE.Vector3
      let mid3: THREE.Vector3

      switch (node.id) {
        case "skills":
          mid1 = new THREE.Vector3(-1.35, 1.28, 2.4)
          mid2 = new THREE.Vector3(-3.8, 3.2, 2.2)
          mid3 = new THREE.Vector3(-6.4, 4.4, 0.6)
          break
        case "projects":
          mid1 = new THREE.Vector3(-1.55, -0.12, 2.7)
          mid2 = new THREE.Vector3(-4.5, 0.9, 3.2)
          mid3 = new THREE.Vector3(-7.2, 1.7, 2.1)
          break
        case "organizations":
          mid1 = new THREE.Vector3(-0.65, -0.12, 2.3)
          mid2 = new THREE.Vector3(-3.4, -0.5, 1.8)
          mid3 = new THREE.Vector3(-6.5, -0.9, 0.7)
          break
        case "training":
          mid1 = new THREE.Vector3(-1.05, -1.52, 2.5)
          mid2 = new THREE.Vector3(-3.9, -2.7, 2.6)
          mid3 = new THREE.Vector3(-6.5, -3.9, 1.6)
          break
        case "experience":
          mid1 = new THREE.Vector3(0.65, 1.28, 2.4)
          mid2 = new THREE.Vector3(3.8, 3.2, 2.0)
          mid3 = new THREE.Vector3(6.4, 4.4, 0.6)
          break
        case "awards":
          mid1 = new THREE.Vector3(1.55, 1.28, 2.7)
          mid2 = new THREE.Vector3(4.5, 1.7, 3.2)
          mid3 = new THREE.Vector3(7.2, 1.7, 2.1)
          break
        case "repositories":
          mid1 = new THREE.Vector3(1.10, -0.12, 2.3)
          mid2 = new THREE.Vector3(3.8, -0.5, 2.0)
          mid3 = new THREE.Vector3(6.8, -0.9, 0.8)
          break
        case "resume":
          mid1 = new THREE.Vector3(0.65, -1.52, 2.4)
          mid2 = new THREE.Vector3(3.6, -2.6, 2.1)
          mid3 = new THREE.Vector3(6.2, -3.4, 1.3)
          break
        case "contact":
          mid1 = new THREE.Vector3(1.55, -1.52, 2.8)
          mid2 = new THREE.Vector3(3.9, -3.8, 2.6)
          mid3 = new THREE.Vector3(5.8, -5.0, 0.9)
          break
        default:
          mid1 = originPort.clone().add(new THREE.Vector3(0, 0, 0.8))
          mid2 = originPort.clone().lerp(destPort, 0.4).add(new THREE.Vector3(0, 0, 1.5))
          mid3 = originPort.clone().lerp(destPort, 0.8).add(new THREE.Vector3(0, 0, 0.8))
      }

      // Construct Smooth 3D Spline
      const curve = new THREE.CatmullRomCurve3([
        originPort,
        mid1,
        mid2,
        mid3,
        leadInPoint,
        destPort,
      ])

      const tubeGeom = new THREE.TubeGeometry(curve, 52, 0.088, 10, false)
      const targetMat = isLeft ? leftCableMat.clone() : rightCableMat.clone()
      const cableMesh = new THREE.Mesh(tubeGeom, targetMat)
      portfolioCoreGroup.add(cableMesh)

      // Molded Snagless Strain-Relief Boot & RJ45 Connector Plug at destination socket
      const connectorGroup = new THREE.Group()
      connectorGroup.position.copy(destPort)

      // Boot
      const endBoot = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, 0.22, 12), bootMat)
      endBoot.rotation.z = Math.PI / 2
      endBoot.position.set(isLeft ? 0.11 : -0.11, 0, 0)
      connectorGroup.add(endBoot)

      // RJ45 Clear Plug Body with Retention Clip
      const plugBody = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.14), rj45PlugMat)
      plugBody.position.set(isLeft ? -0.04 : 0.04, 0, 0)
      connectorGroup.add(plugBody)

      const clip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.05), rj45PlugMat)
      clip.position.set(isLeft ? -0.04 : 0.04, 0.08, 0)
      connectorGroup.add(clip)

      portfolioCoreGroup.add(connectorGroup)

      cableMeshes.push({
        mesh: cableMesh,
        pulseSpeed: 1.0 + (node.portIndex % 3) * 0.15,
        pulseOffset: node.portIndex * 0.5,
        baseEmissive: isDark ? 0.25 : 0.1,
        type: isLeft ? "blue" : "yellow",
      })
    })

    // MASTER CABLE TO CORE RACK SERVER: UNLIMITED ENDLESS INDUSTRIAL MATTE BLACK (Extending to y = -140.0)
    const masterConduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.95, 0),
      new THREE.Vector3(0, -5.0, 0.6),
      new THREE.Vector3(0, -14.0, 1.8),
      new THREE.Vector3(0, -30.0, 3.5),
      new THREE.Vector3(0, -60.0, 6.5),
      new THREE.Vector3(0, -100.0, 10.0),
      new THREE.Vector3(0, -140.0, 14.0),
    ])
    const masterConduitGeom = new THREE.TubeGeometry(masterConduitCurve, 64, 0.28, 14, false)
    const masterConduitMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x22262e : 0x181b20,
      roughness: 0.52,
      metalness: 0.22,
      emissive: 0x121418,
      emissiveIntensity: isDark ? 0.22 : 0.1,
    })
    const masterConduitMesh = new THREE.Mesh(masterConduitGeom, masterConduitMat)
    portfolioCoreGroup.add(masterConduitMesh)
    cableMeshes.push({
      mesh: masterConduitMesh,
      pulseSpeed: 0.8,
      pulseOffset: 0,
      baseEmissive: isDark ? 0.15 : 0.08,
      type: "black",
    })

    // Master Trunk Strain Relief Collar at Base of Rack
    const masterCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.38, 0.3, 16),
      metallicSilverMat
    )
    masterCollar.position.set(0, -1.95, 0)
    portfolioCoreGroup.add(masterCollar)

    // =========================================================================
    // 4. INTERACTION CONTROLS: LEFT CLICK IS ORBIT ONLY, RIGHT CLICK IS SELECT
    // =========================================================================
    const targetRotation = { x: 0.12, y: -0.15 }
    const currentRotation = { x: 0.12, y: -0.15 }
    const velocity = { x: 0, y: 0 }
    let isDragging = false
    let prevPointer = { x: 0, y: 0 }

    const raycaster = new THREE.Raycaster()
    const mouseCoord = new THREE.Vector2()

    // Touch Pinch Zoom & Long-press hold tracking
    let initialPinchDist: number | null = null
    let pinchStartZ = targetCameraZ
    let touchStartCoord = { x: 0, y: 0 }
    let longPressTimer: ReturnType<typeof setTimeout> | null = null
    let hitTargetOnTouch: string | null = null

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if ("button" in e && (e as MouseEvent).button !== 0) return
      isDragging = true
      setIsInteracting(true)
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      prevPointer = { x: clientX, y: clientY }
      velocity.x = 0
      velocity.y = 0

      if ("touches" in e) {
        if (e.touches.length === 1) {
          touchStartCoord = { x: clientX, y: clientY }

          const rect = container.getBoundingClientRect()
          mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1
          mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1
          raycaster.setFromCamera(mouseCoord, camera)
          const intersects = raycaster.intersectObjects(raycastableMeshes)

          if (intersects.length > 0) {
            const hit = intersects[0].object as THREE.Mesh
            hitTargetOnTouch = hit.userData.targetId || null
            setHoveredNode({
              name: hit.userData.name,
              category: hit.userData.category,
              deviceType: hit.userData.deviceType,
              role: hit.userData.role,
              targetId: hit.userData.targetId,
            })

            // Hold on node for 360ms directly navigates to the target section
            if (longPressTimer) clearTimeout(longPressTimer)
            longPressTimer = setTimeout(() => {
              if (hitTargetOnTouch) {
                handleNodeClick(hitTargetOnTouch)
              }
            }, 360)
          } else {
            hitTargetOnTouch = null
            if (longPressTimer) clearTimeout(longPressTimer)
          }
        } else if (e.touches.length === 2) {
          if (longPressTimer) {
            clearTimeout(longPressTimer)
            longPressTimer = null
          }
          const dx = e.touches[0].clientX - e.touches[1].clientX
          const dy = e.touches[0].clientY - e.touches[1].clientY
          initialPinchDist = Math.sqrt(dx * dx + dy * dy)
          pinchStartZ = targetCameraZ
        }
      }
    }

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      // Handle 2-finger touch pinch zoom
      if ("touches" in e && e.touches.length === 2 && initialPinchDist !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const currentDist = Math.sqrt(dx * dx + dy * dy)
        const factor = initialPinchDist / Math.max(1, currentDist)
        targetCameraZ = Math.max(minCameraZ, Math.min(maxCameraZ, pinchStartZ * factor))
        return
      }

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      if ("touches" in e && e.touches.length === 1) {
        const dist = Math.hypot(clientX - touchStartCoord.x, clientY - touchStartCoord.y)
        // If moved more than 8px, cancel long-press hold and treat as drag orbit rotation
        if (dist > 8) {
          if (longPressTimer) {
            clearTimeout(longPressTimer)
            longPressTimer = null
          }
        }
      }

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
            category: hit.userData.category,
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

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      isDragging = false
      if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
      }
      if ("touches" in e && e.touches.length < 2) {
        initialPinchDist = null
      }
      setTimeout(() => setIsInteracting(false), 800)
    }

    // MOUSE WHEEL SCROLL ZOOM IN / ZOOM OUT
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const zoomSpeed = 0.022
      targetCameraZ += e.deltaY * zoomSpeed
      targetCameraZ = Math.max(minCameraZ, Math.min(maxCameraZ, targetCameraZ))
      setIsInteracting(true)
      setTimeout(() => setIsInteracting(false), 800)
    }

    // DOUBLE CLICK ZOOM IN / ZOOM OUT TOGGLE
    const onDblClick = (e: MouseEvent) => {
      e.preventDefault()
      const w = container.clientWidth
      const h = container.clientHeight
      const aspect = w / h
      const defZ = calculateCameraZ(aspect, w)
      if (targetCameraZ > 17.0) {
        targetCameraZ = 12.0
      } else {
        targetCameraZ = defZ
      }
      setIsInteracting(true)
      setTimeout(() => setIsInteracting(false), 800)
    }

    // RIGHT CLICK triggers navigation into the portfolio on desktop
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      const rect = container.getBoundingClientRect()
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouseCoord, camera)
      const intersects = raycaster.intersectObjects(raycastableMeshes)
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh
        if (hit.userData.targetId) {
          handleNodeClick(hit.userData.targetId)
        }
      }
    }

    container.addEventListener("mousedown", onPointerDown)
    window.addEventListener("mousemove", onPointerMove, { passive: true })
    window.addEventListener("mouseup", onPointerUp)
    container.addEventListener("contextmenu", onContextMenu)
    container.addEventListener("wheel", onWheel, { passive: false })
    container.addEventListener("dblclick", onDblClick)

    container.addEventListener("touchstart", onPointerDown, { passive: true })
    window.addEventListener("touchmove", onPointerMove, { passive: true })
    window.addEventListener("touchend", onPointerUp)

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      const aspect = w / h
      camera.aspect = aspect
      targetCameraZ = calculateCameraZ(aspect, w)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)

      // Mobile responsive 3D group scaling
      if (w < 480) {
        portfolioCoreGroup.scale.set(0.62, 0.62, 0.62)
      } else if (w < 640) {
        portfolioCoreGroup.scale.set(0.72, 0.72, 0.72)
      } else if (w < 768) {
        portfolioCoreGroup.scale.set(0.84, 0.84, 0.84)
      } else if (aspect < 1.0) {
        portfolioCoreGroup.scale.set(0.92, 0.92, 0.92)
      } else {
        portfolioCoreGroup.scale.set(1.0, 1.0, 1.0)
      }
    }
    window.addEventListener("resize", handleResize)

    // =========================================================================
    // 5. ANIMATION LOOP
    //    - CORE SERVER ONLY: Realistic Asynchronous Disk I/O & Network Activity Flickering
    //    - PERIPHERAL BOXES: Clean, Solid Steady Link Lights (No Blinking)
    // =========================================================================
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

      portfolioCoreGroup.rotation.x = currentRotation.x
      portfolioCoreGroup.rotation.y = currentRotation.y

      // Smooth camera zoom interpolation
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.1
      camera.position.z = currentCameraZ

      // REALISTIC DISK I/O ACTIVITY FLICKERING STRICTLY ON THE CORE SERVER RACK
      coreServerActivityLeds.forEach((led) => {
        const mat = led.mesh.material as THREE.MeshBasicMaterial
        // High-frequency pseudo-random I/O traffic burst
        const burst = Math.sin(time * led.blinkRate + led.blinkPhase) * 
                      Math.cos(time * (led.blinkRate * 1.6) + led.burstGroup)
        
        const isBlinkingOn = burst > 0.15
        if (isBlinkingOn) {
          mat.color.setHex(led.baseColor)
        } else {
          // Dim idle state for realism
          mat.color.setHex(isDark ? 0x091016 : 0x475569)
        }
      })

      // Realistic transmission pulse per cable group
      cableMeshes.forEach((cable) => {
        const mat = cable.mesh.material as THREE.MeshStandardMaterial
        const wave = Math.sin(time * cable.pulseSpeed + cable.pulseOffset) * 0.12
        if (cable.type === "black") {
          mat.emissiveIntensity = Math.max(0.05, cable.baseEmissive + wave * 0.05)
        } else {
          mat.emissiveIntensity = cable.baseEmissive + wave
        }
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
      container.removeEventListener("contextmenu", onContextMenu)
      container.removeEventListener("wheel", onWheel)
      container.removeEventListener("dblclick", onDblClick)

      container.removeEventListener("touchstart", onPointerDown)
      window.removeEventListener("touchmove", onPointerMove)
      window.removeEventListener("touchend", onPointerUp)

      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()

      if (brushedMetalTex) brushedMetalTex.dispose()
      if (ventMeshTex) ventMeshTex.dispose()
      if (driveBayTex) driveBayTex.dispose()
      if (switchFaceTex) switchFaceTex.dispose()
      if (routerOLEDTex) routerOLEDTex.dispose()
      if (firewallTex) firewallTex.dispose()
      if (storageBayTex) storageBayTex.dispose()
    }
  }, [isDark, language, isEn, handleNodeClick])

  return (
    <div className="relative size-full select-none touch-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="size-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Minimalist Guidance HUD: Responsive on mobile */}
      <div className="absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] sm:text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-background/95 backdrop-blur-md px-4 sm:px-8 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md flex items-center gap-2 sm:gap-3 max-w-[92vw] sm:max-w-none text-center pointer-events-none select-none">
        <span className="truncate">
          {isTouch ? t.hudGuideMobile : t.hudGuide}
        </span>
      </div>

      {/* CENTERED POPUP on Hover / Tap - CLICK, HOLD, OR RIGHT CLICK TO ENTER */}
      {hoveredNode && (
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleNodeClick(hoveredNode.targetId)
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-mono text-foreground bg-background/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col items-center text-center gap-2.5 sm:gap-3 animate-in fade-in zoom-in-95 duration-150 max-w-[86vw] sm:max-w-sm w-full select-none pointer-events-auto"
        >
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <span>{t.nodeDetected} &bull; {hoveredNode.category}</span>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <h3 className="text-lg sm:text-2xl font-bold font-sans text-foreground tracking-tight">
              {hoveredNode.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans max-w-xs mx-auto mt-0.5 leading-snug">
              {hoveredNode.role}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleNodeClick(hoveredNode.targetId)
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleNodeClick(hoveredNode.targetId)
            }}
            className="mt-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm select-none cursor-pointer border border-zinc-700/40 dark:border-zinc-300/40 hover:opacity-90 active:scale-95 transition-all"
          >
            <span>{isTouch ? t.holdToEnter : t.rightClickToEnter}</span>
          </button>
        </div>
      )}

      {/* Minimal interaction state badge */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 items-center gap-1.5 pointer-events-none select-none">
        <span className={isInteracting ? "text-foreground font-semibold" : "text-zinc-400"}>
          {isInteracting ? t.orbitActive : t.ready}
        </span>
      </div>
    </div>
  )
}

"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"

interface SubsystemNodeData {
  id: string
  name: string
  targetId: string
  position: THREE.Vector3
  color: number
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
    role: string
    targetId: string
  } | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const isDark = resolvedTheme !== "light"

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

    // Dynamic camera distance: pull back smoothly on portrait mobile screens so center rack + all satellites fit
    const calculateCameraZ = (aspect: number) => {
      if (aspect < 0.5) return 44
      if (aspect < 0.7) return 37
      if (aspect < 1.0) return 30
      if (aspect < 1.3) return 26
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
    renderer.toneMappingExposure = isDark ? 1.7 : 1.15
    container.appendChild(renderer.domElement)

    // --- LIGHTING RIG ---
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x475569 : 0xffffff,
      isDark ? 4.2 : 2.6
    )
    scene.add(ambientLight)

    // Key Light for Center Server Rack
    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xbae6fd : 0x2563eb,
      isDark ? 6.5 : 3.8
    )
    keyLight.position.set(2, 7, 15)
    scene.add(keyLight)

    // Point Light directly in front of Center Rack
    const centerPointLight = new THREE.PointLight(
      isDark ? 0x00f0ff : 0x38bdf8,
      isDark ? 8.0 : 4.5,
      35
    )
    centerPointLight.position.set(0, 0, 9)
    scene.add(centerPointLight)

    // Dedicated Point Light illuminating the Left Satellite Cluster
    const leftClusterLight = new THREE.PointLight(
      isDark ? 0x38bdf8 : 0x0284c7,
      isDark ? 7.0 : 4.0,
      25
    )
    leftClusterLight.position.set(-8.5, 0, 6)
    scene.add(leftClusterLight)

    // Dedicated Point Light illuminating the Right Satellite Cluster
    const rightClusterLight = new THREE.PointLight(
      isDark ? 0x10b981 : 0x059669,
      isDark ? 7.0 : 4.0,
      25
    )
    rightClusterLight.position.set(8.5, 0, 6)
    scene.add(rightClusterLight)

    // Directional Rim Lights to Outline 3D Silhouettes in Dark Mode
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

    // High-visibility metallic brushed titanium/steel in Dark Mode
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x475569 : 0xe2e8f0,
      metalness: 0.85,
      roughness: 0.2,
    })

    const frontPanelMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0x0f172a,
      metalness: 0.9,
      roughness: 0.15,
    })

    const portMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x00f0ff : 0x2563eb,
      emissive: isDark ? 0x00f0ff : 0x2563eb,
      emissiveIntensity: isDark ? 1.5 : 0.8,
      metalness: 0.7,
    })

    const isEn = language === "en"

    // 3 Stacked Server Blades
    const bladeYPositions = [-1.4, 0, 1.4]
    const ledMeshes: THREE.Mesh[] = []

    bladeYPositions.forEach((yPos) => {
      // Main Blade Body (Raycastable for Home Section)
      const bladeGeom = new THREE.BoxGeometry(4.6, 1.05, 3.4)
      const bladeMesh = new THREE.Mesh(bladeGeom, chassisMaterial)
      bladeMesh.position.set(0, yPos, 0)
      bladeMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Core Server" : "Server Utama",
        role: isEn ? "Home // Developer Identity & Systems" : "Beranda // Identitas Pengembang & Sistem",
      }
      chassisGroup.add(bladeMesh)
      raycastableMeshes.push(bladeMesh)

      // Front Faceplate
      const faceGeom = new THREE.BoxGeometry(4.5, 0.92, 0.12)
      const faceMesh = new THREE.Mesh(faceGeom, frontPanelMaterial)
      faceMesh.position.set(0, yPos, 1.72)
      faceMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Core Server" : "Server Utama",
        role: isEn ? "Home // Developer Identity & Systems" : "Beranda // Identitas Pengembang & Sistem",
      }
      chassisGroup.add(faceMesh)
      raycastableMeshes.push(faceMesh)

      // Rows of SFP Optical Ports
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

    // --- 2. SATELLITE SUBSYSTEM HARDWARE MODULES (9 Active Sections) ---
    const cyanColor = isDark ? 0x00f0ff : 0x0284c7
    const blueColor = isDark ? 0x38bdf8 : 0x2563eb
    const emeraldColor = isDark ? 0x10b981 : 0x059669
    const indigoColor = isDark ? 0x818cf8 : 0x4f46e5

    const subsystemNodes: SubsystemNodeData[] = [
      // Left Side Nodes (4 Nodes)
      {
        id: "skills",
        name: isEn ? "Skills" : "Keahlian",
        role: isEn ? "Technical Capabilities Matrix" : "Matriks Kemampuan Teknis",
        targetId: "#skills",
        position: new THREE.Vector3(-8.2, 4.5, -1.2),
        color: blueColor,
        portIndex: 0,
      },
      {
        id: "projects",
        name: isEn ? "Projects" : "Proyek Rekayasa",
        role: isEn ? "IoT, AI & Distributed Systems" : "Sistem IoT, AI & Robotika",
        targetId: "#featured-engineering",
        position: new THREE.Vector3(-8.8, 1.8, 0.8),
        color: cyanColor,
        portIndex: 1,
      },
      {
        id: "organizations",
        name: isEn ? "Organizations" : "Organisasi",
        role: isEn ? "Leadership & Cluster Operations" : "Kepemimpinan & Operasional",
        targetId: "#organizations",
        position: new THREE.Vector3(-9.0, -1.0, -0.5),
        color: blueColor,
        portIndex: 2,
      },
      {
        id: "training",
        name: isEn ? "Training" : "Pelatihan & Sertifikasi",
        role: isEn ? "Certified Engineering Protocols" : "Protokol & Sertifikasi Rekayasa",
        targetId: "#training",
        position: new THREE.Vector3(-8.2, -4.2, 0.6),
        color: emeraldColor,
        portIndex: 3,
      },

      // Right Side Nodes (5 Nodes)
      {
        id: "experience",
        name: isEn ? "Experience" : "Pengalaman",
        role: isEn ? "Career Routing & Packet Hops" : "Riwayat Karier & Industri",
        targetId: "#experience",
        position: new THREE.Vector3(8.2, 4.5, -1.2),
        color: emeraldColor,
        portIndex: 4,
      },
      {
        id: "awards",
        name: isEn ? "Awards" : "Penghargaan",
        role: isEn ? "Engineering Championships" : "Prestasi & Kejuaraan Nasional",
        targetId: "#awards",
        position: new THREE.Vector3(8.8, 1.8, 0.8),
        color: cyanColor,
        portIndex: 5,
      },
      {
        id: "repositories",
        name: isEn ? "Repositories" : "Repositori Kode",
        role: isEn ? "46 Open Source Codebases" : "46 Repositori Kode Terbuka",
        targetId: "#repositories",
        position: new THREE.Vector3(9.0, -1.0, -0.5),
        color: blueColor,
        portIndex: 6,
      },
      {
        id: "resume",
        name: isEn ? "Resume" : "Curriculum Vitae",
        role: isEn ? "Download Curriculum Vitae (EN/ID)" : "Unduh Curriculum Vitae (EN/ID)",
        targetId: "#resume",
        position: new THREE.Vector3(8.2, -3.6, 0.6),
        color: indigoColor,
        portIndex: 7,
      },
      {
        id: "contact",
        name: isEn ? "Contact" : "Kontak",
        role: isEn ? "Direct Communication Sockets" : "Kanal Komunikasi Langsung",
        targetId: "#contact",
        position: new THREE.Vector3(7.4, -5.6, -1.0),
        color: emeraldColor,
        portIndex: 8,
      },
    ]

    subsystemNodes.forEach((node) => {
      const nodeGroup = new THREE.Group()
      nodeGroup.position.copy(node.position)

      // Satellite Module Chassis Box
      const satBoxGeom = new THREE.BoxGeometry(2.2, 1.0, 1.3)
      const satBoxMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x334155 : 0xf8fafc,
        metalness: 0.85,
        roughness: 0.2,
      })
      const satBoxMesh = new THREE.Mesh(satBoxGeom, satBoxMat)
      satBoxMesh.userData = { targetId: node.targetId, name: node.name, role: node.role }
      nodeGroup.add(satBoxMesh)
      raycastableMeshes.push(satBoxMesh)

      // Luminous Accent Top/Bottom Bezels
      const bezelGeom = new THREE.BoxGeometry(2.24, 0.08, 1.34)
      const bezelMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: isDark ? 1.6 : 0.9,
      })
      const topBezel = new THREE.Mesh(bezelGeom, bezelMat)
      topBezel.position.set(0, 0.52, 0)
      nodeGroup.add(topBezel)

      const bottomBezel = new THREE.Mesh(bezelGeom, bezelMat)
      bottomBezel.position.set(0, -0.52, 0)
      nodeGroup.add(bottomBezel)

      // Front Glowing Screen / Status Plate
      const satPanelGeom = new THREE.BoxGeometry(1.9, 0.72, 0.08)
      const satPanelMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: isDark ? 1.4 : 0.85,
        roughness: 0.1,
      })
      const satPanelMesh = new THREE.Mesh(satPanelGeom, satPanelMat)
      satPanelMesh.position.set(0, 0, 0.68)
      satPanelMesh.userData = { targetId: node.targetId, name: node.name, role: node.role }
      nodeGroup.add(satPanelMesh)
      raycastableMeshes.push(satPanelMesh)

      // Satellite Side Connector Boot Cap
      const capGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.35, 16)
      const capMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x94a3b8 : 0x475569,
        metalness: 0.9,
      })
      const cap = new THREE.Mesh(capGeom, capMat)
      cap.rotation.z = Math.PI / 2
      cap.position.set(node.position.x > 0 ? -1.2 : 1.2, 0, 0)
      nodeGroup.add(cap)

      networkCoreGroup.add(nodeGroup)
      node.mesh = nodeGroup
    })

    // --- 3. HIGH-PRECISION VOLUMETRIC CABLES (NO CLIPPING) ---
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
        node.position.x + (isLeft ? 1.2 : -1.2),
        node.position.y,
        node.position.z
      )

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4, p5])
      const tubeGeom = new THREE.TubeGeometry(curve, 44, 0.12, 10, false)
      const tubeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.15,
        metalness: 0.9,
        emissive: node.color,
        emissiveIntensity: isDark ? 0.85 : 0.5,
      })
      const cableMesh = new THREE.Mesh(tubeGeom, tubeMat)
      networkCoreGroup.add(cableMesh)
      cableMeshes.push({
        mesh: cableMesh,
        pulseSpeed: 1.2 + index * 0.15,
        pulseOffset: index * 0.7,
      })

      // Molded SFP/RJ45 Connector Boot at faceplate port
      const bootGeom = new THREE.BoxGeometry(0.2, 0.15, 0.35)
      const bootMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x64748b : 0x94a3b8,
        metalness: 0.95,
      })
      const bootMesh = new THREE.Mesh(bootGeom, bootMat)
      bootMesh.position.set(portX, portY - 0.12, portZ + 0.175)
      networkCoreGroup.add(bootMesh)
    })

    // Heavy Master Uplink Conduit heading cleanly UNDERNEATH the rack
    const masterConduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.9, 0),
      new THREE.Vector3(0, -4.5, 0.5),
      new THREE.Vector3(0, -8.0, 1.0),
      new THREE.Vector3(0, -12.0, 2.0),
    ])
    const masterConduitGeom = new THREE.TubeGeometry(masterConduitCurve, 32, 0.26, 12, false)
    const masterConduitMat = new THREE.MeshStandardMaterial({
      color: cyanColor,
      roughness: 0.2,
      metalness: 0.9,
      emissive: cyanColor,
      emissiveIntensity: isDark ? 0.75 : 0.4,
    })
    const masterConduitMesh = new THREE.Mesh(masterConduitGeom, masterConduitMat)
    networkCoreGroup.add(masterConduitMesh)
    cableMeshes.push({
      mesh: masterConduitMesh,
      pulseSpeed: 1.5,
      pulseOffset: 0,
    })

    // --- 4. DRAG TO EXPLORE WITH INERTIA & CLAMPED ROTATION ---
    const targetRotation = { x: 0.12, y: -0.15 }
    const currentRotation = { x: 0.12, y: -0.15 }
    const velocity = { x: 0, y: 0 }
    let isDragging = false
    let prevPointer = { x: 0, y: 0 }

    const raycaster = new THREE.Raycaster()
    const mouseCoord = new THREE.Vector2()

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
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

    const onClick = (e: MouseEvent | TouchEvent) => {
      const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX
      const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY
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

    container.addEventListener("mousedown", onPointerDown)
    window.addEventListener("mousemove", onPointerMove, { passive: true })
    window.addEventListener("mouseup", onPointerUp)
    container.addEventListener("click", onClick)

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
        targetRotation.y += 0.001
        velocity.x *= 0.95
        velocity.y *= 0.95
        targetRotation.y += velocity.x
        targetRotation.x += velocity.y
      }

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08

      networkCoreGroup.rotation.x = currentRotation.x
      networkCoreGroup.rotation.y = currentRotation.y

      // Realistic Blink of status LEDs
      ledMeshes.forEach((led, i) => {
        const isBlinking = Math.sin(time * 8 + i * 2.1) > 0.35
        ;(led.material as THREE.MeshBasicMaterial).color.setHex(
          isBlinking ? (isDark ? 0x00f0ff : 0x2563eb) : isDark ? 0x10b981 : 0x059669
        )
      })

      // Pulse Laser along Volumetric Cables
      cableMeshes.forEach((cable) => {
        const mat = cable.mesh.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity =
          (isDark ? 0.65 : 0.38) + Math.sin(time * cable.pulseSpeed + cable.pulseOffset) * 0.35
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

      container.removeEventListener("touchstart", onPointerDown)
      window.removeEventListener("touchmove", onPointerMove)
      window.removeEventListener("touchend", onPointerUp)

      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isDark, language, handleNodeClick])

  const isEn = language === "en"

  return (
    <div className="relative size-full select-none touch-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="size-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Minimalist Technical Guidance HUD (Positioned Cleanly at Top-Center) */}
      <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 font-mono text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-300 bg-background/90 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2 max-w-[92vw] truncate">
        <span className="size-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
        <span className="truncate">
          {isEn
            ? "3D NETWORK INFRASTRUCTURE • DRAG TO EXPLORE • CLICK TO ENTER"
            : "INFRASTRUKTUR JARINGAN 3D • GESER UNTUK ROTASI • KLIK UNTUK MASUK"}
        </span>
      </div>

      {/* CENTERED POPUP: Pops up directly in the center on cursor hover or mobile gesture */}
      {hoveredNode && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleNodeClick(hoveredNode.targetId)
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-mono text-foreground bg-background/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border-2 border-blue-500/80 dark:border-cyan-400/80 shadow-[0_0_50px_rgba(0,240,255,0.28)] flex flex-col items-center text-center gap-3 cursor-pointer animate-in fade-in zoom-in-95 duration-150 max-w-[88vw] sm:max-w-sm w-full select-none"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <span className="size-2 rounded-full bg-emerald-500 animate-led" />
            <span>{isEn ? "SUBSYSTEM LINK DETECTED" : "JARINGAN TERDETEKSI"}</span>
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
            <span>{isEn ? "ENTER SECTION →" : "MASUK KE SEKSI →"}</span>
          </div>
        </div>
      )}

      {/* Minimal interaction state badge */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 items-center gap-1.5">
        <span className={isInteracting ? "text-cyan-500 dark:text-cyan-400 font-semibold" : "text-zinc-400"}>
          {isInteracting ? (isEn ? "ORBIT ACTIVE" : "EKSPLORASI AKTIF") : isEn ? "READY" : "SIAP"}
        </span>
      </div>
    </div>
  )
}

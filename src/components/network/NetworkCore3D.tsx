"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

interface PortfolioNodeData {
  id: string
  name: string
  category: string
  targetId: string
  position: THREE.Vector3
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
    category: string
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
    renderer.toneMappingExposure = isDark ? 1.6 : 1.15
    container.appendChild(renderer.domElement)

    // --- HARMONIOUS LIGHTING RIG (Tailored to Light / Dark Theme) ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x334155 : 0xffffff,
      isDark ? 4.0 : 2.5
    )
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0x7dd3fc : 0x1e40af,
      isDark ? 5.5 : 3.2
    )
    keyLight.position.set(2, 8, 15)
    scene.add(keyLight)

    const centerPointLight = new THREE.PointLight(
      isDark ? 0x38bdf8 : 0x2563eb,
      isDark ? 6.5 : 3.5,
      35
    )
    centerPointLight.position.set(0, 0, 9)
    scene.add(centerPointLight)

    const leftClusterLight = new THREE.PointLight(
      isDark ? 0x0284c7 : 0x3b82f6,
      isDark ? 5.0 : 2.8,
      25
    )
    leftClusterLight.position.set(-8.5, 0, 6)
    scene.add(leftClusterLight)

    const rightClusterLight = new THREE.PointLight(
      isDark ? 0x0284c7 : 0x3b82f6,
      isDark ? 5.0 : 2.8,
      25
    )
    rightClusterLight.position.set(8.5, 0, 6)
    scene.add(rightClusterLight)

    // --- 3D SCENE GROUP ---
    const portfolioCoreGroup = new THREE.Group()
    scene.add(portfolioCoreGroup)

    const raycastableMeshes: THREE.Mesh[] = []

    // --- THEME-ALIGNED COLOR TOKENS ---
    const chassisMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xf1f5f9,
      metalness: isDark ? 0.8 : 0.4,
      roughness: isDark ? 0.25 : 0.3,
    })

    const darkPanelMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f172a : 0xe2e8f0,
      metalness: isDark ? 0.9 : 0.5,
      roughness: isDark ? 0.2 : 0.25,
    })

    const themeAccentColor = isDark ? 0x38bdf8 : 0x2563eb
    const accentMat = new THREE.MeshStandardMaterial({
      color: themeAccentColor,
      emissive: themeAccentColor,
      emissiveIntensity: isDark ? 0.8 : 0.4,
      metalness: 0.6,
      roughness: 0.2,
    })

    const componentMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x334155 : 0xcbd5e1,
      metalness: 0.6,
      roughness: 0.3,
    })

    const ledActiveMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb,
    })

    // 1. CENTRAL OVERVIEW HUB
    const centralHubGroup = new THREE.Group()
    portfolioCoreGroup.add(centralHubGroup)

    const bladeYPositions = [-1.4, 0, 1.4]
    const ledMeshes: THREE.Mesh[] = []

    bladeYPositions.forEach((yPos) => {
      const bladeGeom = new THREE.BoxGeometry(4.6, 1.05, 3.4)
      const bladeMesh = new THREE.Mesh(bladeGeom, chassisMat)
      bladeMesh.position.set(0, yPos, 0)
      bladeMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Overview" : "Ringkasan Portofolio",
        category: isEn ? "Main Section" : "Bagian Utama",
        role: isEn ? "Developer Profile & Key Highlights" : "Profil Pengembang & Sorotan Utama",
      }
      centralHubGroup.add(bladeMesh)
      raycastableMeshes.push(bladeMesh)

      const faceGeom = new THREE.BoxGeometry(4.5, 0.92, 0.12)
      const faceMesh = new THREE.Mesh(faceGeom, darkPanelMat)
      faceMesh.position.set(0, yPos, 1.72)
      faceMesh.userData = {
        targetId: "#hero",
        name: isEn ? "Overview" : "Ringkasan Portofolio",
        category: isEn ? "Main Section" : "Bagian Utama",
        role: isEn ? "Developer Profile & Key Highlights" : "Profil Pengembang & Sorotan Utama",
      }
      centralHubGroup.add(faceMesh)
      raycastableMeshes.push(faceMesh)

      // Clean Accent Grid Lines
      for (let p = -1.8; p <= 1.8; p += 0.45) {
        const portGeom = new THREE.BoxGeometry(0.22, 0.16, 0.14)
        const portMesh = new THREE.Mesh(portGeom, accentMat)
        portMesh.position.set(p, yPos - 0.12, 1.8)
        centralHubGroup.add(portMesh)
      }

      // Status Activity LEDs (Theme Aligned)
      for (let l = -1.9; l <= 1.9; l += 0.32) {
        const ledGeom = new THREE.SphereGeometry(0.045, 8, 8)
        const ledMesh = new THREE.Mesh(ledGeom, ledActiveMat.clone())
        ledMesh.position.set(l, yPos + 0.24, 1.8)
        centralHubGroup.add(ledMesh)
        ledMeshes.push(ledMesh)
      }
    })

    // Central Pillar Frames
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x64748b : 0x94a3b8,
      metalness: 0.9,
      roughness: 0.15,
    })

    const pillarGeom = new THREE.BoxGeometry(0.2, 4.4, 0.2)
    const pillarPositions = [
      [-2.4, 0, 1.75],
      [2.4, 0, 1.75],
      [-2.4, 0, -1.75],
      [2.4, 0, -1.75],
    ]
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeom, frameMaterial)
      pillar.position.set(x, y, z)
      centralHubGroup.add(pillar)
    })

    // 2. SURROUNDING PORTFOLIO SECTION MODULES (Clean Portfolio Terminology)
    const portfolioNodes: PortfolioNodeData[] = [
      // Left Side Nodes (4 Nodes)
      {
        id: "skills",
        name: isEn ? "Skills" : "Keahlian",
        category: isEn ? "Technical Stack" : "Keahlian Teknis",
        role: isEn ? "Languages, frameworks, and developer tools" : "Bahasa, framework, dan alat pengembang",
        targetId: "#skills",
        position: new THREE.Vector3(-8.2, 4.5, -1.2),
        portIndex: 0,
      },
      {
        id: "projects",
        name: isEn ? "Projects" : "Proyek",
        category: isEn ? "Featured Works" : "Proyek Unggulan",
        role: isEn ? "Key systems, web apps, and embedded solutions" : "Sistem utama, aplikasi web, dan solusi embedded",
        targetId: "#featured-engineering",
        position: new THREE.Vector3(-8.8, 1.8, 0.8),
        portIndex: 1,
      },
      {
        id: "organizations",
        name: isEn ? "Organizations" : "Organisasi",
        category: isEn ? "Leadership & Community" : "Kepemimpinan & Komunitas",
        role: isEn ? "Student activities and laboratory teams" : "Kegiatan mahasiswa dan tim laboratorium",
        targetId: "#organizations",
        position: new THREE.Vector3(-9.0, -1.0, -0.5),
        portIndex: 2,
      },
      {
        id: "training",
        name: isEn ? "Training" : "Pelatihan",
        category: isEn ? "Courses & Workshops" : "Kursus & Pelatihan",
        role: isEn ? "Technical certifications and workshops" : "Sertifikasi teknis dan lokakarya",
        targetId: "#training",
        position: new THREE.Vector3(-8.2, -4.2, 0.6),
        portIndex: 3,
      },

      // Right Side Nodes (5 Nodes)
      {
        id: "experience",
        name: isEn ? "Experience" : "Pengalaman",
        category: isEn ? "Career History" : "Riwayat Karier",
        role: isEn ? "Professional internships and teaching roles" : "Magang profesional dan asisten pengajar",
        targetId: "#experience",
        position: new THREE.Vector3(8.2, 4.5, -1.2),
        portIndex: 4,
      },
      {
        id: "awards",
        name: isEn ? "Awards" : "Penghargaan",
        category: isEn ? "Honors & Competitions" : "Prestasi & Kompetisi",
        role: isEn ? "Championships and academic recognitions" : "Kejuaraan dan apresiasi akademik",
        targetId: "#awards",
        position: new THREE.Vector3(8.8, 1.8, 0.8),
        portIndex: 5,
      },
      {
        id: "repositories",
        name: isEn ? "Repositories" : "Repositori",
        category: isEn ? "Open Source Code" : "Kode Sumber Terbuka",
        role: isEn ? "46 public repositories on GitHub" : "46 repositori publik di GitHub",
        targetId: "#repositories",
        position: new THREE.Vector3(9.0, -1.0, -0.5),
        portIndex: 6,
      },
      {
        id: "resume",
        name: isEn ? "Resume / CV" : "Resume / CV",
        category: isEn ? "Curriculum Vitae" : "Curriculum Vitae",
        role: isEn ? "Download PDF resume in English or Indonesian" : "Unduh berkas PDF dalam bahasa Inggris atau Indonesia",
        targetId: "#resume",
        position: new THREE.Vector3(8.2, -3.6, 0.6),
        portIndex: 7,
      },
      {
        id: "contact",
        name: isEn ? "Get in Touch" : "Hubungi Saya",
        category: isEn ? "Contact Sockets" : "Kanal Kontak",
        role: isEn ? "Email, LinkedIn, GitHub, and WhatsApp" : "Email, LinkedIn, GitHub, dan WhatsApp",
        targetId: "#contact",
        position: new THREE.Vector3(7.4, -5.6, -1.0),
        portIndex: 8,
      },
    ]

    // Construct Theme-Aligned Clean Architectural Modules
    const buildSectionModule = (node: PortfolioNodeData): THREE.Group => {
      const g = new THREE.Group()

      // Chassis
      const chassisGeom = new THREE.BoxGeometry(2.3, 0.95, 1.3)
      const chassisMesh = new THREE.Mesh(chassisGeom, chassisMat)
      chassisMesh.userData = { targetId: node.targetId, name: node.name, category: node.category, role: node.role }
      g.add(chassisMesh)
      raycastableMeshes.push(chassisMesh)

      // Faceplate
      const faceGeom = new THREE.BoxGeometry(2.2, 0.82, 0.08)
      const faceMesh = new THREE.Mesh(faceGeom, darkPanelMat)
      faceMesh.position.set(0, 0, 0.69)
      faceMesh.userData = { targetId: node.targetId, name: node.name, category: node.category, role: node.role }
      g.add(faceMesh)
      raycastableMeshes.push(faceMesh)

      // Minimal Top & Bottom Accent Trim Lines
      const topTrim = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.05, 1.32), accentMat)
      topTrim.position.set(0, 0.49, 0)
      g.add(topTrim)

      const btmTrim = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.05, 1.32), accentMat)
      btmTrim.position.set(0, -0.49, 0)
      g.add(btmTrim)

      // Clean Front Modular Details (Cohesive Theme Colors)
      switch (node.id) {
        case "projects": {
          for (let row = -0.12; row <= 0.12; row += 0.24) {
            for (let col = -0.8; col <= 0.4; col += 0.22) {
              const blk = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.14, 0.06), componentMat)
              blk.position.set(col, row, 0.74)
              g.add(blk)
            }
          }
          const badge = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.08), accentMat)
          badge.position.set(0.75, 0, 0.74)
          g.add(badge)
          break
        }

        case "experience": {
          for (let col = -0.7; col <= 0.7; col += 0.28) {
            const blk = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.06), componentMat)
            blk.position.set(col, 0, 0.74)
            g.add(blk)
          }
          break
        }

        case "skills": {
          for (let col = -0.75; col <= 0.75; col += 0.5) {
            const strip = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.04), accentMat)
            strip.position.set(col, 0.15, 0.74)
            g.add(strip)
            const sub = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.04), componentMat)
            sub.position.set(col, -0.1, 0.74)
            g.add(sub)
          }
          break
        }

        case "organizations": {
          const centerRing = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 0.08, 24),
            accentMat
          )
          centerRing.rotation.x = Math.PI / 2
          centerRing.position.set(0, 0, 0.74)
          g.add(centerRing)
          break
        }

        case "awards": {
          const honorPlate = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.4, 0.05),
            accentMat
          )
          honorPlate.position.set(-0.4, 0, 0.74)
          g.add(honorPlate)
          for (let p = 0.3; p <= 0.75; p += 0.22) {
            const slot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.06), componentMat)
            slot.position.set(p, 0, 0.74)
            g.add(slot)
          }
          break
        }

        case "training": {
          for (let col = -0.7; col <= 0.7; col += 0.28) {
            const bar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.06), componentMat)
            bar.position.set(col, 0, 0.74)
            g.add(bar)
          }
          break
        }

        case "repositories": {
          for (let bay = -0.75; bay <= 0.75; bay += 0.5) {
            const card = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.55, 0.06), componentMat)
            card.position.set(bay, 0, 0.74)
            g.add(card)
          }
          break
        }

        case "resume": {
          const docScreen = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.4, 0.05), accentMat)
          docScreen.position.set(-0.4, 0, 0.74)
          g.add(docScreen)
          for (let col = 0.25; col <= 0.75; col += 0.25) {
            const port = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.06), componentMat)
            port.position.set(col, 0, 0.74)
            g.add(port)
          }
          break
        }

        case "contact": {
          const commPlate = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.06), accentMat)
          commPlate.position.set(-0.6, 0, 0.74)
          g.add(commPlate)
          for (let i = 0; i <= 0.7; i += 0.24) {
            const iconPlate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.06), componentMat)
            iconPlate.position.set(i, 0, 0.74)
            g.add(iconPlate)
          }
          break
        }
      }

      // Connection Cap on side
      const capGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.3, 16)
      const capMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x64748b : 0x94a3b8,
        metalness: 0.8,
      })
      const cap = new THREE.Mesh(capGeom, capMat)
      cap.rotation.z = Math.PI / 2
      cap.position.set(node.position.x > 0 ? -1.25 : 1.25, 0, 0)
      g.add(cap)

      return g
    }

    portfolioNodes.forEach((node) => {
      const nodeModel = buildSectionModule(node)
      nodeModel.position.copy(node.position)
      portfolioCoreGroup.add(nodeModel)
      node.mesh = nodeModel
    })

    // --- 3. HARMONIOUS THEME CONDUIT CABLES (Non-colorful, Uniform Palette) ---
    const cableMeshes: { mesh: THREE.Mesh; pulseSpeed: number; pulseOffset: number }[] = []

    // Cohesive Conduit Colors: subtle blue/slate tones adhering strictly to theme palette
    const conduitColor = isDark ? 0x0284c7 : 0x2563eb

    portfolioNodes.forEach((node, index) => {
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
      const tubeGeom = new THREE.TubeGeometry(curve, 44, 0.11, 10, false)
      const tubeMat = new THREE.MeshStandardMaterial({
        color: conduitColor,
        roughness: isDark ? 0.3 : 0.4,
        metalness: 0.3,
        emissive: conduitColor,
        emissiveIntensity: isDark ? 0.25 : 0.1,
      })
      const cableMesh = new THREE.Mesh(tubeGeom, tubeMat)
      portfolioCoreGroup.add(cableMesh)
      cableMeshes.push({
        mesh: cableMesh,
        pulseSpeed: 1.0 + (index % 3) * 0.15,
        pulseOffset: index * 0.5,
      })

      // Terminal Socket Boot
      const bootGeom = new THREE.BoxGeometry(0.18, 0.14, 0.3)
      const bootMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x475569 : 0x94a3b8,
        metalness: 0.8,
      })
      const bootMesh = new THREE.Mesh(bootGeom, bootMat)
      bootMesh.position.set(portX, portY - 0.12, portZ + 0.15)
      portfolioCoreGroup.add(bootMesh)
    })

    // Ground Spine Conduit underneath
    const masterConduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.9, 0),
      new THREE.Vector3(0, -4.5, 0.5),
      new THREE.Vector3(0, -8.0, 1.0),
      new THREE.Vector3(0, -12.0, 2.0),
    ])
    const masterConduitGeom = new THREE.TubeGeometry(masterConduitCurve, 32, 0.24, 12, false)
    const masterConduitMat = new THREE.MeshStandardMaterial({
      color: conduitColor,
      roughness: 0.35,
      metalness: 0.3,
      emissive: conduitColor,
      emissiveIntensity: isDark ? 0.3 : 0.15,
    })
    const masterConduitMesh = new THREE.Mesh(masterConduitGeom, masterConduitMat)
    portfolioCoreGroup.add(masterConduitMesh)
    cableMeshes.push({
      mesh: masterConduitMesh,
      pulseSpeed: 1.2,
      pulseOffset: 0,
    })

    // --- 4. INTERACTION CONTROLS & EVENT LISTENERS ---
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
            category: hit.userData.category,
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

      portfolioCoreGroup.rotation.x = currentRotation.x
      portfolioCoreGroup.rotation.y = currentRotation.y

      // Soft Status LED animation (Theme Aligned)
      ledMeshes.forEach((led, i) => {
        const isBlinking = Math.sin(time * 5 + i * 1.5) > 0.4
        ;(led.material as THREE.MeshBasicMaterial).color.setHex(
          isBlinking ? (isDark ? 0x38bdf8 : 0x2563eb) : isDark ? 0x0284c7 : 0x1d4ed8
        )
      })

      // Subtle conduit pulse
      cableMeshes.forEach((cable) => {
        const mat = cable.mesh.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity =
          (isDark ? 0.22 : 0.08) + Math.sin(time * cable.pulseSpeed + cable.pulseOffset) * 0.12
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

      {/* Minimalist Guidance HUD */}
      <div className="absolute bottom-16 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 font-mono text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-300 bg-background/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2 max-w-[92vw] truncate">
        <span className="size-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping shrink-0" />
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-mono text-foreground bg-background/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border-2 border-blue-500/80 dark:border-cyan-400/80 shadow-[0_0_40px_rgba(37,99,235,0.18)] dark:shadow-[0_0_40px_rgba(0,240,255,0.2)] flex flex-col items-center text-center gap-3 cursor-pointer animate-in fade-in zoom-in-95 duration-150 max-w-[88vw] sm:max-w-sm w-full select-none"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <span className="size-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-led" />
            <span>{t.nodeDetected} &bull; {hoveredNode.category}</span>
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
        <span className={isInteracting ? "text-blue-600 dark:text-cyan-400 font-semibold" : "text-zinc-400"}>
          {isInteracting ? t.orbitActive : t.ready}
        </span>
      </div>
    </div>
  )
}

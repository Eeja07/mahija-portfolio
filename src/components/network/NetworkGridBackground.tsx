"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface NodePoint {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

interface Packet {
  fromNode: number
  toNode: number
  progress: number
  speed: number
}

export default function NetworkGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isDark = resolvedTheme !== "light"

    // Colors
    const nodeColorPrimary = isDark ? "rgba(0, 240, 255, 0.7)" : "rgba(37, 99, 235, 0.6)"
    const nodeColorSecondary = isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.6)"
    const lineColor = isDark ? "rgba(0, 240, 255, 0.08)" : "rgba(37, 99, 235, 0.06)"
    const packetColor = isDark ? "#00f0ff" : "#2563eb"

    // Generate Nodes
    const nodeCount = Math.floor(Math.min(width, 1400) / 28)
    const nodes: NodePoint[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        color: i % 3 === 0 ? nodeColorSecondary : nodeColorPrimary,
      })
    }

    // Generate Packets
    const packets: Packet[] = []
    const maxDistance = 140

    const mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize)

    let lastTime = 0
    const render = (time: number) => {
      // Throttle slightly if needed
      if (time - lastTime < 16) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Mouse gentle repel / illumination
        const dxMouse = node.x - mouse.x
        const dyMouse = node.y - mouse.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        if (distMouse < 120) {
          node.x += (dxMouse / distMouse) * 0.4
          node.y += (dyMouse / distMouse) * 0.4
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = alpha * 1.2
            ctx.stroke()

            // Randomly spawn data packet along connection
            if (Math.random() < 0.0008 && packets.length < 8) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.01 + Math.random() * 0.015,
              })
            }
          }
        }
      }

      // Update & Draw Packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p]
        pkt.progress += pkt.speed

        const from = nodes[pkt.fromNode]
        const to = nodes[pkt.toNode]

        if (!from || !to || pkt.progress >= 1) {
          packets.splice(p, 1)
          continue
        }

        const px = from.x + (to.x - from.x) * pkt.progress
        const py = from.y + (to.y - from.y) * pkt.progress

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = packetColor
        ctx.shadowColor = packetColor
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-500"
    />
  )
}

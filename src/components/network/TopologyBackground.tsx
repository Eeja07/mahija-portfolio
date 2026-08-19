"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  baseAlpha: number
}

interface Packet {
  from: number
  to: number
  progress: number
  speed: number
  color: string
}

export default function TopologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isDark = resolvedTheme !== "light"

    // Primary & Secondary node colors tailored to network / topology identity
    const nodeColorPrimary = isDark ? "rgba(56, 189, 248, " : "rgba(37, 99, 235, "
    const nodeColorSecondary = isDark ? "rgba(16, 185, 129, " : "rgba(16, 185, 129, "
    const lineColor = isDark ? "rgba(56, 189, 248, 0.07)" : "rgba(37, 99, 235, 0.05)"
    const packetColor = isDark ? "#38bdf8" : "#2563eb"

    // Generate balanced density nodes
    const nodeCount = Math.floor(Math.min(width, 1600) / 32)
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      const isGreen = i % 4 === 0
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        color: isGreen ? nodeColorSecondary : nodeColorPrimary,
        baseAlpha: Math.random() * 0.4 + 0.3,
      })
    }

    const packets: Packet[] = []
    const maxDistance = 140
    const mouse = { x: -2000, y: -2000 }

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
      // 60fps throttle to keep CPU usage < 1%
      if (time - lastTime < 16) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        node.x += node.vx
        node.y += node.vy

        // Wrap around boundaries smoothly
        if (node.x < 0) node.x = width
        else if (node.x > width) node.x = 0
        if (node.y < 0) node.y = height
        else if (node.y > height) node.y = 0

        // Gentle cursor magnetic interaction
        const dxMouse = node.x - mouse.x
        const dyMouse = node.y - mouse.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        let alpha = node.baseAlpha
        if (distMouse < 150) {
          const force = (1 - distMouse / 150) * 0.5
          node.x += (dxMouse / distMouse) * force
          node.y += (dyMouse / distMouse) * force
          alpha = Math.min(1, alpha + force * 0.5)
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}${alpha})`
        ctx.fill()
      }

      // Draw Connection Lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.15 : 0.08)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = lineAlpha * 1.5
            ctx.stroke()

            // Randomly spawn data packet along connection
            if (Math.random() < 0.0006 && packets.length < 6) {
              packets.push({
                from: i,
                to: j,
                progress: 0,
                speed: 0.012 + Math.random() * 0.012,
                color: packetColor,
              })
            }
          }
        }
      }

      // Update & Draw Packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p]
        pkt.progress += pkt.speed

        const from = nodes[pkt.from]
        const to = nodes[pkt.to]

        if (!from || !to || pkt.progress >= 1) {
          packets.splice(p, 1)
          continue
        }

        const px = from.x + (to.x - from.x) * pkt.progress
        const py = from.y + (to.y - from.y) * pkt.progress

        ctx.beginPath()
        ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = pkt.color
        ctx.shadowColor = pkt.color
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
      className="fixed inset-0 pointer-events-none z-0 opacity-65 transition-opacity duration-500"
    />
  )
}

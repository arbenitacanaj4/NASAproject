"use client"

import { useEffect, useRef } from "react"

export function AnimatedSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const asteroids: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
    }> = []

    // Create asteroids
    for (let i = 0; i < 50; i++) {
      asteroids.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      asteroids.forEach((asteroid) => {
        ctx.save()
        ctx.translate(asteroid.x, asteroid.y)
        ctx.rotate(asteroid.rotation)

        // Draw asteroid
        ctx.fillStyle = "rgba(100, 150, 255, 0.6)"
        ctx.beginPath()
        ctx.arc(0, 0, asteroid.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow
        ctx.fillStyle = "rgba(100, 150, 255, 0.2)"
        ctx.beginPath()
        ctx.arc(0, 0, asteroid.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()

        // Update position
        asteroid.x += asteroid.speedX
        asteroid.y += asteroid.speedY
        asteroid.rotation += asteroid.rotationSpeed

        // Wrap around screen
        if (asteroid.x < 0) asteroid.x = canvas.width
        if (asteroid.x > canvas.width) asteroid.x = 0
        if (asteroid.y < 0) asteroid.y = canvas.height
        if (asteroid.y > canvas.height) asteroid.y = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </>
  )
}

"use client"

import React from "react"

import { useEffect, useRef } from "react"

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvasWidth) this.x = 0
        if (this.x < 0) this.x = canvasWidth
        if (this.y > canvasHeight) this.y = 0
        if (this.y < 0) this.y = canvasHeight
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(229, 57, 53, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.min(100, (canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15
            ctx!.strokeStyle = `rgba(229, 57, 53, ${opacity})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }

        // Connect to mouse
        const dx = particles[i].x - mouseX
        const dy = particles[i].y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.3
          ctx!.strokeStyle = `rgba(229, 57, 53, ${opacity})`
          ctx!.lineWidth = 0.8
          ctx!.beginPath()
          ctx!.moveTo(particles[i].x, particles[i].y)
          ctx!.lineTo(mouseX, mouseY)
          ctx!.stroke()
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx)
      })

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

export function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(229, 57, 53, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229, 57, 53, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  )
}

export function GlowOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl animate-pulse ${className}`} />
  )
}

export function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        style={{
          animation: "scanline 4s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes scanline {
          0% { top: -1px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 border border-primary/10 rounded-lg"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}

export function TypewriterText({ 
  text, 
  className = "" 
}: { 
  text: string
  className?: string 
}) {
  return (
    <span className={`inline-block ${className}`}>
      <span className="animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-primary">
        {text}
      </span>
    </span>
  )
}

export function GlitchText({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 -z-10 text-primary/30 animate-glitch-1"
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 -z-10 text-cyan-500/30 animate-glitch-2"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
}

export function DataStream() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-px overflow-hidden opacity-20">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent"
        style={{
          animation: "dataStream 2s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes dataStream {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}

export function CircuitLines() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path 
            d="M 10 0 L 10 30 M 10 30 L 40 30 M 40 30 L 40 60 M 40 60 L 70 60 M 70 60 L 70 100 M 0 50 L 20 50 M 20 50 L 20 80 M 20 80 L 50 80 M 50 80 L 50 100 M 60 0 L 60 20 M 60 20 L 90 20 M 90 20 L 90 50 M 90 50 L 100 50 M 80 60 L 80 90 M 80 90 L 100 90"
            stroke="#E53935"
            strokeWidth="0.5"
            fill="none"
          />
          <circle cx="10" cy="30" r="2" fill="#E53935" />
          <circle cx="40" cy="60" r="2" fill="#E53935" />
          <circle cx="20" cy="50" r="2" fill="#E53935" />
          <circle cx="60" cy="20" r="2" fill="#E53935" />
          <circle cx="90" cy="50" r="2" fill="#E53935" />
          <circle cx="80" cy="90" r="2" fill="#E53935" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  )
}

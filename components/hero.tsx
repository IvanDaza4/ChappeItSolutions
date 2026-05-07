"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const capabilities = [
  "Seguridad Electronica",
  "Infraestructura IT",
  "IoT & Domotica",
  "Desarrollo Web"
]

export function Hero() {
  const [currentCapability, setCurrentCapability] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Capability rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentCapability((prev) => (prev + 1) % capabilities.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-foreground/[0.02] rounded-full blur-[120px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-foreground/[0.015] rounded-full blur-[100px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(250,250,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32">
        {/* Top label */}
        <div className="mb-8 animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            Soluciones Tecnologicas de Elite
          </span>
        </div>

        {/* Main headline */}
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[0.95] animate-fade-up delay-100">
            <span className="block">Arquitectura</span>
            <span className="block">Digital de</span>
            <span className="block relative">
              <span className="text-muted-foreground">Vanguardia</span>
              {/* Decorative line */}
              <span className="absolute -bottom-2 left-0 h-px w-32 bg-gradient-to-r from-foreground/50 to-transparent animate-line-expand delay-500" />
            </span>
          </h1>
        </div>

        {/* Description and rotating capability */}
        <div className="max-w-xl mb-16 animate-fade-up delay-200">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Mas de 20 anos transformando la infraestructura tecnologica de empresas que exigen excelencia. Precision, innovacion y resultados medibles.
          </p>
          
          {/* Rotating capability display */}
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Especialidad actual
            </span>
            <span className="h-px flex-1 bg-border max-w-16" />
            <span 
              className={`text-sm font-medium text-foreground transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {capabilities[currentCapability]}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-24 animate-fade-up delay-300">
          <Button 
            asChild 
            size="lg"
            className="group bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-14"
          >
            <Link href="/servicios" className="flex items-center gap-3">
              <span>Explorar Servicios</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="ghost" 
            size="lg"
            className="group text-muted-foreground hover:text-foreground hover:bg-transparent rounded-none px-8 h-14"
          >
            <Link href="#contacto" className="flex items-center gap-3">
              <span>Solicitar Evaluacion</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-border/50 animate-fade-up delay-400">
          {[
            { value: "20+", label: "Anos de experiencia" },
            { value: "500+", label: "Proyectos completados" },
            { value: "200+", label: "Clientes activos" },
            { value: "99.9%", label: "Uptime garantizado" },
          ].map((stat, index) => (
            <div key={index} className="group">
              <p className="text-3xl md:text-4xl font-light text-foreground mb-2 transition-colors group-hover:text-muted-foreground">
                {stat.value}
              </p>
              <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-500">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>

      {/* Side decorative text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
        <span className="block text-xs tracking-[0.3em] uppercase text-muted-foreground/50 [writing-mode:vertical-rl] rotate-180">
          Chappe IT Solutions — Buenos Aires
        </span>
      </div>

      {/* Right side decorative */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-4">
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          <span className="text-xs text-muted-foreground/50 [writing-mode:vertical-rl] rotate-180">2004 — 2024</span>
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  )
}

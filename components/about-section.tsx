"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check, ArrowUpRight } from "lucide-react"

const principles = [
  {
    title: "Precision Tecnica",
    description: "Cada implementacion sigue estandares de ingenieria de clase mundial."
  },
  {
    title: "Innovacion Continua",
    description: "Adoptamos tecnologias emergentes con criterio y vision de futuro."
  },
  {
    title: "Resultados Medibles",
    description: "KPIs claros y reportes detallados de cada proyecto ejecutado."
  },
  {
    title: "Soporte 24/7",
    description: "Equipo dedicado disponible cuando mas lo necesitas."
  }
]

const expertise = [
  "CCTV & Vigilancia Inteligente",
  "Control de Acceso Biometrico",
  "Redes Corporativas",
  "Cloud & Virtualizacion",
  "IoT & Automatizacion",
  "Ciberseguridad"
]

function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "" 
}: { 
  value: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export function AboutSection() {
  const [visiblePrinciples, setVisiblePrinciples] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          principles.forEach((_, index) => {
            setTimeout(() => {
              setVisiblePrinciples((prev) => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(250,250,250,0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">01</span>
            <span className="h-px w-16 bg-border" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Quienes Somos</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[1.1] mb-8">
                Ingenieria que transforma
                <span className="block text-muted-foreground">negocios</span>
              </h2>
            </div>
            <div className="lg:pt-4">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Desde 2004, Chappe IT Solutions ha sido el socio tecnologico de empresas que no aceptan compromisos. Diseñamos e implementamos soluciones de infraestructura, seguridad y conectividad con el mas alto nivel de exigencia.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro equipo de ingenieros certificados combina experiencia en campo con conocimiento de las ultimas tecnologias para entregar proyectos que superan expectativas.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image column */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src="/images/about-team.jpg"
                  alt="Equipo Chappe IT Solutions"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              
              {/* Floating stat card */}
              <div className="absolute -bottom-8 -right-8 bg-card border border-border p-6 w-48">
                <p className="text-4xl font-light text-foreground mb-1">
                  <AnimatedCounter value={20} suffix="+" />
                </p>
                <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
                  Anos de excelencia
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-foreground/20" />
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-7 space-y-16" ref={sectionRef}>
            {/* Principles grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <div 
                  key={index}
                  className={`group transition-all duration-500 ${
                    visiblePrinciples.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border group-hover:border-foreground transition-colors">
                      <Check className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-2">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expertise tags */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Areas de Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {expertise.map((item, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-4 py-2 text-sm border border-border hover:border-foreground/50 hover:bg-foreground/5 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6 pt-8 border-t border-border/50">
              <a 
                href="#contacto"
                className="group inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
              >
                <span className="text-sm font-medium">Solicitar evaluacion gratuita</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-xs text-muted-foreground">Sin compromiso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

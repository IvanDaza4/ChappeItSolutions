"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Shield, Server, Cpu, Code } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Seguridad Electronica",
    description: "Sistemas inteligentes de vigilancia, control de acceso y alarmas con analitica avanzada basada en IA.",
    features: ["CCTV con IA", "Control Biometrico", "Alarmas Inteligentes", "Monitoreo 24/7"],
    icon: Shield,
    href: "/servicios#seguridad"
  },
  {
    number: "02",
    title: "Infraestructura IT",
    description: "Redes corporativas de alto rendimiento, centros de datos y soluciones cloud escalables.",
    features: ["Redes Corporativas", "Cloud Computing", "Virtualizacion", "Disaster Recovery"],
    icon: Server,
    href: "/servicios#ti"
  },
  {
    number: "03",
    title: "IoT & Domotica",
    description: "Automatizacion inteligente para hogares y empresas. Control total desde cualquier dispositivo.",
    features: ["Smart Home", "Automatizacion", "Conectividad IoT", "Control Remoto"],
    icon: Cpu,
    href: "/servicios#iot"
  },
  {
    number: "04",
    title: "Desarrollo Web",
    description: "Sitios web de alto impacto, e-commerce y aplicaciones web con las ultimas tecnologias.",
    features: ["Diseño UI/UX", "Desarrollo Full-Stack", "E-commerce", "SEO & Performance"],
    icon: Code,
    href: "/servicios#web"
  }
]

function ServiceCard({ 
  service, 
  index,
  isActive,
  onHover 
}: { 
  service: typeof services[0]
  index: number
  isActive: boolean
  onHover: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const Icon = service.icon

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={onHover}
    >
      <Link href={service.href} className="block">
        {/* Card container */}
        <div className={`relative p-8 md:p-10 border transition-all duration-500 ${
          isActive 
            ? 'border-foreground/20 bg-secondary/50' 
            : 'border-border hover:border-foreground/10'
        }`}>
          {/* Top row: number and icon */}
          <div className="flex items-start justify-between mb-8">
            <span className="text-xs tracking-[0.2em] text-muted-foreground">
              {service.number}
            </span>
            <div className={`p-3 border transition-all duration-300 ${
              isActive ? 'border-foreground/30' : 'border-border'
            }`}>
              <Icon className="w-5 h-5 text-foreground" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4 group-hover:text-muted-foreground transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Features list */}
          <div className="flex flex-wrap gap-2 mb-8">
            {service.features.map((feature, i) => (
              <span 
                key={i}
                className="text-xs tracking-wide px-3 py-1.5 border border-border text-muted-foreground"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Link indicator */}
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-sm font-medium">Ver detalles</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Active indicator line */}
          <div className={`absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500 ${
            isActive ? 'w-full' : 'w-0'
          }`} />
        </div>
      </Link>
    </div>
  )
}

export function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">02</span>
            <span className="h-px w-16 bg-border" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Servicios</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[1.1]">
                Soluciones integrales
                <span className="block text-muted-foreground">para cada necesidad</span>
              </h2>
            </div>
            <div className="lg:flex lg:items-end">
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Cuatro pilares tecnologicos que cubren todas las necesidades de infraestructura, seguridad y conectividad de tu organizacion.
              </p>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-foreground font-medium mb-1">No encuentras lo que buscas?</p>
              <p className="text-sm text-muted-foreground">Diseñamos soluciones a medida para requerimientos especificos.</p>
            </div>
            <Link 
              href="#contacto"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <span className="text-sm font-medium">Consultar proyecto</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

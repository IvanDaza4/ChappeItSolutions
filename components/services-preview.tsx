"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Camera,
  Fingerprint,
  Bell,
  Server,
  Cloud,
  Monitor,
  Code,
  Smartphone,
  Wifi,
  DoorClosed,
  Lightbulb,
  ArrowRight,
} from "lucide-react"

const serviceCategories = [
  {
    title: "Seguridad Electrónica",
    description: "Protege tu hogar o negocio con sistemas inteligentes de vigilancia y control.",
    icon: Shield,
    color: "from-red-500/20 to-red-500/5",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    iconBg: "bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white",
    glowColor: "group-hover:shadow-red-500/20",
    image: "/images/portfolio/seguridad.jpeg",
    services: [
      { name: "CCTV con Analítica IA", icon: Camera },
      { name: "Control de Acceso", icon: Fingerprint },
      { name: "Alarmas y Sensores", icon: Bell },
    ],
    href: "/servicios#seguridad",
  },
  {
    title: "Tecnologías de Información",
    description: "Infraestructura y servicios TI para que todo funcione rápido, estable y seguro.",
    icon: Server,
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    iconBg: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
    glowColor: "group-hover:shadow-blue-500/20",
    image: "/images/portfolio/datacenter.jpg",
    services: [
      { name: "Redes y Conectividad", icon: Monitor },
      { name: "Servicios Cloud", icon: Cloud },
      { name: "Software a Medida", icon: Code },
    ],
    href: "/servicios#ti",
  },
  {
    title: "IoT para el Hogar",
    description: "Automatiza y controla tu casa desde el celular: confort, seguridad y eficiencia.",
    icon: Smartphone,
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    iconBg: "bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white",
    glowColor: "group-hover:shadow-green-500/20",
    image: "/images/portfolio/iot.png",
    services: [
      { name: "Wi-Fi / Mesh & Conectividad", icon: Wifi },
      { name: "Cerraduras y Videoportero", icon: DoorClosed },
      { name: "Iluminación y Escenas Smart", icon: Lightbulb },
    ],
    href: "/servicios#iot",
  },
]

function ServiceCard({ category, index }: { category: typeof serviceCategories[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative bg-card border ${category.borderColor} rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl ${category.glowColor} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Image preview on hover */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-20" : "opacity-0"}`}>
        <Image src={category.image || "/placeholder.svg"} alt="" fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="relative p-8">
        {/* Animated corner accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />

        {/* Icon */}
        <div
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${category.iconBg} mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <category.icon className="h-8 w-8" />
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity bg-current" />
        </div>

        {/* Title and description */}
        <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-heading)] group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{category.description}</p>

        {/* Services list */}
        <ul className="space-y-3 mb-8">
          {category.services.map((service, serviceIndex) => (
            <li
              key={serviceIndex}
              className="flex items-center gap-3 group/item"
              style={{
                transitionDelay: `${serviceIndex * 100}ms`,
              }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/80 backdrop-blur-sm group-hover/item:bg-primary/10 transition-colors">
                <service.icon className="h-4 w-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
              </div>
              <span className="text-sm">{service.name}</span>
            </li>
          ))}
        </ul>

        {/* Link with animated arrow */}
        <Link href={category.href} className="inline-flex items-center text-sm font-medium text-primary group/link">
          Ver más detalles
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Bottom animated line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
  )
}

export function ServicesPreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <Image src="/images/services-bg.jpg" alt="" fill className="object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">Nuestros Servicios</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-heading)]">
            Soluciones para Cada <span className="text-primary">Necesidad</span>
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground">
            Servicios especializados en tres pilares clave para modernizar, proteger y conectar tus espacios.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <ServiceCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" className="group relative overflow-hidden" asChild>
            <Link href="/servicios">
              <span className="relative z-10 flex items-center">
                Explorar Todos los Servicios
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

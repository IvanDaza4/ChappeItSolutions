"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { TechBackground } from "@/components/tech-background"

import {
  SecurityIcon,
  ITIcon,
  IoTIcon,
  WebIcon,
  CCTVIcon,
  AccessControlIcon,
  IntrusionIcon,
  EmergencyCommsIcon,
  NetworkIcon,
  CloudServiceIcon,
  SoftwareIcon,
  SupportIcon,
  AutomationIcon,
  SmartLightIcon,
  SmartLockIcon,
  WiFiMeshIcon,
  UIDesignIcon,
  WebDevIcon,
  ECommerceIcon,
  SEOIcon,
} from "@/components/service-icons"
import type { ComponentType } from "react"

// --- Interfaces ---
interface IconComponentProps {
  size?: number
  accentColor?: string
  className?: string
}

interface Solution {
  name: string
  icon: ComponentType<IconComponentProps>
  description: string
  features: string[]
}

interface ServiceCategory {
  id: string
  title: string
  description: string
  icon: ComponentType<IconComponentProps>
  accentHex: string
  solutions: Solution[]
}

// --- Data ---
const services: ServiceCategory[] = [
  {
    id: "seguridad",
    title: "Seguridad Electrónica",
    description:
      "Protege tu hogar o negocio con sistemas de seguridad de última generación. Nuestras soluciones integran tecnología avanzada con analítica de video basada en inteligencia artificial.",
    icon: SecurityIcon,
    accentHex: "#ef4444",
    solutions: [
      {
        name: "Circuitos CCTV",
        icon: CCTVIcon,
        description:
          "Videovigilancia con detección inteligente de eventos, reconocimiento y análisis en tiempo real para una respuesta más rápida y precisa.",
        features: ["Detección de intrusión", "Alertas automáticas", "Analítica inteligente", "Acceso remoto seguro"],
      },
      {
        name: "Control de Acceso",
        icon: AccessControlIcon,
        description:
          "Gestión de accesos con biometría, tarjetas y control por horarios para proteger áreas clave y mejorar el control de ingreso.",
        features: ["Biometría avanzada", "Tarjetas RFID/NFC", "Control de horarios", "Reportes de acceso"],
      },
      {
        name: "Sistemas de Intrusión",
        icon: IntrusionIcon,
        description:
          "Alarmas con sensores perimetrales y volumétricos, monitoreo remoto y notificaciones para prevenir incidentes.",
        features: ["Sensores perimetrales", "Detectores de movimiento", "Monitoreo remoto", "Notificaciones"],
      },
      {
        name: "Comunicaciones de Emergencia",
        icon: EmergencyCommsIcon,
        description:
          "Sistemas de comunicación para coordinación y respuesta rápida ante eventos, integrables con seguridad y monitoreo.",
        features: ["Radios digitales", "Intercomunicadores", "Sistemas PA", "Integración CCTV"],
      },
    ],
  },
  {
    id: "ti",
    title: "Tecnologías de Información",
    description:
      "Soluciones integrales de TI que optimizan tu infraestructura, mejoran la productividad y aseguran la continuidad de tus operaciones.",
    icon: ITIcon,
    accentHex: "#3b82f6",
    solutions: [
      {
        name: "Redes y Conectividad",
        icon: NetworkIcon,
        description:
          "Diseño, implementación y mantenimiento de infraestructura de redes de alto rendimiento para máxima estabilidad y seguridad.",
        features: ["Redes LAN/WAN", "WiFi profesional", "Fibra óptica", "Switches y routers"],
      },
      {
        name: "Servicios Cloud",
        icon: CloudServiceIcon,
        description:
          "Migración y gestión de servicios en la nube para mayor flexibilidad, escalabilidad y reducción de costos.",
        features: ["AWS / Azure / GCP", "Migración a la nube", "Backup cloud", "SaaS / IaaS / PaaS"],
      },
      {
        name: "Software a Medida",
        icon: SoftwareIcon,
        description:
          "Desarrollo de aplicaciones personalizadas que se adaptan a los procesos únicos de tu negocio.",
        features: ["Aplicaciones web", "Apps móviles", "Sistemas ERP", "Integraciones API"],
      },
      {
        name: "Soporte Técnico",
        icon: SupportIcon,
        description:
          "Mesa de ayuda y soporte técnico especializado con atención 24/7 para resolver cualquier incidente.",
        features: ["Help desk 24/7", "Soporte remoto", "Mantenimiento preventivo", "SLA garantizado"],
      },
    ],
  },
  {
    id: "iot",
    title: "IoT para el Hogar",
    description:
      "Soluciones de smart home para automatizar, proteger y conectar tu casa. Integración prolija, control desde el celular y configuraciones seguras.",
    icon: IoTIcon,
    accentHex: "#22c55e",
    solutions: [
      {
        name: "Automatización & Escenas",
        icon: AutomationIcon,
        description:
          "Automatizá rutinas para que tu casa trabaje por vos: escenas por horarios, presencia o geolocalización.",
        features: ["Escenas personalizadas", "Rutinas por horarios", "Sensores", "Control celular"],
      },
      {
        name: "Iluminación Inteligente",
        icon: SmartLightIcon,
        description:
          "Control de luces por ambientes, horarios y escenas. Mejora el confort y sumá seguridad con simulación de presencia.",
        features: ["Control por ambientes", "Programaciones", "Simulación", "Escenas de luz"],
      },
      {
        name: "Cerraduras & Videoportero",
        icon: SmartLockIcon,
        description:
          "Accesos más seguros y cómodos: cerraduras inteligentes, videoportero y permisos temporales para visitas.",
        features: ["Acceso sin llaves", "Códigos temporales", "Historial", "Integración cámaras"],
      },
      {
        name: "Wi-Fi / Mesh & Conectividad",
        icon: WiFiMeshIcon,
        description:
          "Red estable para que el smart home funcione bien: optimizamos cobertura, puntos críticos y seguridad.",
        features: ["Cobertura mejorada", "Red Mesh", "Segmentación IoT", "Seguridad Wi-Fi"],
      },
    ],
  },
  {
    id: "web",
    title: "Diseño y Desarrollo Web",
    description:
      "Creamos sitios web y aplicaciones digitales a medida que impulsan tu presencia online. Desde landing pages hasta e-commerce, combinamos diseño con tecnología.",
    icon: WebIcon,
    accentHex: "#a855f7",
    solutions: [
      {
        name: "Diseño UI/UX",
        icon: UIDesignIcon,
        description:
          "Diseñamos interfaces modernas, intuitivas y centradas en el usuario. Cada proyecto parte de un análisis de tu marca y audiencia.",
        features: ["Diseño responsive", "Identidad visual", "Prototipado", "Experiencia de usuario"],
      },
      {
        name: "Desarrollo Web",
        icon: WebDevIcon,
        description:
          "Desarrollamos sitios web y aplicaciones con las últimas tecnologías: rendimiento, seguridad y escalabilidad.",
        features: ["Next.js / React", "Sitios corporativos", "Landing pages", "Web apps"],
      },
      {
        name: "E-Commerce",
        icon: ECommerceIcon,
        description:
          "Tiendas online completas con catálogo de productos, carrito de compras, pasarelas de pago y gestión.",
        features: ["Catálogos", "Pasarelas de pago", "Gestión de pedidos", "Panel admin"],
      },
      {
        name: "SEO & Performance",
        icon: SEOIcon,
        description:
          "Optimización técnica y de contenido para aparecer en los primeros resultados de búsqueda y cargar a máxima velocidad.",
        features: ["SEO on-page", "Velocidad de carga", "Analytics", "Posicionamiento orgánico"],
      },
    ],
  },
]

// --- Hooks ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Cleanup inmediato al revelar
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// --- Components ---
function SolutionCard({
  solution,
  accentHex,
  index,
  isHero,
}: {
  solution: Solution
  accentHex: string
  index: number
  isHero: boolean
}) {
  const { ref, isVisible } = useReveal()
  const SolutionIcon = solution.icon

  return (

    <div

      ref={ref}
      style={{
        "--accent": accentHex,
        transitionDelay: `${index * 75}ms`
      } as React.CSSProperties}
      className={`group relative bg-card border border-border rounded-2xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[var(--accent)]/10 hover:-translate-y-0.5 hover:border-[var(--accent)]/50
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${isHero ? "md:col-span-3 p-8 flex flex-col md:flex-row gap-8 items-start" : "col-span-1 p-6 flex flex-col gap-5"}
      `}
    >
      <div
        className={`flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110
          ${isHero ? "h-16 w-16" : "h-12 w-12"}
        `}
        style={{ backgroundColor: `${accentHex}15`, color: accentHex }}
      >
        <SolutionIcon size={isHero ? 32 : 24} accentColor={accentHex} />
      </div>

      <div className="flex-1 min-w-0 w-full">
        <h3 className={`font-semibold mb-3 font-[family-name:var(--font-heading)] transition-colors group-hover:text-[var(--accent)] ${isHero ? "text-2xl" : "text-lg"}`}>
          {solution.name}
        </h3>
        <p className={`text-muted-foreground leading-relaxed ${isHero ? "text-base mb-6 max-w-3xl" : "text-sm mb-5"}`}>
          {solution.description}
        </p>

        {/* Features list instead of truncating grid */}
        <ul className={`flex flex-wrap gap-2 ${isHero ? "gap-3" : ""}`}>
          {solution.features.map((feature, fIndex) => (
            <li
              key={fIndex}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/50 text-xs font-medium border border-border/50 text-foreground/80 transition-colors group-hover:border-[var(--accent)]/20"
            >
              <CheckCircle2 className="h-3 w-3" style={{ color: accentHex }} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ServiciosPage() {

  const [activeSection, setActiveSection] = useState<string>("")

  // Scroll Spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -70% 0px" } // Detecta la sección activa en el tercio superior
    )

    services.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <TechBackground />
      <Header />
      <main className="pt-20">

        {/* Hero Compacto & Editorial */}
        <section className="relative py-16 lg:py-24 overflow-hidden border-b border-border/50 bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
                Nuestros Servicios
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)] mb-6">
                Soluciones integrales para{" "}
                <span className="text-muted-foreground">modernizar</span> y{" "}
                <span className="text-muted-foreground">proteger</span> tu entorno.
              </h1>
            </div>

            {/* TOC Inicial / Pillars Summary */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Link
                    href={`#${service.id}`}
                    key={service.id}
                    className="group flex flex-col items-start p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-all hover:border-primary/30"
                  >
                    <Icon size={24} accentColor={service.accentHex} className="mb-3 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-semibold">{service.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Sticky TOC Navigation (Mobile & Desktop) */}
        <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-3">
              {services.map((category) => (
                <Link
                  key={`toc-${category.id}`}
                  href={`#${category.id}`}
                  style={{ "--accent": category.accentHex } as React.CSSProperties}
                  className={`relative whitespace-nowrap text-sm font-medium transition-colors hover:text-[var(--accent)] px-1 py-2
                    ${activeSection === category.id ? "text-[var(--accent)]" : "text-muted-foreground"}
                  `}
                >
                  {category.title}
                  {activeSection === category.id && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full bg-[var(--accent)]"
                      style={{ backgroundColor: category.accentHex }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Categories as Chapters */}
        <div className="pb-24">
          {services.map((category, index) => {
            const CategoryIcon = category.icon
            const chapterNum = String(index + 1).padStart(2, "0")

            return (
              <section
                key={category.id}
                id={category.id}
                style={{ "--cat-accent": category.accentHex } as React.CSSProperties}
                className="scroll-mt-32 pt-20 lg:pt-32"
              >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                  {/* Chapter Header */}
                  <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between mb-12 lg:mb-16">
                    <div className="flex-1 max-w-3xl">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text opacity-20" style={{ WebkitTextStroke: `1px ${category.accentHex}`, color: "transparent" }}>
                          {chapterNum}
                        </span>
                        <div className="h-12 w-px bg-border hidden md:block" />
                        <CategoryIcon size={36} accentColor={category.accentHex} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
                        {category.title}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Bento Grid Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.solutions.map((solution, solutionIndex) => (
                      <SolutionCard
                        key={solutionIndex}
                        solution={solution}
                        accentHex={category.accentHex}
                        index={solutionIndex}
                        isHero={solutionIndex === 0} // La primera card es ancha (Hero)
                      />
                    ))}
                  </div>

                  {/* Chapter Separator (Except last one) */}
                  {index < services.length - 1 && (
                    <div className="mt-20 lg:mt-32 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  )}
                </div>
              </section>
            )
          })}
        </div>

        {/* CTA Card Section */}
        <section className="py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-card p-8 md:p-16 text-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                  Consulta Gratuita
                </span>

                <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-6">
                  ¿Necesitas una solución a medida?
                </h2>

                <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
                  Nuestro equipo está listo para diseñar la arquitectura ideal de seguridad, TI, smart home o desarrollo web para tu proyecto.
                </p>

                <Link
                  href="/contacto"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:-translate-y-0.5"
                >
                  Contactar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
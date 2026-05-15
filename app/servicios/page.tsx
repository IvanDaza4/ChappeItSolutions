"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
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
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
        transitionDelay: `${index * 100}ms`,
      } as React.CSSProperties}
      className={`group relative overflow-hidden bg-card/40 backdrop-blur-sm border border-border/40 rounded-3xl transition-all duration-700 ease-out hover:shadow-[0_20px_40px_-15px_rgba(var(--accent-rgb),0.15)] hover:-translate-y-2 hover:border-[var(--accent)]/40 hover:bg-card/80
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        ${isHero ? "md:col-span-2 p-8 lg:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start" : "col-span-1 p-8 flex flex-col gap-6"}
      `}
    >
      {/* Subtle radial gradient background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${accentHex}10, transparent 50%)` }}
      />

      <div
        className={`relative flex items-center justify-center rounded-2xl shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3
          ${isHero ? "h-20 w-20 shadow-lg shadow-[var(--accent)]/10" : "h-14 w-14"}
        `}
        style={{ backgroundColor: `${accentHex}10`, color: accentHex, border: `1px solid ${accentHex}20` }}
      >
        <SolutionIcon size={isHero ? 36 : 28} accentColor={accentHex} />
      </div>

      <div className="flex-1 min-w-0 w-full relative z-10">
        <h3 className={`font-semibold tracking-tight text-foreground mb-3 transition-colors duration-300 group-hover:text-[var(--accent)] ${isHero ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          {solution.name}
        </h3>
        <p className={`text-muted-foreground leading-relaxed ${isHero ? "text-lg mb-8 max-w-2xl" : "text-base mb-6"}`}>
          {solution.description}
        </p>

        <ul className={`flex flex-wrap gap-2.5 ${isHero ? "gap-3" : ""}`}>
          {solution.features.map((feature, fIndex) => (
            <li
              key={fIndex}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 backdrop-blur-md text-[13px] font-medium border border-border/30 text-foreground/80 transition-all duration-300 group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" style={{ color: accentHex }} />
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
      { rootMargin: "-30% 0px -70% 0px" }
    )

    services.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-background selection:bg-primary/30 selection:text-primary">
      <TechBackground />
      <Header />

      <main className="relative pt-24 pb-32">
        {/* Abstract Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, var(--primary) 0%, transparent 70%)", filter: "blur(80px)" }} />

        {/* Editorial Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-6 lg:px-8 overflow-hidden">
          <div className="mx-auto max-w-7xl text-center relative z-10">
            <div className="animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-primary mb-8 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
                <Sparkles className="w-4 h-4" />
                Nuestros Servicios
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-[family-name:var(--font-heading)] leading-[1.1] mb-8 text-foreground">
                Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Digital</span> <br className="hidden md:block" />
                y Seguridad.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Diseñamos ecosistemas tecnológicos escalables. Desde protección inteligente hasta desarrollo de alto rendimiento.
              </p>
            </div>
          </div>
        </section>

        {/* Floating Dynamic Island TOC */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
          <nav className="flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-full p-2">
            {services.map((category) => (
              <Link
                key={`toc-${category.id}`}
                href={`#${category.id}`}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSection === category.id ? "text-background shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
                `}
              >
                {activeSection === category.id && (
                  <div
                    className="absolute inset-0 rounded-full -z-10 transition-all duration-500"
                    style={{ backgroundColor: category.accentHex }}
                  />
                )}
                <span className="relative z-10">{category.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Services / Chapters Layout */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-32 lg:space-y-48">
          {services.map((category, index) => {
            const CategoryIcon = category.icon
            const chapterNum = String(index + 1).padStart(2, "0")

            return (
              <section
                key={category.id}
                id={category.id}
                style={{ "--cat-accent": category.accentHex } as React.CSSProperties}
                className="scroll-mt-32 relative group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                  {/* Sticky Header Column */}
                  <div className="lg:col-span-4 flex flex-col relative">
                    <div className="lg:sticky lg:top-32 h-fit">
                      <div className="flex items-center gap-6 mb-8">
                        <span className="text-7xl lg:text-8xl font-black tracking-tighter text-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                          style={{ WebkitTextStroke: `2px ${category.accentHex}`, color: "transparent" }}>
                          {chapterNum}
                        </span>
                        <div className="h-20 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                        <div className="p-4 rounded-2xl bg-card border border-border shadow-lg" style={{ borderColor: `${category.accentHex}30` }}>
                          <CategoryIcon size={40} accentColor={category.accentHex} />
                        </div>
                      </div>

                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] mb-6">
                        {category.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Scrolling Bento Grid Cards */}
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                      {category.solutions.map((solution, solutionIndex) => (
                        <SolutionCard
                          key={solutionIndex}
                          solution={solution}
                          accentHex={category.accentHex}
                          index={solutionIndex}
                          isHero={solutionIndex === 0}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </section>
            )
          })}
        </div>

        {/* Premium CTA Card Section */}
        <section className="mt-32 lg:mt-48 px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="group relative rounded-[2.5rem] overflow-hidden bg-card border border-border/50 p-10 md:p-20 text-center transition-all duration-700 hover:border-primary/30">
              {/* Animated Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-8 p-3 bg-primary/10 rounded-2xl text-primary ring-1 ring-primary/20">
                  <ArrowRight className="h-8 w-8 -rotate-45" />
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-[family-name:var(--font-heading)] mb-6 text-foreground">
                  Transformemos tu visión en <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">realidad operativa.</span>
                </h2>

                <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg md:text-xl font-light">
                  Agenda una consulta técnica sin cargo. Nuestro equipo diseñará la arquitectura exacta para tu próximo gran proyecto.
                </p>

                <Link
                  href="/#contacto"
                  className="group/btn relative inline-flex h-14 items-center justify-center rounded-full bg-foreground px-10 text-base font-medium text-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary translate-y-[100%] transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    Iniciar Proyecto
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
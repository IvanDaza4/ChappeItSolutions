"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TechBackground, GridPattern, CircuitLines } from "@/components/tech-background"
import { CheckCircle2, ArrowRight } from "lucide-react"
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
  color: string
  borderColor: string
  accentHex: string
  iconBg: string
  glowColor: string
  image: string
  solutions: Solution[]
}

const services: ServiceCategory[] = [
  {
    id: "seguridad",
    title: "Seguridad Electrónica",
    description:
      "Protege tu hogar o negocio con sistemas de seguridad de última generación. Nuestras soluciones integran tecnología avanzada con analítica de video basada en inteligencia artificial.",
    icon: SecurityIcon,
    color: "from-red-500/20 to-red-600/5",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    accentHex: "#ef4444",
    iconBg: "bg-red-500/10 text-red-500",
    glowColor: "shadow-red-500/20",
    image: "/images/portfolio/seguridad-residencial.jpg",
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
        features: ["Sensores perimetrales", "Detectores de movimiento", "Monitoreo remoto", "Notificaciones instantáneas"],
      },
      {
        name: "Comunicaciones de Emergencia",
        icon: EmergencyCommsIcon,
        description:
          "Sistemas de comunicación para coordinación y respuesta rápida ante eventos, integrables con seguridad y monitoreo.",
        features: ["Radios digitales", "Intercomunicadores", "Sistemas PA", "Integración con CCTV"],
      },
    ],
  },
  {
    id: "ti",
    title: "Tecnologías de Información",
    description:
      "Soluciones integrales de TI que optimizan tu infraestructura, mejoran la productividad y aseguran la continuidad de tus operaciones.",
    icon: ITIcon,
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    accentHex: "#3b82f6",
    iconBg: "bg-blue-500/10 text-blue-500",
    glowColor: "shadow-blue-500/20",
    image: "/images/portfolio/datacenter.jpg",
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
        features: ["AWS / Azure / GCP", "Migración a la nube", "Backup en la nube", "SaaS / IaaS / PaaS"],
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
    color: "from-green-500/20 to-green-600/5",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    accentHex: "#22c55e",
    iconBg: "bg-green-500/10 text-green-500",
    glowColor: "shadow-green-500/20",
    image: "/images/portfolio/smart-home.jpg",
    solutions: [
      {
        name: "Automatización & Escenas",
        icon: AutomationIcon,
        description:
          "Automatizá rutinas para que tu casa trabaje por vos: escenas por horarios, presencia o geolocalización (según compatibilidad).",
        features: ["Escenas personalizadas", "Rutinas por horarios", "Automatización por sensores", "Control desde el celular"],
      },
      {
        name: "Iluminación Inteligente",
        icon: SmartLightIcon,
        description:
          "Control de luces por ambientes, horarios y escenas. Mejora el confort y sumá seguridad con simulación de presencia.",
        features: ["Control por ambientes", "Programaciones", "Simulación de presencia", "Escenas de luz"],
      },
      {
        name: "Cerraduras & Videoportero",
        icon: SmartLockIcon,
        description:
          "Accesos más seguros y cómodos: cerraduras inteligentes, videoportero y permisos temporales para visitas o servicios.",
        features: ["Acceso sin llaves", "Códigos temporales", "Historial de accesos", "Integración con cámaras"],
      },
      {
        name: "Wi-Fi / Mesh & Conectividad",
        icon: WiFiMeshIcon,
        description:
          "Red estable para que el smart home funcione bien: optimizamos cobertura, puntos críticos y seguridad de la red.",
        features: ["Cobertura mejorada", "Red Mesh", "Segmentación IoT", "Seguridad Wi-Fi"],
      },
    ],
  },
  {
    id: "web",
    title: "Diseño y Desarrollo Web",
    description:
      "Creamos sitios web y aplicaciones digitales a medida que impulsan tu presencia online. Desde landing pages hasta plataformas e-commerce, combinamos diseño atractivo con tecnología de vanguardia.",
    icon: WebIcon,
    color: "from-purple-500/20 to-purple-600/5",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    accentHex: "#a855f7",
    iconBg: "bg-purple-500/10 text-purple-500",
    glowColor: "shadow-purple-500/20",
    image: "/images/portfolio/code.jpg",
    solutions: [
      {
        name: "Diseño UI/UX",
        icon: UIDesignIcon,
        description:
          "Diseñamos interfaces modernas, intuitivas y centradas en el usuario. Cada proyecto parte de un análisis de tu marca y audiencia para lograr una experiencia visual única.",
        features: ["Diseño responsive", "Identidad visual", "Prototipado interactivo", "Experiencia de usuario"],
      },
      {
        name: "Desarrollo Web",
        icon: WebDevIcon,
        description:
          "Desarrollamos sitios web y aplicaciones con las últimas tecnologías: rendimiento, seguridad y escalabilidad para tu negocio.",
        features: ["Next.js / React", "Sitios corporativos", "Landing pages", "Aplicaciones web"],
      },
      {
        name: "E-Commerce",
        icon: ECommerceIcon,
        description:
          "Tiendas online completas con catálogo de productos, carrito de compras, pasarelas de pago y gestión de pedidos para vender más.",
        features: ["Catálogo de productos", "Pasarelas de pago", "Gestión de pedidos", "Panel de administración"],
      },
      {
        name: "SEO & Performance",
        icon: SEOIcon,
        description:
          "Optimización técnica y de contenido para que tu sitio aparezca en los primeros resultados de búsqueda y cargue a máxima velocidad.",
        features: ["SEO on-page", "Velocidad de carga", "Google Analytics", "Posicionamiento orgánico"],
      },
    ],
  },
]

function SolutionCard({
  solution,
  accentHex,
  categoryColor,
  index,
}: {
  solution: Solution
  accentHex: string
  categoryColor: string
  index: number
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
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const SolutionIcon = solution.icon

  return (
    <div
      ref={cardRef}
      className={`group relative bg-card border ${categoryColor} rounded-2xl p-6 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-primary/40 transition-colors duration-300" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-primary/40 transition-colors duration-300" />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${categoryColor
            .replace("border-", "bg-")
            .replace("/30", "/10")
            .replace("/60", "/20")} shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          <SolutionIcon size={28} accentColor={accentHex} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-heading)] group-hover:text-primary transition-colors">
            {solution.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{solution.description}</p>
          <ul className="grid grid-cols-2 gap-2">
            {solution.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-2 text-sm group/item">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom line animation */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <TechBackground />
      <main className="pt-20">
        {/* Hero section */}
        <section className="relative py-20 overflow-hidden">
          <GridPattern />
          <CircuitLines />

          <div className="absolute inset-0 -z-5">
            <Image src="/images/services-bg.jpg" alt="" fill className="object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3 animate-pulse">
                Nuestros Servicios
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-heading)]">
                Soluciones Tecnológicas
                <span className="text-primary"> Integrales</span>
              </h1>
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
              <p className="mt-6 text-lg text-muted-foreground">
                Ofrecemos servicios especializados en cuatro pilares fundamentales para modernizar y proteger tus
                espacios: Seguridad, TI, IoT para el Hogar y Diseño & Desarrollo Web.
              </p>
            </div>
          </div>
        </section>

        {/* Services sections */}
        {services.map((category, index) => {
          const CategoryIcon = category.icon
          return (
            <section
              key={category.id}
              id={category.id}
              className={`relative py-20 overflow-hidden ${index % 2 === 1 ? "bg-secondary/30" : ""}`}
            >
              {/* Background image */}
              <div className="absolute inset-0 -z-10">
                <Image src={category.image || "/placeholder.svg"} alt="" fill className="object-cover opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />
              </div>

              <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                {/* Category header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                  <div
                    className={`relative flex h-20 w-20 items-center justify-center rounded-2xl ${category.iconBg} group`}
                  >
                    <CategoryIcon size={44} accentColor={category.accentHex} />
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl ${category.iconBg} blur-xl opacity-50`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">{category.description}</p>
                  </div>
                </div>

                {/* Solutions grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {category.solutions.map((solution, solutionIndex) => (
                    <SolutionCard
                      key={solutionIndex}
                      solution={solution}
                      accentHex={category.accentHex}
                      categoryColor={category.borderColor}
                      index={solutionIndex}
                    />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
          <CircuitLines />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Consulta Gratuita
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              ¿Necesitas una Solución <span className="text-primary">Personalizada</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Nuestro equipo está listo para diseñar una solución a medida (seguridad, TI, smart home o web) que se
              adapte perfectamente a tus necesidades.
            </p>
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Solicitar Evaluación Gratuita
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

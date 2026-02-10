"use client"

import { useRef, useState, useEffect } from "react"
import { CheckCircle2, Monitor, Wifi, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"


const supportLevels = [
  {
    level: "Nivel 1",
    levelNumber: "1",
    title: "Soporte Nivel 1",
    description: "Resolución rápida de incidencias comunes y asistencia técnica básica",
    icon: Monitor,
    popular: false,
    features: [
      "Problemas de contraseñas",
      "Configuración de correo",
      "Instalación de software",
      "Soporte de impresoras",
    ],
    color: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    iconBg: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
  },
{
    level: "Nivel 2",
    levelNumber: "2",
    title: "Soporte Nivel 2",
    description: "Diagnóstico avanzado y resolución de problemas técnicos complejos",
    icon: Wifi,
    popular: true,
    features: [
      "Configuración de servidores",
      "Problemas de red",
      "Recuperación de datos",
      "Optimización de sistemas",
    ],
    color: "from-red-500/10 to-red-500/5",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    iconBg: "bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white",
  },
{
    level: "Nivel 3",
    levelNumber: "3",
    title: "Soporte Nivel 3",
    description: "Expertos especializados para infraestructura crítica y proyectos complejos",
    icon: Monitor,
    popular: false,
    features: [
      "Arquitectura de red",
      "Seguridad informática",
      "Migración de sistemas",
      "Consultoría IT",
    ],
    color: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
    iconBg: "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
  },
]

function SupportCard({
  support,
  index,
}: {
  support: (typeof supportLevels)[0]
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
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
      className={`group relative ${support.popular ? "z-10 md:-translate-y-2" : ""
        } rounded-2xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* IDEA TECNOLÓGICA: Floating Status Badge */}
      {support.popular && (
        <div className="absolute -top-3 right-6 z-30">
          <div className="flex items-center gap-2 px-3 py-1 bg-background border border-primary/50 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
              Sugerido
            </span>
          </div>
        </div>
      )}

      {/* Card background */}
      <div className={`relative bg-card border ${support.popular ? 'border-primary/50' : 'border-border'} rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full`}>

        {/* Efecto de Rayo de Luz (Scanline) solo para el popular */}
        {support.popular && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[100%] bg-gradient-to-b from-primary/5 to-transparent -translate-y-full animate-[scan_4s_linear_infinite]" />
          </div>
        )}

        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${support.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative p-8 pt-12">

          {/* Glow de fondo para el icono en el popular */}
          {support.popular && (
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 blur-[40px] rounded-full pointer-events-none" />
          )}

          {/* Icon */}
          <div
            className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl ${support.iconBg} mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}
          >
            <support.icon className="h-7 w-7" />
          </div>

          {/* Level tag con diseño de "Code Bracket" */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-mono text-xs opacity-70">{"<"}</span>
            <p className="text-xs font-bold text-primary tracking-widest uppercase">
              {support.level}
            </p>
            <span className="text-primary font-mono text-xs opacity-70">{">"}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-heading)] group-hover:text-primary transition-colors">
            {support.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            {support.description}
          </p>

          <ul className="space-y-3 mb-8">
            {support.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3 group/item">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

<Button
            className={`w-full group/btn relative overflow-hidden ${support.popular ? "shadow-[0_0_20px_rgba(var(--primary),0.2)]" : ""
              }`}
            variant={support.popular ? "default" : "outline"}
            onClick={() => {
              // Dispatch custom event to update footer form
              window.dispatchEvent(new CustomEvent("supportLevelSelected", { 
                detail: { nivel: support.levelNumber } 
              }))
              // Scroll to footer
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Establecer Conexión
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Borde inferior de carga */}
        {support.popular && (
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-muted overflow-hidden">
            <div className="h-full bg-primary w-1/3 animate-[loading_3s_infinite_linear]" />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  )
}

export function SupportLevels() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Niveles de Soporte
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-heading)]">
            Ofrecemos Soporte Técnico <span className="text-primary">Escalonado</span>
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground">
            Para resolver cualquier incidencia según su complejidad, ofrecemos tres niveles
            de soporte especializados
          </p>
        </div>

        {/* Support cards grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportLevels.map((support, index) => (
            <SupportCard key={index} support={support} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-8 text-center overflow-hidden group">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(229,57,53,0.5), transparent)",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>

          <div className="relative">
            <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-heading)]">
              ¿Necesitas Ayuda Inmediata?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nuestro equipo de expertos está disponible para asesorarte en la selección del
              nivel de soporte más adecuado para tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Contactar Ahora
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CheckCircle2, Building2, Users, Award, TrendingUp } from "lucide-react"
import { CircuitLines } from "./tech-background"

const stats = [
  { label: "Años en el mercado", value: 20, suffix: "+" },
  { label: "Proyectos implementados", value: 500, suffix: "+" },
  { label: "Clientes protegidos", value: 200, suffix: "+" },
  { label: "Técnicos certificados", value: 50, suffix: "+" },
]


const highlights = [
  "Equipo técnico certificado, con experiencia en instalaciones residenciales y comerciales",
  "Especialistas en IoT: domótica, seguridad electrónica y conectividad de alto rendimiento",
  "Instalaciones prolijas, seguras y planificadas (sin sorpresas ni improvisación)",
  "Soluciones a medida según tu espacio, necesidades y presupuesto",
  "Soporte técnico y mantenimiento para asegurar funcionamiento continuo",
  "Integración con marcas líderes y plataformas smart home",
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
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
      {count}
      {suffix}
    </span>
  )
}

export function AboutSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          highlights.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (listRef.current) {
      observer.observe(listRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24 bg-secondary/30 overflow-hidden">
      <CircuitLines />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3 animate-pulse">
            Quiénes Somos
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-heading)]">
            Tu Socio Tecnológico de <span className="text-primary">Confianza</span>
          </h2>
          <div className="mt-3 h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - About text */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 font-[family-name:var(--font-heading)] flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </span>
              Nuestra Misión
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              En <strong>Chappe IT Solutions</strong> diseñamos e implementamos soluciones de tecnología para hogares y negocios:
              <strong> seguridad electrónica</strong>, <strong>conectividad</strong> e <strong>IoT</strong>.
              Nuestro objetivo es que tu espacio funcione mejor: más seguro, más cómodo y más eficiente, con una instalación prolija,
              integración real entre equipos y una experiencia simple de uso desde el celular.
              Con más de <strong>15 años de trayectoria</strong>, trabajamos con criterio técnico, buenas prácticas y soporte para que todo siga funcionando con el tiempo.
            </p>
            {/* Image with tech overlay */}
            <div className="relative rounded-xl overflow-hidden mb-8 group">
              <Image
                src="/images/about-team.jpg"
                alt="Equipo Chappe It Solutions"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 border border-primary/20 rounded-xl" />

              {/* Scan effect */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: "scan 2s linear infinite" }}
                />
              </div>

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
            </div>

            {/* Highlights list */}
            <ul ref={listRef} className="space-y-3">
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-500 ${visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - Stats and features */}
          <div className="space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-card border border-border rounded-xl p-6 text-center overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <p className="relative text-4xl font-bold text-primary font-[family-name:var(--font-heading)]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="relative text-sm text-muted-foreground mt-2">{stat.label}</p>

                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              ))}
            </div>

            {/* Trayectoria */}
            <div className="relative bg-card border border-border rounded-xl p-6 overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

              <h4 className="relative text-lg font-semibold mb-4 font-[family-name:var(--font-heading)] flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Nuestra Trayectoria
              </h4>
              <p className="relative text-muted-foreground leading-relaxed mb-4">
                Implementamos soluciones reales de smart home para distintas necesidades, como:
              </p>
              <div className="relative flex flex-wrap gap-2">
                {[
                  "Seguridad residencial",
                  "CCTV & videoportero",
                  "Sensores y alarmas",
                  "Iluminación inteligente",
                  "Cerraduras inteligentes",
                  "Wi-Fi profesional & Mesh",
                ].map((sector, i) => (
                  <span
                    key={sector}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 overflow-hidden group">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(229,57,53,0.5), transparent)",
                    animation: "shimmer 2s infinite",
                  }}
                />
              </div>

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-heading)] text-lg">
                    Evaluación Inicial Sin Costo
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Relevamos tu espacio y te recomendamos la mejor configuración: qué instalar, dónde conviene, cómo integrarlo y cómo dejarlo seguro.
                    Te entregamos una propuesta clara, escalable y a medida, sin compromiso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

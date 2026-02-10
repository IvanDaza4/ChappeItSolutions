"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Server, Smartphone, ChevronDown } from "lucide-react"
import { GridPattern, GlowOrb, CircuitLines, ScanLine, FloatingIcons } from "./tech-background"
import {
  SecurityIcon,
  ITIcon,
  IoTIcon,
  WebIcon
} from "@/components/service-icons"

const words = ["Seguridad", "Innovación", "Tecnología", "Confianza"]

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Tech background */}
      <GridPattern />
      <CircuitLines />
      <FloatingIcons />
      <ScanLine />

      {/* Glow orbs */}
      <GlowOrb className="w-96 h-96 bg-primary/10 top-1/4 -left-48 animate-pulse" />
      <GlowOrb className="w-96 h-96 bg-primary/5 bottom-1/4 -right-48 animate-pulse delay-1000" />

      {/* Background image overlay */}
      <div className="absolute inset-0 -z-5">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none">
        <span className="text-[12rem] md:text-[20rem] font-bold text-foreground/[0.02] font-[family-name:var(--font-heading)] whitespace-nowrap">
          CHAPPE IT SOLUTIONS
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated badge */}
          <div className="mb-8 flex justify-center animate-fade-in-up">
            <div className="group relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm hover:border-primary/50 transition-all duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="relative">
                Más de 20 años de experiencia
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-[family-name:var(--font-heading)] animate-fade-in-up animation-delay-200">
            <span className="text-balance">Soluciones Tecnológicas</span>
            <br />
            <span className="relative">
              <span
                className={`text-primary inline-block transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
              >
                {words[currentWord]}
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty animate-fade-in-up animation-delay-400">
            Equipos de profesionales certificados dedicados a brindar soluciones de seguridad electrónica,
            tecnologías de información e <span className="text-foreground/90">IoT para el hogar</span> (domótica, automatización y control inteligente).
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button size="lg" className="group relative overflow-hidden" asChild>
              <Link href="/servicios">
                <span className="relative z-10 flex items-center">
                  Ver Servicios
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-primary/30 hover:border-primary/60 hover:bg-primary/5 bg-transparent"
              asChild
            >
              <Link href="#contacto">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text group-hover:from-primary group-hover:to-red-400 transition-all">
                  Solicitar Evaluación
                </span>
              </Link>
            </Button>
          </div>

          {/* Service highlights */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { icon: SecurityIcon, title: "Seguridad Electrónica", desc: "Circuitos CCTV, Control de Acceso", delay: "animation-delay-800" },
              { icon: ITIcon, title: "Tecnologías de Información", desc: "Redes, Cloud, Software", delay: "animation-delay-900" },
              { icon: IoTIcon, title: "IoT para el Hogar", desc: "Domótica, cámaras, sensores y automatización", delay: "animation-delay-1000" },
              { icon: WebIcon, title: "Diseño y Desarrollo Web", desc: "Landing Page, E-commerce, SEO", delay: "animation-delay-1000" }
            ].map((item, index) => (
              <div
                key={index}
                className={`group relative flex flex-col items-center p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 animate-fade-in-up ${item.delay}`}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <item.icon className="h-7 w-7" />
                  {/* Icon glow */}
                  <div className="absolute inset-0 rounded-xl bg-primary/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
                <h3 className="relative font-semibold font-[family-name:var(--font-heading)]">{item.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground text-center">{item.desc}</p>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/20 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/20 rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  )
}

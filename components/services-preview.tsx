"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowUpRight,
  Bell,
  Camera,
  Cloud,
  Code,
  DoorClosed,
  Fingerprint,
  Layout,
  Lightbulb,
  Monitor,
  Wifi,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ITIcon,
  IoTIcon,
  SecurityIcon,
  WebIcon,
} from "@/components/service-icons"

/* ----------------------------- Types ----------------------------- */

type LucideLikeIcon = ComponentType<{ className?: string }>

type CategoryAccent = "red" | "blue" | "green" | "purple"

interface ServiceItem {
  name: string
  icon: LucideLikeIcon
}

interface ServiceCategory {
  title: string
  description: string
  icon: LucideLikeIcon
  accent: CategoryAccent
  image: string
  services: ServiceItem[]
  href: string
  /** Featured cards span 2 cols on lg and show a larger preview. */
  featured?: boolean
}

/* --------------------------- Data ---------------------------- */

const serviceCategories: ServiceCategory[] = [
  {
    title: "Seguridad Electrónica",
    description:
      "Protege tu hogar o negocio con sistemas inteligentes de vigilancia y control.",
    icon: SecurityIcon,
    accent: "red",
    image: "/images/portfolio/seguridad.jpeg",
    services: [
      { name: "CCTV con Analítica IA", icon: Camera },
      { name: "Control de Acceso", icon: Fingerprint },
      { name: "Alarmas y Sensores", icon: Bell },
    ],
    href: "/servicios#seguridad",
    featured: true,
  },
  {
    title: "Tecnologías de Información",
    description:
      "Infraestructura y servicios TI para que todo funcione rápido, estable y seguro.",
    icon: ITIcon,
    accent: "blue",
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
    description:
      "Automatiza y controla tu casa desde el celular: confort, seguridad y eficiencia.",
    icon: IoTIcon,
    accent: "green",
    image: "/images/portfolio/iot.png",
    services: [
      { name: "Wi-Fi Mesh & Conectividad", icon: Wifi },
      { name: "Cerraduras y Videoportero", icon: DoorClosed },
      { name: "Iluminación y Escenas Smart", icon: Lightbulb },
    ],
    href: "/servicios#iot",
  },
  {
    title: "Diseño y Desarrollo Web",
    description:
      "Presencia digital impactante: sitios modernos, rápidos y optimizados para conversión.",
    icon: WebIcon,
    accent: "purple",
    image: "/images/portfolio/code.jpg",
    services: [
      { name: "Diseño UI/UX Profesional", icon: Layout },
      { name: "Desarrollo Full-Stack", icon: Code },
      { name: "Optimización y Performance", icon: Zap },
    ],
    href: "/servicios#web",
  },
]

/* --------------------------- Theming ---------------------------- */
/**
 * Static Tailwind class maps per accent. Defined as full literals so the JIT
 * compiler can detect them — never build class names by string concat.
 */
const accentClasses: Record<
  CategoryAccent,
  {
    border: string
    borderHover: string
    iconBg: string
    iconText: string
    iconBgHover: string
    chipHover: string
    link: string
    glow: string
    topLine: string
    ring: string
  }
> = {
  red: {
    border: "border-red-500/15",
    borderHover: "group-hover:border-red-500/50",
    iconBg: "bg-red-500/10",
    iconText: "text-red-500",
    iconBgHover: "group-hover:bg-red-500 group-hover:text-white",
    chipHover: "group-hover/item:text-red-400",
    link: "text-red-400 group-hover:text-red-300",
    glow: "group-hover:shadow-[0_0_60px_-15px] group-hover:shadow-red-500/40",
    topLine: "bg-red-500",
    ring: "focus-visible:ring-red-500/60",
  },
  blue: {
    border: "border-blue-500/15",
    borderHover: "group-hover:border-blue-500/50",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
    iconBgHover: "group-hover:bg-blue-500 group-hover:text-white",
    chipHover: "group-hover/item:text-blue-400",
    link: "text-blue-400 group-hover:text-blue-300",
    glow: "group-hover:shadow-[0_0_60px_-15px] group-hover:shadow-blue-500/40",
    topLine: "bg-blue-500",
    ring: "focus-visible:ring-blue-500/60",
  },
  green: {
    border: "border-emerald-500/15",
    borderHover: "group-hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    iconBgHover: "group-hover:bg-emerald-500 group-hover:text-white",
    chipHover: "group-hover/item:text-emerald-400",
    link: "text-emerald-400 group-hover:text-emerald-300",
    glow: "group-hover:shadow-[0_0_60px_-15px] group-hover:shadow-emerald-500/40",
    topLine: "bg-emerald-500",
    ring: "focus-visible:ring-emerald-500/60",
  },
  purple: {
    border: "border-purple-500/15",
    borderHover: "group-hover:border-purple-500/50",
    iconBg: "bg-purple-500/10",
    iconText: "text-purple-400",
    iconBgHover: "group-hover:bg-purple-500 group-hover:text-white",
    chipHover: "group-hover/item:text-purple-400",
    link: "text-purple-400 group-hover:text-purple-300",
    glow: "group-hover:shadow-[0_0_60px_-15px] group-hover:shadow-purple-500/40",
    topLine: "bg-purple-500",
    ring: "focus-visible:ring-purple-500/60",
  },
}

/* --------------------- Reveal-on-scroll hook --------------------- */

function useReveal<T extends HTMLElement>(delayMs: number) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delayMs)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [delayMs])

  return { ref, isVisible }
}

/* ----------------------------- Card ----------------------------- */

interface ServiceCardProps {
  category: ServiceCategory
  index: number
}

function ServiceCard({ category, index }: ServiceCardProps) {
  const { ref, isVisible } = useReveal<HTMLLIElement>(index * 90)
  const a = accentClasses[category.accent]
  const Icon = category.icon

  return (
    <li
      ref={ref}
      className={[
        "group relative list-none",
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        category.featured ? "lg:col-span-2 lg:row-span-1" : "",
      ].join(" ")}
    >
      <Link
        href={category.href}
        aria-label={`Ver más sobre ${category.title}`}
        className={[
          "relative flex h-full flex-col overflow-hidden rounded-2xl",
          "bg-card/60 backdrop-blur-sm",
          "border", a.border, a.borderHover,
          "transition-[border-color,box-shadow,transform] duration-500",
          "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
          a.glow,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          a.ring,
          category.featured ? "lg:flex-row" : "",
        ].join(" ")}
      >
        {/* Animated top accent line */}
        <span
          aria-hidden
          className={[
            "absolute inset-x-0 top-0 h-px origin-left scale-x-0",
            "transition-transform duration-700 ease-out",
            "group-hover:scale-x-100 group-focus-visible:scale-x-100",
            a.topLine,
          ].join(" ")}
        />

        {/* Image side / background */}
        <div
          className={[
            "relative shrink-0 overflow-hidden",
            category.featured
              ? "h-56 w-full lg:h-auto lg:w-2/5"
              : "h-40 w-full",
          ].join(" ")}
        >
          <Image
            src={category.image || "/placeholder.svg"}
            alt=""
            role="presentation"
            fill
            sizes={
              category.featured
                ? "(min-width: 1024px) 40vw, 100vw"
                : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            }
            className="object-cover opacity-40 saturate-50 transition-[opacity,transform,filter] duration-700 group-hover:scale-105 group-hover:opacity-70 group-hover:saturate-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* Bottom-to-top gradient to anchor text on small cards */}
          <div
            aria-hidden
            className={[
              "absolute inset-0",
              category.featured
                ? "bg-gradient-to-r from-card via-card/70 to-card/0 lg:to-card/10"
                : "bg-gradient-to-b from-card/0 via-card/60 to-card",
            ].join(" ")}
          />
          {/* Subtle vignette on hover, color-tinted */}
          <div
            aria-hidden
            className={[
              "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
              "bg-[radial-gradient(120%_60%_at_0%_0%,currentColor_0%,transparent_55%)]",
              a.iconText,
            ].join(" ")}
            style={{ mixBlendMode: "overlay" }}
          />
        </div>

        {/* Content */}
        <div
          className={[
            "relative flex flex-1 flex-col p-6 sm:p-7",
            category.featured ? "lg:p-8" : "",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            {/* Icon tile */}
            <span
              className={[
                "inline-flex h-12 w-12 items-center justify-center rounded-xl",
                "ring-1 ring-inset ring-white/5",
                a.iconBg, a.iconText, a.iconBgHover,
                "transition-colors duration-300",
              ].join(" ")}
            >
              <Icon className="h-5 w-5" />
            </span>

            {/* Subtle arrow indicator that the whole card is clickable */}
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-muted-foreground transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.05] group-hover:text-foreground"
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
          </div>

          <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground sm:text-xl font-[family-name:var(--font-heading)]">
            {category.title}
          </h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>

          {/* Services as chips — denser, more scannable */}
          <ul
            className={[
              "mt-5 flex flex-wrap gap-1.5",
              category.featured ? "lg:max-w-md" : "",
            ].join(" ")}
            aria-label={`Servicios de ${category.title}`}
          >
            {category.services.map((service) => {
              const SvcIcon = service.icon
              return (
                <li
                  key={service.name}
                  className="group/item inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <SvcIcon
                    className={[
                      "h-3.5 w-3.5 transition-colors duration-200",
                      a.chipHover,
                    ].join(" ")}
                    aria-hidden
                  />
                  <span className={a.chipHover}>{service.name}</span>
                </li>
              )
            })}
          </ul>

          {/* Spacer pushes the CTA row to the bottom on featured layouts */}
          <div className="mt-auto pt-6">
            <span
              className={[
                "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
                a.link,
              ].join(" ")}
            >
              Ver detalles
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

/* --------------------------- Section --------------------------- */

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-preview-heading"
      className="relative isolate overflow-hidden py-24 sm:py-28"
    >
      {/* Atmospheric background — no decorative image needed */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <header className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-r from-transparent to-primary/70"
            />
            Nuestros Servicios
          </p>
          <h2
            id="services-preview-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]"
          >
            Soluciones para cada{" "}
            <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              necesidad
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Cuatro pilares para modernizar, proteger y conectar tus espacios.
            Cada servicio se diseña a medida y se entrega con foco en performance,
            seguridad y experiencia.
          </p>
        </header>

        {/* Bento asymmetric grid */}
        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {serviceCategories.map((category, index) => (
            <ServiceCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </ul>

        {/* CTA — color-disciplined, no red mix (red ≡ Seguridad in the grid) */}
        <div className="mt-14 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            ¿Buscás algo específico? Mirá el catálogo completo.
          </p>
          <Button size="lg" className="group relative overflow-hidden" asChild>
            <Link href="/servicios">
              <span className="relative z-10 flex items-center gap-2">
                Explorar todos los servicios
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
              </span>
              {/* Sheen sweep — primary-only, no semantic clash */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-[opacity,transform] duration-700 group-hover:translate-x-[400%] group-hover:opacity-100"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
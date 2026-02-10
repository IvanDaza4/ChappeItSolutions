"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TechBackground, GridPattern, CircuitLines } from "@/components/tech-background"
import { Building2, Users, Star, Award, ExternalLink } from "lucide-react"

const clients = [
    {
        name: "Sergio Trepat Automóviles",
        industry: "Concesionario BMW",
        logo: "/logos/sergio-trepat.jpg",
        url: "http://www.sergiotrepat.com",
        color: "from-blue-500/20 to-blue-600/5",
    },
    {
        name: "CAR DISTRICT",
        industry: "Concesionario Jeep",
        logo: "/logos/car.png",
        url: "https://www.cardistrict.com.ar",
        color: "from-red-500/20 to-red-600/5",
    },
    {
        name: "Trepat MINI",
        industry: "Concesionario MINI",
        logo: "/logos/trepat-mini.png",
        url: "https://www.trepatmini.com",
        color: "from-orange-500/20 to-orange-600/5",
    },
    {
        name: "Estudio Mancusi",
        industry: "Consultoría Contable",
        logo: "/logos/mancusi.png",
        url: "https://www.dm9090.com.ar",
        color: "from-purple-500/20 to-purple-600/5",
    },
    {
        name: "Ingnala",
        industry: "Prevención Incendios",
        logo: "/logos/ingnala.png",
        url: "https://www.ingnala.com.ar",
        color: "from-yellow-500/20 to-yellow-600/5",
    },
    {
        name: "Industrias MAS",
        industry: "Seguridad Industrial",
        logo: "/logos/imas.png",
        url: "http://www.industriasmas.com.ar",
        color: "from-cyan-500/20 to-cyan-600/5",
    },
    {
        name: "Paraná Seguros",
        industry: "Seguros",
        logo: "/logos/parana.png",
        url: "https://www.paranaseguros.com.ar",
        color: "from-green-500/20 to-green-600/5",
    },
    {
        name: "Nordelbahn Volkswagen",
        industry: "Concesionario VW",
        logo: "/logos/nordelbahn.png",
        url: "https://nordelbahnvw.com.ar/",
        color: "from-emerald-500/20 to-emerald-600/5",
    },
]

function ClientCard({
    client,
    index,
}: {
    client: (typeof clients)[0]
    index: number
}) {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => setIsVisible(true), (index % 6) * 80)
                }
            },
            { threshold: 0.1 }
        )

        if (cardRef.current) observer.observe(cardRef.current)
        return () => observer.disconnect()
    }, [index])

    return (
        <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={cardRef}
            className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-500 cursor-pointer ${isHovered
                    ? "border-primary bg-card scale-105 shadow-2xl shadow-primary/10"
                    : "border-border hover:border-primary/50"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background gradient */}
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Logo */}
            <div className="relative h-20 w-20 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <Image
                    src={client.logo}
                    alt={client.name}
                    width={80}
                    height={80}
                    className="object-contain p-2 group-hover:scale-110 transition-transform"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <p className="relative text-sm font-semibold text-center group-hover:text-primary transition-colors">
                {client.name}
            </p>
            <span className="relative text-xs text-muted-foreground mt-1 px-2 py-0.5 rounded-full bg-secondary/50">
                {client.industry}
            </span>

            {/* External link icon */}
            <div className="relative mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="h-4 w-4 text-primary" />
            </div>

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-transparent group-hover:border-primary/40 transition-colors rounded-tl" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-transparent group-hover:border-primary/40 transition-colors rounded-br" />
        </a>
    )
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
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

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [value, hasAnimated])

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    )
}

export default function ClientesPage() {
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
                        <Image src="/images/clients-bg.jpg" alt="" fill className="object-cover opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
                                <Star className="h-4 w-4" />
                                800+ Usuarios Impactados
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-heading)]">
                                Confianza que
                                <span className="text-primary"> Construimos</span>
                            </h1>
                            <div className="mt-3 flex items-center justify-center gap-2">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
                            </div>
                            <p className="mt-6 text-lg text-muted-foreground">
                                8 empresas líderes en Argentina confían en nosotros. Impactamos a más de 800 usuarios
                                con soluciones tecnológicas de primera calidad y servicio excepcional.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Clients section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Building2 className="h-8 w-8" />
                                <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-50" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Nuestros Clientes</h2>
                                <p className="text-muted-foreground mt-1">Empresas líderes en sus industrias</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {clients.map((client, index) => (
                                <ClientCard key={index} client={client} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { value: 8, suffix: "", label: "Clientes Principales", icon: Users },
                                { value: 800, suffix: "+", label: "Usuarios Impactados", icon: Star },
                                { value: 15, suffix: "+", label: "Años de Experiencia", icon: Building2 },
                                { value: 98, suffix: "%", label: "Tasa de Satisfacción", icon: Award },
                            ].map((stat, index) => (
                                <div key={index} className="group">
                                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <stat.icon className="h-7 w-7" />
                                        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-4xl font-bold text-primary font-[family-name:var(--font-heading)]">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

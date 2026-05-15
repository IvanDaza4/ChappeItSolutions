"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TechBackground } from "@/components/tech-background"
import { WhatsAppButton } from "@/components/whatsapp-button"

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const clients = [
    { name: "Sergio Trepat Automóviles", industry: "Concesionario BMW", logo: "/logos/sergio-trepat.jpg", url: "http://www.sergiotrepat.com", init: "ST" },
    { name: "CAR DISTRICT", industry: "Concesionario Jeep", logo: "/logos/car.png", url: "https://www.cardistrict.com.ar", init: "CD" },
    { name: "Trepat MINI", industry: "Concesionario MINI", logo: "/logos/trepat-mini.png", url: "https://www.trepatmini.com", init: "TM" },
    { name: "Estudio Mancusi", industry: "Consultoría Contable", logo: "/logos/mancusi.png", url: "https://www.dm9090.com.ar", init: "EM" },
    { name: "Ingnala", industry: "Prevención Incendios", logo: "/logos/ingnala.png", url: "https://www.ingnala.com.ar", init: "IG" },
    { name: "Industrias MAS", industry: "Seguridad Industrial", logo: "/logos/imas.png", url: "http://www.industriasmas.com.ar", init: "IM" },
    { name: "Paraná Seguros", industry: "Seguros", logo: "/logos/parana.png", url: "https://www.paranaseguros.com.ar", init: "PS" },
    { name: "Nordelbahn Volkswagen", industry: "Concesionario VW", logo: "/logos/nordelbahn.png", url: "https://nordelbahnvw.com.ar/", init: "NV" },
]

const stats = [
    { value: 8, suffix: "", label: "Clientes\nPrincipales", ghost: "08" },
    { value: 800, suffix: "+", label: "Usuarios\nImpactados", ghost: "800" },
    { value: 15, suffix: "+", label: "Años de\nExperiencia", ghost: "15" },
    { value: 98, suffix: "%", label: "Tasa de\nSatisfacción", ghost: "%" },
]

const tickerItems = [
    "Concesionario BMW", "Concesionario Jeep", "Concesionario MINI",
    "Consultoría Contable", "Prevención Incendios", "Seguridad Industrial",
    "Seguros", "Concesionario VW",
]

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const [done, setDone] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !done) {
                    setDone(true)
                    const fps = 60, frames = Math.round((1600 / 1000) * fps)
                    const step = value / frames
                    let cur = 0
                    const t = setInterval(() => {
                        cur = Math.min(cur + step, value)
                        setCount(Math.round(cur))
                        if (cur >= value) clearInterval(t)
                    }, 1000 / fps)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [value, done])

    return <span ref={ref}>{count}{suffix}</span>
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────── */
function Reveal({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode
    delay?: number
    className?: string
}) {
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => setVisible(true), delay)
                    obs.disconnect()
                }
            },
            { threshold: 0.08 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [delay])

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
            }}
        >
            {children}
        </div>
    )
}

/* ─────────────────────────────────────────────
   CLIENT CELL
───────────────────────────────────────────── */
function ClientCell({ client, index }: { client: (typeof clients)[0]; index: number }) {
    const [imgErr, setImgErr] = useState(false)
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => setVisible(true), index * 65)
                    obs.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [index])

    const num = String(index + 1).padStart(2, "0")

    return (
        <a
            ref={ref}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="client-cell"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.5s ease ${index * 0.065}s, transform 0.5s ease ${index * 0.065}s`,
            }}
        >
            <span className="cell-index">{num}</span>

            <div className="logo-ring">
                {!imgErr ? (
                    <Image
                        src={client.logo}
                        alt={client.name}
                        width={46}
                        height={46}
                        className="object-contain"
                        style={{ padding: "3px" }}
                        onError={() => setImgErr(true)}
                    />
                ) : (
                    <span className="logo-initials">{client.init}</span>
                )}
            </div>

            <span className="cell-name">{client.name}</span>
            <span className="cell-industry">{client.industry}</span>
            <span className="cell-arrow">↗</span>
            <div className="cell-underline" />
        </a>
    )
}

/* ─────────────────────────────────────────────
   STAT CELL
───────────────────────────────────────────── */
function StatCell({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
    return (
        <div className="stat-cell">
            <p className="stat-num">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="stat-label">
                {stat.label.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
            </p>
            <span className="stat-ghost">{stat.ghost}</span>
        </div>
    )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ClientesPage() {
    const doubled = [...tickerItems, ...tickerItems]

    return (
        <>
            {/* ── SCOPED STYLES ── */}
            <style>{`
                /* ── HERO ── */
                .cis-hero {
                    padding: 5.5rem 0 3.5rem;
                    position: relative;
                    text-align: center;
                    overflow: hidden;
                }
                .cis-hero-bg {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 70% 55% at 50% -10%, rgba(229,57,53,0.12) 0%, transparent 65%);
                    pointer-events: none;
                }
                .cis-hero-dots {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(229,57,53,0.13) 1px, transparent 1px);
                    background-size: 36px 36px;
                    pointer-events: none;
                    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
                    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
                }

                /* ── EYEBROW ── */
                .cis-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 5px 14px;
                    border-radius: 9999px;
                    border: 1px solid rgba(229,57,53,0.3);
                    background: rgba(229,57,53,0.07);
                    margin-bottom: 1.75rem;
                }
                .cis-eyebrow-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #E53935;
                    animation: cisPulse 2s infinite;
                    flex-shrink: 0;
                }
                .cis-eyebrow-text {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.13em;
                    text-transform: uppercase;
                    color: #E53935;
                }
                @keyframes cisPulse {
                    0%,100% { opacity:1 }
                    50%      { opacity:0.35 }
                }

                /* ── HERO TITLE ── */
                .cis-title {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: clamp(2.6rem, 6vw, 4.8rem);
                    font-weight: 900;
                    line-height: 0.95;
                    letter-spacing: -0.03em;
                    color: #ffffff;
                    margin-bottom: 1.5rem;
                }
                .cis-title-red {
                    display: block;
                    color: #E53935;
                    font-style: italic;
                }
                .cis-title-outline {
                    display: block;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.18);
                    color: transparent;
                    font-size: 0.7em;
                    margin-top: 0.15em;
                }
                .cis-hero-desc {
                    max-width: 480px;
                    margin: 0 auto 2.5rem;
                    font-size: 15px;
                    line-height: 1.78;
                    color: rgba(255,255,255,0.62);
                    font-weight: 300;
                }

                /* ── HERO META ── */
                .cis-meta {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .cis-meta-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    padding: 1.25rem 2rem;
                    border-left: 1px solid rgba(255,255,255,0.07);
                }
                .cis-meta-item:first-child { border-left: none; }
                .cis-meta-num {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 2rem;
                    font-weight: 800;
                    line-height: 1;
                    color: #ffffff;
                }
                .cis-meta-accent { color: #E53935; }
                .cis-meta-label {
                    font-size: 10px;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.38);
                }

                /* ── TICKER ── */
                .cis-ticker-wrap {
                    overflow: hidden;
                    border-top: 1px solid rgba(255,255,255,0.07);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    padding: 9px 0;
                    margin-bottom: 0;
                }
                .cis-ticker-track {
                    display: flex;
                    gap: 2.5rem;
                    width: max-content;
                    animation: cisTicker 22s linear infinite;
                }
                .cis-ticker-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.38);
                    white-space: nowrap;
                }
                .cis-ticker-dash {
                    width: 16px;
                    height: 1px;
                    background: #E53935;
                    flex-shrink: 0;
                }
                @keyframes cisTicker {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }

                /* ── SECTION HEADER ── */
                .cis-sec-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    padding: 2.75rem 0 1.75rem;
                }
                .cis-sec-num {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #E53935;
                    margin-bottom: 5px;
                }
                .cis-sec-title {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #ffffff;
                    letter-spacing: -0.01em;
                }
                .cis-sec-count {
                    font-size: 11px;
                    color: rgba(255,255,255,0.38);
                    letter-spacing: 0.08em;
                }

                /* ── CLIENT GRID ── */
                .cis-client-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1px;
                    background: rgba(255,255,255,0.07);
                }

                .client-cell {
                    background: var(--background, #121212);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1.75rem 0.75rem;
                    aspect-ratio: 1.1;
                    text-decoration: none;
                    color: inherit;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .client-cell:hover { background: #1f1f1f; }

                .cell-underline {
                    position: absolute;
                    bottom: 0; left: 0;
                    width: 0; height: 2px;
                    background: #E53935;
                    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
                }
                .client-cell:hover .cell-underline { width: 100%; }

                .cell-index {
                    position: absolute;
                    top: 10px; left: 12px;
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 9px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.3);
                    letter-spacing: 0.08em;
                    transition: color 0.3s;
                }
                .client-cell:hover .cell-index { color: #E53935; }

                .logo-ring {
                    width: 60px;
                    height: 60px;
                    border-radius: 10px;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 12px;
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s;
                    flex-shrink: 0;
                    box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
                }
                .client-cell:hover .logo-ring {
                    transform: scale(1.1) translateY(-2px);
                    box-shadow: 0 10px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(229,57,53,0.2);
                }
                .logo-initials {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-weight: 800;
                    font-size: 1rem;
                    color: #333;
                }

                .cell-name {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 11px;
                    font-weight: 700;
                    text-align: center;
                    color: #ffffff;
                    margin-bottom: 4px;
                    line-height: 1.25;
                    padding: 0 6px;
                    transition: color 0.3s;
                }
                .cell-industry {
                    font-family: 'Roboto', var(--font-sans, sans-serif);
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    text-align: center;
                    transition: color 0.3s;
                }
                .client-cell:hover .cell-industry { color: #E53935; }

                .cell-arrow {
                    position: absolute;
                    bottom: 10px; right: 12px;
                    font-size: 11px;
                    color: #E53935;
                    opacity: 0;
                    transform: translate(-3px, 3px);
                    transition: all 0.3s;
                }
                .client-cell:hover .cell-arrow {
                    opacity: 1;
                    transform: translate(0, 0);
                }

                /* ── STATS GRID ── */
                .cis-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.07);
                }
                .stat-cell {
                    background: var(--background, #121212);
                    padding: clamp(1.25rem, 4vw, 2.25rem) clamp(1rem, 3vw, 1.5rem);
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    position: relative;
                    overflow: hidden;
                    transition: background 0.3s;
                    cursor: default;
                }
                .stat-cell::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 2px; height: 0;
                    background: #E53935;
                    transition: height 0.5s cubic-bezier(0.4,0,0.2,1);
                }
                .stat-cell:hover { background: var(--card, #1a1a1a); }
                .stat-cell:hover::before { height: 100%; }

                .stat-num {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 900;
                    line-height: 1;
                    color: #E53935;
                    letter-spacing: -0.03em;
                }
                .stat-label {
                    font-family: 'Roboto', var(--font-sans, sans-serif);
                    font-size: 10px;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.38);
                    line-height: 1.6;
                }
                .stat-ghost {
                    position: absolute;
                    bottom: 8px; right: 12px;
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: clamp(20px, 4vw, 28px);
                    font-weight: 900;
                    color: rgba(255,255,255,0.03);
                    pointer-events: none;
                    letter-spacing: -0.05em;
                    user-select: none;
                }

                /* ── MANIFESTO ── */
                .cis-manifesto {
                    border-top: 1px solid rgba(255,255,255,0.07);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    padding: 2.75rem 0;
                    margin: 3.5rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                .cis-manifesto-quote {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: clamp(1.2rem, 2.5vw, 1.7rem);
                    font-weight: 700;
                    line-height: 1.35;
                    color: #ffffff;
                    font-style: italic;
                    flex: 1;
                    min-width: 220px;
                }
                .cis-manifesto-accent {
                    font-style: normal;
                    color: #E53935;
                }
                .cis-manifesto-aside {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    text-align: right;
                    min-width: 100px;
                }
                .cis-aside-label {
                    font-family: 'Roboto', var(--font-sans, sans-serif);
                    font-size: 10px;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.38);
                }
                .cis-aside-val {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 13px;
                    font-weight: 700;
                    color: #ffffff;
                }

                /* ── CTA ── */
                .cis-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0 5rem;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }
                .cis-cta-title {
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-size: 1.6rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    line-height: 1.15;
                    color: #ffffff;
                }
                .cis-cta-sub {
                    margin-top: 6px;
                    font-size: 12px;
                    color: rgba(255,255,255,0.38);
                    letter-spacing: 0.06em;
                }
                .cis-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    background: #E53935;
                    color: #ffffff;
                    font-family: 'Montserrat', var(--font-heading, sans-serif);
                    font-weight: 700;
                    font-size: 11px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    padding: 13px 26px;
                    border-radius: 2px;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.25s, box-shadow 0.25s;
                    text-decoration: none;
                    position: relative;
                    overflow: hidden;
                }
                .cis-cta-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(255,255,255,0.08);
                    transform: translateX(-100%);
                    transition: transform 0.3s;
                }
                .cis-cta-btn:hover::before { transform: translateX(0); }
                .cis-cta-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 14px 36px rgba(229,57,53,0.28);
                }

                /* ── HERO ENTRANCE ── */
                @keyframes cisUp {
                    from { opacity:0; transform:translateY(24px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .cis-anim-1 { animation: cisUp 0.7s ease 0.1s both; }
                .cis-anim-2 { animation: cisUp 0.7s ease 0.2s both; }
                .cis-anim-3 { animation: cisUp 0.7s ease 0.3s both; }
                .cis-anim-4 { animation: cisUp 0.7s ease 0.4s both; }

                /* ── RESPONSIVE BREAKPOINTS ── */
                /* Tablet y Laptops pequeñas */
                @media (max-width: 1024px) {
                    .cis-client-grid { grid-template-columns: repeat(3, 1fr); }
                    .cis-stats-grid { grid-template-columns: repeat(2, 1fr); }
                }

                /* Mobile Landscape a Tablet vertical */
                @media (max-width: 768px) {
                    .cis-title { font-size: clamp(2.2rem, 8vw, 3.5rem); }
                    .cis-client-grid { grid-template-columns: repeat(2, 1fr); }
                    .cis-hero-desc { padding: 0 1rem; }
                }

                /* Mobile Portrait */
                @media (max-width: 480px) {
                    .stat-label { font-size: 9px; letter-spacing: 0.1em; }
                }
            `}</style>
            <TechBackground />
            <Header />

            <main className="pt-20" style={{ background: "var(--background, #121212)", minHeight: "100vh" }}>

                {/* ── HERO ── */}
                <section className="cis-hero">
                    <div className="cis-hero-bg" />
                    <div className="cis-hero-dots" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">

                        {/* Eyebrow */}
                        <div className="cis-eyebrow cis-anim-1">
                            <span className="cis-eyebrow-dot" />
                            <span className="cis-eyebrow-text">Clientes &amp; Partners — 2026</span>
                        </div>

                        {/* Title */}
                        <h1 className="cis-title cis-anim-2">
                            Confianza
                            <span className="cis-title-red">que Construimos</span>
                            <span className="cis-title-outline">Juntos</span>
                        </h1>

                        {/* Description */}
                        <p className="cis-hero-desc cis-anim-3">
                            8 empresas líderes en Argentina confían en nosotros. Impactamos
                            a más de 800 usuarios con soluciones tecnológicas de primera calidad
                            y servicio excepcional.
                        </p>

                        {/* Meta strip */}
                        <div className="cis-meta cis-anim-4">
                            {[
                                { value: 800, suffix: "+", label: "Usuarios" },
                                { value: 8, suffix: "", label: "Clientes" },
                                { value: 98, suffix: "%", label: "Satisfacción" },
                                { value: 15, suffix: "+", label: "Años" },
                            ].map((m, i) => (
                                <div key={i} className="cis-meta-item">
                                    <span className="cis-meta-num">
                                        <AnimatedCounter value={m.value} suffix={m.suffix} />
                                    </span>
                                    <span className="cis-meta-label">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TICKER ── */}
                <Reveal>
                    <div className="cis-ticker-wrap">
                        <div className="cis-ticker-track">
                            {doubled.map((item, i) => (
                                <div key={i} className="cis-ticker-item">
                                    <span className="cis-ticker-dash" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* ── CLIENTS ── */}
                <Reveal delay={80}>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="cis-sec-header">
                            <div>
                                <div className="cis-sec-num">— 01 / Ecosistema</div>
                                <div className="cis-sec-title">Nuestros Clientes</div>
                            </div>
                            <span className="cis-sec-count">8 empresas · 5 industrias</span>
                        </div>

                        <div className="cis-client-grid">
                            {clients.map((c, i) => (
                                <ClientCell key={i} client={c} index={i} />
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* ── STATS ── */}
                <Reveal delay={80}>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8" style={{ marginTop: "3.5rem" }}>
                        <div className="cis-stats-grid">
                            {stats.map((s, i) => (
                                <StatCell key={i} stat={s} index={i} />
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* ── MANIFESTO ── */}
                <Reveal delay={60}>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="cis-manifesto">
                            <p className="cis-manifesto-quote">
                                No construimos software.<br />
                                Construimos{" "}
                                <span className="cis-manifesto-accent">confianza</span>{" "}
                                a través<br />
                                de la tecnología.
                            </p>
                            <div className="cis-manifesto-aside">
                                <span className="cis-aside-label">Desde</span>
                                <span className="cis-aside-val">2009</span>
                                <span className="cis-aside-label" style={{ marginTop: "8px" }}>Sede</span>
                                <span className="cis-aside-val">Buenos Aires</span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* ── CTA ── */}
                <Reveal delay={60}>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="cis-cta">
                            <div>
                                <div className="cis-cta-title">
                                    ¿Listo para ser<br />el próximo?
                                </div>
                                <div className="cis-cta-sub">Hablemos de tu proyecto →</div>
                            </div>
                            <a href="/#contacto" className="cis-cta-btn">
                                Iniciar conversación <span>↗</span>
                            </a>
                        </div>
                    </div>
                </Reveal>

            </main>

            <Footer />
            <WhatsAppButton />
        </>
    )
}
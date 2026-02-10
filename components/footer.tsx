"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, CheckCircle, ArrowRight, ExternalLink } from "lucide-react"

const supportMessages: Record<string, string> = {
  "1": `Hola, me interesa el Soporte Nivel 1.

Necesito asistencia con:
- [ ] Problemas de contraseñas
- [ ] Configuración de correo
- [ ] Instalación de software
- [ ] Soporte de impresoras

Por favor contáctenme para más información.`,
  "2": `Hola, me interesa el Soporte Nivel 2.

Necesito asistencia técnica avanzada con:
- [ ] Configuración de servidores
- [ ] Problemas de red
- [ ] Recuperación de datos
- [ ] Optimización de sistemas

Por favor contáctenme para coordinar una evaluación.`,
  "3": `Hola, me interesa el Soporte Nivel 3.

Requiero asistencia especializada con:
- [ ] Arquitectura de red
- [ ] Seguridad informática
- [ ] Migración de sistemas
- [ ] Consultoría IT

Por favor contáctenme para agendar una reunión.`,
}

const navigation = {
  servicios: [
    { name: "Seguridad Electrónica", href: "/servicios#seguridad" },
    { name: "Tecnologías de Información", href: "/servicios#ti" },
    { name: "IoT del Hogar", href: "/servicios#iot" },
  ],
  empresa: [
    { name: "Quiénes Somos", href: "/#about" },
    { name: "Clientes y Partners", href: "/clientes" },
  ],
}

function MapEmbed({
  query,
  className = "",
}: {
  query: string
  className?: string
}) {
  const [mapUrl, setMapUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/maps?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setMapUrl(data.url))
      .catch(() => {
        setMapUrl(`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`)
      })
  }, [query])

  const fallbackUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`

  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}>
      <div className="relative w-full aspect-[4/3] bg-secondary">
        {!mapUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <iframe
          title="Mapa - Ubicación"
          src={mapUrl || fallbackUrl}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors border-t border-border"
      >
        <ExternalLink className="h-4 w-4" />
        Abrir en Google Maps
      </a>
    </div>
  )
}

export function Footer() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Pre-fill message based on support level from URL
  useEffect(() => {
    const nivel = searchParams.get("nivel")
    if (nivel && supportMessages[nivel]) {
      setFormData((prev) => ({ ...prev, message: supportMessages[nivel] }))
    }
  }, [searchParams])

  // Listen for custom event from SupportLevels component
  useEffect(() => {
    const handleSupportLevel = (e: CustomEvent<{ nivel: string }>) => {
      const nivel = e.detail.nivel
      if (nivel && supportMessages[nivel]) {
        setFormData((prev) => ({ ...prev, message: supportMessages[nivel] }))
      }
    }
    
    window.addEventListener("supportLevelSelected", handleSupportLevel as EventListener)
    return () => window.removeEventListener("supportLevelSelected", handleSupportLevel as EventListener)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.details?.message || data?.error || "Error al enviar.")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al enviar el mensaje.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addressLabel = "Uruguay 651, oficina 12B, CABA"
  const mapQuery = `${addressLabel}, Buenos Aires, Argentina`

  return (
    <footer id="contacto" className="bg-background border-t border-border">
      {/* Header Section with accent */}
      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                ¿Listo para <span className="text-primary">comenzar</span>?
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl text-balance">
                Contáctanos hoy y descubrí cómo podemos ayudarte a transformar tu negocio con soluciones tecnológicas de vanguardia.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-primary rounded-full" />
              <div className="h-1 w-8 bg-primary/50 rounded-full" />
              <div className="h-1 w-4 bg-primary/25 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Form - Takes 5 columns */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-1">
                Envianos un mensaje
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Completá el formulario y te responderemos a la brevedad.
              </p>

              {submitted ? (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">¡Mensaje enviado!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Nombre completo</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Correo electrónico</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">Tu mensaje</label>
                    <Textarea
                      id="message"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 font-medium" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar Mensaje
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Map Section - Takes 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold mb-4">
              Nuestra ubicación
            </h3>
            <MapEmbed query={mapQuery} />
            <div className="mt-4 flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Sede Principal</p>
                <p className="text-sm text-muted-foreground">{addressLabel}</p>
              </div>
            </div>
          </div>

          {/* Contact Info & Navigation - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Contacto directo
              </h3>
              <div className="space-y-4">
                <a 
                  href="tel:+541164732805" 
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Teléfono</p>
                    <p className="text-sm font-medium">+54 11 6473-2805</p>
                  </div>
                </a>

                <a 
                  href="mailto:contacto@chappe.com.ar" 
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">contacto@chappe.com.ar</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Servicios
                </h4>
                <ul className="space-y-2">
                  {navigation.servicios.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Empresa
                </h4>
                <ul className="space-y-2">
                  {navigation.empresa.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">
                Chappe<span className="text-primary">.It.</span>Solutions
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Chappe It Solutions. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

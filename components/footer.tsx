"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, ArrowRight, ExternalLink } from "lucide-react"

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

function MapEmbed({ query, className = "" }: { query: string; className?: string }) {
  const [mapUrl, setMapUrl] = useState<string | null>(null)
  const fallbackUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`

  useEffect(() => {
    let cancelled = false

    fetch(`/api/maps?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setMapUrl(data?.url || fallbackUrl)
      })
      .catch(() => {
        if (!cancelled) setMapUrl(fallbackUrl)
      })

    return () => {
      cancelled = true
    }
  }, [query])

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Pre-fill message based on support level from URL
  useEffect(() => {
    const nivel = searchParams.get("nivel")
    if (nivel && supportMessages[nivel]) {
      setFormData((prev) => ({ ...prev, message: supportMessages[nivel] }))
    }
  }, [searchParams])

  // Listen for custom event from SupportLevels component
  useEffect(() => {
    const handleSupportLevel = (e: Event) => {
      const ce = e as CustomEvent<{ nivel: string }>
      const nivel = ce?.detail?.nivel
      if (nivel && supportMessages[nivel]) {
        setFormData((prev) => ({ ...prev, message: supportMessages[nivel] }))
      }
    }

    window.addEventListener("supportLevelSelected", handleSupportLevel)
    return () => window.removeEventListener("supportLevelSelected", handleSupportLevel)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: "", // honeypot
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "No se pudo enviar el mensaje.")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      window.setTimeout(() => setSubmitted(false), 5000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado."
      setErrorMsg(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addressLabel = "Uruguay 651, oficina 12B, CABA"
  const mapQuery = `${addressLabel}, Buenos Aires, Argentina`

  return (
    <footer id="contacto" className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* 3 columnas en desktop: Form / Mapa / Info */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12">
          {/* Contact Form */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-heading)]">Contáctanos</h3>
            <p className="text-muted-foreground mb-6">
              Completa el formulario y nos pondremos en contacto contigo a la brevedad.
            </p>

            {submitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                <p className="text-primary font-medium">¡Mensaje enviado correctamente!</p>
                <p className="text-sm text-muted-foreground mt-1">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="sr-only">
                    Nombre completo
                  </label>
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
                  <label htmlFor="email" className="sr-only">
                    Correo electrónico
                  </label>
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
                  <label htmlFor="message" className="sr-only">
                    Tu mensaje
                  </label>
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

                <Button type="submit" className="w-full h-11 font-medium" disabled={isSubmitting}>
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

          {/* Map */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold mb-4">Nuestra ubicación</h3>
            <MapEmbed query={mapQuery} />
            <div className="mt-4 flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Sede Principal</p>
                <p className="text-sm text-muted-foreground">{addressLabel}</p>
              </div>
            </div>
          </div>

          {/* Contact Info + Nav */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contacto directo</h3>

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
                    <div className="text-sm text-muted-foreground leading-5">
                      <div>contacto@chappe.com.ar</div>
                      <div>soporte@chappe.com.ar</div>
                      <div>info@chappe.com.ar</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Servicios</h4>
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
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empresa</h4>
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

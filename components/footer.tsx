"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, Send, MapPin, Phone, Mail } from "lucide-react"

const navigation = {
  servicios: [
    { name: "Seguridad Electronica", href: "/servicios#seguridad" },
    { name: "Infraestructura IT", href: "/servicios#ti" },
    { name: "IoT & Domotica", href: "/servicios#iot" },
    { name: "Desarrollo Web", href: "/servicios#web" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "/#about" },
    { name: "Clientes", href: "/clientes" },
    { name: "Contacto", href: "#contacto" },
  ],
}

export function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
          company: "",
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "No se pudo enviar el mensaje.")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado."
      setErrorMsg(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer id="contacto" className="relative bg-card border-t border-border">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Top section - Large CTA */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">03</span>
            <span className="h-px w-16 bg-border" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Contacto</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1] mb-8">
                Hablemos de tu
                <span className="block text-muted-foreground">proximo proyecto</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Estamos listos para transformar tu infraestructura tecnologica. Solicita una evaluacion sin compromiso.
              </p>
            </div>
            
            {/* Contact form */}
            <div>
              {submitted ? (
                <div className="h-full flex items-center justify-center p-12 border border-foreground/20 bg-foreground/5">
                  <div className="text-center">
                    <p className="text-xl text-foreground font-light mb-2">Mensaje enviado</p>
                    <p className="text-sm text-muted-foreground">Nos pondremos en contacto contigo pronto.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 border border-destructive/30 bg-destructive/10 text-sm text-destructive">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="sr-only">Nombre</label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12 bg-background border-border rounded-none focus:border-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12 bg-background border-border rounded-none focus:border-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="sr-only">Mensaje</label>
                    <Textarea
                      id="message"
                      placeholder="Cuentanos sobre tu proyecto..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="bg-background border-border rounded-none focus:border-foreground resize-none placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar mensaje
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle section - Info grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-t border-b border-border/50">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Informacion de contacto
            </h3>
            
            <div className="space-y-4">
              <a 
                href="https://maps.google.com/?q=Uruguay+651,+oficina+12B,+CABA,+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-foreground group-hover:text-muted-foreground transition-colors">
                    Uruguay 651, oficina 12B
                  </p>
                  <p className="text-sm text-muted-foreground">Buenos Aires, Argentina</p>
                </div>
              </a>
              
              <a 
                href="tel:+541164732805"
                className="flex items-center gap-4 group"
              >
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground group-hover:text-muted-foreground transition-colors">
                  +54 11 6473-2805
                </span>
              </a>
              
              <a 
                href="mailto:contacto@chappe.com.ar"
                className="flex items-center gap-4 group"
              >
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground group-hover:text-muted-foreground transition-colors">
                  contacto@chappe.com.ar
                </span>
              </a>
            </div>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Servicios
            </h3>
            <ul className="space-y-3">
              {navigation.servicios.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Empresa
            </h3>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative h-6 w-6 flex items-center justify-center">
              <div className="absolute inset-0 border border-foreground/20 rounded-sm" />
              <span className="relative text-foreground font-medium text-xs">C</span>
            </div>
            <span className="text-sm text-foreground">
              Chappe<span className="text-muted-foreground">.IT</span>.Solutions
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Chappe IT Solutions. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

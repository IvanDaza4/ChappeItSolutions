"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send } from "lucide-react"

const navigation = {
  servicios: [
    { name: "Seguridad Electrónica", href: "/servicios#seguridad" },
    { name: "Tecnologías de Información", href: "/servicios#ti" },
    { name: "Iot del Hogar", href: "/servicios#iot" },
  ],
  empresa: [
    { name: "Quiénes Somos", href: "/#about" },
    { name: "Clientes y Partners", href: "/clientes" },
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
          company: "", // honeypot (vacío a propósito)
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "No se pudo enviar el mensaje.")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: any) {
      setErrorMsg(err?.message || "Error inesperado.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer id="contacto" className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-heading)]">
              Contáctanos
            </h3>
            <p className="text-muted-foreground mb-6">
              Completa el formulario y nos pondremos en contacto contigo a la brevedad.
            </p>

            {submitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                <p className="text-primary font-medium">¡Mensaje enviado correctamente!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tu mensaje"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="bg-background resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info & Navigation */}
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                Información de Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Sede Principal</p>
                    <p className="text-sm text-muted-foreground">
                      Uruguay 651, oficina 12B, CABA
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">
                      +54 11 6473-2805
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      contacto@chappe.com.ar
                      Soporte@chappe.com.ar
                      Info@chappe.com.ar
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Navigation links */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                  Servicios
                </h4>
                <ul className="space-y-2">
                  {navigation.servicios.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                  Empresa
                </h4>
                <ul className="space-y-2">
                  {navigation.empresa.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              Chappe<span className="text-primary">.It<span className="text-primary"></span>.</span>Solutions
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chappe It Solutions. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

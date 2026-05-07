"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Clientes", href: "/clientes" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link 
            href="/" 
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            {/* Minimal geometric logo */}
            <div className="relative h-8 w-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-foreground/20 rounded-sm transition-all duration-300 group-hover:border-foreground/40 group-hover:rotate-45" />
              <span className="relative text-foreground font-medium text-sm tracking-tight">C</span>
            </div>
            <span className="text-foreground font-medium tracking-tight">
              Chappe<span className="text-muted-foreground">.IT</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative p-2 text-foreground transition-colors hover:text-muted-foreground"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10">{item.name}</span>
              {/* Underline indicator */}
              <span
                className={`absolute bottom-1 left-4 right-4 h-px bg-foreground transition-transform duration-300 origin-left ${
                  hoveredItem === item.name ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button 
            asChild 
            variant="outline"
            className="group border-border/50 bg-transparent hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
          >
            <Link href="#contacto" className="flex items-center gap-2">
              <span className="text-sm">Contactar</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            type="button"
            className="p-2 text-foreground transition-colors hover:text-muted-foreground"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu content */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-3xl font-light text-foreground tracking-tight transition-all duration-500 hover:text-muted-foreground ${
                mobileMenuOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: mobileMenuOpen ? `${index * 100 + 100}ms` : '0ms' 
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          <div 
            className={`mt-8 transition-all duration-500 ${
              mobileMenuOpen 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: mobileMenuOpen ? '400ms' : '0ms' 
            }}
          >
            <Button 
              asChild 
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                Contactar
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-muted-foreground tracking-widest uppercase">
          <span>Buenos Aires</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>Argentina</span>
        </div>
      </div>
    </header>
  )
}

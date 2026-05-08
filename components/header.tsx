"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Clientes", href: "/clientes" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-lg shadow-black/5'
        : 'bg-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="group -m-1.5 p-1.5 flex items-center gap-2">
            {/* Animated logo icon */}
            <div className="relative h-10 w-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
              <div className="absolute inset-1 bg-primary rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
              <span className="relative text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              Chappe<span className="text-primary">.It<span className="text-primary"></span>.</span>Solutions
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative -m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-foreground group"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors" />
            <Menu className="h-6 w-6 relative" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              onMouseEnter={() => setActiveItem(item.name)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <span className="relative z-10">{item.name}</span>
              {/* Hover background */}
              <span
                className={`absolute inset-0 rounded-lg bg-primary/10 transition-all duration-300 ${activeItem === item.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
              />
              {/* Active indicator */}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${activeItem === item.name ? 'w-1/2' : 'w-0'
                  }`}
              />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild className="group relative overflow-hidden">
            <Link href="#contacto">
              <span className="relative z-10">Contactar</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border animate-slide-in-right">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative flex items-center justify-between">
              <Link href="/" className="group -m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative h-10 w-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg rotate-45" />
                  <div className="absolute inset-1 bg-primary rounded-lg rotate-45" />
                  <span className="relative text-primary-foreground font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
                  Tech<span className="text-primary">.</span>Solutions
                </span>
              </Link>
              <button
                type="button"
                className="relative -m-2.5 rounded-lg p-2.5 text-foreground group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                <X className="h-6 w-6 relative group-hover:rotate-90 transition-transform" aria-hidden="true" />
              </button>
            </div>
            <div className="relative mt-6 flow-root">
              <div className="-my-6 divide-y divide-border/50">
                <div className="space-y-1 py-6">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group -mx-3 flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Button asChild className="w-full group relative overflow-hidden border-primary/20 bg-background hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                    <Link href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                      {/* Texto con espaciado tecnológico */}
                      <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> {/* Punto de status */}
                        Contactar Ahora
                      </span>

                      {/* Efecto de barrido (Scanline) al hacer hover */}
                      <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      </span>

                      {/* Fondo degradado principal */}
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-red-600/80 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                      {/* Bordes decorativos tipo "Cyber" */}
                      <span className="absolute top-0 left-0 w-2 h-[1px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute bottom-0 right-0 w-2 h-[1px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
    
      `}</style>
    </header>
  )
}

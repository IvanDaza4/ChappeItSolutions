"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const phoneNumber = "5491164732805" // Replace with actual number
  const message = "Hola, estoy interesado en conocer más sobre sus soluciones y servicios de IT. ¿Podrían brindarme información y asesoramiento según mis necesidades? Muchas gracias."
  const whatsappUrl = `https://wa.me/${+5491164732805}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    // Show button after a delay
    const buttonTimer = setTimeout(() => setIsVisible(true), 1500)
    // Show tooltip after button appears
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000)
    
    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex items-end gap-3 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl max-w-[220px] animate-in fade-in slide-in-from-right-4 duration-500">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-secondary/90 backdrop-blur-sm flex items-center justify-center hover:bg-secondary transition-colors group border border-border"
            aria-label="Cerrar"
          >
            <X className="h-3 w-3 group-hover:rotate-90 transition-transform" />
          </button>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">¡Hola!</p>
              <p className="text-xs text-muted-foreground">
                ¿En qué podemos ayudarte? Estamos en línea.
              </p>
            </div>
          </div>
          
          {/* Typing indicator */}
          <div className="mt-3 flex items-center gap-1 px-3 py-2 bg-secondary/50 rounded-lg w-fit">
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
      
      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5C] transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        
        {/* Rotating border */}
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-spin" style={{ animationDuration: '10s' }} />
        
        <MessageCircle className="relative h-8 w-8 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  )
}

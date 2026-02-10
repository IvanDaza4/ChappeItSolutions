"use client"

import { useState, useEffect, useCallback } from "react"
import { X } from "lucide-react"

const TOOLTIP_DISMISSED_KEY = "whatsapp-tooltip-dismissed"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.28l6.156-1.962a15.906 15.906 0 0 0 8.794 2.644C24.826 31.962 32 24.786 32 16.004 32 7.176 24.826 0 16.004 0zm9.53 22.61c-.396 1.116-2.324 2.136-3.244 2.268-.82.118-1.858.168-2.998-.188a27.413 27.413 0 0 1-2.714-1.004c-4.778-2.066-7.898-6.9-8.138-7.222-.24-.322-1.962-2.61-1.962-4.978 0-2.368 1.242-3.536 1.682-4.018.44-.482.962-.602 1.282-.602.32 0 .64.002.92.016.294.014.69-.112 1.08.824.396.952 1.348 3.29 1.468 3.53.12.24.2.522.04.844-.16.322-.24.522-.48.804-.24.282-.504.63-.72.844-.24.24-.49.5-.21.98.28.482 1.244 2.054 2.67 3.328 1.838 1.64 3.388 2.148 3.868 2.388.482.24.762.2 1.042-.12.28-.322 1.2-1.398 1.52-1.88.32-.482.64-.4 1.08-.24.44.16 2.794 1.318 3.274 1.558.48.24.8.36.92.558.118.2.118 1.138-.278 2.254z" />
    </svg>
  )
}

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)

  const phoneNumber = "5491164732805"
  const message =
    "Hola, estoy interesado en conocer más sobre sus soluciones y servicios de IT. ¿Podrían brindarme información y asesoramiento según mis necesidades? Muchas gracias."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    // Check if tooltip was previously dismissed
    const wasDismissed = localStorage.getItem(TOOLTIP_DISMISSED_KEY) === "true"
    setTooltipDismissed(wasDismissed)

    // Show button after a delay
    const buttonTimer = setTimeout(() => setIsVisible(true), 1000)

    // Show tooltip only if not previously dismissed
    let tooltipTimer: ReturnType<typeof setTimeout> | undefined
    if (!wasDismissed) {
      tooltipTimer = setTimeout(() => setShowTooltip(true), 2500)
    }

    return () => {
      clearTimeout(buttonTimer)
      if (tooltipTimer) clearTimeout(tooltipTimer)
    }
  }, [])

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false)
    setTooltipDismissed(true)
    localStorage.setItem(TOOLTIP_DISMISSED_KEY, "true")
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-end gap-3 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* Tooltip / Chat bubble */}
      {showTooltip && !tooltipDismissed && (
        <div className="relative max-w-[260px] animate-in fade-in slide-in-from-bottom-3 duration-400">
          {/* Chat bubble card */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04]">
            {/* Header bar */}
            <div className="flex items-center gap-2.5 bg-[#075E54] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">
                  Soporte
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
                  </span>
                  <span className="text-xs text-white/80">En linea</span>
                </div>
              </div>
              <button
                onClick={dismissTooltip}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message area */}
            <div className="bg-[#ECE5DD] px-4 py-4">
              <div className="relative max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow-sm">
                <p className="text-[13px] leading-relaxed text-[#303030]">
                  <span className="font-semibold text-[#075E54]">
                    {"Hola! "}
                  </span>
                  {"En que podemos ayudarte?"}
                </p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-[#667781]">
                    {new Date().getHours().toString().padStart(2, "0")}:
                    {new Date().getMinutes().toString().padStart(2, "0")}
                  </span>
                  {/* Double check marks */}
                  <svg
                    viewBox="0 0 16 11"
                    className="h-3 w-4 text-[#53BDEB]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11.07.66 5.71 6.04 3.37 3.7a.75.75 0 0 0-1.06 1.06l2.88 2.88a.75.75 0 0 0 1.06 0L11.6 1.72a.75.75 0 0 0-1.06-1.06h.53ZM15.07.66 9.71 6.04 8.87 5.2a.75.75 0 0 0-1.06 1.06l1.38 1.38a.75.75 0 0 0 1.06 0l5.88-5.92a.75.75 0 0 0-1.06-1.06Z" />
                  </svg>
                </div>
                {/* Bubble tail */}
                <div className="absolute -left-2 top-0 h-3 w-3 overflow-hidden">
                  <div className="h-4 w-4 origin-bottom-right rotate-45 bg-white" />
                </div>
              </div>
            </div>

            {/* Quick reply CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-t border-[#D1D7DB] bg-white px-4 py-3 text-[#075E54] transition-colors hover:bg-[#F0F2F5]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-sm font-medium">Iniciar conversacion</span>
            </a>
          </div>
        </div>
      )}

      {/* WhatsApp FAB */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)] active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        {/* Subtle pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 animate-[wa-ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />

        <WhatsAppIcon className="relative h-[30px] w-[30px] transition-transform duration-300 group-hover:scale-110" />
      </a>
    </div>
  )
}

"use client"

import { useEffect, useState, useRef, type RefObject } from "react"

interface UseRevealOptions {
    threshold?: number
    rootMargin?: string
    delay?: number
    once?: boolean
}

export function useReveal<T extends HTMLElement = HTMLElement>(
    options: UseRevealOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, rootMargin = "0px", delay = 0, once = true } = options
    const ref = useRef<T | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            setIsVisible(true)
            return
        }

        const element = ref.current
        if (!element) return

        let timeoutId: ReturnType<typeof setTimeout> | null = null

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting) {
                    if (delay > 0) {
                        timeoutId = setTimeout(() => setIsVisible(true), delay)
                    } else {
                        setIsVisible(true)
                    }
                    if (once) {
                        observer.unobserve(element)
                    }
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            observer.disconnect()
        }
    }, [threshold, rootMargin, delay, once])

    return [ref, isVisible]
}

// Hook for scroll spy functionality
export function useScrollSpy(sectionIds: string[], offset = 100): string | null {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i])
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveId(sectionIds[i])
                    return
                }
            }
            setActiveId(null)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [sectionIds, offset])

    return activeId
}

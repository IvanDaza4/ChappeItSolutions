"use client"

import { type SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number
    accentColor?: string
}

// ─── CATEGORY ICONS (large, used in section headers) ───

export function SecurityIcon({ size = 40, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Shield body */}
            <path
                d="M32 6L10 18v14c0 14.4 9.4 27.8 22 31 12.6-3.2 22-16.6 22-31V18L32 6z"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="animate-[draw_1.5s_ease-out_forwards]"
            />
            {/* Inner shield line */}
            <path
                d="M32 12L16 21v10c0 11.2 6.8 21.6 16 24 9.2-2.4 16-12.8 16-24V21L32 12z"
                stroke={accentColor}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.3"
            />
            {/* Lock body */}
            <rect x="25" y="30" width="14" height="12" rx="2" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Lock shackle */}
            <path d="M28 30v-5a4 4 0 018 0v5" stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Lock keyhole */}
            <circle cx="32" cy="36" r="2" fill={accentColor} />
            <line x1="32" y1="37" x2="32" y2="40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            {/* Pulse rings */}
            <circle cx="32" cy="32" r="26" stroke={accentColor} strokeWidth="0.5" opacity="0.15" strokeDasharray="4 6" className="animate-spin [animation-duration:20s]" />
        </svg>
    )
}

export function ITIcon({ size = 40, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Server rack outline */}
            <rect x="12" y="8" width="40" height="48" rx="4" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Server unit 1 */}
            <rect x="16" y="13" width="32" height="10" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="18" r="2" fill={accentColor} className="animate-pulse" />
            <line x1="28" y1="18" x2="44" y2="18" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            {/* Server unit 2 */}
            <rect x="16" y="27" width="32" height="10" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="32" r="2" fill={accentColor} opacity="0.6" className="animate-pulse [animation-delay:0.5s]" />
            <line x1="28" y1="32" x2="44" y2="32" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            {/* Server unit 3 */}
            <rect x="16" y="41" width="32" height="10" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="46" r="2" fill={accentColor} opacity="0.3" className="animate-pulse [animation-delay:1s]" />
            <line x1="28" y1="46" x2="44" y2="46" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            {/* Connection dots on side */}
            <circle cx="8" cy="20" r="1.5" fill={accentColor} opacity="0.4" />
            <circle cx="8" cy="32" r="1.5" fill={accentColor} opacity="0.4" />
            <circle cx="8" cy="44" r="1.5" fill={accentColor} opacity="0.4" />
            <line x1="8" y1="20" x2="12" y2="20" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            <line x1="8" y1="32" x2="12" y2="32" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            <line x1="8" y1="44" x2="12" y2="44" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
        </svg>
    )
}

export function IoTIcon({ size = 40, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* House outline */}
            <path d="M32 8L8 28h6v24h36V28h6L32 8z" stroke={accentColor} strokeWidth="2" strokeLinejoin="round" fill="none" />
            {/* Door */}
            <rect x="27" y="38" width="10" height="14" rx="1" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="35" cy="46" r="1" fill={accentColor} />
            {/* Window left */}
            <rect x="17" y="32" width="7" height="7" rx="1" stroke={accentColor} strokeWidth="1" fill="none" />
            <line x1="20.5" y1="32" x2="20.5" y2="39" stroke={accentColor} strokeWidth="0.5" opacity="0.5" />
            <line x1="17" y1="35.5" x2="24" y2="35.5" stroke={accentColor} strokeWidth="0.5" opacity="0.5" />
            {/* Window right */}
            <rect x="40" y="32" width="7" height="7" rx="1" stroke={accentColor} strokeWidth="1" fill="none" />
            <line x1="43.5" y1="32" x2="43.5" y2="39" stroke={accentColor} strokeWidth="0.5" opacity="0.5" />
            <line x1="40" y1="35.5" x2="47" y2="35.5" stroke={accentColor} strokeWidth="0.5" opacity="0.5" />
            {/* WiFi signal from roof */}
            <path d="M26 18a8.5 8.5 0 0112 0" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" className="animate-pulse" />
            <path d="M28.5 21a5 5 0 017 0" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" className="animate-pulse [animation-delay:0.3s]" />
            <circle cx="32" cy="23" r="1.5" fill={accentColor} className="animate-pulse [animation-delay:0.6s]" />
        </svg>
    )
}

export function WebIcon({ size = 40, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Browser window */}
            <rect x="6" y="10" width="52" height="38" rx="4" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Title bar */}
            <line x1="6" y1="20" x2="58" y2="20" stroke={accentColor} strokeWidth="1.5" />
            {/* Browser dots */}
            <circle cx="14" cy="15" r="2" fill={accentColor} opacity="0.6" />
            <circle cx="21" cy="15" r="2" fill={accentColor} opacity="0.4" />
            <circle cx="28" cy="15" r="2" fill={accentColor} opacity="0.2" />
            {/* URL bar */}
            <rect x="34" y="13" width="20" height="4" rx="2" stroke={accentColor} strokeWidth="0.8" fill="none" opacity="0.3" />
            {/* Code bracket left */}
            <path d="M22 30l-6 4 6 4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Code bracket right */}
            <path d="M42 30l6 4-6 4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Slash */}
            <line x1="35" y1="27" x2="29" y2="41" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Cursor blink */}
            <line x1="32" y1="44" x2="32" y2="46" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
            {/* Connection line bottom */}
            <line x1="32" y1="48" x2="32" y2="56" stroke={accentColor} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <circle cx="32" cy="58" r="2" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
    )
}


// ─── SOLUTION ICONS (medium, used inside cards) ───

// Seguridad solutions
export function CCTVIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Camera body */}
            <path d="M8 18h22a4 4 0 014 4v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4a4 4 0 014-4z" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Lens */}
            <circle cx="30" cy="24" r="5" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="30" cy="24" r="2" fill={accentColor} opacity="0.5" />
            {/* Mount bracket */}
            <path d="M38 20l6-8h2v4l-6 8" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* IR LEDs */}
            <circle cx="12" cy="22" r="1" fill={accentColor} opacity="0.4" className="animate-pulse" />
            <circle cx="12" cy="26" r="1" fill={accentColor} opacity="0.4" className="animate-pulse [animation-delay:0.3s]" />
            {/* Signal waves */}
            <path d="M34 18a6 6 0 010 12" stroke={accentColor} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.2" />
            <path d="M37 16a10 10 0 010 16" stroke={accentColor} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.1" />
            {/* Base mount */}
            <line x1="44" y1="10" x2="48" y2="10" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export function AccessControlIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Panel body */}
            <rect x="10" y="4" width="28" height="40" rx="4" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Fingerprint scanner area */}
            <circle cx="24" cy="20" r="8" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.3" />
            {/* Fingerprint lines */}
            <path d="M20 18c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M21 20c0-1.6 1.3-3 3-3s3 1.3 3 3" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M22 22c0-1.1.9-2 2-2s2 .9 2 2v2c0 1.1-.9 2-2 2" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M20 21v3c0 2.2 1.8 4 4 4" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
            {/* Status LED */}
            <circle cx="24" cy="36" r="2" fill={accentColor} className="animate-pulse" />
            {/* Keypad dots */}
            <circle cx="18" cy="36" r="1" fill={accentColor} opacity="0.2" />
            <circle cx="30" cy="36" r="1" fill={accentColor} opacity="0.2" />
        </svg>
    )
}

export function IntrusionIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Bell body */}
            <path d="M24 4v2M12 22c0-6.6 5.4-12 12-12s12 5.4 12 12v8l4 4H8l4-4v-8z" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Clapper */}
            <path d="M20 38a4 4 0 008 0" stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Alert waves */}
            <path d="M40 14a4 4 0 012 3.5" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" className="animate-pulse" />
            <path d="M42 11a8 8 0 014 7" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" className="animate-pulse [animation-delay:0.3s]" />
            {/* Motion lines */}
            <line x1="6" y1="20" x2="4" y2="18" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            <line x1="5" y1="24" x2="3" y2="24" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </svg>
    )
}

export function EmergencyCommsIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Radio body */}
            <rect x="14" y="14" width="20" height="28" rx="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Screen */}
            <rect x="18" y="18" width="12" height="8" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.5" />
            {/* Channel text lines */}
            <line x1="20" y1="21" x2="28" y2="21" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            <line x1="20" y1="23" x2="25" y2="23" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            {/* Speaker grille */}
            <line x1="18" y1="30" x2="30" y2="30" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            <line x1="18" y1="32" x2="30" y2="32" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            <line x1="18" y1="34" x2="30" y2="34" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            <line x1="18" y1="36" x2="30" y2="36" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
            {/* Antenna */}
            <line x1="30" y1="14" x2="34" y2="4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            {/* Signal waves */}
            <path d="M36 6a3 3 0 012 2.5" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" className="animate-pulse" />
            <path d="M38 4a6 6 0 014 5" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" className="animate-pulse [animation-delay:0.3s]" />
            {/* PTT button */}
            <rect x="8" y="22" width="6" height="10" rx="1.5" stroke={accentColor} strokeWidth="1.2" fill="none" opacity="0.4" />
        </svg>
    )
}

// TI solutions
export function NetworkIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Central node */}
            <circle cx="24" cy="24" r="5" stroke={accentColor} strokeWidth="2" fill="none" />
            <circle cx="24" cy="24" r="2" fill={accentColor} opacity="0.5" />
            {/* Top node */}
            <circle cx="24" cy="6" r="3" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <line x1="24" y1="9" x2="24" y2="19" stroke={accentColor} strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Right node */}
            <circle cx="42" cy="24" r="3" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <line x1="39" y1="24" x2="29" y2="24" stroke={accentColor} strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Bottom node */}
            <circle cx="24" cy="42" r="3" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <line x1="24" y1="39" x2="24" y2="29" stroke={accentColor} strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Left node */}
            <circle cx="6" cy="24" r="3" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <line x1="9" y1="24" x2="19" y2="24" stroke={accentColor} strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Diagonal connections */}
            <circle cx="38" cy="10" r="2.5" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="36" y1="12" x2="27.5" y2="20.5" stroke={accentColor} strokeWidth="0.8" opacity="0.3" strokeDasharray="2 3" />
            <circle cx="10" cy="38" r="2.5" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="12" y1="36" x2="20.5" y2="27.5" stroke={accentColor} strokeWidth="0.8" opacity="0.3" strokeDasharray="2 3" />
            {/* Data pulse */}
            <circle cx="24" cy="14" r="1" fill={accentColor} className="animate-pulse" opacity="0.6" />
        </svg>
    )
}

export function CloudServiceIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Cloud shape */}
            <path d="M14 34h22a8 8 0 001-15.9A10 10 0 0017 20a8 8 0 00-3 14z" stroke={accentColor} strokeWidth="2" strokeLinejoin="round" fill="none" />
            {/* Upload arrow */}
            <path d="M24 40v-12M20 32l4-4 4 4" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Connection dots inside cloud */}
            <circle cx="20" cy="24" r="1.5" fill={accentColor} opacity="0.3" className="animate-pulse" />
            <circle cx="28" cy="22" r="1.5" fill={accentColor} opacity="0.3" className="animate-pulse [animation-delay:0.5s]" />
            <circle cx="32" cy="27" r="1.5" fill={accentColor} opacity="0.3" className="animate-pulse [animation-delay:1s]" />
            {/* Connecting lines */}
            <line x1="21" y1="24" x2="27" y2="22" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
            <line x1="29" y1="22" x2="31" y2="27" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
        </svg>
    )
}

export function SoftwareIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Terminal window */}
            <rect x="4" y="8" width="40" height="32" rx="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Title bar */}
            <line x1="4" y1="16" x2="44" y2="16" stroke={accentColor} strokeWidth="1" />
            {/* Window dots */}
            <circle cx="10" cy="12" r="1.5" fill={accentColor} opacity="0.5" />
            <circle cx="15" cy="12" r="1.5" fill={accentColor} opacity="0.3" />
            <circle cx="20" cy="12" r="1.5" fill={accentColor} opacity="0.15" />
            {/* Code lines */}
            <line x1="10" y1="22" x2="16" y2="22" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="18" y1="22" x2="30" y2="22" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            <line x1="14" y1="26" x2="22" y2="26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <line x1="24" y1="26" x2="34" y2="26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
            <line x1="14" y1="30" x2="18" y2="30" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="10" y1="34" x2="20" y2="34" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <line x1="22" y1="34" x2="28" y2="34" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
            {/* Cursor */}
            <rect x="30" y="33" width="1.5" height="3" fill={accentColor} className="animate-pulse" />
        </svg>
    )
}

export function SupportIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Headset band */}
            <path d="M10 28v-4a14 14 0 0128 0v4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Left earpiece */}
            <rect x="4" y="26" width="8" height="12" rx="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Right earpiece */}
            <rect x="36" y="26" width="8" height="12" rx="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Mic arm */}
            <path d="M36 34h-4a4 4 0 00-4 4v2" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Mic */}
            <circle cx="28" cy="42" r="2.5" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="28" cy="42" r="1" fill={accentColor} opacity="0.5" />
            {/* Sound waves from mic */}
            <path d="M24 40a2 2 0 00-1 1.5" stroke={accentColor} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.3" className="animate-pulse" />
            {/* Signal indicator */}
            <circle cx="8" cy="32" r="1" fill={accentColor} className="animate-pulse" opacity="0.5" />
        </svg>
    )
}

// IoT solutions
export function AutomationIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Circular track */}
            <circle cx="24" cy="24" r="16" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="24" cy="24" r="11" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.15" />
            {/* Center gear */}
            <circle cx="24" cy="24" r="5" stroke={accentColor} strokeWidth="2" fill="none" />
            <circle cx="24" cy="24" r="2" fill={accentColor} opacity="0.4" />
            {/* Gear teeth */}
            <line x1="24" y1="16" x2="24" y2="19" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="29" x2="24" y2="32" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="24" x2="19" y2="24" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="29" y1="24" x2="32" y2="24" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            {/* Diagonal teeth */}
            <line x1="18.3" y1="18.3" x2="20.5" y2="20.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="27.5" y1="27.5" x2="29.7" y2="29.7" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="29.7" y1="18.3" x2="27.5" y2="20.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20.5" y1="27.5" x2="18.3" y2="29.7" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            {/* Orbiting dots */}
            <circle cx="24" cy="8" r="2" fill={accentColor} opacity="0.5" className="animate-pulse" />
            <circle cx="40" cy="24" r="2" fill={accentColor} opacity="0.3" className="animate-pulse [animation-delay:0.5s]" />
            <circle cx="24" cy="40" r="2" fill={accentColor} opacity="0.4" className="animate-pulse [animation-delay:1s]" />
            <circle cx="8" cy="24" r="2" fill={accentColor} opacity="0.35" className="animate-pulse [animation-delay:1.5s]" />
        </svg>
    )
}

export function SmartLightIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Bulb shape */}
            <path d="M24 4a12 12 0 00-8 21v3a4 4 0 004 4h8a4 4 0 004-4v-3A12 12 0 0024 4z" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Filament lines */}
            <path d="M20 20c0-2 2-4 4-4s4 2 4 4" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
            <path d="M22 22c0-1 1-2 2-2s2 1 2 2" stroke={accentColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* Base rings */}
            <line x1="18" y1="30" x2="30" y2="30" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <line x1="19" y1="33" x2="29" y2="33" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            {/* Base screw */}
            <path d="M20 36h8v4a4 4 0 01-8 0v-4z" stroke={accentColor} strokeWidth="1.5" fill="none" />
            {/* Light rays */}
            <line x1="6" y1="16" x2="10" y2="16" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.3" className="animate-pulse" />
            <line x1="38" y1="16" x2="42" y2="16" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.3" className="animate-pulse [animation-delay:0.3s]" />
            <line x1="10" y1="6" x2="13" y2="9" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.2" className="animate-pulse [animation-delay:0.6s]" />
            <line x1="38" y1="6" x2="35" y2="9" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.2" className="animate-pulse [animation-delay:0.9s]" />
        </svg>
    )
}

export function SmartLockIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Door panel */}
            <rect x="8" y="4" width="32" height="40" rx="2" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Door frame detail */}
            <rect x="12" y="8" width="24" height="32" rx="1" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.2" />
            {/* Smart lock body */}
            <rect x="30" y="18" width="8" height="14" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
            {/* Lock keypad */}
            <circle cx="34" cy="23" r="1" fill={accentColor} opacity="0.3" />
            <circle cx="34" cy="26" r="1" fill={accentColor} opacity="0.3" />
            <circle cx="34" cy="29" r="1" fill={accentColor} opacity="0.3" />
            {/* Handle */}
            <rect x="30" y="33" width="8" height="3" rx="1.5" fill={accentColor} opacity="0.3" />
            {/* WiFi signal from lock */}
            <path d="M40 16a3 3 0 012 2" stroke={accentColor} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" className="animate-pulse" />
            <path d="M42 14a6 6 0 014 4" stroke={accentColor} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.2" className="animate-pulse [animation-delay:0.3s]" />
            {/* Status light */}
            <circle cx="34" cy="20" r="1" fill={accentColor} className="animate-pulse" />
        </svg>
    )
}

export function WiFiMeshIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Central router */}
            <rect x="18" y="28" width="12" height="8" rx="2" stroke={accentColor} strokeWidth="2" fill="none" />
            <circle cx="22" cy="32" r="1" fill={accentColor} opacity="0.5" />
            <circle cx="26" cy="32" r="1" fill={accentColor} opacity="0.5" className="animate-pulse" />
            {/* WiFi waves */}
            <path d="M14 18a14 14 0 0120 0" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25" />
            <path d="M17 22a9 9 0 0114 0" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
            <path d="M20 26a5 5 0 018 0" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
            {/* Mesh node left */}
            <rect x="2" y="36" width="8" height="6" rx="1.5" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="10" y1="39" x2="18" y2="34" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
            {/* Mesh node right */}
            <rect x="38" y="36" width="8" height="6" rx="1.5" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="38" y1="39" x2="30" y2="34" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
            {/* Signal dots */}
            <circle cx="24" cy="14" r="1.5" fill={accentColor} opacity="0.3" className="animate-pulse [animation-delay:0.5s]" />
        </svg>
    )
}

// Web solutions
export function UIDesignIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Artboard */}
            <rect x="6" y="6" width="36" height="36" rx="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Layout blocks */}
            <rect x="10" y="10" width="28" height="6" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="10" y="20" width="12" height="18" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="26" y="20" width="12" height="8" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="26" y="32" width="12" height="6" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            {/* Pen tool cursor */}
            <path d="M38 2l4 4-16 16-5 1 1-5L38 2z" stroke={accentColor} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            <circle cx="22" cy="23" r="1" fill={accentColor} opacity="0.6" />
            {/* Color swatch dots */}
            <circle cx="13" cy="35" r="1.5" fill={accentColor} opacity="0.5" />
            <circle cx="17" cy="35" r="1.5" fill={accentColor} opacity="0.3" />
        </svg>
    )
}

export function WebDevIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Monitor */}
            <rect x="4" y="4" width="40" height="28" rx="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Screen bar */}
            <line x1="4" y1="12" x2="44" y2="12" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            {/* Code bracket < */}
            <path d="M16 20l-5 4 5 4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Code bracket > */}
            <path d="M32 20l5 4-5 4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Slash */}
            <line x1="27" y1="18" x2="21" y2="30" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            {/* Stand */}
            <line x1="24" y1="32" x2="24" y2="38" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="40" x2="32" y2="40" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            {/* Browser dots */}
            <circle cx="10" cy="8" r="1" fill={accentColor} opacity="0.4" />
            <circle cx="14" cy="8" r="1" fill={accentColor} opacity="0.3" />
            <circle cx="18" cy="8" r="1" fill={accentColor} opacity="0.2" />
        </svg>
    )
}

export function ECommerceIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Cart body */}
            <path d="M8 8h4l6 24h18l4-16H16" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Cart wheels */}
            <circle cx="20" cy="38" r="3" stroke={accentColor} strokeWidth="2" fill="none" />
            <circle cx="34" cy="38" r="3" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Items in cart */}
            <rect x="20" y="20" width="6" height="6" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="28" y="18" width="5" height="8" rx="1" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.3" />
            {/* Price tag */}
            <circle cx="40" cy="8" r="4" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <line x1="40" y1="6" x2="40" y2="10" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <line x1="38" y1="8" x2="42" y2="8" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            {/* Sparkle */}
            <circle cx="36" cy="4" r="1" fill={accentColor} className="animate-pulse" opacity="0.5" />
        </svg>
    )
}

export function SEOIcon({ size = 28, accentColor = "currentColor", className, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            {/* Magnifying glass */}
            <circle cx="20" cy="20" r="12" stroke={accentColor} strokeWidth="2" fill="none" />
            <line x1="29" y1="29" x2="40" y2="40" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
            {/* Graph inside lens */}
            <path d="M12 26l4-6 4 3 6-10" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
            {/* Arrow up at graph peak */}
            <path d="M26 13l-2-3v2" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            {/* Grid lines inside lens */}
            <line x1="12" y1="20" x2="28" y2="20" stroke={accentColor} strokeWidth="0.5" opacity="0.15" />
            <line x1="12" y1="24" x2="28" y2="24" stroke={accentColor} strokeWidth="0.5" opacity="0.15" />
            <line x1="16" y1="12" x2="16" y2="28" stroke={accentColor} strokeWidth="0.5" opacity="0.15" />
            <line x1="20" y1="12" x2="20" y2="28" stroke={accentColor} strokeWidth="0.5" opacity="0.15" />
            <line x1="24" y1="12" x2="24" y2="28" stroke={accentColor} strokeWidth="0.5" opacity="0.15" />
            {/* Pulse dot at peak */}
            <circle cx="26" cy="13" r="1.5" fill={accentColor} className="animate-pulse" opacity="0.5" />
        </svg>
    )
}

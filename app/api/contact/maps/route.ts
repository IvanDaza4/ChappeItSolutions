import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q") || ""

    const apiKey = process.env.GOOGLE_MAPS_EMBED_KEY

    // Si tenés API key de Google Maps Embed, usala.
    // Si no, devolvemos el embed público (gratuito, sin key).
    const url = apiKey
        ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(q)}`
        : `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`

    return NextResponse.json({ url })
}
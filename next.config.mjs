/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // En Vercel podés usar el optimizador de imágenes nativo.
    // Si querés activarlo, remové esta línea o ponela en false.
    unoptimized: false,
  },
}

export default nextConfig
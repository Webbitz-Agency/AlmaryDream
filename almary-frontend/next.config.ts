import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formati moderni serviti automaticamente da next/image
    formats: ["image/avif", "image/webp"],
    // Necessario solo per i placeholder SVG (verranno sostituiti da foto reali)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Header performance/SEO di base
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

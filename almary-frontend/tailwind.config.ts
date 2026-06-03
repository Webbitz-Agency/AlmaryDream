import type { Config } from "tailwindcss";

/**
 * Design system — Almary Dream (Luxury B&B, Costa Smeralda)
 * Estetica ispirata a napolintocore.it (minimalismo editoriale premium),
 * palette brand del cliente (verdi/mint).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Palette brand Almary Dream
        accent: "#15cb9e", // mint bright — highlight, hover, parole-chiave
        primary: "#1f9f7c", // teal light — CTA piene principali
        secondary: "#20755c", // teal medium — CTA hover, accenti scuri
        dark: "#1c4d3e", // deep green — sezioni scure / footer / testi
        offwhite: "#fbfbfb", // off-white impercettibile per dare respiro
        ink: "#1a1a1a", // testo principale (antracite, non nero puro)
        muted: "#6b7280", // testo secondario grigio
      },
      fontFamily: {
        // Self-hosted via next/font (vedi src/app/layout.tsx)
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Scala minimale e pulita coerente con lo stile premium
        DEFAULT: "4px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        // Ombre quasi invisibili, "flat-soft" come il riferimento
        soft: "0 2px 48px 0 rgba(0,0,0,0.04)",
        card: "0 10px 40px -12px rgba(28,77,62,0.18)",
        nav: "0 1px 24px 0 rgba(0,0,0,0.06)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        eyebrow: "0.2em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

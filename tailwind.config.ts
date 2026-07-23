import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All surfaces are plain white
        base: "#FFFFFF",
        cream: "#FFFFFF", // kept white — no beige/cream anywhere
        // Near-black for headings & dark UI (reads as black, subtle blue tint)
        navy: {
          DEFAULT: "#12151B",
          900: "#0B0D12",
          800: "#12151B",
          700: "#2A2F39",
        },
        // Body text — near-black
        ink: "#1E232C",
        "ink-invert": "#FFFFFF",
        // Single accent = blue (CTA + all accents). Repurposed "amber" token.
        amber: {
          DEFAULT: "#1A56B0",
          600: "#154A98",
          700: "#113C7C",
        },
        // Secondary accent folded into the same blue family
        teal: {
          DEFAULT: "#1A56B0",
          600: "#154A98",
        },
        // Checks / positive markers — blue to keep the palette white/black/blue
        success: "#1A56B0",
        // Neutral hairlines / borders
        line: "#E6E8EC",
        // Subtle tinted surface for alternating section backgrounds
        mist: "#EAF0F9",
      },
      fontFamily: {
        // Standard, non-"AI" system sans across the whole site
        serif: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        content: "1140px",
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,42,71,0.04), 0 8px 24px -12px rgba(14,42,71,0.12)",
        card: "0 1px 3px rgba(14,42,71,0.05), 0 12px 32px -16px rgba(14,42,71,0.14)",
        lift: "0 8px 40px -12px rgba(14,42,71,0.22)",
        cta: "0 10px 24px -10px rgba(26,86,176,0.45)",
      },
      letterSpacing: {
        eyebrow: "0.08em",
      },
      keyframes: {
        "arrow-slide": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

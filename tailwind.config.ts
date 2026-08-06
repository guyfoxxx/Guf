import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: "#0B1320",
        graphite: "#1F2937",
        water: "#0EA5E9",
        emergency: "#F97316",
        success: "#22C55E",
        surface: "#F8FAFC",
        deepdark: "#020617",
        ink: "#111827",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(11,19,32,0.25)",
        glass: "0 8px 32px 0 rgba(2,6,23,0.35)",
      },
      backgroundImage: {
        "industrial-gradient":
          "linear-gradient(135deg, #0B1320 0%, #1F2937 55%, #0EA5E9 130%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

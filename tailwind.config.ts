
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#7b2ff2",
          dark: "#5f1fc8",
          light: "#ad7cf7",
        },
        secondary: {
          DEFAULT: "#4e54c8",
          light: "#8f94fb",
        },
        accent: "#c3aed6",
        muted: "#f6f7fb",
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        "hero-start": "#ad7cf7",
        "hero-end": "#4e54c8",
      }),
      boxShadow: {
        card: "0 2px 16px 0 rgba(123,47,242,0.08)",
        form: "0 2px 32px 0 rgba(123,47,242,0.09)",
      },
      animation: {
        "fade-in": "fade-in 0.7s both",
        "card-hover": "card-hover 0.2s",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "card-hover": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

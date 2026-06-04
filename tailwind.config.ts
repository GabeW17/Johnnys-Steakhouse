import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content.ts",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c0a0a",
        espresso: "#141010",
        oxblood: "#1a1413",
        panel: "#181312",
        cream: "#f5efe6",
        "dim-cream": "#b0a293",
      },
      fontFamily: {
        // Whole site uses Hanken Grotesk (the hero / three-act font).
        // `display` kept as a token but mapped to Hanken so every heading,
        // dish name, quote and the brand text matches the hero.
        display: ["var(--font-hanken)", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1200px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        heroZoom: {
          "0%": { transform: "scale(1.14)" },
          "100%": { transform: "scale(1)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        heroZoom: "heroZoom 9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        riseIn: "riseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

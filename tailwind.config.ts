import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5E6C8",
        parchment: "#F0E0B8",
        "warm-beige": "#E8D4A8",
        "egg-yellow": "#F5C542",
        "egg-gold": "#E8A838",
        "soft-orange": "#E8913A",
        "deep-orange": "#D4782A",
        "yolk-pale": "#F0D878",
        ink: "#2A2118",
        "ink-soft": "#4A3F32",
        border: "#2A2118",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
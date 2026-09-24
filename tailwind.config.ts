import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a1a33",
          deep: "#06122a",
          card: "#10264a",
          line: "#233b63",
        },
        gold: {
          DEFAULT: "#e8b04a",
          bright: "#f3c977",
          deep: "#b98a2c",
        },
        paper: {
          DEFAULT: "#f3f4f7",
          white: "#ffffff",
        },
        mist: "#aab6cb",
        steel: "#7d8ba3",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

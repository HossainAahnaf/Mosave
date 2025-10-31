import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f5ff",
          100: "#e3e9ff",
          200: "#c1cbff",
          300: "#8da2ff",
          400: "#5670ff",
          500: "#314cff",
          600: "#1f35d9",
          700: "#192aab",
          800: "#172688",
          900: "#141f6d"
        },
        accent: {
          100: "#ffe6cc",
          300: "#ffb366",
          500: "#ff8c1a",
          700: "#cc6f15"
        }
      },
      boxShadow: {
        glow: "0 10px 30px rgba(49, 76, 255, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;

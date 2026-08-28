import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tinte: "#07090D",
        kohle: "#0D1117",
        nebel: "#98A2B3",
        kreide: "#E7ECF3",
        signal: "#4F7DFF",
        leuchten: "#3DD8C4",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;

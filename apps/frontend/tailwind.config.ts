import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      colors:{
        amber:{
          700:"#ff4f00"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;

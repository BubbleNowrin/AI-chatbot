import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C596E",
        secondary: "#4B2E39", 
        accent: "#32021F",
        neutral: "#6F7D8C",
        highlight: "#77A0A9",
        // Additional semantic colors
        'brand-purple': "#6C596E",
        'brand-burgundy': "#4B2E39",
        'brand-dark': "#32021F", 
        'brand-gray': "#6F7D8C",
        'brand-teal': "#77A0A9",
        // Beige theme colors
        'beige-light': "#F5F0EB",
        'beige': "#F0EBE6", 
        'beige-dark': "#E8E0D8",
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

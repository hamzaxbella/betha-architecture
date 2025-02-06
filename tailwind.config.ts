import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["38px", "48px"],
      "6xl": ["58px", "88px"],
      "7xl": ["77px", "95px"],
      "8xl": ["96px", "106px"],
    },

    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
        'playful': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;

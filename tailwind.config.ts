import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{ 
        "primary":"#FFFFFF",
        "secondary":"#F2F4FF",
        "medium-white":"#F7F8FD",
        "darker-gray": "#2A3054",
        "darker-gray-medium":"#3A4374",
        "darker-gray-light":"#647196",
        "darker-violet": "#AD1FEA",
        "darker-blue":"#4661E6",
        "lighter-orange":"#F49F85",
        "lighter-blue":"#62BCFA",
        
      },
    },
  },
  plugins: [],
};
export default config;

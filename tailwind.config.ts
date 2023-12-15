import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FDC800",
        secondary: "#818181",
        success: "#A7E1A7	",
        textDarkGreen: "#358335	",
        texGray: "#363636",
        textLightGray: "#B4B4B4",
        textDarkGray: "#1A1B1B",
        white: "#fff",
        btnPrimary: "#0071BF",
      },
    },
  },
  plugins: [],
};
export default config;

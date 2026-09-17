import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mota: {
          navy: "#0a2540",
          navyDark: "#06182a",
          navyLight: "#163c66",
          emerald: "#059669",
          emeraldDark: "#047857",
          emeraldLight: "#10b981",
          amber: "#d97706",
          amberLight: "#f59e0b",
          saffron: "#ff671f",
          chakra: "#06038d",
          indiaGreen: "#046a38",
        },
      },
    },
  },
  plugins: [],
};
export default config;

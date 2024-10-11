import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'grid-auto-fit': 'repeat(auto-fit, minmax(350px, 0fr))'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "#1c7ce2",
        bluedark: "#155a9c",
        grey: "#E3E4E5",
        greydark: "#424242",
      },
    },
  },
  plugins: [],
};
export default config;

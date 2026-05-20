import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gb-lightest": "var(--gb-lightest)",
        "gb-light": "var(--gb-light)",
        "gb-dark": "var(--gb-dark)",
        "gb-darkest": "var(--gb-darkest)",
        "gb-bg": "var(--gb-bg)",
        "gb-text": "var(--gb-text)",
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace'],
        modern: ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

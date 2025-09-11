import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        dodgerblue: "#3b82f6",
        gray: {
          "100": "#8f8f8f",
          "200": "#191d23",
        },
        crimson: "rgba(220, 38, 38, 0.4)",
        red: {
          "100": "#ff0000",
          "200": "#e60000",
        },
        black: "#000",
        darkorange: {
          "100": "#ea7100",
          "200": "rgba(245, 124, 11, 0.5)",
        },
        goldenrod: "rgba(234, 179, 8, 0.5)",
        darkgoldenrod: "#ba8d00",
        mediumseagreen: {
          "100": "#03a972",
          "200": "rgba(16, 185, 129, 0.5)",
        },
        hotpink: {
          "100": "#ec4899",
          "200": "rgba(236, 72, 153, 0.5)",
        },
        skyblue: "rgba(6, 182, 212, 0.5)",
        cadetblue: "#00a2bd",
      },
      fontFamily: {
        manrope: "Manrope",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};

export default config;

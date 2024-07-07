/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#2563eb",

          "secondary": "#7c3aed",

          "accent": "#22d3ee",

          "neutral": "#1f2937",

          "base-100": "#4b5563",

          "info": "#60a5fa",

          "success": "#15803d",

          "warning": "#eab308",

          "error": "#dc2626",
        },
      },
    ],
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],

}
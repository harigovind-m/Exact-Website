
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A148C",   // Deep Purple
        accent: "#00BFA5"     // Teal
      },
      fontFamily: {
        hero: ['Michroma', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

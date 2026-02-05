/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tanker: ["Tanker", "system-ui", "-apple-system", "sans-serif"],
        bespoke: ["Bespoke", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

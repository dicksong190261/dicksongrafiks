/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#00f0ff',
        violet: '#8a2be2',
        orange: '#ff7a00',
        dark: '#06070a',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

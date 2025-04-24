/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'baseFont':['Nunito Sans', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}


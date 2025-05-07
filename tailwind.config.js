/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'backgroundColor': 'linear-gradient(90deg, #e2e2e2, #c9d6ff)',
        // 渐变的写法是“bg-gradient-to-r from-blue-500 to-green-300”（从左到右，从蓝色到绿色）
        'lightBackgroundColor': '#ffffff',
        'lightContentColor': '#F3F4F6',
        'lightSidenavColor': '#f3f5f6',
        'lightTextColor': '#0f172a',
        'lightBorderColor': '#dce0e9',
        'darkBackgroundColor': '#292a2d',
        'darkContentColor': '#404045',
        'darkSidenavColor': '#212327',
        'darkTextColor': '#ffffff',
        'darkBorderColor': '#5a5a69',
        'primaryColor': '#6495ED',
        'placeholderColor': '#babac1',
      },
    },
    fontFamily: {
      'baseFont': ['Nunito Sans', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [
    
  ],
}


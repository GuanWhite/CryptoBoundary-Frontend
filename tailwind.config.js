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
        'lightBackgroundColor': '#fbfbfb',
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
      gridTemplateColumns: {
        'v4': 'repeat(4, minmax(300px, 1fr))',
      },
    },
    fontFamily: {
      'baseFont': ['Nunito Sans', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
    screens: {
      // 屏幕尺寸小于 480px 为手机端，480px 到 1024px 为平板端，1024px 到 1280px 之间为大 pad 尺寸和小笔记本屏幕的混合区。大于 1280px 为 PC 端。
      'xs': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [

  ],
}


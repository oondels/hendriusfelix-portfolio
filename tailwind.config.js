/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        primary: {
          600: '#4338ca', // Using the color from :root CSS variables
          700: '#3730a3', // Slightly darker shade for hover
        },
      },
    },
  },
  plugins: [],
}
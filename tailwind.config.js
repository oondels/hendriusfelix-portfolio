/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        admin: {
          bg: '#0a0a0f',
          card: '#0f0f15',
          accent: '#00b4d8',
          'accent-light': '#90e0ef',
          border: 'rgba(0, 180, 216, 0.2)',
          text: '#e0e0e0',
          'text-dim': '#888888'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
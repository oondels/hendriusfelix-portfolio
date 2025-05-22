/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#111111',
        secondary: '#1a1a1a',
        accent: '#D3D3D3',
        text: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
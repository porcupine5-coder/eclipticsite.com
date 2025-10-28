export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4f46e5', dark: '#4338ca' },
        accent: { DEFAULT: '#06b6d4' }
      },
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'pulse-slow': 'pulse 2s infinite'
      }
    }
  },
  plugins: []
}

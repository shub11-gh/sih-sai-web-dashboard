/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e6f5ff',
          200: '#bfe9ff',
          300: '#8fdcff',
          400: '#57c8ff',
          500: '#1aaeff',
          600: '#0091e6',
          700: '#0073b3',
          800: '#045986',
          900: '#01334d'
        },
        success: '#10b981',
        danger: '#ef4444'
      },
      boxShadow: {
        'card': '0 6px 18px rgba(22, 28, 36, 0.06)'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}


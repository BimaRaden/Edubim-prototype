/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-black': '#0A0A0A',
        'custom-green': '#10B981',
        gray: {
          900: '#111111',
          800: '#1A1A1A',
          700: '#242424',
          600: '#303030',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#DC3545',
        gray: '#CED4DA',
        'dark-gray': '#6C757D',
        'base-red': '#E31221',
        blue: '#0D6EFD',
        'light-gray': '#222030'
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#DC3545',
        gray: '#CED4DA',
        'dark-gray': '#6C757D',
        'base-red': '#E31221',
        blue: '#0D6EFD',
        'light-gray': '#222030',
        'light-yallow': '#DDCCAA',
        green: '#198754',
        border: '#efefef4d',
        'light-black': '#24222F',
        'modal-black': '#11101A',
        'light-green': '#198754',
        purple: '9747FF'
      },
      fontSize: {
        sm: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'sm-light': ['20px', { lineHeight: '30px', fontWeight: '400' }],
        'sm-dark': ['16px', { lineHeight: '24px', fontWeight: '700' }],
        'sm-bold': ['24px', { lineHeight: '29px', fontWeight: '500' }],
        'sm-m': ['20px', { lineHeight: '30px', fontWeight: '700' }],
        m: ['32px', { lineHeight: '38px', fontWeight: '500' }],
        'm-bold': ['30px', { lineHeight: '45px', fontWeight: '700' }],
        lg: ['50px', { lineHeight: '75px', fontWeight: '700' }],
        '2lg': ['60px', { lineHeight: '90px', fontWeight: '700' }]
      }
    }
  },
  plugins: []
}

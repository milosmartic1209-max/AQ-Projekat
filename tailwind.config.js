/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0F74BC',
        'light-blue': '#60a5fa',
        'dark-gray': '#232629',
        'light-gray': '#f8fafc',
  'hero': '#f8fdff',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

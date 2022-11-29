/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: 'hsl(209, 23%, 22%)',
        'very-dark': 'hsl(207, 26%, 17%)',
        'very-dark-blue': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'very-light': 'hsl(0, 0%, 90%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
};

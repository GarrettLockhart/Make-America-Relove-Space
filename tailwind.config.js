/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'heroPattern': "url('https://nasaprospect.com/img/space_stars_static.svg')",
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      spacing: {
        108: '27rem',
      },
    },
  },
  plugins: [],
};

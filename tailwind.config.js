/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
    safelist: [
    'hidden', // Safelist the 'hidden' class
    'fa-chevron-up',
    'fa-chevron-down',
  ],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ['"Nunito Sans"', "sans-serif"],
      },
    },
    container: {
      center: true,
      paddding: '1rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
      },
    },
  },
  plugins: [],
};


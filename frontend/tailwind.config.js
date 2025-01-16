module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        platypi: ['Platypi', 'sans-serif'], // Définissez une clé pour la typo Platypi
        nunito: ['Nunito', 'sans-serif'],  // Définissez une clé pour la typo Nunito
      },
      colors: {
        // background color
        'custom-purple': '#543787',
        // primary colors
        'custom-blue' : '#8dace5',
        'custom-orange' : '#f0743e',
        'custom-yellow' : '#feb737',
        'custom-green' : '#aad59f',
        //secondary colors
        'light-blue': '#d4e0f0',
        'light-yellow': '#fde9ad',
        'light-pink': '#f6c3ae',
        'soft-pink': '#f9b1b2',
        'lavender': '#cdbcdc',
        'blue-light': '#9ab2d4',
        'dark-green': '#526049',
        'orange': '#f29b3a',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
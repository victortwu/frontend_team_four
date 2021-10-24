module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // to demo and test custom colors
    colors: {
      dkG: 'var(--darkGr)',
      mdG: 'var(--mediumGr)',
      ltG: 'var(--lightGr)',
      fdG: 'var(--fadedGr)',
      skyB: 'var(--skyBlue)'
    },
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

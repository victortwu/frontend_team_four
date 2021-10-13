module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // to demo and test custom colors
    colors: {
      cl1: 'var(--colorOne)',
      cl2: 'var(--colorTwo)',
      cl3: 'var(--colorThree)',
      cl4: 'var(--colorFour)'
    },
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

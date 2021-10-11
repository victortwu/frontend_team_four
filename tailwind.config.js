module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // to demo and test custom colors
    colors: {
      poop: 'var(--colorOne)',
      dodo: 'var(--colorTwo)',
      peepee: 'var(--colorThree)',
      foobar: 'var(--colorFour)'
    },
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

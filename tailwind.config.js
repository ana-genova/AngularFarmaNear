/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: "#235580",
      secondary: "#f7fffd",
      white: colors.white,
      gray: colors.gray,
      zinc: colors.zinc,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.yellow,
      green: colors.green,
      theme: {
        '50':  '#f0f7fb',
        '100': '#cbe4f2',
        '200': '#a5d0e9',
        '300': '#7db9df',
        '400': '#57a4d7',
        '500': '#3c8bc2',
        '600': '#2e6ea0',
        '700': '#235580',
        '800': '#1a4063',
        '900': '#132f4b',
        '950': '#0c1d2f',
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      parkinsans: ['Parkinsans', 'sans-serif'],
      mono: ['Mono', 'sans-serif']
    }
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: "#058080",
      secondary: "#f7fffd",
      white: colors.white,
      gray: colors.gray,
      zinc: colors.zinc,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.yellow,
      green: colors.green,
      theme: {
        '50': '#effefc',
        '100': '#c8fff8',
        '200': '#90fff2',
        '300': '#51f7ea',
        '400': '#1de4db',
        '500': '#05c7c1',
        '600': '#00a19f',
        '700': '#058080',
        '800': '#0a6465',
        '900': '#0e5153',
        '950': '#003235',
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      parkinsans: ['Parkinsans', 'sans-serif']
    }
  },
  plugins: [],
}


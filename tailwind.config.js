/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'primary': '#333333',
        'bgclr': '#ECF0F1',
        'blue': '#416DA4',
        'white': '#ffffff',
        'labelclr': "#2C3E50",
        "textred": "#FF0000"
      },
    },



  },
  plugins: [require("daisyui")],
}

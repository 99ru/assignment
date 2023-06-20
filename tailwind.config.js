/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    fontFamily: {
    'body': ['Lato', 'sans-serif']
    },
    colors: {
        customBlue: "#1c2c54",
        lightGrey: "#808080",
      },
    },
  },
  plugins: [],
}
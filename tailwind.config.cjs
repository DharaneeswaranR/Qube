/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'white-gray': '#f6f6f7'
        },
    },
    fontFamily: {
        'poppins': ['poppins']
    }
  },
  plugins: [],
  darkMode: 'class'
}

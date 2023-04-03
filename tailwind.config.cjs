/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'white-blue': '#fafcff'
        },
    },
    fontFamily: {
        'poppins': ['poppins']
    }
  },
  plugins: [],
  darkMode: 'class'
}

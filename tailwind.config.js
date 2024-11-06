/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        qbold:['Bold'],
        qregular:['Regular'],
        qlight:['Light'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        accentColour: '#752F55',
        elemColour: '#E2B6CF',
        linkColour: '#5C95FF',
        bgColour: '#F6EFEE'
      },
    },
  },
  plugins: [],
}


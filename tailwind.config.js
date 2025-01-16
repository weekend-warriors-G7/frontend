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
        accentColour: '#b287a3',
        elemColour: '#7e4d60',
        linkColour: '#5C95FF',
        bgColour: '#F6EFEE'
      },
    },
  },
  plugins: [],
}


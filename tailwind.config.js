/** @type {import('tailwindcss').Configuration} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        Poppins: 'Poppins',
      },
      colors: {
        primary: '#9ca3af',
        secondary: '#12100e',
        fadeCustom: '#b5afed',
        white: '#ffffff',
        zinc: {
          '800': '#12100e',
        },
        bodyclr: "#0b1115",
        mainclr: "#375a6c",
        divclr: "#223742",
      },
      backgroundColor: {
        'primary': '#16222A',
        'secondary': '#3A6073',
      },
      gradientColorStops: {
        'primary': '#16222A',
        'secondary': '#3A6073',
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
};

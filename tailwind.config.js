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
      },
      backgroundColor: {
        'primary': '#2b4162',
        'secondary': '#12100e',
      },
      gradientColorStops: {
        'primary': '#2b4162',
        'secondary': '#12100e',
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
};

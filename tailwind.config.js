/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      screens: {
        '2xlmx': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        xlmx: { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        lgmx: { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        mdmx: { max: '767px' },
        // => @media (max-width: 767px) { ... }

        smmx: { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        primary: '#3354F8',
        accent: '#333745',
        'dark-grey': '#2C2C2C',
        'lighter-grey': '#727272',
        blue: '#3354F8',
      },
    },
  },

  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|accent)/,
    },
  ],
};

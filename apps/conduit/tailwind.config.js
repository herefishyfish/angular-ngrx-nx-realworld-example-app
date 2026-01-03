const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    join(__dirname, '../../libs/**/*.{html,ts}')
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5CB85C',
          hover: '#3d8b3d',
          dark: '#449d44',
        },
        danger: {
          DEFAULT: '#B85C5C',
          hover: '#9d4444',
        },
        secondary: {
          DEFAULT: '#818a91',
        },
        gray: {
          light: '#f3f3f3',
          border: '#e5e5e5',
          text: '#373a3c',
          muted: '#999',
          dark: '#333',
        }
      },
      fontFamily: {
        'logo': ['"Titillium Web"', 'sans-serif'],
        'serif': ['"Source Serif Pro"', 'serif'],
        'sans': ['"Source Sans Pro"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '15px',
        screens: {
          sm: '576px',
          md: '720px',
          lg: '940px',
          xl: '1140px',
        },
      },
    },
  },
  plugins: [],
};

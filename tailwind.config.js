/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          background: 'var(--primary-background)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          background: 'var(--secondary-background)',
        },
        text:{
          DEFAULT: 'var(--text)',
          light: 'var(--text-light)',
          button: 'var(--text-button)',
        },
        icon: 'var(--icon)'
      },
    },
  },
  plugins: [],
};

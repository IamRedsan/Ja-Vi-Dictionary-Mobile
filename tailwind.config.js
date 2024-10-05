/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          background: 'var(--primary-background)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          background: 'var(--secondary-background)',
        },
        tertiary: {
          background: 'var(--tertiary-background)',
        },
        loading: {
          DEFAULT: 'var(--loading-background)'
        },
        quaternary:{
          DEFAULT: 'var(--quaternary)'
        },
        text: {
          DEFAULT: 'var(--text)',
          light: 'var(--text-light)',
          button: 'var(--text-button)',
        },
        form: {
          label: 'var(--form-label)',
        },
        icon: 'var(--icon)',
      },
    },
  },
  plugins: [],
};

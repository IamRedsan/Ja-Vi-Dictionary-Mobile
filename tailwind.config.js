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
          foreground: 'var(--primary-foreground)',
          search: 'var(--search-bar)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          background: 'var(--secondary-background)',
        },
        tertiary: {
          background: 'var(--tertiary-background)',
        },
        loading: {
          DEFAULT: 'var(--loading-background)',
        },
        quaternary: {
          DEFAULT: 'var(--quaternary)',
        },
        text: {
          DEFAULT: 'var(--text)',
          light: 'var(--text-light)',
          button: 'var(--text-button)',
          soft: 'var(--text-soft)',
        },
        form: {
          label: 'var(--form-label)',
        },
        icon: 'var(--icon)',
        line: {
          DEFAULT: 'var(--primary)',
          unactive: 'var(--unactive-line)',
        },
        type: {
          kanjiYellow: '#F0C132',
          dictionaryBlue: '#3C78D8',
        },
        anki: {
          card: 'var(--anki-card)',
          hightlight: 'var(--anki-hightlight)',
          text: {
            DEFAULT: 'var(--anki-text)',
            hightlight: 'var(--anki-text-hightlight)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-hit-slop')],
};

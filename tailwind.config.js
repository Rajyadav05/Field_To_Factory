import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.text-h1': {
          fontFamily: theme('fontFamily.heading'),
          fontWeight: '800',
          fontSize: '80px',
          letterSpacing: '-2px',
          lineHeight: '1.25', // leading-tight
        },
        '.text-h2': {
          fontFamily: theme('fontFamily.heading'),
          fontWeight: '700',
          fontSize: '48px',
          letterSpacing: '-1px',
        },
        '.text-h3': {
          fontFamily: theme('fontFamily.sans'),
          fontWeight: '600',
          fontSize: '24px',
        },
        '.text-body': {
          fontFamily: theme('fontFamily.sans'),
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '1.625', // leading-relaxed
          maxWidth: '36rem', // max-w-xl
        },
        '.text-label': {
          fontFamily: theme('fontFamily.sans'),
          fontWeight: '600',
          fontSize: '11px',
          letterSpacing: '0.1em', // tracking-widest
          textTransform: 'uppercase',
        }
      })
    })
  ],
}

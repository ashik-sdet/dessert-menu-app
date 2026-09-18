/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pulled directly from Sign Laban's real site CSS (not a
        // guess) — see the approved preview this was matched against.
        page: 'rgb(229, 231, 235)',
        ink: '#000000',
        muted: '#6B7280',
        accent: '#00A1E4',
        accentDark: '#0081B8',
        maroon: '#60021A',
        card: '#FFFFFF',
        placeholderBg: '#E9EAEC',
      },
      fontFamily: {
        body: ['"Manrope"', 'sans-serif'],
        display: ['"SignLabanDisplay"', '"Manrope"', 'sans-serif'],
      },
      keyframes: {
        'splash-zoom': {
          '0%': { transform: 'scale(2.6)', opacity: '0' },
          '15%': { opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'splash-zoom': 'splash-zoom 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}

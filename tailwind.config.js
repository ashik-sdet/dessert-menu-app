/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Patisserie counter at night" — a dark espresso backdrop
        // (like the inside of a bakery display case) instead of the
        // generic pale-cream-with-pastel-cards look. One saturated
        // raspberry accent carries every action; gold is reserved for
        // prices and thin dividers so it stays a quiet detail, not
        // decoration. Change these to your real brand colors later —
        // every component references these names, so a swap here
        // updates the whole app.
        espresso: '#2B1810',
        espressoLight: '#3D2417',
        cream: '#FBF3E7',
        cocoa: '#4A2C22',
        raspberry: '#C1355E',
        raspberryDark: '#9C2649',
        gold: '#D9A441',
      },
      fontFamily: {
        // Fraunces is a warm, characterful serif with real optical
        // weight for a menu board — deliberately not the generic
        // Playfair Display pairing. Work Sans stays quiet for body
        // text, prices, and labels.
        display: ['"Fraunces"', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

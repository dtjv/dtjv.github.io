module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
}

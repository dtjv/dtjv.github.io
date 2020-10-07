const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    typography: {
      default: {
        css: {
          color: defaultTheme.colors.gray[800],
          code: {
            color: defaultTheme.colors.gray[300],
            fontWeight: defaultTheme.fontWeight.normal,
          },
          'code::before': {
            content: '""',
          },
          'code::after': {
            content: '""',
          },
        },
      },
    },
  },
  variants: {
    margin: ['responsive', 'first'],
  },
  plugins: [require('@tailwindcss/typography')],
}

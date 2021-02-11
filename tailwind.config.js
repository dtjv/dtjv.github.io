const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        forestry: '#343A40',
        gatsby: '#663399',
        github: '#181717',
        js: '#F7DF1E',
        jekyll: '#CC0000',
        mongodb: '#47A248',
        netlify: '#00C7B7',
        nextjs: '#000000',
        postcss: '#DD3A0A',
        react: '#61DAFB',
        reactrouter: '#CA4245',
        sass: '#CC6699',
        tailwind: '#38B2AC',
        ts: '#3178C6',
        vercel: '#000000',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}

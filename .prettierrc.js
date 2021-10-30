module.exports = {
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  proseWrap: 'always',
  overrides: [
    {
      files: 'src/**/*.mdx',
      options: {
        parser: 'mdx',
      },
    },
  ],
}

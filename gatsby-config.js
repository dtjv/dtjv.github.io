const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  siteMetadata: {
    title: `David Valles`,
    author: `David Valles`,
    description: `A personal site by David Valles.`,
    siteUrl: `https://dtjv.io`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        plugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Valles`,
        short_name: `David Valles`,
        description: `A personal site by David Valles.`,
        start_url: `/`,
        background_color: defaultTheme.colors.white,
        theme_color: defaultTheme.colors.blue[500],
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
  ],
}

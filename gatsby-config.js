module.exports = {
  siteMetadata: {
    title: `David Valles`,
    description: `My personal website`,
    author: `David`,
    siteUrl: `https://dtjv.io`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        plugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noopener noreferrer`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 850,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              maintainCase: false,
              removeAccents: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`), require(`autoprefixer`)],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dtjv.github.io`,
        short_name: `dtjv.io`,
        start_url: `/`,
        background_color: `#3182CE`,
        theme_color: `#3182CE`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    // `gatsby-plugin-offline`,
  ],
}

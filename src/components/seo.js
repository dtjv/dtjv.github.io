import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ page }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  let {
    siteMetadata: { title, siteUrl: url, description },
  } = site

  if (page) {
    title = page.title
    url = page.url
    description = page.description
  }

  return (
    <Helmet>
      <meta name="lang" content="en" />
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content={page ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Helmet>
  )
}

export { SEO }

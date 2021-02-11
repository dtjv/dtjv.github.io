import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Container } from '../components/Container'

const PageTemplate = ({ data }) => {
  const post = data.markdownRemark
  const site = data.site
  const { title } = post.frontmatter

  return (
    <Layout>
      <SEO
        title={`${title} | ${site.siteMetadata.title}`}
        url={`${site.siteMetadata.siteUrl}${post.fields.slug}`}
      />
      <Container>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

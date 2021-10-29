import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Container } from '../components/Container'

const PageTemplate = ({ data }) => {
  const post = data.mdx
  const site = data.site
  const { title } = post.frontmatter

  return (
    <Layout>
      <Seo
        title={`${title} | ${site.siteMetadata.title}`}
        url={`${site.siteMetadata.siteUrl}${post.fields.slug}`}
      />
      <Container>
        <div className="prose max-w-none">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </Container>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
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

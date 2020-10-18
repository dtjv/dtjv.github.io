import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Container } from '../components/Container'
import { H1 } from '../components/Headings'

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark
  const site = data.site

  return (
    <Layout>
      <Helmet
        title={`${page.frontmatter.title} | ${site.siteMetadata.title}`}
      />
      <SEO article={page} />
      <Container>
        <article>
          <header>
            <H1>{page.frontmatter.title}</H1>
          </header>
          <div
            className="py-12 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </article>
      </Container>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
